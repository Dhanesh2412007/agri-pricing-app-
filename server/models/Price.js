const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    variety: { type: String, default: '' },
    marketLocation: { type: String, required: true },
    date: { type: Date, default: Date.now },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    modalPrice: { type: Number, required: true },
    unit: { type: String, default: 'INR/Quintal' },
    // Link to the submitting partner
    partnerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Price', PriceSchema);
