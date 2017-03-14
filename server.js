const express = require('express'),
      multer = require('multer'),
      path = require('path');

      //setup the storage and upload values, according to multer
      var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, file.fieldname + '-' + Date.now());
        }
      });
      var upload = multer({ storage : storage}).single('pic');



var app = express();

const port = process.env.PORT || 3000;

//send homepage
app.get('/', function(req, res){
  res.sendFile('./index.html', {root: __dirname});
});

app.post('/pic', function(req, res){
  //upload pic
  upload(req, res, function(err){
    if(err){
      //log error
      console.log(err);
    }
    //preper answer and sent it
    var resObj = {
      size: req.file.size
    }
    res.send(resObj)
  });
});

app.listen(port);
