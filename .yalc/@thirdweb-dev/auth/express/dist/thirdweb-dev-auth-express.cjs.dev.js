'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncToGenerator = require('../../dist/asyncToGenerator-c3545d52.cjs.dev.js');
var cookie = require('cookie');
var sdk = require('@thirdweb-dev/sdk');
var cookieParser = require('cookie-parser');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var cookieParser__default = /*#__PURE__*/_interopDefault(cookieParser);

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

function handler(_x, _x2) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee(req, res) {
    return asyncToGenerator._regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", res.status(200).json(req.user));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handler.apply(this, arguments);
}

function getUser(req) {
  return req.user;
}
function ThirdwebAuth(app, cfg) {
  var _cfg$authUrl;

  var ctx = asyncToGenerator._objectSpread2(asyncToGenerator._objectSpread2({}, cfg), {}, {
    sdk: sdk.ThirdwebSDK.fromPrivateKey(cfg.privateKey, "mainnet")
  });

  var authUrl = ((_cfg$authUrl = cfg.authUrl) === null || _cfg$authUrl === void 0 ? void 0 : _cfg$authUrl.replace(/\/$/, "")) || "/auth";
  app.use(cookieParser__default["default"]());
  app.use( /*#__PURE__*/function () {
    var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime().mark(function _callee(req, _, next) {
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
              req.user = user;
              next();

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 11]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get("".concat(authUrl, "/:route"), function (req, res) {
    var action = req.params.route;

    switch (action) {
      case "login":
        return handler$2(req, res, ctx);

      case "user":
        return handler(req, res);

      case "logout":
        return handler$1(req, res);

      default:
        return res.status(400).json({
          message: "Invalid route for authentication."
        });
    }
  });
}

exports.ThirdwebAuth = ThirdwebAuth;
exports.getUser = getUser;
