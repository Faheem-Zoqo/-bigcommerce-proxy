"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = exports.GiftCertificateDto = exports.GiftCertificateRecipientDto = exports.GiftCertificateSenderDto = exports.CustomItemDto = exports.GiftWrapDetailDto = exports.CurrencyDto = void 0;
exports.formatDataToCreateOrderDto = formatDataToCreateOrderDto;
exports.createCustomiseCart = createCustomiseCart;
const node_fetch_1 = __importDefault(require("node-fetch"));
const index_1 = require("../../../../config/index");
console.log('thsi is config', index_1.config);
let image_url = '';
class CurrencyDto {
}
exports.CurrencyDto = CurrencyDto;
class GiftWrapDetailDto {
}
exports.GiftWrapDetailDto = GiftWrapDetailDto;
class CustomItemDto {
}
exports.CustomItemDto = CustomItemDto;
class GiftCertificateSenderDto {
}
exports.GiftCertificateSenderDto = GiftCertificateSenderDto;
class GiftCertificateRecipientDto {
}
exports.GiftCertificateRecipientDto = GiftCertificateRecipientDto;
class GiftCertificateDto {
}
exports.GiftCertificateDto = GiftCertificateDto;
class CreateOrderDto {
    constructor() {
        this.line_items = [];
    }
}
exports.CreateOrderDto = CreateOrderDto;
function formatDataToCreateOrderDto(input) {
    image_url = input.designImage.url;
    console.log('this is image url', image_url);
    const customItems = [
        {
            sku: `${input.customizerProductId}`,
            name: input.productName,
            quantity: 1,
            list_price: input.price,
            product_id: input.productId, // Assign the productId here
            summary: input.summary?.map((item) => ({
                key: item.key,
                value: item.value,
            })),
        },
    ];
    const giftCertificates = [];
    const currency = {
        code: 'USD',
    };
    const orderDto = {
        customer_id: 69006,
        line_items: [],
        custom_items: customItems,
        gift_certificates: giftCertificates,
        channel_id: 1,
        currency: currency,
        locale: 'en-US',
    };
    return orderDto;
}
async function createCustomiseCart(dto) {
    const url = `${index_1.config.bigCommUrl}/stores/${index_1.config.store_hash}/v3/carts`;
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
            const errorBody = await response.json();
            console.error('BigCommerce API error:', errorBody);
            throw {
                status: response.status,
                message: errorBody.title ||
                    errorBody.message ||
                    'An error occurred while creating the cart',
                details: errorBody,
            };
        }
        const data = await response.json();
        // Check if custom_items exist and update the image_url
        // if (
        //   data?.data?.line_items?.custom_items &&
        //   data.data.line_items.custom_items.length > 0
        // ) {
        //   data.data.line_items.custom_items = data.data.line_items.custom_items.map(
        //     (item: any) => ({
        //       ...item,
        //       image_url: image_url,
        //     })
        //   );
        // }
        console.dir(data, { depth: 'Infinite' });
        return data;
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            console.error('Response parsing error:', error);
            throw { status: 500, message: 'Internal server error', details: error };
        }
        console.error('Network or unknown error:', error);
        throw error.status
            ? error
            : { status: 500, message: 'Unexpected error occurred', details: error };
    }
}
// Sample input object
const input = {
    type: 'customization',
    parentDesign: null,
    productName: 'Varsity Jackets',
    productId: '669a321ba21c8c425b3103d9',
    customizerProductId: '669a321ba21c8c425b3103d7',
    summary: [
        { key: 'Base Color', value: 'White' },
        { key: 'Sleeves Color', value: 'Grey' },
        { key: 'Stretch Band Color', value: 'Grey' },
        { key: 'Stretch Band Design', value: 'Simple' },
        { key: 'Pocket colors', value: 'Burgundy' },
        { key: 'Inside Color', value: 'Grey' },
        { key: 'Button Color', value: 'Burgundy' },
        { key: 'Back Design', value: 'Name and Number' },
        { key: 'Add Your Name', value: 'Irfan' },
        { key: 'Add a Number', value: '02' },
        { key: 'Delivery', value: 'Express Shipping' },
    ],
    designImage: {
        size: 50933,
        originalFilename: 'designThumbnail.png',
        mimetype: 'image/png',
        _id: '66eeb5807f5fca7b4da6349f',
        date: '2024-09-21T12:01:04.463Z',
        filename: '66eeb5807f5fca7b4da6349f.png',
        url: 'https://cdnv2.mycustomizer.com/teammotorcycle2/66eeb5807f5fca7b4da6349f.png',
        id: '66eeb5807f5fca7b4da6349f',
    },
    store: '669a199d915f7c13c3b0d249',
    price: 210,
    _id: '66eeb5807f5fca7b4da634a8',
    configuration: {
        'QUESTION-0koweg': 'ANSWER-0koc1k',
    },
    personalisations: {
        'ANSWER-7gxq0e': {
            id: 'ANSWER-7gxq0e',
            name: 'I',
            type: 'text',
            value: 'Irfan',
            views: [{ type: 'text', text: 'Irfan' }],
            isPersonalisation: true,
        },
    },
    productionData: [],
    designImages: [],
    prints: {},
    printFilesRequestStatus: 'not-initiated',
    printFiles: [],
    basePrice: 200,
    basePriceContainsHiddenExtraPrices: false,
    pricing: {
        'QUESTION-0koweg': 10,
    },
    customExtraPrices: [],
    createdAt: '2024-09-21T12:01:04.636Z',
    updatedAt: '2024-09-21T12:01:04.636Z',
    designId: 68,
    id: '66eeb5807f5fca7b4da634a8',
    wrapDetails: [],
};
// (async () => {
//   const formatedInput = formatDataToCreateOrderDto(input);
//   console.dir(formatedInput, { depth: Infinity });
//   // Uncomment the following line to actually create the cart
//   await createCustomiseCart(formatedInput);
// })();
