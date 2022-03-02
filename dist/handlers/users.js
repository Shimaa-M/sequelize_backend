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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLogged_1 = __importDefault(require("../utilities/isLogged"));
const store = new userController_1.userStore();
const createSendToken = (user, statusCode, _req, res) => {
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_TOKEN);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: _req.secure || _req.headers['x-forwarded-proto'] === 'https'
    });
    // Remove password from output
    user.password = "undefined";
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(_req.params.id));
        if (!user) {
            return next('user not found');
        }
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = _req.body;
        const newUser = yield store.create(name, email, password);
        createSendToken(newUser, 201, _req, res);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const edit = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: parseInt(_req.params.id),
            name: _req.body.name,
            email: _req.body.email,
            password: _req.body.password
        };
        const updatedUser = yield store.edit(user);
        if (!updatedUser) {
            return next('user not found');
        }
        res.json('the user is updated sucessfully');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(parseInt(_req.params.id));
        if (!deleted) {
            return next('user not found');
        }
        res.json('the user is deleted sucessfully');
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
});
const authenticate = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = _req.body;
    try {
        const user = yield store.authenticate(email, password);
        console.log(user);
        if (!user) {
            res.status(401).json({ message: 'error login credintial' });
        }
        else
            createSendToken(user, 200, _req, res);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
});
const userRoutes = (app) => {
    app.get('/users', isLogged_1.default, index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', isLogged_1.default, destroy);
    app.patch('/users/:id', edit);
    app.post('/login', authenticate);
};
exports.default = userRoutes;
