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
const dataOrderProduct = [
    {
        ProductId: 4,
        OrderId: 5,
        quantity: 1
    }, {
        ProductId: 5,
        OrderId: 4,
        quantity: 1
    }
];
const models_1 = __importDefault(require("../models"));
const orderProduct = models_1.default.orderProduct;
const create = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dataOrderProduct.map(entry => {
        orderProduct.create(entry);
    });
});
create();
const deleted = () => __awaiter(void 0, void 0, void 0, function* () {
    orderProduct.destroy({
        truncate: true
    });
});
//deleted();
