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
const productController_1 = __importDefault(require("../productController"));
const index_1 = require("../../models/index");
const store = new productController_1.default();
describe('Test products endpoint response', () => {
    const name = "camera";
    const price = 1000;
    it('should create new product', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create(name, price);
            expect(res.name).toBe("camera");
        }));
    }));
    it('should update product', () => __awaiter(void 0, void 0, void 0, function* () {
        const editProduct = {
            id: 1,
            name: "TV",
            price: 10000
        };
        index_1.sequelize.sync({ alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.edit(editProduct);
            expect(res.name).toBe("TV");
        }));
    }));
    it('should get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.index();
            expect(res === null || res === void 0 ? void 0 : res.length).toBe(1);
        }));
    }));
    it('should get 1 product', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.show(1);
            expect(res === null || res === void 0 ? void 0 : res.id).toBe(1);
        }));
    }));
    it('should delete the product', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield store.delete(2);
            expect(response).toThrowError();
        }));
    }));
});
