function addUsernameAndPasswordToLocalStorage() {
    let userNameExist = false;
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (typeof (Storage) !== "undefined") {
        let userNamesCollection = JSON.parse(localStorage.getItem("userNamesCollection"));
        if (userNamesCollection != null) {
            let arrayLength = userNamesCollection.length;
            for (let i = 0; i < arrayLength; i++) {
                if (userNamesCollection[i] === user) {
                    userNameExist = true;
                    alert("User name already exist");
                    document.register.username.focus();
                }
            }
            if (userNameExist === false) {
                userNamesCollection.push(user);
                localStorage.setItem("userNamesCollection", JSON.stringify(userNamesCollection));

                map = new Map(JSON.parse(localStorage.myMap));
                if (map != null) {
                    map.set(user, password)
                    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
                }
            }
        } else {
            let emptyArray = [];
            emptyArray.push("a");
            emptyArray.push(user);
            let map = new Map([['a', 'a']]);
            map.set(user, password)
            localStorage.setItem("userNamesCollection", JSON.stringify(emptyArray));
            localStorage.myMap = JSON.stringify(Array.from(map.entries()));
        }
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

function emailValidation() {
    let stringToValidate = document.getElementById("email").value;
    let isEmailValid = validateEmail(stringToValidate);
    if (isEmailValid === null) {
        alert("Email address is invalid");
        document.register.email.focus();
        return false;
    } else {
        return true;
    }
}

function validateDate() {
    let dateToValidate = new Date(document.getElementById("dateOfBirth").value);
    const today = new Date();
    if (dateToValidate < today) {
        return true;
    } else {
        alert("date of birth is invalid, looks like you were born in the future ;)");
        document.register.dateOfBirth.focus();
        return false;
    }
}

const validateEmail = (email) => {//arrow func 
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


function passwordValidation() {
    let stringToValidate = document.getElementById("password").value;
    let pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (stringToValidate && stringToValidate.length > 2 && pattern.test(stringToValidate)) {
        return true;
    } else {
        alert("password is invalid - please use upper and lower case chars, digits and special symbols");
        document.register.password.focus();
        return false;
    }
}

function validate() {
    let valideForm = true;
    if (document.register.username.value == "") {
        alert("Please provide username!");
        document.register.username.focus();
        valideForm = false;
    }

    if (document.register.password.value == "") {
        alert("Please provide password!");
        document.register.password.focus();
        valideForm = false;
    }
    if (document.register.fullName.value == "") {
        alert("Please provide full name!");
        document.register.fullName.focus();
        valideForm = false;
    }
    if (document.register.email.value == "") {
        alert("Please provide Email address!");
        document.register.email.focus();
        valideForm = false;
    }

    if (document.register.dateOfBirth.value == "") {
        alert("Please provide date of birth!");
        document.register.dateOfBirth.focus();
        valideForm = false;
    }

    let isEmailValid = emailValidation();
    let isPasswordValid = passwordValidation();
    let isDateValid = validateDate();

    if (isEmailValid == true && isPasswordValid == true && isDateValid == true && valideForm == true) {
        addUsernameAndPasswordToLocalStorage();
    }
}