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
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const inProductsInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataOrderProduct = [
        {
            ProductId: _req.body.ProductId,
            OrderId: _req.body.OrderId,
            quantity: _req.body.quantity
        }
    ];
    const products = yield dashboard.create(dataOrderProduct);
    res.json(products);
});
const productsInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.productsInOrders();
    res.json(products);
});
const productsInOneOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(_req.params.id);
    const products = yield dashboard.productsInOneOrder(id);
    res.json(products);
});
const dashboardRoutes = (app) => {
    app.post('/products_in_orders', productsInOrders);
    app.get('/products_in_orders', productsInOrders);
    app.get('/order/:id/products', productsInOneOrder);
};
exports.default = dashboardRoutes;
