const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");
const User = users.model;

const gameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    name: String,
    turns: Number,
    duration: Number,
    created: {
        type: Date,
        default: Date.now
    },
});

const Game = mongoose.model('games', gameSchema);

// get all user's games
router.get("/:id", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let cards = await Game.find();
        return res.send(cards);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});

// upload single game
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    const game = new Game({
        user: req.user,
        name: req.user.name,
        turns: req.body.turns,
        duration: req.body.duration,
    });

    try {
        let games = await game.save();
        res.send(games);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    model: Game,
    routes: router,
}