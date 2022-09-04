export { createCardTemplate, renderCard, createCard, activateElement };

import { cardsTemplate, cardsContainer, titleTemplate } from "./constant.js";
import { openPopupImage } from "./utils.js";

function createCardTemplate(titleTemplate, imageLink) {
    const cardElement = cardsTemplate.cloneNode(true);

    const cardElementTrash = cardElement.querySelector(".elements__trash");

    const cardElementImage = cardElement.querySelector(".elements__pic");
    const cardElementTitle = cardElement.querySelector(".elements__title");
    const cardElementLike = cardElement.querySelector("#icon");

    cardElementTitle.textContent = titleTemplate;
    cardElementImage.src = imageLink;
    cardElementImage.alt = imageLink;

    cardElementLike.addEventListener("click", activateElement);

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        e.target.closest(".elements__item").remove();
    });

    return cardElement;
}

function renderCard(elementName, elementLink) {
    const newCards = createCardTemplate(elementName, elementLink);
    cardsContainer.prepend(newCards);
}

function createCard(evt) {
    evt.preventDefault();
    renderCard(newCardName.value, newCardLink.value);
}

function activateElement(e) {
    e.target.classList.toggle("elements__icon_active");
}