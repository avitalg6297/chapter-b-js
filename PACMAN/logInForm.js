function validateIogInParameters() {
    let isValid = false;
    const user = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const map = new Map(JSON.parse(localStorage.myMap));
    if (map.has(user)) {
        if (map.get(user) == password) {
            isValid = true;
        }
    }
    return isValid;
}

function ifUserexistStartGame() { //make like story
    const isValidLogParameters = validateIogInParameters()
    if (isValidLogParameters) {
        document.getElementById('gameDiv').style.display = '';
        document.getElementById('signInDiv').style.display = "none";
    } else {
        alert("Username/password incorrect")
    }
}