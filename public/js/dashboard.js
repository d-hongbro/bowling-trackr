/*




Needs to process the button click on this page to start a new game

create a new game object
then redirect to the newly created game
game/:id










*/

const MOCK_POST_RETURN_RESPONSE = {
			"id": "333333",
			"frame1": {
				"pins1": [],
				"score1": 0,
				"pins2": [],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0

			},
			"frame2": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame3": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame4": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame5": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame6": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame7": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame8": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame9": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"frame10": {
				"pins1": [],
				"score1": 0,
				"pins2":[],
				"score2": 0,
				"finalScore": 0,
				"strike": 0,
				"spare": 0
			},
			"score": 0,
			"strikes": 0,
			"spares": 0,
			"openFrames": 0,
		};

function redirectToID(id) {
	// redirect function
	const currentURL = window.location;
	window.location.replace(`${currentURL}game/${id}`);
}

function newGameCallBack(data = MOCK_POST_RETURN_RESPONSE) {
	// callback function for request new game
	// return id for redirect
	redirectToID(data.id);
}

function requestNewGame() {
	// request new game AJAX call to endpoint
	newGameCallBack();
}

function handleNewGameButtonClick() {
	$('#newGame').on('click', (event) => {
		event.preventDefault();
		console.log('New Game button was clicked');
		requestNewGame();
	}); 
}

$(handleNewGameButtonClick);