"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigRouter = void 0;
const express_1 = __importDefault(require("express"));
const Config_1 = require("@app-controllers/Config");
const ConfigRouter = express_1.default.Router();
exports.ConfigRouter = ConfigRouter;
ConfigRouter.route('/paypal').get(Config_1.ConfigController.getPaypalClientId);
