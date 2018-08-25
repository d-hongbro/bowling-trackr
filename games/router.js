const express = require('express');
const bodyParser = require('body-parser');
const {Game} = require('./models');
const {User} = require('../users/models');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');


// Put method for editing an existing game record
// This needs to be tested by the game js file
router.put('/', ensureLogin.ensureLoggedIn('/login'), (req, res) => {
  // I need to make sure that the user is the author of the game before editing the game
  // That way they cannot change the records of games from other users.

  // This method will be similar to the create method
  // 1. Check author
  // 2. Check fields
  // 3. Update Records
  const id = req.session.user.id;
  const gameId = req.body.id;

  // Checking the author
  Game.findById(gameId)
    .then(game => {
      if (game.user !== id) {
        return res.status(401);
      }
    });

  // Checking the fields
  console.log(req.body);
  const requiredFields = ['frame1', 'frame2', 'frame3', 
                          'frame4', 'frame5', 'frame6', 'frame7', 'frame8', 
                          'frame9', 'frame10', 'score', 'strikes', 'spares', 'openFrames'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  console.log('pass 1');
  // check frame1-frame10
  const requiredFrameFields = ['score1', 'score2', 'finalScore', 'strike', 'spare'];
  const missingFrameField = requiredFrameFields.find((field) => {
    for (let property in req.body) {
      if (property.includes('frame')) {
        !(field in req.body[property]);
      }
    }
  });

  if (missingFrameField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingFrameField
    });
  }
  console.log('pass 2');
  // check for frame10 score3
  const requiredFrameTenFields = ['score3'];
  const missingFrameTenField = requiredFrameTenFields.find((field) => {
    for (let property in req.body) {
      if (property.includes('frame10')) {
        !(field in req.body[property]);
      }
    }
  });

  if (missingFrameTenField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingFrameTenField
    });
  }
  console.log('pass 3');
  // Then need to check if they are all numbers
  const numberFields = ['score', 'strikes', 'spares', 'openFrames'];
  const nonNumberField = numberFields.find(
    field => field in req.body && typeof req.body[field] !== 'number'
  );

  if (nonNumberField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonNumberField
    });
  }
  console.log('pass 4');
  // check if all the frames are numbers
  const numberFrameFields = ['score1', 'score2', 'finalScore', 'strike', 'spare'];
  const nonNumberFrameField = numberFrameFields.find(field => {
    for (let property in req.body) {
      if (property.includes('frame')) {
        field in req.body[property] && typeof req.body[property].field !== 'number'
      }
    }
  });

  if (nonNumberFrameField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonNumberFrameField
    });
  }

  const numberFrameTenFields = ['score3'];
  const nonNumberFrameTenField = numberFrameTenFields.find(field => {
    for (let property in req.body) {
      if (property.includes('frame10')) {
        field in req.body[property] && typeof req.body[property].field !== 'number'
      }
    }
  });

  if (nonNumberFrameTenField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonNumberFrameTenField
    });
  }

  let {frame1, frame2, frame3, frame4, frame5, 
        frame6, frame7, frame8, frame9, frame10, 
        score, strikes, spares, openFrames} = req.body;
  // Check current Game number from the user.
  // Dont need to access user to et id
  // it is in req.session already....
  console.log({score: score, strikes: strikes, spares: spares, openFrames: openFrames});
  const username = req.session.username;



  // Grab the id of the user requesting
  
  const date = new Date();
  // Find the game id
  Game.findByIdAndUpdate(
    gameId,
    {
      user: mongoose.Types.ObjectId(req.session.user.id),
      frame1,
      frame2,
      frame3,
      frame4,
      frame5,
      frame6,
      frame7,
      frame8,
      frame9,
      frame10,
      score,
      strikes,
      spares,
      openFrames,
      updated: date
    }
  )
    .then(game => {
      // This is the game that is returned if it is successful
      return res.status(200).json(game.apiRepr());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});


// Grabs all the games pertaining to the user
// Also has to take into consideration the game id look up
router.get('/', ensureLogin.ensureLoggedIn('/login'), (req, res) => {

  // Problem how this is setup is that it is going through the user game list instead of game list...
  // Need to find a way to just grab the game list from the db and match it with ID

  // 2nd implementation - Need to test
  const id = req.session.user.id;
  Game.find({user: id})
    .then(games => {
      games.sort(function(a, b) {
        return new Date(b.created) - new Date(a.created);
      });
      res.send(games);
    });


  // const id = req.session.user.id;
  // User.findById(id)
  //   .then(user => {return user.apiRepr().games})
  //   .then(userGameIds => {
  //     let gameList = [];
  //     console.log(userGameIds);
  //     let promises = userGameIds.map(function(id) {
  //       return new Promise(function(resolve, reject) {
  //         Game.find(id)
  //           .then(game => {
  //             gameList.push(game[0]);
  //             resolve();
  //           });
  //       });
  //     });
  //     Promise.all(promises)
  //       .then(function() {
  //         gameList.sort(function(a, b) {
  //           return new Date(b.created) - new Date(a.created);
  //         });
  //         res.send(gameList);
  //       })
  //       .catch(console.error);
  //   });
});

// Post to register a new game
router.post('/', ensureLogin.ensureLoggedIn('/login'), jsonParser, (req, res) => {
  console.log(req.body);
  const requiredFields = ['frame1', 'frame2', 'frame3', 
                          'frame4', 'frame5', 'frame6', 'frame7', 'frame8', 
                          'frame9', 'frame10', 'score', 'strikes', 'spares', 'openFrames'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  console.log('pass 1');
  // check frame1-frame10
  const requiredFrameFields = ['score1', 'score2', 'finalScore', 'strike', 'spare'];
  const missingFrameField = requiredFrameFields.find((field) => {
    for (let property in req.body) {
      if (property.includes('frame')) {
        !(field in req.body[property]);
      }
    }
  });

  if (missingFrameField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingFrameField
    });
  }
  console.log('pass 2');
  // check for frame10 score3
  const requiredFrameTenFields = ['score3'];
  const missingFrameTenField = requiredFrameTenFields.find((field) => {
    for (let property in req.body) {
      if (property.includes('frame10')) {
        !(field in req.body[property]);
      }
    }
  });

  if (missingFrameTenField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingFrameTenField
    });
  }
  console.log('pass 3');
  // Then need to check if they are all numbers
  const numberFields = ['score', 'strikes', 'spares', 'openFrames'];
  const nonNumberField = numberFields.find(
    field => field in req.body && typeof req.body[field] !== 'number'
  );

  if (nonNumberField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonNumberField
    });
  }
  console.log('pass 4');
  // check if all the frames are numbers
  const numberFrameFields = ['score1', 'score2', 'finalScore', 'strike', 'spare'];
  const nonNumberFrameField = numberFrameFields.find(field => {
    for (let property in req.body) {
      if (property.includes('frame')) {
        field in req.body[property] && typeof req.body[property].field !== 'number'
      }
    }
  });

  if (nonNumberFrameField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonNumberFrameField
    });
  }

  const numberFrameTenFields = ['score3'];
  const nonNumberFrameTenField = numberFrameTenFields.find(field => {
    for (let property in req.body) {
      if (property.includes('frame10')) {
        field in req.body[property] && typeof req.body[property].field !== 'number'
      }
    }
  });

  if (nonNumberFrameTenField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonNumberFrameTenField
    });
  }

  let {frame1, frame2, frame3, frame4, frame5, 
        frame6, frame7, frame8, frame9, frame10, 
        score, strikes, spares, openFrames} = req.body;
  // Check current Game number from the user.
  // Dont need to access user to et id
  // it is in req.session already....
  console.log({score: score, strikes: strikes, spares: spares, openFrames: openFrames});
  const username = req.session.username;
  Game.create({
    user: mongoose.Types.ObjectId(req.session.user.id),
    frame1,
    frame2,
    frame3,
    frame4,
    frame5,
    frame6,
    frame7,
    frame8,
    frame9,
    frame10,
    score,
    strikes,
    spares,
    openFrames
  })
  .then(game => {
    const gameId = game.apiRepr().id;
    // It needs to push the game id into the games array
    User.findById(req.session.user.id)
      .then(user => {
        const userInfo = user.apiRepr();
        userInfo.games.push(gameId);
        userInfo.gameCount = userInfo.games.length;
        User.findByIdAndUpdate(req.session.user.id, userInfo, {new: true})
          .then(user => {
            // console.log(user.apiRepr());
          });
      });
    console.log(req.session.user.id);
    calculateStats(req.session.user.id);
    return res.status(201).json(game.apiRepr());
  })
  .catch(err => {
    if (err.reason === 'ValidationError') {
      return res.status(err.code).json(err);
    }
    res.status(500).json({code: 500, message: 'Internal server error'});
  });

});

router.delete('/:id', ensureLogin.ensureLoggedIn('/login'), jsonParser, (req, res) => {
  // Require the ID from the req.body
  // Then check if the game exists in the db
  // If it does not exist throw an error otherwise delete the game and return success message
  const id = req.params.id;

  // Once the game has been deleted....

  // Need some type of error handling here.
  // Need to brush up on mongo db methods.
  Game.findByIdAndRemove(id)
    .then(game => {
      console.log(game);
      const response = {
        message: "Game was successfully deleted",
        id: game._id
      }
      return res.status(200).send(response);
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});


function calculateStats(id) {
    console.log(id);
    let avgScore, avgStrike, avgSpare, avgOpenFrame, maxScore, minScore, totalGames, maxStrike, minStrike, maxSpare, minSpare, maxOpenFrame, minOpenFrame;
    Game.find({ 'user': id }, function(err, games) {
      if (err) return handleError(err);
      return games;
    })
      .then(games => {
        totalGames = games.length;
        maxScore = getMax(games, 'score');
        minScore = getMin(games, 'score');
        maxStrike = getMax(games, 'strikes');
        minStrike = getMin(games, 'strikes');
        maxSpare = getMax(games, 'spares');
        minSpare = getMin(games, 'spares');
        maxOpenFrame = getMax(games, 'openFrames');
        minOpenFrame = getMin(games, 'openFrames');

        let sumScore = 0;
        let sumSpare = 0;
        let sumStrike = 0;
        let sumOpenFrame = 0;
        for (let i = 0; i < totalGames; i++) {
          sumScore += parseInt(games[i].score);
          sumStrike += parseInt(games[i].strikes);
          sumSpare += parseInt(games[i].spares);
          sumOpenFrame += parseInt(games[i].openFrames);
        }

        avgScore = Math.round(sumScore/totalGames);
        avgStrike = Math.round(sumStrike/totalGames);
        avgSpare = Math.round(sumSpare/totalGames);
        avgOpenFrame = Math.round(sumOpenFrame/totalGames);
      
        // Need to grab the user from the user apir method.
        User.findById(id)
          .then(user => {
            const userInfo = user.apiRepr();
            userInfo.stats.averageScore = avgScore;
            userInfo.stats.averageStrikes = avgStrike;
            userInfo.stats.averageSpares = avgSpare;
            userInfo.stats.averageOpenFrames = avgOpenFrame;
            userInfo.stats.maxScore.id = maxScore[0];
            userInfo.stats.maxScore.score = maxScore[1];
            userInfo.stats.minScore.id = minScore[0];
            userInfo.stats.minScore.score = minScore[1];
            userInfo.stats.maxStrikes.id = maxStrike[0];
            userInfo.stats.maxStrikes.strikes = maxStrike[1];
            userInfo.stats.minStrikes.id = minStrike[0];
            userInfo.stats.minStrikes.strikes = minStrike[1];
            userInfo.stats.maxSpares.id = maxSpare[0];
            userInfo.stats.maxSpares.spares = maxSpare[1];
            userInfo.stats.minSpares.id = minSpare[0];
            userInfo.stats.minSpares.spares = minSpare[1];
            userInfo.stats.maxOpenFrames.id = maxOpenFrame[0];
            userInfo.stats.maxOpenFrames.openFrames = maxOpenFrame[1];
            userInfo.stats.minOpenFrames.id = minOpenFrame[0];
            userInfo.stats.minOpenFrames.openFrames = minOpenFrame[1];

            User.findByIdAndUpdate(id, userInfo, {new: true})
            .then(user => {
              // console.log(user.apiRepr());
            });
          })
      });
}

// Returning a array with [id, score]
function getMin(data, field) {
  // reduce(accumulator, currentValue) => returning condition, starting value
  // return data.reduce((min, p) => p[field] < min ? p[field] : min, data[0][field]);
  return data.reduce((min, p) => p[field] < min[1] ? [p["_id"] ,p[field]] : min, [data[0]["_id"], data[0][field]]);
}
function getMax(data, field) {

  // return data.reduce((max, p) => p[field] > max ? p[field] : max, data[0][field]);
  return data.reduce((min, p) => p[field] > min[1] ? [p["_id"] ,p[field]] : min, [data[0]["_id"], data[0][field]]);
}

module.exports = {router};
