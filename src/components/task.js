import form from "./forms/add-task-form";
import editTaskForm from "./forms/edit-task-form";
import "../styles/task.css";
import "../styles/delete-task.css";
import trashIcon from "../images/trash.png";
import editIcon from "../images/edit.svg";

const tasks = [];

const createTask = (title, description, dueDate, importance, projectName) => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let maxID = existingTasks.reduce((maxID, task) => {
        return Math.max(maxID, task.id);
    }, 0);

    const newID = maxID + 1;

    const toDoItem = {
        id: newID, // Assign the currentId and then increment it.
        title: title,
        description: description,
        dueDate: dueDate,
        importance: importance,
        project: projectName,
    };

    return toDoItem;
};

const addTask = (task) => {
    tasks.push(task);
    saveTasksToLocalStorage(); // Save tasks to local storage when adding a new task
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const displayTasks = (whichTasks) => {
    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.innerHTML = "";

    // Clear the tasks array before loading tasks from local storage
    tasks.length = 0;

    // Load tasks from local storage if they exist
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        tasks.push(...storedTasks);
    }

    let filteredTasks = [];

    if (whichTasks === "today") {
        filteredTasks = tasks.filter((task) => {
            const today = new Date();
            const taskDueDate = new Date(task.dueDate);
            return (
                taskDueDate.getDate() === today.getDate() &&
                taskDueDate.getMonth() === today.getMonth() &&
                taskDueDate.getFullYear() === today.getFullYear()
            );
        });
    } else if (whichTasks === "thisWeek") {
        filteredTasks = tasks.filter((task) => {
            const today = new Date();
            const taskDueDate = new Date(task.dueDate);
            const todayDay = today.getDate();
            const taskDueDateDay = taskDueDate.getDate();
            const differenceInDays = Math.abs(todayDay - taskDueDateDay);
            return differenceInDays <= 7;
        });
    } else if (whichTasks === "important") {
        filteredTasks = tasks.filter((task) => {
            return task.importance === "High";
        });
    } else if (whichTasks === "allTasks") {
        filteredTasks = tasks;
    } else {
        filteredTasks = tasks.filter((task) => {
            return task.project === whichTasks;
        });
    }

    filteredTasks.forEach((task) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("div");
        title.classList.add("task-title");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.classList.add("task-description");
        description.textContent = task.description;

        const dueDate = document.createElement("div");
        dueDate.classList.add("task-due-date");
        dueDate.textContent = `Due: ${task.dueDate}`;

        const importance = document.createElement("div");
        importance.classList.add("task-importance");
        importance.textContent = `Importance: ${task.importance}`;

        if (task.importance === "High") {
            card.classList.add("high-importance");
        } else if (task.importance === "Medium") {
            card.classList.add("medium-importance");
        } else if (task.importance === "Low") {
            card.classList.add("low-importance");
        }

        const deleteTaskButton = document.createElement("img");
        deleteTaskButton.classList.add("delete-task-button");
        deleteTaskButton.src = trashIcon;

        deleteTaskButton.addEventListener("click", () => {
            deleteTask(whichTasks, task);
        });

        const editTaskButton = document.createElement("img");
        editTaskButton.classList.add("edit-task-button");
        editTaskButton.src = editIcon;

        editTaskButton.addEventListener("click", () => {
            editTask(whichTasks, task);
        });

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(dueDate);
        card.appendChild(importance);
        card.appendChild(deleteTaskButton);
        card.appendChild(editTaskButton);

        tasksContainer.appendChild(card);
    });
};

const createTaskForm = () => {
    const newTaskOverlay = document.getElementById("new-task-overlay");
    if (newTaskOverlay) {
        newTaskOverlay.remove();
    }
    form();

    const addTaskForm = document.getElementById("new-task-form");
    addTaskForm.addEventListener("submit", (e) => {
        const newTaskOverlay = document.getElementById("new-task-overlay");
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        const selectedRadioButton = document.querySelector(`#new-task-form input[name="importance"]:checked`);
        const importance = selectedRadioButton ? selectedRadioButton.value : null;
        addTask(createTask(title, description, dueDate, importance));
        displayTasks("allTasks");
        newTaskOverlay.style.display = "none";
    });

    const addNewTaskButton = document.querySelector(".add-new-task-button");
    addNewTaskButton.addEventListener("click", () => {
        const newTaskOverlay = document.getElementById("new-task-overlay");

        newTaskOverlay.style.display = "flex";
        const cancelButton = document.querySelector("#cancel-button");
        cancelButton.addEventListener("click", () => {
            newTaskOverlay.style.display = "none";
        });
    });
};

const deleteTask = (whichTasks, task) => {
    const container = document.querySelector(".container");
    let popupOverlay = document.querySelector(".delete-task-overlay");

    popupOverlay = document.createElement("div");
    popupOverlay.classList.add("delete-task-overlay");
    const popup = document.createElement("div");
    popup.classList.add("delete-task-popup");
    const popupContent = document.createElement("div");
    popupContent.classList.add("delete-task-popup-content");
    const popupButtons = document.createElement("div");
    popupButtons.classList.add("delete-task-popup-buttons");
    const yesButton = document.createElement("button");
    yesButton.classList.add("yes-button");
    const noButton = document.createElement("button");
    noButton.classList.add("no-button");
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.classList.add("close-button");

    popupOverlay.style.display = "flex";
    popupContent.textContent = "Are you sure you want to delete this task?";
    yesButton.textContent = "Yes";
    noButton.textContent = "No";

    yesButton.addEventListener("click", () => {
        const taskID = task.id;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter((t) => t.id !== taskID);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        displayTasks(whichTasks);
        popupOverlay.remove();
    });

    noButton.addEventListener("click", () => {
        popupOverlay.remove();
    });

    closeButton.addEventListener("click", () => {
        popupOverlay.remove();
    });

    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.remove();
        }
    });

    popupButtons.appendChild(noButton);
    popupButtons.appendChild(yesButton);
    popup.appendChild(closeButton);
    popup.appendChild(popupContent);
    popup.appendChild(popupButtons);
    popupOverlay.appendChild(popup);
    container.appendChild(popupOverlay);

    // If the popup already exists, just display it
    popupOverlay.style.display = "flex";
};

const editTask = (whichTasks, task) => {
    // Call the editTaskForm function with the task to be edited
    editTaskForm(task);
    const editOverlay = document.querySelector("#edit-task-overlay");

    editOverlay.style.display = "flex";

    // Get the form from the DOM
    const form = document.querySelector("#edit-task-form");

    // Add an event listener for the form submission
    form.addEventListener("submit", (event) => {
        // Prevent the form from being submitted normally
        event.preventDefault();

        // Fetch the new values from the form
        const title = form.querySelector("#title").value;
        const description = form.querySelector("#description").value;
        const dueDate = form.querySelector("#dueDate").value;
        const selectedRadioButton = document.querySelector(`#edit-task-form input[name="importance"]:checked`);
        const importance = selectedRadioButton ? selectedRadioButton.value : null;

        // Update the task object with the new values
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.importance = importance;

        // Save the updated tasks to local storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.map((t) => {
            if (t.id === task.id) {
                return {
                    ...t,
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    importance: importance,
                };
            }
            return t;
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        // Re-display the tasks
        displayTasks(whichTasks);

        // Close the form
        editOverlay.remove();
    });

    // Add an event listener for the cancel button
    const cancelButton = form.querySelector("#cancel-button");
    cancelButton.addEventListener("click", () => {
        // Close the form without making any changes
        editOverlay.remove();
    });
};

export { createTaskForm, displayTasks, addTask };

export default createTask;
