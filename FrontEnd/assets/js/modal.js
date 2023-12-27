import { fetchWorks, fetchDelete, addWork } from "./api.js";
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

// Returt arrow

const arrow = document.querySelector(".arrow");
arrow.addEventListener('click', arrowReturn);

function arrowReturn() {
  const modal1 = document.querySelector("#modal1");
  const modal2 = document.querySelector("#modal2");

  if (modal1 && modal2) {
modal2.style.display = "none";
modal1.style.display = "flex";

modal = modal1;
modal2
      .querySelector(".js-modal-close")
      .removeEventListener("click", closeModal);
      modal1
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
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
  
// Delete image

  trashIcon.addEventListener("click", deleteImage);
  const img = getImg(item.imageUrl);

  function deleteImage() {
   
    trashIcon.closest(".modal-figure").remove();

    fetchDelete(item.id).then((worksData) => {
    });
  }
  img.alt = item.title;
  figure.appendChild(img);
  figure.appendChild(deleteDiv);
  return figure;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchWorks().then((worksData) => {
    worksData.forEach((item, index) => {
      const figureElement = createFigureElement(item, index + 1);
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

  export const submitForm = document.querySelector('.send-file-form');

  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(submitForm);
    addWork(formData);
});

// Image preview

const fileInput = document.getElementById("file-upload"); // Make sure to adjust the ID based on your HTML structure
fileInput.addEventListener("change", handleFileInputChange);


function handleFileInputChange() {
  const previewDiv = document.querySelector(".img-preview");
  const fileButton = document.querySelector(".custom-file-upload");
  const file = fileInput.files[0];
  console.log('fileupload')

  if (file) {
    // Create a FileReader to read the file
    const reader = new FileReader();

    reader.onload = function (e) {
      // Set the source of the preview image to the data URL
      previewDiv.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
    previewDiv.style.display = 'flex';
    fileButton.style.display = 'none';


  } else {
    // Clear the preview if no file is selected
    previewDiv.innerHTML = "";
  }
}

 

 
