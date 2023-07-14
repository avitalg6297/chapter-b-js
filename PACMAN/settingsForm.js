function settingsValidate() {
    let isNumberOfBallsValid = numberOfBallsValidate();
    let isgameDurationValidateValid = gameDurationValidate();
    let isnumberOfGhostsValid = numberOfGhostsValidate();

    if (isNumberOfBallsValid && isgameDurationValidateValid && isnumberOfGhostsValid) {
        setValuesToLocalStorageIfTheyWereMadeByUserOtherwiseSetDafault();
        startGameWithSettings();
    }
}

function numberOfBallsValidate() {
    const stringToValidate = document.getElementById("balls").value;
    if (stringToValidate != '' && stringToValidate > 50) {
        alert("Number of balls must be 50 or less");
        return false;
    } else {
        return true;
    }
}

function gameDurationValidate() {
    const stringToValidate = document.getElementById("gameDuration").value;
    if (stringToValidate != '' && (stringToValidate < 60 || stringToValidate > 300)) {
        alert("Game duration must be between 60 to 300 seconds");
        return false;
    } else {
        return true;
    }
}

function numberOfGhostsValidate() {
    const stringToValidate = document.getElementById("ghosts").value;
    if (stringToValidate != '' && (stringToValidate < 1 || stringToValidate > 4)) {
        alert("Number of ghosts must be between 1 and 4");
        return false;
    } else {
        return true;
    };
}

function setValuesToLocalStorageIfTheyWereMadeByUserOtherwiseSetDafault() {
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
    if (typeof (Storage) !== "undefined") {
        const numberOfBallsFromLocalStorage = JSON.parse(localStorage.getItem("numberOfBalls"));
        const gameDurationFromLocalStorage = JSON.parse(localStorage.getItem("gameDuration"));
        const numberOfGhostsFromLocalStorage = JSON.parse(localStorage.getItem("numberOfGhosts"));
        addUsersChoiseToLocalStorage(numberOfBallsFromLocalStorage, numberOfBalls, "numberOfBalls");
        addUsersChoiseToLocalStorage(gameDurationFromLocalStorage, gameDuration, "gameDuration");
        addUsersChoiseToLocalStorage(numberOfGhostsFromLocalStorage, numberOfGhosts, "numberOfGhosts");

    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}


function addUsersChoiseToLocalStorage(valueInLocalStorage, usersChoise, collectionName) {
    if (valueInLocalStorage != null) {
        localStorage.removeItem(collectionName);
    }
    localStorage.setItem(collectionName, JSON.stringify(usersChoise));
}

function startGameWithSettings(){
    document.getElementById('gameDiv').style.display = 'block';
        document.getElementById('settingsDiv').style.display = "none";
        Start();
        window.addEventListener('beforeunload', (event) => {
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = '';
          });
}

