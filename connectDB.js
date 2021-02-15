const mongoose = require('mongoose');
const logger = require('./config/logger');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@memestore.ckqd0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(!err){
        logger.info("MongoDB connection successful !!!");
    }
    else{
        logger.info("MongoDB connection failed: " + JSON.stringify(err,undefined,2));
    }
});

module.exports = mongoose;