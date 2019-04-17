const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/matchinggame', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const cards = require("./cards.js");
app.use("/api/cards", cards.routes);

const games = require("./games.js");
app.use("/api/games", games.routes);

app.listen(3012, () => console.log('Server listening on port 3012!'));