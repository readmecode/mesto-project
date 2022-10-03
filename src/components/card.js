import Api from "./api.js";

import { api } from "../index.js";

import {
    cardsTemplate,
    cardsContainer,
    newCardName,
    newCardLink,
    cardPopup,
    fieldCard,
} from "./constant.js";
import { openPopupImage } from "./modal.js";
import { closePopup } from "./utils.js";

import { userId } from "../index.js";

function createCardTemplate(
    titleTemplate,
    imageLink,
    cardId,
    cardOwnerId,
    cardLikes
) {
    const cardElement = cardsTemplate.cloneNode(true);
    const cardElementTrash = cardElement.querySelector(".elements__trash");
    const cardElementImage = cardElement.querySelector(".elements__pic");
    const cardElementTitle = cardElement.querySelector(".elements__title");
    const cardElementLike = cardElement.querySelector("#icon");
    const counter = cardElement.querySelector(".elements__likecount");

    cardElementTitle.textContent = titleTemplate;
    cardElementImage.src = imageLink;
    cardElementImage.alt = imageLink;

    counter.innerText = cardLikes.length;

    function changeZeroLike() {
        if (counter.innerText == 0) {
            counter.innerText = "";
        }
    }

    changeZeroLike();

    cardElementLike.addEventListener("click", () => {
        if (cardElementLike.classList.contains("elements__icon_active")) {
            api
                .deleteLikefromServer(cardId)
                .then((res) => {
                    counter.textContent = res.likes.length;
                    cardElementLike.classList.remove("elements__icon_active");
                    changeZeroLike();
                })
                .catch((err) => console.log(`Ошибка.....: ${err}`));
        } else {
            api
                .likeCardfromServer(cardId)
                .then((res) => {
                    counter.textContent = res.likes.length;
                    cardElementLike.classList.add("elements__icon_active");
                    changeZeroLike();
                })
                .catch((err) => console.log(`Ошибка.....: ${err}`));
        }
    });

    if (userId !== cardOwnerId) {
        cardElementTrash.classList.add("elements__trash_disabled");
    }

    if (cardLikes.some((item) => item._id == userId)) {
        cardElementLike.classList.add("elements__icon_active");
    }

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        api
            .deleteCardfromServer(cardId)
            .then(() => {
                e.target.closest(".elements__item").remove();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    });

    return cardElement;
}

function createCard(e) {
    e.preventDefault();
    fieldCard.innerText = "Сохранение...";
    api
        .postCard(newCardName.value, newCardLink.value)
        .then((res) => {
            renderCard(res.name, res.link, res._id, res.owner._id, res.likes);
            closePopup(cardPopup);
            e.target.reset();
            e.submitter.classList.add("popup__submit_inactive");
            e.submitter.disabled = true;
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
            fieldCard.innerText = "Создать";
        });
}

function renderCard(elementName, elementLink, cardId, cardOwnerId, cardLikes) {
    const newCard = createCardTemplate(
        elementName,
        elementLink,
        cardId,
        cardOwnerId,
        cardLikes
    );
    cardsContainer.prepend(newCard);
}

export { createCardTemplate, renderCard, createCard };