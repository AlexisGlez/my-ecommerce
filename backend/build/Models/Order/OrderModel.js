"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("@app-models/constants");
const OrderSchema = new mongoose_1.default.Schema({
    user: constants_1.constants.userModelRef,
    orderItems: [
        {
            name: constants_1.constants.requiredString,
            qty: constants_1.constants.requiredNumber,
            image: constants_1.constants.requiredString,
            price: constants_1.constants.requiredNumber,
            product: constants_1.constants.productModelRef,
        },
    ],
    shippingAddress: {
        address: constants_1.constants.requiredString,
        city: constants_1.constants.requiredString,
        postalCode: constants_1.constants.requiredString,
        country: constants_1.constants.requiredString,
    },
    paymentMethod: constants_1.constants.requiredString,
    paymentResult: {
        id: constants_1.constants.string,
        status: constants_1.constants.string,
        update_time: constants_1.constants.string,
        email_address: constants_1.constants.string,
    },
    taxPrice: constants_1.constants.requiredFloat,
    shippingPrice: constants_1.constants.requiredFloat,
    totalPrice: constants_1.constants.requiredFloat,
    isPaid: constants_1.constants.requiredBoolean,
    paidAt: constants_1.constants.date,
    isDelivered: constants_1.constants.requiredBoolean,
    deliveredAt: constants_1.constants.date,
}, constants_1.constants.schemaOptions);
exports.OrderModel = mongoose_1.default.model('Order', OrderSchema);
