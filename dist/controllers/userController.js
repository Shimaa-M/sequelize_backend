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
exports.userStore = void 0;
require("reflect-metadata");
const models_1 = __importDefault(require("../models"));
const User = models_1.default.User;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
class userStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.findAll();
                return users;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
            ;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ where: { id: id } });
                return user;
            }
            catch (err) {
                throw new Error(`Could not find User ${id}. Error: ${err}`);
            }
            ;
        });
    }
    create(n, e, p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = bcrypt_1.default.hashSync(p + pepper, saltRounds);
                const user = yield User.create({ name: n, email: e, password: hash });
                return user;
            }
            catch (err) {
                throw new Error(`Could not add new User. Error: ${err}`);
            }
        });
    }
    edit(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = bcrypt_1.default.hashSync(u.password + pepper, saltRounds);
                const user = yield User.update({ name: u.name, email: u.email, password: hash }, { where: { id: u.id } });
                return user;
            }
            catch (err) {
                throw new Error(`Could not update the User. Error: ${err}`);
            }
            ;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.destroy({ where: { id: id } });
            }
            catch (err) {
                throw new Error(`Could not delete User ${id}. Error: ${err}`);
            }
            ;
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User.findOne({ where: { email: email } });
                if (result) {
                    const user = result[0].dataValues;
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Could not authenticate user . Error: ${err}`);
            }
        });
    }
}
exports.userStore = userStore;
exports.default = userStore;
