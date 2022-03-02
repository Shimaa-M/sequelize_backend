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
exports.productStore = void 0;
require("reflect-metadata");
const models_1 = __importDefault(require("../models"));
const Product = models_1.default.Product;
class productStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield Product.findAll();
                return products;
            }
            catch (err) {
                throw new Error(`Could not get products. Error: ${err}`);
            }
            ;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product.findOne({ where: { id: id } });
                return product;
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. Error: ${err}`);
            }
            ;
        });
    }
    create(p, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product.create({ name: p, price: price });
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new product. Error: ${err}`);
            }
        });
    }
    edit(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product.update(p, { where: { id: p.id } });
                return product;
            }
            catch (err) {
                throw new Error(`Could not update the product. Error: ${err}`);
            }
            ;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product.destroy({ where: { id: id } });
                console.log(product);
                return product;
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${err}`);
            }
            ;
        });
    }
}
exports.productStore = productStore;
exports.default = productStore;
