const mongoose = require('mongoose');

// Helper function for validating categories
function checkCategories(check){
    const validCategories = ["venue", "catering", "entertainment", "decoration", "photography"]
    for (let i = 0; i < check.length; i++) {
        if (validCategories.indexOf(check[i]) === -1) {
            return false;
        }
    }
    return true;
}

/* Business hours of a vendor using the day as a String and using a Date object to indicate 
    times for the day of availability. */
const businessHoursSchema = new mongoose.Schema({
    businessDay:{
        type: String,
        required: true
    },
    businessHours: {
        type: Date,
        required: true
    }
});

/* Contact information for a vendor. Contains phone number, email, and hours.
    Hours uses the business hours schema to contain information*/

const contactSchema = new mongoose.Schema({
    contactPhone: {
        type: String
    }, 
    contactEmail: {
        type: String
    },
    contactHours: {
        type: [businessHoursSchema],
        required: true
    }
}); 

/* Location of a vendor. Contains the address, zip code, and city. */
const locationSchema = new mongoose.Schema({
    streetAddress:{
        type: String,
        required: true
    },
    zipCode:{
        type: Number,
        required: true
    },
    locationCity:{
        type: String,
        required: true
    }
});

/* Vendor schema keeping track of Vendors information (name, bio, contact, reviews, and locations) */
const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorUser: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    vendorBio: {
        type: String
    },
    vendorContact: {
        type: contactSchema
    },
    vendorReviews:{
        type: [mongoose.Types.ObjectId],
        required: true
    },
    vendorLocation:{
        type: locationSchema,
        required: true
    },
    vendorCategories:{
        type: [String],
        required: true,
        validate: check => checkCategories(check)
    }

});

module.exports = mongoose.model('Vendor', vendorSchema);