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
exports.ProductController = void 0;
const Product_1 = require("@app-models/Product");
class ProductController {
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageSize = Number(req.query.pageSize) || 100;
                const pageNumber = Number(req.query.currentPage) || 1;
                const query = req.query.keyword
                    ? {
                        name: {
                            $regex: req.query.keyword,
                            $options: 'i',
                        },
                    }
                    : {};
                const productsCount = yield Product_1.ProductModel.countDocuments(query);
                const products = yield Product_1.ProductModel.find(query)
                    .limit(pageSize)
                    .skip(pageSize * (pageNumber - 1));
                res.json({ data: { products, page: pageNumber, pages: Math.ceil(productsCount / pageSize) } });
            }
            catch (error) {
                console.error('An error happened while retrieving all products:', error);
                res.status(500).json({ data: [], message: 'Unable to retrieve products.' });
            }
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.ProductModel.findById(req.params.id);
                if (product) {
                    res.json({ data: product });
                }
                else {
                    res.status(404).json({ data: null, message: 'Product not found.' });
                }
            }
            catch (error) {
                console.error('An error happened while retrieving a product by id:', error);
                res.status(500).json({ data: null, message: 'Unable to find product.' });
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.ProductModel.findById(req.params.id);
                if (!product) {
                    res.status(404).json({ data: null, message: 'Not product found.' });
                    return;
                }
                yield product.remove();
                res.status(200).json({ data: true, message: 'Product deleted.' });
            }
            catch (error) {
                console.error('An error happened while deleting product:', error);
                res.status(500).json({ data: null, message: 'Unable to delete product.' });
            }
        });
    }
    static createProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const product = new Product_1.ProductModel({
                    user: req.user.id,
                    name: 'Sample name',
                    image: '/images/sample.jpg',
                    brand: 'Sample brand',
                    category: 'Sample category',
                    description: 'Sample description',
                    rating: 0,
                    numReviews: 0,
                    price: 0.0,
                    countInStock: 0,
                });
                const createdProduct = yield product.save();
                res.status(201).json({ data: createdProduct, message: 'Product created.' });
            }
            catch (error) {
                console.error('An error happened while creating product:', error);
                res.status(500).json({ data: [], message: 'Unable to create product.' });
            }
        });
    }
    static updateProductById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const product = yield Product_1.ProductModel.findById(req.params.id);
                if (!product) {
                    res.status(404).json({ data: null, message: 'Not product found.' });
                    return;
                }
                product.name = req.body.name || product.name;
                product.image = req.body.image || product.image;
                product.brand = req.body.brand || product.brand;
                product.category = req.body.category || product.category;
                product.description = req.body.description || product.description;
                product.price = req.body.price != null ? req.body.price : product.price;
                product.countInStock =
                    req.body.countInStock != null ? req.body.countInStock : product.countInStock;
                const updatedProduct = yield product.save();
                res.status(200).json({ data: updatedProduct, message: 'Product updated.' });
            }
            catch (error) {
                console.error('An error happened while updating product:', error);
                res.status(500).json({ data: [], message: 'Unable to update product.' });
            }
        });
    }
    static createProductReview(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const product = yield Product_1.ProductModel.findById(req.params.id);
                if (!product) {
                    res.status(404).json({ data: null, message: 'Not product found.' });
                    return;
                }
                const alreadyReviewed = (_b = product.reviews) === null || _b === void 0 ? void 0 : _b.find((review) => review.user.toString() === req.user._id.toString());
                if (alreadyReviewed) {
                    res.status(400).json({ data: null, message: 'Product already reviewed.' });
                    return;
                }
                const review = {
                    name: req.user.name,
                    rating: Number(req.body.rating),
                    comment: req.body.comment,
                    user: req.user._id,
                };
                if (!product.reviews) {
                    product.reviews = [review];
                }
                else {
                    product.reviews.push(review);
                }
                product.numReviews = product.reviews.length;
                product.rating =
                    product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.numReviews;
                const updatedProduct = yield product.save();
                res.status(201).json({ data: updatedProduct, message: 'Review created.' });
            }
            catch (error) {
                console.error('An error happened while creating product review:', error);
                res.status(500).json({ data: [], message: 'Unable to create product review.' });
            }
        });
    }
    static getTopProducts(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield Product_1.ProductModel.find({}).sort({ rating: -1 }).limit(3);
                if (products) {
                    res.json({ data: products, message: 'Top rated products.' });
                }
                else {
                    res.status(404).json({ data: null, message: 'Product not found.' });
                }
            }
            catch (error) {
                console.error('An error happened while retrieving a product by id:', error);
                res.status(500).json({ data: null, message: 'Unable to find product.' });
            }
        });
    }
}
exports.ProductController = ProductController;
