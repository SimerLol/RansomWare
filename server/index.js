// Import
const express = require('express');
const app = express();
const fs = require('fs')


app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/post', (req, res) => {
  id = Date.now().toString()
  db = require(__dirname + '/' + req.body.user + '.json')
  dbpath = __dirname + '/' + req.body.user + '.json'
  yo = {
    id: id,
    secret: req.body.secret
  }
  temp = '{"key":[],"files":[],"decrypt":[]}'
  fs.writeFile(dbpath, temp, function(e) {
    if (e) {
      console.log(e.message);
    } else {
      console.log('text.txt updated');
    }
  });
  db.key.push(yo)
  console.log(yo)
  fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));
  res.send("Key has been uploaded!")
})

app.post('/confirm', (req, res) => {
  db = require(__dirname + '/' + req.body.user + '.json')
  dbpath = __dirname + '/' + req.body.user + '.json'
  id = Date.now().toString()
  yo = {
    id: id,
    file: req.body.file
  }
  db.files.push(yo)
  console.log(yo)
  fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));
  res.send("File data uploaded!")
})

app.post('/decrypt', (req, res) => {
  db = require(__dirname + '/' + req.body.user + '.json')
  dbpath = __dirname + '/' + req.body.user + '.json'
  id = Date.now().toString()
  yo = {
    id: id,
    file: req.body.file
  }
  db.decrypt.push(yo)
  console.log(yo)
  fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));
  res.send("Decryption data uploaded! Thanks for doing business with us!")
})


// Server Startup Config
var server = app.listen(8080, function() {
  var port = server.address().port
  var family = server.address().family
  var address = server.address().address
  if (address == "::") {
    address = "this ratio mf"
  }
  console.log("Server running on Port:", port, "| Family:", family, "| Address", address)
});