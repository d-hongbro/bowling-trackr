const mongoose = require('mongoose');
const {User} = require('../users/models');
mongoose.Promise = global.Promise;

// Don't need the game number because I can just count the number of games the user has created and saved.
const GameSchema = mongoose.Schema({

  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  frame1: {score1: Number, score2: Number, finalScore: Number},
  frame2: {score1: Number, score2: Number, finalScore: Number},
  frame3: {score1: Number, score2: Number, finalScore: Number},
  frame4: {score1: Number, score2: Number, finalScore: Number},
  frame5: {score1: Number, score2: Number, finalScore: Number},
  frame6: {score1: Number, score2: Number, finalScore: Number},
  frame7: {score1: Number, score2: Number, finalScore: Number},
  frame8: {score1: Number, score2: Number, finalScore: Number},
  frame9: {score1: Number, score2: Number, finalScore: Number},
  frame10: {score1: Number, score2: Number, score3: Number, finalScore: Number},
  score: Number,
  strikes: Number,
  spares: Number,
  openFrames: Number,
  created: { type: Date, default: Date.now },
});

GameSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    user: this.user,
    frame1: {score1: this.frame1.score1, score2: this.frame1.score2, finalScore: this.frame1.finalScore},
    frame2: {score1: this.frame2.score1, score2: this.frame2.score2, finalScore: this.frame2.finalScore},
    frame3: {score1: this.frame3.score1, score2: this.frame3.score2, finalScore: this.frame3.finalScore},
    frame4: {score1: this.frame4.score1, score2: this.frame4.score2, finalScore: this.frame4.finalScore},
    frame5: {score1: this.frame5.score1, score2: this.frame5.score2, finalScore: this.frame5.finalScore},
    frame6: {score1: this.frame6.score1, score2: this.frame6.score2, finalScore: this.frame6.finalScore},
    frame7: {score1: this.frame7.score1, score2: this.frame7.score2, finalScore: this.frame7.finalScore},
    frame8: {score1: this.frame8.score1, score2: this.frame8.score2, finalScore: this.frame8.finalScore},
    frame9: {score1: this.frame9.score1, score2: this.frame9.score2, finalScore: this.frame9.finalScore},
    frame10: {score1: this.frame10.score1, score2: this.frame10.score2, score3: this.frame10.score3, finalScore: this.frame10.finalScore},
    score: this.score,
    strikes: this.strikes,
    spares: this.spares,
    openFrames: this.openFrames,
  };
};

GameSchema.methods.getGameStats = function() {
  return {
    user: this.user,
    gameNumber: this.gameNumber,
    score: this.score,
    strikes: this.strikes,
    spares: this.spares,
    openFrames: this.openFrames
  };
};

const Game = mongoose.model('Game', GameSchema);

module.exports = {Game};
