import {
    postCard,
    editProfile,
    getProfile,
    getCards,
    getIdData,
} from "./components/api.js";

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
    jobProfile,
    avatarPopup,
    avatarChangeButton,
    avatarOverlay,
    avatarLink,
    avatarChangeForm
} from "./components/constant.js";

import { closePopup, openPopup, loadStatus } from "./components/utils.js";

import {
    editFormSubmitHandler,
    avatarFormSubmitHandler,
    showAvatarEditButton
} from "./components/modal.js";

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

avatarChangeButton.addEventListener("click", () => {
    openPopup(avatarPopup);
});

cardAddForm.addEventListener("submit", createCard);

profileEditForm.addEventListener("submit", editFormSubmitHandler);

avatarChangeForm.addEventListener("submit", avatarFormSubmitHandler);

avatarLink.addEventListener("mouseover", showAvatarEditButton);

profileEditForm.addEventListener('submit', loadStatus);
avatarChangeForm.addEventListener('submit', loadStatus);
cardAddForm.addEventListener('submit', loadStatus);

getProfile();
getCards();