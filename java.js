const firebaseConfig = {
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

function login() {

}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}