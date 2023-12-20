import {getToken} from "./session.js";

const API_URI = `http://localhost:5678`; 


export function fetchWorks() {
    return fetch(`${API_URI}/api/works`, {
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("fetchWorks", data);
            return data;
        })
}

export async function postLogin(data) {
    const url = `${API_URI}/api/users/login`;
    try {
        const rep = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": `${API_URI}/api/users/login`,
            },
            body: JSON.stringify(data),
        });
        let reponse = await rep.json();
        return reponse;
    } catch (error) {    
        throw error;
    }
}


export function fetchDelete(id) {
    return fetch(`${API_URI}/api/works/${id}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${getToken()}`}
    })
        .then((res) =>
        res.json());       
}


