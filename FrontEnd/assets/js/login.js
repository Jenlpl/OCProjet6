import { postLogin } from "./api.js";
import {setIsAuthenticated} from "./session.js";

// Initializing user object
let user = {};

// Event listener for form submission
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".formlogin")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      // Retrieving email and password values from the form
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
         // Attempting to perform login by calling the postLogin function
        const dataResponse = await postLogin({ email, password });
      
        // Checking the response for successful login
        if (!dataResponse.message && dataResponse.token) {
          // If successful, update the user object, set authentication status,
          // and redirect to the index page
          user = dataResponse;
          setIsAuthenticated(user.token);
          window.location.href = "./index.html";
        } else {
          // If login fails, display an error message
          displayErrorMessage("Erreur dans l’identifiant ou le mot de passe");
        }
      } catch (error) {
        console.error("Authentication error:", error.message);
      }
    });

    // Function to display an error message on the page
  function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
    } else {
      console.error(
        'Error: Could not find the error message element with ID "error-message".'
      );
    }
  }
});
