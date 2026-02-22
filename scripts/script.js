import { validatePortfolioData } from "./modules/utils/validator.js";
import { initApiResponse } from "./modules/core/initApiResponse.js";
import { CONFIG, CLASSES, SELECTORS, MESSAGES, STATE_PROPS } from "./modules/utils/constants.js";
import { renderView } from "./modules/views/renderView.js";
import {
  getElement,
  getAllElements,
} from "./modules/utils/utilityScripts.js";
import { loadPostRenderDomElements, loadPreRenderDomElements } from "./modules/utils/domElementRegistry.js";
import { isBgVideoRunning, setBgVideoSpeed, initBgVideoHandlers } from './modules/controls/bgVideoController.js';
import setBoxSliderCardPosition, { initBoxSliderHandlers } from "./modules/controls/boxSlideController.js";
import setActiveView, { initMenuSliderHandlers } from "./modules/controls/menuSliderController.js";
import { setProjectDetailsPageData } from "./modules/views/renderProjectDetails.js";

const stateHandler = {
  set(target, property, value) {
    switch (property) {
      case (STATE_PROPS.videoPlayback): {
        isBgVideoRunning(value);
        return Reflect.set(target, property, value);
      }
      case (STATE_PROPS.videoPlaybackRate): {
        setBgVideoSpeed(value);
        return Reflect.set(target, property, value);
      }
      case (STATE_PROPS.activeView): {
        setActiveView(value);
        return Reflect.set(target, property, value);
      }
      case (STATE_PROPS.activeProject): {
        setBoxSliderCardPosition(value);
        return Reflect.set(target, property, value);
      }
      case (STATE_PROPS.activeProjectDetails): {
        setProjectDetailsPageData(value)
        return Reflect.set(target, property, value);
      }
      case (STATE_PROPS.activeProjectTab): {
        return Reflect.set(target, property, value);
      }
      case (STATE_PROPS.activeImageZoom): {
        return Reflect.set(target, property, value);
      }
      default: return true;
    }
  }
}

export const stateProxy = new Proxy({}, stateHandler);

export function getState(prop) {
  if (!(Reflect.has(stateProxy, prop))) console.log('Invalid state property:', prop);
  return stateProxy[prop];
};

export function setState(prop, value) {
  stateProxy[prop] = value;
};

// ################################################################################





const exitLoader = () => {
  const loaderOverlay = getElement(SELECTORS.loaderOverlay);
  const menuBar = getElement(SELECTORS.menuBar);
  loaderOverlay.classList.add(CLASSES.hiddenWithScale);
  rootContainer.classList.remove(CLASSES.hiddenWithScale);
  menuBar.classList.remove(CLASSES.hiddenWithScale);
};

const initHandlers = () => {
  initBgVideoHandlers();
  initBoxSliderHandlers();
  initMenuSliderHandlers();
};

(async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, CONFIG.LOADER_DELAY));

    const response = await fetch(CONFIG.DATA_FILE_PATH);
    const data = await response.json();
    const validateData = validatePortfolioData(data);

    if (!validateData.isValid) {
      console.error(`${MESSAGES.dataValidationFailed}`, validateData.allErrors);
      return;
    }

    if (data) {
      exitLoader();

      // initialize api response
      initApiResponse(data);

      // Initialize DOM elements required Pre-Render
      loadPreRenderDomElements();

      // Plug JSON data object to JS runtime
      renderView();

      // Initialize DOM elements required Post-Render
      loadPostRenderDomElements();

      // Initialize handlers
      initHandlers()

      // Initial traps activation
      setState(STATE_PROPS.videoPlayback, true);
      setState(STATE_PROPS.videoPlaybackRate, 1);
      setState(STATE_PROPS.activeView, 'home');
      setState(STATE_PROPS.activeProject, 0);
      setState(STATE_PROPS.activeProjectDetails, 0);
      setState(STATE_PROPS.activeProjectTab, 0);
      setState(STATE_PROPS.activeImageZoom, 0);

      return;
    }
  } catch (e) {
    console.error(`Could not load Folio Data, ERROR: '${e}'`);
    exitLoader();
    return;
  }
})();