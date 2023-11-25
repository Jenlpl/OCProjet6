import { postLogin } from './api.js';
let user = {};

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.formlogin').addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log(event);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const dataResponse = await postLogin({ email, password });
            console.log('Authentication successful:', dataResponse);
            if (!dataResponse.message) {
                user = dataResponse
                console.log(user)
                window.location.href = './index.html';
                console.log(user)
            } else {
                displayErrorMessage('Erreur dans l’identifiant ou le mot de passe');
            }
        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    });

    function displayErrorMessage(message) {
        const errorMessageElement = document.getElementById('error-message');
        if (errorMessageElement) {
            errorMessageElement.textContent = message;
        } else {
            console.error('Error: Could not find the error message element with ID "error-message".');
        }
    }
});
