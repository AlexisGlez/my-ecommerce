"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.constants = {
    string: { type: String },
    date: { type: Date },
    requiredString: { type: String, required: true },
    requiredBoolean: {
        type: Boolean,
        required: true,
        default: false,
    },
    requiredNumber: {
        type: Number,
        required: true,
    },
    requiredInteger: {
        type: Number,
        required: true,
        default: 0,
    },
    requiredFloat: {
        type: Number,
        required: true,
        default: 0.0,
    },
    userModelRef: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    productModelRef: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    schemaOptions: {
        timestamps: true,
    },
};
