function checkIfUsernameExists() {
    let userNameExist = false;
    user = document.getElementById("username").value;
    if (typeof (Storage) !== "undefined") {
        let userNamesCollection = JSON.parse(localStorage.getItem("userNamesCollection"));
        if (userNamesCollection != null) {
            var arrayLength = userNamesCollection.length;
            for (var i = 0; i < arrayLength; i++) {
                if (userNamesCollection[i] === user) {
                    userNameExist = true;
                    alert("User name already exist");
                }
            }
            if (userNameExist === false) {
                alert("User name does not  exist");
                userNamesCollection.push(user);
                localStorage.setItem("userNamesCollection", JSON.stringify(userNamesCollection));

                map = new Map(JSON.parse(localStorage.myMap));
                let stringToValidate = document.getElementById("password").value;
                if (map != null) {
                    map.set(user, stringToValidate)
                    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
                } else {
                    var map = new Map([['a', 'a']]);
                    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
                }
            }
        } else {
            let emptyArray = [];
            emptyArray.push("test");
            localStorage.setItem("userNamesCollection", JSON.stringify(emptyArray));
        }
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

function emailValidation() {
    let stringToValidate = document.getElementById("email").value;
    let isEmailValid = validateEmail(stringToValidate);
    if (isEmailValid === null) {
        alert("email address is invalid");
    }

}

function validateDate() {
    let dateToValidate = new Date(document.getElementById("date-of-birth").value);
    var today = new Date();
    if (dateToValidate < today) {
        alert("Date is valid");
    } else {
        alert("Date is invalid");
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


function passwordValidation() {
    let stringToValidate = document.getElementById("password").value;
    var pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (stringToValidate && stringToValidate.length > 2 && pattern.test(stringToValidate)) {
        alert("password is ok");
    } else {
        alert("password not ok")
    }
}

function putMapInLocalStorage() {
    var map = new Map([['a', 'a']]);
    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
    map = new Map(JSON.parse(localStorage.myMap));
}

function validate(){
    if( document.register.username.value == "" ) {
        alert( "Please provide password!" );
        document.register.password.focus() ;
        return false;
     }
}