import "../../styles/form.css";

const form = () => {
    const container = document.querySelector(".container");

    const overlay = document.createElement("div");
    overlay.id = "new-task-overlay";
    overlay.classList.add("overlay");

    const popupForm = document.createElement("div");
    popupForm.classList.add("popup-form");

    const formTitle = document.createElement("div");
    formTitle.classList.add("form-title");
    formTitle.textContent = "Add New Task";

    const form = document.createElement("form");
    form.id = "new-task-form";

    // Create the input fields for the form
    const inputFields = document.createElement("div");
    inputFields.classList.add("input-fields");

    // Create input fields for Title, Description, Due Date, and Importance
    createInputField("Title:", "text", "title");
    createTextAreaField("Description (optional):", "description", false);
    createInputField("Due Date:", "date", "dueDate");
    createRadioButtons("Importance:", "importance", ["High", "Medium", "Low"]);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create the "Add Task" button
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Task";

    const cancelButton = document.createElement("button");
    cancelButton.id = "cancel-button";
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(cancelButton);

    // Add input fields and the "Add Task" button to the form
    form.appendChild(inputFields);
    form.appendChild(buttonContainer);

    // Add all elements to the popup form
    popupForm.appendChild(formTitle);
    popupForm.appendChild(form);

    // Add the popup form to the overlay
    overlay.appendChild(popupForm);

    // Add the overlay to the document's body
    container.appendChild(overlay);

    // Create a function to simplify input field creation
    function createInputField(labelText, inputType, inputName, isRequired = true) {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("box");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", inputName);

        const input = document.createElement("input");
        input.type = inputType;
        input.placeholder = "What to do?";
        input.id = inputName;
        input.name = inputName;
        if (isRequired) {
            input.required = true;
        }

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        inputFields.appendChild(fieldContainer);
    }
    // Function to create a text area input field
    function createTextAreaField(labelText, inputName) {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("box");
        fieldContainer.classList.add("textarea");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", inputName);

        const textarea = document.createElement("textarea");
        textarea.id = inputName;
        textarea.name = inputName;
        textarea.placeholder = "Add a description...";

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(textarea);
        inputFields.appendChild(fieldContainer);
    }

    function createRadioButtons(labelText, inputName, options) {
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

export default form;
