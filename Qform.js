const firebaseConfig = {
  apiKey: "AIzaSyAG0L8wYpOBOQ5pXQLk8438TcyJoRP-IvwE",
  authDomain: "study-389113.firebaseapp.com",
  databaseURL: "https://study-389113-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "study-389113",
  storageBucket: "study-389113.appspot.com",
  messagingSenderId: "608912144901",
  appId: "1:608912144901:web:cb0638b0271a1324d1fa6c",
  measurementId: "G-8CEPKL239V"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  var database = firebase.database();
  
    // Example data to be saved
    var fileData = {
      filename: "example.txt",
      content: "This is the content of the file."
    };
  
    // Save data to Firebase
    database.ref('files/').push(fileData);
  function onFailure(error) {
    console.log(error);
  }
  function requestlocation(){
    const x = document.getElementById("demo");

function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
x.innerHTML = "Latitude: " + position.coords.latitude +
"Longitude: " + position.coords.longitude;
const addres="Latitude: " + position.coords.latitude +
"Longitude: " + position.coords.longitude;
const addressRef = firebase.database().ref('address');
const userId = firebase.auth().currentUser.uid;
// Push the address to the database
addressRef.child(userId).set({
  address: address
})
.then(() => {
  console.log(" successfully");
})
.catch((error) => {
  console.error(error);
});

}
  }
  function submitQuestion(){
    const users = [
      { name: 'User1', aim: 'Programming', university: "Hustler's University", age: 25, standard: 'Graduate' },
      { name: 'User2', aim: 'Design', university: "Hustler's University", age: 22, standard: 'Undergraduate' },
      { name: 'User3', aim: 'Marketing', university: "Hustler's University", age: 28, standard: 'Graduate' },
      // Add more user data as needed
    ];
  
    // Function to find matches based on specified criteria
    function findMatches(targetUser) {
      return users.filter(user =>
        user.aim === targetUser.aim &&
        user.university === targetUser.university &&
        user.age === targetUser.age &&
        user.standard === targetUser.standard &&
        user !== targetUser
      );
    }
    const userId = Math.floor(Math.random() * users.length) + 1; // Randomly select a user
// Get friends of the selected user (for simplicity, just select a subset of users)
  const friends = users.slice(0, 3);

  // Generate friend recommendations (for simplicity, just select a subset of users)
  const recommendations = users.slice(3, 6);

  // Display recommendations on the page
  displayRecommendations(recommendations);
  function displayRecommendations(recommendations) {
    const friendList = document.getElementById("friendList");
    friendList.innerHTML = ""; // Clear previous recommendations

    recommendations.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = user.name;
        friendList.appendChild(listItem);
    });
    const usersRef = firebase.firestore().collection('users');
    usersRef.where('userId', '!=', userId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Check for mutual friends, location, interests, etc.
        // Implement your recommendation algorithm here
        console.log('Potential friend:', doc.data());
      });
    }).catch((error) => {
      console.error('Error getting friend recommendations:', error);
    });
}
async function getRecommendations() {
  const userId = document.getElementById('userId').value;

  try {
    const response = await fetch(`http://localhost:80/recommendations/${userId}`);
    const data = await response.json();

    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    data.recommendations.forEach(user => {
      const userElement = document.createElement('p');
      userElement.textContent = user.name;
      recommendationsDiv.appendChild(userElement);
    });
  } catch (error) {
    console.error(error);
  } }
  return users.filter(user =>
    user.aim === targetUser.aim &&
    user.university === targetUser.university &&
    user.age === targetUser.age &&
    user.standard === targetUser.standard &&
    user !== targetUser
  );
}

// Example: Find matches for a specific user
const targetUser = {
  name: 'TargetUser',
  aim: 'Programming',
  university: "Hustler's University",
  age: 25,
  standard: 'Graduate'
};

const matches = findMatches(targetUser);
console.log('Matches:', matches);

