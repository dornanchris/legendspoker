"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // web/shims/assert.ts
  var assert_exports = {};
  __export(assert_exports, {
    default: () => assert_default
  });
  function assert(value, message) {
    if (!value) throw new Error(message ?? "Assertion failed");
  }
  var assert_default;
  var init_assert = __esm({
    "web/shims/assert.ts"() {
      "use strict";
      assert_default = assert;
    }
  });

  // node_modules/poker-ts/dist/lib/card.js
  var require_card = __commonJS({
    "node_modules/poker-ts/dist/lib/card.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CardSuit = exports.CardRank = void 0;
      var CardRank;
      (function(CardRank2) {
        CardRank2[CardRank2["_2"] = 0] = "_2";
        CardRank2[CardRank2["_3"] = 1] = "_3";
        CardRank2[CardRank2["_4"] = 2] = "_4";
        CardRank2[CardRank2["_5"] = 3] = "_5";
        CardRank2[CardRank2["_6"] = 4] = "_6";
        CardRank2[CardRank2["_7"] = 5] = "_7";
        CardRank2[CardRank2["_8"] = 6] = "_8";
        CardRank2[CardRank2["_9"] = 7] = "_9";
        CardRank2[CardRank2["T"] = 8] = "T";
        CardRank2[CardRank2["J"] = 9] = "J";
        CardRank2[CardRank2["Q"] = 10] = "Q";
        CardRank2[CardRank2["K"] = 11] = "K";
        CardRank2[CardRank2["A"] = 12] = "A";
      })(CardRank = exports.CardRank || (exports.CardRank = {}));
      var CardSuit;
      (function(CardSuit2) {
        CardSuit2[CardSuit2["CLUBS"] = 0] = "CLUBS";
        CardSuit2[CardSuit2["DIAMONDS"] = 1] = "DIAMONDS";
        CardSuit2[CardSuit2["HEARTS"] = 2] = "HEARTS";
        CardSuit2[CardSuit2["SPADES"] = 3] = "SPADES";
      })(CardSuit = exports.CardSuit || (exports.CardSuit = {}));
      var Card = (
        /** @class */
        (function() {
          function Card2(rank, suit) {
            this.rank = rank;
            this.suit = suit;
          }
          Card2.compare = function(c1, c2) {
            var suitDiff = c2.suit - c1.suit;
            if (suitDiff !== 0) {
              return suitDiff;
            }
            return c2.rank - c1.rank;
          };
          return Card2;
        })()
      );
      exports.default = Card;
    }
  });

  // web/shims/crypto.ts
  var crypto_exports = {};
  __export(crypto_exports, {
    default: () => crypto_default,
    randomInt: () => randomInt
  });
  function randomInt(max) {
    if (max <= 0) throw new RangeError("max must be positive");
    const range = Math.ceil(max);
    const bytes = Math.ceil(Math.log2(range) / 8) || 1;
    const limit = Math.floor(256 ** bytes / range) * range;
    const buf = new Uint8Array(bytes);
    for (; ; ) {
      crypto.getRandomValues(buf);
      let n = 0;
      for (const b of buf) n = n * 256 + b;
      if (n < limit) return n % range;
    }
  }
  var crypto_default;
  var init_crypto = __esm({
    "web/shims/crypto.ts"() {
      "use strict";
      crypto_default = { randomInt };
    }
  });

  // node_modules/poker-ts/dist/util/array.js
  var require_array = __commonJS({
    "node_modules/poker-ts/dist/util/array.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.findMax = exports.unique = exports.rotate = exports.nextOrWrap = exports.findIndexAdjacent = exports.shuffle = void 0;
      var crypto_1 = (init_crypto(), __toCommonJS(crypto_exports));
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      function shuffle(array) {
        var _a;
        for (var index = array.length - 1; index > 0; index--) {
          var newIndex = crypto_1.randomInt(index + 1);
          _a = [array[newIndex], array[index]], array[index] = _a[0], array[newIndex] = _a[1];
        }
      }
      exports.shuffle = shuffle;
      function findIndexAdjacent(array, predicate) {
        var first = array[0];
        for (var index = 1; index < array.length; index++) {
          var second = array[index];
          if (predicate(first, second)) {
            return index - 1;
          }
          first = second;
        }
        return -1;
      }
      exports.findIndexAdjacent = findIndexAdjacent;
      function nextOrWrap(array, currentIndex) {
        do {
          currentIndex++;
          if (currentIndex === array.length)
            currentIndex = 0;
        } while (array[currentIndex] === null);
        return currentIndex;
      }
      exports.nextOrWrap = nextOrWrap;
      function rotate(array, count) {
        count -= array.length * Math.floor(count / array.length);
        array.push.apply(array, array.splice(0, count));
      }
      exports.rotate = rotate;
      function unique(array, predicate) {
        if (predicate === void 0) {
          predicate = function(first, second) {
            return first !== second;
          };
        }
        if (array.length === 0) {
          return array;
        }
        return array.slice(1).reduce(function(acc, item) {
          if (predicate(acc[acc.length - 1], item)) {
            acc.push(item);
          }
          return acc;
        }, [array[0]]);
      }
      exports.unique = unique;
      function findMax(array, compare) {
        assert_1.default(array.length > 0);
        return array.sort(compare)[0];
      }
      exports.findMax = findMax;
    }
  });

  // node_modules/poker-ts/dist/lib/deck.js
  var require_deck = __commonJS({
    "node_modules/poker-ts/dist/lib/deck.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      })();
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var card_1 = __importStar(require_card());
      var array_1 = require_array();
      var Deck = (
        /** @class */
        (function(_super) {
          __extends(Deck2, _super);
          function Deck2(shuffleAlgorithm) {
            if (shuffleAlgorithm === void 0) {
              shuffleAlgorithm = array_1.shuffle;
            }
            var _this = _super.call(this) || this;
            Object.setPrototypeOf(_this, Deck2.prototype);
            var index = 0;
            for (var suit = card_1.CardSuit.CLUBS; suit <= card_1.CardSuit.SPADES; suit++) {
              for (var rank = card_1.CardRank._2; rank <= card_1.CardRank.A; rank++) {
                _this[index++] = new card_1.default(rank, suit);
              }
            }
            _this.shuffle = shuffleAlgorithm.bind(null, _this);
            _this._size = 52;
            _this.shuffle();
            return _this;
          }
          Deck2.prototype.fillAndShuffle = function() {
            this._size = 52;
            this.shuffle();
          };
          Deck2.prototype.draw = function() {
            assert_1.default(this._size > 0, "Cannot draw from an empty deck");
            return this[--this._size];
          };
          return Deck2;
        })(Array)
      );
      exports.default = Deck;
    }
  });

  // node_modules/poker-ts/dist/lib/community-cards.js
  var require_community_cards = __commonJS({
    "node_modules/poker-ts/dist/lib/community-cards.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.next = exports.RoundOfBetting = void 0;
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var RoundOfBetting;
      (function(RoundOfBetting2) {
        RoundOfBetting2[RoundOfBetting2["PREFLOP"] = 0] = "PREFLOP";
        RoundOfBetting2[RoundOfBetting2["FLOP"] = 3] = "FLOP";
        RoundOfBetting2[RoundOfBetting2["TURN"] = 4] = "TURN";
        RoundOfBetting2[RoundOfBetting2["RIVER"] = 5] = "RIVER";
      })(RoundOfBetting = exports.RoundOfBetting || (exports.RoundOfBetting = {}));
      var next = function(roundOfBetting) {
        if (roundOfBetting === RoundOfBetting.PREFLOP) {
          return RoundOfBetting.FLOP;
        } else {
          return roundOfBetting + 1;
        }
      };
      exports.next = next;
      var CommunityCards = (
        /** @class */
        (function() {
          function CommunityCards2() {
            this._cards = [];
          }
          CommunityCards2.prototype.cards = function() {
            return this._cards;
          };
          CommunityCards2.prototype.deal = function(cards) {
            assert_1.default(cards.length <= 5 - this._cards.length, "Cannot deal more than there is undealt cards");
            this._cards = this._cards.concat(cards);
          };
          return CommunityCards2;
        })()
      );
      exports.default = CommunityCards;
    }
  });

  // node_modules/poker-ts/dist/lib/chip-range.js
  var require_chip_range = __commonJS({
    "node_modules/poker-ts/dist/lib/chip-range.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ChipRange = (
        /** @class */
        (function() {
          function ChipRange2(min, max) {
            this.min = min;
            this.max = max;
          }
          ChipRange2.prototype.contains = function(amount) {
            return this.min <= amount && amount <= this.max;
          };
          return ChipRange2;
        })()
      );
      exports.default = ChipRange;
    }
  });

  // node_modules/poker-ts/dist/lib/round.js
  var require_round = __commonJS({
    "node_modules/poker-ts/dist/lib/round.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Action = void 0;
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var Action;
      (function(Action2) {
        Action2[Action2["LEAVE"] = 1] = "LEAVE";
        Action2[Action2["PASSIVE"] = 2] = "PASSIVE";
        Action2[Action2["AGGRESSIVE"] = 4] = "AGGRESSIVE";
      })(Action = exports.Action || (exports.Action = {}));
      var Round = (
        /** @class */
        (function() {
          function Round2(activePlayers, firstToAct) {
            this._contested = false;
            this._firstAction = true;
            this._numActivePlayers = 0;
            this._activePlayers = activePlayers;
            this._playerToAct = firstToAct;
            this._lastAggressiveActor = firstToAct;
            this._numActivePlayers = activePlayers.filter(function(player) {
              return !!player;
            }).length;
            assert_1.default(firstToAct < activePlayers.length);
          }
          Round2.prototype.activePlayers = function() {
            return this._activePlayers;
          };
          Round2.prototype.playerToAct = function() {
            return this._playerToAct;
          };
          Round2.prototype.lastAggressiveActor = function() {
            return this._lastAggressiveActor;
          };
          Round2.prototype.numActivePlayers = function() {
            return this._numActivePlayers;
          };
          Round2.prototype.inProgress = function() {
            return (this._contested || this._numActivePlayers > 1) && (this._firstAction || this._playerToAct !== this._lastAggressiveActor);
          };
          Round2.prototype.isContested = function() {
            return this._contested;
          };
          Round2.prototype.actionTaken = function(action) {
            assert_1.default(this.inProgress());
            assert_1.default(!(action & Action.PASSIVE && action & Action.AGGRESSIVE));
            if (this._firstAction) {
              this._firstAction = false;
            }
            if (action & Action.AGGRESSIVE) {
              this._lastAggressiveActor = this._playerToAct;
              this._contested = true;
            } else if (action & Action.PASSIVE) {
              this._contested = true;
            }
            if (action & Action.LEAVE) {
              this._activePlayers[this._playerToAct] = false;
              --this._numActivePlayers;
            }
            this.incrementPlayer();
          };
          Round2.prototype.incrementPlayer = function() {
            do {
              ++this._playerToAct;
              if (this._playerToAct === this._activePlayers.length)
                this._playerToAct = 0;
              if (this._playerToAct === this._lastAggressiveActor)
                break;
            } while (!this._activePlayers[this._playerToAct]);
          };
          return Round2;
        })()
      );
      exports.default = Round;
    }
  });

  // node_modules/poker-ts/dist/lib/betting-round.js
  var require_betting_round = __commonJS({
    "node_modules/poker-ts/dist/lib/betting-round.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ActionRange = exports.Action = void 0;
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var chip_range_1 = __importDefault(require_chip_range());
      var round_1 = __importStar(require_round());
      var Action;
      (function(Action2) {
        Action2[Action2["LEAVE"] = 0] = "LEAVE";
        Action2[Action2["MATCH"] = 1] = "MATCH";
        Action2[Action2["RAISE"] = 2] = "RAISE";
      })(Action = exports.Action || (exports.Action = {}));
      var ActionRange = (
        /** @class */
        /* @__PURE__ */ (function() {
          function ActionRange2(canRaise, chipRange) {
            if (chipRange === void 0) {
              chipRange = new chip_range_1.default(0, 0);
            }
            this.canRaise = canRaise;
            this.chipRange = chipRange;
          }
          return ActionRange2;
        })()
      );
      exports.ActionRange = ActionRange;
      var BettingRound = (
        /** @class */
        (function() {
          function BettingRound2(players, firstToAct, minRaise, biggestBet) {
            if (biggestBet === void 0) {
              biggestBet = 0;
            }
            this._round = new round_1.default(players.map(function(player) {
              return !!player;
            }), firstToAct);
            this._players = players;
            this._biggestBet = biggestBet;
            this._minRaise = minRaise;
            assert_1.default(firstToAct < players.length, "Seat index must be in the valid range");
            assert_1.default(players[firstToAct], "First player to act must exist");
          }
          BettingRound2.prototype.inProgress = function() {
            return this._round.inProgress();
          };
          BettingRound2.prototype.isContested = function() {
            return this._round.isContested();
          };
          BettingRound2.prototype.playerToAct = function() {
            return this._round.playerToAct();
          };
          BettingRound2.prototype.biggestBet = function() {
            return this._biggestBet;
          };
          BettingRound2.prototype.minRaise = function() {
            return this._minRaise;
          };
          BettingRound2.prototype.players = function() {
            var _this = this;
            return this._round.activePlayers().map(function(isActive, index) {
              return isActive ? _this._players[index] : null;
            });
          };
          BettingRound2.prototype.activePlayers = function() {
            return this._round.activePlayers();
          };
          BettingRound2.prototype.numActivePlayers = function() {
            return this._round.numActivePlayers();
          };
          BettingRound2.prototype.legalActions = function() {
            var player = this._players[this._round.playerToAct()];
            assert_1.default(player !== null);
            var playerChips = player.totalChips();
            var canRaise = playerChips > this._biggestBet;
            if (canRaise) {
              var minBet = this._biggestBet + this._minRaise;
              var raiseRange = new chip_range_1.default(Math.min(minBet, playerChips), playerChips);
              return new ActionRange(canRaise, raiseRange);
            } else {
              return new ActionRange(canRaise);
            }
          };
          BettingRound2.prototype.actionTaken = function(action, bet) {
            if (bet === void 0) {
              bet = 0;
            }
            var player = this._players[this._round.playerToAct()];
            assert_1.default(player !== null);
            if (action === Action.RAISE) {
              assert_1.default(this.isRaiseValid(bet));
              player.bet(bet);
              this._minRaise = bet - this._biggestBet;
              this._biggestBet = bet;
              var actionFlag = round_1.Action.AGGRESSIVE;
              if (player.stack() === 0) {
                actionFlag |= round_1.Action.LEAVE;
              }
              this._round.actionTaken(actionFlag);
            } else if (action === Action.MATCH) {
              player.bet(Math.min(this._biggestBet, player.totalChips()));
              var actionFlag = round_1.Action.PASSIVE;
              if (player.stack() === 0) {
                actionFlag |= round_1.Action.LEAVE;
              }
              this._round.actionTaken(actionFlag);
            } else {
              assert_1.default(action === Action.LEAVE);
              this._round.actionTaken(round_1.Action.LEAVE);
            }
          };
          BettingRound2.prototype.isRaiseValid = function(bet) {
            var player = this._players[this._round.playerToAct()];
            assert_1.default(player !== null);
            var playerChips = player.stack() + player.betSize();
            var minBet = this._biggestBet + this._minRaise;
            if (playerChips > this._biggestBet && playerChips < minBet) {
              return bet === playerChips;
            }
            return bet >= minBet && bet <= playerChips;
          };
          return BettingRound2;
        })()
      );
      exports.default = BettingRound;
    }
  });

  // node_modules/poker-ts/dist/lib/pot.js
  var require_pot = __commonJS({
    "node_modules/poker-ts/dist/lib/pot.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var Pot = (
        /** @class */
        (function() {
          function Pot2() {
            this._eligiblePlayers = [];
            this._size = 0;
          }
          Pot2.prototype.size = function() {
            return this._size;
          };
          Pot2.prototype.eligiblePlayers = function() {
            return this._eligiblePlayers;
          };
          Pot2.prototype.add = function(amount) {
            assert_1.default(amount >= 0, "Cannot add a negative amount to the pot");
            this._size += amount;
          };
          Pot2.prototype.collectBetsFrom = function(players) {
            var _this = this;
            var firstBetterIndex = players.findIndex(function(player) {
              var _a;
              return (_a = player === null || player === void 0 ? void 0 : player.betSize()) !== null && _a !== void 0 ? _a : false;
            });
            if (firstBetterIndex === -1) {
              this._eligiblePlayers = players.reduce(function(acc, player, index) {
                if (player !== null)
                  acc.push(index);
                return acc;
              }, []);
              return 0;
            } else {
              var firstBetter = players[firstBetterIndex];
              assert_1.default(firstBetter !== null);
              var minBet_1 = players.slice(firstBetterIndex + 1).reduce(function(acc, player) {
                if (player !== null && player.betSize() !== 0 && player.betSize() < acc)
                  acc = player.betSize();
                return acc;
              }, firstBetter.betSize());
              this._eligiblePlayers = [];
              players.forEach(function(player, index) {
                if (player !== null && player.betSize() !== 0) {
                  player.takeFromBet(minBet_1);
                  _this._size += minBet_1;
                  _this._eligiblePlayers.push(index);
                }
              });
              return minBet_1;
            }
          };
          return Pot2;
        })()
      );
      exports.default = Pot;
    }
  });

  // node_modules/poker-ts/dist/lib/pot-manager.js
  var require_pot_manager = __commonJS({
    "node_modules/poker-ts/dist/lib/pot-manager.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var pot_1 = __importDefault(require_pot());
      var PotManager = (
        /** @class */
        (function() {
          function PotManager2() {
            this._aggregateFoldedBets = 0;
            this._pots = [new pot_1.default()];
          }
          PotManager2.prototype.pots = function() {
            return this._pots;
          };
          PotManager2.prototype.betFolded = function(amount) {
            this._aggregateFoldedBets += amount;
          };
          PotManager2.prototype.collectBetsForm = function(players) {
            for (; ; ) {
              var minBet = this._pots[this._pots.length - 1].collectBetsFrom(players);
              var numberOfEligiblePlayers = this._pots[this._pots.length - 1].eligiblePlayers().length;
              var aggregateFoldedBetsConsumedAmount = Math.min(this._aggregateFoldedBets, numberOfEligiblePlayers * minBet);
              this._pots[this._pots.length - 1].add(aggregateFoldedBetsConsumedAmount);
              this._aggregateFoldedBets -= aggregateFoldedBetsConsumedAmount;
              if (players.filter(function(player) {
                return player !== null && player.betSize() !== 0;
              }).length) {
                this._pots.push(new pot_1.default());
                continue;
              } else if (this._aggregateFoldedBets !== 0) {
                this._pots[this._pots.length - 1].add(this._aggregateFoldedBets);
                this._aggregateFoldedBets = 0;
              }
              break;
            }
          };
          return PotManager2;
        })()
      );
      exports.default = PotManager;
    }
  });

  // node_modules/poker-ts/dist/lib/hand.js
  var require_hand = __commonJS({
    "node_modules/poker-ts/dist/lib/hand.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HandRanking = void 0;
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var card_1 = __importStar(require_card());
      var array_1 = require_array();
      var HandRanking;
      (function(HandRanking2) {
        HandRanking2[HandRanking2["HIGH_CARD"] = 0] = "HIGH_CARD";
        HandRanking2[HandRanking2["PAIR"] = 1] = "PAIR";
        HandRanking2[HandRanking2["TWO_PAIR"] = 2] = "TWO_PAIR";
        HandRanking2[HandRanking2["THREE_OF_A_KIND"] = 3] = "THREE_OF_A_KIND";
        HandRanking2[HandRanking2["STRAIGHT"] = 4] = "STRAIGHT";
        HandRanking2[HandRanking2["FLUSH"] = 5] = "FLUSH";
        HandRanking2[HandRanking2["FULL_HOUSE"] = 6] = "FULL_HOUSE";
        HandRanking2[HandRanking2["FOUR_OF_A_KIND"] = 7] = "FOUR_OF_A_KIND";
        HandRanking2[HandRanking2["STRAIGHT_FLUSH"] = 8] = "STRAIGHT_FLUSH";
        HandRanking2[HandRanking2["ROYAL_FLUSH"] = 9] = "ROYAL_FLUSH";
      })(HandRanking = exports.HandRanking || (exports.HandRanking = {}));
      var Hand2 = (
        /** @class */
        (function() {
          function Hand3(ranking, strength, cards) {
            assert_1.default(cards.length === 5);
            this._cards = cards;
            this._ranking = ranking;
            this._strength = strength;
          }
          Hand3.create = function(holeCards, communityCards) {
            assert_1.default(communityCards.cards().length === 5, "All community cards must be dealt");
            var cards = __spreadArray(__spreadArray([], holeCards), communityCards.cards());
            return Hand3.of(cards);
          };
          Hand3.of = function(cards) {
            assert_1.default(cards.length === 7);
            var hand1 = Hand3._highLowHandEval(cards);
            var hand2 = Hand3._straightFlushEval(cards);
            if (hand2 !== null) {
              return array_1.findMax([hand1, hand2], Hand3.compare);
            }
            return hand1;
          };
          Hand3.compare = function(h1, h2) {
            var rankingDiff = h2.ranking() - h1.ranking();
            if (rankingDiff !== 0) {
              return rankingDiff;
            }
            return h2.strength() - h1.strength();
          };
          Hand3.nextRank = function(cards) {
            assert_1.default(cards.length !== 0);
            var firstRank = cards[0].rank;
            var secondRankIndex = cards.findIndex(function(card) {
              return card.rank !== firstRank;
            });
            return {
              rank: firstRank,
              count: secondRankIndex !== -1 ? secondRankIndex : cards.length
            };
          };
          Hand3.getStrength = function(cards) {
            assert_1.default(cards.length === 5);
            var sum = 0;
            var multiplier = Math.pow(13, 4);
            for (; ; ) {
              var _a = this.nextRank(cards), rank = _a.rank, count = _a.count;
              sum += multiplier * rank;
              cards = cards.slice(count);
              if (cards.length !== 0) {
                multiplier /= 13;
              } else {
                break;
              }
            }
            return sum;
          };
          Hand3.getSuitedCards = function(cards) {
            assert_1.default(cards.length === 7);
            cards.sort(card_1.default.compare);
            var first = 0;
            for (; ; ) {
              var last = cards.slice(first + 1).findIndex(function(card) {
                return card.suit !== cards[first].suit;
              });
              if (last === -1) {
                last = cards.length;
              } else {
                last += first + 1;
              }
              if (last - first >= 5) {
                return cards.slice(first, last);
              } else if (last === cards.length) {
                return null;
              }
              first = last;
            }
          };
          Hand3.getStraightCards = function(cards) {
            assert_1.default(cards.length >= 5);
            var first = 0;
            for (; ; ) {
              var last = array_1.findIndexAdjacent(cards.slice(first), function(c1, c2) {
                return c1.rank !== c2.rank + 1;
              });
              if (last === -1) {
                last = cards.length;
              } else {
                last += first + 1;
              }
              if (last - first >= 5) {
                return cards.slice(first, first + 5);
              } else if (last - first === 4) {
                if (cards[first].rank === card_1.CardRank._5 && cards[0].rank === card_1.CardRank.A) {
                  array_1.rotate(cards, first);
                  return cards.slice(0, 5);
                }
              } else if (cards.length - last < 4) {
                return null;
              }
              first = last;
            }
          };
          Hand3._highLowHandEval = function(cards) {
            assert_1.default(cards.length === 7);
            cards = __spreadArray([], cards);
            var rankOccurrences = new Array(13).fill(0);
            for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
              var card = cards_1[_i];
              rankOccurrences[card.rank] += 1;
            }
            cards.sort(function(c1, c2) {
              if (rankOccurrences[c1.rank] === rankOccurrences[c2.rank]) {
                return c2.rank - c1.rank;
              }
              return rankOccurrences[c2.rank] - rankOccurrences[c1.rank];
            });
            var ranking;
            var count = Hand3.nextRank(cards).count;
            if (count === 4) {
              cards = __spreadArray(__spreadArray([], cards.slice(0, 4)), cards.slice(5).sort(function(c1, c2) {
                return c2.rank - c1.rank;
              }));
              ranking = HandRanking.FOUR_OF_A_KIND;
            } else if (count === 3) {
              var tmp = Hand3.nextRank(cards.slice(-4));
              if (tmp.count === 2) {
                ranking = HandRanking.FULL_HOUSE;
              } else {
                ranking = HandRanking.THREE_OF_A_KIND;
              }
            } else if (count === 2) {
              var tmp = Hand3.nextRank(cards.slice(-5));
              if (tmp.count === 2) {
                ranking = HandRanking.TWO_PAIR;
                var firstPair = cards.slice(0, count);
                var secondPair = cards.slice(count, count + tmp.count);
                var remainingCards = cards.slice(count + tmp.count).sort(function(c1, c2) {
                  return c2.rank - c1.rank;
                });
                var kicker = remainingCards[0];
                cards = __spreadArray(__spreadArray(__spreadArray([], firstPair), secondPair), [kicker]);
              } else {
                ranking = HandRanking.PAIR;
              }
            } else {
              ranking = HandRanking.HIGH_CARD;
            }
            var handCards = cards.slice(0, 5);
            var strength = Hand3.getStrength(handCards);
            return new Hand3(ranking, strength, handCards);
          };
          Hand3._straightFlushEval = function(cards) {
            assert_1.default(cards.length === 7);
            cards = __spreadArray([], cards);
            var suitedCards = Hand3.getSuitedCards(cards);
            if (suitedCards !== null) {
              var straightCards = this.getStraightCards(suitedCards);
              if (straightCards !== null) {
                var ranking = void 0;
                var strength = void 0;
                if (straightCards[0].rank === card_1.CardRank.A) {
                  ranking = HandRanking.ROYAL_FLUSH;
                  strength = 0;
                } else {
                  ranking = HandRanking.STRAIGHT_FLUSH;
                  strength = straightCards[0].rank;
                }
                var handCards = straightCards.slice(0, 5);
                return new Hand3(ranking, strength, handCards);
              } else {
                var ranking = HandRanking.FLUSH;
                var handCards = suitedCards.slice(0, 5);
                var strength = this.getStrength(handCards);
                return new Hand3(ranking, strength, handCards);
              }
            } else {
              cards.sort(function(c1, c2) {
                return c2.rank - c1.rank;
              });
              cards = array_1.unique(cards, function(c1, c2) {
                return c1.rank !== c2.rank;
              });
              if (cards.length < 5) {
                return null;
              } else {
                var straightCards = this.getStraightCards(cards);
                if (straightCards !== null) {
                  var ranking = HandRanking.STRAIGHT;
                  var strength = straightCards[0].rank;
                  return new Hand3(ranking, strength, straightCards);
                }
              }
            }
            return null;
          };
          Hand3.prototype.ranking = function() {
            return this._ranking;
          };
          Hand3.prototype.strength = function() {
            return this._strength;
          };
          Hand3.prototype.cards = function() {
            return this._cards;
          };
          return Hand3;
        })()
      );
      exports.default = Hand2;
    }
  });

  // node_modules/poker-ts/dist/lib/dealer.js
  var require_dealer = __commonJS({
    "node_modules/poker-ts/dist/lib/dealer.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Action = exports.ActionRange = void 0;
      var community_cards_1 = require_community_cards();
      var betting_round_1 = __importStar(require_betting_round());
      var pot_manager_1 = __importDefault(require_pot_manager());
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var hand_1 = __importDefault(require_hand());
      var array_1 = require_array();
      var ActionRange = (
        /** @class */
        (function() {
          function ActionRange2(chipRange) {
            this.action = Action.FOLD;
            this.chipRange = chipRange;
          }
          ActionRange2.prototype.contains = function(action, bet) {
            var _a, _b;
            if (bet === void 0) {
              bet = 0;
            }
            assert_1.default(Dealer.isValid(action), "The action representation must be valid");
            return action && Dealer.isAggressive(action) ? (_b = (_a = this.chipRange) === null || _a === void 0 ? void 0 : _a.contains(bet)) !== null && _b !== void 0 ? _b : false : true;
          };
          return ActionRange2;
        })()
      );
      exports.ActionRange = ActionRange;
      var Action;
      (function(Action2) {
        Action2[Action2["FOLD"] = 1] = "FOLD";
        Action2[Action2["CHECK"] = 2] = "CHECK";
        Action2[Action2["CALL"] = 4] = "CALL";
        Action2[Action2["BET"] = 8] = "BET";
        Action2[Action2["RAISE"] = 16] = "RAISE";
      })(Action = exports.Action || (exports.Action = {}));
      var Dealer = (
        /** @class */
        (function() {
          function Dealer2(players, button2, forcedBets, deck, communityCards, numSeats) {
            if (numSeats === void 0) {
              numSeats = 9;
            }
            this._button = 0;
            this._bettingRound = null;
            this._handInProgress = false;
            this._roundOfBetting = community_cards_1.RoundOfBetting.PREFLOP;
            this._bettingRoundsCompleted = false;
            this._players = players;
            this._button = button2;
            this._forcedBets = forcedBets;
            this._deck = deck;
            this._communityCards = communityCards;
            this._potManager = new pot_manager_1.default();
            this._holeCards = new Array(numSeats).fill(null);
            this._winners = [];
            assert_1.default(deck.length === 52, "Deck must be whole");
            assert_1.default(communityCards.cards().length === 0, "No community cards should have been dealt");
          }
          Dealer2.isValid = function(action) {
            action = action - (action >> 1 & 1431655765);
            action = (action & 858993459) + (action >> 2 & 858993459);
            var bitCount = (action + (action >> 4) & 252645135) * 16843009 >> 24;
            return bitCount === 1;
          };
          Dealer2.isAggressive = function(action) {
            return !!(action & Action.BET) || !!(action & Action.RAISE);
          };
          Dealer2.prototype.handInProgress = function() {
            return this._handInProgress;
          };
          Dealer2.prototype.bettingRoundsCompleted = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            return this._bettingRoundsCompleted;
          };
          Dealer2.prototype.playerToAct = function() {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this._bettingRound !== null);
            return this._bettingRound.playerToAct();
          };
          Dealer2.prototype.players = function() {
            var _a, _b;
            return (_b = (_a = this._bettingRound) === null || _a === void 0 ? void 0 : _a.players()) !== null && _b !== void 0 ? _b : [];
          };
          Dealer2.prototype.bettingRoundPlayers = function() {
            return this._players;
          };
          Dealer2.prototype.roundOfBetting = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            return this._roundOfBetting;
          };
          Dealer2.prototype.numActivePlayers = function() {
            var _a, _b;
            return (_b = (_a = this._bettingRound) === null || _a === void 0 ? void 0 : _a.numActivePlayers()) !== null && _b !== void 0 ? _b : 0;
          };
          Dealer2.prototype.biggestBet = function() {
            var _a, _b;
            return (_b = (_a = this._bettingRound) === null || _a === void 0 ? void 0 : _a.biggestBet()) !== null && _b !== void 0 ? _b : 0;
          };
          Dealer2.prototype.bettingRoundInProgress = function() {
            var _a, _b;
            return (_b = (_a = this._bettingRound) === null || _a === void 0 ? void 0 : _a.inProgress()) !== null && _b !== void 0 ? _b : false;
          };
          Dealer2.prototype.isContested = function() {
            var _a, _b;
            return (_b = (_a = this._bettingRound) === null || _a === void 0 ? void 0 : _a.isContested()) !== null && _b !== void 0 ? _b : false;
          };
          Dealer2.prototype.legalActions = function() {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this._bettingRound !== null);
            var player = this._players[this._bettingRound.playerToAct()];
            var actions = this._bettingRound.legalActions();
            var actionRange = new ActionRange(actions.chipRange);
            assert_1.default(player !== null);
            if (this._bettingRound.biggestBet() - player.betSize() === 0) {
              actionRange.action |= Action.CHECK;
              if (actions.canRaise) {
                if (player.betSize() > 0) {
                  actionRange.action |= Action.RAISE;
                } else {
                  actionRange.action |= Action.BET;
                }
              }
            } else {
              actionRange.action |= Action.CALL;
              if (actions.canRaise) {
                actionRange.action |= Action.RAISE;
              }
            }
            return actionRange;
          };
          Dealer2.prototype.pots = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            return this._potManager.pots();
          };
          Dealer2.prototype.button = function() {
            return this._button;
          };
          Dealer2.prototype.holeCards = function() {
            assert_1.default(this.handInProgress() || this.bettingRoundInProgress(), "Hand must be in progress or showdown must have ended");
            return this._holeCards;
          };
          Dealer2.prototype.startHand = function() {
            assert_1.default(!this.handInProgress(), "Hand must not be in progress");
            this._bettingRoundsCompleted = false;
            this._roundOfBetting = community_cards_1.RoundOfBetting.PREFLOP;
            this._winners = [];
            this.collectAnte();
            var bigBlindSeat = this.postBlinds();
            var firstAction = this.nextOrWrap(bigBlindSeat);
            this.dealHoleCards();
            if (this._players.filter(function(player, seat) {
              return player !== null && (player.stack() !== 0 || seat === bigBlindSeat);
            }).length > 1) {
              this._bettingRound = new betting_round_1.default(__spreadArray([], this._players), firstAction, this._forcedBets.blinds.big, this._forcedBets.blinds.big);
            }
            this._handInProgress = true;
          };
          Dealer2.prototype.actionTaken = function(action, bet) {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this.legalActions().contains(action, bet), "Action must be legal");
            assert_1.default(this._bettingRound !== null);
            if (action & Action.CHECK || action & Action.CALL) {
              this._bettingRound.actionTaken(betting_round_1.Action.MATCH);
            } else if (action & Action.BET || action & Action.RAISE) {
              this._bettingRound.actionTaken(betting_round_1.Action.RAISE, bet);
            } else {
              assert_1.default(action & Action.FOLD);
              var foldingPlayer = this._players[this.playerToAct()];
              assert_1.default(foldingPlayer !== null);
              this._potManager.betFolded(foldingPlayer.betSize());
              foldingPlayer.takeFromBet(foldingPlayer.betSize());
              this._players[this.playerToAct()] = null;
              this._bettingRound.actionTaken(betting_round_1.Action.LEAVE);
            }
          };
          Dealer2.prototype.endBettingRound = function() {
            var _a, _b, _c, _d;
            assert_1.default(!this._bettingRoundsCompleted, "Betting rounds must not be completed");
            assert_1.default(!this.bettingRoundInProgress(), "Betting round must not be in progress");
            this._potManager.collectBetsForm(this._players);
            if (((_b = (_a = this._bettingRound) === null || _a === void 0 ? void 0 : _a.numActivePlayers()) !== null && _b !== void 0 ? _b : 0) <= 1) {
              this._roundOfBetting = community_cards_1.RoundOfBetting.RIVER;
              if (this._potManager.pots().length === 1 && this._potManager.pots()[0].eligiblePlayers().length === 1) {
              } else {
                this.dealCommunityCards();
              }
              this._bettingRoundsCompleted = true;
            } else if (this._roundOfBetting < community_cards_1.RoundOfBetting.RIVER) {
              this._roundOfBetting = community_cards_1.next(this._roundOfBetting);
              this._players = (_d = (_c = this._bettingRound) === null || _c === void 0 ? void 0 : _c.players()) !== null && _d !== void 0 ? _d : [];
              this._bettingRound = new betting_round_1.default(__spreadArray([], this._players), this.nextOrWrap(this._button), this._forcedBets.blinds.big);
              this.dealCommunityCards();
              assert_1.default(!this._bettingRoundsCompleted);
            } else {
              assert_1.default(this._roundOfBetting === community_cards_1.RoundOfBetting.RIVER);
              this._bettingRoundsCompleted = true;
            }
          };
          Dealer2.prototype.winners = function() {
            assert_1.default(!this.handInProgress(), "Hand must not be in progress");
            return this._winners;
          };
          Dealer2.prototype.showdown = function() {
            var _this = this;
            assert_1.default(this._roundOfBetting === community_cards_1.RoundOfBetting.RIVER, "Round of betting must be river");
            assert_1.default(!this.bettingRoundInProgress(), "Betting round must not be in progress");
            assert_1.default(this.bettingRoundsCompleted(), "Betting rounds must be completed");
            this._handInProgress = false;
            if (this._potManager.pots().length === 1 && this._potManager.pots()[0].eligiblePlayers().length === 1) {
              var index = this._potManager.pots()[0].eligiblePlayers()[0];
              var player = this._players[index];
              assert_1.default(player !== null);
              player.addToStack(this._potManager.pots()[0].size());
              return;
            }
            var _loop_1 = function(pot2) {
              var contenders = pot2.eligiblePlayers().filter(function(seatIndex) {
                return _this._players[seatIndex] != null;
              });
              if (contenders.length === 0) {
                contenders = _this._players.reduce(function(acc, player2, index2) {
                  if (player2 != null)
                    acc.push(index2);
                  return acc;
                }, []);
              }
              var playerResults = contenders.map(function(seatIndex) {
                return [seatIndex, hand_1.default.create(_this._holeCards[seatIndex], _this._communityCards)];
              });
              playerResults.sort(function(_a2, _b) {
                var first = _a2[1];
                var second = _b[1];
                return hand_1.default.compare(first, second);
              });
              var lastWinnerIndex = array_1.findIndexAdjacent(playerResults, function(_a2, _b) {
                var first = _a2[1];
                var second = _b[1];
                return hand_1.default.compare(first, second) !== 0;
              });
              var numberOfWinners = lastWinnerIndex === -1 ? playerResults.length : lastWinnerIndex + 1;
              var oddChips = pot2.size() % numberOfWinners;
              var payout = (pot2.size() - oddChips) / numberOfWinners;
              var winningPlayerResults = playerResults.slice(0, numberOfWinners);
              winningPlayerResults.forEach(function(playerResult) {
                var _a2;
                var seatIndex = playerResult[0];
                (_a2 = _this._players[seatIndex]) === null || _a2 === void 0 ? void 0 : _a2.addToStack(payout);
              });
              this_1._winners.push(winningPlayerResults.map(function(playerResult) {
                var seatIndex = playerResult[0];
                var holeCards = _this._holeCards[seatIndex];
                return __spreadArray(__spreadArray([], playerResult), [holeCards]);
              }));
              if (oddChips !== 0) {
                var winners_1 = new Array(this_1._players.length).fill(null);
                winningPlayerResults.forEach(function(playerResult) {
                  var seatIndex = playerResult[0];
                  winners_1[seatIndex] = _this._players[seatIndex];
                });
                var seat = this_1._button;
                while (oddChips !== 0) {
                  seat = array_1.nextOrWrap(winners_1, seat);
                  var winner = winners_1[seat];
                  assert_1.default(winner !== null);
                  winner.addToStack(1);
                  oddChips--;
                }
              }
            };
            var this_1 = this;
            for (var _i = 0, _a = this._potManager.pots(); _i < _a.length; _i++) {
              var pot = _a[_i];
              _loop_1(pot);
            }
          };
          Dealer2.prototype.nextOrWrap = function(seat) {
            return array_1.nextOrWrap(this._players, seat);
          };
          Dealer2.prototype.collectAnte = function() {
            if (this._forcedBets.ante === void 0) {
              return;
            }
            var total = 0;
            for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
              var player = _a[_i];
              if (player !== null) {
                var ante = Math.min(this._forcedBets.ante, player.totalChips());
                player.takeFromStack(ante);
                total += ante;
              }
            }
            this._potManager.pots()[0].add(total);
          };
          Dealer2.prototype.postBlinds = function() {
            var seat = this._button;
            var numPlayers = this._players.filter(function(player) {
              return player !== null;
            }).length;
            if (numPlayers !== 2) {
              seat = this.nextOrWrap(seat);
            }
            var smallBlind = this._players[seat];
            assert_1.default(smallBlind !== null);
            smallBlind.bet(Math.min(this._forcedBets.blinds.small, smallBlind.totalChips()));
            seat = this.nextOrWrap(seat);
            var bigBlind = this._players[seat];
            assert_1.default(bigBlind !== null);
            bigBlind.bet(Math.min(this._forcedBets.blinds.big, bigBlind.totalChips()));
            return seat;
          };
          Dealer2.prototype.dealHoleCards = function() {
            var _this = this;
            this._players.forEach(function(player, index) {
              if (player !== null) {
                _this._holeCards[index] = [_this._deck.draw(), _this._deck.draw()];
              }
            });
          };
          Dealer2.prototype.dealCommunityCards = function() {
            var cards = [];
            var numCardsToDeal = this._roundOfBetting - this._communityCards.cards().length;
            for (var index = 0; index < numCardsToDeal; index++) {
              cards.push(this._deck.draw());
            }
            this._communityCards.deal(cards);
          };
          return Dealer2;
        })()
      );
      exports.default = Dealer;
    }
  });

  // node_modules/poker-ts/dist/util/bit.js
  var require_bit = __commonJS({
    "node_modules/poker-ts/dist/util/bit.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bitCount = void 0;
      function bitCount(n) {
        n = n - (n >> 1 & 1431655765);
        n = (n & 858993459) + (n >> 2 & 858993459);
        return (n + (n >> 4) & 252645135) * 16843009 >> 24;
      }
      exports.bitCount = bitCount;
    }
  });

  // node_modules/poker-ts/dist/type-guards/chips.js
  var require_chips = __commonJS({
    "node_modules/poker-ts/dist/type-guards/chips.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isChips = void 0;
      function isChips(chips) {
        return typeof chips === "number";
      }
      exports.isChips = isChips;
    }
  });

  // node_modules/poker-ts/dist/lib/player.js
  var require_player = __commonJS({
    "node_modules/poker-ts/dist/lib/player.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var chips_1 = require_chips();
      var Player = (
        /** @class */
        (function() {
          function Player2(arg) {
            this._total = 0;
            this._betSize = 0;
            if (chips_1.isChips(arg)) {
              this._total = arg;
            } else if (arg instanceof Player2) {
              this._total = arg._total;
              this._betSize = arg._betSize;
            } else {
              throw new Error("Invalid argument");
            }
          }
          Player2.prototype.stack = function() {
            return this._total - this._betSize;
          };
          Player2.prototype.betSize = function() {
            return this._betSize;
          };
          Player2.prototype.totalChips = function() {
            return this._total;
          };
          Player2.prototype.addToStack = function(amount) {
            this._total += amount;
          };
          Player2.prototype.takeFromStack = function(amount) {
            this._total -= amount;
          };
          Player2.prototype.bet = function(amount) {
            assert_1.default(amount <= this._total, "Player cannot bet more than he/she has");
            assert_1.default(amount >= this._betSize, "Player must bet more than he/she has previously");
            this._betSize = amount;
          };
          Player2.prototype.takeFromBet = function(amount) {
            assert_1.default(amount <= this._betSize, "Cannot take from bet more than is there");
            this._total -= amount;
            this._betSize -= amount;
          };
          return Player2;
        })()
      );
      exports.default = Player;
    }
  });

  // node_modules/poker-ts/dist/lib/table.js
  var require_table = __commonJS({
    "node_modules/poker-ts/dist/lib/table.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AutomaticAction = void 0;
      var deck_1 = __importDefault(require_deck());
      var community_cards_1 = __importDefault(require_community_cards());
      var dealer_1 = __importStar(require_dealer());
      var assert_1 = __importDefault((init_assert(), __toCommonJS(assert_exports)));
      var bit_1 = require_bit();
      var player_1 = __importDefault(require_player());
      var AutomaticAction;
      (function(AutomaticAction2) {
        AutomaticAction2[AutomaticAction2["FOLD"] = 1] = "FOLD";
        AutomaticAction2[AutomaticAction2["CHECK_FOLD"] = 2] = "CHECK_FOLD";
        AutomaticAction2[AutomaticAction2["CHECK"] = 4] = "CHECK";
        AutomaticAction2[AutomaticAction2["CALL"] = 8] = "CALL";
        AutomaticAction2[AutomaticAction2["CALL_ANY"] = 16] = "CALL_ANY";
        AutomaticAction2[AutomaticAction2["ALL_IN"] = 32] = "ALL_IN";
      })(AutomaticAction = exports.AutomaticAction || (exports.AutomaticAction = {}));
      var Table = (
        /** @class */
        (function() {
          function Table2(forcedBets, numSeats) {
            if (numSeats === void 0) {
              numSeats = 9;
            }
            this._firstTimeButton = true;
            this._buttonSetManually = false;
            this._button = 0;
            assert_1.default(numSeats <= 23, "Maximum 23 players");
            this._numSeats = numSeats;
            this._forcedBets = forcedBets;
            this._tablePlayers = new Array(numSeats).fill(null);
            this._staged = new Array(numSeats).fill(false);
            this._deck = new deck_1.default();
          }
          Table2.prototype.playerToAct = function() {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.playerToAct();
          };
          Table2.prototype.button = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.button();
          };
          Table2.prototype.seats = function() {
            return this._tablePlayers;
          };
          Table2.prototype.handPlayers = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.players();
          };
          Table2.prototype.numActivePlayers = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.numActivePlayers();
          };
          Table2.prototype.pots = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.pots();
          };
          Table2.prototype.forcedBets = function() {
            return this._forcedBets;
          };
          Table2.prototype.setForcedBets = function(forcedBets) {
            assert_1.default(!this.handInProgress(), "Hand must not be in progress");
            this._forcedBets = forcedBets;
          };
          Table2.prototype.numSeats = function() {
            return this._numSeats;
          };
          Table2.prototype.startHand = function(seat) {
            assert_1.default(!this.handInProgress(), "Hand must not be in progress");
            assert_1.default(this._tablePlayers.filter(function(player) {
              return player !== null;
            }).length >= 2, "There must be at least 2 players at the table");
            if (seat !== void 0) {
              this._button = seat;
              this._buttonSetManually = true;
            }
            this._staged = new Array(this._numSeats).fill(false);
            this._automaticActions = new Array(this._numSeats).fill(null);
            this._handPlayers = this._tablePlayers.map(function(player) {
              return player ? new player_1.default(player) : null;
            });
            this.incrementButton();
            this._deck.fillAndShuffle();
            this._communityCards = new community_cards_1.default();
            this._dealer = new dealer_1.default(this._handPlayers, this._button, this._forcedBets, this._deck, this._communityCards);
            this._dealer.startHand();
            this.updateTablePlayers();
          };
          Table2.prototype.handInProgress = function() {
            var _a, _b;
            return (_b = (_a = this._dealer) === null || _a === void 0 ? void 0 : _a.handInProgress()) !== null && _b !== void 0 ? _b : false;
          };
          Table2.prototype.bettingRoundInProgress = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.bettingRoundInProgress();
          };
          Table2.prototype.bettingRoundsCompleted = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.bettingRoundsCompleted();
          };
          Table2.prototype.roundOfBetting = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.roundOfBetting();
          };
          Table2.prototype.communityCards = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._communityCards !== void 0);
            return this._communityCards;
          };
          Table2.prototype.legalActions = function() {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.legalActions();
          };
          Table2.prototype.holeCards = function() {
            assert_1.default(this.handInProgress() || this.bettingRoundsCompleted(), "Hand must be in progress or showdown must have ended");
            assert_1.default(this._dealer !== void 0);
            return this._dealer.holeCards();
          };
          Table2.prototype.actionTaken = function(action, bet) {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this._dealer !== void 0);
            assert_1.default(this._automaticActions !== void 0);
            this._dealer.actionTaken(action, bet);
            while (this._dealer.bettingRoundInProgress()) {
              this.amendAutomaticActions();
              var playerToAct = this.playerToAct();
              var automaticAction = this._automaticActions[playerToAct];
              if (automaticAction !== null) {
                this.takeAutomaticAction(automaticAction);
                this._automaticActions[playerToAct] = null;
              } else {
                break;
              }
            }
            if (this.bettingRoundInProgress() && this.singleActivePlayerRemaining()) {
              this.actPassively();
            }
            this.updateTablePlayers();
          };
          Table2.prototype.endBettingRound = function() {
            assert_1.default(!this.bettingRoundInProgress(), "Betting round must not be in progress");
            assert_1.default(!this.bettingRoundsCompleted(), "Betting rounds must not be completed");
            assert_1.default(this._dealer !== void 0);
            this._dealer.endBettingRound();
            this.amendAutomaticActions();
            this.updateTablePlayers();
            this.clearFoldedBets();
          };
          Table2.prototype.showdown = function() {
            assert_1.default(!this.bettingRoundInProgress(), "Betting round must not be in progress");
            assert_1.default(this.bettingRoundsCompleted(), "Betting rounds must be completed");
            assert_1.default(this._dealer !== void 0);
            this._dealer.showdown();
            this.updateTablePlayers();
            this.standUpBustedPlayers();
          };
          Table2.prototype.winners = function() {
            var _a, _b;
            assert_1.default(!this.handInProgress(), "Hand must not be in progress");
            return (_b = (_a = this._dealer) === null || _a === void 0 ? void 0 : _a.winners()) !== null && _b !== void 0 ? _b : [];
          };
          Table2.prototype.automaticActions = function() {
            assert_1.default(this.handInProgress(), "Hand must be in progress");
            assert_1.default(this._automaticActions !== void 0);
            return this._automaticActions;
          };
          Table2.prototype.canSetAutomaticAction = function(seat) {
            assert_1.default(this.bettingRoundInProgress(), "Betting round must be in progress");
            assert_1.default(this._staged !== void 0);
            return !this._staged[seat] && this._tablePlayers[seat] !== null;
          };
          Table2.prototype.legalAutomaticActions = function(seat) {
            assert_1.default(this.canSetAutomaticAction(seat), "Player must be allowed to set automatic actions");
            assert_1.default(this._dealer !== void 0);
            var biggestBet = this._dealer.biggestBet();
            var player = this._tablePlayers[seat];
            assert_1.default(player !== null);
            var betSize = player.betSize();
            var totalChips = player.totalChips();
            var legalActions = AutomaticAction.FOLD | AutomaticAction.ALL_IN;
            var canCheck = biggestBet - betSize === 0;
            if (canCheck) {
              legalActions |= AutomaticAction.CHECK_FOLD | AutomaticAction.CHECK;
            } else {
              legalActions |= AutomaticAction.CALL;
            }
            if (biggestBet < totalChips) {
              legalActions |= AutomaticAction.CALL_ANY;
            }
            return legalActions;
          };
          Table2.prototype.setAutomaticAction = function(seat, action) {
            assert_1.default(this.canSetAutomaticAction(seat), "Player must be allowed to set automatic actions");
            assert_1.default(seat !== this.playerToAct(), "Player must not be the player to act");
            assert_1.default(action === null || bit_1.bitCount(action) === 1, "Player must pick one automatic action or null");
            assert_1.default(action === null || action & this.legalAutomaticActions(seat), "Given automatic action must be legal");
            assert_1.default(this._automaticActions !== void 0);
            this._automaticActions[seat] = action;
          };
          Table2.prototype.sitDown = function(seat, buyIn) {
            assert_1.default(seat < this._numSeats && seat >= 0, "Given seat index must be valid");
            assert_1.default(this._tablePlayers[seat] === null, "Given seat must not be occupied");
            this._tablePlayers[seat] = new player_1.default(buyIn);
            this._staged[seat] = true;
          };
          Table2.prototype.standUp = function(seat) {
            assert_1.default(seat < this._numSeats && seat >= 0, "Given seat index must be valid");
            assert_1.default(this._tablePlayers[seat] !== null, "Given seat must be occupied");
            if (this.handInProgress()) {
              assert_1.default(this.bettingRoundInProgress());
              assert_1.default(this._handPlayers !== void 0);
              if (seat === this.playerToAct()) {
                this.actionTaken(dealer_1.Action.FOLD);
                this._tablePlayers[seat] = null;
                this._staged[seat] = true;
              } else if (this._handPlayers[seat] !== null) {
                this.setAutomaticAction(seat, AutomaticAction.FOLD);
                this._tablePlayers[seat] = null;
                this._staged[seat] = true;
                if (this.singleActivePlayerRemaining()) {
                  this.actPassively();
                }
              }
            } else {
              this._tablePlayers[seat] = null;
            }
          };
          Table2.prototype.takeAutomaticAction = function(automaticAction) {
            assert_1.default(this._dealer !== void 0);
            assert_1.default(this._handPlayers !== void 0);
            var player = this._handPlayers[this._dealer.playerToAct()];
            assert_1.default(player !== null);
            var biggestBet = this._dealer.biggestBet();
            var betGap = biggestBet - player.betSize();
            var totalChips = player.totalChips();
            switch (automaticAction) {
              case AutomaticAction.FOLD:
                return this._dealer.actionTaken(dealer_1.Action.FOLD);
              case AutomaticAction.CHECK_FOLD:
                return this._dealer.actionTaken(betGap === 0 ? dealer_1.Action.CHECK : dealer_1.Action.FOLD);
              case AutomaticAction.CHECK:
                return this._dealer.actionTaken(dealer_1.Action.CHECK);
              case AutomaticAction.CALL:
                return this._dealer.actionTaken(dealer_1.Action.CALL);
              case AutomaticAction.CALL_ANY:
                return this._dealer.actionTaken(betGap === 0 ? dealer_1.Action.CHECK : dealer_1.Action.CALL);
              case AutomaticAction.ALL_IN:
                if (totalChips < biggestBet) {
                  return this._dealer.actionTaken(dealer_1.Action.CALL);
                }
                return this._dealer.actionTaken(dealer_1.Action.RAISE, totalChips);
              default:
                assert_1.default(false);
            }
          };
          Table2.prototype.amendAutomaticActions = function() {
            assert_1.default(this._dealer !== void 0);
            assert_1.default(this._automaticActions !== void 0);
            assert_1.default(this._handPlayers !== void 0);
            var biggestBet = this._dealer.biggestBet();
            for (var s = 0; s < this._numSeats; s++) {
              var automaticAction = this._automaticActions[s];
              if (automaticAction !== null) {
                var player = this._handPlayers[s];
                assert_1.default(player !== null);
                var isContested = this._dealer.isContested();
                var betGap = biggestBet - player.betSize();
                var totalChips = player.totalChips();
                if (automaticAction & AutomaticAction.CHECK_FOLD && betGap > 0) {
                  this._automaticActions[s] = AutomaticAction.FOLD;
                } else if (automaticAction & AutomaticAction.CHECK && betGap > 0) {
                  this._automaticActions[s] = null;
                } else if (automaticAction & AutomaticAction.CALL_ANY && biggestBet >= totalChips) {
                  this._automaticActions[s] = AutomaticAction.CALL;
                }
              }
            }
          };
          Table2.prototype.actPassively = function() {
            assert_1.default(this._dealer !== void 0);
            var legalActions = this._dealer.legalActions();
            if (legalActions.action & dealer_1.Action.BET) {
              this.actionTaken(dealer_1.Action.CHECK);
            } else {
              assert_1.default(legalActions.action & dealer_1.Action.CALL);
              this.actionTaken(dealer_1.Action.CALL);
            }
          };
          Table2.prototype.incrementButton = function() {
            assert_1.default(this._handPlayers !== void 0);
            if (this._buttonSetManually) {
              this._buttonSetManually = false;
              this._firstTimeButton = false;
              this._button = this._handPlayers[this._button] ? this._button : this._handPlayers.findIndex(function(player) {
                return player !== null;
              });
              assert_1.default(this._button !== -1);
            } else if (this._firstTimeButton) {
              var seat = this._handPlayers.findIndex(function(player) {
                return player !== null;
              });
              assert_1.default(seat !== -1);
              this._button = seat;
              this._firstTimeButton = false;
            } else {
              var offset = this._button + 1;
              var seat = this._handPlayers.slice(offset).findIndex(function(player) {
                return player !== null;
              });
              this._button = seat !== -1 ? seat + offset : this._handPlayers.findIndex(function(player) {
                return player !== null;
              });
            }
          };
          Table2.prototype.clearFoldedBets = function() {
            assert_1.default(this._handPlayers !== void 0);
            for (var s = 0; s < this._numSeats; s++) {
              var handPlayer = this._handPlayers[s];
              var tablePlayer = this._tablePlayers[s];
              if (!this._staged[s] && handPlayer === null && tablePlayer !== null && tablePlayer.betSize() > 0) {
                assert_1.default(this._tablePlayers[s] !== null);
                this._tablePlayers[s] = new player_1.default(tablePlayer.stack());
              }
            }
          };
          Table2.prototype.updateTablePlayers = function() {
            assert_1.default(this._handPlayers !== void 0);
            for (var s = 0; s < this._numSeats; s++) {
              var handPlayer = this._handPlayers[s];
              if (!this._staged[s] && handPlayer !== null) {
                assert_1.default(this._tablePlayers[s] !== null);
                this._tablePlayers[s] = new player_1.default(handPlayer);
              }
            }
          };
          Table2.prototype.singleActivePlayerRemaining = function() {
            var _this = this;
            assert_1.default(this.bettingRoundInProgress());
            assert_1.default(this._dealer !== void 0);
            var bettingRoundPlayers = this._dealer.bettingRoundPlayers();
            var activePlayers = bettingRoundPlayers.filter(function(player, index) {
              return player !== null && !_this._staged[index];
            });
            return activePlayers.length === 1;
          };
          Table2.prototype.standUpBustedPlayers = function() {
            assert_1.default(!this.handInProgress());
            for (var s = 0; s < this._numSeats; s++) {
              var player = this._tablePlayers[s];
              if (player !== null && player.totalChips() === 0) {
                this._tablePlayers[s] = null;
              }
            }
          };
          return Table2;
        })()
      );
      exports.default = Table;
    }
  });

  // node_modules/poker-ts/dist/facade/poker.js
  var require_poker = __commonJS({
    "node_modules/poker-ts/dist/facade/poker.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var table_1 = __importStar(require_table());
      var community_cards_1 = require_community_cards();
      var card_1 = require_card();
      var dealer_1 = require_dealer();
      var cardMapper = function(card) {
        return {
          // @ts-ignore
          rank: card_1.CardRank[card.rank].replace(/^_/, ""),
          // @ts-ignore
          suit: card_1.CardSuit[card.suit].toLowerCase()
        };
      };
      var seatArrayMapper = function(player) {
        return player === null ? null : {
          totalChips: player.totalChips(),
          stack: player.stack(),
          betSize: player.betSize()
        };
      };
      var actionFlagToStringArray = function(actionFlag) {
        var actions = [];
        if (actionFlag & dealer_1.Action.FOLD)
          actions.push("fold");
        if (actionFlag & dealer_1.Action.CHECK)
          actions.push("check");
        if (actionFlag & dealer_1.Action.CALL)
          actions.push("call");
        if (actionFlag & dealer_1.Action.BET)
          actions.push("bet");
        if (actionFlag & dealer_1.Action.RAISE)
          actions.push("raise");
        return actions;
      };
      var automaticActionFlagToStringArray = function(automaticActionFlag) {
        var automaticActions = [];
        if (automaticActionFlag & table_1.AutomaticAction.FOLD)
          automaticActions.push("fold");
        if (automaticActionFlag & table_1.AutomaticAction.CHECK_FOLD)
          automaticActions.push("check/fold");
        if (automaticActionFlag & table_1.AutomaticAction.CHECK)
          automaticActions.push("check");
        if (automaticActionFlag & table_1.AutomaticAction.CALL)
          automaticActions.push("call");
        if (automaticActionFlag & table_1.AutomaticAction.CALL_ANY)
          automaticActions.push("call any");
        if (automaticActionFlag & table_1.AutomaticAction.ALL_IN)
          automaticActions.push("all-in");
        return automaticActions;
      };
      var stringToAutomaticActionFlag = function(automaticAction) {
        switch (automaticAction) {
          case "fold":
            return table_1.AutomaticAction.FOLD;
          case "check/fold":
            return table_1.AutomaticAction.CHECK_FOLD;
          case "check":
            return table_1.AutomaticAction.CHECK;
          case "call":
            return table_1.AutomaticAction.CALL;
          case "call any":
            return table_1.AutomaticAction.CALL_ANY;
          case "all-in":
            return table_1.AutomaticAction.ALL_IN;
        }
      };
      var Poker2 = (
        /** @class */
        (function() {
          function Poker3(forcedBets, numSeats) {
            var ante = forcedBets.ante, big = forcedBets.bigBlind, small = forcedBets.smallBlind;
            this._table = new table_1.default({ ante, blinds: { big, small } }, numSeats);
          }
          Poker3.prototype.playerToAct = function() {
            return this._table.playerToAct();
          };
          Poker3.prototype.button = function() {
            return this._table.button();
          };
          Poker3.prototype.seats = function() {
            return this._table.seats().map(seatArrayMapper);
          };
          Poker3.prototype.handPlayers = function() {
            return this._table.handPlayers().map(seatArrayMapper);
          };
          Poker3.prototype.numActivePlayers = function() {
            return this._table.numActivePlayers();
          };
          Poker3.prototype.pots = function() {
            return this._table.pots().map(function(pot) {
              return {
                size: pot.size(),
                eligiblePlayers: pot.eligiblePlayers()
              };
            });
          };
          Poker3.prototype.forcedBets = function() {
            var _a = this._table.forcedBets(), _b = _a.ante, ante = _b === void 0 ? 0 : _b, _c = _a.blinds, bigBlind = _c.big, smallBlind = _c.small;
            return {
              ante,
              smallBlind,
              bigBlind
            };
          };
          Poker3.prototype.setForcedBets = function(forcedBets) {
            var ante = forcedBets.ante, big = forcedBets.bigBlind, small = forcedBets.smallBlind;
            this._table.setForcedBets({ ante, blinds: { small, big } });
          };
          Poker3.prototype.numSeats = function() {
            return this._table.numSeats();
          };
          Poker3.prototype.startHand = function(seat) {
            this._table.startHand(seat);
          };
          Poker3.prototype.isHandInProgress = function() {
            return this._table.handInProgress();
          };
          Poker3.prototype.isBettingRoundInProgress = function() {
            return this._table.bettingRoundInProgress();
          };
          Poker3.prototype.areBettingRoundsCompleted = function() {
            return this._table.bettingRoundsCompleted();
          };
          Poker3.prototype.roundOfBetting = function() {
            var rob = this._table.roundOfBetting();
            return community_cards_1.RoundOfBetting[rob].toLowerCase();
          };
          Poker3.prototype.communityCards = function() {
            return this._table.communityCards().cards().map(cardMapper);
          };
          Poker3.prototype.legalActions = function() {
            var _a = this._table.legalActions(), action = _a.action, chipRange = _a.chipRange;
            return {
              actions: actionFlagToStringArray(action),
              chipRange
            };
          };
          Poker3.prototype.holeCards = function() {
            return this._table.holeCards().map(function(cards) {
              return cards === null ? null : cards.map(cardMapper);
            });
          };
          Poker3.prototype.actionTaken = function(action, betSize) {
            this._table.actionTaken(dealer_1.Action[action.toUpperCase()], betSize);
          };
          Poker3.prototype.endBettingRound = function() {
            this._table.endBettingRound();
          };
          Poker3.prototype.showdown = function() {
            this._table.showdown();
          };
          Poker3.prototype.winners = function() {
            return this._table.winners().map(function(potWinners) {
              return potWinners.map(function(winner) {
                var seatIndex = winner[0], hand = winner[1], holeCards = winner[2];
                return [
                  seatIndex,
                  {
                    cards: hand.cards().map(cardMapper),
                    ranking: hand.ranking(),
                    strength: hand.strength()
                  },
                  holeCards.map(cardMapper)
                ];
              });
            });
          };
          Poker3.prototype.automaticActions = function() {
            return this._table.automaticActions().map(function(action) {
              return action === null ? null : automaticActionFlagToStringArray(action)[0];
            });
          };
          Poker3.prototype.canSetAutomaticActions = function(seatIndex) {
            return this._table.canSetAutomaticAction(seatIndex);
          };
          Poker3.prototype.legalAutomaticActions = function(seatIndex) {
            var automaticActionFlag = this._table.legalAutomaticActions(seatIndex);
            return automaticActionFlagToStringArray(automaticActionFlag);
          };
          Poker3.prototype.setAutomaticAction = function(seatIndex, action) {
            var automaticAction = action === null ? action : stringToAutomaticActionFlag(action);
            this._table.setAutomaticAction(seatIndex, automaticAction);
          };
          Poker3.prototype.sitDown = function(seatIndex, buyIn) {
            this._table.sitDown(seatIndex, buyIn);
          };
          Poker3.prototype.standUp = function(seatIndex) {
            this._table.standUp(seatIndex);
          };
          return Poker3;
        })()
      );
      exports.default = Poker2;
    }
  });

  // node_modules/poker-ts/dist/index.js
  var require_dist = __commonJS({
    "node_modules/poker-ts/dist/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Table = void 0;
      var poker_1 = __importDefault(require_poker());
      exports.Table = poker_1.default;
    }
  });

  // node_modules/pokersolver/pokersolver.js
  var require_pokersolver = __commonJS({
    "node_modules/pokersolver/pokersolver.js"(exports) {
      (function() {
        "use strict";
        var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        class Card {
          constructor(str) {
            this.value = str.substr(0, 1);
            this.suit = str.substr(1, 1).toLowerCase();
            this.rank = values.indexOf(this.value);
            this.wildValue = str.substr(0, 1);
          }
          toString() {
            return this.wildValue.replace("T", "10") + this.suit;
          }
          static sort(a, b) {
            if (a.rank > b.rank) {
              return -1;
            } else if (a.rank < b.rank) {
              return 1;
            } else {
              return 0;
            }
          }
        }
        class Hand2 {
          constructor(cards, name, game, canDisqualify) {
            this.cardPool = [];
            this.cards = [];
            this.suits = {};
            this.values = [];
            this.wilds = [];
            this.name = name;
            this.game = game;
            this.sfLength = 0;
            this.alwaysQualifies = true;
            if (canDisqualify && this.game.lowestQualified) {
              this.alwaysQualifies = false;
            }
            if (game.descr === "standard" && new Set(cards).size !== cards.length) {
              throw new Error("Duplicate cards");
            }
            var handRank = this.game.handValues.length;
            for (var i = 0; i < this.game.handValues.length; i++) {
              if (this.game.handValues[i] === this.constructor) {
                break;
              }
            }
            this.rank = handRank - i;
            this.cardPool = cards.map(function(c) {
              return typeof c === "string" ? new Card(c) : c;
            });
            for (var i = 0; i < this.cardPool.length; i++) {
              card = this.cardPool[i];
              if (card.value === this.game.wildValue) {
                card.rank = -1;
              }
            }
            this.cardPool = this.cardPool.sort(Card.sort);
            var obj, obj1, key2, key1, card;
            for (var i = 0; i < this.cardPool.length; i++) {
              card = this.cardPool[i];
              if (card.rank === -1) {
                this.wilds.push(card);
              } else {
                (obj = this.suits)[key2 = card.suit] || (obj[key2] = []);
                (obj1 = this.values)[key1 = card.rank] || (obj1[key1] = []);
                this.suits[card.suit].push(card);
                this.values[card.rank].push(card);
              }
            }
            this.values.reverse();
            this.isPossible = this.solve();
          }
          /**
           * Compare current hand with another to determine which is the winner.
           * @param  {Hand} a Hand to compare to.
           * @return {Number}
           */
          compare(a) {
            if (this.rank < a.rank) {
              return 1;
            } else if (this.rank > a.rank) {
              return -1;
            }
            var result = 0;
            for (var i = 0; i <= 4; i++) {
              if (this.cards[i] && a.cards[i] && this.cards[i].rank < a.cards[i].rank) {
                result = 1;
                break;
              } else if (this.cards[i] && a.cards[i] && this.cards[i].rank > a.cards[i].rank) {
                result = -1;
                break;
              }
            }
            return result;
          }
          /**
           * Determine whether a hand loses to another.
           * @param  {Hand} hand Hand to compare to.
           * @return {Boolean}
           */
          loseTo(hand) {
            return this.compare(hand) > 0;
          }
          /**
           * Determine the number of cards in a hand of a rank.
           * @param  {Number} val Index of this.values.
           * @return {Number} Number of cards having the rank, including wild cards.
           */
          getNumCardsByRank(val) {
            var cards = this.values[val];
            var checkCardsLength = cards ? cards.length : 0;
            for (var i = 0; i < this.wilds.length; i++) {
              if (this.wilds[i].rank > -1) {
                continue;
              } else if (cards) {
                if (this.game.wildStatus === 1 || cards[0].rank === values.length - 1) {
                  checkCardsLength += 1;
                }
              } else if (this.game.wildStatus === 1 || val === values.length - 1) {
                checkCardsLength += 1;
              }
            }
            return checkCardsLength;
          }
          /**
           * Determine the cards in a suit for a flush.
           * @param  {String} suit Key for this.suits.
           * @param  {Boolean} setRanks Whether to set the ranks for the wild cards.
           * @return {Array} Cards having the suit, including wild cards.
           */
          getCardsForFlush(suit, setRanks) {
            var cards = (this.suits[suit] || []).sort(Card.sort);
            for (var i = 0; i < this.wilds.length; i++) {
              var wild = this.wilds[i];
              if (setRanks) {
                var j = 0;
                while (j < values.length && j < cards.length) {
                  if (cards[j].rank === values.length - 1 - j) {
                    j += 1;
                  } else {
                    break;
                  }
                }
                wild.rank = values.length - 1 - j;
                wild.wildValue = values[wild.rank];
              }
              cards.push(wild);
              cards = cards.sort(Card.sort);
            }
            return cards;
          }
          /**
           * Resets the rank and wild values of the wild cards.
           */
          resetWildCards() {
            for (var i = 0; i < this.wilds.length; i++) {
              this.wilds[i].rank = -1;
              this.wilds[i].wildValue = this.wilds[i].value;
            }
          }
          /**
           * Highest card comparison.
           * @return {Array} Highest cards
           */
          nextHighest() {
            var picks;
            var excluding = [];
            excluding = excluding.concat(this.cards);
            picks = this.cardPool.filter(function(card2) {
              if (excluding.indexOf(card2) < 0) {
                return true;
              }
            });
            if (this.game.wildStatus === 0) {
              for (var i = 0; i < picks.length; i++) {
                var card = picks[i];
                if (card.rank === -1) {
                  card.wildValue = "A";
                  card.rank = values.length - 1;
                }
              }
              picks = picks.sort(Card.sort);
            }
            return picks;
          }
          /**
           * Return list of contained cards in human readable format.
           * @return {String}
           */
          toString() {
            var cards = this.cards.map(function(c) {
              return c.toString();
            });
            return cards.join(", ");
          }
          /**
           * Return array of contained cards.
           * @return {Array}
           */
          toArray() {
            var cards = this.cards.map(function(c) {
              return c.toString();
            });
            return cards;
          }
          /**
           * Determine if qualifying hand.
           * @return {Boolean}
           */
          qualifiesHigh() {
            if (!this.game.lowestQualified || this.alwaysQualifies) {
              return true;
            }
            return this.compare(Hand2.solve(this.game.lowestQualified, this.game)) <= 0;
          }
          /**
           * Find highest ranked hands and remove any that don't qualify or lose to another hand.
           * @param  {Array} hands Hands to evaluate.
           * @return {Array}       Winning hands.
           */
          static winners(hands) {
            hands = hands.filter(function(h) {
              return h.qualifiesHigh();
            });
            var highestRank = Math.max.apply(Math, hands.map(function(h) {
              return h.rank;
            }));
            hands = hands.filter(function(h) {
              return h.rank === highestRank;
            });
            hands = hands.filter(function(h) {
              var lose = false;
              for (var i = 0; i < hands.length; i++) {
                lose = h.loseTo(hands[i]);
                if (lose) {
                  break;
                }
              }
              return !lose;
            });
            return hands;
          }
          /**
           * Build and return the best hand.
           * @param  {Array} cards Array of cards (['Ad', '3c', 'Th', ...]).
           * @param  {String} game Game being played.
           * @param  {Boolean} canDisqualify Check for a qualified hand.
           * @return {Hand}       Best hand.
           */
          static solve(cards, game, canDisqualify) {
            game = game || "standard";
            game = typeof game === "string" ? new Game2(game) : game;
            cards = cards || [""];
            var hands = game.handValues;
            var result = null;
            for (var i = 0; i < hands.length; i++) {
              result = new hands[i](cards, game, canDisqualify);
              if (result.isPossible) {
                break;
              }
            }
            return result;
          }
          /**
           * Separate cards based on if they are wild cards.
           * @param  {Array} cards Array of cards (['Ad', '3c', 'Th', ...]).
           * @param  {Game} game Game being played.
           * @return {Array} [wilds, nonWilds] Wild and non-Wild Cards.
           */
          static stripWilds(cards, game) {
            var card, wilds, nonWilds;
            cards = cards || [""];
            wilds = [];
            nonWilds = [];
            for (var i = 0; i < cards.length; i++) {
              card = cards[i];
              if (card.rank === -1) {
                wilds.push(cards[i]);
              } else {
                nonWilds.push(cards[i]);
              }
            }
            return [wilds, nonWilds];
          }
        }
        class StraightFlush extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Straight Flush", game, canDisqualify);
          }
          solve() {
            var cards;
            this.resetWildCards();
            var possibleStraight = null;
            var nonCards = [];
            for (var suit in this.suits) {
              cards = this.getCardsForFlush(suit, false);
              if (cards && cards.length >= this.game.sfQualify) {
                possibleStraight = cards;
                break;
              }
            }
            if (possibleStraight) {
              if (this.game.descr !== "standard") {
                for (var suit in this.suits) {
                  if (possibleStraight[0].suit !== suit) {
                    nonCards = nonCards.concat(this.suits[suit] || []);
                    nonCards = Hand2.stripWilds(nonCards, this.game)[1];
                  }
                }
              }
              var straight = new Straight(possibleStraight, this.game);
              if (straight.isPossible) {
                this.cards = straight.cards;
                this.cards = this.cards.concat(nonCards);
                this.sfLength = straight.sfLength;
              }
            }
            if (this.cards[0] && this.cards[0].rank === 13) {
              this.descr = "Royal Flush";
            } else if (this.cards.length >= this.game.sfQualify) {
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + suit + " High";
            }
            return this.cards.length >= this.game.sfQualify;
          }
        }
        class RoyalFlush extends StraightFlush {
          constructor(cards, game, canDisqualify) {
            super(cards, game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            var result = super.solve();
            return result && this.descr === "Royal Flush";
          }
        }
        class NaturalRoyalFlush extends RoyalFlush {
          constructor(cards, game, canDisqualify) {
            super(cards, game, canDisqualify);
          }
          solve() {
            var i = 0;
            this.resetWildCards();
            var result = super.solve();
            if (result && this.cards) {
              for (i = 0; i < this.game.sfQualify && i < this.cards.length; i++) {
                if (this.cards[i].value === this.game.wildValue) {
                  result = false;
                  this.descr = "Wild Royal Flush";
                  break;
                }
              }
              if (i === this.game.sfQualify) {
                this.descr = "Royal Flush";
              }
            }
            return result;
          }
        }
        class WildRoyalFlush extends RoyalFlush {
          constructor(cards, game, canDisqualify) {
            super(cards, game, canDisqualify);
          }
          solve() {
            var i = 0;
            this.resetWildCards();
            var result = super.solve();
            if (result && this.cards) {
              for (i = 0; i < this.game.sfQualify && i < this.cards.length; i++) {
                if (this.cards[i].value === this.game.wildValue) {
                  this.descr = "Wild Royal Flush";
                  break;
                }
              }
              if (i === this.game.sfQualify) {
                result = false;
                this.descr = "Royal Flush";
              }
            }
            return result;
          }
        }
        class FiveOfAKind extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Five of a Kind", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 5) {
                this.cards = this.values[i] || [];
                for (var j = 0; j < this.wilds.length && this.cards.length < 5; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 5));
                break;
              }
            }
            if (this.cards.length >= 5) {
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + "'s";
            }
            return this.cards.length >= 5;
          }
        }
        class FourOfAKindPairPlus extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Four of a Kind with Pair or Better", game, canDisqualify);
          }
          solve() {
            var cards;
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 4) {
                this.cards = this.values[i] || [];
                for (var j = 0; j < this.wilds.length && this.cards.length < 4; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                break;
              }
            }
            if (this.cards.length === 4) {
              for (i = 0; i < this.values.length; i++) {
                cards = this.values[i];
                if (cards && this.cards[0].wildValue === cards[0].wildValue) {
                  continue;
                }
                if (this.getNumCardsByRank(i) >= 2) {
                  this.cards = this.cards.concat(cards || []);
                  for (var j = 0; j < this.wilds.length; j++) {
                    var wild = this.wilds[j];
                    if (wild.rank !== -1) {
                      continue;
                    }
                    if (cards) {
                      wild.rank = cards[0].rank;
                    } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                      wild.rank = values.length - 2;
                    } else {
                      wild.rank = values.length - 1;
                    }
                    wild.wildValue = values[wild.rank];
                    this.cards.push(wild);
                  }
                  this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 6));
                  break;
                }
              }
            }
            if (this.cards.length >= 6) {
              var type = this.cards[0].toString().slice(0, -1) + "'s over " + this.cards[4].toString().slice(0, -1) + "'s";
              this.descr = this.name + ", " + type;
            }
            return this.cards.length >= 6;
          }
        }
        class FourOfAKind extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Four of a Kind", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 4) {
                this.cards = this.values[i] || [];
                for (var j = 0; j < this.wilds.length && this.cards.length < 4; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 4));
                break;
              }
            }
            if (this.cards.length >= 4) {
              if (this.game.noKickers) {
                this.cards.length = 4;
              }
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + "'s";
            }
            return this.cards.length >= 4;
          }
        }
        class FourWilds extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Four Wild Cards", game, canDisqualify);
          }
          solve() {
            if (this.wilds.length === 4) {
              this.cards = this.wilds;
              this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 4));
            }
            if (this.cards.length >= 4) {
              if (this.game.noKickers) {
                this.cards.length = 4;
              }
              this.descr = this.name;
            }
            return this.cards.length >= 4;
          }
        }
        class ThreeOfAKindTwoPair extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Three of a Kind with Two Pair", game, canDisqualify);
          }
          solve() {
            var cards;
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 3) {
                this.cards = this.values[i] || [];
                for (var j = 0; j < this.wilds.length && this.cards.length < 3; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                break;
              }
            }
            if (this.cards.length === 3) {
              for (var i = 0; i < this.values.length; i++) {
                var cards = this.values[i];
                if (cards && this.cards[0].wildValue === cards[0].wildValue) {
                  continue;
                }
                if (this.cards.length > 5 && this.getNumCardsByRank(i) === 2) {
                  this.cards = this.cards.concat(cards || []);
                  for (var j = 0; j < this.wilds.length; j++) {
                    var wild = this.wilds[j];
                    if (wild.rank !== -1) {
                      continue;
                    }
                    if (cards) {
                      wild.rank = cards[0].rank;
                    } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                      wild.rank = values.length - 2;
                    } else {
                      wild.rank = values.length - 1;
                    }
                    wild.wildValue = values[wild.rank];
                    this.cards.push(wild);
                  }
                  this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 4));
                  break;
                } else if (this.getNumCardsByRank(i) === 2) {
                  this.cards = this.cards.concat(cards);
                  for (var j = 0; j < this.wilds.length; j++) {
                    var wild = this.wilds[j];
                    if (wild.rank !== -1) {
                      continue;
                    }
                    if (cards) {
                      wild.rank = cards[0].rank;
                    } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                      wild.rank = values.length - 2;
                    } else {
                      wild.rank = values.length - 1;
                    }
                    wild.wildValue = values[wild.rank];
                    this.cards.push(wild);
                  }
                }
              }
            }
            if (this.cards.length >= 7) {
              var type = this.cards[0].toString().slice(0, -1) + "'s over " + this.cards[3].toString().slice(0, -1) + "'s & " + this.cards[5].value + "'s";
              this.descr = this.name + ", " + type;
            }
            return this.cards.length >= 7;
          }
        }
        class FullHouse extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Full House", game, canDisqualify);
          }
          solve() {
            var cards;
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 3) {
                this.cards = this.values[i] || [];
                for (var j = 0; j < this.wilds.length && this.cards.length < 3; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                break;
              }
            }
            if (this.cards.length === 3) {
              for (i = 0; i < this.values.length; i++) {
                cards = this.values[i];
                if (cards && this.cards[0].wildValue === cards[0].wildValue) {
                  continue;
                }
                if (this.getNumCardsByRank(i) >= 2) {
                  this.cards = this.cards.concat(cards || []);
                  for (var j = 0; j < this.wilds.length; j++) {
                    var wild = this.wilds[j];
                    if (wild.rank !== -1) {
                      continue;
                    }
                    if (cards) {
                      wild.rank = cards[0].rank;
                    } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                      wild.rank = values.length - 2;
                    } else {
                      wild.rank = values.length - 1;
                    }
                    wild.wildValue = values[wild.rank];
                    this.cards.push(wild);
                  }
                  this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 5));
                  break;
                }
              }
            }
            if (this.cards.length >= 5) {
              var type = this.cards[0].toString().slice(0, -1) + "'s over " + this.cards[3].toString().slice(0, -1) + "'s";
              this.descr = this.name + ", " + type;
            }
            return this.cards.length >= 5;
          }
        }
        class Flush extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Flush", game, canDisqualify);
          }
          solve() {
            this.sfLength = 0;
            this.resetWildCards();
            for (var suit in this.suits) {
              var cards = this.getCardsForFlush(suit, true);
              if (cards.length >= this.game.sfQualify) {
                this.cards = cards;
                break;
              }
            }
            if (this.cards.length >= this.game.sfQualify) {
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + suit + " High";
              this.sfLength = this.cards.length;
              if (this.cards.length < this.game.cardsInHand) {
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - this.cards.length));
              }
            }
            return this.cards.length >= this.game.sfQualify;
          }
        }
        class Straight extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Straight", game, canDisqualify);
          }
          solve() {
            var card, checkCards;
            this.resetWildCards();
            if (this.game.wheelStatus === 1) {
              this.cards = this.getWheel();
              if (this.cards.length) {
                var wildCount = 0;
                for (var i = 0; i < this.cards.length; i++) {
                  card = this.cards[i];
                  if (card.value === this.game.wildValue) {
                    wildCount += 1;
                  }
                  if (card.rank === 0) {
                    card.rank = values.indexOf("A");
                    card.wildValue = "A";
                    if (card.value === "1") {
                      card.value = "A";
                    }
                  }
                }
                this.cards = this.cards.sort(Card.sort);
                for (; wildCount < this.wilds.length && this.cards.length < this.game.cardsInHand; wildCount++) {
                  card = this.wilds[wildCount];
                  card.rank = values.indexOf("A");
                  card.wildValue = "A";
                  this.cards.push(card);
                }
                this.descr = this.name + ", Wheel";
                this.sfLength = this.sfQualify;
                if (this.cards[0].value === "A") {
                  this.cards = this.cards.concat(this.nextHighest().slice(1, this.game.cardsInHand - this.cards.length + 1));
                } else {
                  this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - this.cards.length));
                }
                return true;
              }
              this.resetWildCards();
            }
            this.cards = this.getGaps();
            for (var i = 0; i < this.wilds.length; i++) {
              card = this.wilds[i];
              checkCards = this.getGaps(this.cards.length);
              if (this.cards.length === checkCards.length) {
                if (this.cards[0].rank < values.length - 1) {
                  card.rank = this.cards[0].rank + 1;
                  card.wildValue = values[card.rank];
                  this.cards.push(card);
                } else {
                  card.rank = this.cards[this.cards.length - 1].rank - 1;
                  card.wildValue = values[card.rank];
                  this.cards.push(card);
                }
              } else {
                for (var j = 1; j < this.cards.length; j++) {
                  if (this.cards[j - 1].rank - this.cards[j].rank > 1) {
                    card.rank = this.cards[j - 1].rank - 1;
                    card.wildValue = values[card.rank];
                    this.cards.push(card);
                    break;
                  }
                }
              }
              this.cards = this.cards.sort(Card.sort);
            }
            if (this.cards.length >= this.game.sfQualify) {
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + " High";
              this.cards = this.cards.slice(0, this.game.cardsInHand);
              this.sfLength = this.cards.length;
              if (this.cards.length < this.game.cardsInHand) {
                if (this.cards[this.sfLength - 1].rank === 0) {
                  this.cards = this.cards.concat(this.nextHighest().slice(1, this.game.cardsInHand - this.cards.length + 1));
                } else {
                  this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - this.cards.length));
                }
              }
            }
            return this.cards.length >= this.game.sfQualify;
          }
          /**
           * Get the number of gaps in the straight.
           * @return {Array} Highest potential straight with fewest number of gaps.
           */
          getGaps(checkHandLength) {
            var wildCards, cardsToCheck, i, card, gapCards, cardsList, gapCount, prevCard, diff;
            var stripReturn = Hand2.stripWilds(this.cardPool, this.game);
            wildCards = stripReturn[0];
            cardsToCheck = stripReturn[1];
            for (i = 0; i < cardsToCheck.length; i++) {
              card = cardsToCheck[i];
              if (card.wildValue === "A") {
                cardsToCheck.push(new Card("1" + card.suit));
              }
            }
            cardsToCheck = cardsToCheck.sort(Card.sort);
            if (checkHandLength) {
              i = cardsToCheck[0].rank + 1;
            } else {
              checkHandLength = this.game.sfQualify;
              i = values.length;
            }
            gapCards = [];
            for (; i > 0; i--) {
              cardsList = [];
              gapCount = 0;
              for (var j = 0; j < cardsToCheck.length; j++) {
                card = cardsToCheck[j];
                if (card.rank > i) {
                  continue;
                }
                prevCard = cardsList[cardsList.length - 1];
                diff = prevCard ? prevCard.rank - card.rank : i - card.rank;
                if (diff === null) {
                  cardsList.push(card);
                } else if (checkHandLength < gapCount + diff + cardsList.length) {
                  break;
                } else if (diff > 0) {
                  cardsList.push(card);
                  gapCount += diff - 1;
                }
              }
              if (cardsList.length > gapCards.length) {
                gapCards = cardsList.slice();
              }
              if (this.game.sfQualify - gapCards.length <= wildCards.length) {
                break;
              }
            }
            return gapCards;
          }
          getWheel() {
            var wildCards, cardsToCheck, i, card, wheelCards, wildCount, cardFound;
            var stripReturn = Hand2.stripWilds(this.cardPool, this.game);
            wildCards = stripReturn[0];
            cardsToCheck = stripReturn[1];
            for (i = 0; i < cardsToCheck.length; i++) {
              card = cardsToCheck[i];
              if (card.wildValue === "A") {
                cardsToCheck.push(new Card("1" + card.suit));
              }
            }
            cardsToCheck = cardsToCheck.sort(Card.sort);
            wheelCards = [];
            wildCount = 0;
            for (i = this.game.sfQualify - 1; i >= 0; i--) {
              cardFound = false;
              for (var j = 0; j < cardsToCheck.length; j++) {
                card = cardsToCheck[j];
                if (card.rank > i) {
                  continue;
                }
                if (card.rank < i) {
                  break;
                }
                wheelCards.push(card);
                cardFound = true;
                break;
              }
              if (!cardFound) {
                if (wildCount < wildCards.length) {
                  wildCards[wildCount].rank = i;
                  wildCards[wildCount].wildValue = values[i];
                  wheelCards.push(wildCards[wildCount]);
                  wildCount += 1;
                } else {
                  return [];
                }
              }
            }
            return wheelCards;
          }
        }
        class TwoThreeOfAKind extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Two Three Of a Kind", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              var cards = this.values[i];
              if (this.cards.length > 0 && this.getNumCardsByRank(i) === 3) {
                this.cards = this.cards.concat(cards || []);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 6));
                break;
              } else if (this.getNumCardsByRank(i) === 3) {
                this.cards = this.cards.concat(cards);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
              }
            }
            if (this.cards.length >= 6) {
              var type = this.cards[0].toString().slice(0, -1) + "'s & " + this.cards[3].toString().slice(0, -1) + "'s";
              this.descr = this.name + ", " + type;
            }
            return this.cards.length >= 6;
          }
        }
        class ThreeOfAKind extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Three of a Kind", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 3) {
                this.cards = this.values[i] || [];
                for (var j = 0; j < this.wilds.length && this.cards.length < 3; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 3));
                break;
              }
            }
            if (this.cards.length >= 3) {
              if (this.game.noKickers) {
                this.cards.length = 3;
              }
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + "'s";
            }
            return this.cards.length >= 3;
          }
        }
        class ThreePair extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Three Pair", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              var cards = this.values[i];
              if (this.cards.length > 2 && this.getNumCardsByRank(i) === 2) {
                this.cards = this.cards.concat(cards || []);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 6));
                break;
              } else if (this.cards.length > 0 && this.getNumCardsByRank(i) === 2) {
                this.cards = this.cards.concat(cards || []);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
              } else if (this.getNumCardsByRank(i) === 2) {
                this.cards = this.cards.concat(cards);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
              }
            }
            if (this.cards.length >= 6) {
              var type = this.cards[0].toString().slice(0, -1) + "'s & " + this.cards[2].toString().slice(0, -1) + "'s & " + this.cards[4].toString().slice(0, -1) + "'s";
              this.descr = this.name + ", " + type;
            }
            return this.cards.length >= 6;
          }
        }
        class TwoPair extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Two Pair", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              var cards = this.values[i];
              if (this.cards.length > 0 && this.getNumCardsByRank(i) === 2) {
                this.cards = this.cards.concat(cards || []);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 4));
                break;
              } else if (this.getNumCardsByRank(i) === 2) {
                this.cards = this.cards.concat(cards);
                for (var j = 0; j < this.wilds.length; j++) {
                  var wild = this.wilds[j];
                  if (wild.rank !== -1) {
                    continue;
                  }
                  if (cards) {
                    wild.rank = cards[0].rank;
                  } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
                    wild.rank = values.length - 2;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
              }
            }
            if (this.cards.length >= 4) {
              if (this.game.noKickers) {
                this.cards.length = 4;
              }
              var type = this.cards[0].toString().slice(0, -1) + "'s & " + this.cards[2].toString().slice(0, -1) + "'s";
              this.descr = this.name + ", " + type;
            }
            return this.cards.length >= 4;
          }
        }
        class OnePair extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "Pair", game, canDisqualify);
          }
          solve() {
            this.resetWildCards();
            for (var i = 0; i < this.values.length; i++) {
              if (this.getNumCardsByRank(i) === 2) {
                this.cards = this.cards.concat(this.values[i] || []);
                for (var j = 0; j < this.wilds.length && this.cards.length < 2; j++) {
                  var wild = this.wilds[j];
                  if (this.cards) {
                    wild.rank = this.cards[0].rank;
                  } else {
                    wild.rank = values.length - 1;
                  }
                  wild.wildValue = values[wild.rank];
                  this.cards.push(wild);
                }
                this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand - 2));
                break;
              }
            }
            if (this.cards.length >= 2) {
              if (this.game.noKickers) {
                this.cards.length = 2;
              }
              this.descr = this.name + ", " + this.cards[0].toString().slice(0, -1) + "'s";
            }
            return this.cards.length >= 2;
          }
        }
        class HighCard extends Hand2 {
          constructor(cards, game, canDisqualify) {
            super(cards, "High Card", game, canDisqualify);
          }
          solve() {
            this.cards = this.cardPool.slice(0, this.game.cardsInHand);
            for (var i = 0; i < this.cards.length; i++) {
              var card = this.cards[i];
              if (this.cards[i].value === this.game.wildValue) {
                this.cards[i].wildValue = "A";
                this.cards[i].rank = values.indexOf("A");
              }
            }
            if (this.game.noKickers) {
              this.cards.length = 1;
            }
            this.cards = this.cards.sort(Card.sort);
            this.descr = this.cards[0].toString().slice(0, -1) + " High";
            return true;
          }
        }
        class PaiGowPokerHelper {
          /*
           * Constructor class.
           * @param {Hand} hand Solved hand against Game 'paigowpokerfull'.
           */
          constructor(hand) {
            this.baseHand = null;
            this.hiHand = null;
            this.loHand = null;
            this.game = null;
            this.loGame = new Game2("paigowpokerlo");
            this.hiGame = new Game2("paigowpokerhi");
            if (Array.isArray(hand)) {
              this.baseHand = Hand2.solve(hand, new Game2("paigowpokerfull"));
            } else {
              this.baseHand = hand;
            }
            this.game = this.baseHand.game;
          }
          /*
           * Set a full hand into high and low hands, according to House Way.
           */
          splitHouseWay() {
            var hiCards, loCards;
            var rank = this.game.handValues.length - this.baseHand.rank;
            var handValue = this.game.handValues[rank];
            if (handValue === FiveOfAKind) {
              if (this.baseHand.cards[5].value === "K" && this.baseHand.cards[6].value === "K") {
                loCards = this.baseHand.cards.slice(5, 7);
                hiCards = this.baseHand.cards.slice(0, 5);
              } else {
                loCards = this.baseHand.cards.slice(0, 2);
                hiCards = this.baseHand.cards.slice(2, 7);
              }
            } else if (handValue === FourOfAKindPairPlus) {
              if (this.baseHand.cards[0].wildValue === "A" && this.baseHand.cards[4].value !== "K") {
                hiCards = this.baseHand.cards.slice(0, 2);
                loCards = this.baseHand.cards.slice(2, 4);
                hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
              } else {
                hiCards = this.baseHand.cards.slice(0, 4);
                loCards = this.baseHand.cards.slice(4, 6);
                hiCards.push(this.baseHand.cards[6]);
              }
            } else if (handValue === StraightFlush || handValue === Flush || handValue === Straight) {
              var sfReturn;
              var altGame = new Game2("paigowpokeralt");
              var altHand = Hand2.solve(this.baseHand.cards, altGame);
              var altRank = altGame.handValues.length - altHand.rank;
              if (altGame.handValues[altRank] === FourOfAKind) {
                sfReturn = this.getSFData(altHand.cards);
                hiCards = sfReturn[0];
                loCards = sfReturn[1];
              } else if (altGame.handValues[altRank] === FullHouse) {
                hiCards = altHand.cards.slice(0, 3);
                loCards = altHand.cards.slice(3, 5);
                hiCards = hiCards.concat(altHand.cards.slice(5, 7));
              } else if (altGame.handValues[altRank] === ThreeOfAKind) {
                sfReturn = this.getSFData(altHand.cards);
                hiCards = sfReturn[0];
                loCards = sfReturn[1];
              } else if (altGame.handValues[altRank] === ThreePair) {
                loCards = altHand.cards.slice(0, 2);
                hiCards = altHand.cards.slice(2, 7);
              } else if (altGame.handValues[altRank] === TwoPair) {
                if (altHand.cards[0].rank < 6) {
                  if (altHand.cards[4].wildValue === "A") {
                    hiCards = altHand.cards.slice(0, 4);
                    loCards = altHand.cards.slice(4, 6);
                    hiCards.push(altHand.cards[6]);
                  } else {
                    sfReturn = this.getSFData(altHand.cards);
                    hiCards = sfReturn[0];
                    loCards = sfReturn[1];
                  }
                } else if (altHand.cards[0].rank < 10) {
                  if (altHand.cards[4].wildValue === "A") {
                    hiCards = altHand.cards.slice(0, 4);
                    loCards = altHand.cards.slice(4, 6);
                    hiCards.push(altHand.cards[6]);
                  } else {
                    hiCards = altHand.cards.slice(0, 2);
                    loCards = altHand.cards.slice(2, 4);
                    hiCards = hiCards.concat(altHand.cards.slice(4, 7));
                  }
                } else if (altHand.cards[0].wildValue !== "A" && altHand.cards[2].rank < 6 && altHand.cards[4].wildValue === "A") {
                  hiCards = altHand.cards.slice(0, 4);
                  loCards = altHand.cards.slice(4, 6);
                  hiCards.push(altHand.cards[6]);
                } else {
                  hiCards = altHand.cards.slice(0, 2);
                  loCards = altHand.cards.slice(2, 4);
                  hiCards = hiCards.concat(altHand.cards.slice(4, 7));
                }
              } else if (altGame.handValues[altRank] === OnePair) {
                if (altHand.cards[0].rank >= values.indexOf("T") && altHand.cards[0].rank <= values.indexOf("K") && altHand.cards[2].wildValue === "A") {
                  var possibleSF = altHand.cards.slice(0, 2);
                  possibleSF = possibleSF.concat(altHand.cards.slice(3, 7));
                  sfReturn = this.getSFData(possibleSF);
                  if (sfReturn[0]) {
                    hiCards = sfReturn[0];
                    loCards = sfReturn[1];
                    loCards.push(altHand.cards[2]);
                  } else {
                    hiCards = altHand.cards.slice(0, 2);
                    loCards = altHand.cards.slice(2, 4);
                    hiCards = hiCards.concat(altHand.cards.slice(4, 7));
                  }
                } else {
                  sfReturn = this.getSFData(altHand.cards.slice(2, 7));
                  if (sfReturn[0]) {
                    hiCards = sfReturn[0];
                    loCards = altHand.cards.slice(0, 2);
                  } else {
                    sfReturn = this.getSFData(altHand.cards);
                    hiCards = sfReturn[0];
                    loCards = sfReturn[1];
                  }
                }
              } else {
                sfReturn = this.getSFData(altHand.cards);
                hiCards = sfReturn[0];
                loCards = sfReturn[1];
              }
            } else if (handValue === FourOfAKind) {
              if (this.baseHand.cards[0].rank < 6) {
                hiCards = this.baseHand.cards.slice(0, 4);
                loCards = this.baseHand.cards.slice(4, 6);
                hiCards.push(this.baseHand.cards[6]);
              } else if (this.baseHand.cards[0].rank < 10 && this.baseHand.cards[4].wildValue === "A") {
                hiCards = this.baseHand.cards.slice(0, 4);
                loCards = this.baseHand.cards.slice(4, 6);
                hiCards.push(this.baseHand.cards[6]);
              } else {
                hiCards = this.baseHand.cards.slice(0, 2);
                loCards = this.baseHand.cards.slice(2, 4);
                hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
              }
            } else if (handValue === TwoThreeOfAKind) {
              loCards = this.baseHand.cards.slice(0, 2);
              hiCards = this.baseHand.cards.slice(3, 6);
              hiCards.push(this.baseHand.cards[2]);
              hiCards.push(this.baseHand.cards[6]);
            } else if (handValue === ThreeOfAKindTwoPair) {
              hiCards = this.baseHand.cards.slice(0, 3);
              loCards = this.baseHand.cards.slice(3, 5);
              hiCards = hiCards.concat(this.baseHand.cards.slice(5, 7));
            } else if (handValue === FullHouse) {
              if (this.baseHand.cards[3].wildValue === "2" && this.baseHand.cards[5].wildValue === "A" && this.baseHand.cards[6].wildValue === "K") {
                hiCards = this.baseHand.cards.slice(0, 5);
                loCards = this.baseHand.cards.slice(5, 7);
              } else {
                hiCards = this.baseHand.cards.slice(0, 3);
                loCards = this.baseHand.cards.slice(3, 5);
                hiCards = hiCards.concat(this.baseHand.cards.slice(5, 7));
              }
            } else if (handValue === ThreeOfAKind) {
              if (this.baseHand.cards[0].wildValue === "A") {
                hiCards = this.baseHand.cards.slice(0, 2);
                loCards = this.baseHand.cards.slice(2, 4);
                hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
              } else {
                hiCards = this.baseHand.cards.slice(0, 3);
                loCards = this.baseHand.cards.slice(3, 5);
                hiCards = hiCards.concat(this.baseHand.cards.slice(5, 7));
              }
            } else if (handValue === ThreePair) {
              loCards = this.baseHand.cards.slice(0, 2);
              hiCards = this.baseHand.cards.slice(2, 7);
            } else if (handValue === TwoPair) {
              if (this.baseHand.cards[0].rank < 6) {
                hiCards = this.baseHand.cards.slice(0, 4);
                loCards = this.baseHand.cards.slice(4, 6);
                hiCards.push(this.baseHand.cards[6]);
              } else if (this.baseHand.cards[0].rank < 10) {
                if (this.baseHand.cards[4].wildValue === "A") {
                  hiCards = this.baseHand.cards.slice(0, 4);
                  loCards = this.baseHand.cards.slice(4, 6);
                  hiCards.push(this.baseHand.cards[6]);
                } else {
                  hiCards = this.baseHand.cards.slice(0, 2);
                  loCards = this.baseHand.cards.slice(2, 4);
                  hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
                }
              } else if (this.baseHand.cards[0].wildValue !== "A" && this.baseHand.cards[2].rank < 6 && this.baseHand.cards[4].wildValue === "A") {
                hiCards = this.baseHand.cards.slice(0, 4);
                loCards = this.baseHand.cards.slice(4, 6);
                hiCards.push(this.baseHand.cards[6]);
              } else {
                hiCards = this.baseHand.cards.slice(0, 2);
                loCards = this.baseHand.cards.slice(2, 4);
                hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
              }
            } else if (handValue === OnePair) {
              hiCards = this.baseHand.cards.slice(0, 2);
              loCards = this.baseHand.cards.slice(2, 4);
              hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
            } else {
              hiCards = [this.baseHand.cards[0]];
              loCards = this.baseHand.cards.slice(1, 3);
              hiCards = hiCards.concat(this.baseHand.cards.slice(3, 7));
            }
            this.hiHand = Hand2.solve(hiCards, this.hiGame);
            this.loHand = Hand2.solve(loCards, this.loGame);
          }
          /*
           * Determine the best possible Straight and/or Flush.
           * @param  {Array} cards 5-7 Card objects to check.
           * @return {Array} [hiCards, loCards] High and Low components, if any.
           */
          getSFData(cards) {
            var hiCards, possibleLoCards, bestLoCards, bestHand;
            var handsToCheck = [
              new StraightFlush(cards, new Game2("paigowpokersf7")),
              new StraightFlush(cards, new Game2("paigowpokersf6")),
              new StraightFlush(cards, this.game),
              new Flush(cards, new Game2("paigowpokersf7")),
              new Flush(cards, new Game2("paigowpokersf6")),
              new Flush(cards, this.game),
              new Straight(cards, new Game2("paigowpokersf7")),
              new Straight(cards, new Game2("paigowpokersf6")),
              new Straight(cards, this.game)
            ];
            for (var i = 0; i < handsToCheck.length; i++) {
              var hand = handsToCheck[i];
              if (hand.isPossible) {
                if (hand.sfLength === 7) {
                  possibleLoCards = [hand.cards[0], hand.cards[1]];
                } else if (hand.sfLength === 6) {
                  possibleLoCards = [hand.cards[0]];
                  if (cards.length > 6) {
                    possibleLoCards.push(hand.cards[6]);
                  }
                } else if (cards.length > 5) {
                  possibleLoCards = [hand.cards[5]];
                  if (cards.length > 6) {
                    possibleLoCards.push(hand.cards[6]);
                  }
                }
                if (possibleLoCards) {
                  possibleLoCards = possibleLoCards.sort(Card.sort);
                  if (!bestLoCards || bestLoCards[0].rank < possibleLoCards[0].rank || bestLoCards.length > 1 && bestLoCards[0].rank === possibleLoCards[0].rank && bestLoCards[1].rank < possibleLoCards[1].rank) {
                    bestLoCards = possibleLoCards;
                    bestHand = hand;
                  }
                } else if (!bestHand) {
                  bestHand = hand;
                  break;
                }
              }
            }
            if (bestHand) {
              if (bestHand.sfLength === 7) {
                hiCards = bestHand.cards.slice(2, 7);
              } else if (bestHand.sfLength === 6) {
                hiCards = bestHand.cards.slice(1, 6);
              } else {
                hiCards = bestHand.cards.slice(0, 5);
              }
            }
            return [hiCards, bestLoCards];
          }
          /*
           * Determine if the setting of the hands is valid. Hi must be higher than lo.
           * @return {Boolean}
           */
          qualifiesValid() {
            var compareHands = Hand2.winners([this.hiHand, this.loHand]);
            return !(compareHands.length === 1 && compareHands[0] === this.loHand);
          }
          /**
           * Find which of two split hands is best, according to rules.
           * @param  {PaiGowPokerHelper} player Player hand to evaluate. Must be set.
           * @param  {PaiGowPokerHelper} banker Banker hand to evaluate. Must be set.
           * @param  {int}               winner Winning party, if any.
           *                                    Player = 1, Banker = -1, Push = 0
           */
          static winners(player, banker) {
            if (!player.qualifiesValid()) {
              if (banker.qualifiesValid()) {
                return -1;
              }
              return 0;
            }
            if (!banker.qualifiesValid()) {
              return 1;
            }
            var hiWinner = Hand2.winners([player.hiHand, banker.hiHand]);
            var loWinner = Hand2.winners([player.loHand, banker.loHand]);
            if (hiWinner.length === 1 && hiWinner[0] === player.hiHand) {
              if (loWinner.length === 1 && loWinner[0] === player.loHand) {
                return 1;
              }
              return 0;
            }
            if (loWinner.length === 1 && loWinner[0] === player.loHand) {
              return 0;
            }
            return -1;
          }
          /*
           * Set a full hand into high and low hands, according to manual input.
           * @param  {Array} hiHand       High hand to specify.
           *                              Can also be {Hand} with game of 'paigowpokerhi'.
           * @param  {Array} loHand       Low hand to specify.
           *                              Can also be {Hand} with game of 'paigowpokerlo'.
           * @return {PaiGowPokerHelper}  Object with split hands.
           */
          static setHands(hiHand, loHand) {
            var fullHand = [];
            if (Array.isArray(hiHand)) {
              hiHand = Hand2.solve(hiHand, new Game2("paigowpokerhi"));
            }
            fullHand = fullHand.concat(hiHand.cardPool);
            if (Array.isArray(loHand)) {
              loHand = Hand2.solve(loHand, new Game2("paigowpokerlo"));
            }
            fullHand = fullHand.concat(loHand.cardPool);
            var result = new PaiGowPokerHelper(fullHand);
            result.hiHand = hiHand;
            result.loHand = loHand;
            return result;
          }
          /**
           * Build and return PaiGowPokerHelper object with hands split House Way.
           * @param  {Array} fullHand    Array of cards (['Ad', '3c', 'Th', ...]).
           *                             Can also be {Hand} with game of 'paigowpokerfull'.
           * @return {PaiGowPokerHelper} Object with split hands.
           */
          static solve(fullHand) {
            var result = new PaiGowPokerHelper(fullHand = fullHand || [""]);
            result.splitHouseWay();
            return result;
          }
        }
        var gameRules = {
          "standard": {
            "cardsInHand": 5,
            "handValues": [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
            "wildValue": null,
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 5,
            "lowestQualified": null,
            "noKickers": false
          },
          "jacksbetter": {
            "cardsInHand": 5,
            "handValues": [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
            "wildValue": null,
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 5,
            "lowestQualified": ["Jc", "Jd", "4h", "3s", "2c"],
            "noKickers": true
          },
          "joker": {
            "cardsInHand": 5,
            "handValues": [NaturalRoyalFlush, FiveOfAKind, WildRoyalFlush, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, HighCard],
            "wildValue": "O",
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 5,
            "lowestQualified": ["4c", "3d", "3h", "2s", "2c"],
            "noKickers": true
          },
          "deuceswild": {
            "cardsInHand": 5,
            "handValues": [NaturalRoyalFlush, FourWilds, WildRoyalFlush, FiveOfAKind, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, HighCard],
            "wildValue": "2",
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 5,
            "lowestQualified": ["5c", "4d", "3h", "3s", "3c"],
            "noKickers": true
          },
          "threecard": {
            "cardsInHand": 3,
            "handValues": [StraightFlush, ThreeOfAKind, Straight, Flush, OnePair, HighCard],
            "wildValue": null,
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 3,
            "lowestQualified": ["Qh", "3s", "2c"],
            "noKickers": false
          },
          "fourcard": {
            "cardsInHand": 4,
            "handValues": [FourOfAKind, StraightFlush, ThreeOfAKind, Flush, Straight, TwoPair, OnePair, HighCard],
            "wildValue": null,
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 4,
            "lowestQualified": null,
            "noKickers": true
          },
          "fourcardbonus": {
            "cardsInHand": 4,
            "handValues": [FourOfAKind, StraightFlush, ThreeOfAKind, Flush, Straight, TwoPair, OnePair, HighCard],
            "wildValue": null,
            "wildStatus": 1,
            "wheelStatus": 0,
            "sfQualify": 4,
            "lowestQualified": ["Ac", "Ad", "3h", "2s"],
            "noKickers": true
          },
          "paigowpokerfull": {
            "cardsInHand": 7,
            "handValues": [FiveOfAKind, FourOfAKindPairPlus, StraightFlush, Flush, Straight, FourOfAKind, TwoThreeOfAKind, ThreeOfAKindTwoPair, FullHouse, ThreeOfAKind, ThreePair, TwoPair, OnePair, HighCard],
            "wildValue": "O",
            "wildStatus": 0,
            "wheelStatus": 1,
            "sfQualify": 5,
            "lowestQualified": null
          },
          "paigowpokeralt": {
            "cardsInHand": 7,
            "handValues": [FourOfAKind, FullHouse, ThreeOfAKind, ThreePair, TwoPair, OnePair, HighCard],
            "wildValue": "O",
            "wildStatus": 0,
            "wheelStatus": 1,
            "sfQualify": 5,
            "lowestQualified": null
          },
          "paigowpokersf6": {
            "cardsInHand": 7,
            "handValues": [StraightFlush, Flush, Straight],
            "wildValue": "O",
            "wildStatus": 0,
            "wheelStatus": 1,
            "sfQualify": 6,
            "lowestQualified": null
          },
          "paigowpokersf7": {
            "cardsInHand": 7,
            "handValues": [StraightFlush, Flush, Straight],
            "wildValue": "O",
            "wildStatus": 0,
            "wheelStatus": 1,
            "sfQualify": 7,
            "lowestQualified": null
          },
          "paigowpokerhi": {
            "cardsInHand": 5,
            "handValues": [FiveOfAKind, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
            "wildValue": "O",
            "wildStatus": 0,
            "wheelStatus": 1,
            "sfQualify": 5,
            "lowestQualified": null
          },
          "paigowpokerlo": {
            "cardsInHand": 2,
            "handValues": [OnePair, HighCard],
            "wildValue": "O",
            "wildStatus": 0,
            "wheelStatus": 1,
            "sfQualify": 5,
            "lowestQualified": null
          }
        };
        class Game2 {
          constructor(descr) {
            this.descr = descr;
            this.cardsInHand = 0;
            this.handValues = [];
            this.wildValue = null;
            this.wildStatus = 0;
            this.wheelStatus = 0;
            this.sfQualify = 5;
            this.lowestQualified = null;
            this.noKickers = null;
            if (!this.descr || !gameRules[this.descr]) {
              this.descr = "standard";
            }
            this.cardsInHand = gameRules[this.descr]["cardsInHand"];
            this.handValues = gameRules[this.descr]["handValues"];
            this.wildValue = gameRules[this.descr]["wildValue"];
            this.wildStatus = gameRules[this.descr]["wildStatus"];
            this.wheelStatus = gameRules[this.descr]["wheelStatus"];
            this.sfQualify = gameRules[this.descr]["sfQualify"];
            this.lowestQualified = gameRules[this.descr]["lowestQualified"];
            this.noKickers = gameRules[this.descr]["noKickers"];
          }
        }
        function exportToGlobal(global) {
          global.Card = Card;
          global.Hand = Hand2;
          global.Game = Game2;
          global.RoyalFlush = RoyalFlush;
          global.NaturalRoyalFlush = NaturalRoyalFlush;
          global.WildRoyalFlush = WildRoyalFlush;
          global.FiveOfAKind = FiveOfAKind;
          global.StraightFlush = StraightFlush;
          global.FourOfAKindPairPlus = FourOfAKindPairPlus;
          global.FourOfAKind = FourOfAKind;
          global.FourWilds = FourWilds;
          global.TwoThreeOfAKind = TwoThreeOfAKind;
          global.ThreeOfAKindTwoPair = ThreeOfAKindTwoPair;
          global.FullHouse = FullHouse;
          global.Flush = Flush;
          global.Straight = Straight;
          global.ThreeOfAKind = ThreeOfAKind;
          global.ThreePair = ThreePair;
          global.TwoPair = TwoPair;
          global.OnePair = OnePair;
          global.HighCard = HighCard;
          global.PaiGowPokerHelper = PaiGowPokerHelper;
        }
        if (typeof exports !== "undefined") {
          exportToGlobal(exports);
        }
        if (typeof window !== "undefined") {
          exportToGlobal(window);
        }
      })();
    }
  });

  // src/game.ts
  var import_poker_ts = __toESM(require_dist(), 1);

  // src/decide.ts
  function decide(ctx) {
    const p = ctx.personality;
    for (const q of p.quirks) {
      const forced = q.apply(ctx);
      if (forced && ctx.legal.includes(forced.action)) return forced;
    }
    const tiltEffect = ctx.tilt * p.tiltSensitivity;
    const shortness = Math.max(0, 1 - ctx.effectiveStackBB / 20);
    const effectiveTightness = Math.max(
      0,
      p.tightness - tiltEffect * 0.6 - shortness * 0.35
    );
    const effectiveAggression = Math.min(
      1,
      p.aggression + tiltEffect * 0.5 + shortness * 0.3
    );
    const potOdds = ctx.toCall === 0 ? 0 : ctx.toCall / (ctx.pot + ctx.toCall);
    const margin = (effectiveTightness - 0.5) * 0.25;
    const required = Math.max(0, potOdds + margin);
    const canRaise = ctx.legal.includes("raise") || ctx.legal.includes("bet");
    const raiseAction = ctx.legal.includes("raise") ? "raise" : "bet";
    if (ctx.equity > required + 0.15) {
      if (canRaise && ctx.rng() < effectiveAggression) {
        return {
          action: raiseAction,
          betSize: sizeBet(ctx, ctx.equity, effectiveAggression),
          reason: ctx.equity > 0.55 ? `value (${pct(ctx.equity)} vs ${pct(required)} needed)` : `probe (${pct(ctx.equity)}, nobody has bet)`
        };
      }
      if (ctx.toCall === 0 && ctx.legal.includes("check")) {
        return { action: "check", reason: "strong but passive this street" };
      }
      if (ctx.legal.includes("call")) {
        return { action: "call", reason: `value call (${pct(ctx.equity)})` };
      }
    }
    if (ctx.equity >= required) {
      if (ctx.toCall === 0 && ctx.legal.includes("check")) {
        return { action: "check", reason: "marginal, taking a free card" };
      }
      if (ctx.legal.includes("call")) {
        return {
          action: "call",
          reason: `pot odds (${pct(ctx.equity)} > ${pct(potOdds)})`
        };
      }
    }
    const streetBoost = { preflop: 0.4, flop: 0.8, turn: 1, river: 1.2 }[ctx.street];
    const oppPenalty = Math.pow(0.55, ctx.numOpponents - 1);
    const adaptBoost = 1 + (ctx.opponentFoldRate - 0.4) * p.adaptivity;
    const bluffChance = p.bluffFrequency * streetBoost * oppPenalty * adaptBoost;
    if (canRaise && ctx.rng() < bluffChance) {
      return {
        action: raiseAction,
        betSize: sizeBet(ctx, 0.3, effectiveAggression),
        reason: `bluff (${pct(ctx.equity)} equity)`
      };
    }
    if (ctx.toCall === 0 && ctx.legal.includes("check")) {
      return { action: "check", reason: "weak, checking" };
    }
    return { action: "fold", reason: `fold (${pct(ctx.equity)} < ${pct(required)})` };
  }
  function sizeBet(ctx, strength, aggression) {
    const fraction = 0.4 + strength * 0.4 + aggression * 0.3;
    let target = Math.round(ctx.pot * fraction);
    if (target > ctx.stack - ctx.bigBlind * 1.5) target = ctx.maxRaise;
    return Math.max(ctx.minRaise, Math.min(ctx.maxRaise, target));
  }
  var pct = (n) => `${Math.round(n * 100)}%`;
  function emitTell(p, ctx, rng) {
    const state = ctx.tilt > 0.5 ? "tilted" : ctx.decision.reason.startsWith("bluff") ? "bluffing" : ctx.equity > 0.65 ? "strong" : "weak";
    const honest = p.tells.filter((t) => t.correlate === state);
    if (honest.length === 0) return null;
    const tell = honest[Math.floor(rng() * honest.length)];
    if (rng() < tell.reliability) return tell;
    const others = p.tells.filter((t) => t !== tell);
    return others.length ? others[Math.floor(rng() * others.length)] : null;
  }

  // src/equity.ts
  var import_pokersolver = __toESM(require_pokersolver(), 1);
  var { Hand } = import_pokersolver.default;
  var SUIT_CHAR = {
    clubs: "c",
    diamonds: "d",
    hearts: "h",
    spades: "s"
  };
  var RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  var SUITS = ["clubs", "diamonds", "hearts", "spades"];
  var toStr = (c) => c.rank + SUIT_CHAR[c.suit];
  var rankValue = (r) => RANKS.indexOf(r) + 2;
  function preflopStrength(hole) {
    const [a, b] = hole;
    const hi = Math.max(rankValue(a.rank), rankValue(b.rank));
    const lo = Math.min(rankValue(a.rank), rankValue(b.rank));
    const paired = hi === lo;
    const suited = a.suit === b.suit;
    const gap = hi - lo;
    let score = hi === 14 ? 10 : hi === 13 ? 8 : hi === 12 ? 7 : hi === 11 ? 6 : hi / 2;
    if (paired) score = Math.max(5, score * 2);
    if (suited) score += 2;
    if (!paired) {
      if (gap === 1) score += 1;
      else if (gap === 2) score -= 1;
      else if (gap === 3) score -= 2;
      else if (gap >= 4) score -= 4;
      if (gap <= 2 && hi < 12) score += 1;
    }
    return Math.max(0.05, Math.min(0.95, (score + 4) / 26));
  }
  function equityVs(hole, board, numOpponents, rollouts = 60, rng = Math.random) {
    const known = new Set([...hole, ...board].map(toStr));
    const deck = [];
    for (const r of RANKS) {
      for (const s of SUITS) {
        const str = r + SUIT_CHAR[s];
        if (!known.has(str)) deck.push(str);
      }
    }
    const score = (h) => h.cards.reduce((a, c) => a * 15 + c.rank, h.rank);
    const heroStr = hole.map(toStr);
    const boardStr = board.map(toStr);
    const needed = 5 - board.length;
    let wins = 0;
    let ties = 0;
    for (let i = 0; i < rollouts; i++) {
      const draws = needed + numOpponents * 2;
      for (let j = 0; j < draws; j++) {
        const k = j + Math.floor(rng() * (deck.length - j));
        [deck[j], deck[k]] = [deck[k], deck[j]];
      }
      const runout = deck.slice(0, needed);
      const fullBoard = [...boardStr, ...runout];
      const heroScore = score(Hand.solve([...heroStr, ...fullBoard]));
      let bestOpp = -1;
      for (let o = 0; o < numOpponents; o++) {
        const oc = deck.slice(needed + o * 2, needed + o * 2 + 2);
        const oppScore = score(Hand.solve([...oc, ...fullBoard]));
        if (oppScore > bestOpp) bestOpp = oppScore;
      }
      if (heroScore > bestOpp) wins++;
      else if (heroScore === bestOpp) ties++;
    }
    return (wins + ties * 0.5) / rollouts;
  }
  function handStrength(hole, board, numOpponents, rollouts = 60, rng = Math.random) {
    if (board.length === 0) return preflopStrength(hole);
    return equityVs(hole, board, numOpponents, rollouts, rng);
  }

  // src/game.ts
  var { Table: Poker } = import_poker_ts.default;
  var newStats = () => ({
    hands: 0,
    profit: 0,
    vpip: 0,
    pfr: 0,
    bets: 0,
    calls: 0,
    folds: 0,
    foldsToAggression: 0,
    facedAggression: 0,
    wins: 0,
    showdowns: 0
  });
  var RANKINGS = [
    "high card",
    "a pair",
    "two pair",
    "three of a kind",
    "a straight",
    "a flush",
    "a full house",
    "four of a kind",
    "a straight flush",
    "a royal flush"
  ];
  var DEFAULT_LEVELS = [
    { smallBlind: 10, bigBlind: 20 },
    { smallBlind: 15, bigBlind: 30 },
    { smallBlind: 25, bigBlind: 50 },
    { smallBlind: 50, bigBlind: 100 },
    { smallBlind: 75, bigBlind: 150 },
    { smallBlind: 100, bigBlind: 200 },
    { smallBlind: 150, bigBlind: 300 },
    { smallBlind: 250, bigBlind: 500 },
    { smallBlind: 400, bigBlind: 800 },
    { smallBlind: 600, bigBlind: 1200 },
    { smallBlind: 1e3, bigBlind: 2e3 },
    { smallBlind: 1500, bigBlind: 3e3 },
    { smallBlind: 2500, bigBlind: 5e3 }
  ];
  var Game = class {
    table;
    seats;
    button = 0;
    opts;
    handsPlayed = 0;
    level = 0;
    /** Seat indexes in bust order, first out first. */
    bustOrder = [];
    constructor(personalities, opts = {}) {
      this.opts = {
        smallBlind: 10,
        bigBlind: 20,
        buyIn: 2e3,
        rollouts: 60,
        rng: Math.random,
        mode: "cash",
        levels: DEFAULT_LEVELS,
        handsPerLevel: 25,
        ...opts
      };
      this.seats = personalities.map((p) => ({
        personality: p,
        tilt: 0,
        stats: newStats()
      }));
      const opening = this.opts.mode === "tournament" ? this.opts.levels[0] : { smallBlind: this.opts.smallBlind, bigBlind: this.opts.bigBlind };
      this.table = new Poker(
        { smallBlind: opening.smallBlind, bigBlind: opening.bigBlind },
        personalities.length
      );
      if (this.opts.mode === "tournament") {
        for (let i = 0; i < this.seats.length; i++) {
          this.table.sitDown(i, this.opts.buyIn);
        }
      }
    }
    getSeats() {
      return this.seats;
    }
    /** The big blind currently in force. */
    bigBlind() {
      return this.opts.mode === "tournament" ? this.opts.levels[this.level].bigBlind : this.opts.bigBlind;
    }
    /** Chip counts by seat; 0 for a player who has busted. */
    stacks() {
      const seated = this.table.seats();
      return this.seats.map((_, i) => seated[i]?.totalChips ?? 0);
    }
    /** Seats that still have chips. */
    survivors() {
      return this.stacks().map((chips, i) => chips > 0 ? i : -1).filter((i) => i >= 0);
    }
    /** A table is over when one player holds every chip. */
    isComplete() {
      return this.opts.mode === "tournament" && this.survivors().length <= 1;
    }
    /** Seat indexes best-to-worst: the chip leader first, first-out last. */
    standings() {
      return [...this.survivors(), ...[...this.bustOrder].reverse()];
    }
    handCount() {
      return this.handsPlayed;
    }
    /**
     * Chips still BEHIND each player -- not yet pushed in. Distinct from
     * stacks(), which reports totalChips (behind + current bet). Between hands
     * the two agree; mid-hand they do not, and mixing them up double-counts the
     * live bets, because potTotal() already includes them.
     *
     * Display uses this; survivorship and settlement use stacks().
     */
    stacksBehind() {
      const seated = this.table.seats();
      return this.seats.map((_, i) => seated[i]?.stack ?? 0);
    }
    /** Everything in the middle: settled pots plus the bets still on the felt. */
    potTotal() {
      const settled2 = this.table.pots().reduce((a, p) => a + p.size, 0);
      const live = this.table.seats().filter(Boolean).reduce((a, x) => a + x.betSize, 0);
      return settled2 + live;
    }
    /**
     * Plays one hand. Stacks are reset to the buy-in each hand so we measure
     * decision quality rather than tournament survivorship — that keeps the
     * win-rate numbers clean and comparable.
     */
    async playHand() {
      const { rng, buyIn, rollouts, onEvent: onEvent2, mode, humanSeat, onHumanTurn: onHumanTurn2 } = this.opts;
      const tournament = mode === "tournament";
      if (tournament && this.isComplete()) return;
      const bigBlind = this.bigBlind();
      if (tournament) {
        this.applyBlindLevel();
      } else {
        const occupied = this.table.seats();
        for (let i = 0; i < this.seats.length; i++) {
          if (!occupied[i]) this.table.sitDown(i, buyIn);
        }
      }
      const before = this.stacks();
      if (tournament) {
        this.table.startHand();
      } else {
        this.table.startHand(this.button);
        this.button = (this.button + 1) % this.seats.length;
      }
      this.handsPlayed++;
      const equityCache = /* @__PURE__ */ new Map();
      const contributed = new Array(this.seats.length).fill(0);
      let lastStreet = "";
      const wentToShowdown = /* @__PURE__ */ new Set();
      const foldedSeats = /* @__PURE__ */ new Set();
      const putMoneyIn = /* @__PURE__ */ new Set();
      const raisedPreflop = /* @__PURE__ */ new Set();
      for (const s of this.seats) s.stats.hands++;
      while (this.table.isHandInProgress()) {
        while (this.table.isBettingRoundInProgress()) {
          const seat = this.table.playerToAct();
          const s = this.seats[seat];
          const street = this.table.roundOfBetting();
          if (street !== lastStreet) {
            lastStreet = street;
            onEvent2?.({
              type: "street",
              street,
              board: this.table.communityCards(),
              // Carries stacks so the display picks up the posted blinds, which
              // are not an 'action' and would otherwise show stale.
              stacks: this.stacksBehind()
            });
          }
          const seatState = this.table.seats();
          const board = this.table.communityCards();
          const hole = this.table.holeCards()[seat] ?? [];
          const maxBet = Math.max(
            ...seatState.filter(Boolean).map((x) => x.betSize)
          );
          const myBet = seatState[seat].betSize;
          const toCall = maxBet - myBet;
          const pot = this.potTotal();
          const isHuman = seat === humanSeat && onHumanTurn2 !== void 0;
          const key2 = `${seat}:${street}`;
          let equity = 0;
          if (!isHuman) {
            const cached = equityCache.get(key2);
            if (cached === void 0) {
              equity = handStrength(
                hole,
                board,
                Math.max(1, this.table.numActivePlayers() - 1),
                rollouts,
                rng
              );
              equityCache.set(key2, equity);
            } else {
              equity = cached;
            }
          }
          const legalRaw = this.table.legalActions();
          const legal = legalRaw.actions;
          const range = legalRaw.chipRange;
          const minRaise = range?.min ?? bigBlind;
          const maxRaise = range?.max ?? seatState[seat].stack;
          let decision;
          if (isHuman) {
            decision = await onHumanTurn2({
              seat,
              hole,
              stacks: this.stacksBehind(),
              board,
              pot,
              toCall,
              stack: seatState[seat].stack,
              bigBlind,
              street,
              legal,
              minRaise,
              maxRaise
            });
            if (!legal.includes(decision.action)) {
              throw new Error(
                `illegal action from human seat ${seat}: ${decision.action} (legal: ${legal.join(", ")})`
              );
            }
            if (decision.betSize !== void 0) {
              decision.betSize = Math.max(minRaise, Math.min(maxRaise, Math.round(decision.betSize)));
            }
          } else {
            decision = decide({
              personality: s.personality,
              equity,
              pot,
              toCall,
              stack: seatState[seat].stack,
              bigBlind,
              effectiveStackBB: seatState[seat].stack / bigBlind,
              minRaise,
              maxRaise,
              street,
              legal,
              numOpponents: Math.max(1, this.table.numActivePlayers() - 1),
              tilt: s.tilt,
              opponentFoldRate: this.tableFoldRate(seat),
              rng
            });
            if (onEvent2) {
              const tell = emitTell(
                s.personality,
                { equity, decision, tilt: s.tilt },
                rng
              );
              if (tell) onEvent2({ type: "tell", seat, signal: tell.signal });
            }
          }
          if (toCall > 0) s.stats.facedAggression++;
          if (decision.action === "fold") {
            s.stats.folds++;
            foldedSeats.add(seat);
            if (toCall > 0) s.stats.foldsToAggression++;
          } else if (decision.action === "call") {
            s.stats.calls++;
            if (street === "preflop") putMoneyIn.add(seat);
          } else if (decision.action === "bet" || decision.action === "raise") {
            s.stats.bets++;
            if (street === "preflop") {
              putMoneyIn.add(seat);
              raisedPreflop.add(seat);
            }
          }
          const before2 = seatState[seat].stack + seatState[seat].betSize;
          this.table.actionTaken(decision.action, decision.betSize);
          const after2 = this.table.seats()[seat];
          if (after2) contributed[seat] += before2 - (after2.stack + after2.betSize);
          onEvent2?.({
            type: "action",
            seat,
            decision,
            equity: isHuman ? 0 : equity,
            pot: this.potTotal(),
            stacks: this.stacksBehind()
          });
        }
        this.table.endBettingRound();
        if (this.table.areBettingRoundsCompleted()) {
          const hole = this.table.holeCards();
          const finalBoard = this.table.communityCards();
          const revealed = [];
          for (let i = 0; i < this.seats.length; i++) {
            if (hole[i] && !foldedSeats.has(i)) {
              wentToShowdown.add(i);
              revealed.push({ seat: i, hole: hole[i] });
            }
          }
          const potsBefore = this.table.pots().map((p) => ({ size: p.size, eligible: p.eligiblePlayers }));
          this.table.showdown();
          if (onEvent2) {
            const perPot = this.table.winners() ?? [];
            const pots = potsBefore.map((p, i) => {
              const won = perPot[i];
              if (!won || won.length === 0) {
                const live = p.eligible.filter(
                  (seat) => revealed.some((r) => r.seat === seat)
                );
                return { amount: p.size, winners: (live.length ? live : p.eligible).slice(0, 1) };
              }
              return {
                amount: p.size,
                winners: won.map((w) => w[0]),
                ranking: RANKINGS[won[0][1].ranking] ?? "a hand",
                cards: won[0][1].cards
              };
            });
            onEvent2({ type: "showdown", board: finalBoard, revealed, pots });
          }
        }
      }
      const after = this.stacks();
      const final = this.table.seats();
      for (let i = 0; i < this.seats.length; i++) {
        const s = this.seats[i];
        if (putMoneyIn.has(i)) s.stats.vpip++;
        if (raisedPreflop.has(i)) s.stats.pfr++;
        const delta = tournament ? after[i] - before[i] : (final[i]?.stack ?? 0) - buyIn;
        s.stats.profit += delta;
        if (delta > 0) s.stats.wins++;
        if (wentToShowdown.has(i)) s.stats.showdowns++;
        const lossInBB = -delta / bigBlind;
        if (lossInBB > 20) {
          s.tilt = Math.min(1, s.tilt + 0.4 * s.personality.tiltSensitivity);
        }
        s.tilt *= 0.85;
        onEvent2?.({ type: "result", seat: i, delta, won: delta > 0 });
        if (!tournament && final[i]) this.table.standUp(i);
      }
      if (tournament) this.removeBustedPlayers(before);
    }
    /**
     * poker-ts only sweeps busted players inside showdown(), so a player who
     * runs out of chips posting a blind into a hand everyone folds is left
     * sitting at the table with an empty stack. Guard on occupancy before
     * standing anyone up -- showdown may already have taken the seat.
     */
    removeBustedPlayers(before) {
      const seated = this.table.seats();
      for (let i = 0; i < this.seats.length; i++) {
        const busted = (seated[i]?.totalChips ?? 0) === 0 && before[i] > 0;
        if (!busted || this.bustOrder.includes(i)) continue;
        if (seated[i]) this.table.standUp(i);
        this.bustOrder.push(i);
        const place = this.seats.length - this.bustOrder.length + 1;
        this.opts.onEvent?.({ type: "eliminated", seat: i, place });
      }
    }
    /** Raise the blinds if this hand starts a new level. */
    applyBlindLevel() {
      const target = Math.min(
        this.opts.levels.length - 1,
        Math.floor(this.handsPlayed / this.opts.handsPerLevel)
      );
      if (target === this.level) return;
      this.level = target;
      const { smallBlind, bigBlind, ante } = this.opts.levels[this.level];
      this.table.setForcedBets({ smallBlind, bigBlind, ante });
      this.opts.onEvent?.({ type: "level", level: this.level, smallBlind, bigBlind });
    }
    /** Average fold-to-aggression across the other seats, for adaptivity. */
    tableFoldRate(exclude) {
      let faced = 0;
      let folded2 = 0;
      for (let i = 0; i < this.seats.length; i++) {
        if (i === exclude) continue;
        faced += this.seats[i].stats.facedAggression;
        folded2 += this.seats[i].stats.foldsToAggression;
      }
      return faced < 20 ? 0.4 : folded2 / faced;
    }
  };

  // src/personality.ts
  var DRACULA = {
    id: "dracula",
    name: "Dracula",
    aggression: 0.35,
    tightness: 0.78,
    bluffFrequency: 0.12,
    tiltSensitivity: 0.05,
    adaptivity: 0.55,
    quirks: [
      {
        // Traps: with a monster before the river, just call and let them hang
        // themselves rather than raising them off the hand.
        name: "trap",
        apply: (ctx) => {
          if (ctx.street === "river") return null;
          if (ctx.equity < 0.82) return null;
          if (ctx.toCall === 0) return { action: "check", reason: "trap: checking a monster" };
          if (ctx.legal.includes("call")) return { action: "call", reason: "trap: flatting a monster" };
          return null;
        }
      }
    ],
    tells: [
      { signal: "steeples_fingers", correlate: "strong", reliability: 0.72 },
      { signal: "glances_at_exit", correlate: "bluffing", reliability: 0.6 }
    ]
  };
  var YETI = {
    id: "yeti",
    name: "Abominable Snowman",
    aggression: 0.2,
    tightness: 0.38,
    bluffFrequency: 0.02,
    tiltSensitivity: 0.3,
    adaptivity: 0.05,
    quirks: [
      {
        // The calling station. Will not fold to a single small bet, ever.
        // You cannot bluff him — which is exactly what makes him a good
        // teacher for value betting.
        name: "never_folds_small",
        apply: (ctx) => {
          if (ctx.toCall === 0) return null;
          if (ctx.toCall > ctx.bigBlind * 2) return null;
          if (!ctx.legal.includes("call")) return null;
          return { action: "call", reason: "never folds to a small bet" };
        }
      }
    ],
    tells: [
      { signal: "stares_blankly", correlate: "weak", reliability: 0.45 },
      { signal: "shifts_forward", correlate: "strong", reliability: 0.85 }
    ]
  };
  var CLEOPATRA = {
    id: "cleopatra",
    name: "Cleopatra",
    aggression: 0.72,
    tightness: 0.5,
    bluffFrequency: 0.34,
    tiltSensitivity: 0.15,
    adaptivity: 0.9,
    quirks: [
      {
        // Punishes passivity. If an opponent has been folding to aggression,
        // she attacks regardless of her cards.
        name: "punish_passivity",
        apply: (ctx) => {
          if (ctx.opponentFoldRate < 0.55) return null;
          if (ctx.toCall > 0) return null;
          if (!ctx.legal.includes("bet")) return null;
          if (ctx.rng() > 0.6) return null;
          const size = Math.min(
            ctx.stack,
            Math.max(ctx.minRaise, Math.round(ctx.pot * 0.66))
          );
          return { action: "bet", betSize: size, reason: "punishing a folder" };
        }
      }
    ],
    tells: [
      { signal: "adjusts_headdress", correlate: "bluffing", reliability: 0.55 },
      { signal: "goes_still", correlate: "strong", reliability: 0.68 }
    ]
  };
  var HUMAN = {
    id: "human",
    name: "You",
    aggression: 0,
    tightness: 0,
    bluffFrequency: 0,
    tiltSensitivity: 0,
    adaptivity: 0,
    quirks: [],
    tells: []
  };
  var CAST = [DRACULA, YETI, CLEOPATRA];

  // web/app.ts
  var HUMAN_SEAT = 0;
  var SEATS = [HUMAN, ...CAST];
  var BUY_IN = 2e3;
  var PACE_SCALE = Math.max(0, Number(new URLSearchParams(location.search).get("pace") ?? 1));
  var BASE = { action: 620, street: 700, reveal: 1300, showdown: 2600, result: 1e3, level: 900 };
  var PACE = Object.fromEntries(
    Object.entries(BASE).map(([k, v]) => [k, v * PACE_SCALE])
  );
  var $ = (id) => document.getElementById(id);
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  var els = {
    table: $("table"),
    opponents: $("opponents"),
    board: $("board"),
    pot: $("pot-value"),
    level: $("level"),
    youStack: $("you-stack"),
    youCards: $("you-cards"),
    youPosition: $("you-position"),
    prompt: $("prompt"),
    buttons: $("buttons"),
    raiseRow: $("raise-row"),
    slider: $("raise-slider"),
    raiseValue: $("raise-value"),
    raiseConfirm: $("raise-confirm"),
    raiseCancel: $("raise-cancel"),
    log: $("log")
  };
  var queue = [];
  var draining = false;
  var waiters = [];
  function step(apply, delay) {
    queue.push({ apply, delay });
    void drain();
  }
  async function drain() {
    if (draining) return;
    draining = true;
    while (queue.length) {
      const s = queue.shift();
      s.apply();
      await sleep(s.delay);
    }
    draining = false;
    const w = waiters;
    waiters = [];
    for (const f of w) f();
  }
  function settled() {
    if (!draining && queue.length === 0) return Promise.resolve();
    return new Promise((r) => waiters.push(r));
  }
  var SUIT = { clubs: "\u2663", diamonds: "\u2666", hearts: "\u2665", spades: "\u2660" };
  var isRed = (c) => c.suit === "hearts" || c.suit === "diamonds";
  function cardEl(c, small = false) {
    const d = document.createElement("div");
    d.className = `card${small ? " small" : ""}${c && isRed(c) ? " red" : ""}${c ? "" : " back"}`;
    d.textContent = c ? `${c.rank}${SUIT[c.suit]}` : "??";
    if (c) {
      d.setAttribute("aria-label", `${c.rank} of ${c.suit}`);
      d.dataset.card = `${c.rank}${c.suit[0]}`;
    }
    return d;
  }
  var seatUI = /* @__PURE__ */ new Map();
  function buildOpponents() {
    els.opponents.replaceChildren();
    for (let i = 0; i < SEATS.length; i++) {
      if (i === HUMAN_SEAT) continue;
      const root = document.createElement("div");
      root.className = "seat";
      root.innerHTML = `<div class="name"><span>${SEATS[i].name}</span><span class="stack">0</span></div><div class="cards"></div><div class="last"></div><div class="tell"></div>`;
      els.opponents.append(root);
      seatUI.set(i, {
        root,
        stack: root.querySelector(".stack"),
        cards: root.querySelector(".cards"),
        last: root.querySelector(".last"),
        tell: root.querySelector(".tell")
      });
    }
  }
  function setStacks(stacks) {
    for (const [i, ui] of seatUI) ui.stack.textContent = String(stacks[i] ?? 0);
    els.youStack.textContent = String(stacks[HUMAN_SEAT] ?? 0);
  }
  function log(text, cls = "") {
    const li = document.createElement("li");
    if (cls) li.className = cls;
    li.textContent = text;
    els.log.append(li);
    els.log.parentElement.scrollTop = els.log.parentElement.scrollHeight;
  }
  var key = (c) => `${c.rank}${c.suit[0]}`;
  var cardText = (c) => `${c.rank}${SUIT[c.suit]}`;
  var handText = (cards) => cards.map(cardText).join(" ");
  function clearWinHighlights() {
    for (const el of document.querySelectorAll(".card.win")) el.classList.remove("win");
    for (const el of document.querySelectorAll(".seat.winner")) el.classList.remove("winner");
  }
  function highlightCards(cards) {
    for (const c of cards) {
      for (const el of document.querySelectorAll(`[data-card="${key(c)}"]`)) {
        el.classList.add("win");
      }
    }
  }
  var nameOf = (seat) => SEATS[seat].name;
  function joinNames(seats) {
    const names = seats.map(nameOf);
    if (names.length <= 1) return names[0] ?? "";
    return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  }
  var TELL_TEXT = {
    steeples_fingers: "steeples his fingers",
    glances_at_exit: "glances toward the exit",
    stares_blankly: "stares blankly at the board",
    shifts_forward: "shifts forward in his seat",
    adjusts_headdress: "adjusts her headdress",
    goes_still: "goes completely still"
  };
  function describe(d, you = false) {
    const v = (third, second) => you ? second : third;
    switch (d.action) {
      case "fold":
        return v("folds", "fold");
      case "check":
        return v("checks", "check");
      case "call":
        return v("calls", "call");
      case "bet":
        return `${v("bets", "bet")} ${d.betSize}`;
      case "raise":
        return `${v("raises", "raise")} to ${d.betSize}`;
    }
  }
  var folded = /* @__PURE__ */ new Set();
  var out = /* @__PURE__ */ new Set();
  var handNo = 0;
  function clearForNewHand() {
    folded.clear();
    clearWinHighlights();
    for (const [i, ui] of seatUI) {
      ui.cards.replaceChildren(cardEl(null, true), cardEl(null, true));
      ui.last.textContent = "";
      ui.tell.textContent = "";
      ui.root.classList.remove("folded", "acting");
      if (out.has(i)) ui.root.classList.add("out");
    }
    els.board.replaceChildren();
    els.youCards.replaceChildren();
    els.pot.textContent = "0";
  }
  function onEvent(e) {
    switch (e.type) {
      case "street": {
        step(() => {
          setStacks(e.stacks);
          els.board.replaceChildren(...e.board.map((c) => cardEl(c)));
          if (e.street !== "preflop") log(`\u2014 ${e.street} \u2014`, "head");
          for (const ui of seatUI.values()) ui.tell.textContent = "";
        }, e.street === "preflop" ? 0 : PACE.street);
        break;
      }
      case "tell": {
        const ui = seatUI.get(e.seat);
        if (!ui) break;
        step(() => {
          ui.tell.textContent = `${SEATS[e.seat].name} ${TELL_TEXT[e.signal] ?? e.signal}`;
        }, 340);
        break;
      }
      case "action": {
        const you = e.seat === HUMAN_SEAT;
        const ui = seatUI.get(e.seat);
        const text = describe(e.decision);
        const logText = describe(e.decision, you);
        step(() => {
          for (const u of seatUI.values()) u.root.classList.remove("acting");
          if (ui) {
            ui.root.classList.add("acting");
            ui.last.textContent = text;
          }
          if (e.decision.action === "fold") {
            folded.add(e.seat);
            ui?.root.classList.add("folded");
            ui?.cards.replaceChildren();
            if (e.seat === HUMAN_SEAT) els.youCards.replaceChildren();
          }
          setStacks(e.stacks);
          els.pot.textContent = String(e.pot);
          log(`${SEATS[e.seat].name} ${logText}`, you ? "you" : "");
        }, e.seat === HUMAN_SEAT ? 220 : PACE.action);
        break;
      }
      case "showdown": {
        step(() => {
          for (const u of seatUI.values()) u.root.classList.remove("acting");
          els.board.replaceChildren(...e.board.map((c) => cardEl(c)));
          for (const { seat, hole } of e.revealed) {
            const ui = seatUI.get(seat);
            if (ui) ui.cards.replaceChildren(...hole.map((c) => cardEl(c, true)));
          }
          if (e.revealed.length > 1) {
            log("\u2014 showdown \u2014", "head");
            for (const { seat, hole } of e.revealed) {
              const verb = seat === HUMAN_SEAT ? "show" : "shows";
              log(`${nameOf(seat)} ${verb} ${handText(hole)}`, seat === HUMAN_SEAT ? "you" : "");
            }
          }
        }, PACE.reveal);
        e.pots.forEach((pot, i) => {
          step(() => {
            clearWinHighlights();
            if (pot.cards) highlightCards(pot.cards);
            for (const w of pot.winners) seatUI.get(w)?.root.classList.add("winner");
            const label = e.pots.length === 1 ? "the pot" : i === 0 ? "the main pot" : `side pot ${i}`;
            const withWhat = pot.ranking ? ` with ${pot.ranking}${pot.cards ? ` \u2014 ${handText(pot.cards)}` : ""}` : " uncontested";
            if (pot.winners.length > 1) {
              log(`${joinNames(pot.winners)} SPLIT ${label} (${pot.amount})${withWhat}`, "big");
            } else {
              const w = pot.winners[0];
              const verb = w === HUMAN_SEAT ? "win" : "wins";
              log(`${nameOf(w)} ${verb} ${label} (${pot.amount})${withWhat}`, "big");
            }
          }, PACE.showdown);
        });
        break;
      }
      case "result": {
        if (e.delta === 0) break;
        step(() => {
          const sign = e.delta > 0 ? "+" : "";
          log(`  ${SEATS[e.seat].name} ${sign}${e.delta}`, e.seat === HUMAN_SEAT ? "you" : "");
        }, 0);
        break;
      }
      case "level": {
        step(() => {
          els.level.textContent = `blinds ${e.smallBlind}/${e.bigBlind}`;
          log(`Blinds up: ${e.smallBlind}/${e.bigBlind}`, "head");
        }, PACE.level);
        break;
      }
      case "eliminated": {
        step(() => {
          out.add(e.seat);
          seatUI.get(e.seat)?.root.classList.add("out");
          const ord = `${e.place}${["st", "nd", "rd", "th"][e.place - 1] ?? "th"}`;
          log(`${SEATS[e.seat].name} ${e.seat === HUMAN_SEAT ? "are" : "is"} out (${ord})`, "big");
        }, PACE.result);
        break;
      }
    }
  }
  var resolveTurn = null;
  function button(label, cls, onClick) {
    const b = document.createElement("button");
    b.textContent = label;
    if (cls) b.className = cls;
    b.addEventListener("click", onClick);
    return b;
  }
  function endTurn(d) {
    els.buttons.replaceChildren();
    els.raiseRow.hidden = true;
    els.prompt.textContent = "";
    const r = resolveTurn;
    resolveTurn = null;
    r?.(d);
  }
  async function onHumanTurn(view) {
    await settled();
    for (const u of seatUI.values()) u.root.classList.remove("acting");
    setStacks(view.stacks);
    els.youCards.replaceChildren(...view.hole.map((c) => cardEl(c)));
    els.pot.textContent = String(view.pot);
    els.prompt.textContent = view.toCall > 0 ? `${view.toCall} to call` : "Check or bet";
    const b = els.buttons;
    b.replaceChildren();
    if (view.legal.includes("fold")) {
      b.append(button("Fold", "danger", () => endTurn({ action: "fold", reason: "human" })));
    }
    if (view.legal.includes("check")) {
      b.append(button("Check", "", () => endTurn({ action: "check", reason: "human" })));
    }
    if (view.legal.includes("call")) {
      const amount = Math.min(view.toCall, view.stack);
      const label = amount >= view.stack ? `Call all in (${amount})` : `Call ${amount}`;
      b.append(button(label, "primary", () => endTurn({ action: "call", reason: "human" })));
    }
    const raise = view.legal.includes("raise") ? "raise" : view.legal.includes("bet") ? "bet" : null;
    if (raise && view.maxRaise >= view.minRaise) {
      b.append(
        button(raise === "bet" ? "Bet\u2026" : "Raise\u2026", "", () => {
          els.raiseRow.hidden = false;
          const s = els.slider;
          s.min = String(view.minRaise);
          s.max = String(view.maxRaise);
          s.step = "1";
          s.value = String(Math.min(view.maxRaise, Math.max(view.minRaise, Math.round(view.pot * 0.6))));
          const sync = () => {
            const v = Number(s.value);
            els.raiseValue.textContent = v >= view.maxRaise ? `${v} (all in)` : String(v);
          };
          s.oninput = sync;
          sync();
          s.focus();
        })
      );
    }
    els.raiseConfirm.onclick = () => {
      if (!raise) return;
      endTurn({ action: raise, betSize: Number(els.slider.value), reason: "human" });
    };
    els.raiseCancel.onclick = () => {
      els.raiseRow.hidden = true;
    };
    return new Promise((resolve) => {
      resolveTurn = resolve;
    });
  }
  async function main() {
    buildOpponents();
    els.table.hidden = false;
    const game = new Game(SEATS, {
      mode: "tournament",
      buyIn: BUY_IN,
      rollouts: 60,
      humanSeat: HUMAN_SEAT,
      onHumanTurn,
      onEvent
    });
    els.level.textContent = `blinds ${game.bigBlind() / 2}/${game.bigBlind()}`;
    setStacks(game.stacks());
    while (!game.isComplete()) {
      handNo++;
      clearForNewHand();
      log(`Hand ${handNo}`, "head");
      els.youPosition.textContent = `hand ${handNo}`;
      await game.playHand();
      await settled();
      setStacks(game.stacks());
      if (out.has(HUMAN_SEAT)) break;
      await sleep(500 * PACE_SCALE);
    }
    await settled();
    els.buttons.replaceChildren();
    els.raiseRow.hidden = true;
    const won = game.survivors()[0] === HUMAN_SEAT;
    els.prompt.textContent = won ? "You hold every chip. Table cleared." : "You are out.";
    log(won ? "You win the table." : "You are out.", "big");
  }
  void main();
})();
//# sourceMappingURL=bundle.js.map
