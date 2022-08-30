'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncToGenerator = require('../../dist/asyncToGenerator-e9ef3976.cjs.prod.js');
var sdk = require('@thirdweb-dev/sdk');
var cookie = require('cookie');
var CredentialsProvider = require('next-auth/providers/credentials');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var CredentialsProvider__default = /*#__PURE__*/_interopDefault(CredentialsProvider);

function ThirdwebAuth(cfg) {
  var sdk$1 = sdk.ThirdwebSDK.fromPrivateKey(cfg.privateKey, "mainnet");

  var ThirdwebProvider = function ThirdwebProvider(req, res) {
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
                  return sdk$1.auth.generateAuthToken("thirdweb.com", parsed);

                case 5:
                  token = _context.sent;
                  _context.next = 8;
                  return sdk$1.auth.authenticate("thirdweb.com", token);

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
  };

  var authOptions = function authOptions(req, res) {
    return {
      callbacks: {
        session: function session(_ref2) {
          return asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee2() {
            var session, token, address;
            return asyncToGenerator._regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    session = _ref2.session;
                    token = req.cookies.thirdweb_auth_token || "";
                    _context2.prev = 2;
                    _context2.next = 5;
                    return sdk$1.auth.authenticate("thirdweb.com", token);

                  case 5:
                    address = _context2.sent;
                    session.user = asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, session.user), {}, {
                      address: address
                    });
                    return _context2.abrupt("return", session);

                  case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2["catch"](2);
                    return _context2.abrupt("return", session);

                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[2, 10]]);
          }))();
        }
      },
      events: {
        signOut: function signOut() {
          res.setHeader("Set-Cookie", cookie.serialize("thirdweb_auth_token", "", {
            path: "/",
            expires: new Date(Date.now() + 5 * 1000)
          }));
        }
      }
    };
  };

  return {
    ThirdwebProvider: ThirdwebProvider,
    authOptions: authOptions
  };
}

exports.ThirdwebAuth = ThirdwebAuth;
