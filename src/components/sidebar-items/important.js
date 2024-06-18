import { displayTasks } from "../task";

const important = () => {
    const content = document.querySelector(".content");

    const header = document.createElement("div");
    header.classList.add("content-header");
    header.textContent = "Important";

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    content.appendChild(header);
    content.appendChild(tasksContainer);

    displayTasks("important");
};

export default important;
