import "./styles/index.css";

import {
    initialCards,
    profilePopup,
    cardPopup,
    profileEditButton,
    cardAddButton,
    profileEditForm,
    cardAddForm,
    closeButtons,
} from "./components/constant.js";

import { closePopup, openPopup } from "./components/utils.js";

import { editFormSubmitHandler } from "./components/modal.js";

import { renderCard, createCard } from "./components/card.js";

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

profileEditButton.addEventListener("click", () => {
    openPopup(profilePopup);
});

cardAddButton.addEventListener("click", () => {
    openPopup(cardPopup);
});

cardAddForm.addEventListener("submit", createCard);

profileEditForm.addEventListener("submit", editFormSubmitHandler);

initialCards.forEach(function(card) {
    renderCard(card.name, card.link);
});