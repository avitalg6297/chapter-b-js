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
    if (stringToValidate != '' && stringToValidate > 50) {
        messageForInvalidFieldsOnSettingsForm.push("number of balls must be 50 or less.");
        return false;
    } else {
        return true;
    }
}

function gameDurationValidate() {
    const stringToValidate = document.getElementById("gameDuration").value;
    if (stringToValidate != '' && (stringToValidate < 60 || stringToValidate > 300)) {
        messageForInvalidFieldsOnSettingsForm.push("game duration must be between 60 to 300 seconds.");
        return false;
    } else {
        return true;
    }
}

function numberOfGhostsValidate() {
    const stringToValidate = document.getElementById("ghosts").value;
    if (stringToValidate != '' && (stringToValidate < 1 || stringToValidate > 4)) {
        messageForInvalidFieldsOnSettingsForm.push("number of ghosts must be between 1 and 4.");
        return false;
    } else {
        return true;
    };
}

function addUsersChoiseToLocalStorage(valueInLocalStorage, usersChoise, collectionName) {
    if (valueInLocalStorage != null) {
        localStorage.removeItem(collectionName);
    }
    localStorage.setItem(collectionName, JSON.stringify(usersChoise));
}

function startGameWithSettings() {
    let numberOfBalls = document.getElementById("balls").value;
    if (numberOfBalls == '') {
        numberOfBalls = 50;
    }
    let gameDuration = document.getElementById("gameDuration").value;
    if (gameDuration == '') {
        gameDuration = 60;
    }
    let numberOfGhosts = document.getElementById("ghosts").value;
    if (numberOfGhosts == '') {
        numberOfGhosts = 4;
    }
    document.getElementById('gameDiv').style.display = 'block';
    document.getElementById('settingsDiv').style.display = "none";
    Start(numberOfBalls, numberOfGhosts, gameDuration);
    preventPageFromRefreshing();
}

