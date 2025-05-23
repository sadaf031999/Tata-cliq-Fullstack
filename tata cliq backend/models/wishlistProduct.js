const mongoose = require('mongoose');

const addToWishlistSchema = new mongoose.Schema({
   productId: {
        ref: 'product',
        type: String,
   },
   quantity: Number,
   userId: String,
}, {
    timestamps: true
});

// Prevent OverwriteModelError
const AddToWishlist = mongoose.models.addToWishlist || mongoose.model('addToWishlist', addToWishlistSchema);

module.exports = AddToWishlist;
