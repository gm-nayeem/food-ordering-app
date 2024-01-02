import { model, models, Schema } from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
// });

const OrderSchema = new Schema({
    cartProducts: {
        type: Object
    },
    userEmail: {
        type: String
    },
    phone: {
        type: String
    },
    streetAddress: {
        type: String
    },
    postalCode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Order = models?.Order || model('Order', OrderSchema);

export default Order;