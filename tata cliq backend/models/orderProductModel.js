const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productDetails : {
        type : Array,
        default : []
    },
    email : {
        type : String,
        default : ""
    },
    userId : {
        type : String,
        default : ""
    },
    paymentDetails : {
        paymentId : {
            type : String,
            default : ""
        },
        payment_method_type : [],
        payment_status : {
            type : String,
            default : ""
        }
    },
    shipping_options : [],
    shippingAddress: {
        name: { type: String, default: "" },
        addressLine1: { type: String, default: "" },
        addressLine2: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        postalCode: { type: String, default: "" },
        country: { type: String, default: "" },
        phone: { type: String, default: "" }
    },
    totalAmount : {
        type : Number,
        default : 0
    },
    // Add this block for order status
    status: {
        type: String,
        enum: ["ordered", "processing", "dispatched", "delivered"], // allowed values
        default: "ordered"
    }
},{
    timestamps : true
})

const orderModel = mongoose.model('order',orderSchema)

module.exports = orderModel
