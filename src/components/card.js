import {
    cardsTemplate,
    cardsContainer,
    newCardName,
    newCardLink,
    cardPopup,
    fieldCard
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

    function changeZeroLikeIcon() {
        if (counter.innerText == 0) {
            counter.innerText = "";
        }
    }

    counter.innerText = cardLikes.length;

    function toggleLike(e) {
        if (e.target.classList.contains("elements__icon_active")) {
            deleteLikefromServer(cardId)
                .then(
                    (counter.innerText = Number(counter.innerText) - 1),
                    changeZeroLikeIcon(),
                    e.target.classList.remove("elements__icon_active")
                )
                .catch((err) => console.log(`Ошибка.....: ${err}`));
        } else {
            likeCardfromServer(cardId)
                .then(
                    changeZeroLikeIcon(),
                    (counter.innerText = Number(counter.innerText) + 1),
                    e.target.classList.add("elements__icon_active")
                )
                .catch((err) => console.log(`Ошибка.....: ${err}`));
        }
    }

    if (counter.innerText == 0) {
        counter.innerText = "";
    }

    if (userId !== cardOwnerId) {
        cardElementTrash.classList.add("elements__trash_disabled");
    }

    cardElementLike.addEventListener("click", toggleLike);

    if (cardLikes.some((item) => item._id == userId)) {
        cardElementLike.classList.add("elements__icon_active");
    }

    cardElementImage.addEventListener("click", () => {
        openPopupImage(imageLink, titleTemplate);
    });

    cardElementTrash.addEventListener("click", function(e) {
        deleteCardfromServer(cardId)
            .then(e.target.closest(".elements__item").remove())
            .catch((err) => console.log(`Ошибка.....: ${err}`));
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
    postCard(newCardName.value, newCardLink.value)
        .then((fieldCard.innerText = "Сохранение..."), closePopup(cardPopup))
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally((evt) => {
            fieldCard.innerText = "Создать";
        });
    evt.target.reset();
}

export { createCardTemplate, renderCard, createCard };