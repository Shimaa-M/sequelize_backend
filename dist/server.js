"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const models_1 = __importDefault(require("./models"));
const order_products_1 = __importDefault(require("./handlers/order_products"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', function (req, res) {
    res.send('Hello World');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, order_products_1.default)(app);
models_1.default.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log(`starting listening at ${address}`);
    });
});
exports.default = app;
