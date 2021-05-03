"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlNotFound = void 0;
const urlNotFound = (req, res, next) => {
    const error = new Error(`URL not found: ${req.originalUrl}`);
    res.status(404).json({ message: 'URL not found.' });
    next(error);
};
exports.urlNotFound = urlNotFound;
