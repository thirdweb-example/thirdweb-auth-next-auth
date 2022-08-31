'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncToGenerator = require('../../dist/asyncToGenerator-c3545d52.cjs.dev.js');
var sdk = require('@thirdweb-dev/sdk');
var cookie = require('cookie');
var NextAuth = require('next-auth');
var CredentialsProvider = require('next-auth/providers/credentials');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var NextAuth__default = /*#__PURE__*/_interopDefault(NextAuth);
var CredentialsProvider__default = /*#__PURE__*/_interopDefault(CredentialsProvider);

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function ThirdwebNextAuth(cfg) {
  var sdk$1 = sdk.ThirdwebSDK.fromPrivateKey(cfg.privateKey, "mainnet");

  function ThirdwebProvider(res) {
    return CredentialsProvider__default["default"]({
      name: "ThirdwebAuth",
      credentials: {
        payload: {
          label: "Payload",
          type: "text",
          placeholder: ""
        }
      },
      authorize: function authorize(_ref) {
        return asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee() {
          var payload, parsed, token, address;
          return asyncToGenerator._regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  payload = _ref.payload;
                  _context.prev = 1;
                  parsed = JSON.parse(payload);
                  _context.next = 5;
                  return sdk$1.auth.generateAuthToken(cfg.domain, parsed);

                case 5:
                  token = _context.sent;
                  _context.next = 8;
                  return sdk$1.auth.authenticate(cfg.domain, token);

                case 8:
                  address = _context.sent;
                  // Securely set httpOnly cookie on request to prevent XSS on frontend
                  // And set path to / to enable thirdweb_auth_token usage on all endpoints
                  res.setHeader("Set-Cookie", cookie.serialize("thirdweb_auth_token", token, {
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict"
                  }));
                  return _context.abrupt("return", {
                    address: address
                  });

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](1);
                  return _context.abrupt("return", null);

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 13]]);
        }))();
      }
    });
  }

  function nextOptions(req, res) {
    var _cfg$nextOptions$call, _cfg$nextOptions$even;

    function session(_x) {
      return _session.apply(this, arguments);
    }

    function _session() {
      _session = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee4(_ref2) {
        var session, token, address;
        return asyncToGenerator._regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                session = _ref2.session;
                token = req.cookies.thirdweb_auth_token || "";
                _context4.prev = 2;
                _context4.next = 5;
                return sdk$1.auth.authenticate(cfg.domain, token);

              case 5:
                address = _context4.sent;
                session.user = asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, session.user), {}, {
                  address: address
                });
                return _context4.abrupt("return", session);

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", session);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 10]]);
      }));
      return _session.apply(this, arguments);
    }

    function signOut() {
      res.setHeader("Set-Cookie", cookie.serialize("thirdweb_auth_token", "", {
        path: "/",
        expires: new Date(Date.now() + 5 * 1000)
      }));
    }

    var providers = [].concat(_toConsumableArray(cfg.nextOptions.providers), [ThirdwebProvider(res)]);
    var configSession = (_cfg$nextOptions$call = cfg.nextOptions.callbacks) === null || _cfg$nextOptions$call === void 0 ? void 0 : _cfg$nextOptions$call.session;

    var callbacks = asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, cfg.nextOptions.callbacks), {}, {
      session: configSession ? /*#__PURE__*/function () {
        var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee2(params) {
          return asyncToGenerator._regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return session(params);

                case 2:
                  params.session = _context2.sent;
                  return _context2.abrupt("return", configSession(params));

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }() : session
    });

    var configSignOut = (_cfg$nextOptions$even = cfg.nextOptions.events) === null || _cfg$nextOptions$even === void 0 ? void 0 : _cfg$nextOptions$even.signOut;

    var events = asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, cfg.nextOptions.events), {}, {
      signOut: configSignOut ? /*#__PURE__*/function () {
        var _ref4 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee3(params) {
          return asyncToGenerator._regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  signOut();
                  return _context3.abrupt("return", configSignOut(params));

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref4.apply(this, arguments);
        };
      }() : signOut
    });

    return asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, cfg.nextOptions), {}, {
      providers: providers,
      callbacks: callbacks,
      events: events
    });
  }

  function getUser() {
    return _getUser.apply(this, arguments);
  }

  function _getUser() {
    _getUser = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee5() {
      var _args5 = arguments;
      return asyncToGenerator._regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", NextAuth.unstable_getServerSession(_args5.length <= 0 ? undefined : _args5[0], _args5.length <= 1 ? undefined : _args5[1], nextOptions(_args5.length <= 0 ? undefined : _args5[0], _args5.length <= 1 ? undefined : _args5[1])));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _getUser.apply(this, arguments);
  }

  function NextAuthHandler() {
    if (arguments.length === 0) {
      return function (req, res) {
        return NextAuth__default["default"](req, res, nextOptions(req, res));
      };
    }

    return NextAuth__default["default"](arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], nextOptions(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]));
  }

  return {
    NextAuthHandler: NextAuthHandler,
    getUser: getUser
  };
}

exports.ThirdwebNextAuth = ThirdwebNextAuth;
