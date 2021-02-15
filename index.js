const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./connectDB.js');
const path = require('path');

var memeController = require('./controllers/memeController.js');
var logger = require('./config/logger');

var app = express(); 
const PORT = process.env.PORT || 8081;

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/memes',memeController);

app.use((req, res, next) => {
    next(createError(404, 'Check URL to visit'));
  });
  
//Error handler
app.use((err, req, res, next) => {
res.status(err.status || 500);
res.send({
    error: {
    status: err.status || 500,
    message: err.message
    }
});
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT,() => logger.info("Backend Serve is ready to listen"));

