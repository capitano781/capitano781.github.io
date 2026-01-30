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

const initProjectSlider = () => {
  const projectSlides = [...getAllElements(SELECTORS.projectBoxWrapper)];
  const sliderLeftNav = getElement(SELECTORS.SliderLeftNav);
  const sliderRightNav = getElement(SELECTORS.SliderRightNav);
  const projectSlideClose = getElement(SELECTORS.projectSlideClose);
  let firstSlidePositionIndex = 0;

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

  const getTargetIncrementedPositions = () => {
    firstSlidePositionIndex = (firstSlidePositionIndex + 1 < projectSlides.length) ? firstSlidePositionIndex + 1 : 0;
    const incrementPosition = (position) => {
      return (position + 1) < projectSlides.length ? (position + 1) : 0;
    };
    const firstSlide = firstSlidePositionIndex;
    const secondSlide = incrementPosition(firstSlide);
    const thirdSlide = incrementPosition(secondSlide);

    return { firstSlide, secondSlide, thirdSlide };
  };

  const getTargetDecrementedPositions = () => {
    firstSlidePositionIndex = firstSlidePositionIndex === 0 ? projectSlides.length - 1 : firstSlidePositionIndex - 1;
    const updatePosition = (position) => {
      return position === projectSlides.length - 1 ? 0 : position + 1;
    };

    const firstSlide = firstSlidePositionIndex;
    const secondSlide = updatePosition(firstSlide);
    const thirdSlide = updatePosition(secondSlide);

    return { firstSlide, secondSlide, thirdSlide };
  };

  const shiftSlidePositions = (direction = 'RIGHT') => {
    let targetPositions = {};
    if (direction === 'RIGHT') targetPositions = getTargetIncrementedPositions();
    if (direction === 'LEFT') targetPositions = getTargetDecrementedPositions();
    projectSlides.forEach((projectSlide, index) => {

      // dismiss current first slide
      if (projectSlide.classList.contains(CLASSES.slidePosition1) && direction === 'RIGHT') {
        projectSlide.classList.remove(CLASSES.slidePosition1);
        projectSlide.classList.add(CLASSES.dismissSlideRight);
        // if (direction === 'LEFT') projectSlide.classList.add(CLASSES.dismissSlideLeft);
        dismissProjectSlide(projectSlide);
      } else {
        // remove classes for projectSlides
        if (projectSlide.classList.contains(CLASSES.slidePosition1) && direction === 'LEFT') {
          projectSlide.classList.remove(CLASSES.slidePosition1);
        }
        projectSlide.classList.remove(CLASSES.slidePosition2);
        projectSlide.classList.remove(CLASSES.slidePosition3);
        projectSlide.classList.remove(CLASSES.sendSlideBackToDeck);

        // set slide positions
        if (targetPositions.firstSlide === index) {
          projectSlide.classList.add(CLASSES.slidePosition1);
        } else if (projectSlides.length >= 2 && targetPositions.secondSlide === index) {
          projectSlide.classList.add(CLASSES.slidePosition2);
        } else if (projectSlides.length >= 3 && targetPositions.thirdSlide === index) {
          projectSlide.classList.add(CLASSES.slidePosition3);
        } else {
          // hide remainig slides
          projectSlide.classList.add(CLASSES.sendSlideBackToDeck);
        }
      }
    });
  };

  // initialize project slide placements
  projectSlides.forEach((projectSlide, index) => {
    if (index === 0) projectSlide.classList.add(CLASSES.slidePosition1);
    if (index === 1) projectSlide.classList.add(CLASSES.slidePosition2);
    if (index === 2) projectSlide.classList.add(CLASSES.slidePosition3);
    if (index > 2) projectSlide.classList.add(CLASSES.sendSlideBackToDeck);
  });

  // slider nav handlers
  sliderLeftNav.addEventListener('click', event => {
    shiftSlidePositions('LEFT');
  });

  sliderRightNav.addEventListener('click', event => {
    shiftSlidePositions('RIGHT');
  });

  projectSlideClose.addEventListener('click', event => {
    shiftSlidePositions('RIGHT');
  });

  // set sl-1 slide

  // set sl-2 slide

  // set sl-3 slide

  // set hidden-slide

  // dismiss slide

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