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
async function glogin() {        // Get the Google login button element.
  googleLoginButton.addEventListener("click", async () =>) {
    const googleLoginButton = document.getElementById("googlelogin");
  }
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  const {google} = require('googleapis');

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const oauth2Client = new google.auth.OAuth2(
  608912144901-3ng7hlsub7lbgs05tlpou9a59ocrok4r.apps.googleusercontent.com,
  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,
  YOUR_REDIRECT_URL
);

// Access scopes for read-only Drive activity.
const scopes = [
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});
}
  