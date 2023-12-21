export function getIsAuthenticated() {
    const token = sessionStorage.getItem('token');
    const isAuthenticated = token !== "" && token !== null;
    return isAuthenticated;
  }
  

export function getToken() {
    const token = sessionStorage.getItem('token');
    return token;
}

export function setIsAuthenticated(token) {
   sessionStorage.setItem('token', token);
}

// Logout button


export function logOut() {
setIsAuthenticated("");
}