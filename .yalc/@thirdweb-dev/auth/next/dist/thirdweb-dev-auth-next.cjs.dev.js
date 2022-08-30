'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncToGenerator = require('../../dist/asyncToGenerator-c3545d52.cjs.dev.js');
var cookie = require('cookie');
var sdk = require('@thirdweb-dev/sdk');

function redirectWithError(req, res, error) {
  var encodedError = encodeURIComponent(error);
  var url = new URL(req.headers.referer);
  url.searchParams.set("error", encodedError);
  return res.redirect(url.toString());
}

function handler$2(_x, _x2, _x3) {
  return _handler$2.apply(this, arguments);
}

function _handler$2() {
  _handler$2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee(req, res, ctx) {
    var sdk, domain, payload, token;
    return asyncToGenerator._regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.method !== "GET")) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", redirectWithError(req, res, "INVALID_METHOD"));

          case 2:
            sdk = ctx.sdk, domain = ctx.domain; // Get signed login payload from the frontend

            payload = JSON.parse(atob(req.query.payload));

            if (!payload) {
              redirectWithError(req, res, "MISSING_LOGIN_PAYLOAD");
            }

            _context.prev = 5;
            _context.next = 8;
            return sdk.auth.generateAuthToken(domain, payload);

          case 8:
            token = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", redirectWithError(req, res, "INVALID_LOGIN_PAYLOAD"));

          case 14:
            // Securely set httpOnly cookie on request to prevent XSS on frontend
            // And set path to / to enable thirdweb_auth_token usage on all endpoints
            res.setHeader("Set-Cookie", cookie.serialize("thirdweb_auth_token", token, {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict"
            }));
            return _context.abrupt("return", res.status(301).redirect(req.query.redirect));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 11]]);
  }));
  return _handler$2.apply(this, arguments);
}

function handler$1(_x, _x2) {
  return _handler$1.apply(this, arguments);
}

function _handler$1() {
  _handler$1 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee(req, res) {
    return asyncToGenerator._regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.method !== "GET")) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Invalid method. Only GET supported."
            }));

          case 2:
            // Set the access token to 'none' and expire in 5 seconds
            res.setHeader("Set-Cookie", cookie.serialize("thirdweb_auth_token", "", {
              path: "/",
              expires: new Date(Date.now() + 5 * 1000)
            }));
            return _context.abrupt("return", res.status(301).redirect(req.headers.referer));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handler$1.apply(this, arguments);
}

function handler(_x, _x2, _x3) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee(req, res, ctx) {
    var sdk, domain, user, token, address;
    return asyncToGenerator._regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sdk = ctx.sdk, domain = ctx.domain;
            user = null;
            token = req.cookies.thirdweb_auth_token;

            if (!token) {
              _context.next = 13;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return sdk.auth.authenticate(domain, token);

          case 7:
            address = _context.sent;
            user = {
              address: address
            };
            _context.next = 13;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);

          case 13:
            return _context.abrupt("return", res.status(200).json(user));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11]]);
  }));
  return _handler.apply(this, arguments);
}

function ThirdwebAuthRouter(_x, _x2, _x3) {
  return _ThirdwebAuthRouter.apply(this, arguments);
}

function _ThirdwebAuthRouter() {
  _ThirdwebAuthRouter = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee3(req, res, ctx) {
    var thirdweb, action;
    return asyncToGenerator._regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Catch-all route must be named with [...thirdweb]
            thirdweb = req.query.thirdweb;
            action = thirdweb === null || thirdweb === void 0 ? void 0 : thirdweb[0];
            _context3.t0 = action;
            _context3.next = _context3.t0 === "login" ? 5 : _context3.t0 === "user" ? 8 : _context3.t0 === "logout" ? 11 : 14;
            break;

          case 5:
            _context3.next = 7;
            return handler$2(req, res, ctx);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
            _context3.next = 10;
            return handler(req, res, ctx);

          case 10:
            return _context3.abrupt("return", _context3.sent);

          case 11:
            _context3.next = 13;
            return handler$1(req, res);

          case 13:
            return _context3.abrupt("return", _context3.sent);

          case 14:
            return _context3.abrupt("return", res.status(400).json({
              message: "Invalid route for authentication."
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _ThirdwebAuthRouter.apply(this, arguments);
}

function ThirdwebAuth(cfg) {
  var ctx = asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, cfg), {}, {
    sdk: sdk.ThirdwebSDK.fromPrivateKey(cfg.privateKey, "mainnet")
  });

  function ThirdwebAuthHandler() {
    if (arguments.length === 0) {
      return /*#__PURE__*/function () {
        var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee(req, res) {
          return asyncToGenerator._regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return ThirdwebAuthRouter(req, res, ctx);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x4, _x5) {
          return _ref.apply(this, arguments);
        };
      }();
    }

    return ThirdwebAuthRouter(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], ctx);
  }

  function getUser(_x6) {
    return _getUser.apply(this, arguments);
  }

  function _getUser() {
    _getUser = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee2(req) {
      var sdk, domain, user, token, address;
      return asyncToGenerator._regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sdk = ctx.sdk, domain = ctx.domain;
              user = null;
              token = typeof req.cookies.get === "function" ? req.cookies.get("thirdweb_auth_token") : req.cookies.thirdweb_auth_token;

              if (!token) {
                _context2.next = 13;
                break;
              }

              _context2.prev = 4;
              _context2.next = 7;
              return sdk.auth.authenticate(domain, token);

            case 7:
              address = _context2.sent;
              user = {
                address: address
              };
              _context2.next = 13;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](4);

            case 13:
              return _context2.abrupt("return", user);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 11]]);
    }));
    return _getUser.apply(this, arguments);
  }

  return {
    ThirdwebAuthHandler: ThirdwebAuthHandler,
    getUser: getUser
  };
}

exports.ThirdwebAuth = ThirdwebAuth;
