const context = canvas.getContext("2d");
let shape = new Object();
let ghosts = new Array();
let specialCharacter = new Object();
const startTime = new Date();
let life = 5;
let specialCharacterHasNotBeenEaten = true;
let board;
let score;
let pacColor;
let timeElapsed;
let interval;
let lastPressedKey;
let ghostInterval;
let spacialCharacterInterval;

function Start(numberOfBalls, numberOfGhosts, gameDuration) {
	lastPressedKey = gamePlaySettings.initialPacmanDiraction;
	board = new Array();
	score = gamePlaySettings.initialScore;
	pacColor = colors.pacman;
	let countOfUnussedCells = gamePlaySettings.initialFreeCellsCount;
	let foodRemain = numberOfBalls;
	let isPacmanSet = false;
	let ghostRemain = numberOfGhosts;

	for (let i = 0; i < 10; i++) {
		board[i] = new Array();
		for (let j = 0; j < 10; j++) {
			let boardMiddleIndex = 5;

			if (i === boardMiddleIndex && j === boardMiddleIndex) {
				board[i][i] = gamePlaySettings.cellValueForSpecialMoovingFood;
				specialCharacter.i = i;
				specialCharacter.j = j;
				specialCharacter.k = gamePlaySettings.cellValueForEmptyCell;
			}
			if (isBoardPositionSavedForObstacle(i, j)) {
				board[i][j] = gamePlaySettings.cellValueForObstacle;
			}
			else if (isBoardPositionSavedForGhost(i,j)) {
				if (ghostRemain > 0) {
					let ghost = new Object();
					ghost.i = i;
					ghost.j = j;
					ghost.k = gamePlaySettings.cellValueForEmptyCell;
					board[i][j] = gamePlaySettings.cellValueForGhostCharacter;
					ghosts.push(ghost);
					ghostRemain--;
				} else {
					board[i][j] = gamePlaySettings.cellValueForEmptyCell;
				}

			} else if (board[i][j] != gamePlaySettings.cellValueForGhostCharacter) {
				const randomNum = Math.random();
				if(!isPacmanSet){
					shape.i = i;
					shape.j = j;
					isPacmanSet = true;
					board[i][j] = gamePlaySettings.cellValueForPacmanCharacter;
				}
			    else if(randomNum <= foodRemain / countOfUnussedCells) {
					foodRemain--;
					board[i][j] = gamePlaySettings.cellValueForFood;
				}
				else {
					board[i][j] = gamePlaySettings.cellValueForEmptyCell;
				}
				countOfUnussedCells--;
			}
		}
	}

	while (foodRemain > 0) {
		const emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = gamePlaySettings.cellValueForFood;
		foodRemain--;
	}
	keysDown = {};
	addEventListener(keyState.down, function (e) {
		pacColor = colors.pacman;
		keysDown[e.code] = true;
		lastPressedKey = GetKeyPressed();
	}, false);
	addEventListener(keyState.up, function (e) {
		keysDown[e.code] = false;
	}, false);
	interval = setInterval(UpdatePosition, updatePositionInterval.time);
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
	if (keysDown[arrowKeyPressedDirections.up]) {
		return 1;
	}
	if (keysDown[arrowKeyPressedDirections.down]) {
		return 2;
	}
	if (keysDown[arrowKeyPressedDirections.left]) {
		return 3;
	}
	if (keysDown[arrowKeyPressedDirections.right]) {
		return 4;
	}
}

function isBoardPositionSavedForObstacle(i, j) {
	if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
		return true;
	} else {
		return false;
	}
}

function isBoardPositionSavedForGhost(i,j) {
	if ((i === 0 && j === 0) || (i === 0 && j === 9)
		|| (i === 9 && j === 0) || (i === 9 && j === 9)) {
		return true
	} else {
		return false;
	}
}