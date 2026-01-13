'use strict';

import { getElement, isArrayDataValid } from './utilityScripts.js';
import { CONFIG, SELECTORS, MESSAGES } from './constants.js';
import { setProjectDetailsPageData } from './projectDetailsDataPlug.js';
import { validatePortfolioData } from './validator.js';

const params = new URLSearchParams(window.location.search);
// const selectedProjectId = params.get('id');
const  selectedProjectId = 1;

const exitProjectDetailsPageLoader = () => {
    const projectDetailsPageLoaderOverlay = getElement(SELECTORS.projectDetailsPageLoaderOverlay);
    const projectDetailsPageRootContainer = getElement(SELECTORS.projectDetailsPageRootContainer);
    projectDetailsPageLoaderOverlay.classList.add('hideElement');
    projectDetailsPageRootContainer.classList.remove('hideElement');
};

(async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await fetch(CONFIG.DATA_FILE_PATH);
        const data = await response.json();

        const validate = validatePortfolioData(data);
        if (!validate.isValid) {
            console.error(`${MESSAGES.dataValidationFailed}`, validate.allErrors);
        }

        if (data) {
            exitProjectDetailsPageLoader();
            if (isArrayDataValid(data?.Project_Section?.Projects)) {
                setProjectDetailsPageData(data?.Project_Section?.ProjectSectionLabels, data?.Project_Section?.Projects[selectedProjectId], data?.Footer_Section?.copyrightText);
            }
            return;
        }
        return;
    } catch (e) {
        console.error(`Could not load Folio Data, ERROR: '${e}'`);
        exitLoader();
        return;
    }
})();
