
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// using the populate method.
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  email: {type: String, default: ''},
  games: [{id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}}],
  stats: {
    averageScore: {type: Number},
    averageStrikes: {type: Number},
    averageSpares: {type: Number},
    averageOpenFrames: {type: Number},
    maxScore: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      score: {type: Number}
    },
    minScore: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      score: {type: Number}
    },
    maxStrikes: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      strikes: {type: Number}
    },
    minStrikes: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      strikes: {type: Number}
    },
    maxSpares: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      spares: {type: Number}
    },
    minSpares: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      spares: {type: Number}
    },
    maxOpenFrames: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      openFrames: {type: Number}
    },
    minOpenFrames: {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
      openFrames: {type: Number}
    }
  },
  gameCount: {type: Number}
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    email: this.email || '',
    games: this.games,
    stats: this.stats,
    gameCount: this.gameCount
  };
};

// Use the populate method
// method for processing user stats?
UserSchema.methods.getStats = function() {
  return {
    id: this._id,
    games: this.games,
    stats: this.stats
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
