function showSettingsDiv() {
    document.getElementById('settingsDiv').style.display = "block";
    document.getElementById('gameMenuDiv').style.display = "none";
}

function showGameDiv() {
    localStorage.setItem("gameDuration", JSON.stringify(60));
    document.getElementById('gameDiv').style.display = "block";
    document.getElementById('gameMenuDiv').style.display = "none";
    Start(gameMenuUserSettings.defaultNumberOfBalls,gameMenuUserSettings.defaultNumberOfGhosts);
}