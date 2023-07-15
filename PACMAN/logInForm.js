function validateLogInParameters() {
    let isValid = false;
    const user = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const map = new Map(JSON.parse(localStorage.myMap));
    if (map.has(user)) {
        if (map.get(user) == password) {
            const logedInUserFromLocalStorage = JSON.parse(localStorage.getItem("loginUsername"));
            addLogedInUsernameToLocalStorage(logedInUserFromLocalStorage, user,"loginUsername")
            isValid = true;
        }
    }
    return isValid;
}

function addLogedInUsernameToLocalStorage(valueInLocalStorage, usersChoise, collectionName) {
    if (valueInLocalStorage != null) {
        localStorage.removeItem(collectionName);
    }
    localStorage.setItem(collectionName, JSON.stringify(usersChoise));
}

function ifUserExistStartGame() { //make like story
    const isValidLogParameters = validateLogInParameters()
    if (isValidLogParameters) {
        document.getElementById('gameMenuDiv').style.display = 'block';
        document.getElementById('signInDiv').style.display = "none";
        window.addEventListener('beforeunload', (event) => {
            window.onbeforeunload = null;
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = '';
          });
    } else {
        alert("Username/password incorrect");
        window.addEventListener('beforeunload', (event) => {
            window.onbeforeunload = null;
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = '';
          });
    }
}
