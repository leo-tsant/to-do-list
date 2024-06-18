import displayProjectTasks from "../sidebar-items/display-project-tasks";
import threeDotsIcon from "../../images/three-dots-vertical.svg";
import projectIcon from "../../images/project.svg";
import allTasks from "../sidebar-items/all-tasks";

const projects = JSON.parse(localStorage.getItem("projects")) || [];

const newProjectForm = () => {
    const projectsList = document.getElementById("projects-list");

    const popupForm = document.createElement("div");
    popupForm.classList.add("new-project-popup-form");

    const projectForm = document.createElement("form");
    projectForm.id = "new-project-form";

    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("box");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "project-name";
    input.name = "project-name";
    input.required = true;
    input.placeholder = "Project Name";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.id = "new-project-form-button-container";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Project";
    submitButton.id = "new-project-form-submit-button";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.id = "new-project-form-cancel-button";
    cancelButton.addEventListener("click", () => {
        projectsList.removeChild(projectForm);
    });

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newTaskOverlay = document.getElementById("new-task-overlay");
        if (newTaskOverlay) {
            newTaskOverlay.remove();
        }

        const projectName = document.getElementById("project-name").value;

        const project = {
            name: projectName,
        };

        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));

        projectsList.removeChild(projectForm);
        displayProjects();
        displayProjectTasks(project);
    });

    fieldContainer.appendChild(input);

    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);
    projectForm.appendChild(fieldContainer);
    projectForm.appendChild(buttonContainer);

    projectsList.insertBefore(projectForm, projectsList.lastChild);
};

let currentPopupForm = null;

const displayProjects = () => {
    const projectsList = document.getElementById("projects-list");
    const liElements = projectsList.querySelectorAll("li");

    liElements.forEach((li) => {
        if (li.id !== "add-project") {
            li.remove();
        }
    });

    projects.forEach((project) => {
        const projectItem = document.createElement("li");
        projectItem.classList.add("sidebar-project-item");
        projectItem.id = project.name;

        const projectItemText = document.createElement("div");
        projectItemText.classList.add("sidebar-item-text");
        projectItemText.textContent = project.name;

        const projectItemIcon = document.createElement("img");
        projectItemIcon.classList.add("sidebar-item-icon");
        projectItemIcon.src = projectIcon;

        const moreOptionsButton = document.createElement("img");
        moreOptionsButton.classList.add("more-options-button");
        moreOptionsButton.src = threeDotsIcon;

        const moreOptionsContainer = document.createElement("div");
        moreOptionsContainer.classList.add("more-options-container");

        projectItem.addEventListener("click", () => {
            displayProjectTasks(project);
        });

        moreOptionsButton.addEventListener("click", (event) => {
            event.stopPropagation();

            // Remove the currently displayed popup form (if any)
            if (currentPopupForm) {
                currentPopupForm.parentNode.removeChild(currentPopupForm);
                currentPopupForm = null;
            }

            const popupForm = document.createElement("div");
            popupForm.classList.add("more-options-popup-form");

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const index = projects.findIndex((projectItem) => projectItem.name === project.name);
                projects.splice(index, 1);
                localStorage.setItem("projects", JSON.stringify(projects));
                projectsList.removeChild(projectItem);
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const updatedTasks = tasks.filter((task) => task.project !== project.name);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));

                const content = document.querySelector(".content");
                content.innerHTML = "";
                allTasks();
            });

            popupForm.appendChild(deleteButton);

            moreOptionsContainer.appendChild(popupForm);
            currentPopupForm = popupForm;

            document.addEventListener("click", function hideForm(e) {
                // Check if the target of the click event is the delete button or the more options button
                if (currentPopupForm && e.target !== deleteButton && e.target !== moreOptionsButton) {
                    // If it is not, remove the pop-up form and the event listener itself
                    currentPopupForm.parentNode.removeChild(currentPopupForm);
                    currentPopupForm = null;
                    document.removeEventListener("click", hideForm);
                }
            });
        });
        moreOptionsContainer.appendChild(moreOptionsButton);

        projectItem.appendChild(projectItemIcon);
        projectItem.appendChild(projectItemText);
        projectItem.appendChild(moreOptionsContainer);
        projectsList.insertBefore(projectItem, projectsList.lastChild);
    });
};

export { displayProjects };
export default newProjectForm;
