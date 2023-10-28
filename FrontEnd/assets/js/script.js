const API_URI = `http://localhost:5678`; 

fetch(`${API_URI}/api/works`)
    .then((res) => res.json())
    .then((data) => getWorks(data))

function getWorks(data) {
        const imageUrl = data[0].imageUrl;
        const img = document.createElement("img");
        img.src = imageUrl;
        const works = document.querySelector("#gallery"); 
        works.appendChild(img);
    }
