const modal = document.querySelector("#profile");
const trigger = document.querySelector(".profile__edit-button");

const closeButton = document.querySelectorAll(".popup__close-button");

const modalProfile = document.querySelector("#card");
const profile = document.querySelector(".profile__add-button");

const submit = document.querySelectorAll(".popup__submit");

function toggleModal(event) {
    if (event.target.matches(".profile__edit-button")) {
        modal.classList.add("popup_opened");
    } else if (event.target.matches(".profile__add-button")) {
        modalProfile.classList.add("popup_opened");
    } else if (event.target.matches("#profile .popup__close-button")) {
        modal.classList.remove("popup_opened");
    } else if (event.target.matches("#profile .popup__submit")) {
        modal.classList.remove("popup_opened");
    } else if (event.target.matches("#card .popup__close-button")) {
        modalProfile.classList.remove("popup_opened");
    } else if (event.target.matches("#card .popup__submit")) {
        modalProfile.classList.remove("popup_opened");
    } else if (event.target.matches("#card .popup__submit")) {
        modalProfile.classList.remove("popup_opened");
    } else if (event.target.matches("#popup-img .popup__close-button")) {
        modalImage.classList.remove("popup_opened");
    }
}

profile.addEventListener("click", toggleModal);
trigger.addEventListener("click", toggleModal);
trigger.addEventListener("click", toggleModal);
closeButton.forEach((btn) => btn.addEventListener("click", toggleModal));
submit.forEach((btn) => btn.addEventListener("click", toggleModal));

const formElement = document.querySelector("#profile .popup__submit");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-desc");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");

function formSubmitHandler(e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}
formElement.addEventListener("click", formSubmitHandler);

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

const addPhotoElement = (caption, imageLink) => {
    const elementTemplate = document.querySelector(
        "#photo-elements-template"
    ).content;
    const photoElement = elementTemplate.cloneNode(true);
    photoElement.querySelector(".elements__pic").src = imageLink;
    photoElement.querySelector(".elements__title").textContent = caption;
    const photoElementsList = document.querySelector(".elements");
    photoElementsList.prepend(photoElement);

    document.querySelector("#icon").addEventListener("click", function(evt) {
        evt.target.classList.toggle("elements__icon_active");
    });

    const deleteButton = document.querySelector("#trash");
    deleteButton.addEventListener("click", function() {
        const listItem = deleteButton.closest(".elements__item");
        listItem.remove();
    });

    const modalPopup = document.getElementById("popup-img");

    const img = document.getElementById("image");
    const imgModal = document.getElementById("img-popup");
    const captionText = document.getElementById("title-popup");

    img.onclick = function() {
        modalPopup.classList.add("popup_opened");
        imgModal.src = this.src;
        captionText.innerHTML = document.getElementById("el-title").innerHTML;
    };

    const modalPopupClose = document.getElementById("button-img");
    modalPopupClose.onclick = function() {
        modalPopup.style.display = "none";
    };
};

const addCards = (array) => {
    array.forEach((item) => {
        addPhotoElement(item.name, item.link);
    });
};
addCards(initialCards);

const addSubmitHandler = (e) => {
    const newPhotoElementName = document.getElementById("name").value;
    const newPhotoElementLink = document.getElementById("link").value;

    addPhotoElement(newPhotoElementName, newPhotoElementLink);
};
const imageElement = document.querySelector("#card .popup__submit");
imageElement.addEventListener("click", addSubmitHandler);