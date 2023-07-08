var context = canvas.getContext("2d");
var shape = new Object();
let ghosts = new Array();
var board;
const stack = ["yellow", "blue", "pink", "red"];
var score;
let life = 5;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var last_pressed_key;

Start();

function Start() {
	last_pressed_key = 3;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	let ghost_remain = 4;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
				board[i][j] = 4;
			}
			else if ((i === 0 && j === 0) || (i === 0 && j === 9) || (i === 9 && j === 0) || (i === 9 && j === 9)) {
				if (ghost_remain > 0) {
					let ghost = new Object();
					ghost.i = i;
					ghost.j = j;
					ghost.k = 0;
					board[i][j] = 5;
					ghosts.push(ghost);
					ghost_remain--;
				} else {
					board[i][j] = 0;
				}

			} else if (board[i][j] != 5) {
				var randomNum = Math.random();
				if (randomNum <= 1.0 * food_remain / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;

				}
				else {
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
		last_pressed_key = GetKeyPressed();
		lastKeyPressed = GetKeyPressed();
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.code] = false;
	}, false);
	interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell(board) {
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
}

function Draw(direction, newGhostPosition) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === 2) {
				if (direction === 1) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 3.30 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
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
			} else if (board[i][j] === 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] === 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color     
				context.fill();
			} else if (board[i][j] === 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "pink"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
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
	if (board[shape.i][shape.j] === 5) {
		score--;
		life--;
	}
	board[shape.i][shape.j] = 2;
	let ghost = ghosts[0];
	let newGhostPosition = ghostAlgorithm(ghost, shape);
	board[ghost.i][ghost.j] = ghost.k;
	newGhostPosition.k = board[newGhostPosition.i][newGhostPosition.j];
	ghosts.splice(0, 0, newGhostPosition);
	board[newGhostPosition.i][newGhostPosition.j]= 5;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score === 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(last_pressed_key);
	}
}

function ghostAlgorithm(ghost, pacman) {
	let newGhostPosition = new Object();
	let directionsMap = new Map();
	directionsMap.set("Up", 1);
	directionsMap.set("Down", 1);
	directionsMap.set("Left", 1);
	directionsMap.set("Right", 1);

	if (ghost.i + 1 > 9) {
		directionsMap.set("Right", 0);
	}
	if (ghost.i - 1 < 0) {
		directionsMap.set("Left", 0);
	}
	if (ghost.j + 1 > 9) {
		directionsMap.set("Down", 0);
	}
	if (ghost.j - 1 < 0) {
		directionsMap.set("Up", 0);
	}

	if (ghost.i === pacman.i) {
		if (ghost.j < pacman.j) {
			if (board[ghost.i][ghost.j + 1] != 4) {
				newGhostPosition.i = ghost.i;
				newGhostPosition.j = ghost.j + 1;
			} else {
				directionsMap.set("Down", 0);
				newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
			}
		}
		else if (ghost.j > pacman.j) {
			if (board[ghost.i][ghost.j - 1] != 4) {
				newGhostPosition.i = ghost.i;
				newGhostPosition.j = ghost.j - 1;
			} else {
				directionsMap.set("Up", 0)
				newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
			}
		}
	}
	else if (ghost.j === pacman.j) {
		if (ghost.i < pacman.i) {
			if (board[ghost.i + 1][ghost.j] != 4) {
				newGhostPosition.i = ghost.i + 1;
				newGhostPosition.j = ghost.j;
			}
			else {
				directionsMap.set("Right", 0);
				newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
			}
		}
		else if (ghost.i > pacman.i) {
			if (board[ghost.i - 1][ghost.j] != 4) {
				newGhostPosition.i = ghost.i - 1;
				newGhostPosition.j = ghost.j;
			} else {
				directionsMap.set("Left", 0);
				newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
			}
		}
	}
	else {
		newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
	}

	return newGhostPosition;
}

function findNewPositionForGhost(directionsMap, newGhostPosition, ghost) {
	let newPositionIsSet = false;
	while (!newPositionIsSet) {
		let randomDirection = randomNumber(1, 4);
		let isValidDirection = isValidGhostDirection(directionsMap, randomDirection)
		if (isValidDirection === 1) {
			newGhostPosition = detectNewGhostPosition(randomDirection, newGhostPosition, ghost)
			newPositionIsSet = true;
		}
	}
	return newGhostPosition;
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function isValidGhostDirection(directionsMap, direction) {
	let isValid
	if (direction === 1) {
		isValid = directionsMap.get("Up");
	}
	if (direction === 2) {
		isValid = directionsMap.get("Down");
	}
	if (direction === 3) {
		isValid = directionsMap.get("Left");
	}
	if (direction === 4) {
		isValid = directionsMap.get("Right");
	}
	return isValid
}

function detectNewGhostPosition(direction, newGhostPosition, ghost) {
	if (direction === 1) {
		newGhostPosition.i = ghost.i;
		newGhostPosition.j = ghost.j - 1;
	}
	if (direction === 2) {
		newGhostPosition.i = ghost.i;
		newGhostPosition.j = ghost.j + 1;
	}
	if (direction === 3) {
		newGhostPosition.i = ghost.i - 1;
		newGhostPosition.j = ghost.j;
	}
	if (direction === 4) {
		newGhostPosition.i = ghost.i + 1;
		newGhostPosition.j = ghost.j;
	}
	return newGhostPosition;
}