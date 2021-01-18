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
var mongoose = require("mongoose");
var bcrypt_1 = require("bcrypt");
var weeknumber_1 = require("weeknumber");
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
                        return [4 /*yield*/, UserModel.find({ email: email })];
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
    MongoDB.prototype.createNewAccount = function (name, email, password) {
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
                                        case 0: return [4 /*yield*/, UserModel.create({ name: name, email: email, password: hash }).then(function (data) {
                                                if (data != undefined) {
                                                    //.log("User criado")
                                                    return { code: 201, data: new User(true, data.name, data.id, data.authorization) };
                                                }
                                                return { code: 401, data: new User(false, '', '', '') };
                                            })["catch"](function (err) {
                                                //console.log(err)
                                                return { code: 409, data: new User(false, '', '', '') };
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
            var respM;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, CallModel.aggregate([{ $lookup: {
                                        from: 'users',
                                        localField: 'moderatorId',
                                        foreignField: '_id',
                                        as: 'moderator'
                                    } },
                                { $project: {
                                        "_id": 1,
                                        "theme": 1,
                                        "date": 1,
                                        "clients": 1,
                                        "moderator._id": 1,
                                        "moderator.name": 1
                                    } }, { $match: { date: { $gt: new Date() } } }]).sort({ date: 1 }).then(function (data) { return data; })];
                    case 1:
                        respM = _a.sent();
                        return [2 /*return*/, { code: 200, data: respM }];
                }
            });
        });
    };
    MongoDB.prototype.listUsersCalls = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, respM;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, CallModel.find({ clients: userId, date: { $gt: new Date() } }).then(function (data) { return data; })];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, CallModel.find({
                                "moderatorId": mongoose.Types.ObjectId(userId),
                                date: { $gt: new Date() }
                            }).then(function (data) { return data; })
                            //console.log(respM)
                        ];
                    case 2:
                        respM = _a.sent();
                        //console.log(respM)
                        return [2 /*return*/, { code: 200, data: { client: resp, moderator: respM } }];
                }
            });
        });
    };
    MongoDB.prototype.createCall = function (date, theme, moderator) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, CallModel.create({ date: date, theme: theme, moderator: moderator }).then(function (data) { return data; })["catch"](function (err) { return { error: err.toString() }; })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, { code: 201, data: resp }];
                }
            });
        });
    };
    MongoDB.prototype.joinCall = function (userId, callId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, resp, lastWeekDate, respM, isNotRegistered, op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, CallModel.findOne({ _id: callId }).then(function (call) {
                                //console.log(call.clients)
                                if (call.clients.length < 5) {
                                    return { isNotFull: true, date: call.date };
                                }
                                else {
                                    return { isNotFull: false };
                                }
                            })["catch"](function (err) {
                                //console.log(err)
                                return { isNotFull: false };
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.isNotFull) return [3 /*break*/, 6];
                        lastWeekDate = new Date(response.date);
                        lastWeekDate.setDate(lastWeekDate.getDate() - 8);
                        return [4 /*yield*/, CallModel.find({ $and: [{ date: { $gte: lastWeekDate } }, { clients: userId }] }).sort({ date: 1 }).then(function (data) { return data; })];
                    case 2:
                        respM = _a.sent();
                        isNotRegistered = true;
                        respM.every(function (call, id) {
                            if (weeknumber_1.weekNumber(call.date) === weeknumber_1.weekNumber(response.date)) {
                                console.log('Era para parar');
                                isNotRegistered = false;
                                return;
                            }
                        });
                        if (!isNotRegistered) return [3 /*break*/, 4];
                        return [4 /*yield*/, CallModel.updateOne({ _id: callId }, { $addToSet: { clients: userId } })];
                    case 3:
                        op = _a.sent();
                        if (op.nModified > 0) {
                            resp = { code: 201, data: "The user was registered" };
                        }
                        else {
                            resp = { code: 202, data: "The user is already registered" };
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        resp = { code: 429, data: "Weekly limit" };
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        resp = { code: 423, data: "The call is full" };
                        _a.label = 7;
                    case 7:
                        console.log(resp);
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    MongoDB.prototype.moderateCall = function (userId, authorization, callId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, authConfirmed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ _id: userId }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var op;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(user.authorization === authorization)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, CallModel.updateOne({ _id: callId, moderatorId: { $exists: false } }, { moderatorId: user._id })];
                                        case 1:
                                            op = _a.sent();
                                            //console.log(op)
                                            if (op.nModified > 0) {
                                                resp = { code: 201, data: "The moderator was registered" };
                                            }
                                            else {
                                                resp = { code: 401, data: "The call already has a moderator" };
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 423, data: "Data don't match" };
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                console.log(err);
                            })
                            //console.log(resp)
                        ];
                    case 1:
                        authConfirmed = _a.sent();
                        //console.log(resp)
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    return MongoDB;
}());
exports["default"] = MongoDB;
