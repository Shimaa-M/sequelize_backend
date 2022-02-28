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
const orderController_1 = __importDefault(require("../orderController"));
const index_1 = require("../../models/index");
const userController_1 = __importDefault(require("../userController"));
const store = new orderController_1.default();
const userStore_ = new userController_1.default();
describe('Test orders endpoint response', () => {
    beforeAll(() => {
        const name = "Mariam";
        const email = "mariam@mailsac.com";
        const password = "test1234";
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield userStore_.create(name, email, password);
            yield userStore_.authenticate(email, password);
        }));
    });
    it('should get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.index();
            expect(res === null || res === void 0 ? void 0 : res.length).toBe(1);
        }));
    }));
    it('should get 1 order', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.show(1);
            expect(res === null || res === void 0 ? void 0 : res.id).toBe(1);
        }));
    }));
    it('should create new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const status = "open";
        const user_id = 1;
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create(status, user_id);
            expect(res.status).toBe("open");
        }));
    }));
    it('should update order', () => __awaiter(void 0, void 0, void 0, function* () {
        const editOrder = {
            id: 1,
            status: "closed",
            user_id: 1
        };
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.edit(editOrder);
            expect(res.status).toBe("Closed");
        }));
    }));
    it('should delete the order', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield store.delete(2);
            expect(response).toThrowError();
        }));
    }));
    afterAll(() => {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield userStore_.delete(1);
        }));
    });
});
