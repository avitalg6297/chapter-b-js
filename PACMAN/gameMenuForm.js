function showSettingsDiv() {
    document.getElementById('settingsDiv').style.display = "block";
    document.getElementById('gameMenuDiv').style.display = "none";
    window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
      });
}

function showGameDiv() {
    document.getElementById('gameDiv').style.display = "block";
    document.getElementById('gameMenuDiv').style.display = "none";
    Start(50,4,60);
    window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
      });
}