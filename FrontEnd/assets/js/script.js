import { fetchWorks } from "./api.js";
import { getIsAuthenticated, logOut } from "./session.js";

// Handling logout when the login button is clicked

const loginButton = document.querySelector(".login");
loginButton.addEventListener('click', logOut);

// Figure element loading


  fetchWorks().then((worksData) => {
    worksData.forEach((item) => {
      const figureElement = createFigureElements(item);
      appendChildrens(figureElement);
    });
  });


// Create figure element

 export function createFigureElements(item) {
  const figure = document.createElement("figure");
  figure.id = `work-${item.id}`;
  const img = getImg(item.imageUrl);
  const title = getTitle(item.title);
  img.alt = item.title;
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

export function appendChildrens(child) {
  const works = document.querySelector("#gallery");
  works.appendChild(child);
}

// Gestion des boutons de filtre par catégorie

document.addEventListener("DOMContentLoaded", function () {
  let btns = document.querySelectorAll(".button");
  const works = document.querySelector("#gallery");

  // Remove all works when a category filter button is clicked

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Remove existing works from the "works" element
      while (works.firstChild) {
        works.removeChild(works.firstChild);
      }


// Remove the active class from all buttons
btns.forEach(function (btn) {
  btn.classList.remove("active");
});

// Add the active class to the clicked button
btn.classList.add("active");



 // Get the selected category from the clicked button's data attribute
      let categorySelected = btn.dataset.category;

      fetchWorks().then((worksData) => {
        // Iterate through each work item in the fetched data
        worksData.forEach((item) => {

          // Check if the selected category is "0" (all categories)
        // or if the work item's categoryId matches the selected category
          if (
            categorySelected === "0" ||
            item.categoryId === parseInt(categorySelected)
          ) {
            const figureElement = createFigureElements(item);
            appendChildrens(figureElement);
          }
        });
      });
    });
  });
});

// Show black header + hiding category buttons and button "modifier"

document.addEventListener("DOMContentLoaded", function () {
  const filtreButtons = document.querySelector(".filtre");
  const blackHeader = document.querySelector(".blackheader");
  const buttonModifier = document.querySelector(".icon-modifier")
  const isAuthenticated = getIsAuthenticated();
  if (isAuthenticated) {
    blackHeader.style.display = "flex";
    filtreButtons.style.visibility = "hidden";
    buttonModifier.style.display = "flex";
  }
});

// Change text Login -> Logout

document.addEventListener("DOMContentLoaded", function () {
  const login = document.querySelector(".login");
  if (getIsAuthenticated()) {
    login.textContent = "logout";
  }
});



