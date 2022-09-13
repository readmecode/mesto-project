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
    fieldAvatar,
    fieldProfile,
    jobProfile,
    nameProfile,
    nameInput,
    jobInput
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
        closePopup(e.currentTarget);
    }
}

function editFormSubmitHandler(e) {
    e.preventDefault();
    editProfile()
        .then(
            (fieldProfile.innerText = "Сохранение..."),
            (nameProfile.textContent = nameInput.value),
            (jobProfile.textContent = jobInput.value),
            closePopup(profilePopup)
        )
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally((e) => {
            fieldProfile.innerText = "Сохранить";
        });
}

function avatarFormSubmitHandler(e) {
    e.preventDefault();
    editAvatar()
        .then(
            (fieldAvatar.innerText = "Сохранение..."),
            (avatarLink.src = avatarInput.value),
            closePopup(avatarPopup)
        )
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally((e) => {
            fieldAvatar.innerText = "Сохранить";
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