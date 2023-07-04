function validateIogInParameters() {
    let isValid = false;
    let user = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    map = new Map(JSON.parse(localStorage.myMap));
    map.forEach((value, key) => {
        if (key === user && value === password) {
            isValid = true;
        }
    });
    return isValid;
}

function startGame() {
    let isValidLogParameters = validateIogInParameters()
    if (isValidLogParameters) {
        document.getElementById('gameDiv').style.display = "block";
        document.getElementById('signInDiv').style.display = "none";
    }else{
        alert("Username/password incorrect")
    }
}