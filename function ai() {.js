function ai() {
    // Sample training data (x, y)
    const data = {
        xs: [1, 2, 3, 4, 5],
        ys: [2, 4, 6, 8, 10]
    };

    // Create tensors from data
    const xs = tf.tensor(data.xs);
    const ys = tf.tensor(data.ys);

    // Create a sequential model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Compile the model
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    // Train the model
    async function trainModel() {
        await model.fit(xs, ys, { epochs: 100 });

        // Make predictions
        const input = tf.tensor([6]);
        const prediction = model.predict(input);
        const result = prediction.dataSync()[0];

        console.log(`Prediction for input 6: ${result}`);
    }

    // Call the training function
    trainModel();

    registrationForm.addEventListener("submit", async(e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const dob = document.getElementById("dob").value;
        // Retrieve other input field values

        // Store user data in Firestore
        await db.collection("users").add({
            name: name,
            dob: dob,
            // Store other user data
        });

        // Display matched users
        const currentUserSnapshot = await db.collection("users").where("name", "==", name).get();
        const currentUser = currentUserSnapshot.docs[0].data();

        const matchedUsersSnapshot = await db.collection("users")
            .where("goals", "==", currentUser.goals)
            .where("degrees", "==", currentUser.degrees)
            .where("realWorldExperience", "==", currentUser.realWorldExperience)
            .get();

        matchedUsersDiv.innerHTML = "";
        matchedUsersSnapshot.forEach((doc) => {
            const user = doc.data();
            matchedUsersDiv.innerHTML += `
<p>${user.name} - ${user.dob}</p>
`;
        });
    });

    function addUser(name, dob, goals, degree, realWorld) {
        db.collection("users").add({
            name: name,
            dob: dob,
            goals: goals,
            degree: degree,
            realWorld: realWorld
        });
    }

    // Retrieve user data from Firebase
    function getUsers() {
        return db.collection("users").get().then((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            return users;
        });
    }
    // Example dummy function hard coded to return the same weather
    // In production, this could be your backend API or an external API
    function get_current_weather(location, unit = 'fahrenheit') {
        const weather_info = {
            location: location,
            temperature: '72',
            unit: unit,
            forecast: ['sunny', 'windy'],
        };
        return JSON.stringify(weather_info);
    }

    async function runConversation() {
        // Step 1: send the conversation and available functions to GPT
        const messages = [
            { role: 'user', content: "What's the weather like in Boston?" },
        ];
        const functions = [{
            name: 'get_current_weather',
            description: 'Get the current weather in a given location',
            parameters: {
                type: 'object',
                properties: {
                    location: {
                        type: 'string',
                        description: 'The city and state, e.g. San Francisco, CA',
                    },
                    unit: {
                        type: 'string',
                        enum: ['celsius', 'fahrenheit'],
                    },
                },
                required: ['location'],
            },
        }, ];
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo-0613',
                messages: messages,
                functions: functions,
                function_call: 'auto', // auto is default, but we'll be explicit
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual API key
                },
            }
        );
        const responseMessage = response.data.choices[0].message;

        // Step 2: check if GPT wanted to call a function
        if (responseMessage.function_call) {
            // Step 3: call the function
            // Note: the JSON response may not always be valid; be sure to handle errors
            const availableFunctions = {
                get_current_weather: get_current_weather,
            }; // only one function in this example, but you can have multiple
            const functionName = responseMessage.function_call.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(responseMessage.function_call.arguments);
            const functionResponse = functionToCall({
                location: functionArgs.location,
                unit: functionArgs.unit,
            });

            // Step 4: send the info on the function call and function response to GPT
            messages.push(responseMessage); // extend conversation with assistant's reply
            messages.push({
                role: 'function',
                name: functionName,
                content: functionResponse,
            }); // extend conversation with function response
            const secondResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo-0613',
                    messages: messages,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual API key
                    },
                }
            ); // get a new response from GPT where it can see the function response
            return secondResponse.data;
        }
    }

    runConversation()
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

}
const fetch = require('node-fetch'); // Import the 'node-fetch' library if running in Node.js
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        }
        ``)
    .then(response => response.json())
    .then(result => {
        console.log(result.choices[0].message.content);
    })
    .catch(error => {
        console.error('Error:', error);
    });
const axios = require('axios');
// Sample training data (x, y)
const data = {
    xs: [1, 2, 3, 4, 5],
    ys: [2, 4, 6, 8, 10]
};

// Create tensors from data
const xs = tf.tensor(data.xs);
const ys = tf.tensor(data.ys);

// Create a sequential model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Compile the model
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

// Train the model
async function trainModel() {
    await model.fit(xs, ys, { epochs: 100 });

    // Make predictions
    const input = tf.tensor([6]);
    const prediction = model.predict(input);
    const result = prediction.dataSync()[0];

    console.log(`Prediction for input 6: ${result}`);
}

// Call the training function
trainModel();

registrationForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    // Retrieve other input field values

    // Store user data in Firestore
    await db.collection("users").add({
        name: name,
        dob: dob,
        // Store other user data
    });

    // Display matched users
    const currentUserSnapshot = await db.collection("users").where("name", "==", name).get();
    const currentUser = currentUserSnapshot.docs[0].data();

    const matchedUsersSnapshot = await db.collection("users")
        .where("goals", "==", currentUser.goals)
        .where("degrees", "==", currentUser.degrees)
        .where("realWorldExperience", "==", currentUser.realWorldExperience)
        .get();

    matchedUsersDiv.innerHTML = "";
    matchedUsersSnapshot.forEach((doc) => {
        const user = doc.data();
        matchedUsersDiv.innerHTML += `
<p>${user.name} - ${user.dob}</p>
`;
    });
});

function addUser(name, dob, goals, degree, realWorld) {
    db.collection("users").add({
        name: name,
        dob: dob,
        goals: goals,
        degree: degree,
        realWorld: realWorld
    });
}

// Retrieve user data from Firebase
function getUsers() {
    return db.collection("users").get().then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users;
    });
}
const searchButton = document.getElementById('submitQuestion');
const interestInput = document.getElementById('aim') && ('realWorld') && ('standard');
const resultsList = document.getElementById('matchedUsers');

searchButton.addEventListener('click', () => {
    const interests = interestInput.value;

    // Simulated data
    const matchingPartners = ['John', 'Alice', 'Michael'];

    // Clear previous results
    resultsList.innerHTML = '';

    // Display matching partners
    matchingPartners.forEach(partner => {
        const listItem = document.createElement('li');
        listItem.textContent = partner;
        resultsList.appendChild(listItem);
    });
});


// Fetch user data from Firebase
db.collection("users").get().then((querySnapshot) => {
    const currentUser = /* get current user's data */ ;

    // Calculate similarity scores with other users
    const matches = [];
    querySnapshot.forEach((doc) => {
        const otherUser = doc.data();
        const similarity = calculateSimilarity(currentUser, otherUser);
        if (similarity > threshold) {
            matches.push(otherUser);
        }
    });

    // Display matches on the web page
    // Implement this using HTML/CSS/JavaScript
});

const matchedUsers = [];
allUsers.forEach(user => {
    if (user.name !== currentUser.name && user.degree === currentUser.degree) {
        matchedUsers.push(user);
    }
});
return matchedUsers;
}

// Display matched users on the webpage
async function displayMatches() {
    const currentUser = {
        name: "John Doe",
        degree: "Computer Science" // Assuming this is the current user's degree
            // Add other user data here
    };

    const allUsers = await getUsers();
    const matchedUsers = matchUsers(currentUser, allUsers);

    const matchList = document.getElementById("matchList");
    matchedUsers.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.textContent = user.name + " - " + user.degree;

        // Create a link to the study group page (groupstudy2.html)
        const link = document.createElement("a");
        link.href = "groupstudy2.html"; // Replace with your actual URL
        link.textContent = "Join Group Study";

        userDiv.appendChild(link);
        matchList.appendChild(userDiv);
    });
}

// Call the displayMatches function to show matched users
displayMatches();

function User(name, goals, degree) {
    this.name = name;
    this.goals = goals;
    this.degree = degree;

    this.calculateSimilarity = (otherUser) => {
        const commonGoals = this.goals.filter(goal => otherUser.goals.includes(goal)).length;
        const degreeSimilarity = this.degree === otherUser.degree ? 1 : 0;
        const totalSimilarity = commonGoals + degreeSimilarity;

        return totalSimilarity;
    };
}

// Create user instances
const userInstances = users.map(user => new User(user.name, user.goals, user.degree));

// Match users based on similarity threshold
const threshold = 2; // Adjust this threshold as needed

userInstances.forEach(user => {
    const matches = userInstances.filter(otherUser => otherUser !== user && user.calculateSimilarity(otherUser) >= threshold);
    displayMatches(user, matches);
});
// Create test data
const currentUser = {
    name: "John Doe",
    degree: "Computer Science"
};

const allUsers = [{
        name: "Jane Smith",
        degree: "Computer Science"
    },
    {
        name: "Bob Johnson",
        degree: "Mathematics"
    }
];

// Call the matchUsers function to get matched users
const matchedUsers = matchUsers(currentUser, allUsers);

// Call the displayMatches function to display matched users
displayMatches(matchedUsers);

// Display matches on the webpage
function displayMatches(user, matches) {
    const matchesDiv = document.getElementById("matches");
    const userMatchesDiv = document.createElement("div");
    userMatchesDiv.innerHTML = `<strong>Matches for ${user.name}:</strong><br>`;
    matches.forEach(match => {
        userMatchesDiv.innerHTML += `- ${match.name}<br>`;
    });
    matchesDiv.appendChild(userMatchesDiv);
} // Add this section to your main.js file

const openaiApiKey = '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';

function chatWithAssistant(message) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
    ];

    const data = {
        model: 'gpt-3.5-turbo',
        messages: messages,
    };

    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            const assistantResponse = result.choices[0].message.content;
            displayAssistantMessage(assistantResponse);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Call the function to display initial messages
    chatWithAssistant('Hello, assistant.');
    // Attach the event listener to the send button
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendMessage);
})