// TODO: use either 'let' or 'const' - do not use 'var'
var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed; // TODO: in what units?
var interval; // TODO: rename this to something like 'gameTickIntervalId', the current name is horrible as it is easy to assume you are talking about time units (as it comes after 'time_elapsed')
var last_pressed_key;

Start();

// TODO: functions should start with lower case
function Start() {
	last_pressed_key = 3;
	board = new Array(); // TODO: board = []
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array(); // TOOD: board[i] = []
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			// Extract the obstacle coordinates to an array, and check if your current coordinate is part of the obstacle coordinates array
			if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= 1.0 * food_remain / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.code] = true;
		// TODO: why do we have 'last_pressed_key' and 'lastKeyPressed'? Seems a bit redundant
		last_pressed_key = GetKeyPressed();
		lastKeyPressed = GetKeyPressed();
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.code] = false;
	}, false);
	interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell(board) {
	// TODO: extract the board size to a constant
	// TOOD: if your board is mostly full - this may be a an expensive approach to take, the cheaper option could be to keep the free indexes and return a random element
	var i = Math.floor((Math.random() * 9) + 1);
	var j = Math.floor((Math.random() * 9) + 1);
	while (board[i][j] !== 0) {
		i = Math.floor((Math.random() * 9) + 1);
		j = Math.floor((Math.random() * 9) + 1);
	}
	return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
	// Suggestion: 
	// const arrowKeysMapping = {
	// 	'ArrowUp': 1,
	// 	'ArrowDown': 2,
	// 	'ArrowLeft': 3,
	// 	'ArrowRight': 4
	// }

	// on key down
	// last_key_down = arrowKeysMapping[e.code]

	// on key up
	// last_key_down = 'none'

	// return arrowKeysMapping[last_key_down]

	if (keysDown['ArrowUp']) {
		return 1;
	}
	if (keysDown['ArrowDown']) {
		return 2;
	}
	if (keysDown['ArrowLeft']) {
		return 3;
	}
	if (keysDown['ArrowRight']) {
		return 4;
	}

	// TODO : do not return 'undefined' implicitly, either to it explicitly or return a special value for 'no key'
}

// TODO: convert to lowercase
function Draw(direction) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			//TODO : // var center = { x: i * 60 + 30, y : j * 60 + 30}
			var center = new Object(); // var center = { x: i * 60 + 30, y : j * 60 + 30}
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === 2) { // TODO: I guess 2 is the code for pacman, but pleae move it to a constnant
				// TODO: extract the code inside the 'if' statements to a function to remove code duplication
				if (direction === 1) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 3.30 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color // TODO: 'color' is a rather useless comment
					context.fill();
					context.beginPath();
					context.arc(center.x + 10, center.y + 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (direction === 2) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.30 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 10, center.y - 10, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (direction === 3) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.80 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (direction === 4) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] === 1) { // TODO: move 1 to a constant
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] === 4) { // TODO: move 4 to a constant
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

// TODO: lowerase function name
// TODO: split this function into multiple ones, 'updatePosition' should not have side effects such as ending the game
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	// TODO : use lastKeyPressed instead of 'x'
	var x = GetKeyPressed();
	lastKeyPressed = x;
	if (x === 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
			shape.j--;
		}
	}
	if (x === 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
			shape.j++;
		}
	}
	if (x === 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
			shape.i--;
		}
	}
	if (x === 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] === 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	// TODO: what is the logic behind this - if we reached score 20 before 10 seconds passed, or if during any 10 seconds of the game we increased the score by 20? The 2nd option won't work
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score === 50) { // TODO: move 50 to a constant
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(last_pressed_key);
	}
}