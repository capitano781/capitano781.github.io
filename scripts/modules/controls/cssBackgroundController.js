import { CLASSES } from '../utils/constants.js';
import elements from '../utils/domElementRegistry.js';
import { toggleElementClassName } from '../utils/utilityScripts.js';

const toggleCssBackgroundAnimationState = () => {
    toggleElementClassName(elements.halo1, CLASSES.stopAnimation);
    toggleElementClassName(elements.halo2, CLASSES.stopAnimation);
    toggleElementClassName(elements.halo3, CLASSES.stopAnimation);
    toggleElementClassName(elements.halo4, CLASSES.stopAnimation);
    toggleElementClassName(elements.halo5, CLASSES.stopAnimation);
    toggleElementClassName(elements.halo6, CLASSES.stopAnimation);
    toggleElementClassName(elements.centerRing, CLASSES.stopAnimation);
};

export default toggleCssBackgroundAnimationState;
