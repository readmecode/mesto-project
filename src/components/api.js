import { event } from "jquery";
import { createCard, renderCard, toggleLike } from "./card.js";
import {
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    newCardName,
    newCardLink,
    avatarLink,
    cardDeleteButton,
} from "./constant.js";

export const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
};

export const headers = {
    headers: {
        authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
        "Content-Type": "application/json",
    },
};

export let userId = "8119765179abb163363ffded";

export const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, headers)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            (nameProfile.textContent = data.name),
            (jobProfile.textContent = data.about),
            (avatarLink.src = data.avatar),
            (userId = data._id);
        });
};

export const editProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: `${nameInput.value}`,
            about: `${jobInput.value}`,
        }),
    });
};

export const editAvatar = () => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: `${avatarLink.src}`,
        }),
    });
};

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, headers)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            data.forEach(function(cardData) {
                renderCard(
                    cardData.name,
                    cardData.link,
                    cardData._id,
                    cardData.owner._id,
                    cardData.likes
                );


            });
        });
};

export function postCard(name, url) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            link: url,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteCardfromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function likeCardfromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка like: ${res.status}`);
    });
}

export function deleteLikefromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка delete: ${res.status}`);
    });
}