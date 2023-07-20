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
  pacman: 'rgb(255,255,0)',
  hitByAGhostPacman : 'rgb(255,0,0)',
  winPacman : 'rgb(0,128,0)',
  eyeOrfood: 'rgb(0,0,0)',
  obstacle: 'rgb(255,255,255)',
  specialMoovingFood: 'rgb(128,0,128)',
  ghost: 'rgb(255,20,147)'
}