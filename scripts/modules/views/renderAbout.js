import elements from "../utils/domElementRegistry.js";
import { SELECTORS } from "../utils/constants.js";
import {
    getElementTemplateClone,
    getTemplateElementChild,
    setElementText,
    isArrayDataValid,
} from "../utils/utilityScripts.js";

const setAboutmeSectionData = (About_Section) => {

    setElementText(SELECTORS.aboutTitle, About_Section?.Title);

    const processDescription = (text) => {
        return text.replace(/\[([^\]]+)\]/g, (matchedString, matchedGroup, index, wholeString) => {
            return `<span class="highlight-secondary-text">${matchedGroup}</span>`;
        });
    };

    if (isArrayDataValid(About_Section?.Descriptions))
        About_Section.Descriptions.forEach((Description) => {
            const aboutSummeryDescriptionTemplateClone = getElementTemplateClone(
                elements.aboutSummeryDescriptionTemplate,
                SELECTORS.aboutSummeryDescription
            );

            const description = processDescription(Description.DescriptionPara);

            const aboutSummeryDescriptionWrapper = getTemplateElementChild(aboutSummeryDescriptionTemplateClone, SELECTORS.aboutSummeryDescriptionWrapper);

            aboutSummeryDescriptionWrapper.innerHTML = description;

            elements.aboutContent.appendChild(aboutSummeryDescriptionTemplateClone);
        });
};

export default setAboutmeSectionData;