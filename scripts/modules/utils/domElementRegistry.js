
import { getElement, getAllElements } from "./utilityScripts.js";
import { SELECTORS } from "./constants.js";

let elements = {};

export const loadPostRenderDomElements = () => {
    elements.documentElement = document;
    elements.bgVideo = getElement(SELECTORS.backgroundVideo);
    elements.bgVideo = getElement(SELECTORS.backgroundVideo);
    elements.halo1 = getElement(SELECTORS.halo1);
    elements.halo2 = getElement(SELECTORS.halo2);
    elements.halo3 = getElement(SELECTORS.halo3);
    elements.halo4 = getElement(SELECTORS.halo4);
    elements.halo5 = getElement(SELECTORS.halo5);
    elements.halo6 = getElement(SELECTORS.halo6);
    elements.centerRing = getElement(SELECTORS.centerRing);
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

    elements.creditDetailsTitle = getElement(SELECTORS.creditDetailsTitle);
    elements.creditDetailsContentWrapper = getElement(SELECTORS.creditDetailsContentWrapper);
    elements.creditPlainTextTemplate = getElement(SELECTORS.creditPlainTextTemplate);
    elements.creditBulletPointsTemplate = getElement(SELECTORS.creditBulletPointsTemplate);
    elements.creditLinksTemplate = getElement(SELECTORS.creditLinksTemplate);
    elements.creditDetailsCancel = getElement(SELECTORS.creditDetailsCancel);

    elements.contactDescriptionWrapper = getElement(SELECTORS.contactDescriptionWrapper);
    elements.externalLinkTemplate = getElement(SELECTORS.externalLinkTemplate);
    elements.downloadDocTemplate = getElement(SELECTORS.downloadDocTemplate);

    elements.detailsTabsContainer = getElement(SELECTORS.detailsTabsContainer);
    elements.detailsTabTemplate = getElement(SELECTORS.detailsTabTemplate);
    elements.projectDetailsCancel = getElement(SELECTORS.projectDetailsCancel);

    elements.detailsContentContainer = getElement(SELECTORS.detailsContentContainer);
    elements.detailsContentContainerTemplate = getElement(SELECTORS.detailsContentContainerTemplate);
    elements.imageGalleryLargeViewCancel = getElement(SELECTORS.imageGalleryLargeViewCancel);
    elements.imageGalleryLargeView = getElement(SELECTORS.imageGalleryLargeView);

};

export default elements;
