export { openPopupImage, editFormSubmitHandler };
import { openPopup, closePopup } from "./modal.js";
import {
    cardImg,
    cardTitle,
    imagePopup,
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    profilePopup,
} from "./constant.js";

function editFormSubmitHandler(e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profilePopup);
}

function openPopupImage(imgLink, imgTitle) {
    openPopup(imagePopup);
    cardImg.setAttribute("src", imgLink);
    cardImg.alt = imgLink.alt;
    cardTitle.textContent = imgTitle;
}