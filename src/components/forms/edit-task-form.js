const editTaskForm = (task) => {
    const container = document.querySelector(".container");

    const overlay = document.createElement("div");
    overlay.id = "edit-task-overlay";
    overlay.classList.add("overlay");

    const editPopupForm = document.createElement("div");
    editPopupForm.classList.add("popup-form");

    const formTitle = document.createElement("h2");
    formTitle.textContent = "Edit Task";

    const form = document.createElement("form");
    form.id = "edit-task-form";

    // Create the input fields for the form
    const inputFields = document.createElement("div");
    inputFields.classList.add("input-fields");

    createInputField("Title:", "text", "title", task.title);
    createTextAreaField("Description:", "description", task.description);
    createInputField("Due Date:", "date", "dueDate", task.dueDate);
    createRadioButtons("Importance:", "importance", ["High", "Medium", "Low"], task.importance);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const doneButton = document.createElement("button");
    doneButton.type = "submit";
    doneButton.textContent = "Done";

    const cancelButton = document.createElement("button");
    cancelButton.id = "cancel-button";
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    buttonContainer.appendChild(doneButton);
    buttonContainer.appendChild(cancelButton);

    form.appendChild(inputFields);
    form.appendChild(buttonContainer);

    // Add all elements to the popup form
    editPopupForm.appendChild(formTitle);
    editPopupForm.appendChild(form);

    // Add the popup form to the overlay
    overlay.appendChild(editPopupForm);

    // Add the overlay to the document's body
    container.appendChild(overlay);

    function createInputField(labelText, inputType, inputName, defaultValue, isRequired = true) {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("box");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", inputName);

        const input = document.createElement("input");
        input.type = inputType;
        input.id = inputName;
        input.name = inputName;
        input.value = defaultValue;
        if (isRequired) {
            input.required = true;
        }

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        inputFields.appendChild(fieldContainer);
    }

    function createTextAreaField(labelText, inputName, defaultValue) {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("box");
        fieldContainer.classList.add("textarea");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", inputName);

        const textarea = document.createElement("textarea");
        textarea.id = inputName;
        textarea.name = inputName;
        textarea.value = defaultValue;

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(textarea);
        inputFields.appendChild(fieldContainer);
    }

    function createRadioButtons(labelText, inputName, options, defaultValue) {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("box");
        fieldContainer.classList.add("radio-buttons");

        const groupLabel = document.createElement("label");
        groupLabel.textContent = labelText;

        fieldContainer.appendChild(groupLabel);

        options.forEach((optionText) => {
            const optionId = `${inputName}-${optionText}`;

            const optionContainer = document.createElement("div");

            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = inputName;
            radioInput.id = optionId;
            radioInput.value = optionText;
            radioInput.required = true;

            // If the optionText matches the defaultValue, set this radio button as checked
            if (optionText === defaultValue) {
                radioInput.checked = true;
            }

            const label = document.createElement("label");
            label.textContent = optionText;
            label.setAttribute("for", optionId);

            optionContainer.appendChild(radioInput);
            optionContainer.appendChild(label);

            fieldContainer.appendChild(optionContainer);
        });

        inputFields.appendChild(fieldContainer);
    }
};

export default editTaskForm;
