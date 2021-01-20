"use strict";
exports.__esModule = true;
var login_authentication_1 = require("../validation/login-authentication");
var LoginHandler = /** @class */ (function () {
    function LoginHandler() {
    }
    LoginHandler.prototype.authenticateData = function (req) {
        var _a = req.body, email = _a.email, password = _a.password;
        var authenticator = new login_authentication_1["default"]();
        return authenticator.authenticate(email, password);
    };
    return LoginHandler;
}());
exports["default"] = LoginHandler;
