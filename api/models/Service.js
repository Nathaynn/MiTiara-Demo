const mongoose = require('mongoose');

// A venue keep track of capacity and amenities
const venueSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        required: true
    },
    amenities: {
        type : [String],
        required: true
    }
});

// Catering servives require a capacity and menu
const cateringSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        required: true
    },
    menu: {
        type: [String],
        required: true
    }
});

// Entertainment services require a speciality
const entertainmentSchema = new mongoose.Schema ({
    specialty:{
        type: [String],
        required: true
    } 
});

// Decoration services require a speciality
const decorationSchema = new mongoose.Schema({
    speciality: {
        type: String,
        required: true
    }
});

// Photography services require a speciality and type of photography they do (video/photo)
const photographySchema = new mongoose.Schema({
    specialty:{
        type: String,
        required: true
    },
    typeOfPhoto: {
        type: [String],
        required: true
    }
});

const premium = new mongoose.Schema({
    upCharge: {
        type: Number,
        required: false
    },
    premDescription: {
        type: String,
        required: true
    },
    premName: {
        type: String,
        required: true
    },
});

const baseServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: True
    },
    serviceType: {
        type: String,
        required: True,
        validate: ser => function(ser) {
            const validCategories = ["venue", "catering", "entertainment", "decoration", "photography"];
            return validCategories.indexOf(ser) !== -1;
        }
    },
    serVendor: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    serPrice: {
        type: Number,
        required: true
    },
    serByHour: {
        type: Boolean,
        required: true
    },
    serPremium: {
        type: [premium],
    },
    serDescription: {
        type: String,
    }
});

module.exports = mongoose.model('Base', baseServiceSchema);
module.exports = Base.discriminator('VenueService', venueSchema);
module.exports = Base.discriminator('CateringService', cateringSchema);
module.exports = Base.discriminator('EntertainmentService', entertainmentSchema);
module.exports = Base.decorationSchema ('DecorationService', decorationSchema);
module.exports = Base.discriminator('PhotographyService', photographySchema);