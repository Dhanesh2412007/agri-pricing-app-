// server/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, // e.g., 'Tomato'
    variety: { type: String }, // e.g., 'Heirloom', 'Roma'
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, enum: ['kg', 'dozen', 'bunch', 'piece'], required: true },
    availableQuantity: { type: Number, required: true, min: 0 },
    harvestDate: { type: Date, required: true }, // Freshness tracking
    location: { type: String, required: true }, // Farm/Market location
    partnerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
