
// optional: shorten 1st 2nd 
let MOCK_GAME_LIST = {
	"gameList": [
		{
			"id": "1111111",
			"frame1": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 6
			},
			"frame2": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 12
			},
			"frame3": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 18
			},
			"frame4": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 24
			},
			"frame5": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 30
			},
			"frame6": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 36
			},
			"frame7": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 42
			},
			"frame8": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore":48
			},
			"frame9": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"finalScore": 54
			},
			"frame10": {
				"firstTryPins": [1, 3, 5],
				"firstTryScore": 3,
				"secondTryPins":[2, 4, 10],
				"secondTryScore": 3,
				"thirdTryPins": [],
				"thirdTryScore": 0,
				"finalScore": 60
			},
			"score": 60,
			"strikeTotal": 0,
			"spareTotal": 0,
			"openFrameTotal": 10,
		},
		{
			"id": "2222222",
			"frame1": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins": [],
				"secondTryScore": 3,
				"finalScore": 6
			},
			"frame2": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 12
			},
			"frame3": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 18
			},
			"frame4": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 24
			},
			"frame5": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 30
			},
			"frame6": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 36
			},
			"frame7": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 42
			},
			"frame8": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore":48
			},
			"frame9": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 3,
				"finalScore": 54,
				"strike": 0,
				"spare": 0
			},
			"frame10": {
				"firstTryPins": [],
				"firstTryScore": 3,
				"secondTryPins":[],
				"secondTryScore": 7, // / is a representation not a data.
				"thirdTryPins": [],
				"thirdTryScore": 10 , // 10
				"finalScore": 74
				"strike": 1
			},
			"score": 74,
			"strikeTotal": 1,
			"spareTotal": 0,
			"openFrameTotal": 10,
		}
	]
};

// handle double clicks for buttons within the same function


function getRecentGameList(callback) {
	setTimeout(function() {
		callback(MOCK_GAME_LIST);
	}, 1);
}

function renderSpareStrikes(userInput) {

}

function gameHTMLCard(game) {
	let html = `<div class="gameCard">
					<div class="gameTitle">
						<h3>Game ${game.id}</h3>
					</div>
					<div class="gameBody">
					<div class="gameStats">
						<ul>
							<li><p>Score: ${game.score}</p></li>
							<li><p>Strikes: ${game.strikeTotal}</p></li>
							<li><p>Spares: ${game.spareTotal}</p></li>
							<li><p>Open Frames: ${game.openFrameTotal}</p></li>
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
		if (j == 10 && typeof game[frame].thirdTryScore.length !== 'undefined') {
			console.log(game[frame].thirdTryScore.length);
			html += `<td><span>${game[frame].firstTryScore}</span><span>${game[frame].secondTryScore}</span><span>${game[frame].thirdTryScore}</span></td>`;
		} else {
			html += `<td><span>${game[frame].firstTryScore}</span><span>${game[frame].secondTryScore}</span></td>`;
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
	for (index in data.gameList) {
		const html = gameHTMLCard(data.gameList[index]);
		$('#gameResult').append(html);
	}
}

function getAndDisplayGameList() {
	getRecentGameList(displayGameList);
}

$(function() {
	getAndDisplayGameList();
});