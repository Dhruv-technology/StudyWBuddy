let studySessions = [];

function startSession() {
    const subjectInput = document.getElementById("subjectInput");
    const durationInput = document.getElementById("durationInput");

    const subject = subjectInput.value;
    const duration = parseInt(durationInput.value);

    if (subject && duration) {
        const session = {
            subject: subject,
            duration: duration,
            startTime: new Date(),
            endTime: null,
        };

        studySessions.push(session);

        subjectInput.value = "";
        durationInput.value = "";

        console.log("Started studying:", session);

        updateStats();
    }
}

function endSession() {
    if (studySessions.length > 0) {
        const session = studySessions[studySessions.length - 1];
        session.endTime = new Date();

        console.log("Ended study session:", session);

        updateStats();
    }
}

function updateStats() {
    const totalStudyTime = document.getElementById("totalStudyTime");
    const averageStudyTime = document.getElementById("averageStudyTime");

    let totalMinutes = 0;

    studySessions.forEach((session) => {
        if (session.endTime) {
            const studyTime = Math.round((session.endTime - session.startTime) / (1000 * 60));
            totalMinutes += studyTime;
        }
    });

    const averageMinutes = studySessions.length > 0 ? totalMinutes / studySessions.length : 0;

    totalStudyTime.textContent = totalMinutes + " minutes";
    averageStudyTime.textContent = averageMinutes + " minutes";
}

// Add event listeners to the buttons
document.getElementById("startBtn").addEventListener("click", startSession);
document.getElementById("endBtn").addEventListener("click", endSession);
let studySessions = [];
let countdownInterval;
let countdownSeconds;

function startCountdown() {
    const durationInput = document.getElementById("durationInput");
    const duration = parseInt(durationInput.value);

    if (duration) {
        countdownSeconds = duration * 60; // Convert minutes to seconds
        updateCountdown();

        const startBtn = document.getElementById("startBtn");
        const endBtn = document.getElementById("endBtn");

        startBtn.disabled = true;
        endBtn.disabled = true;

        countdownInterval = setInterval(function() {
            countdownSeconds--;
            updateCountdown();

            if (countdownSeconds <= 0) {
                clearInterval(countdownInterval);
                startBtn.disabled = false;
                endBtn.disabled = true;
            }
        }, 1000);
    }
}

function updateCountdown() {
    const durationInput = document.getElementById("durationInput");
    durationInput.disabled = true;

    const countdownDisplay = document.getElementById("countdownDisplay");
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    countdownDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startSession() {
    // ... existing startSession function code ...
    // Note: No need to change the startSession function.
}

function endSession() {
    // ... existing endSession function code ...
    // Note: No need to change the endSession function.
}

// Add event listeners to the buttons
document.getElementById("startBtn").addEventListener("click", startSession);
document.getElementById("endBtn").addEventListener("click", endSession);

function updateStats() {
    const totalStudyTime = document.getElementById("totalStudyTime");
    const averageStudyTime = document.getElementById("averageStudyTime");

    let totalMinutes = 0;

    studySessions.forEach(session => {
        if (session.endTime) {
            const studyTime = Math.round((session.endTime - session.startTime) / (1000 * 60));
            totalMinutes += studyTime;
        }
    });

    const averageMinutes = studySessions.length > 0 ? totalMinutes / studySessions.length : 0;

    totalStudyTime.textContent = totalMinutes + " minutes";
    averageStudyTime.textContent = averageMinutes + " minutes";
}
let studySessions = [];

function startSession() {
    const subjectInput = document.getElementById("subjectInput");
    const durationInput = document.getElementById("durationInput");

    const subject = subjectInput.value;
    const duration = parseInt(durationInput.value);

    if (subject && duration) {
        const session = {
            subject: subject,
            duration: duration,
            startTime: new Date(),
            endTime: null,
            location: null
        };

        studySessions.push(session);

        subjectInput.value = "";
        durationInput.value = "";

        getLocation(session);

        console.log("Started studying:", session);

        updateStats();
    }
}
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

// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Call the function to display initial messages
    chatWithAssistant('Hello, assistant.');
    // Attach the event listener to the send button
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendMessage);
});