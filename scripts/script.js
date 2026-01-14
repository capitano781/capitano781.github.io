import { validatePortfolioData } from './validator.js';
import { CONFIG, CLASSES, SELECTORS, MESSAGES } from './constants.js';
import { setStaticPageData } from './dataPlugScript.js';
import { getElement } from './utilityScripts.js';

// window.location.href = './projectDetails.html';

const exitLoader = () => {
    const loaderOverlay = getElement(SELECTORS.loaderOverlay);
    const rootContainer = getElement(SELECTORS.rootContainer);
    loaderOverlay.classList.add(CLASSES.hidden);
    rootContainer.classList.remove(CLASSES.hidden);
};

(async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, CONFIG.LOADER_DELAY));

        const response = await fetch(CONFIG.DATA_FILE_PATH);
        const data = await response.json();
        const validateData = validatePortfolioData(data);

        if (!validateData.isValid) {
            console.error(`${MESSAGES.dataValidationFailed}`, validateData.allErrors);
            return;
        }

        if (data) {
            exitLoader();
            setStaticPageData(data);
            return;
        }
    } catch (e) {
        console.error(`Could not load Folio Data, ERROR: '${e}'`);
        exitLoader();
        return;
    }
})();