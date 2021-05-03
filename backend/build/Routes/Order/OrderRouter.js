"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const Order_1 = require("@app-controllers/Order");
const auth_1 = require("@app-middlewares/auth");
const admin_1 = require("@app-middlewares/admin");
const OrderRouter = express_1.default.Router();
exports.OrderRouter = OrderRouter;
OrderRouter.route('/').post(auth_1.authMiddleware, Order_1.OrderController.postOrder);
OrderRouter.route('/').get(auth_1.authMiddleware, admin_1.adminMiddleware, Order_1.OrderController.getAllOrders);
OrderRouter.route('/all').get(auth_1.authMiddleware, Order_1.OrderController.getAllUserOrders);
OrderRouter.route('/:id').get(auth_1.authMiddleware, Order_1.OrderController.getOrderById);
OrderRouter.route('/:id/pay').patch(auth_1.authMiddleware, Order_1.OrderController.payOrder);
OrderRouter.route('/:id/deliver').patch(auth_1.authMiddleware, admin_1.adminMiddleware, Order_1.OrderController.deliverOrder);
