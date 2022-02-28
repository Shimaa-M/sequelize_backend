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
const dashboard_1 = require("../dashboard");
const index_1 = require("../../models/index");
const store = new dashboard_1.DashboardQueries();
describe('Test products in orders endpoint response', () => {
    it('should create new relation in join table', () => __awaiter(void 0, void 0, void 0, function* () {
        const dataOrderProduct = [
            {
                ProductId: 1,
                OrderId: 1,
                quantity: 5
            }
        ];
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create(dataOrderProduct);
            expect(res).toBeTruthy();
        }));
    }));
    it('should get all orders included products', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.productsInOrders();
            expect(res === null || res === void 0 ? void 0 : res.length).toBe(1);
        }));
    }));
    it('should get products in certain order', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.productsInOneOrder(1);
            expect(res === null || res === void 0 ? void 0 : res.ProductId).toBe(1);
        }));
    }));
});
