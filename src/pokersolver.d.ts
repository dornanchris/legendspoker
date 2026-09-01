// pokersolver ships no type declarations. equity.ts uses only Hand.solve()
// and Hand.winners(); this shim keeps `tsc --noEmit` clean without
// pretending to describe the whole library.
declare module 'pokersolver'
