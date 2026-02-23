import elements from '../utils/domElementRegistry.js';
import { CLASSES } from '../utils/constants.js';

const exitLoader = () => {
    elements.loaderOverlay.classList.add(CLASSES.hiddenWithScale);
    elements.rootContainer.classList.remove(CLASSES.hiddenWithScale);
    elements.menuBar.classList.remove(CLASSES.hiddenWithScale);
};

export default exitLoader;