import { fetchWorks } from './api.js';
import { openModal } from './modal.js';


document.addEventListener('DOMContentLoaded', function () {
    fetchWorks()
        .then((worksData) => {
            worksData.forEach((item) => {
                const figureElement = createFigureElement(item);
                appendChildren(figureElement);
            });
        });
});

export function createFigureElement(item) {
    const figure = document.createElement("figure");
    const img = getImg(item.imageUrl);
    const title = getTitle(item.title);
    // TODO: Add alt attributes for images
    figure.appendChild(img);
    figure.appendChild(title);
    return figure;
}

export function getImg(imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    return img;
}

function getTitle(titleText) {
    const title = document.createElement("figcaption");
    title.textContent = titleText;
    return title;
}

function appendChildren(child) {
    const works = document.querySelector("#gallery");
    works.appendChild(child);
}

document.addEventListener('DOMContentLoaded', function () {
    let btns = document.querySelectorAll('.button');
    const works = document.querySelector("#gallery");

    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            while (works.firstChild) {
                works.removeChild(works.firstChild);
            }

            let categorySelected = btn.dataset.category;

            fetchWorks().then((worksData) => {
                worksData.forEach((item) => {
                    if (categorySelected === "0" || item.categoryId === parseInt(categorySelected)) {
                        const figureElement = createFigureElement(item);
                        appendChildren(figureElement);
                    }
                });
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const blackHeader = document.querySelector('.blackheader');
    const isAuthenticated = localStorage.getItem('authenticated');

    if (isAuthenticated === 'true' && blackHeader) {
        blackHeader.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const login = document.querySelector('.login');
    const isAuthenticated = localStorage.getItem('authenticated');

    if (isAuthenticated === 'true' && login) {
        login.textContent = 'logout';
    }
});