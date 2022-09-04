import "./styles/index.css";

import {
    initialCards,
    profilePopup,
    cardPopup,
    imagePopup,
    cardCloseButton,
    cardSubmitButton,
    imageCloseButton,
    profileEditButton,
    profileCloseButton,
    cardAddButton,
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    cardsTemplate,
    cardsContainer,
    cardDeleteButton,
    cardTitle,
    cardImg,
    titleTemplate,
    profileEditForm,
    cardAddForm,
    newCardName,
    newCardLink,
    formElement,
    formInput,
    formError,
} from "./components/constant.js";

import {
    openPopupImage,
    editFormSubmitHandler,
} from "./components/utils.js";

import {
    closePopup,
    keyHandler,
    overlayHandler,
    openPopup,
} from "./components/modal.js";

import {
    createCardTemplate,
    renderCard,
    createCard,
    activateElement,
} from "./components/card.js";

import { enableValidation } from "./components/validate.js";

profileCloseButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    closePopup(profilePopup);
});

cardCloseButton.addEventListener("click", () => {
    closePopup(cardPopup);
});

cardSubmitButton.addEventListener("click", () => {
    closePopup(cardPopup);
});

imageCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
});

profileEditButton.addEventListener("click", () => {
    openPopup(profilePopup);
});

cardAddButton.addEventListener("click", () => {
    addCardForm.reset();
    openPopup(cardPopup);
});

cardAddForm.addEventListener("submit", createCard);

profileEditForm.addEventListener("submit", editFormSubmitHandler);

initialCards.forEach(function(card) {
    renderCard(card.name, card.link);
});

enableValidation({
    formSelector: ".popup__input-container",
    inputSelector: ".popup__form-item",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "popup__form-item-type-error",
    errorClass: "popup__form-item-error_active",
});