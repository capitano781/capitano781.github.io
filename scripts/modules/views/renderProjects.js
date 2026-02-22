import elements from "../utils/domElementRegistry.js";
import { SELECTORS, EVENTS } from "../utils/constants.js";
import setHandler from "../core/initHandler.js";
import {
    getElementTemplateClone,
    setTemplateElementText,
    setElementText,
    isArrayDataValid,
} from "../utils/utilityScripts.js";

const setProjectSectionData = (data) => {

    setElementText(SELECTORS.projectSectionTitle, data?.Project_Section?.Title);
    setElementText(SELECTORS.projectSectionSecondaryTitle, data?.Project_Section?.Secondary_Title);

    const getProjectNumber = (index) => {
        if (index < 10) return `0${Number(index) + 1}`;
        return `${Number(index) + 1}`;
    };

    if (isArrayDataValid(data?.Project_Section?.Projects))
        data?.Project_Section?.Projects.forEach((project, index) => {

            const projectBoxClone = getElementTemplateClone(elements.projectBox, SELECTORS.projectBox);

            setTemplateElementText(projectBoxClone, SELECTORS.projectTitle, project?.Title);
            setTemplateElementText(projectBoxClone, SELECTORS.projectNumber, getProjectNumber(index));
            setTemplateElementText(projectBoxClone, SELECTORS.projectDescText, project?.OnelineDescription);
            setTemplateElementText(projectBoxClone, SELECTORS.projectDetailsIndexPageButton, project?.indexPageButtonLabel);

            setHandler(
                projectBoxClone.querySelector(SELECTORS.projectDetailsIndexPageButton),
                EVENTS.CLICK,
                SELECTORS.projectDetailsIndexPageButton,
                {
                    projectIndex: index,
                    view: SELECTORS.projectDetailsView,
                });

            elements.projectGrid.appendChild(projectBoxClone);
        });
};

export default setProjectSectionData;