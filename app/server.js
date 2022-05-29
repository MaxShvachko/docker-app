const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture', function (req, res) {
  const img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpeg"));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// use when starting application locally
const mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
const mongoUrlDocker = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const databaseName = "user-account";

app.post('/update-profile', function (req, res) {
  const userObj = req.body;

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    const db = client.db(databaseName);
    userObj['userid'] = 1;

    const myQuery = { userid: 1 };
    const newValues = { $set: userObj };

    db.collection("users").updateOne(myQuery, newValues, { upsert: true }, function (err, res) {
      if (err) throw err;
      client.close();
    });

  });

  res.send(userObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    const db = client.db(databaseName);

    const myQuery = { userid: 1 };

    db.collection("users").findOne(myQuery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
