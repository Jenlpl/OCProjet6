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
    const img = getImg(item.imageUrl);
    //const trashIcon = poubelle.cloneNode(true);
   // trashIcon.classList.add('delete-icon');
   // trashIcon.addEventListener('click', () => deleteImage(item.id));
    document.addEventListener('click', deleteImage)
function deleteImage() {
   // document.removeChild('modal-figure')
  }
    console.log(deleteImage)
    // TODO: Add alt attributes for images
    figure.appendChild(img);
   // figure.appendChild(trashIcon);
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





