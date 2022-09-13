import { getProfile, getCards } from "./components/api.js";

import "./styles/index.css";

import {
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
    avatarLink,
    avatarChangeForm,
    avatarOverlay,
} from "./components/constant.js";

import { closePopup, openPopup } from "./components/utils.js";

import {
    editFormSubmitHandler,
    avatarFormSubmitHandler,
    showAvatarEditButton,
    hideAvatarEditButton,
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
avatarOverlay.addEventListener("mouseout", hideAvatarEditButton);

export let userId = "";

Promise.all([getProfile(), getCards()])
    .then(([data, res]) => {
        nameProfile.textContent = data.name;
        jobProfile.textContent = data.about;
        avatarLink.src = data.avatar;
        userId = data._id;
        res.forEach(function(res) {
            renderCard(
                res.name,
                res.link,
                res._id,
                res.owner._id,
                res.likes
            );
        });
    })
    .catch((err) => console.log(err));