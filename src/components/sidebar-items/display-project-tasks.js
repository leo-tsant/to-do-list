import form from "../forms/add-task-form";
import createTask, { addTask, displayTasks } from "../task";

const displayProjectTasks = (project) => {
    const content = document.querySelector(".content");

    content.innerHTML = "";

    const header = document.createElement("div");
    header.classList.add("content-header");
    header.textContent = project.name;

    const addNewTaskButton = document.createElement("button");
    addNewTaskButton.classList.add("add-new-task-button");
    addNewTaskButton.textContent = "+ New Task";

    header.appendChild(addNewTaskButton);

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    content.appendChild(header);
    content.appendChild(tasksContainer);

    displayTasks(project.name);

    addNewTaskButton.addEventListener("click", () => {
        const newTaskOverlay = document.getElementById("new-task-overlay");
        if (newTaskOverlay) {
            newTaskOverlay.remove();
        }
        form();

        // Get the form from the DOM
        let addTaskForm = document.getElementById("new-task-form");
        // Clone the form to remove any existing event listeners
        const clone = addTaskForm.cloneNode(true);
        addTaskForm.parentNode.replaceChild(clone, addTaskForm);
        addTaskForm = clone;

        const popupOverlay = document.getElementById("new-task-overlay");

        // Add an event listener for the cancel button
        const cancelButton = document.querySelector("#cancel-button");
        cancelButton.addEventListener("click", () => {
            // Close the form without making any changes
            popupOverlay.style.display = "none";
        });

        // Display the form
        popupOverlay.style.display = "flex";

        // Add an event listener for the form submission
        addTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Fetch the values from the form
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const dueDate = document.getElementById("dueDate").value;
            const selectedRadioButton = document.querySelector(`#new-task-form input[name="importance"]:checked`);
            const importance = selectedRadioButton ? selectedRadioButton.value : null;

            // Create a new task with the fetched values
            const newTask = createTask(title, description, dueDate, importance, project.name);

            // Add the new task to the tasks array
            addTask(newTask);

            // Re-display the tasks
            displayTasks(project.name);

            // Hide the form
            popupOverlay.style.display = "none";
        });
    });
};

export default displayProjectTasks;
