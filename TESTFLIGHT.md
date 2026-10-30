# TestFlight

How to get the iOS app onto TestFlight. Everything below happens on the Mac
(Xcode only runs there) or on the Apple websites; nothing here needs the
Windows machine.

The project is ready for it: the bundle id is `com.dornanchris.legendspoker`,
version 1.0 build 1, landscape only, the icon has no transparency (Apple
refuses one that does), and `Info.plist` says the app uses no encryption
beyond Apple's own (`ITSAppUsesNonExemptEncryption` = NO), so no build waits
on the export-compliance question.

## Once

1. **Join the Apple Developer Program** ($99 a year) at
   developer.apple.com/programs/enroll, with the same Apple ID Xcode uses.
   The free Apple ID only installs to your own phone for 7 days and cannot
   upload. Enrolment can take a day or two to be approved.
2. **Pick the paid team in Xcode.** Xcode > Settings > Accounts: the Apple
   ID should now list a team that is not "(Personal Team)". Then, in the
   project (App target > Signing & Capabilities), set Team to it, leave
   "Automatically manage signing" on. Xcode registers the bundle id itself.
3. **Make the app in App Store Connect** (appstoreconnect.apple.com > Apps >
   + > New App): platform iOS, a name, language English, bundle id
   `com.dornanchris.legendspoker` (it is in the list once step 2 is done),
   SKU anything (`legendspoker`), User Access: Full Access.
   The name must be unique on the whole App Store. If "Legends Poker" is
   taken, use "Legends Poker: Death's Invitational"; the name under the icon
   on the phone (`appName` in capacitor.config.json) does not have to match.

## Every build

```
git pull
npm install
npm run build:app
npx cap sync ios
npx cap open ios
```

(`npm run ios` does the last three.) Then in Xcode:

1. Set the run destination at the top to **Any iOS Device (arm64)**, not a
   simulator, or Archive stays greyed out.
2. **Product > Archive.** The first one also fetches the Capacitor package;
   it takes a few minutes.
3. The Organizer opens on the new archive: **Distribute App > TestFlight &
   App Store** > Distribute. Not "TestFlight Internal Only": a build sent
   that way can never be given to external testers or the store, only to
   people on the App Store Connect team. Let it manage the version and build
   number: every upload needs a build number higher than the last, and Xcode
   bumps it.
4. Apple processes the build (10-30 minutes) and emails when it is done.

## Testing it

- **You and anyone on the account (internal testers, up to 100):** App Store
  Connect > the app > TestFlight > Internal Testing > + to make a group, add
  yourself. Install **TestFlight** from the App Store on the iPhone, open the
  invite, Install. No review; a build is there as soon as it is processed.
  Builds last 90 days.
- **Friends with no App Store Connect login (external testers, up to
  10,000):** TestFlight > External Testing > a group, add their emails or turn
  on a public link. The first build of each version goes through Beta App
  Review (about a day) and asks for test details first (what to test, a
  feedback email). App Store Connect lists what it is missing.

## When it fails

- **"No accounts with App Store Connect access" / signing errors:** the Team
  in Signing & Capabilities is still the Personal Team (step 2 above).
- **"Redundant binary upload" / build number already used:** bump the Build
  in the target's General tab (1 -> 2) and archive again.
- **A white or black screen on launch:** `dist/` was not built or synced
  before archiving. Run the four commands again; `ios/App/App/public/` should
  hold `index.html` and `bundle.js`.

## Later, for the store itself (not TestFlight)

The App Store listing needs screenshots (iPhone, and iPad too while the target
lists iPad: `TARGETED_DEVICE_FAMILY` "1,2"; drop it to "1" for iPhone only), a
privacy policy URL (the game collects nothing; the save is on the phone), and
the age rating questionnaire: poker against the computer for no money counts
as simulated gambling there, which raises the rating.
