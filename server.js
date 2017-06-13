"use strict";
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var router = express.Router();
var methodOverride = require('method-override');
var gulp = require('gulp');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('ftp');
var creds = require('./ftp-options.js');
var im = require('imagemagick');
var gm = require('gm').subClass({imageMagick: true});

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname + '/dist/assets/images')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
});
var upload = multer({ 
  storage: storage
});

//Express Setup
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(methodOverride());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-type, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);
    next();
};

app.use(allowCrossDomain);


// Socket.io Setup
io.on('connection', function(socket){
  socket.emit('connected', 'Connected');
  socket.on('addAppeal', function(data){
    socket.broadcast.emit('addAppeal', data);
  });
  socket.on('removeAppeal', function(data){
    socket.broadcast.emit('removeAppeal', data);
  });
  socket.on('updateAppeal', function(data){
    socket.broadcast.emit('updateAppeal', data);
  })
  socket.on('disconnect', function(){
  });
});
http.listen(5001, () => {
  console.log('started on port 5001');
});

// Mongoose Connection
mongoose.connect('mongodb://127.0.0.1:27018');
var db = mongoose.connection;
var Campaign = require('./src/app/schemas/campaign');
var Appeal = require('./src/app/schemas/appeal');
var Group = require('./src/app/schemas/group');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to MongoDB');
  restify.serve(router, Campaign);
  restify.serve(router, Appeal);

  app.use(router);
/*
  // REST API for mongoose
  // Campaigns
  app.get('/api/campaigns', function(req, res){
    Campaign.find({}, function(err, docs){
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  });
  app.get('/api/campaigns/:id', function(req, res){
    Campaign.find({ _id: req.params.id }, function(err, docs){
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  });
  app.post('/api/campaigns', function(req, res){
    var obj = new Campaign(req.body);
    obj.save(function(err, obj){
      if (err){
        return console.error(err);
      }
      res.status(200).json(obj);
    });
  });
  app.delete('/api/campaigns/:id', function(req, res){
    Campaign.find({ _id: req.params.id }).remove().exec();
    res.status(200).send(req.params.id + ' deleted');
  });
  // Appeals
  app.get('/api/appeals', function(req, res){
    Appeal.find({}, function(err, docs){
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  });
  app.post('/api/appeals', function(req, res){
    var obj = new Appeal(req.body);
    obj.save(function(err, obj){
      if (err){
        return console.error(err);
      }
      res.status(200).json(obj);
    });
  });
  app.delete('/api/appeals/:id', function(req, res){
    Appeal.find({ _id: req.params.id }).remove().exec();
    res.status(200).send(req.params.id + ' deleted');
  });
  */
  // All other routes
  app.use('/lib', express.static(__dirname + '/src/lib'));
  app.all('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-type, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  app.post('/image-upload', upload.single('image'), function(req, res){
    var image = req.file;
    var name = req.body.name;
    res.send('Image uploaded!');
  });

  app.post('/crop-image', function(req, res){
    //let polaroid = `http://${window.location.hostname}:3000/assets/images/polaroid-template.jpg`;
    var imageChanges = req.body;
    let originalFile = __dirname + '\\dist\\assets\\images\\' + imageChanges.fileName;
    let editedFile = __dirname + '\\dist\\assets\\images\\final-' + imageChanges.fileName;
    let polaroid = __dirname + '\\dist\\assets\\images\\polaroid-template.png';
    let playButton = __dirname + '\\dist\\assets\\images\\play.png';
    let audioButton = __dirname + '\\dist\\assets\\images\\audio.png';
    let placement = {x: undefined, y: undefined, g: undefined};
    //let cropString = `${imageChanges.crop.width}x${imageChanges.crop.height}+${imageChanges.crop.x}+${imageChanges.crop.y}`;
    // im convert takes an array of parameters and a callback function as arguments
    // the array is [file you are editing, the function, that functions arguments, the outputfile]
    if (imageChanges.imageMeta.creditPlacement === 'tl'){
      placement.x = 10;
      placement.y = 10;
      placement.g = 'NorthWest';
    }
    else if (imageChanges.imageMeta.creditPlacement === 'tr'){
      placement.x = 10;
      placement.y = 10;
      placement.g = 'NorthEast';
    }
    else if (imageChanges.imageMeta.creditPlacement === 'bl'){
      placement.x = 10;
      placement.y = 10;
      placement.g = 'SouthWest';
    }
    else if (imageChanges.imageMeta.creditPlacement === 'br'){
      placement.x = 10;
      placement.y = 10;
      placement.g = 'SouthEast';
    }
    else {
      placement.x = 10;
      placement.y = 10;
      placement.g = 'NorthWest';
    }

    gm(originalFile)
    .crop(imageChanges.crop.width, imageChanges.crop.height, imageChanges.crop.x, imageChanges.crop.y)
    .resize(imageChanges.width, imageChanges.height)
    .write(editedFile, (err) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else {
        gm(editedFile)
        .fontSize(10)
        .fill(imageChanges.imageMeta.creditColor)
        .drawText(placement.x, placement.y, imageChanges.imageMeta.credit, placement.g)
        .write(editedFile, (err2) => {
          if(err2){
            console.log(err2);
            res.send(err2);
          }
          else {
            if(imageChanges.imageMeta.button === 'play'){
              drawPlayButton(editedFile);
            }
            else if(imageChanges.imageMeta.button === 'audio'){
              drawAudioButton(editedFile);
            }
            else {
              if(imageChanges.imageMeta.treatment === 'polaroid'){
                drawPolaroid(editedFile);
              }
              else {
                writeFile(imageChanges.fileName);
              }
            }
          }
        });
      }
    });

    function drawPlayButton(fileName){
      return gm(fileName)
        .composite(playButton)
        .gravity('Center')
        .write(editedFile, (err) => {
          if (err){
            console.log(err);
          }
          if (imageChanges.imageMeta.treatment === 'polaroid'){
            drawPolaroid(editedFile);
          }
          else {
            writeFile(imageChanges.fileName);
          }
        });
    }

    function drawAudioButton(fileName){
      gm(fileName)
        .composite(audioButton)
        .gravity('Center')
        .write(editedFile, (err) => {
          if (err){
            console.log(err);
          }
          if (imageChanges.imageMeta.treatment === 'polaroid'){
            drawPolaroid(editedFile);
          }
          else {
            writeFile(imageChanges.fileName);
          }
        });
    }

    function drawPolaroid(fileName){
      gm(polaroid)
        .composite(editedFile)
        .geometry('+12+9')
        .write(editedFile, (err) => {
          if (err){
            console.log(err);
          }
          else {
            gm(editedFile)
              .font('fonts/ArchitectsDaughter.ttf')
              .fontSize(imageChanges.imageMeta.captionSize)
              .drawText(0, 117, imageChanges.imageMeta.caption, 'Center')
              .write(editedFile, (err2) => {
                if (err2){
                  console.log(err2);
                }
                else{
                  writeFile(imageChanges.fileName);
                }
              });          
          }
      });    
    }

    function writeFile(fileName){
      var c = new Client();
      c.on('ready', function(){
        c.put(`dist/assets/images/final-${fileName}`, `digital.ifcj.org/appeal-images/final-${fileName}`, function(err){
          if (err){
            res.send(err);
            console.log(err);
          }
          c.end();
        });
      });
      c.connect(creds.options);
      c.on('close', function(){
        res.send('final-' + fileName);
      });    
    }

    /*
    im.convert([file, '-crop', cropString, file], function(err, stdout){
      if (err) throw err;
      console.log('crop successful');
    });
    */
    //let textString = `-fill ${imageChanges.creditColor} -font Arial -pointsize 10 label:${imageChanges.credit}`;
    //im.convert(['temp.jpg', '-font', textString,'temp.jpg']);
  });
    /*
    fs.writeFile(`dist/assets/images/${req.body.name}.jpg`, image, 'binary', function(err){
      if (err){
        res.send(err);
      }
      else {
        var c = new Client();
        c.on('ready', function(){
          c.put(`dist/assets/images/${req.body.name}.jpg`, `digital.ifcj.org/appeal-images/${req.body.name}.jpg`, function(err){
            if (err) throw err;
            c.end();
            res.send('finished');            
          });
        });
        c.connect(creds.options);
      }
    })
    */
    /*
    var base64Data = req.body.data.replace(/^data:image\/jpeg;base64,/, "");
    console.log(base64Data);
    fs.writeFile(`dist/assets/images/${req.body.id}.jpg`, base64Data, 'base64', function(err){
      if (err){
        res.send(err);
      }
      else {
        
        var c = new Client();
        c.on('ready', function(){
          c.put(`dist/assets/images/${req.body.id}.jpg`, `digital.ifcj.org/appeal-images/${req.body.id}.jpg`, function(err){
            if(err) throw err;
            c.end();
            res.send('finished');
            fs.unlink(`dist/assets/images/${req.body.id}.jpg`, (err) => {
              if(err) throw err;
              console.log(`deleted image ${req.body.id}.jpg`);
            });
          });
        });
        c.connect(creds.options);
      }
    });
    */
  
  app.use('/assets', express.static('dist/assets'));
  //app.get('/images/*', express.static(__dirname + '/dist/images'));

  app.all('/inline.bundle.js', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/inline.bundle.js');
  });
   app.all('/styles.bundle.js', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/styles.bundle.js');
  });
  app.all('/vendor.bundle.js', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/vendor.bundle.js');
  });
  app.all('/main.bundle.js', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/main.bundle.js');
  });
  app.all('/inline.map', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/inline.map');
  });
  app.all('/main.map', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/main.map');
  });

  app.all('*', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/index.html');
  });

  /* Original router catchall
  app.get('/*', express.static(__dirname + '/dist'));
  app.get('/', function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
  */

  // Set listen port
  app.listen(3001, function(){
    console.log('Listening on port 3001');
  });
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })
});

module.exports = app;
