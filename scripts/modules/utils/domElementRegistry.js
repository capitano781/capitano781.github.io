
import { getElement, getAllElements } from "./utilityScripts.js";
import { SELECTORS } from "./constants.js";

let elements = {};

export const loadPostRenderDomElements = () => {
    elements.documentElement = document;
    elements.bgVideo = getElement(SELECTORS.backgroundVideo);
    elements.bgVideo = getElement(SELECTORS.backgroundVideo);
    elements.bgVideoControl = getElement(SELECTORS.bgVideoControl);
    elements.projectSlides = [...getAllElements(SELECTORS.projectBoxWrapper)];
    elements.boxSliderLeftNav = getElement(SELECTORS.SliderLeftNav);
    elements.boxSliderRightNav = getElement(SELECTORS.SliderRightNav);
    elements.mainMenuItems = getAllElements(SELECTORS.menuItem);
    elements.hamburgerMenuItems = getAllElements(SELECTORS.hamburgerMenuItem);
    elements.sectionViews = getAllElements(SELECTORS.view);
    elements.menuSlider = getElement(SELECTORS.menuSlider);
    elements.hamburgerMenu = getElement(SELECTORS.hamburgerMenu);
    elements.hamburgerIcon = getElement(SELECTORS.hamburgerIcon);
    elements.contactText = getElement(SELECTORS.contactText);
};

export const loadPreRenderDomElements = () => {

    elements.loaderOverlay = getElement(SELECTORS.loaderOverlay);
    elements.menuBar = getElement(SELECTORS.menuBar);
    elements.rootContainer = getElement(SELECTORS.rootContainer);

    elements.headerViewWorkButton = getElement(SELECTORS.headerViewWorkButton);

    elements.projectGrid = getElement(SELECTORS.projectGrid);
    elements.projectBox = getElement(SELECTORS.projectBox);

    elements.techSkillContent = getElement(SELECTORS.techSkillContent);
    elements.skillGroupTemplate = getElement(SELECTORS.skillGroup);

    elements.aboutSummeryContent = getElement(SELECTORS.aboutSummeryContent);
    elements.aboutSummeryDescriptionTemplate = getElement(SELECTORS.aboutSummeryDescription);
    elements.aboutTitle = getElement(SELECTORS.aboutTitle);
    elements.creditsLink = getElement(SELECTORS.creditsLink);

    elements.contactDetails = getElement(SELECTORS.contactDetails);
    elements.contactDescriptionTemplate = getElement(SELECTORS.contactDescription);

    elements.detailsTabsContainer = getElement(SELECTORS.detailsTabsContainer);
    elements.detailsTabTemplate = getElement(SELECTORS.detailsTabTemplate);
    elements.projectDetailsCancel = getElement(SELECTORS.projectDetailsCancel);

    elements.detailsContentContainer = getElement(SELECTORS.detailsContentContainer);
    elements.detailsContentContainerTemplate = getElement(SELECTORS.detailsContentContainerTemplate);
    elements.imageGalleryLargeViewCancel = getElement(SELECTORS.imageGalleryLargeViewCancel);
    elements.imageGalleryLargeView = getElement(SELECTORS.imageGalleryLargeView);

};

export default elements;
