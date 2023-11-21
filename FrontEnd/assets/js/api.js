const API_URI = `http://localhost:5678`; 

export function fetchWorks() {
    return fetch(`${API_URI}/api/works`)
        .then((res) => res.json());
}

export async function postLogin(data) {
    const url = `${API_URI}/api/users/login`;
    try {
        const rep = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let reponse = await rep.json();
        return reponse;
  
    } catch (error) {
     if (error.code === '400'){
       displayMessageError(textErrorLogin, '400');
     }
        throw error;
    }
}
function displayMessageError(textError, errorCode) {
    console.error('Erreur de connexion:', error.message);
}