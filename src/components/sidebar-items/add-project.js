import newProjectForm from "../forms/new-project-form";

const addProject = () => {
    let newForm = document.getElementById("new-project-form");
    if (!newForm) {
        newProjectForm();
    }
};

export default addProject;
