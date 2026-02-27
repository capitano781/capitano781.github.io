import elements from "../utils/domElementRegistry.js";
import { EVENTS, SELECTORS } from "../utils/constants.js";
import {
    getElementTemplateClone,
    getTemplateElementChild,
    setElementText,
    isArrayDataValid,
} from "../utils/utilityScripts.js";
import setHandler from "../core/initHandler.js";

const setAboutmeSectionData = (About_Section) => {

    elements.aboutTitle.textContent = About_Section?.Title;
    elements.creditsLink.textContent = About_Section?.Credit_Button;

    setHandler(elements.creditsLink, EVENTS.CLICK, SELECTORS.creditsLink);

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

            elements.aboutSummeryContent.appendChild(aboutSummeryDescriptionTemplateClone);
        });
};

export default setAboutmeSectionData;