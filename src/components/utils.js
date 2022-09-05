import { handleEscapeKey, overlayHandler } from "./modal.js";

import { nameProfile, jobProfile, nameInput, jobInput } from "./constant.js";

import { enableValidation } from "./validate.js";

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("mousedown", overlayHandler);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", overlayHandler);
    enableValidation({
        formSelector: ".popup__input-container",
        inputSelector: ".popup__form-item",
        submitButtonSelector: ".popup__submit",
        inactiveButtonClass: "popup__submit_inactive",
        inputErrorClass: "popup__form-item-type-error",
        errorClass: "popup__form-item-error_active",
    });
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

export { openPopup, closePopup };