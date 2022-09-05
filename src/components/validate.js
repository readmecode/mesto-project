function enableValidation(params) {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((profileForm) => {
        profileForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        function setEventListeners(
            inputSelector,
            profileForm,
            submitButtonSelector
        ) {
            const inputList = Array.from(profileForm.querySelectorAll(inputSelector));

            const buttonElement = profileForm.querySelector(submitButtonSelector);

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
                    function checkInputValidity(profileForm, inputElement) {
                        if (inputElement.validity.patternMismatch) {
                            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
                        } else {
                            inputElement.setCustomValidity("");
                        }
                        if (!inputElement.validity.valid) {
                            function showInputError(profileForm, inputElement, errorMessage) {
                                const errorElement = profileForm.querySelector(
                                    `.${inputElement.id}-error`
                                );
                                inputElement.classList.add(params.inputErrorClass);
                                errorElement.textContent = errorMessage;
                                errorElement.classList.add(params.errorClass);
                            }
                            showInputError(
                                profileForm,
                                inputElement,
                                inputElement.validationMessage
                            );
                        } else {
                            function hideInputError(profileForm, inputElement) {
                                const errorElement = profileForm.querySelector(
                                    `.${inputElement.id}-error`
                                );
                                inputElement.classList.remove(params.inputErrorClass);
                                errorElement.classList.remove(params.errorClass);
                                errorElement.textContent = "";
                            }
                            hideInputError(profileForm, inputElement);
                        }
                    }

                    checkInputValidity(profileForm, inputElement);

                    toggleButtonState(inputList, buttonElement);
                });
            });
        }

        setEventListeners(
            params.inputSelector,
            profileForm,
            params.submitButtonSelector
        );
    });
}

export { enableValidation };