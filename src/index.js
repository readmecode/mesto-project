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
    nameInput,
    jobInput,
    nameProfile,
    jobProfile
} from "./components/constant.js";

import { closePopup, openPopup } from "./components/utils.js";

import { editFormSubmitHandler } from "./components/modal.js";

import { renderCard, createCard } from "./components/card.js";

import { enableValidation } from "./components/validate.js";

enableValidation({
    formSelector: ".popup__input-container",
    inputSelector: ".popup__form-item",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__form-item-type-error",
    errorClass: "popup__form-item-error_active",
});

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

profileEditButton.addEventListener("click", () => {
    openPopup(profilePopup);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

cardAddButton.addEventListener("click", () => {
    openPopup(cardPopup);
});

cardAddForm.addEventListener("submit", createCard);

profileEditForm.addEventListener("submit", editFormSubmitHandler);

initialCards.forEach(function(card) {
    renderCard(card.name, card.link);
});