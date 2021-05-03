"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = require("@app-config/Config");
function generateAccessToken(id) {
    return jsonwebtoken_1.default.sign({ id }, Config_1.Config.Constants.jwtSecret, {
        expiresIn: '30m',
    });
}
exports.generateAccessToken = generateAccessToken;
