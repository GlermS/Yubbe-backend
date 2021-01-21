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
exports.AdmCallsHandler = void 0;
var mongodb_1 = require("../database/DB/mongodb/mongodb");
var token_authentication_1 = require("../validation/token-authentication");
var CallsHandler = /** @class */ (function () {
    function CallsHandler() {
    }
    CallsHandler.prototype.listCalls = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, respo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!auth.approved) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.listCalls()];
                    case 1:
                        respo = _a.sent();
                        return [2 /*return*/, respo];
                    case 2: return [2 /*return*/, { code: 401, data: "Not allowed" }];
                }
            });
        });
    };
    CallsHandler.prototype.createCall = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!(auth.approved && auth.authorization === "adm")) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.createCall(req.body.date, req.body.theme, req.body.moderator)];
                    case 1:
                        call = _a.sent();
                        return [2 /*return*/, call];
                    case 2: return [2 /*return*/, { code: 401, data: "Not allowed" }];
                }
            });
        });
    };
    CallsHandler.prototype.joinCall = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!auth.approved) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.joinCall(auth.id, req.body.callId)["catch"](console.log)];
                    case 1:
                        call = _a.sent();
                        return [2 /*return*/, call];
                    case 2: return [2 /*return*/, { code: 401, message: "Not allowed" }];
                }
            });
        });
    };
    CallsHandler.prototype.moderateCall = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!(auth.approved && (auth.authorization === 'adm' || auth.authorization === 'moderator'))) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.moderateCall(auth.id, auth.authorization, req.body.callId)["catch"](console.log)];
                    case 1:
                        call = _a.sent();
                        return [2 /*return*/, call];
                    case 2: return [2 /*return*/, { code: 401, message: "Not allowed" }];
                }
            });
        });
    };
    CallsHandler.prototype.listUsersCalls = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!auth.approved) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.listUsersCalls(auth.id)]; //.catch(console.log)
                    case 1:
                        call = _a.sent() //.catch(console.log)
                        ;
                        return [2 /*return*/, call];
                    case 2: return [2 /*return*/, { code: 401, data: "Not allowed" }];
                }
            });
        });
    };
    CallsHandler.prototype.authenticateData = function (req) {
        var authenticator = new token_authentication_1["default"]();
        return authenticator.verifyToken(req);
    };
    return CallsHandler;
}());
exports["default"] = CallsHandler;
var AdmCallsHandler = /** @class */ (function () {
    function AdmCallsHandler() {
    }
    AdmCallsHandler.prototype.callInfo = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!auth.approved) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.admCallInfo(auth.id, req.params.id)]; //.catch(console.log)
                    case 1:
                        call = _a.sent() //.catch(console.log)
                        ;
                        return [2 /*return*/, call];
                    case 2: return [2 /*return*/, { code: 401, data: "Not allowed" }];
                }
            });
        });
    };
    AdmCallsHandler.prototype.editCall = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, db, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = this.authenticateData(req);
                        if (!auth.approved) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.admUpdateCall(auth.id, req.body)];
                    case 1:
                        call = _a.sent();
                        return [2 /*return*/, call];
                    case 2: return [2 /*return*/, { code: 401, data: "Not allowed" }];
                }
            });
        });
    };
    AdmCallsHandler.prototype.authenticateData = function (req) {
        var authenticator = new token_authentication_1["default"]();
        return authenticator.verifyToken(req);
    };
    return AdmCallsHandler;
}());
exports.AdmCallsHandler = AdmCallsHandler;
