import allTasks from "../sidebar-items/all-tasks";
import today from "../sidebar-items/today";
import thisWeek from "../sidebar-items/this-week";
import important from "../sidebar-items/important";
import addProject from "../sidebar-items/add-project";
import { displayProjects } from "../forms/new-project-form";

const content = () => {
    const content = document.querySelector(".content");
    const allTasksTab = document.getElementById("all-tasks");
    const todayTab = document.getElementById("today");
    const thisWeekTab = document.getElementById("this-week");
    const importantTab = document.getElementById("important");
    const addProjectButton = document.getElementById("add-project");

    let firstLoad = true;

    function handleTabClick(callback) {
        content.innerHTML = "";
        callback();
    }

    allTasksTab.addEventListener("click", () => handleTabClick(allTasks));
    todayTab.addEventListener("click", () => handleTabClick(today));
    thisWeekTab.addEventListener("click", () => handleTabClick(thisWeek));
    importantTab.addEventListener("click", () => handleTabClick(important));
    addProjectButton.addEventListener("click", () => addProject());

    if (firstLoad) {
        handleTabClick(allTasks);
        displayProjects();

        firstLoad = false;
    }
};

export default content;
