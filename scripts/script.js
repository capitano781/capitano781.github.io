import { validatePortfolioData } from "./validator.js";
import { CONFIG, CLASSES, SELECTORS, MESSAGES } from "./constants.js";
import { setStaticPageData } from "./dataPlugScript.js";
import { getElement, getAllElements } from "./utilityScripts.js";

// window.location.href = './projectDetails.html';

// const bgVideo = document.getElementById("bgVideo");
// bgVideo.playbackRate = 0.1; // 0.25 = very slow, 0.5 = smooth slow

const rootContainer = getElement(SELECTORS.rootContainer);
const menuBar = getElement(SELECTORS.menuBar);
const hamburgerMenu = getElement(SELECTORS.hamburgerMenu);
const hamburgerIcon = getElement(SELECTORS.hamburgerIcon);
const headerViewWorkButton = getElement(SELECTORS.headerViewWorkButton);

const toggleElementClassName = (element, className) => {
  if (element?.classList?.value.includes(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

const exitLoader = () => {
  const loaderOverlay = getElement(SELECTORS.loaderOverlay);
  const menuBar = getElement(SELECTORS.menuBar);
  loaderOverlay.classList.add(CLASSES.hiddenWithScale);
  rootContainer.classList.remove(CLASSES.hiddenWithScale);
  menuBar.classList.remove(CLASSES.hiddenWithScale);
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

const controlSlider = () => {
  // Menu bar slider controls

  const menuSlider = getElement(SELECTORS.menuSlider);
  const mainMenuItems = getAllElements(SELECTORS.menuItem);
  const hamburgerMenuItems = getAllElements(SELECTORS.hamburgerMenuItem);

  const sectionViews = getAllElements(SELECTORS.view);

  const setSliderPosition = (targetMenu) => {
    const { offsetLeft } = targetMenu;
    menuSlider.style.left = `${offsetLeft}px`;
  };

  const findSliderMenu = (viewId) => {
    mainMenuItems.forEach((menuItem) => {
      if (menuItem?.id?.includes(viewId)) {
        menuItem.classList.add("menuActive");
        setSliderPosition(menuItem);
      } else {
        menuItem.classList.remove("menuActive");
      }
    });
  };

  const setActiveView = (menuId) => {
    sectionViews.forEach((view) => {
      if (menuId.includes(view?.id)) {
        view.classList.add("activeSection");
        findSliderMenu(view?.id);
      } else {
        view.classList.remove("activeSection");
      }
    });
  };

  const menuItemClickHandler = (eventType, menuItem, menuType) => {
    if (eventType === "click") {
      if (menuType === "hamburgerMenu") {
        toggleElementClassName(rootContainer, CLASSES.hiddenWithScale);
        toggleElementClassName(menuBar, CLASSES.hiddenWithScale);
        toggleElementClassName(hamburgerIcon, CLASSES.hamburgerIconActive);
        toggleElementClassName(hamburgerMenu, CLASSES.hiddenWithOpacity);
      }
      setActiveView(menuItem.id);
    }
  };

  mainMenuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
      menuItemClickHandler(event.type, menuItem, "mainMenu");
    });
  });

  hamburgerMenuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
      setTimeout(() => {
        menuItemClickHandler(event.type, menuItem, "hamburgerMenu");
      }, 300);
    });
  });

  headerViewWorkButton.addEventListener("click", (event) => {
    setTimeout(() => {
      setActiveView("work");
    }, 300);
  });
};

controlSlider();

const hamburgerIconToggle = () => {
  hamburgerIcon.addEventListener("click", () => {
    toggleElementClassName(rootContainer, CLASSES.hiddenWithScale);
    toggleElementClassName(menuBar, CLASSES.hiddenWithScale);
    toggleElementClassName(hamburgerIcon, CLASSES.hamburgerIconActive);
    toggleElementClassName(hamburgerMenu, CLASSES.hiddenWithOpacity);
  });
};

hamburgerIconToggle();
