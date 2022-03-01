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
exports.orderStore = void 0;
require("reflect-metadata");
const models_1 = __importDefault(require("../models"));
const Order = models_1.default.Order;
class orderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order.findAll();
                return orders;
            }
            catch (err) {
                throw new Error(`Could not get Orders. Error: ${err}`);
            }
            ;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order.findOne({ where: { id: id } });
                return order;
            }
            catch (err) {
                throw new Error(`Could not find Order ${id}. Error: ${err}`);
            }
            ;
        });
    }
    create(status, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order.create({ status: status, user_id: user_id });
                return order;
            }
            catch (err) {
                throw new Error(`Could not add new Order. Error: ${err}`);
            }
        });
    }
    edit(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order.update(o, { where: { id: o.id } });
                return Order;
            }
            catch (err) {
                throw new Error(`Could not update the Order. Error: ${err}`);
            }
            ;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order.destroy({ where: { id: id } });
            }
            catch (err) {
                throw new Error(`Could not delete Order ${id}. Error: ${err}`);
            }
            ;
        });
    }
}
exports.orderStore = orderStore;
exports.default = orderStore;
