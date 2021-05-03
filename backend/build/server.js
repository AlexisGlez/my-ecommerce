"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Config_1 = require("@app-config/Config");
const Product_1 = require("@app-routes/Product");
const User_1 = require("@app-routes/User");
const Order_1 = require("@app-routes/Order");
const Config_2 = require("@app-routes/Config");
const FileUploader_1 = require("@app-routes/FileUploader");
const urlNotFound_1 = require("@app-middlewares/urlNotFound");
Config_1.Config.Database.connectDB();
const app = express_1.default();
if (Config_1.Config.Constants.isDev) {
    app.use(morgan_1.default('dev'));
}
app.use(cors_1.default({ origin: Config_1.Config.Constants.allowedOrigins, optionsSuccessStatus: 200 }));
app.use(express_1.default.json());
app.use('/api/products', Product_1.ProductRouter);
app.use('/api/users', User_1.UserRouter);
app.use('/api/orders', Order_1.OrderRouter);
app.use('/api/config', Config_2.ConfigRouter);
app.use('/api/upload', FileUploader_1.FileUploaderRouter);
app.use('/api/images', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(urlNotFound_1.urlNotFound);
app.listen(Config_1.Config.Constants.port, () => {
    console.log(`Server is running in ${Config_1.Config.Constants.isDev ? 'dev' : 'prod'} mode at http://localhost:${Config_1.Config.Constants.port}`);
});
