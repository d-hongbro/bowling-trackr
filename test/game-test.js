const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
chai.use(chaiHttp);

const {TEST_DATABASE_URL} = require('../config');
const {app, runServer, closeServer} = require('../server');
const {Game} = require('.././games')

function seedBowlingData() {
	console.info('seeding bowling data');
	const seedData = [];

	for (let i = 1; i <= 10; i++) {
		seedData.push(generateBowlingData());
	}
	return Game.insertMany(seedData);
}

function generateBowlingData() {
	return {
		// This is where the game data resides
		gameNumber: faker.number.number(2),
		frame1: {score1: 1, score2: 1, finalScore: 2, strike: 0, spare: 0},
		frame2: {score1: 1, score2: 1, finalScore: 4, strike: 0, spare: 0},
		frame3: {score1: 1, score2: 1, finalScore: 6, strike: 0, spare: 0},
		frame4: {score1: 1, score2: 1, finalScore: 8, strike: 0, spare: 0},
		frame5 {score1: 1, score2: 1, finalScore: 10, strike: 0, spare: 0},
		frame6: {score1: 1, score2: 1, finalScore: 12, strike: 0, spare: 0},
		frame7: {score1: 1, score2: 1, finalScore: 14, strike: 0, spare: 0},
		frame8: {score1: 1, score2: 1, finalScore: 16, strike: 0, spare: 0},
		frame9: {score1: 1, score2: 1, finalScore: 18, strike: 0, spare: 0},
		frame10: {score1: 1, score2: 1, score3: 0, finalScore: 20, strike: 0, spare: 0},
		score: 20,
		strikes: 0,
		spares: 0,
		openFrames: 0
	}
}

function tearDownDb() {
	console.warn('Deleting test database');
	return mongooose.connection.dropDatabase();
}

describe('Bowling Trackr Game Model Test', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
  	return seedBowlingData();
  });

  afterEarch(function() {
  	return tearDownDb();
  });

  after(function() {
    return closeServer();
  })

	describe('GET Public index endpoint', function() {
		it('should return 200 along with index.html', function() {
			return chai.request(app)
				.get('/')
				.then(function(res) {
					res.should.have.status(200);
				});
		});
	});

});