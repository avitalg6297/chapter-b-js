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


function ifUserExistStartGame() {
    const isValidLogParameters = validateLogInParameters()
    if (isValidLogParameters) {
        document.getElementById('gameMenuDiv').style.display = 'block';
        document.getElementById('signInDiv').style.display = "none";
        preventPageFromRefreshing();
    } else {
        alert("Username/password incorrect");
        preventPageFromRefreshing();
    }
}
