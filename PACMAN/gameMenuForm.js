function showSettingsDiv() {
    document.getElementById('settingsDiv').style.display = "block";
    document.getElementById('gameMenuDiv').style.display = "none";
    preventPageFromRefreshing();
}

function showGameDiv() {
    document.getElementById('gameDiv').style.display = "block";
    document.getElementById('gameMenuDiv').style.display = "none";
    Start(50,4,60);
    preventPageFromRefreshing();
}