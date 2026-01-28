import { validatePortfolioData } from "./validator.js";
import { CONFIG, CLASSES, SELECTORS, MESSAGES } from "./constants.js";
import { setStaticPageData } from "./dataPlugScript.js";
import { getElement } from "./utilityScripts.js";

// window.location.href = './projectDetails.html';

// const bgVideo = document.getElementById("bgVideo");
// bgVideo.playbackRate = 0.1; // 0.25 = very slow, 0.5 = smooth slow

const exitLoader = () => {
  const loaderOverlay = getElement(SELECTORS.loaderOverlay);
  const rootContainer = getElement(SELECTORS.rootContainer);
  loaderOverlay.classList.add(CLASSES.hidden);
  rootContainer.classList.remove(CLASSES.hidden);
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
      setStaticPageData(data);
      return;
    }
  } catch (e) {
    console.error(`Could not load Folio Data, ERROR: '${e}'`);
    exitLoader();
    return;
  }
})();

const headerSection = document.querySelector(SELECTORS.header);

const setActiveSection = (targetSection) => {
  targetSection.classList.add("activeSection");
  // targetSection.style.transform = `scale(1)`;
};

const controlSlider = () => {
  // Menu bar slider controls

  const menuSlider = document.querySelector(SELECTORS.menuSlider);
  const menuItems = document.querySelectorAll(SELECTORS.menuItem);

  const sectionViews = document.querySelectorAll(SELECTORS.view);

  const setSliderPosition = (targetMenu) => {
    const { offsetLeft } = targetMenu;

    menuSlider.style.left = `${offsetLeft}px`;
  };

  const menuItemClickHandler = (eventType, menuItem, menuIndex) => {
    if (eventType === "click") {
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove("menuActive");
      });
      menuItem.classList.add("menuActive");
      setSliderPosition(menuItem);

      sectionViews.forEach((view, index) => {
        if (index === menuIndex) {
          view.classList.add("activeSection");
        } else {
          view.classList.remove("activeSection");
        }
      });
    }
  };

  // if (menuItems && Array.isArray(menuItems) && menuItems.length > 0)
  menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener("click", (event) => {
      menuItemClickHandler(event.type, menuItem, index);
    });
  });
};

controlSlider();
