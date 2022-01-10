const mongoose = require('mongoose')
const {
    ObjectId
} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    fournisseur: {
        type: ObjectId,
        ref: 'Fournisseur',
        required: true
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: String
    },
    shipping: {
        type: String,
        required: false,
        
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)