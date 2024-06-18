import allTasksIcon from "../../images/all-tasks.png";
import todayIcon from "../../images/today.png";
import thisWeekIcon from "../../images/this-week.png";
import importantIcon from "../../images/important.png";
import addProjectIcon from "../../images/add-project.svg";

const sidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    // Home List
    const homeList = document.createElement("div");
    homeList.classList.add("sidebar-list");
    const homeListTitle = document.createElement("div");
    homeListTitle.classList.add("sidebar-title");
    homeListTitle.textContent = "Home";

    const homeListItems = document.createElement("ul");
    homeListItems.id = "home-list";

    const homeListItemsAllTasks = document.createElement("li");
    homeListItemsAllTasks.id = "all-tasks";
    homeListItemsAllTasks.classList.add("sidebar-item");
    const homeListItemsAllTasksText = document.createElement("div");
    homeListItemsAllTasksText.classList.add("sidebar-item-text");
    homeListItemsAllTasksText.textContent = "All Tasks";
    const homeListItemsAllTasksIcon = document.createElement("img");
    homeListItemsAllTasksIcon.classList.add("sidebar-item-icon");
    homeListItemsAllTasksIcon.src = allTasksIcon;

    homeListItemsAllTasks.appendChild(homeListItemsAllTasksIcon);
    homeListItemsAllTasks.appendChild(homeListItemsAllTasksText);
    homeListItems.appendChild(homeListItemsAllTasks);

    const homeListItemsToday = document.createElement("li");
    homeListItemsToday.id = "today";
    homeListItemsToday.classList.add("sidebar-item");
    const homeListItemsTodayText = document.createElement("div");
    homeListItemsTodayText.classList.add("sidebar-item-text");
    homeListItemsTodayText.textContent = "Today";
    const homeListItemsTodayIcon = document.createElement("img");
    homeListItemsTodayIcon.classList.add("sidebar-item-icon");
    homeListItemsTodayIcon.src = todayIcon;

    homeListItemsToday.appendChild(homeListItemsTodayIcon);
    homeListItemsToday.appendChild(homeListItemsTodayText);
    homeListItems.appendChild(homeListItemsToday);

    const homeListItemsThisWeek = document.createElement("li");
    homeListItemsThisWeek.id = "this-week";
    homeListItemsThisWeek.classList.add("sidebar-item");
    const homeListItemsThisWeekText = document.createElement("div");
    homeListItemsThisWeekText.classList.add("sidebar-item-text");
    homeListItemsThisWeekText.textContent = "This Week";
    const homeListItemsThisWeekIcon = document.createElement("img");
    homeListItemsThisWeekIcon.classList.add("sidebar-item-icon");
    homeListItemsThisWeekIcon.src = thisWeekIcon;

    homeListItemsThisWeek.appendChild(homeListItemsThisWeekIcon);
    homeListItemsThisWeek.appendChild(homeListItemsThisWeekText);
    homeListItems.appendChild(homeListItemsThisWeek);

    const homeListItemsImportant = document.createElement("li");
    homeListItemsImportant.id = "important";
    homeListItemsImportant.classList.add("sidebar-item");
    const homeListItemsImportantText = document.createElement("div");
    homeListItemsImportantText.classList.add("sidebar-item-text");
    homeListItemsImportantText.textContent = "Important";
    const homeListItemsImportantIcon = document.createElement("img");
    homeListItemsImportantIcon.classList.add("sidebar-item-icon");
    homeListItemsImportantIcon.src = importantIcon;

    homeListItemsImportant.appendChild(homeListItemsImportantIcon);
    homeListItemsImportant.appendChild(homeListItemsImportantText);
    homeListItems.appendChild(homeListItemsImportant);

    homeList.appendChild(homeListTitle);
    homeList.appendChild(homeListItems);

    // Projects List
    const projectsList = document.createElement("div");
    projectsList.classList.add("sidebar-list");
    const projectsListTitle = document.createElement("div");
    projectsListTitle.textContent = "Projects";
    projectsListTitle.classList.add("sidebar-title");

    const projectsListItems = document.createElement("ul");
    projectsListItems.id = "projects-list";

    const projectsListItemsAddProject = document.createElement("li");
    projectsListItemsAddProject.classList.add("sidebar-item");
    projectsListItemsAddProject.id = "add-project";
    const projectsListItemsAddProjectText = document.createElement("div");
    projectsListItemsAddProjectText.classList.add("sidebar-item-text");
    projectsListItemsAddProjectText.textContent = "Add Project";
    const projectsListItemsAddProjectIcon = document.createElement("img");
    projectsListItemsAddProjectIcon.classList.add("sidebar-item-icon");
    projectsListItemsAddProjectIcon.src = addProjectIcon;

    projectsListItemsAddProject.appendChild(projectsListItemsAddProjectIcon);
    projectsListItemsAddProject.appendChild(projectsListItemsAddProjectText);
    projectsListItems.appendChild(projectsListItemsAddProject);

    projectsList.appendChild(projectsListTitle);
    projectsList.appendChild(projectsListItems);

    sidebar.appendChild(homeList);
    sidebar.appendChild(projectsList);
};

export default sidebar;
