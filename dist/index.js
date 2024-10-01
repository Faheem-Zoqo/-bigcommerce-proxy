"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const errorHandler_1 = require("./middleware/errorHandler");
const router_1 = __importDefault(require("./entities/router"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'api is working...' });
});
app.use('/api/v1', router_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`app is up on port ${PORT}`);
});
