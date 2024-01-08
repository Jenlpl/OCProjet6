// Function to check if the user is authenticated
export function getIsAuthenticated() {
  // Retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // Determine if the user is authenticated based on the presence and non-empty token
    const isAuthenticated = token !== "" && token !== null;
    return isAuthenticated;
  }
  
// Fonction pour récupérer le jeton d'authentification
export function getToken() {
    const token = sessionStorage.getItem('token');
    return token;
}

// Save token

export function setIsAuthenticated(token) {
   sessionStorage.setItem('token', token);
}

// Logout button

export function logOut() {
setIsAuthenticated("");
}