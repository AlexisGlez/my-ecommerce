"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderRouter = void 0;
const express_1 = __importDefault(require("express"));
const FileUploader_1 = require("@app-controllers/FileUploader");
const FileUploaderRouter = express_1.default.Router();
exports.FileUploaderRouter = FileUploaderRouter;
FileUploaderRouter.route('/').post(FileUploader_1.FileUploaderController.singleUploadMiddleware(), FileUploader_1.FileUploaderController.successfulUpload);
