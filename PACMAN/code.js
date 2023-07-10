const context = canvas.getContext("2d");
let shape = new Object();
let ghosts = new Array();
let board;
const stack = ["yellow", "blue", "pink", "red"];
let score;
let life = 5;
let pacColor;
const startTime = new Date();;
let timeElapsed;
let interval;
let lastPressedKey;

Start();

function Start() {
	lastPressedKey = 3;
	board = new Array();
	score = 0;
	pacColor = "yellow";
	let countOfUnussedCells = 100;
	let foodRemain = 50;
	let pacmanRemain = 1;
	let ghostRemain = 4;

	for (let i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (let j = 0; j < 10; j++) {
			if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
				board[i][j] = 4;
			}
			else if ((i === 0 && j === 0) || (i === 0 && j === 9) || (i === 9 && j === 0) || (i === 9 && j === 9)) {
				if (ghostRemain > 0) {
					let ghost = new Object();
					ghost.i = i;
					ghost.j = j;
					ghost.k = 0;
					board[i][j] = 5;
					ghosts.push(ghost);
					ghostRemain--;
				} else {
					board[i][j] = 0;
				}

			} else if (board[i][j] != 5) {
				const randomNum = Math.random();
				if (randomNum <= 1.0 * foodRemain / countOfUnussedCells) {
					foodRemain--;
					board[i][j] = 1;
				} else if (randomNum < 1.0 * (pacmanRemain + foodRemain) / countOfUnussedCells) {
					shape.i = i;
					shape.j = j;
					pacmanRemain--;
					board[i][j] = 2;

				}
				else {
					board[i][j] = 0;
				}
				countOfUnussedCells--;
			}
		}
	}
	while (foodRemain > 0) {
		const emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		foodRemain--;
	}
	keysDown = {};
	addEventListener("keydown", function (e) {
		pacColor = "yellow";
		keysDown[e.code] = true;
		lastPressedKey = GetKeyPressed();
		lastKeyPressed = GetKeyPressed();
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.code] = false;
	}, false);
	interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell(board) {
	let i = Math.floor((Math.random() * 9) + 1);
	let j = Math.floor((Math.random() * 9) + 1);
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

function Draw(direction) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = timeElapsed;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === 2) {

				if (direction === 1) {
					context.beginPath();
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 3.30 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
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
					context.fillStyle = pacColor; //color
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
					context.fillStyle = pacColor; //color
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
					context.fillStyle = pacColor; //color
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
	let x = GetKeyPressed();
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


	putGhostInItsNewPositionANdUpdateGhostState(0);

	let currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	if (score >= 20 && E <= 10) {
		pacColor = "green";
	}
	if (score === 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(lastPressedKey);
	}
}

function ghostAlgorithm(ghost, pacman) {
	let newGhostPosition = new Object();
	let directionsMap = new Map();

	setDirectionsMapValues(ghost, directionsMap)

	if (ghost.i === pacman.i) {
		placeGhostInNewPositionIfPacmanIsInSighthHorizontally(ghost, pacman, board, newGhostPosition, directionsMap)
	}
	else if (ghost.j === pacman.j) {
		placeGhostInNewPositionIfPacmanIsInSightVertically(ghost, pacman, newGhostPosition, board, directionsMap)
	}
	else {
		newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
	}

	return newGhostPosition;
}

function setDirectionsMapValues(ghost, directionsMap) {
	if (ghost.i + 1 > 9) {
		directionsMap.set("Right", 0);
	} else {
		directionsMap.set("Right", 1);
	}

	if (ghost.i - 1 < 0) {
		directionsMap.set("Left", 0);
	} else {
		directionsMap.set("Left", 1);
	}

	if (ghost.j + 1 > 9) {
		directionsMap.set("Down", 0);
	} else {
		directionsMap.set("Down", 1);
	}

	if (ghost.j - 1 < 0) {
		directionsMap.set("Up", 0);
	} else {
		directionsMap.set("Up", 1);
	}
}

function placeGhostInNewPositionIfPacmanIsInSightVertically(ghost, pacman, newGhostPosition, board, directionsMap) {
	if (ghost.i < pacman.i) {
		if (board[ghost.i + 1][ghost.j] != 4 && board[ghost.i + 1][ghost.j] != 5) {
			newGhostPosition.i = ghost.i + 1;
			newGhostPosition.j = ghost.j;
		}
		else {
			directionsMap.set("Right", 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
	else if (ghost.i > pacman.i) {
		if (board[ghost.i - 1][ghost.j] != 4 && board[ghost.i - 1][ghost.j] != 5) {
			newGhostPosition.i = ghost.i - 1;
			newGhostPosition.j = ghost.j;
		} else {
			directionsMap.set("Left", 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
}

function placeGhostInNewPositionIfPacmanIsInSighthHorizontally(ghost, pacman, board, newGhostPosition, directionsMap) {
	if (ghost.j < pacman.j) {
		if (board[ghost.i][ghost.j + 1] != 4 && board[ghost.i][ghost.j + 1] != 5) {
			newGhostPosition.i = ghost.i;
			newGhostPosition.j = ghost.j + 1;
		} else {
			directionsMap.set("Down", 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
	else if (ghost.j > pacman.j) {
		if (board[ghost.i][ghost.j - 1] != 4 && board[ghost.i][ghost.j - 1] != 5) {
			newGhostPosition.i = ghost.i;
			newGhostPosition.j = ghost.j - 1;
		} else {
			directionsMap.set("Up", 0)
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
}

function findNewPositionForGhost(directionsMap, newGhostPosition, ghost) {
	let newPositionIsSet = false;
	while (!newPositionIsSet) {
		let randomDirection = randomNumber(1, 4);
		let isValidDirection = isValidGhostDirection(directionsMap, randomDirection)
		if (isValidDirection === 1) {
			newGhostPosition = detectNewGhostPosition(randomDirection, newGhostPosition, ghost)
			if (board[newGhostPosition.i][newGhostPosition.j] != 4 && board[newGhostPosition.i][newGhostPosition.j] != 5) {
				newPositionIsSet = true;
			}
		}
	}
	return newGhostPosition;
}


function putGhostInItsNewPositionANdUpdateGhostState(ghostNumber) {
		let ghost = ghosts[ghostNumber];
		let newGhostPosition = ghostAlgorithm(ghost, shape);
		board[ghost.i][ghost.j] = ghost.k;

		if (board[newGhostPosition.i][newGhostPosition.j] === 2) {
			newGhostPosition.k = 0;
			pacColor = "red";
			board[newGhostPosition.i][newGhostPosition.j] = 5;

			updatePacmanState()
			score--;
		}
		else {
			newGhostPosition.k = board[newGhostPosition.i][newGhostPosition.j];
		}
		ghosts.splice(ghostNumber, 0, newGhostPosition);
		board[newGhostPosition.i][newGhostPosition.j] = 5;
	}


function updatePacmanState() {
	const emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
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