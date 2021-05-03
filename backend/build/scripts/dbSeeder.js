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
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("@app-models/User");
const Product_1 = require("@app-models/Product");
const Order_1 = require("@app-models/Order");
const Config_1 = require("@app-config/Config");
const users_1 = __importDefault(require("./data/users"));
const products_1 = __importDefault(require("./data/products"));
dotenv_1.default.config();
// Fills the DB with mock data
function fillDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield emptyDB();
            const createdUsers = yield User_1.User.insertMany(users_1.default);
            const adminUser = createdUsers.find((user) => user.isAdmin);
            if (!adminUser) {
                throw new Error('No admin user found!');
            }
            const productsWithOwner = products_1.default.map((product) => (Object.assign(Object.assign({}, product), { user: adminUser })));
            yield Product_1.Product.insertMany(productsWithOwner);
            console.log('Data Imported Successfully!');
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}
// Deletes all the data from the DB.
function emptyDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Order_1.Order.deleteMany();
            yield Product_1.Product.deleteMany();
            yield User_1.User.deleteMany();
            console.log('Data Deleted Successfully!');
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Config_1.Config.Database.connectDB();
        const isEmptyFlag = process.argv[2] === '-e';
        isEmptyFlag ? yield emptyDB() : yield fillDB();
        process.exit();
    });
}
main();
