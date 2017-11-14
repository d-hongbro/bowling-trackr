let MOCK_POST_DATA = {
			"id": "333333",
			"frame1": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 6,
				"strike": 0,
				"spare": 0

			},
			"frame2": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 12,
				"strike": 0,
				"spare": 0
			},
			"frame3": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 18,
				"strike": 0,
				"spare": 0
			},
			"frame4": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 24,
				"strike": 0,
				"spare": 0
			},
			"frame5": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 30,
				"strike": 0,
				"spare": 0
			},
			"frame6": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 36,
				"strike": 0,
				"spare": 0
			},
			"frame7": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 42,
				"strike": 0,
				"spare": 0
			},
			"frame8": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 48,
				"strike": 0,
				"spare": 0
			},
			"frame9": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"finalScore": 54,
				"strike": 0,
				"spare": 0
			},
			"frame10": {
				"pins1": [1, 3, 5],
				"score1": 3,
				"pins2":[2, 4, 10],
				"score2": 3,
				"pins3": [],
				"score3": 0,
				"finalScore": 60
			},
			"score": 60,
			"strikes": 0,
			"spares": 0,
			"openFrames": 10,
		};


// grab the game id from the html
// display gameInput buttons dynamically
// based on what the user has inputed
// Compute the score as the user inputs
// stats
// save the user input into the mock
// and into the table

let currentFrame = 1;
let currentTurn = 1;
let scores = {};
let currentScore = 0;
let scoreChanges = [];

function renderNumberInputButton(value, symbol = value) {
	return `<button id="input${value}" type="button" name="input${value}" class="numberInput">${symbol}</button>`;
}

function renderScoreStats(value) {

}

// Need to make this function dynamic
// function getNumberInputButtons() {
// 	let buttonsHtml = '';
// 	for (let i = 1; i < 11; i++) {
// 		if (i == 10) {
// 			buttonsHtml += renderNumberInputButton(i, '/');
// 			buttonsHtml += renderNumberInputButton(0);
// 			buttonsHtml += renderNumberInputButton(i, 'X');
// 		} else {
// 			buttonsHtml += renderNumberInputButton(i);
// 		}
// 	}
// 	console.log(buttonsHtml);
// 	$('.gameInput').empty().append(buttonsHtml);
// }

function processNumberInputs(frame, turn, value, currentFrameScore) {
	// disables the buttons that the user does not need
	// receives previous turns value, and current frame and turn

	// reset everything to disabled true
	for (let k = 1; k < 11; k++) {
		$(`#input${k}`).prop('disabled', true);
	}
	$('#inputSlash').prop('disabled', true);
	$('#inputNewGame').prop('disabled', true);
	$('#inputX').prop('disabled', true);
	if ((turn == 2 && value < 10 && frame !== 10) || (frame == 10 && turn == 3 && value < 10 && (currentFrameScore[0] == 'X' || currentFrameScore[1] == '/'))) {
		const highestPossible = 10 - value;
		for (let j = 1; j < highestPossible; j++) {
			$(`#input${j}`).prop('disabled', false);
		}
		$('#inputSlash').prop('disabled', false);
	// } else if (frame == 10 && (turn == 3 && value == 'X')) {

	} else if (turn == 1 || (frame == 10 && turn == 2) || (frame == 10 && turn == 3)) {
		// show rest
		for (let i = 1; i < 11; i++) {
			$(`#input${i}`).prop('disabled', false);
		}
		$('#inputX').prop('disabled', false);

	} else if (turn == 3) {
		$('#input0').prop('disabled', true);
		$('#inputNewGame').prop('disabled', false);
	} else if (turn == 4 || (frame == 10 && turn == 2 && currentFrameScore[0] < 10)) {
		$('#inputNewGame').prop('disabled', false);
		$('#input0').prop('disabled', true);
	}

	if (frame == 10 && turn == 3 && currentFrameScore[0] < 10) {
		for (let k = 1; k < 11; k++) {
			$(`#input${k}`).prop('disabled', true);
		}
		$('#input0').prop('disabled', true);
	$('#inputSlash').prop('disabled', true);
	$('#inputNewGame').prop('disabled', false);
	$('#inputX').prop('disabled', true);
	}
}

function processCurrentFrameTurn(value) {
	if (currentTurn == 1 && isNaN(parseInt(value)) && currentFrame != 10) {
		currentFrame++;
	} else if (currentTurn == 1 && currentFrame != 10) {
		currentTurn++;
	} else if (currentTurn == 2 && currentFrame != 10) {
		currentTurn = 1;
		currentFrame++;
	} else if ((currentTurn == 1 || currentTurn == 2) && isNaN(parseInt(value)) && currentFrame == 10) {
		currentTurn++;
	} else if (currentTurn == 2 && currentFrame == 10) {
		currentTurn++;
	} else if (currentTurn == 1) {
		currentTurn++;
	} else if (currentTurn == 3) {
		currentTurn++;
	} 
}

function returnSetScore(frame, turn, currentValue = ''){
			console.log({
				process: `returnSetScore(${frame}, ${turn}, ${currentValue})`,
				currentFrame: currentFrame,
				currentTurn: currentTurn
			});
	let scoreProcess;
	if (currentValue == 'skip') {
		scoreProcess = $(`#frameInput${currentFrame - frame}`).children(`span:nth-child(${currentTurn - turn})`).text();
	} else {
		scoreProcess = $(`#frameInput${currentFrame - frame}`).children(`span:nth-child(${currentTurn - turn})`).text(currentValue);

	}
 return scoreProcess;
}


function getPreviousScores(frame) {
	return scores[currentFrame - frame];
}

function storeScoreChangeLocations(frameChanged, frame, turn, currentValue) {
	// frame changed, 
	scoreChanges.push([frameChanged, frame, turn, currentValue]);
	console.log(scoreChanges);
}


function renderScore(frameScore, targetFrame) {

}

function calculateOpenFrameScore(value, frame, turn, turnScore, previousScore) {

}

function displayCurrentScore2() {
	// Get previous scores for calculations


}



function displayCurrentScore(currentValue, frame, turn) {
	// access the scores array and display score
	console.log({
		process: `displayCurrentScore(${currentValue})`,
		currentValue: currentValue,
		currentFrame: currentFrame,
		currentTurn: currentTurn
	});
	let currentFrameScore = scores[currentFrame];
	let previousScore = parseInt($(`#frameScore${currentFrame - 1} span`).text());
	let prev1FrameScore = getPreviousScores(1);
	let prev2Score = parseInt($(`#frameScore${currentFrame - 2} span`).text());
	let prev2FrameScore = getPreviousScores(2);
	let prev3Score = parseInt($(`#frameScore${currentFrame - 3} span`).text());
	let prev3FrameScore = getPreviousScores(3);
	let previousTurnScore;

// Tenth frame processing


	if ((currentTurn == 2 || currentTurn == 3) && currentFrame !== 1) {
		if (currentValue !== '/' && prev1FrameScore[0] !== 'X' && prev1FrameScore[1] !== '/') {
			if (currentFrame == 2 && prev1FrameScore[0] == 'X') {
				previousScore = 10 + parseInt(currentValue) + parseInt(currentFrameScore[0]);
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				currentScore = previousScore + parseInt(currentValue) + parseInt(currentFrameScore[0]);
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations([-1, 0], frame, turn, currentValue);
			} else if (prev1FrameScore[0] == 'X') {
				previousScore = prev2Score + parseInt(currentValue) + parseInt(currentFrameScore[0]);
			} else {
				currentScore = parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]) + previousScore;
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations(0, frame, turn, currentValue);
			}
		} else if (currentValue == 'X' && currentFrame == 10) {
			if (currentTurn == 2 && currentFrameScore[0] == 'X' && prev1FrameScore[0] == 'X') {
				previousScore = prev2Score + 30;
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				storeScoreChangeLocations(-1, frame, turn, currentValue);
			} else if (currentTurn == 3 && currentFrameScore[0] == 'X' && currentFrameScore[1] == 'X' && currentValue == 'X') {
				currentScore = previousScore + 30;
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations(0, frame, turn, currentValue);
			} else if (currentTurn == 3 && currentFrameScore[0] < 10 && currentFrameScore[1] == '/') {
				currentScore = previousScore + 20;
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations(0, frame, turn, currentValue);
			}
		// } else if (currentValue == '/' && prev1FrameScore.length == 2 && prev1FrameScore[1] == '/') {
			// if (currentFrame < 3) {
			// 	previousScore = 10 + parseInt(currentFrameScore[0]);
			// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
			// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
			// } else if (currentValue == '/' && prev1FrameScore.length == 2) {
			// 	previousScore = prev2Score + 10 + parseInt(currentFrameScore[0]);
			// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
			// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
			// } 
		} else if (currentValue == '/' && prev1FrameScore[0] == 'X' && currentTurn == 2) {
			previousScore = prev2Score + 20;
			$(`#frameScore${currentFrame - 1} span`).text(previousScore);
			storeScoreChangeLocations(-1, frame, turn, currentValue);
		// } else if (currentValue == '/' && prev1FrameScore[1] == '/') { // current problems
		// 	previousScore = prev2Score + 10 + parseInt(currentFrameScore[0]);
		// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
		// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
		// } else if (currentValue < 10 && currentFrameScore[0] == 'X' && currentFrame) {
		// 	previousScore = prev2Score + 20 + parseInt(currentFrameScore[1]);
		// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
		// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
		// } else if (currentValue = '/' && (currentFrameScore[0] == 'X' || currentFrameScore[0] == '/') && (currentFrameScore[1] == 'X' || currentFrame[1] < 10)) {
		// 	currentScore = previousScore + 20;
		// 	$(`#frameScore${currentFrame} span`).text(currentScore);
		// 	storeScoreChangeLocations(0, frame, turn, currentValue);
		} else if (currentValue == '/' && currentTurn == 3) {
			currentScore = previousScore + 20;
			$(`#frameScore${currentFrame} span`).text(currentScore);
			StoreScoreChangeLocations(0, frame, turn, currentValue);
		} else if (currentValue < 10 && currentFrame != 10) {
			currentScore = previousScore + parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
			$(`#frameScore${currentFrame} span`).text(currentScore);
			storeScoreChangeLocations(0, frame, turn, currentValue);
		} else if (currentValue < 10 && currentTurn == 2 && currentFrameScore[0] !== 'X') {
			previousScore = prev2Score + 10 + parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
			$(`#frameScore${currentFrame -1 } span`).text(previousScore);
			currentScore = previousScore + parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
			$(`#frameScore${currentFrame} span`).text(currentScore);
			storeScoreChangeLocations([-1, 0], frame, turn, currentValue);
		} else if (currentValue < 10 && currentTurn == 2) {
			previousScore = prev2Score + 20 + parseInt(currentFrameScore[1]);
			$(`#frameScore${currentFrame -1 } span`).text(previousScore);
			storeScoreChangeLocations(-1, frame, turn, currentValue);
		} else if (currentValue < 10 && currentTurn == 3) {
			if (currentFrameScore[0] < 10) {
				currentScore = previousScore + 10 + parseInt(currentValue);
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations(0, frame, turn, currentValue);
			} else if (currentFrameScore[0] == 'X' && currentFrameScore[1] == 'X') {
				currentScore = previousScore + 20 + parseInt(currentValue);
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations(0, frame, turn, currentValue);
			} else if (currentFrameScore[0] == 'X' && currentFrameScore[1] < 10) {
				currentScore = previousScore + 10 + parseInt(currentFrameScore[1]) + parseInt(currentValue);
				$(`#frameScore${currentFrame} span`).text(currentScore);
				storeScoreChangeLocations(0, frame, turn, currentValue);
			}
		}
	} else if (currentTurn == 2 && currentFrame == 1) {
		if (currentValue !== '/') {
			currentScore = parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
			$(`#frameScore${currentFrame} span`).text(currentScore);
			storeScoreChangeLocations(0, frame, turn, currentValue);
		}
	} else if (currentTurn == 1 && currentFrame !== 1) {
		if (currentValue == 'X' && prev1FrameScore[1] == '/') {
			if (currentFrame < 3) {
				previousScore = 20;
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				storeScoreChangeLocations(-1, frame, turn, currentValue);
			} else if (prev2FrameScore[0] == 'X') {
				previousScore = prev2Score + 20;
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				storeScoreChangeLocations(-1, frame, turn, currentValue);
			}
		} else if (currentValue < 10 && prev1FrameScore[1] == '/') {
			if (currentFrame > 2) {
				previousScore = prev2Score + 10 + parseInt(currentValue);
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				storeScoreChangeLocations(-1, frame, turn, currentValue);
			} else {
				previousScore = 10 + parseInt(currentValue);
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				storeScoreChangeLocations(-1, frame, turn, currentValue);
			}

		} else if (currentValue == 'X' && prev1FrameScore[0] == 'X') {
			if (currentFrame == 3 && prev2FrameScore[0] == 'X') {
				previousScore = 30;
				$(`#frameScore${currentFrame - 2} span`).text(previousScore);
				storeScoreChangeLocations(-2, frame, turn, currentValue);
			} else if (currentFrame > 3 && prev2FrameScore[0] == 'X') {
				previousScore = 30 + prev3Score;
				$(`#frameScore${currentFrame - 2} span`).text(previousScore);
				storeScoreChangeLocations(-2, frame, turn, currentValue);
			} 
		} else if (currentValue < 10 && currentFrame > 2) {
			if (prev1FrameScore[0] == 'X' && prev2FrameScore[0] == 'X') {
				previousScore = prev3Score + 20 + parseInt(currentValue);
				$(`#frameScore${currentFrame - 2} span`).text(previousScore);
				storeScoreChangeLocations(-2, frame, turn, currentValue);
			} else if (prev1FrameScore.length == 2 && prev1FrameScore[1] == '/') {
				previousScore = prev2Score + 10 + parseInt(currentValue);
				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
				storeScoreChangeLocations(-1, frame, turn, currentValue);
			}
		}
	}
}

function addInputs() {

}

function deleteInputsScores(frame, turn, currentValue) {
	const lastChange = scoreChanges.length - 1;
	const framesChanged = scoreChanges[lastChange][0]; // maybe an array if multiple
	const scoreFrame = scoreChanges[lastChange][1];
	const scoreTurn = scoreChanges[lastChange][2];
	const scoreValue = scoreChanges[lastChange][3];

	if (scoreChanges.length == 1 ) {
		if (scoreFrame == frame && scoreTurn == turn) {
			$(`#frameScore${scoreFrame + framesChanged} span`).text('');
			scoreChanges.splice(lastChange, 1);
		}
	} else if (scoreChanges.length == 2) {
		framesChanged.forEach(item => {
			if (scoreFrame == frame && scoreTurn == turn) {
				$(`#frameScore${scoreFrame + framesChanged} span`).text('');

			}
		});
		scoreChanges.splice(lastChange, 1);
	}
}

function handleNumberInputButtonsClick() {
	$('.gameInput').on('click', '.inputButton', (event) => {
		let value = $(event.currentTarget).text();
		// store the scores into the scores array
		if (typeof scores[currentFrame] == 'object' && value !== 'Back') {
			scores[currentFrame].push(value);
		} else if (value !== 'Back') {
			scores[currentFrame] = [];
			scores[currentFrame].push(value);
		}
		console.log(scores);
		console.log({
			process: 'START',
			value: value,
			currentFrame: currentFrame,
			currentTurn: currentTurn
		});
		if (value == 'Back' && (currentTurn == 2 || currentTurn == 3 || currentTurn == 4)) {
			currentTurn--;
			returnSetScore(0, 0);
			scores[currentFrame].splice(currentTurn, 1);
			deleteInputsScores(currentFrame, currentTurn, value);
			console.log({
				process: `value == "Back" && (currentTurn == 2 || currentTurn == 3)`,
				value: value,
				currentFrame: currentFrame,
				currentTurn: currentTurn,
				scoreChanges: scoreChanges
			});
		} else if (value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') == 'X') {
			console.log({
				process: `value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') == 'X' ENTERED`
			});
				currentFrame--;
				returnSetScore(0, 0);
				scores[currentFrame].splice(currentTurn - 1, 1);
				deleteInputsScores(currentFrame, currentTurn, value);
				console.log({
					process: `value == "Back" && currentTurn == 1 &&`,
					value: value,
					currentFrame: currentFrame,
					currentTurn: currentTurn,
					scoreChanges: scoreChanges
				});
		} else if (value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') < 10) {
			console.log({
				process: `value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') < 10 ENTERED`
			});
				currentFrame--;
				currentTurn++;
				returnSetScore(0, 0);
				scores[currentFrame].splice(currentTurn - 1, 1);
				deleteInputsScores(currentFrame, currentTurn, value);
				value = returnSetScore(0, 1, 'skip');
				console.log({
					process: 'value == "Back" && currentTurn == 1 ELSE',
					value: value,
					currentFrame: currentFrame,
					currentTurn: currentTurn,
					scoreChanges: scoreChanges
				});
		} else if (currentTurn == 1 || currentTurn == 2 || currentTurn == 3) {
			console.log({
				process: `currentTurn == 1 || currentTurn == 2 ENTERED`
			});
			returnSetScore(0, 0, value);
			displayCurrentScore(value, currentFrame, currentTurn);
			processCurrentFrameTurn(value);
		}
		processNumberInputs(currentFrame, currentTurn, value, scores[currentFrame]);
		console.log({
			process: 'END',
			value: value,
			currentFrame: currentFrame,
			currentTurn: currentTurn,
			scoreChanges: scoreChanges
		});
	});
}

function mainHandler() {
	processNumberInputs(currentFrame, currentTurn);
	handleNumberInputButtonsClick();
}


// $(getNumberInputButtons);
$(mainHandler);