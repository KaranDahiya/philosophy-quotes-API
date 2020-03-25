const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
    source: {
        type: String,
        require: true
    },
    philosophy: {
        type: String,
        require: true
    },
    quote: {
        type: String,
        require: true
    },
    __v: {
        type: Number, 
        select: false
    },
    _id: {
        type: Number, 
        select: false
    }
});

module.exports = mongoose.model('Quote', QuoteSchema);