"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    bigCommUrl: process.env.BIGCOM_URL
        ? process.env.BIGCOM_URL
        : 'https://api.bigcommerce.com',
    apiToken: process.env.API_TOKEN ? process.env.API_TOKEN : '',
    store_hash: process.env.STORE_HASH ? process.env.STORE_HASH : '',
};
