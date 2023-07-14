const context = canvas.getContext("2d");
let shape = new Object();
let ghosts = new Array();
let specialCharacter = new Object();
let board;
let score;
let life = 5;
let pacColor;
const startTime = new Date();;
let timeElapsed;
let interval;
let lastPressedKey;
let specialCharacterHasNotBeenEaten = true;
let ghostInterval;
let spacialCharacterInterval;

function Start() {
	console.log("start()");
	lastPressedKey = 3;
	board = new Array();
	score = 0;
	pacColor = "yellow";
	let countOfUnussedCells = 100;
	let foodRemain = 50;
	let pacmanRemain = 1;
	let ghostRemain = 4;
	let medicationsRemain = 5;
	let specialCharacterRemain = 1;

	for (let i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (let j = 0; j < 10; j++) {
			if (i === 5 && j === 5) {
				board[i][i] = 6;
				specialCharacter.i = i;
				specialCharacter.j = j;
				specialCharacter.k = 0;
				specialCharacterRemain--;
			}
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
	// while (medicationsRemain > 0){
	// 	const emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 7;
	// 	medicationsRemain --;
	// }

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
	console.log(" findRandomEmptyCell");
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
	console.log("GetKeyPressed")
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
	console.log("Draw")
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
				context.fillStyle = "white"; //color     
				context.fill();
			} else if (board[i][j] === 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "pink"; //color
				context.fill();
			} else if (board[i][j] === 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "purple"; //color
				context.fill();
				// } else if (board[i][j] === 7) {
				// 	context.beginPath();
				// 	context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				// 	context.fillStyle = "blue"; //color
				// 	context.fill();
			}
		}
	}
}

function UpdatePosition() {
	console.log(" UpdatePosition() ")
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
		score = score - 10;
		life--;
	}
	if (board[shape.i][shape.j] === 6) {
		score = score + 50;
		specialCharacter.i = undefined;
		specialCharacter.j = undefined;
		specialCharacterHasNotBeenEaten = false;
	// } if (board[shape.i][shape.j] === 7) {
	// 	life++;
	}

	board[shape.i][shape.j] = 2;

	if (specialCharacterHasNotBeenEaten) {
		putSpecialScoreCharacterInItsNewPositionANdUpdateCharacterstState(specialCharacter);
	}

	for (let i = 0; i < 4; i++) {
		putGhostInItsNewPositionANdUpdateGhostState(i, specialCharacter, specialCharacterHasNotBeenEaten);
	}

	let currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	if (score >= 20 && timeElapsed <= 10) {
		pacColor = "green";
	}
	if (score === 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	if (life === 0) {
		window.clearInterval(interval);
		window.alert("Game Over");
	} else {
		Draw(lastPressedKey);
	}
}

function putSpecialScoreCharacterInItsNewPositionANdUpdateCharacterstState(specialCharacter) {
	console.log("putSpecialScoreCharacterInItsNewPositionANdUpdateCharacterstState")
	let newSpecialCharacterPosition = specialScoreCharacterAlgorithm(specialCharacter);

	board[specialCharacter.i][specialCharacter.j] = specialCharacter.k;

	newSpecialCharacterPosition.k = board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j];
	specialCharacter.i = newSpecialCharacterPosition.i;
	specialCharacter.j = newSpecialCharacterPosition.j;
	board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j] = 6;
}

function specialScoreCharacterAlgorithm(specialCharacter) {
	console.log("specialScoreCharacterAlgorithm ")
	let newSpecialCharacterPosition = new Object();
	let directionsMapForSpecialCharacter = new Map();
	setDirectionsMapValues(specialCharacter, directionsMapForSpecialCharacter)
	newSpecialCharacterPosition = findNewPositionForSpecialCharacter(directionsMapForSpecialCharacter, newSpecialCharacterPosition, specialCharacter);
	return newSpecialCharacterPosition;
}

function findNewPositionForSpecialCharacter(directionsMapForSpecialCharacter, newSpecialCharacterPosition, specialCharacter) {
	console.log("findNewPositionForSpecialCharacter ")
	let newPositionIsSet = false;
	let countRandom = 0;
	while (!newPositionIsSet) {
		let randomDirection = randomNumber(1, 4);
		let isValidDirection = isValidGhostDirection(directionsMapForSpecialCharacter, randomDirection)
		if (isValidDirection === 1) {
			newSpecialCharacterPosition = detectNewGhostPosition(randomDirection, newSpecialCharacterPosition, specialCharacter)
			if (board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j] != 4 && board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j] != 5 && board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j] != 2) {
				newPositionIsSet = true;
			}
		} else {
			countRandom++;
			if (countRandom == 2) {
				newSpecialCharacterPosition.i = specialCharacter.i;
				newSpecialCharacterPosition.j = specialCharacter.j;
				newPositionIsSet = true;
			}
		}
	}
	return newSpecialCharacterPosition;
}

function ghostAlgorithm(ghost, pacman) {
	console.log("ghostAlgorithm")
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
	console.log("setDirectionsMapValues ")
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
	console.log(" placeGhostInNewPositionIfPacmanIsInSightVertically ")
	if (ghost.i < pacman.i) {
		if (board[ghost.i + 1][ghost.j] != 4 && board[ghost.i + 1][ghost.j] != 5 && board[ghost.i + 1][ghost.j] != 6) {
			newGhostPosition.i = ghost.i + 1;
			newGhostPosition.j = ghost.j;
		}
		else {
			directionsMap.set("Right", 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
	else if (ghost.i > pacman.i) {
		if (board[ghost.i - 1][ghost.j] != 4 && board[ghost.i - 1][ghost.j] != 5 && board[ghost.i - 1][ghost.j] != 6) {
			newGhostPosition.i = ghost.i - 1;
			newGhostPosition.j = ghost.j;
		} else {
			directionsMap.set("Left", 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
}

function placeGhostInNewPositionIfPacmanIsInSighthHorizontally(ghost, pacman, board, newGhostPosition, directionsMap) {
	console.log("placeGhostInNewPositionIfPacmanIsInSighthHorizontally ")
	if (ghost.j < pacman.j) {
		if (board[ghost.i][ghost.j + 1] != 4 && board[ghost.i][ghost.j + 1] != 5 && board[ghost.i][ghost.j + 1] != 6) {
			newGhostPosition.i = ghost.i;
			newGhostPosition.j = ghost.j + 1;
		} else {
			directionsMap.set("Down", 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
	else if (ghost.j > pacman.j) {
		if (board[ghost.i][ghost.j - 1] != 4 && board[ghost.i][ghost.j - 1] != 5 && board[ghost.i][ghost.j - 1] != 6) {
			newGhostPosition.i = ghost.i;
			newGhostPosition.j = ghost.j - 1;
		} else {
			directionsMap.set("Up", 0)
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost);
		}
	}
}

function findNewPositionForGhost(directionsMap, newGhostPosition, ghost) {
	console.log("findNewPositionForGhost ")
	let countRandom = 0;
	let newPositionIsSet = false;
	while (!newPositionIsSet) {
		let randomDirection = randomNumber(1, 4);
		let isValidDirection = isValidGhostDirection(directionsMap, randomDirection)
		console.log("is valid direction == " + isValidDirection)
		if (isValidDirection === 1) {
			newGhostPosition = detectNewGhostPosition(randomDirection, newGhostPosition, ghost)
			if (board[newGhostPosition.i][newGhostPosition.j] != 4 && board[newGhostPosition.i][newGhostPosition.j] != 5 && board[newGhostPosition.i][newGhostPosition.j] != 6) {
				newPositionIsSet = true;
			}
		} else {
			countRandom++;
			if (countRandom == 2) {
				newGhostPosition.i = ghost.i;
				newGhostPosition.j = ghost.j;
				newPositionIsSet = true;
			}
		}
	}
	return newGhostPosition;
}


function putGhostInItsNewPositionANdUpdateGhostState(ghostNumber) {
	console.log("putGhostInItsNewPositionANdUpdateGhostState " + ghostNumber)
	let ghost = ghosts[ghostNumber];
	let newGhostPosition = ghostAlgorithm(ghost, shape);
	board[ghost.i][ghost.j] = ghost.k;
	console.log("ghost number " + ghostNumber + "old position " + ghost.i + "," + ghost.j);

	if (board[newGhostPosition.i][newGhostPosition.j] === 2) {
		newGhostPosition.k = 0;
		pacColor = "red";
		board[newGhostPosition.i][newGhostPosition.j] = 5;
		life --;

		updatePacmanState();
		score--;
	}
	else {
		newGhostPosition.k = board[newGhostPosition.i][newGhostPosition.j];
	}

	ghosts[ghostNumber] = newGhostPosition;
	board[newGhostPosition.i][newGhostPosition.j] = 5;
	console.log("ghost number " + ghostNumber + "new position " + newGhostPosition.i + "," + newGhostPosition.j);
}


function updatePacmanState() {
	console.log("updatePacmanState ")
	const emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
}


function randomNumber(min, max) {
	console.log("randomNumber ")
	return Math.floor(Math.random() * (max - min) + min);
}

function isValidGhostDirection(directionsMap, direction) {
	console.log("isValidGhostDirection ")
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
	console.log("detectNewGhostPosition")
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
