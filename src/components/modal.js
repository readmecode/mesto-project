import { editProfile, editAvatar } from "./api.js";

import {
    cardImg,
    cardTitle,
    imagePopup,
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
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
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    editProfile();
    closePopup(profilePopup);
}

function avatarFormSubmitHandler(e) {
    e.preventDefault();
    avatarLink.src = avatarInput.value;
    editAvatar();
    closePopup(avatarPopup);
}

function showAvatarEditButton() {
    avatarOverlay.classList.add("profile__avataroverlay_opened");
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
};