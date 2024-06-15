const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    _id: {
        type: Number
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
