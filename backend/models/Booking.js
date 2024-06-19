const mongoose = require("mongoose");

/* Booking schema that contains a vendorUser (User ID), customerUser (User ID),
    related service (Service ID), date of booking, and creation date */

const bookingSchema = new mongoose.Schema({
    vendorUser: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    customerUser: {
        type: mongoose.Types.ObjectId,
    },
    bookingService: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingCreation: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);