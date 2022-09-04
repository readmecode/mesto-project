export { enableValidation };

import { formElement } from "./constant.js";

function enableValidation(params) {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        function setEventListeners(
            inputSelector,
            formElement,
            submitButtonSelector
        ) {
            const inputList = Array.from(formElement.querySelectorAll(inputSelector));

            const buttonElement = formElement.querySelector(submitButtonSelector);

            function toggleButtonState(inputList, buttonElement) {
                function hasInvalidInput(inputList) {
                    return inputList.some((inputElement) => {
                        return !inputElement.validity.valid;
                    });
                }
                if (hasInvalidInput(inputList)) {
                    buttonElement.classList.add(params.inactiveButtonClass);
                    buttonElement.disabled = true;
                } else {
                    buttonElement.classList.remove(params.inactiveButtonClass);
                    buttonElement.disabled = false;
                }
            }

            toggleButtonState(inputList, buttonElement);

            inputList.forEach((inputElement) => {
                inputElement.addEventListener("input", function() {
                    function checkInputValidity(formElement, inputElement) {
                        if (inputElement.validity.patternMismatch) {
                            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
                        } else {
                            inputElement.setCustomValidity("");
                        }
                        if (!inputElement.validity.valid) {
                            function showInputError(formElement, inputElement, errorMessage) {
                                const errorElement = formElement.querySelector(
                                    `.${inputElement.id}-error`
                                );
                                inputElement.classList.add(params.inputErrorClass);
                                errorElement.textContent = errorMessage;
                                errorElement.classList.add(params.errorClass);
                            }
                            showInputError(
                                formElement,
                                inputElement,
                                inputElement.validationMessage
                            );
                        } else {
                            function hideInputError(formElement, inputElement) {
                                const errorElement = formElement.querySelector(
                                    `.${inputElement.id}-error`
                                );
                                inputElement.classList.remove(params.inputErrorClass);
                                errorElement.classList.remove(params.errorClass);
                                errorElement.textContent = "";
                            }
                            hideInputError(formElement, inputElement);
                        }
                    }

                    checkInputValidity(formElement, inputElement);

                    toggleButtonState(inputList, buttonElement);
                });
            });
        }

        setEventListeners(
            params.inputSelector,
            formElement,
            params.submitButtonSelector
        );
    });
}