import { event } from "jquery";
import { nameInput, jobInput, avatarLink } from "./constant.js";

export const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
    headers: {
        authorization: "95e36dd7-8c37-4785-9cfa-2d706a4352cf",
        "Content-Type": "application/json",
    },
};

export function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
        getResponseData
    );
};

export function editProfile(profile, job) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: profile,
            about: job,
        }),
    });
};

export function editAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        }),
    });
};

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
        getResponseData
    );
};

export function postCard(name, url) {
    return fetch(`${config.baseUrl}/cards`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                name: name,
                link: url,
            }),
        })
        .then(getResponseData)
}

export function deleteCardfromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(getResponseData);
}

export function likeCardfromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    }).then(getResponseData);
}

export function deleteLikefromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(getResponseData);
}