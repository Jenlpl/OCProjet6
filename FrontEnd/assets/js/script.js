const API_URI = `http://localhost:5678`; 

fetch(`${API_URI}/api/works`)
    .then((res) => res.json())
    .then((data) => {
     getWorks(data);
    console.log(data);
})

function getWorks(data) {
        const imageUrl = data[0].imageUrl;
        const img = getImg(imageUrl)
        appendChildren(img);
    }

    function createFigureElement(item) {
        const figure = document.createElement("figure");
    
        const imgDiv = getImgDiv(item.imageUrl, item.title);
    
        figure.appendChild(imgDiv);
    
        return figure;
    }

    function getImg(imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        return img;
    }

    function getImgDiv(imageUrl, title) {
        const div = document.createElement("div");
        
        const img = document.createElement("img");
        img.src = imageUrl;
    
        const titleElement = document.createElement("div");
        titleElement.innerText = title;
    
        div.appendChild(img);
        div.appendChild(titleElement);
        return div;
    }

    function appendChildren(child) {
        const works = document.querySelector("#gallery");
        works.appendChild(child);
    }

    
    