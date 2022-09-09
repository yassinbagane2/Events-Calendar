const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    Date:{
        type: String,
        required: true
    },
    Start: {
        type: Number,
        required: true
    },
    End: {
        type: Number,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Event', eventSchema);