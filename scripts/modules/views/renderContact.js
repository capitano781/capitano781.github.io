import elements from "../utils/domElementRegistry.js";
import { SELECTORS } from "../utils/constants.js";
import {
    getElementTemplateClone,
    setTemplateElementText,
    setTemplateElementAttribute,
    setElementText,
    isArrayDataValid,
} from "../utils/utilityScripts.js";

const setContactSectionData = (Contact_Section) => {

    setElementText(SELECTORS.contactTitle, Contact_Section?.Title);
    setElementText(SELECTORS.contactText, Contact_Section?.Description);

    if (isArrayDataValid(Contact_Section?.Content))
        Contact_Section.Content.forEach((Content) => {

            const contactDescriptionTemplateClone = getElementTemplateClone(elements.contactDescriptionTemplate, SELECTORS.contactDescription);

            setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactLinkText, Content?.hyperlink_Label_Text);

            setTemplateElementAttribute(contactDescriptionTemplateClone, SELECTORS.contactLink, "href", Content?.link);

            elements.contactDetails.appendChild(contactDescriptionTemplateClone);
        });
};

export default setContactSectionData;