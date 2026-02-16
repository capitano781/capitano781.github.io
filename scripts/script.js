import { validatePortfolioData } from "./validator.js";
import { CONFIG, CLASSES, SELECTORS, MESSAGES } from "./constants.js";
import { setStaticPageData } from "./dataPlugScript.js";
import {
  getElement,
  getAllElements,
  setActiveView
} from "./utilityScripts.js";

// window.location.href = './projectDetails.html';

// const bgVideo = document.getElementById("bgVideo");
// bgVideo.playbackRate = 0.1; // 0.25 = very slow, 0.5 = smooth slow

const rootContainer = getElement(SELECTORS.rootContainer);
const menuBar = getElement(SELECTORS.menuBar);
const hamburgerMenu = getElement(SELECTORS.hamburgerMenu);
const hamburgerIcon = getElement(SELECTORS.hamburgerIcon);
const headerViewWorkButton = getElement(SELECTORS.headerViewWorkButton);

// CONTROLS
let playBackgroundVideo = false;
const videoPlaybackSpeed = 1;

const initBackgroundVideo = () => {
  const bgVideo = getElement(SELECTORS.backgroundVideo);
  const bgVideoControl = getElement(SELECTORS.bgVideoControl);

  bgVideo.playbackRate = videoPlaybackSpeed;

  const toggleBackgroundVideoStatus = () => {
    if (playBackgroundVideo) {
      bgVideo.play();
    } else {
      bgVideo.pause();
    }
  };
  toggleBackgroundVideoStatus();

  bgVideoControl.addEventListener('click', () => {
    playBackgroundVideo = !playBackgroundVideo;
    toggleBackgroundVideoStatus();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      bgVideo.pause();
    } else {
      if (playBackgroundVideo) bgVideo.play();
    }
  });
};

// initBackgroundVideo();

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

const initProjectSlider = () => {
  const projectSlides = [...getAllElements(SELECTORS.projectBoxWrapper)];
  const sliderLeftNav = getElement(SELECTORS.SliderLeftNav);
  const sliderRightNav = getElement(SELECTORS.SliderRightNav);
  let firstSlidePositionIndex = 0;
  let delayNavigationClickFlag = true;

  const dismissProjectSlide = (slide) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slide.addEventListener('transitionend', (e) => {
          if (e.target !== slide) return;
          slide.classList.remove(CLASSES.dismissSlideRight);
          slide.classList.remove(CLASSES.dismissSlideLeft);
          slide.classList.add(CLASSES.sendSlideBackToDeck);
          slide.removeEventListener('transitionend', () => { });
        }, { once: true });
      });
    });
  };

  const getTargetDirectionalPositions = (direction = 'RIGHT') => {

    const incrementPosition = (position) => {
      return (position + 1) < projectSlides.length ? position + 1 : 0;
    };

    const decrementPosition = (position) => {
      return (position - 1) >= 0 ? position - 1 : projectSlides.length - 1;
    };

    if (direction === 'RIGHT') {
      firstSlidePositionIndex = incrementPosition(firstSlidePositionIndex);
      const firstSlide = firstSlidePositionIndex;
      const secondSlide = decrementPosition(firstSlide);;
      const thirdSlide = incrementPosition(firstSlide);
      return { firstSlide, secondSlide, thirdSlide };
    }
    if (direction === 'LEFT') {
      firstSlidePositionIndex = decrementPosition(firstSlidePositionIndex);
      const firstSlide = firstSlidePositionIndex
      const secondSlide = decrementPosition(firstSlide);
      const thirdSlide = incrementPosition(firstSlide);
      return { firstSlide, secondSlide, thirdSlide };
    }
    return null;
  }

  const shiftSlidePositions = (direction = 'RIGHT') => {
    delayNavigationClickFlag = false;
    setTimeout(() => {
      delayNavigationClickFlag = true;
    }, 500);
    const targetPositions = getTargetDirectionalPositions(direction);
    projectSlides.forEach((projectSlide, index) => {

      // remove all slider classes
      projectSlide.classList.remove(CLASSES.slidePosition1);
      projectSlide.classList.remove(CLASSES.slidePosition2);
      projectSlide.classList.remove(CLASSES.slidePosition3);
      projectSlide.classList.remove(CLASSES.sendSlideBackToDeck);

      // set slide position classes
      if (targetPositions.firstSlide === index) {
        projectSlide.classList.add(CLASSES.slidePosition1);
      } else if (targetPositions.secondSlide === index) {
        projectSlide.classList.add(CLASSES.slidePosition2);
      } else if (targetPositions.thirdSlide === index) {
        projectSlide.classList.add(CLASSES.slidePosition3);
      } else {
        // hide remainig slides
        projectSlide.classList.add(CLASSES.sendSlideBackToDeck);
      }
    });
  };

  // initialize project slide placements
  projectSlides.forEach((projectSlide, index) => {
    if (index === 0) projectSlide.classList.add(CLASSES.slidePosition1);
    else if (index === projectSlides.length - 1) projectSlide.classList.add(CLASSES.slidePosition2);
    else if (index === 1) projectSlide.classList.add(CLASSES.slidePosition3);
    else { projectSlide.classList.add(CLASSES.sendSlideBackToDeck); }
  });

  // slider nav handlers
  sliderLeftNav.addEventListener('click', event => {
    if (delayNavigationClickFlag) shiftSlidePositions('LEFT');
  });

  sliderRightNav.addEventListener('click', event => {
    if (delayNavigationClickFlag) shiftSlidePositions('RIGHT');
  });
}

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
      initProjectSlider();
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
  const mainMenuItems = getAllElements(SELECTORS.menuItem);
  const hamburgerMenuItems = getAllElements(SELECTORS.hamburgerMenuItem);

  const menuItemClickHandler = (eventType, menuItem, menuType) => {
    if (eventType === "click") {
      if (menuType === "hamburgerMenu") {
        toggleElementClassName(rootContainer, CLASSES.hiddenWithScale);
        toggleElementClassName(menuBar, CLASSES.hiddenWithScale);
        toggleElementClassName(hamburgerIcon, CLASSES.hamburgerIconActive);
        toggleElementClassName(hamburgerMenu, CLASSES.hiddenWithOpacity);
      }
      setActiveView(menuItem.id, true);
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
      setActiveView("work", true);
    }, 300);
  });
};

const hamburgerIconToggle = () => {
  hamburgerIcon.addEventListener("click", () => {
    toggleElementClassName(rootContainer, CLASSES.hiddenWithScale);
    toggleElementClassName(menuBar, CLASSES.hiddenWithScale);
    toggleElementClassName(hamburgerIcon, CLASSES.hamburgerIconActive);
    toggleElementClassName(hamburgerMenu, CLASSES.hiddenWithOpacity);
  });
};

initBackgroundVideo();
controlSlider();
hamburgerIconToggle();