"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = exports.LineItemDto = exports.CurrencyDto = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const index_1 = require("../../../../config/index");
console.log('this is config', index_1.config);
class CurrencyDto {
}
exports.CurrencyDto = CurrencyDto;
class LineItemDto {
}
exports.LineItemDto = LineItemDto;
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
async function createSimpleCart(dto) {
    const url = `${index_1.config.bigCommUrl}/stores/${index_1.config.store_hash}/v3/carts`;
    console.log('url', url);
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': index_1.config.apiToken,
        },
        body: JSON.stringify(dto),
    };
    try {
        const response = await (0, node_fetch_1.default)(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        console.log('Cart created successfully:', JSON.stringify(json));
        return json;
    }
    catch (err) {
        console.error('Error creating cart:', err);
    }
}
const sampleCartDto = {
    customer_id: 69006,
    line_items: [
        {
            quantity: 2,
            product_id: 126,
            list_price: 200,
            name: 'calendar',
        },
    ],
    channel_id: 1,
    currency: {
        code: 'USD',
    },
    locale: 'en-US',
};
(async () => {
    await createSimpleCart(sampleCartDto);
})();
