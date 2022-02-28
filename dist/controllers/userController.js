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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userStore = void 0;
require("reflect-metadata");
var models_1 = __importDefault(require("../models"));
var User = models_1["default"].User;
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = parseInt(process.env.SALT_ROUNDS);
var pepper = process.env.BCRYPT_PASSWORD;
var userStore = /** @class */ (function () {
    function userStore() {
    }
    userStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findAll()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("Could not get users. Error: ".concat(err_1));
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("Could not find User ".concat(id, ". Error: ").concat(err_2));
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.create = function (n, e, p) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hash = bcrypt_1["default"].hashSync(p + pepper, saltRounds);
                        return [4 /*yield*/, User.create({ name: n, email: e, password: hash })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("Could not add new User. Error: ".concat(err_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.edit = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hash = bcrypt_1["default"].hashSync(u.password + pepper, saltRounds);
                        return [4 /*yield*/, User.update({ name: u.name, email: u.email, password: hash }, { where: { id: u.id } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("Could not update the User. Error: ".concat(err_4));
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.destroy({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        throw new Error("Could not delete User ".concat(id, ". Error: ").concat(err_5));
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, user, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findOne({ where: { email: email } })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            user = result[0].dataValues;
                            if (bcrypt_1["default"].compareSync(password + pepper, user.password)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                    case 2:
                        err_6 = _a.sent();
                        throw new Error("Could not authenticate user . Error: ".concat(err_6));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return userStore;
}());
exports.userStore = userStore;
exports["default"] = userStore;
