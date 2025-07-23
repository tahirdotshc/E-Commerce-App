import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    orderId : {
        type : String,
        required : [true, "Provide orderId"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    product_details : {
        name : String,
        image : Array,
    },
    paymentId: {
        type : String,
        default : ""
    },
    payment_status:{
        type : String,
        default : ""
    },
    delivery_address : {
        type:mongoose.Schema.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : ""
    },
    totalAmt : {
        type : Number,
        default : ""
    },
    invoice_receipt :
    {
        type : String,
        default : ""
    },
},
{
    timestamps : true
}
)

const OrderModel = mongoose.model('order', OrderSchema)

export default OrderModel;