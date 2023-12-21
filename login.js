const googleUser=googleUser;
function onSignIn() {
  alert('Redirecting!');
console.log('onSignIn function called');
   // Access user details
   var profile = googleUser.getBasicProfile();
   console.log('ID: ' + profile.getId());
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail());

   // Obtain the user ID
//   var userId = profile.getId();

   // Firestore reference
  // const userRef = firebase.firestore().collection('users').doc(userId);

   // Check if the user already exists in Firestore
 //  userRef.get().then((doc) => {
    //if (!doc.exists) {
        // User doesn't exist, save their data
//        const userData = {
  //          name: profile.getName(),
    //        email: profile.getEmail(),
            // Add more user data as needed
      //  };

//        userRef.set(userData).then(() => {
  //          console.log('User data saved to Firestore');
    //    }).catch((error) => {
      //      console.error('Error saving user data:', error);
        //});
 //   } else {
   //     console.log('User already exists in Firestore');
    //}
//})
//.catch((error) => {
  //  console.error('Error checking user data:', error);
//});
 window.location.href = 'http://localhost/Qform.html';
}

  document.addEventListener("DOMContentLoaded", function () {
    gapi.load('auth2', function () {
        gapi.auth2.init().then(function () {
            console.log('gapi.auth2 initialized successfully');
            attachSignInEvent();
        });
    });
  });
  
  // ... rest of the code
  
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyD05wMFdIOuPaTjr1cF5NHqnTLmI19OS8M",
   authDomain: "studywbuddy-6cbca.firebaseapp.com",
   projectId: "studywbuddy-6cbca",
   storageBucket: "studywbuddy-6cbca.appspot.com",
   messagingSenderId: "818403050320",
   appId: "1:818403050320:web:ac3761153eeba6145f6255",
   measurementId: "G-DFJM4VXL3X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  // ... (Firebase initialization and other code)
  function attachSignInEvent() {
    const signInButton = document.querySelector('.g-signin2');
    if (signInButton) {
      signInButton.addEventListener('click', function () {
        gapi.auth2.getAuthInstance().signIn().then(onSignIn);
      });
    }
  }
  
  