import { handleEscapeKey, overlayHandler } from "./modal.js";

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeKey);
    popup.removeEventListener("mousedown", overlayHandler);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeKey);
    popup.addEventListener("mousedown", overlayHandler);
}

function loadStatus(evt) {
    const field = evt.currentTarget.querySelector(".popup__submit");
    field.innerText = "Сохранение...";
}

export { openPopup, closePopup, loadStatus };