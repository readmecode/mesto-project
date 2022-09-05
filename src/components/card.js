import {
    cardsTemplate,
    cardsContainer,
    titleTemplate,
    newCardName,
    newCardLink,
    cardPopup,
} from "./constant.js";
import { openPopupImage } from "./modal.js";
import { closePopup } from "./utils.js";

function createCardTemplate(titleTemplate, imageLink) {
    const cardElement = cardsTemplate.cloneNode(true);

    const cardElementTrash = cardElement.querySelector(".elements__trash");

    const cardElementImage = cardElement.querySelector(".elements__pic");
    const cardElementTitle = cardElement.querySelector(".elements__title");
    const cardElementLike = cardElement.querySelector("#icon");

    cardElementTitle.textContent = titleTemplate;
    cardElementImage.src = imageLink;
    cardElementImage.alt = imageLink;

    cardElementLike.addEventListener("click", toggleLike);

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        e.target.closest(".elements__item").remove();
    });

    return cardElement;
}

function renderCard(elementName, elementLink) {
    const newCard = createCardTemplate(elementName, elementLink);
    cardsContainer.prepend(newCard);
}

function createCard(evt) {
    evt.submitter.classList.add("popup__submit_inactive");
    evt.submitter.disabled = true;
    renderCard(newCardName.value, newCardLink.value);
    evt.target.reset();
    closePopup(cardPopup);
}

function toggleLike(e) {
    e.target.classList.toggle("elements__icon_active");
}

export { createCardTemplate, renderCard, createCard, toggleLike };