function Draw(direction) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = timeElapsed;
	lblLife.value = life;
	lblUsername.value = JSON.parse(localStorage.getItem("loginUsername"));
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === 2) {

				if (direction === 1) {
					drawPacmanDirection(center, center.x, center.y, 30, 1.65 * Math.PI, 3.30 * Math.PI, center.x + 10, center.y + 5, 5, 0, 2 * Math.PI);
				}
				if (direction === 2) {
					drawPacmanDirection(center, center.x, center.y, 30, 0.65 * Math.PI, 2.30 * Math.PI, center.x + 10, center.y - 10, 5, 0, 2 * Math.PI);
				}
				if (direction === 3) {
					drawPacmanDirection(center, center.x, center.y, 30, 1.15 * Math.PI, 2.80 * Math.PI, center.x, center.y - 15, 5, 0, 2 * Math.PI);
				}
				if (direction === 4) {
					drawPacmanDirection(center, center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI, center.x, center.y - 15, 5, 0, 2 * Math.PI);
				}
			} else if (board[i][j] === 1) {
				drawCharacters(center.x, center.y, 15, 0, 2 * Math.PI, colors.eyeOrfood);
			} else if (board[i][j] === 4) {
				drawObstacle(center.x - 30, center.y - 30, 60, 60, colors.obstacle);
			} else if (board[i][j] === 5) {
				drawCharacters(center.x, center.y, 15, 0, 2 * Math.PI, colors.ghost);
			} else if (board[i][j] === 6) {
				drawCharacters(center.x, center.y, 15, 0, 2 * Math.PI, colors.specialMoovingFood);
			}
		}
	}
}

function drawObstacle(obstacleXCoordinate, obstacleYCoordinate, obstacleWidth, obstacleHight, color) {
	context.beginPath();
	context.rect(obstacleXCoordinate, obstacleYCoordinate, obstacleWidth, obstacleHight);
	context.fillStyle = color; //color     
	context.fill();
}

function drawCharacters(characterXCoordinate, characterYCoordinate, characterRadius, characterStartingAngle, characterEndingEngle, color) {
	context.beginPath();
	context.arc(characterXCoordinate, characterYCoordinate, characterRadius, characterStartingAngle, characterEndingEngle); // circle
	context.fillStyle = color; //color
	context.fill();
}
function drawPacmanDirection(center, pacmanXCoordinate, pacmanYCoordinate, pacmanRadius, pacmanStartingAngle, pacmanEndingEngle,
	pacmanEyeXCoordinate, pacmanEyeYCoordinate, pacmanEyeRadius, pacmanEyeStartingAngle, pacmanEyeEndingEngle) {
	context.beginPath();
	context.arc(pacmanXCoordinate, pacmanYCoordinate, pacmanRadius, pacmanStartingAngle, pacmanEndingEngle); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pacColor; //color
	context.fill();
	context.beginPath();
	context.arc(pacmanEyeXCoordinate, pacmanEyeYCoordinate, pacmanEyeRadius, pacmanEyeStartingAngle, pacmanEyeEndingEngle); // circle
	context.fillStyle = colors.eyeOrfood; //color
	context.fill();
}