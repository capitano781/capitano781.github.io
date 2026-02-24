import elements from "../utils/domElementRegistry.js";
import { CLASSES, SELECTORS } from "../utils/constants.js";
import {
    getElementTemplateClone,
    setTemplateElementText,
    setTemplateElementAttribute,
    setElementText,
    isArrayDataValid,
    getTemplateElementChild,
    addClassName
} from "../utils/utilityScripts.js";

const setContactSectionData = (Contact_Section) => {

    setElementText(SELECTORS.contactTitle, Contact_Section?.Title);
    setElementText(SELECTORS.contactText, Contact_Section?.Description);

    if (isArrayDataValid(Contact_Section?.Content))
        Contact_Section.Content.forEach((Content) => {

            const contactDescriptionTemplateClone = getElementTemplateClone(elements.contactDescriptionTemplate, SELECTORS.contactDescription);

            // const contactDescriptionWrapper = getTemplateElementChild(contactDescriptionTemplateClone, SELECTORS.contactDescriptionWrapper);

            let internalTemplate = '';

            if (Content?.type === 'externalLink') {
                internalTemplate = getTemplateElementChild(contactDescriptionTemplateClone, SELECTORS.externalLinkTemplate);
            } else if (Content?.type === 'downloadDoc') {
                internalTemplate = getTemplateElementChild(contactDescriptionTemplateClone, SELECTORS.downloadDocTemplate);
            }

            const internalTemplateClone = getElementTemplateClone(internalTemplate, SELECTORS.externalLinkTemplate);

            setTemplateElementText(internalTemplateClone, SELECTORS.contactLinkText, Content?.hyperlink_Label_Text);

            setTemplateElementAttribute(internalTemplateClone, SELECTORS.contactLink, "href", Content?.link);

            addClassName(getTemplateElementChild(internalTemplateClone, SELECTORS.contactDescriptionIcon), Content.iconType);

            contactDescriptionTemplateClone.appendChild(internalTemplateClone);

            elements.contactDetails.appendChild(contactDescriptionTemplateClone);
        });
};

export default setContactSectionData;