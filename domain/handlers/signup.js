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
var mongodb_1 = require("../database/DB/mongodb/mongodb");
var jwt = require("jsonwebtoken");
var send_1 = require("../notifications/mailer/send");
var SignupHandler = /** @class */ (function () {
    function SignupHandler() {
    }
    SignupHandler.prototype.createAccount = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, isOk, db, resp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        isOk = this.validateData(name, email, password, '');
                        if (!isOk) return [3 /*break*/, 2];
                        db = new mongodb_1["default"]();
                        return [4 /*yield*/, db.createNewAccount(name, email, password).then(function (response) {
                                if (response.data.approved) {
                                    var notification = new send_1["default"]();
                                    notification.ConfirmSignup(response.data.email);
                                    return { code: response.code, name: response.data.name, authToken: jwt.sign({ name: response.data.name, id: response.data.id, authorization: response.data.authorization }, process.env.AUTHENTICATION_KEY, { expiresIn: '1h' }) };
                                }
                                else {
                                    return { code: response.code, name: '', authToken: '', message: 'Email já utilizado' };
                                }
                            })["catch"](function (err) {
                                return { code: 401, name: '', authToken: '', message: err.toString() };
                            })];
                    case 1:
                        resp = _b.sent();
                        return [2 /*return*/, resp];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SignupHandler.prototype.validateData = function (name, email, password, authorization) {
        return true;
    };
    return SignupHandler;
}());
exports["default"] = SignupHandler;
