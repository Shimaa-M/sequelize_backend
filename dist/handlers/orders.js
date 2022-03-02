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
const orderController_1 = require("../controllers/orderController");
const isLogged_1 = __importDefault(require("../utilities/isLogged"));
const store = new orderController_1.orderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(parseInt(_req.params.id));
        if (!order) {
            return next('order not found');
        }
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(res.locals.user_id);
        if (user_id) {
            return next('you are not logged in');
        }
        const { status } = _req.body;
        const neworder = yield store.create(status, user_id);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const edit = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(res.locals.user_id);
    try {
        const order = {
            Id: parseInt(_req.params.id),
            status: _req.body.status,
            user_id: user_id
        };
        const updatedProduct = yield store.edit(order);
        if (!updatedProduct) {
            return next('order not found');
        }
        res.json('the order has been updated successfully');
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
            return next('order not found');
        }
        res.json('the order has been deleted successfully');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', isLogged_1.default, create);
    app.delete('/orders/:id', isLogged_1.default, destroy);
    app.patch('/orders/:id', isLogged_1.default, edit);
};
exports.default = orderRoutes;
