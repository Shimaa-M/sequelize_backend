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
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const store = new productController_1.productStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json(products);
});
const show = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.show(parseInt(_req.params.id));
    if (product == null) {
        return next('product not found');
    }
    res.json(product);
});
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = _req.body;
        const newproduct = yield store.create(name, price);
        res.json(newproduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const edit = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            id: parseInt(_req.params.id),
            name: _req.body.name,
            price: parseInt(_req.body.price)
        };
        const updatedProduct = yield store.edit(product);
        if (updatedProduct == null) {
            return next('product not found');
        }
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(parseInt(_req.params.id));
    if (deleted == null) {
        return next('product not found');
    }
    res.json(deleted);
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.patch('/products/:id', edit);
    app.post('/products', create);
    app.delete('/products/:id', destroy);
};
exports.default = productRoutes;
