
import { getElement, getAllElements } from "./utilityScripts.js";
import { SELECTORS } from "./constants.js";

let elements = {};

export const loadPostRenderDomElements = () => {
    elements.documentElement = document;
    elements.bgVideo = getElement(SELECTORS.backgroundVideo);
    elements.bgVideoControl = getElement(SELECTORS.bgVideoControl);
    elements.projectSlides = [...getAllElements(SELECTORS.projectBoxWrapper)];
    elements.boxSliderLeftNav = getElement(SELECTORS.SliderLeftNav);
    elements.boxSliderRightNav = getElement(SELECTORS.SliderRightNav);
    elements.mainMenuItems = getAllElements(SELECTORS.menuItem);
    elements.hamburgerMenuItems = getAllElements(SELECTORS.hamburgerMenuItem);
    elements.sectionViews = getAllElements(SELECTORS.view);
    elements.menuSlider = getElement(SELECTORS.menuSlider);
    elements.rootContainer = getElement(SELECTORS.rootContainer);
    elements.menuBar = getElement(SELECTORS.menuBar);
    elements.hamburgerMenu = getElement(SELECTORS.hamburgerMenu);
    elements.hamburgerIcon = getElement(SELECTORS.hamburgerIcon);
};

export const loadPreRenderDomElements = () => {

    elements.headerViewWorkButton = getElement(SELECTORS.headerViewWorkButton);

    elements.projectGrid = getElement(SELECTORS.projectGrid);
    elements.projectBox = getElement(SELECTORS.projectBox);

    elements.techSkillContent = getElement(SELECTORS.techSkillContent);
    elements.skillGroupTemplate = getElement(SELECTORS.skillGroup);

    elements.aboutContent = getElement(SELECTORS.aboutContent);
    elements.aboutSummeryDescriptionTemplate = getElement(SELECTORS.aboutSummeryDescription);

    elements.contactContent = getElement(SELECTORS.contactContent);
    elements.contactDescriptionTemplate = getElement(SELECTORS.contactDescription);

    elements.detailsTabsContainer = getElement(SELECTORS.detailsTabsContainer);
    elements.detailsTabTemplate = getElement(SELECTORS.detailsTabTemplate);

};

export default elements;
