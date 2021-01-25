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
    function User(name, id, authorization, email) {
        this.name = name;
        this.id = id;
        this.authorization = authorization;
        this.email = email;
    }
    return User;
}());
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        var _this = this;
        this.admCallInfo = function (editorId, callId) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 2];
                                            _a = { code: 200 };
                                            return [4 /*yield*/, CallModel.aggregate([{ $lookup: {
                                                            from: 'users',
                                                            localField: 'moderatorId',
                                                            foreignField: '_id',
                                                            as: 'moderator'
                                                        } },
                                                    { $lookup: {
                                                            from: 'users',
                                                            localField: 'clients',
                                                            foreignField: '_id',
                                                            as: 'clients'
                                                        } }, {
                                                        $project: {
                                                            "_id": 1,
                                                            "clients.name": 1,
                                                            "clients.email": 1,
                                                            "moderator.name": 1,
                                                            "moderator.email": 1,
                                                            "date": 1,
                                                            "theme": 1
                                                        }
                                                    },
                                                    { $match: { "_id": mongoose.Types.ObjectId(callId) } }])];
                                        case 1:
                                            resp = (_a.data = _b.sent(), _a);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 401, data: "Only adm" };
                                            _b.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        }); };
        this.admCheckEmail = function (checker, email) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        resp = { registered: false, name: '' };
                        return [4 /*yield*/, UserModel.findOne({ '_id': checker }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(user.authorization === 'adm')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, UserModel.find({ email: email }).then(function (result) {
                                                    if (result.length > 0) {
                                                        resp = { registered: true, name: result[0].name };
                                                    }
                                                })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { code: 200, data: resp }];
                }
            });
        }); };
        this.admGetUserIdByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(email.length > 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, UserModel.aggregate([{ $match: { email: { $in: email } } }, { $project: { _id: 1 } }]).then(function (users) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resp = users.map(function (user, i) {
                                        return mongoose.Types.ObjectId(user._id);
                                    });
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, UserModel.findOne({ email: email }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                resp = mongoose.Types.ObjectId(user._id);
                                return [2 /*return*/];
                            });
                        }); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, resp];
                }
            });
        }); };
        this.admUpdateCall = function (editorId, callId, callData) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, _b, _c, _d;
                                var _e;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 6];
                                            data = {};
                                            if (!callData.clients) return [3 /*break*/, 2];
                                            _a = data;
                                            _b = 'clients';
                                            return [4 /*yield*/, this.admGetUserIdByEmail(callData.clients)];
                                        case 1:
                                            _a[_b] = _f.sent();
                                            _f.label = 2;
                                        case 2:
                                            if (!callData.moderator) return [3 /*break*/, 4];
                                            _c = data;
                                            _d = 'moderatorId';
                                            return [4 /*yield*/, this.admGetUserIdByEmail([callData.moderator])];
                                        case 3:
                                            _c[_d] = _f.sent();
                                            _f.label = 4;
                                        case 4:
                                            if (callData.theme) {
                                                data['theme'] = callData.theme;
                                            }
                                            if (callData.date) {
                                                data['date'] = callData.date;
                                            }
                                            _e = { code: 200 };
                                            return [4 /*yield*/, CallModel.updateOne({ "_id": callId }, data)];
                                        case 5:
                                            resp = (_e.data = _f.sent(), _e);
                                            return [3 /*break*/, 7];
                                        case 6:
                                            resp = { code: 401, data: "Only adm" };
                                            _f.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        }); };
        this.admDeleteCall = function (editorId, callId) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 2];
                                            _a = { code: 200 };
                                            return [4 /*yield*/, CallModel.deleteOne({ "_id": callId })];
                                        case 1:
                                            resp = (_a.data = _b.sent(), _a);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 401, data: "Only adm" };
                                            _b.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        }); };
    }
    MongoDB.prototype.listUsers = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, authConfirmed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ _id: userId }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(user.authorization === 'adm')) return [3 /*break*/, 2];
                                            _a = { code: 200 };
                                            return [4 /*yield*/, UserModel.aggregate([{ $project: { "_id": 1, "weeklyLimit": 1, "name": 1, "email": 1, "authorization": 1 } }])];
                                        case 1:
                                            resp = (_a.data = _b.sent(), _a);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 401, data: "Only adm" };
                                            _b.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        authConfirmed = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    MongoDB.prototype.admUpdateUser = function (editorId, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 2];
                                            _a = { code: 200 };
                                            return [4 /*yield*/, UserModel.updateOne({ '_id': userData.id }, userData)];
                                        case 1:
                                            resp = (_a.data = _b.sent(), _a);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 401, data: "Only adm" };
                                            _b.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    MongoDB.prototype.admUpdateUserPassword = function (editorId, userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, bcrypt_1.hash(password, 12).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _a;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _a = { code: 200 };
                                                                return [4 /*yield*/, UserModel.updateOne({ '_id': userId }, { password: hash })];
                                                            case 1:
                                                                resp = (_a.data = _b.sent(), _a);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })["catch"](function (err) {
                                                    resp = { code: 409, data: 'Deu ruim' };
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 401, data: "Only adm" };
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    MongoDB.prototype.admDeleteUser = function (editorId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 2];
                                            _a = { code: 200 };
                                            return [4 /*yield*/, UserModel.deleteOne({ '_id': userId })];
                                        case 1:
                                            resp = (_a.data = _b.sent(), _a);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            resp = { code: 401, data: "Only adm" };
                                            _b.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 400, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
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
                                    return { code: 202, data: new User(resp[0].name, resp[0].id, resp[0].authorization, '') };
                                }
                                else {
                                    return { code: 401, data: new User('', '', '', '') };
                                }
                            })];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, { code: 400, data: new User('', '', '', '') }];
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
                        dbConnect();
                        return [4 /*yield*/, bcrypt_1.hash(password, 12).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
                                var resp;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, UserModel.create({ name: name, email: email, password: hash }).then(function (data) {
                                                if (data != undefined) {
                                                    return { code: 201, data: new User(data.name, data.id, data.authorization, data.email) };
                                                }
                                                return { code: 401, data: new User('', '', '', '') };
                                            })["catch"](function (err) {
                                                return { code: 409, data: new User('', '', '', '') };
                                            })];
                                        case 1:
                                            resp = _a.sent();
                                            return [2 /*return*/, resp];
                                    }
                                });
                            }); })];
                    case 1:
                        user = _a.sent();
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
    MongoDB.prototype.listUserCalls = function (userId) {
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
                            }).then(function (data) { return data; })];
                    case 2:
                        respM = _a.sent();
                        return [2 /*return*/, { code: 200, data: { client: resp, moderator: respM } }];
                }
            });
        });
    };
    MongoDB.prototype.createCall = function (callData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        data = {};
                        if (callData.theme) {
                            data['theme'] = callData.theme;
                        }
                        if (callData.date) {
                            data['date'] = callData.date;
                        }
                        return [4 /*yield*/, CallModel.create(data).then(function (data) { return { code: 201, data: data }; })["catch"](function (err) { return { code: 404, data: err.toString() }; })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
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
                                if (call.clients.length < 5) {
                                    return { isNotFull: true, date: call.date };
                                }
                                else {
                                    return { isNotFull: false };
                                }
                            })["catch"](function (err) {
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
                    case 7: return [2 /*return*/, resp];
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
                            })];
                    case 1:
                        authConfirmed = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    MongoDB.prototype.admCallAddClient = function (editorId, userEmail, callId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, CallModel.findOne({ _id: callId }).then(function (call) {
                                if (call.clients.length < process.env.CALL_LIMIT) {
                                    return { isNotFull: true };
                                }
                                else {
                                    return { isNotFull: false };
                                }
                            })["catch"](function (err) {
                                return { isNotFull: false };
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.isNotFull) return [3 /*break*/, 3];
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var userid, respM;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.admGetUserIdByEmail([userEmail])];
                                        case 1:
                                            userid = _a.sent();
                                            return [4 /*yield*/, CallModel.updateOne({ _id: callId }, { $addToSet: { clients: userid } })];
                                        case 2:
                                            respM = _a.sent();
                                            resp = { code: 200, data: respM };
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 405, data: err.toString() };
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        resp = { code: 423, data: "The call is full" };
                        _a.label = 4;
                    case 4: return [2 /*return*/, resp];
                }
            });
        });
    };
    MongoDB.prototype.admCallRemoveClient = function (editorId, userEmail, callId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbConnect();
                        return [4 /*yield*/, UserModel.findOne({ '_id': editorId }).then(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var userid, respM;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(editor.authorization === 'adm')) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.admGetUserIdByEmail([userEmail])];
                                        case 1:
                                            userid = _a.sent();
                                            return [4 /*yield*/, CallModel.updateOne({ _id: callId }, { $pull: { clients: userid } })];
                                        case 2:
                                            respM = _a.sent();
                                            resp = { code: 200, data: respM };
                                            return [3 /*break*/, 4];
                                        case 3:
                                            resp = { code: 401, data: "Not allowed" };
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resp = { code: 405, data: err.toString() };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    return MongoDB;
}());
exports["default"] = MongoDB;
