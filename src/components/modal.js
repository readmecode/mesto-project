export { closePopup, keyHandler, overlayHandler, openPopup };

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function keyHandler(evt) {
    const activePopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(activePopup);
    }
}

function overlayHandler(e) {
    const activePopup = document.querySelector(".popup_opened");
    if (e.target.querySelector(".popup__overlay")) {
        closePopup(activePopup);
    }
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("click", overlayHandler);
}