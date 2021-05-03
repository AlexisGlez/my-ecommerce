"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("@app-controllers/Product");
const auth_1 = require("@app-middlewares/auth");
const admin_1 = require("@app-middlewares/admin");
const ProductRouter = express_1.default.Router();
exports.ProductRouter = ProductRouter;
ProductRouter.route('/').get(Product_1.ProductController.getProducts);
ProductRouter.route('/top').get(Product_1.ProductController.getTopProducts);
ProductRouter.route('/').post(auth_1.authMiddleware, admin_1.adminMiddleware, Product_1.ProductController.createProduct);
ProductRouter.route('/:id').get(Product_1.ProductController.getProductById);
ProductRouter.route('/:id').patch(auth_1.authMiddleware, admin_1.adminMiddleware, Product_1.ProductController.updateProductById);
ProductRouter.route('/:id').delete(auth_1.authMiddleware, admin_1.adminMiddleware, Product_1.ProductController.deleteProduct);
ProductRouter.route('/:id/reviews').post(auth_1.authMiddleware, Product_1.ProductController.createProductReview);
