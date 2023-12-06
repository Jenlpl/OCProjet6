import { fetchWorks } from "./api.js";
import { getImg } from "./script.js";

let modal = null;

export const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', true);
    modal = target;
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
};

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', true);
    modal.removeAttribute('aria-modal');
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal = null;
};

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }        
}


function createFigureElement(item) {
    const figure = document.createElement("figure");
    figure.classList.add("modal-figure");
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete-icon");
   const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-regular", "fa-trash-can");
    deleteDiv.appendChild(trashIcon);
    trashIcon.addEventListener('click', () => trashIcon.closest('.modal-figure').remove());
    const img = getImg(item.imageUrl);
function deleteImage() {
   document.removeChild('modal-figure')
  }
    // TODO: Add alt attributes for images
    figure.appendChild(img);
    figure.appendChild(deleteDiv);
    return figure;
}

document.addEventListener('DOMContentLoaded', function () {
    fetchWorks()
        .then((worksData) => {
            worksData.forEach((item) => {
                const figureElement = createFigureElement(item);
                appendChildren(figureElement);
            });
        });
});

function appendChildren(child) {
    const works = document.querySelector("#modal-gallery");
    works.appendChild(child);
}






