import { fetchWorks } from "./api.js";
import { getIsAuthenticated } from "./session.js";
import { logOut } from "./session.js";
import { openModal } from "./modal.js";

const logout = document.querySelector(".login");
logout.addEventListener('click', logOut);

// Figure element loading

document.addEventListener("DOMContentLoaded", function () {
  fetchWorks().then((worksData) => {
    worksData.forEach((item) => {
      const figureElement = createFigureElement(item);
      appendChildren(figureElement);
    });
  });
});

// Create figure element

export function createFigureElement(item) {
  const figure = document.createElement("figure");
  figure.id = `work-${item.id}`;
  const img = getImg(item.imageUrl);
  const title = getTitle(item.title);
  // TODO: Add alt attributes for images
  figure.appendChild(img);
  figure.appendChild(title);
  return figure;
}

//Create image

export function getImg(imageUrl) {
  const img = document.createElement("img");
  img.src = imageUrl;
  return img;
}

//Create title

function getTitle(titleText) {
  const title = document.createElement("figcaption");
  title.textContent = titleText;
  return title;
}

// Add child enfant à la galerie

function appendChildren(child) {
  const works = document.querySelector("#gallery");
  works.appendChild(child);
}

// Gestion des boutons de filtre par catégorie

document.addEventListener("DOMContentLoaded", function () {
  let btns = document.querySelectorAll(".button");
  const works = document.querySelector("#gallery");

  // Remove all works

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      while (works.firstChild) {
        works.removeChild(works.firstChild);
      }


      let categorySelected = btn.dataset.category;

      fetchWorks().then((worksData) => {
        worksData.forEach((item) => {
          if (
            categorySelected === "0" ||
            item.categoryId === parseInt(categorySelected)
          ) {
            const figureElement = createFigureElement(item);
            appendChildren(figureElement);
          }
        });
      });
    });
  });
});

// Show black header

document.addEventListener("DOMContentLoaded", function () {
  const blackHeader = document.querySelector(".blackheader");
  const isAuthenticated = getIsAuthenticated();
  if (isAuthenticated) {
    blackHeader.style.display = "flex";
  }
  console.log(isAuthenticated)
});

// Change text Login -> Logout

document.addEventListener("DOMContentLoaded", function () {
  const login = document.querySelector(".login");
  if (getIsAuthenticated()) {
    login.textContent = "logout";
  }
});




