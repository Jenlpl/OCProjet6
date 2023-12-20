import { fetchWorks, fetchDelete } from "./api.js";
import { getImg } from "./script.js";

let modal = null;

// Modal opening

export const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", true);
  modal = target;
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
};
  
// Modal closing

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal = null;
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

const arrow = document.querySelector(".arrow");
arrow.addEventListener('click', arrowReturn);
console.log('click')

function arrowReturn() {
  if (modal1 && modal2) {
modal2.style.display = "none";
modal1.style.display = "flex"
  }
}

// Create images

function createFigureElement(item, index) {
  const figure = document.createElement("figure");
  figure.classList.add("modal-figure");
  figure.id = index;  
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("delete-icon");
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-regular", "fa-trash-can");
  deleteDiv.appendChild(trashIcon);
  trashIcon.addEventListener("click", deleteImage);
  const img = getImg(item.imageUrl);
  function deleteImage() {
    trashIcon.closest(".modal-figure").remove();

    fetchDelete(item.id).then((worksData) => {
      console.log(worksData)
    });
  }
  // TODO: Add alt attributes for images
  figure.appendChild(img);
  figure.appendChild(deleteDiv);
  return figure;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchWorks().then((worksData) => {
    worksData.forEach((item, index) => {
      const figureElement = createFigureElement(item, index + 1);
      console.log(figureElement)
      appendChildren(figureElement);
    });
  });
});

function appendChildren(child) {
  const works = document.querySelector("#modal-gallery");
  works.appendChild(child);
}

function switchModals() {
  const modal1 = document.querySelector("#modal1");
  const modal2 = document.querySelector("#modal2");

  if (modal1 && modal2) {
    modal1.style.display = "none";
    modal1.setAttribute("aria-hidden", true);
    modal2.style.display = "flex";
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", true);
    modal = modal2;
    modal
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
  }
}

document
  .querySelector(".add-photo-main")
  .addEventListener("click", switchModals);

  // FormData

  const form = document.querySelector('.send-file-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    
    for(const item of formData.entries()) {
      console.log(item[0], item[1]);
    };

    const chargeUtile = JSON.stringify(formData.item);
  

    
   function postWork() { fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        "Content-type" : "application/json"},
      body: JSON.stringify(sendWork),
  
  })}});


 

 
