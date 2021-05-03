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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderController = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination(_, __, cb) {
        cb(null, 'uploads/');
    },
    filename(_, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = multer_1.default({
    storage,
    fileFilter: function (_, file, cb) {
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        }
        else {
            cb(new Error('Only images supported.'));
        }
    },
});
class FileUploaderController {
    static singleUploadMiddleware() {
        return upload.single('image');
    }
    static successfulUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
            res.status(201).send({
                data: `${req.protocol}://${req.get('host')}${req.originalUrl}/${req.file.path}`.replace('upload/uploads', 'images'),
                message: 'Image Uploaded.',
            });
        });
    }
}
exports.FileUploaderController = FileUploaderController;
