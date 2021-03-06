let MOCK_POST_DATA = {
			"id": "333333",
			"user": 0,
			"frame1": {"score1": 0, "score2": 0, "finalScore": 0},
			"frame2": {"score1": 0, "score2": 0, "finalScore": 0},
			"frame3": {"score1": 0,	"score2": 0, "finalScore": 0},
			"frame4": {"score1": 0,	"score2": 0, "finalScore": 0},
			"frame5": {"score1": 0,	"score2": 0, "finalScore": 0},
			"frame6": {"score1": 0,	"score2": 0, "finalScore": 0},
			"frame7": {"score1": 0,	"score2": 0, "finalScore": 0},
			"frame8": {"score1": 0,	"score2": 0, "finalScore": 0},
			"frame9": {"score1": 0, "score2": 0, "finalScore": 0},
			"frame10": {"score1": 0, "score2": 0,	"score3": 0, "finalScore": 0},
			"score": 0,
			"strikes": 0,
			"spares": 0,
			"openFrames": 0,
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

// function renderNumberInputButton(value, symbol = value) {
// 	return `<button id="input${value}" type="button" name="input${value}" class="numberInput">${symbol}</button>`;
// }

// function renderScoreStats(value) {

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

//--

// function returnSetScore(frame, turn, currentValue = ''){
// 			console.log({
// 				process: `returnSetScore(${frame}, ${turn}, ${currentValue})`,
// 				currentFrame: currentFrame,
// 				currentTurn: currentTurn
// 			});
// 	let scoreProcess;
// 	if (currentValue == 'skip') {
// 		scoreProcess = $(`#frameInput${currentFrame - frame}`).children(`span:nth-child(${currentTurn - turn})`).text();
// 	} else {
// 		scoreProcess = $(`#frameInput${currentFrame - frame}`).children(`span:nth-child(${currentTurn - turn})`).text(currentValue);

// 	}
//  return scoreProcess;
// }

// function getPreviousScores(frame) {
// 	return scores[currentFrame - frame];
// }
















/* ------------------------------

					START OF
	BUTTON PROCESSING FUNCTIONS


-------------------------------*/

function hideAllInputButtons() {
	console.log('hideAllInputButtons');
	for (let i = 1; i < 11; i++) {
		$(`#input${i}`).prop('disabled', true);
	}
	$('#inputSlash').prop('disabled', true);
	$('#inputNewGame').prop('disabled', true);
	$('#inputX').prop('disabled', true);
	$('#inputBack').prop('disabled', true);
	$('#input0').prop('disabled', true);
}

function showAllInputButtons() {
	console.log('showAllInputButtons')
	for (let i = 1; i < 11; i++) {
		$(`#input${i}`).prop('disabled', false);
	}
	$('#inputX').prop('disabled', false);
	$('#inputBack').prop('disabled', false);
	$('#input0').prop('disabled', false);
}

function showInputButtonsByNumber(maxNumber) {
	console.log('showInputButtonsByNumber');
	for (let i = 1; i < maxNumber; i++) {
		$(`#input${i}`).prop('disabled', false);
	}
	$('#inputSlash').prop('disabled', false);
	$('#inputBack').prop('disabled', false);
	$('#input0').prop('disabled', false);
}

function showLastInputButtons() {
	console.log('showLastInputButtons');
	$('#inputNewGame').prop('disabled', false);
	$('#inputBack').prop('disabled', false);
}

function renderInputButtons(value, frame, turn, data) {
	console.log('renderInputButtons');
	// reset buttons to disabled
	hideAllInputButtons();
	console.log({
		value: value, 
		frame: frame, 
		turn: turn
	});
	if (frame == 10) {
		if (turn == 1 || 
			(turn == 2 && value == 'X') || 
			(turn == 3 && value == 'X') ||
			(turn == 2 && value == '/') ||
			(turn == 3 && value == '/')) {
			showAllInputButtons();
		} else if (turn == 2 && value < 10) {
			const maxNumber = 10 - value;
			showInputButtonsByNumber(maxNumber);
		} else if (turn == 3 && value < 10 && (data[0][0] == 'X' || (data[0][1] == '/'))) {
			const maxNumber = 10 - value;
			showInputButtonsByNumber(maxNumber);
		} else if (turn == 4) {
			showLastInputButtons();
		}
	} else {
		if (turn == 1) {
			showAllInputButtons();
		} else if (turn == 2 && value < 10) {
			const maxNumber = 10 - value;
			showInputButtonsByNumber(maxNumber);
		}
	}
}

/* ------------------------------

					END OF
	BUTTON PROCESSING FUNCTIONS


-------------------------------*/


/* ------------------------------

					START OF
	PROCESSING DATA FUNCTIONS


-------------------------------*/

function getNumberValueOfInput(value, data) {
	let numberValue;
	if (value == 'X') {
		numberValue = 10;
	} else if (value == '/') {
		numberValue = 10 - data[0][0];
	} else {
		numberValue = parseInt(value);
	}
	return numberValue;
}

function turnIntoStrikesSpares(score1, score2) {
	let value1 = score1;
	let value2 = score2;
	// Spare
	if ((score1 + score2) == 10) {
		value1 = score1;
		value2 = '/';
	}

	// Strike
	if (score1 == 10 && score2 == 10) {
		value1 = 'X';
		value2 = 'X';
	} else if (score1 == 10) {
		value1 = 'X';
	}

	if ((score1 + score2) < 10) {
		value1 = score1;
		value2 = score2;
	}
	return [value1, value2];
}

function checkIfSet(data) {
	return (typeof data === 'undefined') ? false : true;
}

/* ------------------------------

						END OF
	PROCESSING DATA FUNCTIONS


-------------------------------*/

/* ------------------------------

						START OF
				STORAGE FUNCTIONS


-------------------------------*/

function storeScoreChangeLocations(type, frameOffset, frame, turn, value, prev) {
	// frame changed, 
	const frameChanged = frame - frameOffset;
	scoreChanges.push([type, frameChanged, turn, value, prev]);
	console.log({
		process: 'storeScoreChangeLocations',
		data: scoreChanges
	});
}

function storeIntoGameObjectScore(frame, turn, value, data) {
	let numberValue = getNumberValueOfInput(value, data);
	console.log(numberValue);
	const targetFrame = `frame${frame}`;
	if (turn == 1) {
		MOCK_POST_DATA[targetFrame].score1 = numberValue;
	} else if (turn == 2) {
		MOCK_POST_DATA[targetFrame].score2 = numberValue;
	} else if (turn == 3) {
		MOCK_POST_DATA[targetFrame].score3 = numberValue;
	}
	console.log(MOCK_POST_DATA[targetFrame]);
}

				// "pins1": [],
				// "score1": 0,
				// "pins2": [],
				// "score2": 0,
				// "pins3": [],
				// "score3": 0,
				// "finalScore": 0



function getPreviousScores1(frameOffset, frame) {
	let returnValue;
	const targetFrame = `frame${frame - frameOffset}`;
	if ((frame - frameOffset) <= 0) {
		returnValue = 0;
	} else {
		returnValue = MOCK_POST_DATA[targetFrame].finalScore;
	}
	return returnValue;
}

function returnPreviousDataSet(frame) {
	// 0 - Current Frame Inputs (frame[0], frame[1])
	// 1 - (-1) Frame Score
	// 2 - (-1) Frame Inputs for Turn 1 and 2 (frame[0], frame[1])
	// 3 - (-2) Frame Score
	// 4 - (-2) Frame Inputs for Turn 1 and 2 (frame[0], frame[1])
	// 5 - (-3) Frame Score
	let returnValue;
	if (frame == 1) {
		returnValue = [
			getPreviousFrames(0, frame)
		];
	} else if (frame == 2) {
		returnValue = [
			getPreviousFrames(0, frame),
			getPreviousScores1(1, frame),
			getPreviousFrames(1, frame)
		];
	} else if (frame == 3) {
		returnValue = [
			getPreviousFrames(0, frame),
			getPreviousScores1(1, frame),
			getPreviousFrames(1, frame),
			getPreviousScores1(2, frame),
			getPreviousFrames(2, frame)
		];
	} else if (frame > 3) {
		returnValue = [
			getPreviousFrames(0, frame),
			getPreviousScores1(1, frame),
			getPreviousFrames(1, frame),
			getPreviousScores1(2, frame),
			getPreviousFrames(2, frame),
			getPreviousScores1(3, frame)
		];
	}
	console.log(returnValue);
	return returnValue;
}

function getPreviousFrames(frameOffset, frame) {
	const targetFrame = `frame${frame - frameOffset}`;
	let score1 = MOCK_POST_DATA[targetFrame].score1;
	let score2 = MOCK_POST_DATA[targetFrame].score2;

	console.log(MOCK_POST_DATA[targetFrame]);
	console.log(targetFrame);
	console.log([score1, score2]);

	return turnIntoStrikesSpares(score1, score2);
}


/* ------------------------------

						END OF
				STORAGE FUNCTIONS


-------------------------------*/

/* ------------------------------

						START OF
		STRIKE INPUT FUNCTIONS


-------------------------------*/

function checkForXXNumber(intValue, value, frame, turn, data) {
	let frameScore, frameScore2, tempData;
	// 'X X 6' or '...X X 6' 
	// Accounts for frames 1 ~ 10
	// Does not count for frame 10 turns 2 and 3
	// 9 10
	// X X6
	if (checkIfSet(data[2]) && checkIfSet(data[4])) {
		if (intValue < 10 && turn == 1 && data[2][0] == 'X' && data[4][0] == 'X') {
			tempData = checkIfSet(data[5]) ? data[5] : 0;
			frameScore = tempData + 20 + intValue;
			renderScoreOnScreen('score', frameScore, 2, frame, turn, intValue);
		}
	}

	// frames 	9 10
	// input 		X X6
	if (checkIfSet(data[2]) && data[3]) {
		if (intValue < 10 && frame == 10 && turn == 2 && data[2][0] == 'X' && data[0][0] == 'X') {
			frameScore = data[3] + 20 + intValue;
			renderScoreOnScreen('score', frameScore, 1, frame, turn, intValue);
		}
	}

	// frames 	10
	// input 		XX6
	if (intValue < 10 && frame == 10 && turn == 3 & data[0][0] == 'X' && data[0][1] == 'X') {
		frameScore = data[1] + 20 + intValue;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, intValue);
	}
}

function checkForXDualNumber(intValue, value, frame, turn, data) {
	let frameScore, frameScore2, tempData;
	// 'X   2 5'
	if (checkIfSet(data[2])) {
		if (intValue < 10 && turn == 2 && data[2][0] == 'X' && data[0][0] !== 'X') {
			// Account for the 1st appearance because it will not have a previous score
			tempData = checkIfSet(data[3]) ? data[3] : 0;
			frameScore = tempData + 10 + data[0][0] + intValue;
			frameScore2 = frameScore + data[0][0] + intValue;
			renderScoreOnScreen('score', frameScore, 1, frame, turn, intValue);
			renderScoreOnScreen('score', frameScore2, 0, frame, turn, intValue);
		}
	}

	// frames 	10
	// input 		X 2 5
	if (intValue < 10 && frame == 10 && turn == 3 && data[0][0] == 'X' && data[0][1] < 10) {
		frameScore = data[1] + 10 + data[0][1] + intValue;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, intValue);
	}
}

function checkForXXX(value, frame, turn, data) {
	let frameScore, frameScore2, tempData;
	// Account for XXX
	if (checkIfSet(data[2]) && checkIfSet(data[4])) {
		if (value == 'X' && turn == 1 && data[2][0] == 'X' && data[4][0] == 'X') {
			tempData = checkIfSet(data[5]) ? data[5] : 0;
			frameScore = tempData + 30;
			renderScoreOnScreen('score', frameScore, 2, frame, turn, value);
		}
	}

	// Account for XXX
	// Account for frame 9 and 10 XXX
	// frames 	9 10
	// input 		X XX
	if (value == 'X' && frame == 10 && turn == 2 && data[2][0] == 'X' && data[0][0] == 'X') {
		frameScore = data[3] + 30;
		renderScoreOnScreen('score', frameScore, 1, frame, turn, value);
	}

	// Account for XXX
	// Account for frame 10
	// frames 	10
	// input 		XXX
	if (value == 'X' && frame == 10 && turn == 3 && data[0][0] == 'X' && data[0][1] == 'X') {
		frameScore = data[1] + 30;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, value);
	}
}

function checkForXSpare(value, frame, turn, data) {
	let frameScore, frameScore2, tempData;
	// Account for X 6/
	if (checkIfSet(data[2])) {
		if (value == '/' && turn == 2 && data[0][0] < 10 && data[2][0] == 'X') {
			tempData = checkIfSet(data[3]) ? data[3] : 0;
			frameScore = tempData + 20;
			renderScoreOnScreen('score', frameScore, 1, frame, turn, value);
		}
	}

	// Account for X 6/
	// Frames 	10
	// Input 		X 6/
	if (value == '/' && frame == 10 && turn == 3 && data[0][1] < 10 && data[0][0] == 'X') {
		tempData = checkIfSet(data[1]) ? data[1] : 0;
		frameScore = tempData + 20;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, value);
	}
}

function calculateStrikeScore(intValue, value, frame, turn, data) {

	checkForXXNumber(intValue, value, frame, turn, data);
	checkForXDualNumber(intValue, value, frame, turn, data);
	checkForXXX(value, frame, turn, data);
	checkForXSpare(value, frame, turn, data);
}

/* ------------------------------

						END OF
		STRIKE INPUT FUNCTIONS


-------------------------------*/


/* ------------------------------

						START OF
		SPARE INPUT FUNCTIONS


-------------------------------*/

function checkForSpareNumber(intValue, value, frame, turn, data) {
	let frameScore, frameScore2, tempData;
	// Account for '6/ 2'
	// dont need to account for 10th frame
	if (checkIfSet(data[2])) {
		if (intValue < 10 && turn == 1 && data[2][0] < 10 && data[2][1] == '/') {
			tempData = checkIfSet(data[3]) ? data[3] : 0;
			frameScore = tempData + 10 + intValue;
			renderScoreOnScreen('score', frameScore, 1, frame, turn, intValue);
		} 
	}

	// Account for '6/ 2'
	// Account for 10th frame
	if (intValue < 10 && frame == 10 && turn == 3 && data[0][0] < 10 && data[0][1] == '/') {
		frameScore = data[1] + 10 + intValue;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, intValue);
	}
}

function checkForSpareStrike(value, frame, turn, data) {
	let frameScore, frameScore2, tempData;
	// Account for '6/ X'
	if (checkIfSet(data[2])) {
		if (value == 'X' && turn == 1 && data[2][0] < 10 && data[2][1] == '/') {
			tempData = checkIfSet(data[3]) ? data[3] : 0;
			frameScore = tempData + 20;
			renderScoreOnScreen('score', frameScore, 1, frame, turn, value);
		}
	}

	// Account for '6/ X'
	// Account for 10th frame appearance
	if (value == 'X' && frame == 10 && turn == 3 && data[0][0] < 10 && data[0][1] == '/') {
		frameScore = data[1] + 20;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, value);
	}
}

function calculateSpareScore(intValue, value, frame, turn, data) {
	let frameScore, frameScore2, tempData;

	checkForSpareNumber(intValue, value, frame, turn, data);
	checkForSpareStrike(value, frame, turn, data);
}

/* ------------------------------

						END OF
		SPARE INPUT FUNCTIONS


-------------------------------*/

/* ------------------------------

						START OF
		OPEN FRAME INPUT FUNCTIONS


-------------------------------*/

function calculateOpenFrameScore(intValue, value, frame, turn, data) {
	let frameScore, frameScore2, tempData;

	// Account for '2 5'
	if (intValue < 10 && turn == 2 && data[0][0] < 10) {
		tempData = checkIfSet(data[1]) ? data[1] : 0;
		frameScore = tempData + data[0][0] + intValue;
		renderScoreOnScreen('score', frameScore, 0, frame, turn, intValue);
	}

}

/* ------------------------------

						END OF
		OPEN FRAME INPUT FUNCTIONS


-------------------------------*/


function deleteScoreChangesByType(type, frame, turn, value, prev) {
	switch (type) {
		case 'strike':
			const totalStrikes = parseInt($('#strikesValue').text()) - 1;
			$('#strikesValue').text(totalStrikes);
			MOCK_POST_DATA.strikes = totalStrikes;
			break;
		case 'spare':
			const totalSpares = parseInt($('#sparesValue').text()) - 1;
			$('#sparesValue').text(totalSpares);
			MOCK_POST_DATA.spares = totalSpares;
			break;
		case 'open':
			const totalOpenFrames = parseInt($('#openFramesValue').text()) - 1;
			$('#openFramesValue').text(totalOpenFrames);
			MOCK_POST_DATA.openFrames = totalOpenFrames;
			break;
		case 'input':
			const screenInput = $(`#frameInput${frame}`).children(`span:nth-child(${turn})`).text();
			if (screenInput == value.toString()) {
				$(`#frameInput${frame}`).children(`span:nth-child(${turn})`).text('');
				currentFrame = frame;
				currentTurn = turn;
			}
			break;
		case 'scoreTop':
			$('#scoreValue').text(prev);
			MOCK_POST_DATA.score = prev;
			break;
		case 'score':
			$(`#frameScore${currentFrame} span`).text();
			break;
	}
}

function findMaxFrameScoreChanges(array, column, type) {
	let max = array.reduce(function(a, b) {
		if (a[column] > b[column] && b[0] == type) {
			return a;
		} else {
			return b;
		}
	});
	return max[column];
}

function findMaxTurnScoreChanges(array, column, frame, type) {
	let max = array.reduce(function(a, b) {
		if (a[1] == frame && a[column] > b[column] && b[0] == type) {
			return a;
		} else {
			return b;
		}
	});
	return max[column];
}

function deleteElementsScoreChanges(frame, turn) {
	let array = scoreChanges.filter(function(item) {
		if (item[1] == frame && item[2] == turn) {
			return false;
		} else {
			return true;
		}
	});
	return array;
}

function searchElementScoreChanges(frame, turn, type) {
	let array = scoreChanges.filter(function(item) {
		if (item[0] == type && item[1] == frame && item[2] == turn) {
			return true;
		} else {
			return false;
		}
	});
	return array;
}


function revertScoreChangesByType(frame, turn, array) {
	let prevScoreTop = 0; 
	let prevScore = 0;
	let prevOpen = 0;
	let prevStrike = 0;
	let prevSpares = 0;
	const targetFrame = `frame${frame}`;

	for (let i = 0; i < array.length; i++) {
		if (array[i][1] == frame && array[i][2] == turn) {
			// Account for scoreTop
			if (array[i][0] == 'scoreTop') {
				$('#scoreValue').text(prevScoreTop);
				MOCK_POST_DATA.score = prevScoreTop;
			} else if (array[i][0] == 'score') {
				$(`#frameScore${frame} span`).text('');
				MOCK_POST_DATA[targetFrame].finalScore = 0;
			} else if (array[i][0] == 'open') {
				$('#openFramesValue').text(prevOpen);
				MOCK_POST_DATA.openFrames = prevOpen;
			} else if (array[i][0] == 'strike') {
				$('#strikesValue').text(prevStrike);
				MOCK_POST_DATA.strikes = prevStrike;
			} else if (array[i][0] == 'spare') {
				$('#sparesValue').text(prevSpares);
				MOCK_POST_DATA.spares = prevSpares;
			} else if (array[i][0] == 'input') {
				$(`#frameInput${frame}`).children(`span:nth-child(${turn})`).text('');
			}
		} else if (array[i][0] == 'scoreTop') {
			prevScoreTop = array[i][3];
		} else if (array[i][0] == 'score') {
			prevScore = array[i][3];
		} else if (array[i][0] == 'open') {
			prevOpen = array[i][3];
		} else if (array[i][0] == 'strike') {
			prevStrike = array[i][3];
		} else if (array[i][0] == 'spare') {
			prevSpares = array[i][3];
		}
	}
	// Account for scoretop

	// Account for score

	// Account for open

	// Account for strike

	// Account for Spares
}

function processBackButton(frame, turn, value) {
	// Position in the array
	// ["input", 1, 1, "5"]
	// [type, frame, turn, value]
	let maxFrame = findMaxFrameScoreChanges(scoreChanges, 1, "input");
	let maxTurn = findMaxTurnScoreChanges(scoreChanges, 2, maxFrame, "input");
	
	// revert last changes (delete elements from the array)
	// then grab max
	// then reapply scores
	// change game object
	// then change frame turn
	let newScoreChanges = deleteElementsScoreChanges(maxFrame, maxTurn);

	revertScoreChangesByType(maxFrame, maxTurn, scoreChanges);
	storeIntoGameObjectScore(maxFrame, maxTurn, 0, returnPreviousDataSet(maxFrame));


	let newMaxFrame = findMaxFrameScoreChanges(newScoreChanges, 1, "input");
	let newMaxTurn = findMaxTurnScoreChanges(newScoreChanges, 2, newMaxFrame, "input");

	currentFrame = maxFrame;
	currentTurn = maxTurn;

	scoreChanges = newScoreChanges;

	let inputElement = searchElementScoreChanges(newMaxFrame, newMaxTurn, "input");
	const lastValue = parseInt(inputElement[0][3]);

	renderInputButtons(lastValue, currentFrame, currentTurn, getPreviousFrames(0, currentFrame)) 
	console.log({
		process: 'processBackButton',
		maxTurn: maxTurn,
		maxFrame: maxFrame,
		newMaxTurn: newMaxTurn,
		newMaxFrame: newMaxFrame,
		currentFrame: currentFrame,
		currentTurn: currentTurn,
		newScoreChanges: newScoreChanges
	});
}

function renderStatsScoreOnScreen(type, frameOffset, frame, turn, frameScore) {
	const prevFrameScore = $('#scoreValue').text();
	storeScoreChangeLocations(type, frameOffset, frame, turn, frameScore, prevFrameScore);
	$('#scoreValue').text(frameScore);
	MOCK_POST_DATA.score = frameScore;
}

function renderStatsMaxOnScreen(value, frame, turn, data) {
	let frameScore; 
	let futureFrame = frame;
	let futureTurn = turn;

	// iterating to the end of the frame
	for (let i = frame; i < 11; i++) {
		if (turn == 2 && data[0][0] < 10) {
			if (data[2][0] == 'X' && value == '/') {
				tempData = checkIfSet(data[3]) ? data[3] : 0;
				frameScore = tempData + 20;
				frame++;
				futureTurn == 1;
			}
		} else if (turn == 1 && data) {

		}	
	}


}

function renderStatsOnScreen(value, frame, turn, data) {
	// grabs the value and checks if its a spare, strike, open frame
	// then updates the status bar at the top
	// updates the current score at the top

	if (value == 'X') {
		const totalStrikes = parseInt($('#strikesValue').text()) + 1;
		$('#strikesValue').text(totalStrikes);
		MOCK_POST_DATA.strikes = totalStrikes;
		storeScoreChangeLocations('strike', 0, frame, turn, totalStrikes);
	} else if (value == '/' && data[0][0] < 10) {
		const totalSpares = parseInt($('#sparesValue').text()) + 1;
		$('#sparesValue').text(totalSpares);
		MOCK_POST_DATA.spares = totalSpares;
		storeScoreChangeLocations('spare', 0, frame, turn, totalSpares);
	} else if (turn == 2 && value < 10 && data[0][0] < 10) {
		const totalOpenFrames = parseInt($('#openFramesValue').text()) + 1;
		$('#openFramesValue').text(totalOpenFrames);
		MOCK_POST_DATA.openFrames = totalOpenFrames;
		storeScoreChangeLocations('open', 0, frame, turn, totalOpenFrames);
	}
}


function renderScoreOnScreen(type, frameScore, frameOffset, frame, turn, value) {
	console.log({
		process: renderScoreOnScreen,
		frameScore: frameScore,
		frameOffset: frameOffset,
		frame: frame,
		turn: turn,
		value
	});
	const targetFrame = `frame${frame - frameOffset}`;
	$(`#frameScore${currentFrame - frameOffset} span`).text(frameScore);
	renderStatsScoreOnScreen('scoreTop', frameOffset, frame, turn, frameScore);
	MOCK_POST_DATA[targetFrame].finalScore = frameScore;
	storeScoreChangeLocations(type, frameOffset, frame, turn, value);
}



function displayCurrentScore2(currentValue, currentFrame, currentTurn) {
	// Get previous scores for calculations
	let previousData = returnPreviousDataSet(currentFrame);
	const intValue = parseInt(currentValue);
	// Logic behind score calculations
	// Just incase changes were made and more calculations need to be made
	// get previousData again
	calculateStrikeScore(intValue, currentValue,currentFrame, currentTurn, previousData);
	previousData = returnPreviousDataSet(currentFrame);
	calculateSpareScore(intValue, currentValue, currentFrame, currentTurn, previousData);
	previousData = returnPreviousDataSet(currentFrame);
	calculateOpenFrameScore(intValue, currentValue, currentFrame, currentTurn, previousData);

	// Strike, Spare, Open Frame
	renderStatsOnScreen(currentValue, currentFrame, currentTurn, previousData);

	// Store user input into Game Object
	storeIntoGameObjectScore(currentFrame, currentTurn, currentValue, previousData);

	
}

function processCurrentFrameTurnForward(value) {
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

function processCurrentFrameTurnBackward(value, data) {
	if (currentFrame == 1 && currentTurn == 2) {
		currentTurn = 1;
	} else if (currentTurn == 1 && data[0][0] == 'X') {
		currentFrame--;
	}
}


function renderUserInputOnScreen(value, frame, turn) {
	$(`#frameInput${frame}`).children(`span:nth-child(${turn})`).text(value);
	storeScoreChangeLocations('input', 0, frame, turn, value);
}

// capture button input
// displayCurrentScore2 -- Process Input, process current frame, turn
// also process back button, next game, 
function handleNumberInputButtonsClick2() {
	$('.gameInput').on('click', '.inputButton', (event) => {
		let value = $(event.currentTarget).text();
		console.log({
			process: 'START',
			value: value,
			currentFrame: currentFrame,
			currentTurn: currentTurn
		});
		if (value == 'Back') {
			processBackButton(currentFrame, currentTurn, value);
		} else {
			displayCurrentScore2(value, currentFrame, currentTurn);
			renderUserInputOnScreen(value, currentFrame, currentTurn);
			processCurrentFrameTurnForward(value);
			renderInputButtons(value, currentFrame, currentTurn, getPreviousFrames(0, currentFrame));
		}
		console.log({
			process: 'END',
			value: value,
			currentFrame: currentFrame,
			currentTurn: currentTurn,
			mock_data_1: MOCK_POST_DATA
		});
	});
}

// working on storing the values into the game object


























// function displayCurrentScore(currentValue, frame, turn) {
// 	// access the scores array and display score
// 	console.log({
// 		process: `displayCurrentScore(${currentValue})`,
// 		currentValue: currentValue,
// 		currentFrame: currentFrame,
// 		currentTurn: currentTurn
// 	});
// 	let currentFrameScore = scores[currentFrame];
// 	let previousScore = parseInt($(`#frameScore${currentFrame - 1} span`).text());
// 	let prev1FrameScore = getPreviousScores(1);
// 	let prev2Score = parseInt($(`#frameScore${currentFrame - 2} span`).text());
// 	let prev2FrameScore = getPreviousScores(2);
// 	let prev3Score = parseInt($(`#frameScore${currentFrame - 3} span`).text());
// 	let prev3FrameScore = getPreviousScores(3);
// 	let previousTurnScore;

// // Tenth frame processing


// 	if ((currentTurn == 2 || currentTurn == 3) && currentFrame !== 1) {
// 		if (currentValue !== '/' && prev1FrameScore[0] !== 'X' && prev1FrameScore[1] !== '/') {
// 			if (currentFrame == 2 && prev1FrameScore[0] == 'X') {
// 				previousScore = 10 + parseInt(currentValue) + parseInt(currentFrameScore[0]);
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				currentScore = previousScore + parseInt(currentValue) + parseInt(currentFrameScore[0]);
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations([-1, 0], frame, turn, currentValue);
// 			} else if (prev1FrameScore[0] == 'X') {
// 				previousScore = prev2Score + parseInt(currentValue) + parseInt(currentFrameScore[0]);
// 			} else {
// 				currentScore = parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]) + previousScore;
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations(0, frame, turn, currentValue);
// 			}
// 		} else if (currentValue == 'X' && currentFrame == 10) {
// 			if (currentTurn == 2 && currentFrameScore[0] == 'X' && prev1FrameScore[0] == 'X') {
// 				previousScore = prev2Score + 30;
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			} else if (currentTurn == 3 && currentFrameScore[0] == 'X' && currentFrameScore[1] == 'X' && currentValue == 'X') {
// 				currentScore = previousScore + 30;
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations(0, frame, turn, currentValue);
// 			} else if (currentTurn == 3 && currentFrameScore[0] < 10 && currentFrameScore[1] == '/') {
// 				currentScore = previousScore + 20;
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations(0, frame, turn, currentValue);
// 			}
// 		// } else if (currentValue == '/' && prev1FrameScore.length == 2 && prev1FrameScore[1] == '/') {
// 			// if (currentFrame < 3) {
// 			// 	previousScore = 10 + parseInt(currentFrameScore[0]);
// 			// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 			// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			// } else if (currentValue == '/' && prev1FrameScore.length == 2) {
// 			// 	previousScore = prev2Score + 10 + parseInt(currentFrameScore[0]);
// 			// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 			// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			// } 
// 		} else if (currentValue == '/' && prev1FrameScore[0] == 'X' && currentTurn == 2) {
// 			previousScore = prev2Score + 20;
// 			$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 			storeScoreChangeLocations(-1, frame, turn, currentValue);
// 		// } else if (currentValue == '/' && prev1FrameScore[1] == '/') { // current problems
// 		// 	previousScore = prev2Score + 10 + parseInt(currentFrameScore[0]);
// 		// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 		// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
// 		// } else if (currentValue < 10 && currentFrameScore[0] == 'X' && currentFrame) {
// 		// 	previousScore = prev2Score + 20 + parseInt(currentFrameScore[1]);
// 		// 	$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 		// 	storeScoreChangeLocations(-1, frame, turn, currentValue);
// 		// } else if (currentValue = '/' && (currentFrameScore[0] == 'X' || currentFrameScore[0] == '/') && (currentFrameScore[1] == 'X' || currentFrame[1] < 10)) {
// 		// 	currentScore = previousScore + 20;
// 		// 	$(`#frameScore${currentFrame} span`).text(currentScore);
// 		// 	storeScoreChangeLocations(0, frame, turn, currentValue);
// 		} else if (currentValue == '/' && currentTurn == 3) {
// 			currentScore = previousScore + 20;
// 			$(`#frameScore${currentFrame} span`).text(currentScore);
// 			StoreScoreChangeLocations(0, frame, turn, currentValue);
// 		} else if (currentValue < 10 && currentFrame != 10) {
// 			currentScore = previousScore + parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
// 			$(`#frameScore${currentFrame} span`).text(currentScore);
// 			storeScoreChangeLocations(0, frame, turn, currentValue);
// 		} else if (currentValue < 10 && currentTurn == 2 && currentFrameScore[0] !== 'X') {
// 			previousScore = prev2Score + 10 + parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
// 			$(`#frameScore${currentFrame -1 } span`).text(previousScore);
// 			currentScore = previousScore + parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
// 			$(`#frameScore${currentFrame} span`).text(currentScore);
// 			storeScoreChangeLocations([-1, 0], frame, turn, currentValue);
// 		} else if (currentValue < 10 && currentTurn == 2) {
// 			previousScore = prev2Score + 20 + parseInt(currentFrameScore[1]);
// 			$(`#frameScore${currentFrame -1 } span`).text(previousScore);
// 			storeScoreChangeLocations(-1, frame, turn, currentValue);
// 		} else if (currentValue < 10 && currentTurn == 3) {
// 			if (currentFrameScore[0] < 10) {
// 				currentScore = previousScore + 10 + parseInt(currentValue);
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations(0, frame, turn, currentValue);
// 			} else if (currentFrameScore[0] == 'X' && currentFrameScore[1] == 'X') {
// 				currentScore = previousScore + 20 + parseInt(currentValue);
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations(0, frame, turn, currentValue);
// 			} else if (currentFrameScore[0] == 'X' && currentFrameScore[1] < 10) {
// 				currentScore = previousScore + 10 + parseInt(currentFrameScore[1]) + parseInt(currentValue);
// 				$(`#frameScore${currentFrame} span`).text(currentScore);
// 				storeScoreChangeLocations(0, frame, turn, currentValue);
// 			}
// 		}
// 	} else if (currentTurn == 2 && currentFrame == 1) {
// 		if (currentValue !== '/') {
// 			currentScore = parseInt(currentFrameScore[0]) + parseInt(currentFrameScore[1]);
// 			$(`#frameScore${currentFrame} span`).text(currentScore);
// 			storeScoreChangeLocations(0, frame, turn, currentValue);
// 		}
// 	} else if (currentTurn == 1 && currentFrame !== 1) {
// 		if (currentValue == 'X' && prev1FrameScore[1] == '/') {
// 			if (currentFrame < 3) {
// 				previousScore = 20;
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			} else if (prev2FrameScore[0] == 'X') {
// 				previousScore = prev2Score + 20;
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			}
// 		} else if (currentValue < 10 && prev1FrameScore[1] == '/') {
// 			if (currentFrame > 2) {
// 				previousScore = prev2Score + 10 + parseInt(currentValue);
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			} else {
// 				previousScore = 10 + parseInt(currentValue);
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			}

// 		} else if (currentValue == 'X' && prev1FrameScore[0] == 'X') {
// 			if (currentFrame == 3 && prev2FrameScore[0] == 'X') {
// 				previousScore = 30;
// 				$(`#frameScore${currentFrame - 2} span`).text(previousScore);
// 				storeScoreChangeLocations(-2, frame, turn, currentValue);
// 			} else if (currentFrame > 3 && prev2FrameScore[0] == 'X') {
// 				previousScore = 30 + prev3Score;
// 				$(`#frameScore${currentFrame - 2} span`).text(previousScore);
// 				storeScoreChangeLocations(-2, frame, turn, currentValue);
// 			} 
// 		} else if (currentValue < 10 && currentFrame > 2) {
// 			if (prev1FrameScore[0] == 'X' && prev2FrameScore[0] == 'X') {
// 				previousScore = prev3Score + 20 + parseInt(currentValue);
// 				$(`#frameScore${currentFrame - 2} span`).text(previousScore);
// 				storeScoreChangeLocations(-2, frame, turn, currentValue);
// 			} else if (prev1FrameScore.length == 2 && prev1FrameScore[1] == '/') {
// 				previousScore = prev2Score + 10 + parseInt(currentValue);
// 				$(`#frameScore${currentFrame - 1} span`).text(previousScore);
// 				storeScoreChangeLocations(-1, frame, turn, currentValue);
// 			}
// 		}
// 	}
// }

// function addInputs() {

// }

// function deleteInputsScores(frame, turn, currentValue) {
// 	const lastChange = scoreChanges.length - 1;
// 	const framesChanged = scoreChanges[lastChange][0]; // maybe an array if multiple
// 	const scoreFrame = scoreChanges[lastChange][1];
// 	const scoreTurn = scoreChanges[lastChange][2];
// 	const scoreValue = scoreChanges[lastChange][3];

// 	if (scoreChanges.length == 1 ) {
// 		if (scoreFrame == frame && scoreTurn == turn) {
// 			$(`#frameScore${scoreFrame + framesChanged} span`).text('');
// 			scoreChanges.splice(lastChange, 1);
// 		}
// 	} else if (scoreChanges.length == 2) {
// 		framesChanged.forEach(item => {
// 			if (scoreFrame == frame && scoreTurn == turn) {
// 				$(`#frameScore${scoreFrame + framesChanged} span`).text('');

// 			}
// 		});
// 		scoreChanges.splice(lastChange, 1);
// 	}
// }

// function handleNumberInputButtonsClick() {
// 	$('.gameInput').on('click', '.inputButton', (event) => {
// 		let value = $(event.currentTarget).text();
// 		// store the scores into the scores array
// 		if (typeof scores[currentFrame] == 'object' && value !== 'Back') {
// 			scores[currentFrame].push(value);
// 		} else if (value !== 'Back') {
// 			scores[currentFrame] = [];
// 			scores[currentFrame].push(value);
// 		}
// 		console.log(scores);
// 		console.log({
// 			process: 'START',
// 			value: value,
// 			currentFrame: currentFrame,
// 			currentTurn: currentTurn
// 		});
// 		if (value == 'Back' && (currentTurn == 2 || currentTurn == 3 || currentTurn == 4)) {
// 			currentTurn--;
// 			returnSetScore(0, 0);
// 			scores[currentFrame].splice(currentTurn, 1);
// 			deleteInputsScores(currentFrame, currentTurn, value);
// 			console.log({
// 				process: `value == "Back" && (currentTurn == 2 || currentTurn == 3)`,
// 				value: value,
// 				currentFrame: currentFrame,
// 				currentTurn: currentTurn,
// 				scoreChanges: scoreChanges
// 			});
// 		} else if (value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') == 'X') {
// 			console.log({
// 				process: `value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') == 'X' ENTERED`
// 			});
// 				currentFrame--;
// 				returnSetScore(0, 0);
// 				scores[currentFrame].splice(currentTurn - 1, 1);
// 				deleteInputsScores(currentFrame, currentTurn, value);
// 				console.log({
// 					process: `value == "Back" && currentTurn == 1 &&`,
// 					value: value,
// 					currentFrame: currentFrame,
// 					currentTurn: currentTurn,
// 					scoreChanges: scoreChanges
// 				});
// 		} else if (value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') < 10) {
// 			console.log({
// 				process: `value == 'Back' && currentTurn == 1 && returnSetScore(1, 0, 'skip') < 10 ENTERED`
// 			});
// 				currentFrame--;
// 				currentTurn++;
// 				returnSetScore(0, 0);
// 				scores[currentFrame].splice(currentTurn - 1, 1);
// 				deleteInputsScores(currentFrame, currentTurn, value);
// 				value = returnSetScore(0, 1, 'skip');
// 				console.log({
// 					process: 'value == "Back" && currentTurn == 1 ELSE',
// 					value: value,
// 					currentFrame: currentFrame,
// 					currentTurn: currentTurn,
// 					scoreChanges: scoreChanges
// 				});
// 		} else if (currentTurn == 1 || currentTurn == 2 || currentTurn == 3) {
// 			console.log({
// 				process: `currentTurn == 1 || currentTurn == 2 ENTERED`
// 			});
// 			returnSetScore(0, 0, value);
// 			// displayCurrentScore(value, currentFrame, currentTurn);
// 			displayCurrentScore2(value, currentFrame, currentTurn);
// 			processCurrentFrameTurn(value);
// 		}
// 		processNumberInputs(currentFrame, currentTurn, value, scores[currentFrame]);
// 		console.log({
// 			process: 'END',
// 			value: value,
// 			currentFrame: currentFrame,
// 			currentTurn: currentTurn,
// 			scoreChanges: scoreChanges
// 		});
// 	});
// }

function mainHandler() {
	processNumberInputs(currentFrame, currentTurn);
	handleNumberInputButtonsClick2();
	processSaveGameButton();
	processClearGameButton();
}


// $(getNumberInputButtons);
$(mainHandler);

function finalizeGameData() {
	// Should be processed during each turn in frame1.strike or whatever
	// Need to clean up this code
	// MOCK_POST_DATA.score = MOCK_POST_DATA.frame10.finalScore;
	// let strikes, spares, openFrames;
	// for (let i = 0; i < 10; i++) {
	// 	let frame = `frame${i + 1}`;
	// 	if (MOCK_POST_DATA[frame].score1)
	// }

}

function processSaveGameButton() {
	// Only show when all the scores have been inputed
	// this function should attach an event handler to the save game button
	// Once the button has been pressed then post the data to api endpoint
	$('#saveGame').on('click', function(event) {
		console.log('saveGame has been clicked');
		event.preventDefault();
		console.log(MOCK_POST_DATA);
		
		$.ajax({
			url: '/api/games',
			data: JSON.stringify(MOCK_POST_DATA),
			contentType: 'application/json',
			traditional: true,
			type: 'post',
			success: function(data) {
				console.log(data);
			},
			error: function(data) {
				console.warn(data.responseText);
				console.log(data);
			}
		});
	});
	// on success redirect to gameList
	// on error show the error on the screen
}


let newGame = {
	"id": "333333",
	"user": 0,
	"score": 0,
	"strikes": 0,
	"spares": 0,
	"openFrames": 0,
};

let newFrame = {"score1": 0,	"score2": 0, "finalScore": 0};
let newTenthFrame = {"score1": 0, "score2": 0,	"score3": 0, "finalScore": 0};

function processClearGameButton() {
	$('#clearGame').on('click', function(event) {
		
		// reset the data
		// clear scoreboard
		MOCK_POST_DATA = Object.assign(newGame);

		for (let i = 1; i < 11; i++) {
			let currentFrame = 'frame' + i;
			if (i == 10) {
				MOCK_POST_DATA[currentFrame] = Object.assign({}, newTenthFrame);
			} else {
				MOCK_POST_DATA[currentFrame] = Object.assign({}, newFrame);
			}

			let frameInput = '#frameInput' + i;
			let frameScore = '#frameScore' + i;
			$(frameInput).find('span').text("");
			$(frameScore).find('span').text("");
		}

		$('#strikesValue').text("0");
		$('#sparesValue').text('0');
		$('#openFramesValue').text('0');
		$('#scoreValue').text('0');
		$('#maxScoreValue').text('300');

		currentFrame = 1;
		currentTurn = 1;
		scores = {};
		currentScore = 0;
		scoreChanges = [];

		processNumberInputs(currentFrame, currentTurn);

		console.log({
			currentFrame: currentFrame,
			currentTurn: currentTurn,
			scores: scores,
			currentScore: currentScore,
			scoreChanges: scoreChanges
		});
		console.log(MOCK_POST_DATA);
		console.log('clear game button has been clicked');
	});

}


// Process the mock data
// add strikes and spares and open frame data
 // redirect on success
 // get current game from ajax call


 // dont need save game 
 // new game should be save game
 // save game should be new game
 // need to copy bowling genius in doing the format
 // 