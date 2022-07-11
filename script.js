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

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function editFormSubmitHandler(e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profilePopup);
}

function activateElement(e) {
    e.target.classList.toggle("elements__icon_active");
}

function openPopupImage(imgLink, imgTitle) {
    openPopup(imagePopup);
    cardImg.setAttribute("src", imgLink);
    cardImg.alt = this.alt;
    cardTitle.textContent = imgTitle;
}

function createCardTemplate(titleTemplate, imageLink) {
    const cardElement = cardsTemplate.cloneNode(true);

    const cardElementTrash = cardElement.querySelector(".elements__trash");

    const cardElementImage = cardElement.querySelector(".elements__pic");
    const cardElementTitle = cardElement.querySelector(".elements__title");
    const cardElementLike = cardElement.querySelector("#icon");

    cardElementTitle.textContent = titleTemplate;
    cardElementImage.src = imageLink;
    cardElementImage.alt = imageLink;

    cardElementLike.addEventListener("click", activateElement);

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        e.target.closest(".elements__item").remove();
    });

    return cardElement;
}

function renderCard(elementName, elementLink) {
    const newCards = createCardTemplate(elementName, elementLink);
    cardsContainer.prepend(newCards);
}

function createCard(evt) {
    evt.preventDefault();
    renderCard(newCardName.value, newCardLink.value);
}

profileCloseButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    closePopup(profilePopup);
});

cardCloseButton.addEventListener("click", () => {
    closePopup(cardPopup);
});

cardSubmitButton.addEventListener("click", () => {
    closePopup(cardPopup);
});

imageCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
});

profileEditButton.addEventListener("click", () => {
    openPopup(profilePopup);
});

cardAddButton.addEventListener("click", () => {
    addCardForm.reset();
    openPopup(cardPopup);
});

cardAddForm.addEventListener("submit", createCard);

profileEditForm.addEventListener("submit", editFormSubmitHandler);

initialCards.forEach(function(card) {
    renderCard(card.name, card.link);
});