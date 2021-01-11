"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var UserModel = require('./models/User');
var CallModel = require('./models/Call');
var dbConnect = require("./dbConnect");
var bcrypt_1 = require("bcrypt");
var User = /** @class */ (function () {
    function User(approved, name, id, authorization) {
        this.approved = approved;
        this.name = name;
        this.id = id;
        this.authorization = authorization;
    }
    return User;
}());
var MongoDB = /** @class */ (function () {
    function MongoDB() {
    }
    MongoDB.prototype.compareLoginData = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, resp, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbConnect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, UserModel.find({ email: email }).maxTime(1000)];
                    case 2:
                        resp = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, bcrypt_1.compare(password, resp[0].password).then(function (isPasswordOk) {
                                if (isPasswordOk) {
                                    return new User(true, resp[0].name, resp[0].id, resp[0].authorization);
                                }
                                else {
                                    return new User(false, '', '', '');
                                }
                            })];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, new User(false, '', '', '')];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.createNewAccount = function (name, email, password, authorization) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log("Entrou")
                        dbConnect();
                        return [4 /*yield*/, bcrypt_1.hash(password, 12).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
                                var resp;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(hash);
                                            return [4 /*yield*/, UserModel.create({ name: name, email: email, password: hash, authorization: authorization }).then(function (data) {
                                                    if (data != undefined) {
                                                        //console.log("User criado")
                                                        return new User(true, data.name, data.id, data.authorization);
                                                    }
                                                    return new User(false, '', '', '');
                                                })["catch"](function (err) {
                                                    //console.log(err)
                                                    return new User(false, '', '', '');
                                                })
                                                //console.log("Resp")
                                            ];
                                        case 1:
                                            resp = _a.sent();
                                            //console.log("Resp")
                                            return [2 /*return*/, resp];
                                    }
                                });
                            }); })
                            //console.log(user)
                        ];
                    case 1:
                        user = _a.sent();
                        //console.log(user)
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MongoDB.prototype.listCalls = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, CallModel.find({}).then(function (data) { return data; })["catch"](function (err) { return { error: err.toString() }; })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    return MongoDB;
}());
exports["default"] = MongoDB;
