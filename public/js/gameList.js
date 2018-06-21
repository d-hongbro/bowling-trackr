// console.log(document.cookie);
// // optional: shorten 1st 2nd 
// let MOCK_GAME_LIST = {
// 	"gameList": [
// 		{
// 			"id": "1111111",
// 			"frame1": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 6,
// 				"strike": 0,
// 				"spare": 0

// 			},
// 			"frame2": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 12,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame3": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 18,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame4": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 24,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame5": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 30,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame6": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 36,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame7": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 42,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame8": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 48,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame9": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 54,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame10": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"pins3": [],
// 				"score3": 0,
// 				"finalScore": 60
// 			},
// 			"score": 60,
// 			"strikes": 0,
// 			"spares": 0,
// 			"openFrames": 10,
// 		},
// 		{
// 			"id": "2222222",
// 			"frame1": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 6,
// 				"strike": 0,
// 				"spare": 0

// 			},
// 			"frame2": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 12,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame3": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 18,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame4": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 24,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame5": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 30,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame6": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 36,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame7": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 42,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame8": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 48,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame9": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 3,
// 				"finalScore": 54,
// 				"strike": 0,
// 				"spare": 0
// 			},
// 			"frame10": {
// 				"pins1": [1, 3, 5],
// 				"score1": 3,
// 				"pins2":[2, 4, 10],
// 				"score2": 7,
// 				"pins3": [],
// 				"score3": 10,
// 				"finalScore": 74
// 			},
// 			"score": 74,
// 			"strikes": 1,
// 			"spares": 1,
// 			"openFrames": 9,
// 		}
// 	]
// };

// handle double clicks for buttons within the same function


function getRecentGameList(callback) {

		$.ajax({
			url: '/api/games',
			contentType: 'application/json',
			traditional: true,
			type: 'get',
			success: function(data) {
				callback(data);
			},
			error: function(data) {
				console.warn(data.responseText);
				console.log(data);
			}
		});



	// setTimeout(function() {
	// 	callback(MOCK_GAME_LIST);
	// }, 1);
}

function renderSpareStrikes(score1, score2, score3 = '') {
	let symbol1, symbol2, symbol3;
	if (score1 == 10 && score2 == 10 && score3 == 10) {
		// XXX
		symbol1, symbol2, symbol3 = 'X';
	} else if (score1 == 10 && score2 == 10 && score3 < 10) {
		// XX3
		symbol1, symbol2 = 'X';
		symbol3 = score3;
	} else if (score1 == 10 && (score2 + score3) == 10) {
		// X2/
		symbol1 = 'X';
		symbol2 = score2;
		symbol3 = '/';
	} else if (score1 == 10 && (score2 + score3) < 10) {
		// X22
		symbol1 = 'X';
		symbol2 = score2;
		symbol3 = score3;
	} else if ((score1 + score2) == 10 && score3 == 10) {
		// 2/X
		symbol1 = score1;
		symbol2 = '/';
		symbol3 = 'X';
	} else if ((score1 + score2) == 10 && score3 < 10) {
		// 2/3
		symbol1 = score1;
		symbol2 = '/';
		symbol3 = score3;
	} else if (score1 == 10) {
		// X
		symbol1 = 'X';
		symbol2, symbol3 = false;
	} else if ((score1 + score2) == 10) {
		// 2/
		symbol1 = score1;
		symbol2 = '/';
		symbol3 = false;
	} else if ((score1 + score2) < 10) {
		// 22
		symbol1 = score1;
		symbol2 = score2;
		symbol3 = false;
	}
	return [symbol1, symbol2, symbol3];
}

function renderTDSpanElement(input) {
	return `<span>${input}</span>`;
}

function gameHTMLCard(game, index) {
	const gameNumber = parseInt(index);
	let html = `<div class="gameCard">
					<div class="gameTitle">
						<h3>Game ${gameNumber}</h3>
					</div>
					<div class="gameBody">
					<div class="gameStats">
						<ul>
							<li><p>Score: ${game.score}</p></li>
							<li><p>Strikes: ${game.strikes}</p></li>
							<li><p>Spares: ${game.spares}</p></li>
							<li><p>Open Frames: ${game.openFrames}</p></li>
						</ul>
					</div>
						<table>
							<tr>`;
	for (let i = 1; i < 11; i++) {
		html += `<th>${i}</th>`;
	}
	html += `</tr>
					<tr>`;
	for (let j = 1; j < 11; j++) {
		const frame = `frame${j}`;
		if (j == 10 && typeof game[frame].score3 !== 'undefined') {
			const [symbol1, symbol2, symbol3] = renderSpareStrikes(game[frame].score1, game[frame].score2, game[frame].score3);
			html += `<td>${renderTDSpanElement(symbol1)}${symbol2 ? renderTDSpanElement(symbol2) : ''}${symbol3 ? renderTDSpanElement(symbol3) : ''}</td>`;
		} else {
			const [symbol1, symbol2] = renderSpareStrikes(game[frame].score1, game[frame].score2);
			html += `<td>${renderTDSpanElement(symbol1)}${symbol2 ? renderTDSpanElement(symbol2) : ''}</td>`;
		}
	}
	html += `</tr>
					<tr>`;
	for (let k = 1; k < 11; k++) {
		const frame = `frame${k}`;
		html += `<td><span>${game[frame].finalScore}</span></td>`;
	}
	html += `	</tr>
					</table>
				</div>
			</div>`;
	return html;
	// return `<div class="gameCard">
	// 				<div class="gameTitle">
	// 					<h3></h3>
	// 				</div>
	// 				<div class="gameBody">
	// 					<table>
	// 						<tr>
	// 							<th>1</th>
	// 							<th>2</th>
	// 							<th>3</th>
	// 							<th>4</th>
	// 							<th>5</th>
	// 							<th>6</th>
	// 							<th>7</th>
	// 							<th>8</th>
	// 							<th>9</th>
	// 							<th>10</th>
	// 						</tr>
	// 						<tr>
	// 							<td><span>${game.frame1.firstTryScore}</span><span>${game.frame1.secondTryScore}</span></td>
	// 							<td><span>${game.frame2.firstTryScore}</span><span>${game.frame2.secondTryScore}</span></td>
	// 							<td><span>${game.frame3.firstTryScore}</span><span>${game.frame3.secondTryScore}</span></td>
	// 							<td><span>${game.frame4.firstTryScore}</span><span>${game.frame4.secondTryScore}</span></td>
	// 							<td><span>${game.frame5.firstTryScore}</span><span>${game.frame5.secondTryScore}</span></td>
	// 							<td><span>${game.frame6.firstTryScore}</span><span>${game.frame6.secondTryScore}</span></td>
	// 							<td><span>${game.frame7.firstTryScore}</span><span>${game.frame7.secondTryScore}</span></td>
	// 							<td><span>${game.frame8.firstTryScore}</span><span>${game.frame8.secondTryScore}</span></td>
	// 							<td><span>${game.frame9.firstTryScore}</span><span>${game.frame9.secondTryScore}</span></td>
	// 							<td><span>${game.frame10.firstTryScore}</span><span>${game.frame10.secondTryScore}</span><span>${game.frame10.thirdTryScore}</span></td>
	// 						</tr>
	// 						<tr>
	// 							<td><span>${game.frame1.finalScore}</span></td>
	// 							<td><span>${game.frame2.finalScore}</span></td>
	// 							<td><span>${game.frame3.finalScore}</span></td>
	// 							<td><span>${game.frame4.finalScore}</span></td>
	// 							<td><span>${game.frame5.finalScore}</span></td>
	// 							<td><span>${game.frame6.finalScore}</span></td>
	// 							<td><span>${game.frame7.finalScore}</span></td>
	// 							<td><span>${game.frame8.finalScore}</span></td>
	// 							<td><span>${game.frame9.finalScore}</span></td>
	// 							<td><span>${game.frame10.finalScore}</span></td>
	// 						</tr>
	// 					</table>
	// 				</div>
	// 			</div>`;


// <div class="gameCard">
// 		<div class="gameName">
// 			<h3></h3>
// 		</div>
// 		<div class="gameFrames">
// 			<div class="frame">
// 				<div class="frameHeader">
// 					<p></p>
// 				</div>
// 				<div class="frameBody">
// 					<div class="frameCorner">
// 						<span></span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// </div>
}

function displayGameList(data) {
	console.log(data);
	for (index in data) {
		const html = gameHTMLCard(data[index], data.length - index);
		$('#gameResult').append(html);
	}
}

function getAndDisplayGameList() {
	getRecentGameList(displayGameList);
}

$(function() {
	getAndDisplayGameList();
});