import { event } from "jquery";

export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getProfile = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this.getResponseData);
    };

    editProfile(profile, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: profile,
                about: job,
            }),
        }).then(this.getResponseData);
    }

    editAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            }),
        }).then(this.getResponseData);
    }

    getCards = () => {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
            this.getResponseData
        );
    };

    postCard(name, url) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: url,
            }),
        }).then(this.getResponseData);
    }

    deleteCardfromServer(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this.getResponseData);
    }

    likeCardfromServer(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this.getResponseData);
    }

    deleteLikefromServer(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this.getResponseData);
    }
}