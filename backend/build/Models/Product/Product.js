"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("@app-models/constants");
const ReviewSchema = new mongoose_1.default.Schema({
    name: constants_1.constants.requiredString,
    rating: constants_1.constants.requiredNumber,
    comment: constants_1.constants.requiredString,
    user: constants_1.constants.userModelRef,
}, constants_1.constants.schemaOptions);
const ProductSchema = new mongoose_1.default.Schema({
    user: constants_1.constants.userModelRef,
    name: constants_1.constants.requiredString,
    image: constants_1.constants.requiredString,
    brand: constants_1.constants.requiredString,
    category: constants_1.constants.requiredString,
    description: constants_1.constants.requiredString,
    reviews: [ReviewSchema],
    rating: constants_1.constants.requiredInteger,
    numReviews: constants_1.constants.requiredInteger,
    price: constants_1.constants.requiredFloat,
    countInStock: constants_1.constants.requiredInteger,
}, constants_1.constants.schemaOptions);
exports.Product = mongoose_1.default.model('Product', ProductSchema);
