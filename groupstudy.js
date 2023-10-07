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

        // Converted JavaScript code:

//const visitedBefore = false;

if (!visitedBefore) {
  const blockhtml = document.getElementById("html");
  blockhtml.style.display = "block";
  localStorage.setItem("visitedBefore", "true");
  var x = document.getElementById("demo");
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
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://study-389113-default-rtdb.asia-southeast1.firebasedatabase.app"
});

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
    const collectionName = "Studdybuddy";

    // Data to be saved
    const dataToSave = {
        stdOrCollege: document.getElementById("stdOrCollege").value;
        // Add more fields as needed db.collection(StuddyBuddy)
        .add(dataToSave)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    };
    const aim = document.getElementById("aim").value;
    const collectionName = "Studdybuddy";

    // Data to be saved
    const dataToSave = {
        aim: document.getElementById("aim").value;
        // Add more fields as needed
    };
    db.collection(StuddyBuddy)
        .add(dataToSave)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    const degree = document.getElementById("degree").value;
    const realWorld = document.getElementById("realWorld").value;
    if (realWorld == true) {
        document.getElementById(stdOrCollege).require == false;
        // Replace 'your_collection' with the name of your Firestore collection
        const collectionName = "Studdybuddy";

        // Data to be saved
        const dataToSave = {
            realWorld: "yes",
            // Add more fields as needed
        };

        // Add a new document with an automatically generated ID
        db.collection(StuddyBuddy)
            .add(dataToSave)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });


    }
    let standard = "";
    if (stdOrCollege === "std") {
        standard = document.getElementById("standard").value;
        const collectionName = "Studdybuddy";

        // Data to be saved
        const dataToSave = {
            aim: document.getElementById("standard").value;
            // Add more fields as needed
        };
        db.collection(StuddyBuddy)
            .add(dataToSave)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    }

    // Here, you can save the data to a database or perform further processing
    // For simplicity, let's just log the values for now
    console.log("Std/College: ", stdOrCollege);
    console.log("Standard: ", standard);
    console.log("Aim: ", aim);
    console.log("Degree: ", degree);
    console.log("Real World Experience: ", realWorld);
    const collectionName = "Studdybuddy";

    // Data to be saved
    const dataToSave = {
        // Here, you can save the data to a database or perform further processing
        // For simplicity, let's just log the values for now
        console.log("Std/College: ", stdOrCollege);
        console.log("Standard: ", standard);
        console.log("Aim: ", aim);
        console.log("Degree: ", degree);
        console.log("Real World Experience: ", realWorld);
        const collectionName = "Studdybuddy";
        // Add more fields as needed
    };
    const registrationForm = document.getElementById("registrationForm");
    const matchedUsersDiv = document.getElementById("matchedUsers");


    // Basic matching algorithm (simplified example)


    function matchUsers(currentUser, allUsers) {
        document.addEventListener("DOMContentLoaded", () => {
            // Your existing code here

            // The provided code to calculate matched users
            const commonarr = [];
            const dfarr = Object.values(df);

            for (let i = 0; i < dfarr.length - 1; i++) {
                for (let j = i + 1; j < dfarr.length; j++) {
                    if (dfarr[i][6] * dfarr[j][6] >= 0) {
                        if (dfarr[i][5] + dfarr[j][5] > 0) {
                            const row = [];
                            row.push(dfarr[i][0]);
                            row.push(dfarr[j][0]);
                            row.push((dfarr[i][6] * dfarr[j][6]) +
                                (dfarr[i][5] + dfarr[j][5]) +
                                (parseFloat((1 - (Math.abs(dfarr[i][7] - dfarr[j][7]) / 10)).toFixed(2))));
                            commonarr.push(row);
                        }
                    }
                }
            }

            // Sort matched users by final score
            const ndf = commonarr.map(row => ({
                name1: row[0],
                name2: row[1],
                final_score: row[2],
            }));
            ndf.sort((a, b) => b.final_score - a.final_score);

            // Display matched users
            const matchedUsersDiv = document.getElementById("matchedUsers");
            const matchingUsersList = document.createElement("ul");

            ndf.forEach(match => {
                const listItem = document.createElement("li");
                listItem.textContent = `${match.name1} and ${match.name2} - Score: ${match.final_score}`;
                matchingUsersList.appendChild(listItem);
            });

            matchedUsersDiv.appendChild(matchingUsersList);
        });

        const users = [
            { dob: "1990-01-01", aim: "Study", stdOrCollege: "School" },
            { dob: "1995-05-10", aim: "Learn", stdOrCollege: "College" },
            { dob: "1992-03-20", aim: "Explore", stdOrCollege: "College" },
            { dob: "1988-11-15", aim: "Achieve", stdOrCollege: "School" },
            { dob: "2000-12 -15", aim: "Astronaut", stdOrCollege: "School" },
            { dob: "2002-1-21", aim: "Money", stdOrCollege: "College" },
        ];

        const yourName = document.getElementById("name").value;
        const yourDob = document.getElementById("dob").value;
        const yourAim = document.getElementById("aim").value;
        const stdOrCollege = document.getElementById("stdOrCollege").value;

        const matchingUsersList = document.getElementById("matchingUsers");

        const dataToSave = {
            matchingUsersList: matchingUsersList;
            const collectionName = "Studdybuddy";
            // Add more fields as needed
        };
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
        matchingUsersList.innerHTML = ""; // Clear previous matches
    }



    function sendMessage() {
        const userInput = document.getElementById('userInput').value;
        displayUserMessage(userInput);
        chatWithAssistant(userInput);
        document.getElementById('userInput').value = '';
    }

    firebase.initializeApp(firebaseConfig);

    // Reference to the Firebase Realtime Database
    const database = firebase.database();

    const messagesRef = database.ref("messages");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const messagesDiv = document.getElementById("messages");

    // Listen for new messages and display them in real-time
    messagesRef.on("child_added", (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement("div");
        messageElement.innerText = `${message.name}: ${message.text}`;
        messagesDiv.appendChild(messageElement);
    });

    // Send a new message
    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            const newMessageRef = messagesRef.push();
            newMessageRef.set({
                name: "User", // You can customize this to display the user's name
                text: messageText
            });
            messageInput.value = "";
        }
    });
    const currentUser = {
        aim: ["engineering", "math"],
        location: locationRef
    };
    firebase.initializeApp(firebaseConfig);

    // Initialize Firebase Messaging
    const messaging = firebase.messaging();
    matchUsers(currentUser);
    // Get the user's registration token
    messaging
        .requestPermission()
        .then(() => {
            console.log("Notification permission granted.");
            // You can now send notifications
        })
        .catch((error) => {
            console.error("Notification permission denied.", error);
        });

    messaging
        .getToken()
        .then((token) => {
            console.log("Registration token: " + token);
            // Send this token to your server for later use
        })
        .catch((error) => {
            console.error("Error getting registration token.", error);
        });
    const admin = require("firebase-admin");
    const serviceAccount = require("path/to/serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://your-project-id.firebaseio.com",
    });

    // Define the notification message
    const message = {
        notification: {
            title: "New Message",
            body: "You have a new message!",
        },
        // You can also include data payload if needed
        // data: {
        //   key1: "value1",
        //   key2: "value2",
        // },
    };

    // Define the target registration token(s)
    const registrationTokens = ["USER_REGISTRATION_TOKEN_1", "USER_REGISTRATION_TOKEN_2"];

    // Send the notification
    admin
        .messaging()
        .sendToDevice(registrationTokens, message)
        .then((response) => {
            console.log("Notification sent successfully:", response);
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    console.error("Error sending notification:", error);
}