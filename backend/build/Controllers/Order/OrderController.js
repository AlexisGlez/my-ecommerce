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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const Order_1 = require("@app-models/Order");
class OrderController {
    static postOrder(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            const { orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice, } = req.body;
            if (!orderItems || !orderItems.length) {
                res.status(400).json({ data: null, message: 'No order items found.' });
                return;
            }
            try {
                const order = new Order_1.OrderModel({
                    user: req.user._id,
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                });
                const createdOrder = yield order.save();
                res.status(201).json({ data: createdOrder, message: 'Order created.' });
            }
            catch (error) {
                console.error('An error happened while creating the order:', error);
                res.status(500).json({ data: [], message: 'Unable to create order.' });
            }
        });
    }
    static getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id) {
                res.status(400).json({ data: null, message: 'No order id found.' });
                return;
            }
            try {
                const order = yield Order_1.OrderModel.findById(req.params.id).populate('user', 'name email');
                if (!order) {
                    res.status(404).json({ data: null, message: 'No order found.' });
                    return;
                }
                res.status(200).json({ data: order, message: 'Order found.' });
            }
            catch (error) {
                console.error('An error happened while getting order by id:', error);
                res.status(500).json({ data: null, message: 'Unable to get order.' });
            }
        });
    }
    static payOrder(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id) {
                res.status(400).json({ data: null, message: 'No order id found.' });
                return;
            }
            try {
                const order = yield Order_1.OrderModel.findById(req.params.id);
                if (!order) {
                    res.status(404).json({ data: null, message: 'No order found.' });
                    return;
                }
                order.isPaid = true;
                order.paidAt = Date.now().toString();
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: (_a = req.body.payer) === null || _a === void 0 ? void 0 : _a.email_address,
                };
                const updatedOrder = yield order.save();
                res.status(200).json({ data: updatedOrder, message: 'Order payed.' });
            }
            catch (error) {
                console.error('An error happened while getting order by id:', error);
                res.status(500).json({ data: null, message: 'Unable to get order.' });
            }
        });
    }
    static getAllUserOrders(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const orders = yield Order_1.OrderModel.find({ user: req.user.id });
                res.status(200).json({ data: orders || [], message: 'Orders found.' });
            }
            catch (error) {
                console.error('An error happened while getting user orders:', error);
                res.status(500).json({ data: null, message: 'Unable to get orders.' });
            }
        });
    }
    static getAllOrders(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const orders = yield Order_1.OrderModel.find({}).populate('user', 'id name');
                res.status(200).json({ data: orders || [], message: 'Orders found.' });
            }
            catch (error) {
                console.error('An error happened while getting user orders:', error);
                res.status(500).json({ data: null, message: 'Unable to get orders.' });
            }
        });
    }
    static deliverOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id) {
                res.status(400).json({ data: null, message: 'No order id found.' });
                return;
            }
            try {
                const order = yield Order_1.OrderModel.findById(req.params.id);
                if (!order) {
                    res.status(404).json({ data: null, message: 'No order found.' });
                    return;
                }
                order.isDelivered = true;
                order.deliveredAt = Date.now().toString();
                const updatedOrder = yield order.save();
                res.status(200).json({ data: updatedOrder, message: 'Order delivered.' });
            }
            catch (error) {
                console.error('An error happened while getting order by id:', error);
                res.status(500).json({ data: null, message: 'Unable to get order.' });
            }
        });
    }
}
exports.OrderController = OrderController;
