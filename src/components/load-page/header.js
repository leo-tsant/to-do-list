import checkmarkIcon from "../../images/checkmark.svg";

const header = () => {
    const header = document.querySelector(".header");

    const headerText = document.createElement("div");
    headerText.textContent = "To Do List";
    headerText.classList.add("header-text");

    const headerIcon = document.createElement("img");
    headerIcon.className = "icon";
    headerIcon.src = checkmarkIcon;

    header.appendChild(headerIcon);
    header.appendChild(headerText);
};

export default header;
