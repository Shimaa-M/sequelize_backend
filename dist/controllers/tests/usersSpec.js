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
const userController_1 = __importDefault(require("../userController"));
const index_1 = require("../../models/index");
const store = new userController_1.default();
describe('Test users endpoint response', () => {
    const name = "Mariam";
    const email = "mariam@mailsac.com";
    const password = "test1234";
    it('should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.create(name, email, password);
            expect(res.name).toBe("Mariam");
        }));
    }));
    it('should update user', () => __awaiter(void 0, void 0, void 0, function* () {
        const editUser = {
            id: 1,
            name: "Saeed",
            email: "Saeed@mailsac.com",
            password: "test1234"
        };
        index_1.sequelize.sync({ alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.edit(editUser);
            expect(res.email).toBe("Saeed@mailsac.com");
        }));
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.index();
            expect(res === null || res === void 0 ? void 0 : res.length).toBe(1);
        }));
    }));
    it('should get 1 user', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield store.show(1);
            expect(res === null || res === void 0 ? void 0 : res.id).toBe(1);
        }));
    }));
    it('should authenticate user', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "mariam@mailsac.com";
        const password = "test1234";
        index_1.sequelize.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield store.authenticate(email, password);
            expect(response).toThrowError();
        }));
    }));
    it('should delete the user', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.sequelize.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield store.delete(2);
            expect(response).toThrowError();
        }));
    }));
});
