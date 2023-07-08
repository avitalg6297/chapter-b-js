// TODO: typo - validateLogInParameters
// TODO: receive the log in parameters as the function arguments, and maybe create a separate function whose purpose is to extract the credentials from the current document
function validateIogInParameters() {
    let isValid = false;
    const user = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const map = new Map(JSON.parse(localStorage.myMap));

    // TODO: do not use ==, use === instead.
    // TODO: return map.has(user) && map.get(user) === password

    if (map.has(user)) {
        if (map.get(user) == password) {
            isValid = true;
        }
    }
    return isValid;
}

// TODO: 'ifUserExists' is what the 'validateLogiInParameters' verifies(sort of), the name of the current function should not describe the implementation details of the functions it uses
function ifUserExistStartGame() { //make like story
    const isValidLogParameters = validateIogInParameters()
    if (isValidLogParameters) {
        document.getElementById('gameDiv').style.display = '';
        document.getElementById('signInDiv').style.display = "none";
        window.addEventListener('beforeunload', (event) => {
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = '';
          });
    } else {
        alert("Username/password incorrect")
    }
}