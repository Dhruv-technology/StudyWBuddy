import * as vscode from vscode;
const http = require("http");
// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
    // ...const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyBfH1FaLlIejER9s_zVBUuKFPPxoZ_MsME",
    authDomain: "study-389113.firebaseapp.com",
    databaseURL: "https://study-389113-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "study-389113",
    storageBucket: "study-389113.appspot.com",
    messagingSenderId: "608912144901",
    appId: "1:608912144901:web:cb0638b0271a1324d1fa6c",
    measurementId: "G-8CEPKL239V"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

function firstTime() {
    document.addEventListener("DOMContentLoaded"), () => {
        const visitedBefore = localStorage.getItem("visitedBefore");

        if (!visitedBefore) {
            document.getElementById("questionForm").style.display = "block";
            localStorage.setItem("visitedBefore", "true");


            var x = document.getElementById("demo");

            function handleError(error) {
                console.error("Error:", error.message);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("An unknown error occurred.");
                        break;
                    default:
                        console.error("Geolocation is not supported by this browser.");
                        break;
                }
            }

            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;
            }


            function saveLocation(latitude, longitude) {
                const locationRef = db.collection("user_locations");
                locationRef
                    .add({ latitude, longitude })
                    .then(() => {
                        console.log("Location saved.");
                    })
                    .catch((error) => {
                        console.error("Error saving location:", error);
                    });
            }

            function location() {

                function requestLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const latitude = position.coords.latitude;
                                const longitude = position.coords.longitude;
                                console.log("Latitude: " + latitude);
                                console.log("Longitude: " + longitude);

                                // Save location data to the database
                                saveLocation(latitude, longitude);
                            },
                            handleError
                        );
                    } else {
                        x.innerHTML = "Geolocation is not supported by this browser.";
                    }
                }

                function getCurrentLocation() {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            console.log("Latitude: " + latitude);
                            console.log("Longitude: " + longitude);

                            // Save location data to the database
                            saveLocation(latitude, longitude);
                        },
                        handleError
                    );
                }
                navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
                    if (permissionStatus.state === "granted") {
                        // Location permissions already granted
                        getCurrentLocation();
                    } else if (permissionStatus.state === "prompt") {
                        // Request location permissions
                        navigator.permissions.request({ name: "geolocation" }).then((permissionResult) => {
                            if (permissionResult.state === "granted") {
                                getCurrentLocation();
                            } else {
                                handleError({ code: "PERMISSION_DENIED", message: "Location permissions denied." });
                            }
                        });
                    } else {
                        handleError({ code: "PERMISSION_DENIED", message: "Location permissions denied." });
                    }
                });

                requestLocation();
            }








            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        x.innerHTML = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x.innerHTML = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        x.innerHTML = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        x.innerHTML = "An unknown error occurred."
                        break;
                }
            }

            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;
            }

            navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {

                if (permissionStatus.state === "granted") {
                    // Location permissions already granted
                    getCurrentLocation();
                } else if (permissionStatus.state === "prompt") {
                    // Request location permissions
                    navigator.permissions.request({ name: "geolocation" }).then((permissionResult) => {
                        if (permissionResult.state === "granted") {
                            getCurrentLocation();
                        } else {
                            handleError({ code: "PERMISSION_DENIED", message: "Location permissions denied." });
                        }
                    });
                } else {
                    handleError({ code: "PERMISSION_DENIED", message: "Location permissions denied." });
                }
            });
        }
    }

    function toggleStandardInput() {
        const stdOrCollege = document.getElementById("stdOrCollege").value;
        const stdSection = document.getElementById("stdSection");

        if (stdOrCollege === "std") {
            stdSection.style.display = "block";
        } else {
            stdSection.style.display = "none";
        }

        checkFormValidity();
    }
}

function toggleRealWorldDetails() {
    const realWorld = document.getElementById("realWorld").value;
    if (realWorld === "yes") {
        executecheckFormValidity = false;
    } else {
        let executecheckFormValidity = true;
    }

    checkFormValidity();
}

function checkFormValidity() {
    const realWorld = document.getElementById("realWorld").value;

    const submitQuestion = document.getElementById("submitQuestion");
    if (realWorld === "yes") {
        submitQuestion.disabled = false;
    } else {
        const stdOrCollege = document.getElementById("stdOrCollege").value;
        const aim = document.getElementById("aim").value;

        if (stdOrCollege === "std" && (aim === "" || realWorld === "no")) {
            submitQuestion.disabled = true;
        } else if (stdOrCollege === "college" && (aim === "" || realWorld === "no")) {
            submitQuestion.disabled = true;
        } else {
            submitQuestion.disabled = false;
        }
    }
}

function submitQuestion() {
    const stdOrCollege = document.getElementById("stdOrCollege").value;
    const aim = document.getElementById("aim").value;
    const degree = document.getElementById("degree").value;
    const realWorld = document.getElementById("realWorld").value;

    let standard = "";
    if (stdOrCollege === "std") {
        standard = document.getElementById("standard").value;
    }

    // Here, you can save the data to a database or perform further processing
    // For simplicity, let's just log the values for now
    console.log("Std/College: ", stdOrCollege);
    console.log("Standard: ", standard);
    console.log("Aim: ", aim);
    console.log("Degree: ", degree);
    console.log("Real World Experience: ", realWorld);

    alert("Question submitted!");
    call(matchUsers())
    matchUsers()
    else {
        document.getElementById("html").style.display = "none";
    }
}
const registrationForm = document.getElementById("registrationForm");
const matchedUsersDiv = document.getElementById("matchedUsers");


// Basic matching algorithm (simplified example)

function matchUsers(currentUser, allUsers) {
    const users = [
        { name: "User 1", dob: "1990-01-01", aim: "Study", institute: "School" },
        { name: "User 2", dob: "1995-05-10", aim: "Learn", institute: "College" },
        { name: "User 3", dob: "1992-03-20", aim: "Explore", institute: "University" },
        { name: "User 4", dob: "1988-11-15", aim: "Achieve", institute: "School" },
    ];

    function matchUsers() {
        const yourName = document.getElementById("name").value;
        const yourDob = document.getElementById("dob").value;
        const yourAim = document.getElementById("aim").value;
        const yourInstitute = document.getElementById("realworld").value;

        const matchingUsersList = document.getElementById("matchingUsers");
        matchingUsersList.innerHTML = ""; // Clear previous matches

        users.forEach(user => {
            if (
                user.name !== yourName &&
                user.dob === yourDob &&
                user.aim === yourAim &&
                user.institute === yourInstitute
            ) {
                const listItem = document.createElement("li");
                listItem.textContent = `${user.name} - ${user.dob}, ${user.aim}, ${user.institute}`;
                matchingUsersList.appendChild(listItem);
            }
        });
    }

    function displayAssistantMessage(message) {
        const chatContainer = document.getElementById('chatContainer');
        const assistantMessage = document.createElement('div');
        assistantMessage.className = 'assistant-message';
        assistantMessage.textContent = `Assistant: ${message}`;
        chatContainer.appendChild(assistantMessage);
    }

    function sendMessage() {
        const userInput = document.getElementById('userInput').value;
        displayUserMessage(userInput);
        chatWithAssistant(userInput);
        document.getElementById('userInput').value = '';
    }

    function displayUserMessage(message) {
        const chatContainer = document.getElementById('chatContainer');
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = `You: ${message}`;
        chatContainer.appendChild(userMessage);
    }