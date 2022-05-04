const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({


    name: {
        type: String,
        trim: true,
        //required: true,
        maxlength: 32
    },

    description: {
        type: String,
        trim: true,
        //required: true,
        maxlength: 32
    },
    price: {
        type: Number,
        trim: true,
        // required: true,
        maxlength: 32
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: null
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
        required: false,
        type: Boolean
    },
    subImages:{
        type:Array
    }


},



)
module.exports = mongoose.model("productSchema", productSchema);