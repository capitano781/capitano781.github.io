import elements from "../utils/domElementRegistry.js";
import { SELECTORS } from "../utils/constants.js";
import {
    getElementTemplateClone,
    setTemplateElementText,
    getTemplateElementChild,
    setElementText,
    isArrayDataValid,
} from "../utils/utilityScripts.js";

const setTechSkillSectionData = (Technical_Skills_Section) => {

    setElementText(SELECTORS.techSkillTitle, Technical_Skills_Section?.Title);

    if (isArrayDataValid(Technical_Skills_Section?.Categories))
        Technical_Skills_Section.Categories.forEach((category) => {
            const skillGroupTemplateClone = getElementTemplateClone(elements.skillGroupTemplate, SELECTORS.skillGroup);
            setTemplateElementText(skillGroupTemplateClone, SELECTORS.skillCategory, category?.Category);

            const skillTags = getTemplateElementChild(skillGroupTemplateClone, SELECTORS.skillTags);
            const skillTagTemplate = getTemplateElementChild(skillGroupTemplateClone, SELECTORS.skillTag);

            if (isArrayDataValid(category?.Descriptions))
                category.Descriptions.forEach((description) => {
                    const skillTagTemplateClone = getElementTemplateClone(skillTagTemplate, SELECTORS.skillTag);
                    setTemplateElementText(skillTagTemplateClone, SELECTORS.skillTagWrapper, description);

                    skillTags.appendChild(skillTagTemplateClone);
                });

            elements.techSkillContent.appendChild(skillGroupTemplateClone);
        });
};

export default setTechSkillSectionData;