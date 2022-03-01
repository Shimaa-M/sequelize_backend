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
exports.DashboardQueries = void 0;
const models_1 = __importDefault(require("../models"));
const orderProduct = models_1.default.orderProduct;
const Order = models_1.default.Order;
const Product = models_1.default.Product;
class DashboardQueries {
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield orderProduct.create(entry);
                return res;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    //Get all products that have been included in orders
    productsInOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products_in_orders = yield Order.findAll({
                    include: { model: models_1.default.Product
                    }
                });
                return products_in_orders;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    productsInOneOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products_in_orders = yield Order.findAll({ attributes: ['id'], where: { id: id },
                    include: {
                        model: models_1.default.Product, attributes: ['name', 'price']
                    }
                });
                return products_in_orders;
            }
            catch (Error) {
                return null;
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
