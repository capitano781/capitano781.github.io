import { setStaticPageData } from './dataPlugScript.js';

const LOADER_DELAY = 500; // ms

const exitLoader = () => {
    const loaderOverlay = document.getElementById('loaderOverlay');
    const rootContainer = document.getElementById('rootContainer');
    loaderOverlay.classList.add('hideElement');
    rootContainer.classList.remove('hideElement');
};

(async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, LOADER_DELAY));

        const response = await fetch('./data/dataControl.json');
        const data = await response.json();

        if (data) {
            exitLoader();
            setStaticPageData(data);
        }
    } catch (e) {
        console.log(`Could not load Folio Data, ERROR: '${e}'`);
        exitLoader();
        return;
    }
})();