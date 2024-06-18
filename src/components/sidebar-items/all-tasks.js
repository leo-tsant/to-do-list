import { createTaskForm, displayTasks } from "../task";

const allTasks = () => {
    const content = document.querySelector(".content");

    const header = document.createElement("div");
    header.classList.add("content-header");
    header.textContent = "All Tasks";

    const addNewTaskButton = document.createElement("button");
    addNewTaskButton.classList.add("add-new-task-button");
    addNewTaskButton.textContent = "+ New Task";

    header.appendChild(addNewTaskButton);

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    content.appendChild(header);
    content.appendChild(tasksContainer);

    createTaskForm();
    displayTasks("allTasks");
};

export default allTasks;
