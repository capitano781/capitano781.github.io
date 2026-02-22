import { setState, getState } from '../../script.js';
import { STATE_PROPS, SELECTORS, EVENTS } from '../utils/constants.js';
import { toggleGroupClasses } from '../utils/utilityScripts.js';

let lockSliderNavigation = true;

export const handlers = {
    [SELECTORS.documentElement]: {
        [EVENTS.VISIBILITY_CHANGE]: () => {
            setState(STATE_PROPS.videoPlayback, !getState(STATE_PROPS.videoPlayback));
        }
    },
    [SELECTORS.bgVideoControl]: {
        [EVENTS.CLICK]() {
            setState(STATE_PROPS.videoPlayback, !getState(STATE_PROPS.videoPlayback));
        }
    },
    [SELECTORS.SliderLeftNav]: {
        [EVENTS.CLICK](payload) {
            if (!lockSliderNavigation) return;

            lockSliderNavigation = false;
            const activeProjectPosition = getState(STATE_PROPS.activeProject);
            setState(STATE_PROPS.activeProject, (activeProjectPosition > 0) ? activeProjectPosition - 1 : payload.boxSliderLength - 1);

            setTimeout(() => lockSliderNavigation = true, 500);
        }
    },
    [SELECTORS.SliderRightNav]: {
        [EVENTS.CLICK](payload) {
            if (!lockSliderNavigation) return;

            lockSliderNavigation = false;
            const activeProjectPosition = getState(STATE_PROPS.activeProject);
            setState(STATE_PROPS.activeProject, (activeProjectPosition === payload.boxSliderLength - 1) ? 0 : activeProjectPosition + 1);

            setTimeout(() => lockSliderNavigation = true, 500);
        }
    },
    [SELECTORS.projectDetailsIndexPageButton]: {
        [EVENTS.CLICK](payload) {
            setTimeout(() => setState(STATE_PROPS.activeView, payload.view), 500);
            setState(STATE_PROPS.activeProjectDetails, payload.projectIndex);
        }
    },
    [SELECTORS.headerViewWorkButton]: {
        [EVENTS.CLICK]() {
            setTimeout(() => setState(STATE_PROPS.activeView, 'work'), 500);
        }
    },
    [SELECTORS.menuItem]: {
        [EVENTS.CLICK](payload) {
            setState(STATE_PROPS.activeView, payload.menuId);
        }
    },
    [SELECTORS.hamburgerMenuItem]: {
        [EVENTS.CLICK](payload) {
            toggleGroupClasses();
            setState(STATE_PROPS.activeView, payload.menuId);
        }
    },
    [SELECTORS.hamburgerIcon]: {
        [EVENTS.CLICK]() {
            toggleGroupClasses();
        }
    },
    [SELECTORS.detailsTabIcon]: {
        [EVENTS.CLICK]() {
            setState(STATE_PROPS.activeProjectDetails, payload.index);
        }
    },
    [SELECTORS.detailsTabText]: {
        [EVENTS.CLICK]() {
            setState(STATE_PROPS.activeProjectDetails, payload.index);
        }
    },
};

const initHandler = (elementId, eventype, payload) => {
    if (!handlers?.[elementId]) console.log('Invalid element', elementId);
    if (!handlers?.[elementId]?.[eventype]) console.log('Invalid eventype', eventype);
    handlers?.[elementId]?.[eventype]?.(payload);
}

const setHandler = (element, eventype, elementId, payload = '') => {
    if (element) element.addEventListener(eventype, () => {
        initHandler(elementId, eventype, payload);
    });
};

export default setHandler;
