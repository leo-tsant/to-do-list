import header from "./header";
import sidebar from "./sidebar";
import content from "./content";
import footer from "./footer";

const loadPage = () => {
    header();
    sidebar();
    content();
    footer();
};

export default loadPage;
