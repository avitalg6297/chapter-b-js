function UpdatePosition() {
	let gameDuration = JSON.parse(localStorage.getItem("gameDuration"));
	console.log(gameDuration)
	board[shape.i][shape.j] = 0;

	movePacmanTodesiredPlaceByUser();

	givePointToPacmanAccordingToItsMove();

	board[shape.i][shape.j] = gamePlaySettings.cellValueForPacmanCharacter;

	if (specialCharacterHasNotBeenEaten) {
		putSpecialScoreCharacterInItsNewPosition(specialCharacter);
	}

	for (let i = 0; i < ghosts.length; i++) {
		putGhostInItsNewPosition(i, specialCharacter, specialCharacterHasNotBeenEaten);
	}

	const currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	console.log("timeElapsed  " + timeElapsed);
	if (score >= 20 && timeElapsed <= 10) {
		pacColor = colors.winPacman;
	}
	if (score === 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	if (life <= 0 || timeElapsed >= gameDuration) {
		window.clearInterval(interval);
		window.alert("Game Over");
	} else {
		Draw(lastPressedKey);
	}
}

function givePointToPacmanAccordingToItsMove() {
	if (board[shape.i][shape.j] === gamePlaySettings.cellValueForFood) {
		score++;

	}
	if (board[shape.i][shape.j] === gamePlaySettings.cellValueForGhostCharacter) {
		score = score - 10;
		life--;
	}
	if (board[shape.i][shape.j] === gamePlaySettings.cellValueForSpecialMoovingFood) {
		score = score + 50;
		specialCharacter.i = undefined;
		specialCharacter.j = undefined;
		specialCharacterHasNotBeenEaten = false;
	}
}

function movePacmanTodesiredPlaceByUser() {
	const lastKeyPressed = GetKeyPressed();
	if (lastKeyPressed === characterMoovinfDirection.up) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] !== gamePlaySettings.cellValueForObstacle) {
			shape.j--;
		}
	}
	if (lastKeyPressed === characterMoovinfDirection.down) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] !== gamePlaySettings.cellValueForObstacle) {
			shape.j++;
		}
	}
	if (lastKeyPressed === characterMoovinfDirection.left) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] !== gamePlaySettings.cellValueForObstacle) {
			shape.i--;
		}
	}
	if (lastKeyPressed === characterMoovinfDirection.right) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] !== gamePlaySettings.cellValueForObstacle) {
			shape.i++;
		}
	}

}

function putSpecialScoreCharacterInItsNewPosition(specialCharacter) {
	let newSpecialCharacterPosition = specialScoreCharacterAlgorithm(specialCharacter);

	board[specialCharacter.i][specialCharacter.j] = specialCharacter.k;

	newSpecialCharacterPosition.k = board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j];
	specialCharacter.i = newSpecialCharacterPosition.i;
	specialCharacter.j = newSpecialCharacterPosition.j;
	board[newSpecialCharacterPosition.i][newSpecialCharacterPosition.j] = gamePlaySettings.cellValueForSpecialMoovingFood;
}

function specialScoreCharacterAlgorithm(specialCharacter) {
	let newSpecialCharacterPosition = new Object();
	let directionsMapForSpecialCharacter = new Map();
	setDirectionsMapValues(specialCharacter, directionsMapForSpecialCharacter);
	newSpecialCharacterPosition = findNewPositionForGhost(directionsMapForSpecialCharacter, newSpecialCharacterPosition, specialCharacter, true);
	return newSpecialCharacterPosition;
}

function findNewPositionForGhost(directionsMap, newGhostPosition, ghost, isSpecialCharacter) {
	let countNumberOfAttemptsToFindNewPositionForGhost = 0;
	let newPositionIsSet = false;
	while (!newPositionIsSet) {
		let randomDirection = randomNumber(1, 4);
		let isValidDirection = isValidGhostDirection(directionsMap, randomDirection)
		if (isValidDirection === 1) {
			newGhostPosition = detectNewGhostPosition(randomDirection, newGhostPosition, ghost)
			if (board[newGhostPosition.i][newGhostPosition.j] != gamePlaySettings.cellValueForObstacle && board[newGhostPosition.i][newGhostPosition.j] != gamePlaySettings.cellValueForGhostCharacter) {
				if (isSpecialCharacter) {
					if (board[newGhostPosition.i][newGhostPosition.j] != gamePlaySettings.cellValueForPacmanCharacter) {
						newPositionIsSet = true;
					}
				} else {
					if (board[newGhostPosition.i][newGhostPosition.j] != gamePlaySettings.cellValueForSpecialMoovingFood) {
						newPositionIsSet = true;
					}
				}
			}
		} else {
			countNumberOfAttemptsToFindNewPositionForGhost++;
			if (countNumberOfAttemptsToFindNewPositionForGhost == 2) {
				newGhostPosition.i = ghost.i;
				newGhostPosition.j = ghost.j;
				newPositionIsSet = true;
			}
		}
	}
	return newGhostPosition;
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
		newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost, false);
	}

	return newGhostPosition;
}

function setDirectionsMapValues(ghost, directionsMap) {
	if (ghost.i + 1 > 9) {
		directionsMap.set(arrowKeyPressedDirections.right, 0);
	} else {
		directionsMap.set(arrowKeyPressedDirections.right, 1);
	}

	if (ghost.i - 1 < 0) {
		directionsMap.set(arrowKeyPressedDirections.left, 0);
	} else {
		directionsMap.set(arrowKeyPressedDirections.left, 1);
	}

	if (ghost.j + 1 > 9) {
		directionsMap.set(arrowKeyPressedDirections.down, 0);
	} else {
		directionsMap.set(arrowKeyPressedDirections.down, 1);
	}

	if (ghost.j - 1 < 0) {
		directionsMap.set(arrowKeyPressedDirections.up, 0);
	} else {
		directionsMap.set(arrowKeyPressedDirections.up, 1);
	}
}

function placeGhostInNewPositionIfPacmanIsInSightVertically(ghost, pacman, newGhostPosition, board, directionsMap) {
	if (ghost.i < pacman.i) {
		isNewPositionValidForPlacingGhostAt(ghost.i + 1, ghost.j)
		if (isNewPositionValidForPlacingGhostAt(ghost.i + 1, ghost.j)) {
			newGhostPosition.i = ghost.i + 1;
			newGhostPosition.j = ghost.j;
		}
		else {
			directionsMap.set(arrowKeyPressedDirections.right, 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost, false);
		}
	}
	else if (ghost.i > pacman.i) {
		if (isNewPositionValidForPlacingGhostAt(ghost.i - 1, ghost.j)) {
			newGhostPosition.i = ghost.i - 1;
			newGhostPosition.j = ghost.j;
		} else {
			directionsMap.set(arrowKeyPressedDirections.left, 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost, false);
		}
	}
}

function isNewPositionValidForPlacingGhostAt(i, j) {
	if (board[i][j] != gamePlaySettings.cellValueForObstacle &&
		board[i][j] != gamePlaySettings.cellValueForGhostCharacter &&
		board[i][j] != gamePlaySettings.cellValueForSpecialMoovingFood) {
		return true;
	} else {
		return false;
	}

}

function placeGhostInNewPositionIfPacmanIsInSighthHorizontally(ghost, pacman, board, newGhostPosition, directionsMap) {
	if (ghost.j < pacman.j) {
		if (isNewPositionValidForPlacingGhostAt(ghost.i, ghost.j + 1)) {
			newGhostPosition.i = ghost.i;
			newGhostPosition.j = ghost.j + 1;
		} else {
			directionsMap.set(arrowKeyPressedDirections.down, 0);
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost, false);
		}
	}
	else if (ghost.j > pacman.j) {
		if (isNewPositionValidForPlacingGhostAt(ghost.i, ghost.j - 1)) {
			newGhostPosition.i = ghost.i;
			newGhostPosition.j = ghost.j - 1;
		} else {
			directionsMap.set(arrowKeyPressedDirections.up, 0)
			newGhostPosition = findNewPositionForGhost(directionsMap, newGhostPosition, ghost, false);
		}
	}
}

function putGhostInItsNewPosition(ghostNumber) {
	let ghost = ghosts[ghostNumber];
	let newGhostPosition = ghostAlgorithm(ghost, shape);
	board[ghost.i][ghost.j] = ghost.k;

	if (board[newGhostPosition.i][newGhostPosition.j] === gamePlaySettings.cellValueForPacmanCharacter) {
		newGhostPosition.k = gamePlaySettings.cellValueForEmptyCell;
		pacColor = colors.hitByAGhostPacman;
		board[newGhostPosition.i][newGhostPosition.j] = gamePlaySettings.cellValueForGhostCharacter;
		life--;
		updatePacmanState();
		score--;
	}
	else {
		newGhostPosition.k = board[newGhostPosition.i][newGhostPosition.j];
	}

	ghosts[ghostNumber] = newGhostPosition;
	board[newGhostPosition.i][newGhostPosition.j] = gamePlaySettings.cellValueForGhostCharacter;
}


function updatePacmanState() {
	const emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = gamePlaySettings.cellValueForPacmanCharacter;
}


function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function isValidGhostDirection(directionsMap, direction) {
	let isValid
	if (direction === characterMoovinfDirection.up) {
		isValid = directionsMap.get(arrowKeyPressedDirections.up);
	}
	if (direction === characterMoovinfDirection.down) {
		isValid = directionsMap.get(arrowKeyPressedDirections.down);
	}
	if (direction === characterMoovinfDirection.left) {
		isValid = directionsMap.get(arrowKeyPressedDirections.left);
	}
	if (direction === characterMoovinfDirection.right) {
		isValid = directionsMap.get(arrowKeyPressedDirections.right);
	}
	return isValid
}

function detectNewGhostPosition(direction, newGhostPosition, ghost) {
	if (direction === characterMoovinfDirection.up) {
		newGhostPosition.i = ghost.i;
		newGhostPosition.j = ghost.j - 1;
	}
	if (direction === characterMoovinfDirection.down) {
		newGhostPosition.i = ghost.i;
		newGhostPosition.j = ghost.j + 1;
	}
	if (direction === characterMoovinfDirection.left) {
		newGhostPosition.i = ghost.i - 1;
		newGhostPosition.j = ghost.j;
	}
	if (direction === characterMoovinfDirection.right) {
		newGhostPosition.i = ghost.i + 1;
		newGhostPosition.j = ghost.j;
	}
	return newGhostPosition;
}
