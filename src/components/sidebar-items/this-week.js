import { displayTasks } from "../task";

const thisWeek = () => {
    const content = document.querySelector(".content");

    const header = document.createElement("div");
    header.classList.add("content-header");
    header.textContent = "This Week";

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    content.appendChild(header);
    content.appendChild(tasksContainer);

    displayTasks("thisWeek");
};

export default thisWeek;
