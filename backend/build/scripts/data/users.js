"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        name: 'Alexis Glez',
        email: 'alexis@test.com',
        password: bcryptjs_1.default.hashSync('1234'),
        isAdmin: true,
    },
    {
        name: 'Carlos G',
        email: 'carlos@test.com',
        password: bcryptjs_1.default.hashSync('1234'),
        isAdmin: false,
    },
];
exports.default = users;
