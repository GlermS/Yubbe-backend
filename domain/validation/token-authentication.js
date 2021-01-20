"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
var User = /** @class */ (function () {
    function User(approved, name, id, authorization) {
        this.approved = approved;
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
        //console.log(req.headers)
        try {
            var data = jwt.verify(req.headers.authtoken, process.env.AUTHENTICATION_KEY);
            //console.log(data)
            return new User(true, data.name, data.id, data.authorization);
        }
        catch (error) {
            //console.log(error)
            return new User(false, "", "", "");
        }
    };
    return TokenAuthenticator;
}());
exports["default"] = TokenAuthenticator;
