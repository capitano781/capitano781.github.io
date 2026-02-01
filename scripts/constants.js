"use strict";

/**
 * Constants for portfolio application
 * Centralized place for hardcoded values, selectors, and configuration
 */

// ============================================
// Configuration
// ============================================

export const CONFIG = {
  LOADER_DELAY: 100, // milliseconds
  DATA_FILE_PATH: "./data/dataControl.json",
  ERROR_FALLBACK_TEXT: "Data Plug Error",
};

export const SELECTORS = {
  // ============================================
  // DOM Selectors - Index page
  // ============================================

  // Loader
  loaderOverlay: "#loaderOverlay",
  rootContainer: "#rootContainer",

  // video
  bgVideoControl: '#bgVideoControl',
  backgroundVideo: '#bgVideo',

  // Header Section
  header: "#header",
  headerTitlePart1: "#headerTitlePart1",
  headerTitlePart2: "#headerTitlePart2",
  headerDescription: "#headerDescription",
  headerTag: "#headerTag",
  headerViewWorkButton: "#headerViewWorkButton",
  headerImage: "#headerImage",

  // Project Section
  projectSectionTitle: "#projectSectionTitle",
  projectSectionSecondaryTitle: "#projectSectionSecondaryTitle",
  projectGrid: "#projectGrid",
  projectBox: "#projectBox",
  projectBoxWrapper: "#projectBoxWrapper",
  projectTitle: "#projectTitle",
  projectNumber: "#projectNumber",
  projectDescText: "#projectDescText",
  projectDetailsIndexPageButton: "#projectDetailsIndexPageButton",
  SliderLeftNav: "#SliderLeftNav",
  SliderRightNav: "#SliderRightNav",
  projectSlideClose: "#projectSlideClose",

  // About Section
  aboutTitle: "#aboutTitle",
  aboutContent: "#aboutContent",
  aboutSummeryDescription: "#aboutSummeryDescription",
  aboutSummeryDescriptionWrapper: "#aboutSummeryDescriptionWrapper",

  // Tech Skills Section
  techSkillTitle: "#techSkillTitle",
  techSkillContent: "#techSkillContent",
  skillGroup: "#skillGroup",
  skillGroupWrapper: "#skillGroupWrapper",
  skillCategory: "#skillCategory",
  skillTags: "#skillTags",
  skillTag: "#skillTag",
  skillTagWrapper: "#skillTagWrapper",

  // Contact Section
  contactTitle: "#contactTitle",
  contactContent: "#contactContent",
  contactDescription: "#contactDescription",
  contactDescriptionWrapper: "#contactDescriptionWrapper",
  contactText: "#contactText",
  contactLink: "#contactLink",

  // Footer Section
  copyrightSection: "#copyrightSection",

  // menu bar
  menuSlider: "#menuSlider",
  menuItem: ".menuItem",
  menuBar: "#menuBar",
  hamburgerMenuItem: ".hamburgerMenuItem",
  hamburgerIcon: "#hamburgerIcon",
  hamburgerMenu: "#hamburgerMenu",

  view: ".view",

  // Project Detail Page Selectors
  backToHomeButton: "#backToHomeButton",
  projectDetailHeader: "#projectDetailHeader",
  projectDetailHeroSection: "#projectDetailHeroSection",
  projectDetailTitle: "#projectDetailTitle",
  projectDetailBriefDescription: "#projectDetailBriefDescription",

  // Overview Section
  projectOverviewSection: "#projectOverviewSection",
  overviewContent: "#overviewContent",
  overviewItem: "#overviewItem",
  overviewItemWrapper: "#overviewItemWrapper",
  overviewItemName: "#overviewItemName",
  overviewItemDescription: "#overviewItemDescription",

  // Features Section
  keyFeaturesSection: "#keyFeaturesSection",
  featuresContent: "#featuresContent",
  featureItem: "#featureItem",
  featureItemWrapper: "#featureItemWrapper",
  featureName: "#featureName",
  featureDescription: "#featureDescription",

  // Technologies Section
  technologiesSection: "#technologiesSection",
  technologiesContent: "#technologiesContent",
  technologyCategory: "#technologyCategory",
  technologyCategoryWrapper: "#technologyCategoryWrapper",
  technologyCategoryName: "#technologyCategoryName",
  technologyList: "#technologyList",
  technologyItem: "#technologyItem",
  technologyItemName: "#technologyItemName",

  // Challenges Section
  challengesSection: "#challengesSection",
  challengesContent: "#challengesContent",
  challengeItem: "#challengeItem",
  challengeItemWrapper: "#challengeItemWrapper",
  challengeName: "#challengeName",
  challengeDescription: "#challengeDescription",

  // Screenshots Section
  screenshotsSection: "#screenshotsSection",
  screenshotsContent: "#screenshotsContent",
  screenshotItem: "#screenshotItem",
  screenshotItemWrapper: "#screenshotItemWrapper",
  screenshotImage: "#screenshotImage",

  // Source Code Section
  sourceCodeSection: "#sourceCodeSection",
  sourceCodeLink: "#sourceCodeLink",

  // ============================================
  // DOM Selectors - Project details page
  // ============================================

  projectDetailsPageLoaderOverlay: "#projectDetailsPageLoaderOverlay",
  projectDetailsPageRootContainer: "#projectDetailsPageRootContainer",

  backToHomeButton: "#backToHomeButton",

  projectDetailTitle: "#projectDetailTitle",

  overviewSectionTitle: "#overviewSectionTitle",
  overviewContent: "#overviewContent",
  overviewItemTemplate: "#overviewItemTemplate",
  overviewItemName: "#overviewItemName",
  overviewItemDescription: "#overviewItemDescription",

  keyFeaturesSectionTitle: "#keyFeaturesSectionTitle",
  featuresContent: "#featuresContent",
  featureItemTemplate: "#featureItemTemplate",
  featureName: "#featureName",
  featureDescription: "#featureDescription",

  technologiesSectionTitle: "#technologiesSectionTitle",
  technologiesContent: "#technologiesContent",
  technologyCategoryTemplate: "#technologyCategoryTemplate",
  technologyCategoryName: "#technologyCategoryName",
  technologyList: "#technologyList",
  technologyItemTemplate: "#technologyItemTemplate",
  technologyItemName: "#technologyItemName",

  challengesSectionTitle: "#challengesSectionTitle",
  challengesContent: "#challengesContent",
  challengeItemTemplate: "#challengeItemTemplate",
  challengeName: "#challengeName",
  challengeDescription: "#challengeDescription",

  screenshotsSectionTitle: "#screenshotsSectionTitle",
  screenshotsContent: "#screenshotsContent",
  screenshotItemTemplate: "#screenshotItemTemplate",
  screenshotImage: "#screenshotImage",

  sourceCodeLink: "#sourceCodeLink",
};

// ============================================
// CSS Classes
// ============================================

export const CLASSES = {
  hidden: "hideElement",
  hiddenWithScale: "hideElementWithScale",
  hiddenWithOpacity: "hideElementWithOpacity",
  visible: "showElement",
  projectCard: "projectBoxWrapper",
  skillTag: "skillTagWrapper",
  contactCard: "contactDescriptionWrapper",
  hamburgerIconActive: "hamburgerIcon-active",
  slidePosition1: "slide-position-1",
  slidePosition2: "slide-position-2",
  slidePosition3: "slide-position-3",
  dismissSlideRight: "dismiss-slide-right",
  dismissSlideLeft: "dismiss-slide-left",
  sendSlideBackToDeck: "send-to-back-deck",
};

// ============================================
// Messages
// ============================================

export const MESSAGES = {
  loadingError: "Could not load Folio Data",
  elementNotFound: "Element not found",
  elementsNotFound: "Elements not found",
  dataValidationFailed: "Data validation failed",
  cloneFailed: "Failed to clone template",
};

// ============================================
// Event Types
// ============================================

export const EVENTS = {
  projectDetailsClick: "projectDetailsClick",
  pageLoaded: "pageLoaded",
  dataLoaded: "dataLoaded",
};

// ============================================
// Data Keys (JSON Structure)
// ============================================

export const DATA_KEYS = {
  headerTitle: "Header_Title",
  headerDescription: "Header_Description",
  projectSection: "Project_Section",
  aboutSection: "About_Section",
  techSkillsSection: "Technical_Skills_Section",
  contactSection: "Contact_Section",
  footerSection: "Footer_Section",
};
