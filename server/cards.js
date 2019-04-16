const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const cardSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Card = mongoose.model('cards', cardSchema);

// get all cards
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let cards = await Card.find();
        return res.send(cards);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});

module.exports = {
    model: Card,
    routes: router,
}