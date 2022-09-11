import {
    cardsTemplate,
    cardsContainer,
    newCardName,
    newCardLink,
    cardPopup,
} from "./constant.js";
import { openPopupImage } from "./modal.js";
import { closePopup } from "./utils.js";

import {
    postCard,
    deleteCardfromServer,
    likeCardfromServer,
    deleteLikefromServer,
} from "./api.js";

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

    function toggleLike(e) {
        if (+counter.textContent == 0) {
            e.target.classList.add("elements__icon_active");
            likeCardfromServer(cardId).then(
                (counter.innerText = Number(counter.innerText) + 1)
            );
        } else {
            e.target.classList.remove("elements__icon_active");
            deleteLikefromServer(cardId).then((counter.innerText = ""));
        }
    }

    if (userId !== cardOwnerId) {
        cardElementTrash.classList.add("elements__trash_disabled");
    }

    if (cardLikes.some((item) => item._id == userId)) {
        cardElementLike.classList.add("elements__icon_active");
    }

    counter.innerText = cardLikes.length;

    cardElementLike.addEventListener("click", toggleLike);

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        deleteCardfromServer(cardId).then(
            e.target.closest(".elements__item").remove()
        );
    });

    return cardElement;
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

function createCard(evt) {
    evt.submitter.classList.add("popup__submit_inactive");
    evt.submitter.disabled = true;
    postCard(newCardName.value, newCardLink.value).then(closePopup(cardPopup));
    evt.target.reset();
}

export { createCardTemplate, renderCard, createCard };