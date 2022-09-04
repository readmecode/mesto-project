export {
    initialCards,
    profilePopup,
    cardPopup,
    imagePopup,
    cardCloseButton,
    cardSubmitButton,
    imageCloseButton,
    profileEditButton,
    profileCloseButton,
    cardAddButton,
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    cardsTemplate,
    cardsContainer,
    cardDeleteButton,
    cardTitle,
    cardImg,
    titleTemplate,
    profileEditForm,
    cardAddForm,
    newCardName,
    newCardLink,
    formElement,
    formInput,
    formError
};

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

const profilePopup = document.querySelector("#profile");
const cardPopup = document.querySelector("#card");
const imagePopup = document.querySelector("#popup-img");

const profileCloseButton = profilePopup.querySelector(
    "#profile .popup__close-button"
);
const profileSubmitButton = profilePopup.querySelector(
    "#profile .popup__submit"
);
const cardCloseButton = cardPopup.querySelector("#card .popup__close-button");
const cardSubmitButton = cardPopup.querySelector("#card .popup__submit");
const imageCloseButton = imagePopup.querySelector(
    "#popup-img .popup__close-button"
);

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-desc");

const cardsTemplate = document.querySelector(
    "#photo-elements-template"
).content;

const cardsContainer = document.querySelector(".elements");
const cardDeleteButton = document.querySelector("#trash");
const cardTitle = document.getElementById("title-popup");
const cardImg = document.getElementById("img-popup");

const titleTemplate = document.querySelector("#el-title");

const profileEditForm = document.getElementById("editProfileForm");
const cardAddForm = document.getElementById("addCardForm");

const newCardName = addCardForm.querySelector("#name");
const newCardLink = addCardForm.querySelector("#link");

const formElement = document.querySelector(".popup__input-container");
const formInput = formElement.querySelector(".popup__form-item");
const formError = formElement.querySelector(`.${formInput.id}-error`);