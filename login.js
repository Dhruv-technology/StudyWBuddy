document.addEventListener("DOMContentLoaded", function () {
  initializeGoogleAuth();
  attachSignInEvent();
});

function initializeGoogleAuth() {
  gapi.load('auth2', function () {
    gapi.auth2.init().then(function () {
      console.log('gapi.auth2 initialized successfully');
    });
  });
}

// Create a state token to prevent request forgery.
// Store it in the session for later validation.
var state = Array.from({ length: 128 / 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
sessionStorage.setItem('state', state);

// Set the client ID, token state, and application name in the HTML while serving it.
var CLIENT_ID = '608912144901-tuvm1ckdmgf1u1ov4ojdemsdhs3uutbc.apps.googleusercontent.com';
var APPLICATION_NAME = 'StudyWBuddy'; // Replace with your actual application name

// Assuming you have a function to render HTML, replace the following line accordingly.
renderHtml({
  'CLIENT_ID': CLIENT_ID,
  'STATE': state,
  'APPLICATION_NAME': APPLICATION_NAME
});

function renderHtml(data) {
  // Assuming you have elements with corresponding IDs in your HTML
  var clientIdElement = document.getElementById('clientId');
  var stateElement = document.getElementById('state');
  var appNameElement = document.getElementById('appName');

  // Update HTML content with the provided data
  if (clientIdElement) {
    clientIdElement.textContent = 'Client ID: ' + data.CLIENT_ID;
  }
  if (stateElement) {
    stateElement.textContent = 'State: ' + data.STATE;
  }
  if (appNameElement) {
    appNameElement.textContent = 'Application Name: ' + data.APPLICATION_NAME;
  }
}

function attachSignInEvent() {
  const signInButton = document.querySelector('.g-signin2');
  if (signInButton===onclick) {
    signInButton.addEventListener('click', function () {
      gapi.auth2.getAuthInstance().signIn().then(onSignIn);
      onSignIn()
    });
  }

}

function onSignIn(googleUser) {
  alert("Logged in");
  // Access user details
  try {
    // Access user details
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  
    // Your additional logic here
  
    // If everything is successful, trigger an alert
    alert('User details retrieved successfully');
  } catch (error) {
    // Handle any errors that occurred
    console.error('Error accessing user details:', error);
  
    // Optionally, trigger an alert for the user to be aware of an issue
    alert('An error occurred while retrieving user details');
  }
  
  window.location.href = 'http://localhost/Qform.html';
 // window.navigate("http://localhost/Qform.html"); // This line is not needed
  alert("Logged in");
}

function oauth2SignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    'client_id': '608912144901-tuvm1ckdmgf1u1ov4ojdemsdhs3uutbc.apps.googleusercontent.com',
    'redirect_uri': 'http://localhost:80/Qform.html',
    'scope': 'Gmail API',
    'include_granted_scopes': 'true',
    'response_type': 'token'
  };

  // Create form and add parameters
  var form = createForm(oauth2Endpoint, params);

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
function createForm(action, params) {
  var form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', action);

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  return form;
}

function onFailure(error) {
  console.log(error);
  // Add more code here to handle sign-in failure
  alert("Sign-in failure");
}
