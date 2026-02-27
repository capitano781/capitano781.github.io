
import elements from '../utils/domElementRegistry.js';
import setHandler from '../core/initHandler.js';
import { SELECTORS, EVENTS } from '../utils/constants.js';

export const isBgVideoRunning = flag => {
    if (flag) {
        elements.bgVideo.play();
    } else {
        elements.bgVideo.pause();
    }
};

export const setBgVideoSpeed = speed => {
    elements.bgVideo.playbackRate = speed;
};

export const initBgVideoHandlers = () => {
    setHandler(elements.documentElement, EVENTS.VISIBILITY_CHANGE, SELECTORS.documentElement);
    setHandler(elements.bgVideoControl, EVENTS.CLICK, SELECTORS.bgVideoControl, { payload: 'bgVideoControl payload' });
};
