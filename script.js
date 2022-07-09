const initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const formEditProfile = document.querySelector("#profile");
const formAddCard = document.querySelector("#card");
const popupOpenCard = document.querySelector("#popup-img");

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const imageOpenCard = document.querySelector(".elements__pic");

const closeButtonList = document.querySelectorAll(".popup__close-button");
const submitButtonList = document.querySelectorAll(".popup__submit");

const editFormElement = document.querySelector("#profile .popup__submit");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-desc");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");

const newCardName = document.querySelector("#name");
const newCardLink = document.querySelector("#link");

const cardsTemplate = document.querySelector(
    "#photo-elements-template"
).content;

const cardElementsList = document.querySelector(".elements");
const cardDeleteButton = document.querySelector("#trash");
const cardTitle = document.getElementById("title-popup");
const cardImg = document.getElementById("img-popup");

const title = document.querySelector("#el-title");

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function closePopupList(e) {
    if (e.target.matches("#profile .popup__close-button")) {
        closePopup(formEditProfile);
    } else if (e.target.matches("#card .popup__close-button")) {
        closePopup(formAddCard);
    } else if (e.target.matches("#profile .popup__submit")) {
        closePopup(formEditProfile);
    } else if (e.target.matches("#card .popup__submit")) {
        closePopup(formAddCard);
    } else if (e.target.matches("#popup-img .popup__close-button")) {
        closePopup(popupOpenCard);
    }
}

function editFormSubmitHandler(e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

function addElement(title, imageLink) {
    const cardElement = cardsTemplate.cloneNode(true);
    const img = cardElement.querySelector("#image");
    const trash = cardElement.querySelector(".elements__trash");

    cardElement.querySelector(".elements__pic").src = imageLink;
    cardElement.querySelector(".elements__title").textContent = title;
    cardElement.querySelector(".elements__pic").alt = imageLink;
    cardElement.querySelector("#icon").addEventListener("click", activateElement);

    function activateElement(evt) {
        evt.target.classList.toggle("elements__icon_active");
    }

    img.addEventListener("click", () => {
        openPopupImage(imageLink, title);
    });

    trash.addEventListener("click", function(evt) {
        evt.target.closest(".elements__item").remove();
    });
    return cardElement;
}

function renderCard(elementName, elementLink) {
    const initializatedCards = addElement(elementName, elementLink);
    cardElementsList.prepend(initializatedCards);
}

initialCards.forEach(function(card) {
    renderCard(card.name, card.link);
});

function openPopupImage(imgLink, imgTitle) {
    openPopup(popupOpenCard);
    cardImg.setAttribute("src", imgLink);
    cardImg.alt = this.alt;
    cardTitle.textContent = imgTitle;
}

function createCard(evt) {
    evt.preventDefault();
    renderCard(newCardName.value, newCardLink.value);
    formAddCard.reset();
    closePopup(popupOpenCard);
}

formAddCard.addEventListener("submit", createCard);
profileEditButton.addEventListener("click", () => {
    openPopup(formEditProfile);
});
addCardButton.addEventListener("click", () => {
    openPopup(formAddCard);
});
editFormElement.addEventListener("click", editFormSubmitHandler);
closeButtonList.forEach((btn) => btn.addEventListener("click", closePopupList));
submitButtonList.forEach((btn) =>
    btn.addEventListener("click", closePopupList)
);