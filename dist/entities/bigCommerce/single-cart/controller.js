"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_cart_1 = require("./create-cart/custom-cart");
exports.default = {
    create: async (req, res) => {
        try {
            const formattedData = (0, custom_cart_1.formatDataToCreateOrderDto)(req.body);
            const cart = await (0, custom_cart_1.createCustomiseCart)(formattedData);
            res.status(201).json(cart);
        }
        catch (error) {
            const status = error.status || 500;
            res.status(status).json({
                message: error.message || 'Internal server error',
                details: error.details || null,
            });
        }
    },
};
