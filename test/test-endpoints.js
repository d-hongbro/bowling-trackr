// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const should = chai.should();
// chai.use(chaiHttp);

// const {TEST_DATABASE_URL} = require('../config');
// const {app, runServer, closeServer} = require('../server');

// describe('Bowling Trackr API Resource', function() {

//   before(function() {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function() {
//     return closeServer();
//   })

// 	describe('GET Public index endpoint', function() {
// 		it('should return 200 along with index.html', function() {
// 			return chai.request(app)
// 				.get('/')
// 				.then(function(res) {
// 					res.should.have.status(200);
// 				});
// 		});
// 	});
// });