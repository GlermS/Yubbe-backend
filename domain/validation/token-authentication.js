"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
var User = /** @class */ (function () {
    function User(name, id, authorization) {
        this.name = name;
        this.id = id;
        this.authorization = authorization;
    }
    return User;
}());
var TokenAuthenticator = /** @class */ (function () {
    function TokenAuthenticator() {
    }
    TokenAuthenticator.prototype.verifyToken = function (req) {
        try {
            var data = jwt.verify(req.headers.authtoken, process.env.AUTHENTICATION_KEY);
            return { code: 200, data: new User(data.name, data.id, data.authorization) };
        }
        catch (error) {
            return { code: 401, data: new User("", "", "") };
        }
    };
    return TokenAuthenticator;
}());
exports["default"] = TokenAuthenticator;
