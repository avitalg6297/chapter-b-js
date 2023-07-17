let messageForInvalidFieldsOnSettingsForm = new Array();
messageForInvalidFields.push("There were some probloms with your settings form: ");

function settingsValidate() {
    let isNumberOfBallsValid = numberOfBallsValidate();
    let isgameDurationValidateValid = gameDurationValidate();
    let isnumberOfGhostsValid = numberOfGhostsValidate();

    if (isNumberOfBallsValid && isgameDurationValidateValid && isnumberOfGhostsValid) {
        startGameWithSettings();
    } else {
        let messageForInvalidFieldsAsString = messageForInvalidFieldsOnSettingsForm.reduce(function (pre, next) {
            return pre + '  ' + next;
        });
        alert(messageForInvalidFieldsAsString);
        preventPageFromRefreshing();

    }
}


function numberOfBallsValidate() {
    const stringToValidate = document.getElementById("balls").value;
    if (stringToValidate != '' && (stringToValidate > gameMenuUserSettings.maxBallAmount || stringToValidate < gameMenuUserSettings.minBallAmount)) {
        messageForInvalidFieldsOnSettingsForm.push("number of balls must be 50 or less.");
        return false;
    } else {
        return true;
    }
}

function gameDurationValidate() {
    const stringToValidate = document.getElementById("gameDuration").value;
    if (stringToValidate != '' && (stringToValidate < gameMenuUserSettings.minGameDuration || stringToValidate > gameMenuUserSettings.maxGameDuration)) {
        messageForInvalidFieldsOnSettingsForm.push("game duration must be between 60 to 300 seconds.");
        return false;
    } else {
        return true;
    }
}

function numberOfGhostsValidate() {
    const stringToValidate = document.getElementById("ghosts").value;
    if (stringToValidate != '' && (stringToValidate < gameMenuUserSettings.minGhostsAmount || stringToValidate > gameMenuUserSettings.maxGhostsAmount)) {
        messageForInvalidFieldsOnSettingsForm.push("number of ghosts must be between 1 and 4.");
        return false;
    } else {
        return true;
    };
}


function startGameWithSettings() {
    let numberOfBalls = document.getElementById("balls").value;
    if (numberOfBalls == '') {
        numberOfBalls = gameMenuUserSettings.defaultNumberOfBalls;
    }
    let gameDuration = document.getElementById("gameDuration").value;
    if (gameDuration == '') {
        gameDuration = gameMenuUserSettings.defaultGameDuration;
    }
    let numberOfGhosts = document.getElementById("ghosts").value;
    if (numberOfGhosts == '') {
        numberOfGhosts = gameMenuUserSettings.defaultNumberOfGhosts;
    }
    document.getElementById('gameDiv').style.display = 'block';
    document.getElementById('settingsDiv').style.display = "none";
    Start(numberOfBalls, numberOfGhosts, gameDuration);
}

