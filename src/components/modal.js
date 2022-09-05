export { closePopup, keyHandler, overlayHandler, openPopup };

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", keyHandler);
    document.removeEventListener("click", overlayHandler);
}

function keyHandler(evt) {
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

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("click", overlayHandler);
}