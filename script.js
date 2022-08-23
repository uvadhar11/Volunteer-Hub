signUpButton = document.querySelector(".sign-up-btn");
logInButton = document.querySelector(".log-in-btn");
volunteerLogo = document.querySelector(".logo");
featuresContentDiv = document.querySelector(".features-content");

signUpButton.addEventListener("click", function () {
  console.log("Sign up button clicked!");
  featuresContentDiv.classList.add("hidden"); // this code adds the hidden class to the classList of the feature-content div
});

logInButton.addEventListener("click", function () {
  console.log("Log in button clicked!");
});

volunteerLogo.addEventListener("click", function () {
  console.log("Logo clicked!");
});