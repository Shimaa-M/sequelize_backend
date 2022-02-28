"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var models_1 = __importDefault(require("./models"));
var order_products_1 = __importDefault(require("./handlers/order_products"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.use((0, cookie_parser_1["default"])());
app.get('/', function (req, res) {
    res.send('Hello World');
});
(0, users_1["default"])(app);
(0, products_1["default"])(app);
(0, orders_1["default"])(app);
(0, order_products_1["default"])(app);
models_1["default"].sequelize.sync().then(function () {
    app.listen(3000, function () {
        console.log("starting listening at ".concat(address));
    });
});
exports["default"] = app;
