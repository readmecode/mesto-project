import {get } from "jquery";
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
    nameInput,
    jobInput,
    nameProfile,
    jobProfile,
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
    fieldProfile.innerText = "Сохранение...";
    editProfile(nameInput.value, jobInput.value)
        .then((res) => {
            nameProfile.textContent = res.name;
            jobProfile.textContent = res.about;
            closePopup(profilePopup);
            e.submitter.classList.add("popup__submit_inactive");
            e.submitter.disabled = true;
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
            fieldProfile.innerText = "Сохранить";
        });
}

function avatarFormSubmitHandler(e) {
    e.preventDefault();
    fieldAvatar.innerText = "Сохранение...";
    editAvatar(avatarInput.value)
        .then(() => {
            avatarLink.src = avatarInput.value;
            closePopup(avatarPopup);
            e.target.reset();
            e.submitter.classList.add("popup__submit_inactive");
            e.submitter.disabled = true;
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
            fieldAvatar.innerText = "Сохранить";
        });
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