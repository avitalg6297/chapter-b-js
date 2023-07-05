function addUsernameAndPasswordToLocalStorage() {
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (typeof (Storage) !== "undefined") {
        const userNamesCollection = JSON.parse(localStorage.getItem("userNamesCollection"));
        if (userNamesCollection != null) {
            const isUserNameExist = checkIfUsernameExistsInLocalStorage(userNamesCollection, user);
            if (isUserNameExist) {
                return true;
            }
            else {
                addUserAndPasswordToLocalStorage(user, password, userNamesCollection);
            }

        } else {
            initializelocalStorageIfEmpty(user, password)
        }
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

function checkIfUsernameExistsInLocalStorage(userNamesCollection, user) {
    const arrayLength = userNamesCollection.length;
    for (let i = 0; i < arrayLength; i++) {
        if (userNamesCollection[i] === user) {
            alert("User name already exist");
            document.register.username.focus();
            return true;
        }
    }
    return false;
}

function initializelocalStorageIfEmpty(user, password) {
    const emptyArray = ["a", user];
    const map = new Map([['a', 'a'], [user, password]]);
    localStorage.setItem("userNamesCollection", JSON.stringify(emptyArray));
    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
}

function addUserAndPasswordToLocalStorage(user, password, userNamesCollection) {
    userNamesCollection.push(user);
    localStorage.setItem("userNamesCollection", JSON.stringify(userNamesCollection));

    let map = new Map(JSON.parse(localStorage.myMap));
    map.set(user, password)
    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
}

function emailValidation() {
    const stringToValidate = document.getElementById("email").value;
    const isEmailValid = validateEmail(stringToValidate);
    if (isEmailValid === null) {
        alert("Email address is invalid");
        document.register.email.focus();
        return false;
    } else {
        return true;
    }
}

function validateDate() {
    const dateToValidate = new Date(document.getElementById("dateOfBirth").value);
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
    const stringToValidate = document.getElementById("password").value;
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if ( stringToValidate.length > 2 && pattern.test(stringToValidate)) {
        return true;
    } else {
        alert("password is invalid - please use upper and lower case chars, digits and special symbols");
        document.register.password.focus();
        return false;
    }
}

function validateIfFormFieldsAreEmpty(fieldToCheck, fieldName) {
    if (fieldToCheck.value == "") {
        alert("Please provide " + fieldName + "!");
        fieldToCheck.focus();
        return true;
    }
    return false;
}

function validate() {
    let isEmailValid;
    let isPasswordValid;
    let isDateValid;
    const isUsernameEmpty = validateIfFormFieldsAreEmpty(document.register.username, "username");
    const isPasswordEmpty = validateIfFormFieldsAreEmpty(document.register.password, "password");
    const isFullNameEmpty = validateIfFormFieldsAreEmpty(document.register.fullName, "full name");
    const isEmailEmpty = validateIfFormFieldsAreEmpty(document.register.email, "Email address");
    const isDateEmpty = validateIfFormFieldsAreEmpty(document.register.dateOfBirth, "date of birth");

    if (!isDateEmpty) {
        isDateValid = validateDate();
    }

    if (!isEmailEmpty) {
        isEmailValid = emailValidation();
    }

    if (!isPasswordEmpty) {
        isPasswordValid = passwordValidation();
    }

    if (isEmailValid && isPasswordValid && isDateValid && !isUsernameEmpty && !isFullNameEmpty) {
        addUsernameAndPasswordToLocalStorage();
    }
}