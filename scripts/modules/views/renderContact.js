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

    if (isArrayDataValid(Contact_Section?.Descriptions))
        Contact_Section.Descriptions.forEach((description) => {
            const contactDescriptionTemplateClone = getElementTemplateClone(elements.contactDescriptionTemplate, SELECTORS.contactDescription);

            setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactText, description?.text
            );

            setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactLink, description?.hyperlink_Label_Text);

            setTemplateElementAttribute(contactDescriptionTemplateClone, SELECTORS.contactLink, "href", description?.link);

            elements.contactContent.appendChild(contactDescriptionTemplateClone);
        });
};

export default setContactSectionData;