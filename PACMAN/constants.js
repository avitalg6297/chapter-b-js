const gameMenuUserSettings = {
  defaultNumberOfBalls: 50,
  defaultNumberOfGhosts: 4,
  defaultGameDuration: 60,
  minGameDuration: 60,
  maxGameDuration: 300,
  minGhostsAmount: 1,
  maxGhostsAmount: 4,
  maxBallAmount: 50,
  minBallAmount: 1
}

const gamePlaySettings = {
  initialLifeAmount: 5,
  initialPacmanDiraction: 3,
  initialScore: 0,
  initialFreeCellsCount: 100,
  cellValueForPacmanCharacter: 2,
  cellValueForGhostCharacter: 5,
  cellValueForObstacle: 4,
  cellValueForFood: 1,
  cellValueForSpecialMoovingFood: 6,
  cellValueForEmptyCell: 0,
  arrowUpKeyValue: 1,
  arrowDownKeyValue: 2,
  arrowLeftKeyValue: 3,
  arrowRightKeyValue: 4,
  directionIsValid: 1,
  directionIsInvalid: 0
}

const characterMoovinfDirection = {
  up: 1,
  down: 2,
  left: 3,
  right: 4,
}

const arrowKeyPressedDirections = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight'
}

const updatePositionInterval = {
  time: 250
}

const keyState = {
  up: "keyup",
  down: "keydown"
}

const colors = {
  pacman: 'yellow',
  hitByAGhostPacman : 'red',
  winPacman : "green",
  eyeOrfood: 'black',
  obstacle: 'white',
  specialMoovingFood: 'purple',
  ghost: 'pink'
}