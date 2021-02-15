const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const hash = require('object-hash');
const router = express.Router();

const { memeDetail } = require('../models/memeDetail');
const ObjectId = require('mongodb').ObjectID;
const logger = require('./../config/logger');

mongoose.set('useFindAndModify', false);


router.get('/',(req,res) => {
    memeDetail.find((err,docs) => {
        if(!err){
            // Reversed the response array to keep the recent uploaded meme on top
            res.send(docs);
            logger.info("GET Request successfully done");
        }
        else{
            logger.error("Error in retrieving data from DB");
        }
    }).limit(100).sort({$natural:-1});
    // Limiting the range to top recent 100 memes
});


router.post('/',async (req,res) => {
    if(!req.body.name || !req.body.caption || !req.body.memeURL){
        res.status('400').json({
            message: 'All parameters should be mentioned'
        })
        return;
    }
    let duplicateMeme = await memeDetail.findOne({name: req.body.name, caption : req.body.caption, url : req.body.url})
    if(duplicateMeme){
        res.status(201).json({
            "message": 'Duplicate document/meme already present'
        })
        return;
    }
    
    let meme = await memeDetail.create({
        name: req.body.name,
        caption : req.body.caption,
        memeURL : req.body.memeURL
    })
    res.status(201).json({
        id : meme.id
    });
  
});


router.patch('/:id',async(req,res,next) => {
    var updatedObject = req.body; 
    var id = req.params.id;
    try{
        const responseMeme = await memeDetail.findByIdAndUpdate({_id  : ObjectId(id)},{ $set : updatedObject },{ new : true});
        if(!responseMeme){
            throw createError(404, 'Meme does not exist');
        }
        res.send(responseMeme);
        logger.info("PATCH Request successfully done");
    }
    catch(error){
        logger.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(404, 'Invalid Meme Id'));
            return;
        }

        next(error);
    }

});


router.delete('/:id',async(req,res,next) => {
    try{
        const responseMeme = await memeDetail.findByIdAndRemove(req.params.id);
        if(!responseMeme){
            throw createError(404, 'Meme does not exist');
        }
        res.send(responseMeme);
        logger.info("DELETE Request successfully done");
    }
    catch(error){
        logger.error(error.message);
        if (error instanceof mongoose.CastError) {
            logger.error('Error in making DELETE Request: ' + JSON.stringify(error,undefined,2));
            next(createError(404, 'Invalid Meme Id'));
            return;
        }
        next(error);
    }
});

module.exports = router;