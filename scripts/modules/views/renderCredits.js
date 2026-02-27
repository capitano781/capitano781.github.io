import elements from "../utils/domElementRegistry.js";
import { EVENTS, SELECTORS } from "../utils/constants.js";
import {
    getElementTemplateClone,
    getTemplateElementChild,
    setElementText,
    isArrayDataValid,
    setSavedElementText,
    setTemplateElementText,
    setTemplateElementAttribute,
    addClassName
} from "../utils/utilityScripts.js";
import setHandler from "../core/initHandler.js";
import { isValidArray } from "../utils/validator.js";

const setCreditSectionData = (Credit_Section) => {

    setSavedElementText(elements.creditDetailsTitle, Credit_Section?.Title);

    setHandler(elements.creditDetailsCancel, EVENTS.CLICK, SELECTORS.creditDetailsCancel);

    const processText = (text) => {
        return text.replace(/\[([^\[$\]]+)\]/g, (matchedString, matchedGroup, position, inputText) => {
            return `<span class="highlight-secondary-text" >${matchedGroup}</span>`;
        });
    };

    if (isArrayDataValid(Credit_Section?.Contents)) {
        Credit_Section?.Contents.forEach(content => {

            switch (content?.type) {
                case 'plainText': {
                    const creditPlainTextTemplateClone = getElementTemplateClone(elements.creditPlainTextTemplate, SELECTORS.creditPlainTextTemplate);

                    if (content.primaryText) setTemplateElementText(creditPlainTextTemplateClone, SELECTORS.creditPlainTextPrimary, content.primaryText);

                    const creditPlainTextSecondary = getTemplateElementChild(creditPlainTextTemplateClone, SELECTORS.creditPlainTextSecondary);

                    creditPlainTextSecondary.innerHTML = processText(content.secondaryText);

                    elements.creditDetailsContentWrapper.appendChild(creditPlainTextTemplateClone);
                    break;
                }
                case 'bulletPoints': {

                    const creditBulletPointsTemplateClone = getElementTemplateClone(elements.creditBulletPointsTemplate, SELECTORS.creditBulletPointsTemplate);

                    const creditBulletPointsWrapper = getTemplateElementChild(creditBulletPointsTemplateClone, SELECTORS.creditBulletPointsWrapper);

                    const creditSingleBulletTemplate = getTemplateElementChild(creditBulletPointsTemplateClone, SELECTORS.creditSingleBulletTemplate);

                    if (isArrayDataValid(content?.pointsContent)) {
                        content?.pointsContent.forEach(point => {

                            const creditSingleBulletTemplateClone = getElementTemplateClone(creditSingleBulletTemplate, SELECTORS.creditSingleBulletTemplate);

                            if (point.primaryText) setTemplateElementText(creditSingleBulletTemplateClone, SELECTORS.creditBulletPointsPrimary, point.primaryText);

                            setTemplateElementText(creditSingleBulletTemplateClone, SELECTORS.creditBulletPointsSecondary, point.secondaryText);

                            creditBulletPointsWrapper.appendChild(creditSingleBulletTemplateClone);

                        });
                    }

                    elements.creditDetailsContentWrapper.appendChild(creditBulletPointsWrapper);

                    break;
                }
                case 'creditLinks': {

                    const creditLinksTemplateClone = getElementTemplateClone(elements.creditLinksTemplate, SELECTORS.creditLinksTemplate);

                    setTemplateElementText(creditLinksTemplateClone, SELECTORS.creditSectionLabel, content?.label);

                    const creditSectionContentTemplate = getTemplateElementChild(creditLinksTemplateClone, SELECTORS.creditSectionContentTemplate);

                    const creditSectionContent = getTemplateElementChild(creditLinksTemplateClone, SELECTORS.creditSectionContent);

                    if (isArrayDataValid(content?.contentLinks)) {
                        content?.contentLinks.forEach(link => {

                            const creditSectionContentTemplateClone = getElementTemplateClone(creditSectionContentTemplate, SELECTORS.creditSectionContentTemplate);

                            setTemplateElementAttribute(creditSectionContentTemplateClone, SELECTORS.creditLink, 'href', link?.linkURL);

                            setTemplateElementText(creditSectionContentTemplateClone, SELECTORS.contactLinkText, link?.linkLabel)

                            addClassName(getTemplateElementChild(creditSectionContentTemplateClone, SELECTORS.creditLinkIcon), link.iconType);

                            creditSectionContent.appendChild(creditSectionContentTemplateClone);

                        });
                    }

                    elements.creditDetailsContentWrapper.appendChild(creditLinksTemplateClone);

                    break;
                }
                default: return;
            }
        });
    }
};

export default setCreditSectionData;