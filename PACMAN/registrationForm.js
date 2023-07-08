function addUsernameAndPasswordToLocalStorage() {
    // TODO: extract the credentials fetching to a separate function - this is duplicate with the implementation in 'loginForm.js'
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (typeof (Storage) !== "undefined") {
        const userNamesCollection = JSON.parse(localStorage.getItem("userNamesCollection"));
        // TODO : !==
        if (userNamesCollection != null) {
            //TODO: if(isUsernameInLocalStorage(userNamesCollection, user)) {
            //    return true;
            // } else { ...
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
        // TODO: what is an end user supposed to do with this error?
        alert("Sorry, your browser does not support Web Storage...");
    }
}

// TODO: rename to 'isUsernameInLocalStorage'
function checkIfUsernameExistsInLocalStorage(userNamesCollection, user) {
    const arrayLength = userNamesCollection.length;
    // TODO: use 'includes' instead of iterating over the array
    for (let i = 0; i < arrayLength; i++) {
        if (userNamesCollection[i] === user) {
            alert("User name already exist");
            document.register.username.focus();
            return true;
        }
    }
    return false;
}

// TODO: rename - this function does not care if the storage is empty or not - it will always initialize it. I think it should also not receive the user and password, as you already have a fnction for adding user and password to local storage
function initializelocalStorageIfEmpty(user, password) {
    const emptyArray = ["a", user]; // TODO: rename, as the array is not very empty
    const map = new Map([['a', 'a'], [user, password]]); // TODO: why do we need the 'a' user with the 'a' password?
    localStorage.setItem("userNamesCollection", JSON.stringify(emptyArray));
    // TODO: localStorage.pacmanRegisteredUsersMap
    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
}

// TODO: why do we pass the userNamesCollection if it is part of th local storage?
function addUserAndPasswordToLocalStorage(user, password, userNamesCollection) {
    userNamesCollection.push(user);
    localStorage.setItem("userNamesCollection", JSON.stringify(userNamesCollection));

    // TODO: consider using js objects, you don't actually need the Map class here
    let map = new Map(JSON.parse(localStorage.myMap));
    map.set(user, password)
    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
}

// TODO: rename to 'isEmailValid'
function emailValidation() {
    const stringToValidate = document.getElementById("email").value;
    // TODO: 'emalValidation' calling 'validateEmail' is kind of wierd. Maybe rename 'validateEmail' to 'isEmailInValidFormat'
    const isEmailValid = validateEmail(stringToValidate);
    if (isEmailValid === null) {
        // TODO: Having validation functions with side effects seems kinda smelly, you might want to return the validation error from the function instead
        alert("Email address is invalid");
        document.register.email.focus();
        return false;
    } else {
        return true;
    }
}

// TODO: rename to 'isDateOfBirthValid'
function validateDate() {
    const dateToValidate = new Date(document.getElementById("dateOfBirth").value);
    const today = new Date();
    if (dateToValidate < today) { // TODO: so 1.1.1001 is a valid date?
        return true;
    } else {
        // Again, side effects in validation functions aren't the cleanest in my opinion
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


// TODO: rename to 'isPasswordValid'
function passwordValidation() {
    const stringToValidate = document.getElementById("password").value;
    // TODO: if you are writing such patterns, an explanation is due about the logic they implement
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if ( stringToValidate.length > 2 && pattern.test(stringToValidate)) {
        return true;
    } else {
        // TODO: no side effects
        alert("password is invalid - please use upper and lower case chars, digits and special symbols");
        document.register.password.focus();
        return false;
    }
}

// TOOD: renmae to 'isFieldEmpty'
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

    // TODO : display all the validation errors together

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