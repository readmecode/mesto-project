import { editProfile, editAvatar } from "./api.js";

import {
    cardImg,
    cardTitle,
    imagePopup,
    profilePopup,
    avatarInput,
    avatarLink,
    avatarPopup,
    avatarOverlay,
} from "./constant.js";

import { openPopup, closePopup } from "./utils.js";

function handleEscapeKey(evt) {
    if (evt.key == "Escape") {
        const activePopup = document.querySelector(".popup_opened");
        closePopup(activePopup);
    }
}

function overlayHandler(e) {
    if (e.target.querySelector(".popup__overlay")) {
        const activePopup = document.querySelector(".popup_opened");
        closePopup(activePopup);
    }
}

function editFormSubmitHandler(e) {
    e.preventDefault();
    editProfile()
        .then(closePopup(profilePopup))
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally((evt) => {
            const field = profilePopup.querySelector(".popup__submit");
            field.innerText = "Сохранить";
        });
}

function avatarFormSubmitHandler(e) {
    e.preventDefault();
    avatarLink.src = avatarInput.value;
    editAvatar()
        .then(closePopup(avatarPopup))
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally((evt) => {
            const field = avatarPopup.querySelector(".popup__submit");
            field.innerText = "Сохранить";
        });
    e.target.reset();
}

function showAvatarEditButton() {
    avatarOverlay.classList.add("profile__avataroverlay_opened");
}

function hideAvatarEditButton() {
    avatarOverlay.classList.remove("profile__avataroverlay_opened");
}

function openPopupImage(imgLink, imgTitle) {
    openPopup(imagePopup);
    cardImg.setAttribute("src", imgLink);
    cardImg.alt = imgLink.alt;
    cardTitle.textContent = imgTitle;
}

export {
    handleEscapeKey,
    overlayHandler,
    editFormSubmitHandler,
    openPopupImage,
    avatarFormSubmitHandler,
    showAvatarEditButton,
    hideAvatarEditButton,
};