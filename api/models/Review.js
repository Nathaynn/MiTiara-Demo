const mongoose = require('mongoose');

// Review schema that contains a subject, rating, related user, comment, and date
const reviewSchema = new mongoose.Schema({
    reviewSubject: {
        type: String,
        required: true
    },
    reviewRating: {
        type: Number,
        required: true,
        validate: (stars) => stars <= 5 && stars >= 0
    },
    reviewUser: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reviewComment: {
        type: String,
        required: true
    },
    reviewDate:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);