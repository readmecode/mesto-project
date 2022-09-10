import {
    cardsTemplate,
    cardsContainer,
    titleTemplate,
    newCardName,
    newCardLink,
    cardPopup,
} from "./constant.js";
import { openPopupImage } from "./modal.js";
import { closePopup } from "./utils.js";

import {
    postCard,
    deleteCardfromServer,
    userId,
    likeCardfromServer,
    deleteLikefromServer,
} from "./api.js";

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

    cardElementTitle.textContent = titleTemplate;
    cardElementImage.src = imageLink;
    cardElementImage.alt = imageLink;

    function toggleLike(e) {
        const button = e.target.closest(".elements__design-button");
        const counter = button.querySelector(".elements__likecount");
        if (+counter.textContent == 0) {
            e.target.classList.add("elements__icon_active");
            counter.innerText = Number(counter.innerText) + 1;
            likeCardfromServer(cardId);
        } else {
            e.target.classList.remove("elements__icon_active");
            counter.innerText = "";
            deleteLikefromServer(cardId);
        }
    }

    if (userId !== cardOwnerId) {
        cardElementTrash.classList.add("elements__trash_disabled");
    }

    if (cardLikes.some((item) => item._id == userId)) {
        cardElementLike.classList.add("elements__icon_active");
        const counter = cardElement.querySelector(".elements__likecount");
        const newArr = cardLikes.join().split(",");
        const count = newArr;
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i] == userId) {
                count++;
            }
        }
        counter.innerText = count.length;
    }

    cardElementLike.addEventListener("click", toggleLike);

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        deleteCardfromServer(cardId);
        e.target.closest(".elements__item").remove();
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
    renderCard(newCardName.value, newCardLink.value);
    postCard(newCardName.value, newCardLink.value);
    evt.target.reset();
    closePopup(cardPopup);
}

export { createCardTemplate, renderCard, createCard };