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
var userController_1 = require("../controllers/userController");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var isLogged_1 = __importDefault(require("../utilities/isLogged"));
var store = new userController_1.userStore();
var createSendToken = function (user, statusCode, _req, res) {
    var token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_TOKEN);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: _req.secure || _req.headers['x-forwarded-proto'] === 'https'
    });
    // Remove password from output
    user.password = "undefined";
    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user: user
        }
    });
};
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.show(parseInt(_req.params.id))];
            case 1:
                user = _a.sent();
                if (user == null) {
                    return [2 /*return*/, next('user not found')];
                }
                res.json(user);
                return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, newUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = _req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, store.create(name_1, email, password)];
            case 1:
                newUser = _b.sent();
                createSendToken(newUser, 201, _req, res);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var edit = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    id: parseInt(_req.params.id),
                    name: _req.body.name,
                    email: _req.body.email,
                    password: _req.body.password
                };
                return [4 /*yield*/, store.edit(user)];
            case 1:
                updatedUser = _a.sent();
                if (updatedUser == null) {
                    return [2 /*return*/, next('user not found')];
                }
                res.json(updatedUser);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store["delete"](parseInt(_req.params.id))];
            case 1:
                deleted = _a.sent();
                if (deleted == null) {
                    return [2 /*return*/, next('user not found')];
                }
                res.json(deleted);
                return [2 /*return*/];
        }
    });
}); };
var authenticate = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.authenticate(email, password)];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(401).json({ message: 'error login credintial' });
                }
                else
                    createSendToken(user, 200, _req, res);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                res.status(401);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var userRoutes = function (app) {
    app.get('/users', isLogged_1["default"], index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app["delete"]('/users/:id', isLogged_1["default"], destroy);
    app.patch('/users/:id', edit);
    app.post('/login', authenticate);
};
exports["default"] = userRoutes;
