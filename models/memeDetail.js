const mongoose = require('mongoose');

var memeDetail = mongoose.model('memeDetail',{
    name: { type : String},
    caption: { type: String},
    memeURL: { type: String },
});

module.exports = { memeDetail };