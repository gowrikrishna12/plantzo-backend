const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "Credit Card", "Debit Card", "UPI"], required: true },
    date: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            productName: { type: String, required: true },
            category: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: false },
    trackingId: { type: String, required: false },
}, { timestamps: true });

// ✅ Fix: Prevent Model Overwriting
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order; // Only one export



