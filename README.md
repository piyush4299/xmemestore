# XMEMESTORE  
This is the REST API build using Nodejs tech stack through which one can make POST,GET,PATCH,DELETE requests.     

### Table of Contents

* [What is this?](#what-is-this)
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#installation)
* [Run Application and start development Server](#run-application-and-start-development-server)
* [Hosting](#Hosting)

---

## What is this?
This is the REST API of my XMEMESTORE application through which users can upload meme and also watch the memes posted by others.There are some other features which are mentioned in below [Features](#features) section. Use POSTMAN for better experience.

## Features
Containing:
- Users can insert/post a meme(comprised of name,caption,memeURL(image URL)) through this application.
- Users can view all memes posted by other users also through this application.
- It also contain the feature to EDIT/DELETE the meme if user wants to.
- Another important feature is that users can view only top recent posted 100 memes but not all of them.
- The posts with similar payload(name,caption,memeURL i.e all shouldn't be same as previous) will not be displayed nor being added to database.

## Requirements
You need [node.js](http://nodejs.org) with [npm](http://npmjs.com) on your machine.
For some automatically npm builds you will even need a version of [python](http://www.python.org) installed, but this is not necessary to run the app itself.

## Installation
This app will install all required dependencies automatically. 
Just start the commands below in the root folder where you stored the package.
```SH
$ npm install
```

## Run Application and start development Server
To run this app in your browser just start everything whit the comment below in the applications root folder.
It will update everything an start a simple web server on ``http://localhost:8081/``
```SH
$ nodemon index.js
```

## Hosting
The API is being hosted on given url.
[Click here](https://xmemestore.herokuapp.com/)
