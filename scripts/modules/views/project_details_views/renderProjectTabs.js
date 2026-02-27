import { EVENTS, CONFIG, SELECTORS } from '../../utils/constants.js';
import elements from '../../utils/domElementRegistry.js';
import setHandler from '../../core/initHandler.js';
import {
    isArrayDataValid,
    getElement,
    getElementTemplateClone,
    getTemplateElementChild,
} from '../../utils/utilityScripts.js';

const setProjectTabs = (projectSections) => {

    const tabsList = projectSections.map(section => {
        return {
            title: section.title,
            icon: section.iconUrl,
        }
    });

    elements.detailsTabsContainer.innerHTML = '';

    if (isArrayDataValid(tabsList)) {
        tabsList.forEach((tab, index) => {
            const detailsTabTemplateClone = getElementTemplateClone(elements.detailsTabTemplate, SELECTORS.detailsTabTemplate);

            const iconUrl = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}${tab.icon}') ${CONFIG.TAB_IMAGE_FILE_URL_ATTR}`;

            const detailsTabIcon = getTemplateElementChild(detailsTabTemplateClone, SELECTORS.detailsTabIcon);
            detailsTabIcon.style.background = iconUrl;

            const detailsTabText = getTemplateElementChild(detailsTabTemplateClone, SELECTORS.detailsTabText);
            detailsTabText.textContent = tab.title;

            setHandler(detailsTabIcon, EVENTS.CLICK, SELECTORS.detailsTabIcon, { index });
            setHandler(detailsTabText, EVENTS.CLICK, SELECTORS.detailsTabText, { index });

            elements.detailsTabsContainer.appendChild(detailsTabTemplateClone);
        });
    }
};

export default setProjectTabs;