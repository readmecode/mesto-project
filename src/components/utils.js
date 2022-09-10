import { handleEscapeKey, overlayHandler } from "./modal.js";

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("mousedown", overlayHandler);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", overlayHandler);
}

function loadStatus(evt) {
    const field = document.querySelectorAll(".popup__submit");
    field.innerText = 'Сохранение...';
    console.log('Сохранение...');
}

export { openPopup, closePopup, loadStatus };