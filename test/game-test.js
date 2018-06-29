
// require('dotenv').config();

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');
// const chaiAsPromised = require('chai-as-promised');
// const request = require('supertest');


// const expect = chai.expect;
// const should = chai.should();
// const assert = chai.assert;
// chai.use(chaiAsPromised).should();
// chai.use(chaiHttp);

// const {TEST_DATABASE_URL} = require('../config');
// const {app, runServer, closeServer} = require('../server');
// const {Game} = require('.././games');
// const {User} = require('.././users');
// const agent = request.agent(app);
// function seedBowlingData() {
// 	console.info('seeding bowling data');
// 	const seedData = [];

// 	for (let i = 1; i <= 10; i++) {
// 		seedData.push(generateBowlingData());
// 	}
// 	return Game.insertMany(seedData);
// }

// function generateBowlingData() {
// 	return {
// 		// This is where the game data resides
// 		frame1: {score1: 1, score2: 1, finalScore: 2, strike: 0, spare: 0},
// 		frame2: {score1: 1, score2: 1, finalScore: 4, strike: 0, spare: 0},
// 		frame3: {score1: 1, score2: 1, finalScore: 6, strike: 0, spare: 0},
// 		frame4: {score1: 1, score2: 1, finalScore: 8, strike: 0, spare: 0},
// 		frame5: {score1: 1, score2: 1, finalScore: 10, strike: 0, spare: 0},
// 		frame6: {score1: 1, score2: 1, finalScore: 12, strike: 0, spare: 0},
// 		frame7: {score1: 1, score2: 1, finalScore: 14, strike: 0, spare: 0},
// 		frame8: {score1: 1, score2: 1, finalScore: 16, strike: 0, spare: 0},
// 		frame9: {score1: 1, score2: 1, finalScore: 18, strike: 0, spare: 0},
// 		frame10: {score1: 1, score2: 1, score3: 0, finalScore: 20, strike: 0, spare: 0},
// 		score: 20,
// 		strikes: 0,
// 		spares: 0,
// 		openFrames: 0
// 	}
// }

// function tearDownDb() {
// 	console.warn('Deleting test database');
// 	return mongooose.connection.dropDatabase();
// }

// const user = {
// 	'username': "mochatest",
// 	'password': "12341234",
// 	'firstName': "first",
// 	'lastName': "last",
// 	'email': "test@gmail.com"
// };

// User.create(user);

// const userCred = {
// 	'username': "mochatest",
// 	'password': '12341234'
// };

//   describe('Game', function() {
// 	let authenticatedUser = request.agent(app);
// 	// Maybe need to create a user and delete a user after this test
// 	before((done) => {
// 		runServer(TEST_DATABASE_URL);
// 		// User.remove({}, (err) => {
			
// 		// });
// 		// Game.remove({}, (err) => {
			
// 		// });

// 		// authenticatedUser
// 		// 	.post('/api/users')
// 		// 	.send(user)
// 		// 	.end((err, res) => {
// 		// 		res.should.have.status(200);
// 		// 		done();
// 		// 	});
// 					authenticatedUser
// 					.post('/api/auth/login')
// 					.send({'username': "mochatest", 'password': "12341234"})
// 					.end((err, res) => {
// 						expect(res.statusCode).to.equal(200);
// 						expect('location', '/lists');
// 						done();
// 					});
// 			// done();
// 			// });
		

// 	});

// 	// Deleting all the games before each test
// 	beforeEach(() => {
// 		// Game.remove({}, (err) => {
// 		// 	if (err) throw err;
// 		// });

// 		// agent
// 		// .post('/api/auth/login')
// 		// .send({username: "mochatest1", password: "12341234"})
// 		// .expect(200)
// 		// .end((err, res) => {
// 		// 	if (err) throw err;
// 		// 	done();
// 		// });	
// 		// chai.request.agent(app)
// 		// .post('api/auth/login')
// 		// .send({username: "mochatest", password: "12341234"})
// 		// .end((err, res) => {
// 		// 	// user has successfully logged in....
// 		// 	console.log({resBody: res.body});
// 		// 	console.log(res.status);
// 		// 	done();
// 		// });
// 	});

// 	// Deleting the user data and game data
// 	after(() => {

// 		closeServer();
// 	});

// 	describe('/GET game', () => {
// 		it('it should GET all the games', (done) => {

// 			authenticatedUser
// 				.get('api/games')
// 				.expect(200)
// 				.end((err, res) => {
// 					if (err) throw err;
// 					done();
// 				});

// 				// createLoginCookie('/api/auth/login', {'username': 'mochatest', 'password': '12341234'}, function(cookie) {
// 				// 	request(app)
// 				// 		.get('/api/games')
// 				// 		.set('session', cookie)
// 				// 		.expect(200, done);
// 				// });


// 			// 	chai.request(app)
// 			// 		.post('/api/auth/login')
// 			// 		.send({'username': 'mochatest', 'password': '12341234'})
// 			// 		.end((err, res) => {
// 			// 			token = res.body.authToken;
// 			// 			console.log(res.body);
// 			// 			chai.request.agent(app)
// 			// 				.get('/api/games')
// 			// 				.set('Authorization', token)
// 			// 				.end((err, res) => {
// 			// 					res.should.have.status(200);
// 			// 					res.body.should.be.a('object');
// 			// 					// console.log(res.body);
// 			// 					assert.equal(Object.keys(res.body).length, 0);
// 			// 					// res.body.length.should.be.eql(0);
// 			// 					done();
// 			// 				});

// 			// 		});
// 			// });


// 		});
// 	});

// 	// Something wrong with the generateBowlingData function
// 	// Number is undefined...
// 	describe('/POST game', () => {
// 		it('it should POST a game', (done) => {
// 			const gameData = generateBowlingData();
// 			chai.request(app)
// 				.post('/api/games')
// 				.send(gameData)
// 				.end((err, res) => {
// 					console.log(res.status);
// 					console.log(res.body);
// 					console.log(err);
// 					res.should.have.status(201);
// 					res.body.should.be.a('object');
// 					res.body.should.have.property('id');
// 					res.body.should.have.property('user');
// 					res.body.should.have.property('frame1');
// 					res.body.should.have.property('frame2');
// 					res.body.should.have.property('frame3');
// 					res.body.should.have.property('frame4');
// 					res.body.should.have.property('frame5');
// 					res.body.should.have.property('frame6');
// 					res.body.should.have.property('frame7');
// 					res.body.should.have.property('frame8');
// 					res.body.should.have.property('frame9');
// 					res.body.should.have.property('frame10');
// 					res.body.should.have.property('score');
// 					res.body.should.have.property('strikes');
// 					res.body.should.have.property('spares');
// 					res.body.should.have.property('openFrames');
// 					done();
// 				});
// 		});
// 	});

// 	describe('/DELETE/:id game', () => {
// 		it('it should DELETE a game given the id', (done) => {
// 			const gameData = generateBowlingData();
// 			let game = new Game(gameData);
// 			game.save((err, game) => {
// 				chai.request(app)
// 				.delete('/api/games/' + game.id)
// 				.end((err, res) => {
// 					res.should.have,status(200);
// 					res.should.be.a('object');
// 					done();
// 				});
// 			});
// 		});
// 	});

// });