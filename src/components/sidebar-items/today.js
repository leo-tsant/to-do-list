import { displayTasks } from "../task";

const today = () => {
    const content = document.querySelector(".content");

    const header = document.createElement("div");
    header.classList.add("content-header");
    header.textContent = "Today";

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    content.appendChild(header);
    content.appendChild(tasksContainer);

    displayTasks("today");
};

export default today;
