export function getIsAuthenticated() {
    const isAuthenticated = sessionStorage.getItem('token') != "" && sessionStorage.getItem('token') != null ;
    return isAuthenticated === 'true';
    console.log(getIsAuthenticated)
}

export function getToken() {
    const token = sessionStorage.getItem('token');
    return token;
}

export function setIsAuthenticated(token) {
   sessionStorage.setItem('token', token);
}