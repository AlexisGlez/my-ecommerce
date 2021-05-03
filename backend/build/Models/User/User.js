"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("@app-models/constants");
const UserSchema = new mongoose_1.default.Schema({
    name: constants_1.constants.requiredString,
    email: Object.assign(Object.assign({}, constants_1.constants.requiredString), { unique: true }),
    password: constants_1.constants.requiredString,
    isAdmin: constants_1.constants.requiredBoolean,
}, constants_1.constants.schemaOptions);
exports.User = mongoose_1.default.model('User', UserSchema);
