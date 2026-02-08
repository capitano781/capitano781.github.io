'use strict';

import { CLASSES, CONFIG, SELECTORS } from './constants.js';
import {
    isArrayDataValid,
    setElementText,
    setElementAttribute,
    getElement,
    setTemplateElementText,
    setTemplateElementAttribute,
    getElementTemplateClone,
    getTemplateElementChild,
    getAllElements,
} from './utilityScripts.js';
import { isValidArray } from './validator.js';

// const setBackToHomeButtonText = (backToHomeButtonLabel) => {
//     setElementText(SELECTORS.backToHomeButton, backToHomeButtonLabel);

//     const backToHomeButton = getElement(SELECTORS.backToHomeButton);

//     backToHomeButton.addEventListener('click', event => {
//         if (event.type === 'click') {
//             setCommonHandler(event.type, 'button', SELECTORS.backToHomeButton);
//         }
//     });
// };

const setProjectHeaderdata = (projectData) => {
    setElementText(SELECTORS.projectDetailTitle, projectData.Title);
    setElementText(SELECTORS.projectDetailBriefDescription, projectData.BriefDescription);
};

const setProjectOverviewSectionData = (OverviewSectionTitle, projectOverviewData) => {
    setElementText(SELECTORS.overviewSectionTitle, OverviewSectionTitle);
    const overviewContent = getElement(SELECTORS.overviewContent);
    const overviewItemTemplate = getElement(SELECTORS.overviewItemTemplate);

    if (isArrayDataValid(projectOverviewData)) {
        projectOverviewData.forEach(overviewPoint => {

            const overviewItemTemplateClone = getElementTemplateClone(overviewItemTemplate, SELECTORS.overviewItemTemplate);

            if (overviewPoint?.Name) setTemplateElementText(overviewItemTemplateClone, SELECTORS.overviewItemName, overviewPoint?.Name);

            setTemplateElementText(overviewItemTemplateClone, SELECTORS.overviewItemDescription, overviewPoint?.Description);

            overviewContent.appendChild(overviewItemTemplateClone);

        });
    }

};

const setkeyFeaturesSectionData = (KeyFeaturesSectionTitle, projectKeyFeaturesData) => {
    setElementText(SELECTORS.keyFeaturesSectionTitle, KeyFeaturesSectionTitle);

    const featuresContent = getElement(SELECTORS.featuresContent);
    const featureItemTemplate = getElement(SELECTORS.featureItemTemplate);

    if (isArrayDataValid(projectKeyFeaturesData)) {
        projectKeyFeaturesData.forEach(keyFeature => {

            const featureItemTemplateClone = getElementTemplateClone(featureItemTemplate, SELECTORS.featureItemTemplate);

            if (keyFeature?.Name) setTemplateElementText(featureItemTemplateClone, SELECTORS.featureName, keyFeature?.Name);

            setTemplateElementText(featureItemTemplateClone, SELECTORS.featureDescription, keyFeature?.Description);

            featuresContent.appendChild(featureItemTemplateClone);

        });
    }

};

const setTechnologySectionData = (TechnologiesUsedSectionTitle, TechnologySectionData) => {
    setElementText(SELECTORS.technologiesSectionTitle, TechnologiesUsedSectionTitle);

    const technologiesContent = getElement(SELECTORS.technologiesContent);
    const technologyCategoryTemplate = getElement(SELECTORS.technologyCategoryTemplate);

    if (isArrayDataValid(TechnologySectionData)) {
        TechnologySectionData.map(technologyCategory => {

            const technologyCategoryTemplateClone = getElementTemplateClone(technologyCategoryTemplate);

            setTemplateElementText(technologyCategoryTemplateClone, SELECTORS.technologyCategoryName, technologyCategory?.Category);

            const technologyList = getTemplateElementChild(technologyCategoryTemplateClone, SELECTORS.technologyList);
            const technologyItemTemplate = getTemplateElementChild(technologyCategoryTemplateClone, SELECTORS.technologyItemTemplate);

            if (isArrayDataValid(technologyCategory?.Descriptions)) {
                technologyCategory?.Descriptions.map(description => {

                    const technologyItemTemplateClone = getElementTemplateClone(technologyItemTemplate, SELECTORS.technologyItemTemplate);

                    setTemplateElementText(technologyItemTemplateClone, SELECTORS.technologyItemName, description);

                    technologyList.appendChild(technologyItemTemplateClone);

                });
            }

            technologiesContent.appendChild(technologyCategoryTemplateClone);

        });
    }

};

const setChallengesSectionData = (ChallengesAndLearningsSectionTitle, challengesSectionData) => {
    setElementText(SELECTORS.challengesSectionTitle, ChallengesAndLearningsSectionTitle);

    const challengesContent = getElement(SELECTORS.challengesContent);
    const challengeItemTemplate = getElement(SELECTORS.challengeItemTemplate);

    if (isValidArray(challengesSectionData)) {
        challengesSectionData.map(sectionData => {

            const challengeItemTemplateClone = getElementTemplateClone(challengeItemTemplate);

            setTemplateElementText(challengeItemTemplateClone, SELECTORS.challengeName, sectionData?.Name);
            setTemplateElementText(challengeItemTemplateClone, SELECTORS.challengeDescription, sectionData?.Description);

            challengesContent.appendChild(challengeItemTemplateClone);

        });
    }
};

const setScreenshotsSectionData = (ScreenShotsSectionTitle, screenShotdata) => {
    setElementText(SELECTORS.screenshotsSectionTitle, ScreenShotsSectionTitle);

    const screenshotsContent = getElement(SELECTORS.screenshotsContent);
    const screenshotItemTemplate = getElement(SELECTORS.screenshotItemTemplate);

    if (isValidArray(screenShotdata)) {
        screenShotdata.map(screenshot => {

            const screenshotItemTemplateClone = getElementTemplateClone(screenshotItemTemplate);

            setTemplateElementAttribute(screenshotItemTemplateClone, SELECTORS.screenshotImage, 'src', screenshot?.src);

            screenshotsContent.appendChild(screenshotItemTemplateClone);
        });
    }
};

const setSourceCodeLink = (sourceCodeData) => {
    setElementText(SELECTORS.sourceCodeLink, sourceCodeData.SourceCodeLinkLabel);
    setElementAttribute(SELECTORS.sourceCodeLink, 'href', sourceCodeData.SourceCodeLink);
};

const setCopyRightText = (copyrightText) => {
    setElementText(SELECTORS.copyrightSection, copyrightText);
};

/*********************************
 * Project details data load
 **********************************/

const setActiveContent = (index) => {
    const detailsTabWrapperList = getAllElements(SELECTORS.detailsTabWrapper);
    const detailsContentContainerWrapperList = getAllElements(SELECTORS.detailsContentContainerWrapper);

    if (detailsTabWrapperList.length > 0 && detailsContentContainerWrapperList.length > 0) {
        detailsTabWrapperList?.forEach((tab, tabIndex) => {
            if (index === tabIndex) {
                tab.classList.add(CLASSES.activeTab);
                detailsContentContainerWrapperList[tabIndex].classList.add(CLASSES.activeContent);
            } else {
                tab.classList.remove(CLASSES.activeTab);
                detailsContentContainerWrapperList[tabIndex].classList.remove(CLASSES.activeContent);
            }
        });
    }
};

const setCommonHandler = (eventType, fieldType, handlerElementId, data) => {
    if (fieldType === 'button') {
        if (eventType === 'click') {
            if (SELECTORS.backToHomeButton === handlerElementId) {
                window.location.href = `/index.html`;
            }
            if (handlerElementId === SELECTORS.detailsTabIcon || handlerElementId === SELECTORS.detailsTabText) {
                setActiveContent(data.index);
            }
        }
    }
};

const setProjectTitle = (value) => {
    setElementText(SELECTORS.projectDetailsHeaderSectionTitle, value);
};

const setProjectTabs = (projectData) => {
    const tabsList = projectData?.sections.map(section => {
        return {
            title: section.title,
            icon: section.iconUrl,
        }
    });
    const detailsTabsContainer = getElement(SELECTORS.detailsTabsContainer);
    detailsTabsContainer.innerHTML = '';
    const detailsTabTemplate = getElement(SELECTORS.detailsTabTemplate);

    if (isArrayDataValid(tabsList)) {
        tabsList.forEach((tab, index) => {
            const detailsTabTemplateClone = getElementTemplateClone(detailsTabTemplate, SELECTORS.detailsTabTemplate);

            const iconUrl = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}${tab.icon}') ${CONFIG.IMAGE_FILE_URL_ATTR}`;
            const detailsTabIcon = getTemplateElementChild(detailsTabTemplateClone, SELECTORS.detailsTabIcon);
            detailsTabIcon.style.background = iconUrl;
            detailsTabIcon.addEventListener('click', event => {
                setCommonHandler(event.type, 'button', SELECTORS.detailsTabIcon, { index });
            });

            const detailsTabText = getTemplateElementChild(detailsTabTemplateClone, SELECTORS.detailsTabText);
            detailsTabText.textContent = tab.title;
            detailsTabText.addEventListener('click', event => {
                setCommonHandler(event.type, 'button', SELECTORS.detailsTabText, { index });
            });

            detailsTabsContainer.appendChild(detailsTabTemplateClone);
        });
    }
};

const setProjectContents = (projectData) => {
    const detailsContentContainer = getElement(SELECTORS.detailsContentContainer);
    detailsContentContainer.innerHTML = '';
    const detailsContentContainerTemplate = getElement(SELECTORS.detailsContentContainerTemplate);

    if (isArrayDataValid(projectData?.sections)) {
        projectData?.sections.forEach(section => {

            const detailsContentContainerTemplateClone = getElementTemplateClone(detailsContentContainerTemplate, SELECTORS.detailsContentContainerTemplate);

            // set content title
            setTemplateElementText(detailsContentContainerTemplateClone, SELECTORS.detailsTitle, section?.title);

            // set content data
            const detailsContent = getTemplateElementChild(detailsContentContainerTemplateClone, SELECTORS.detailsContent);

            switch (section.type) {
                case 'plainList': {

                    const plainListTemplate = getTemplateElementChild(detailsContentContainerTemplateClone, SELECTORS.plainListTemplate);

                    if (isValidArray(section?.content)) {
                        section?.content.forEach(data => {

                            const plainListTemplateClone = getElementTemplateClone(plainListTemplate, SELECTORS.plainListTemplate);

                            setTemplateElementText(plainListTemplateClone, SELECTORS.primaryText, data.primaryText);
                            setTemplateElementText(plainListTemplateClone, SELECTORS.secondaryText, data.secondaryText);

                            detailsContent.appendChild(plainListTemplateClone);
                        });
                    }

                    break;
                }
                default: null;
            };

            detailsContentContainer.appendChild(detailsContentContainerTemplateClone);
        });
    }
};

export const setProjectDetailsPageData = (projectData) => {

    console.log(projectData);

    setProjectTitle(projectData?.Title);

    setProjectTabs(projectData);

    setProjectContents(projectData);

    setActiveContent(0);








    // setBackToHomeButtonText(projectData?.backToHomeButtonLabel);
    // setProjectHeaderdata(projectData);
    // setProjectOverviewSectionData(ProjectSectionLabels.OverviewSectionTitle, projectData?.Overview);
    // setkeyFeaturesSectionData(ProjectSectionLabels.KeyFeaturesSectionTitle, projectData?.KeyFeatures);
    // setTechnologySectionData(ProjectSectionLabels.TechnologiesUsedSectionTitle, projectData?.TechnologiesUsed);
    // setChallengesSectionData(ProjectSectionLabels.ChallengesAndLearningsSectionTitle, projectData?.ChallengesAndLearnings);
    // if (projectData?.showScreenshotSection)
    //     setScreenshotsSectionData(ProjectSectionLabels.ScreenShotsSectionTitle, projectData?.ScreenShots);
    // setSourceCodeLink(projectData?.SourceCodeData);
    // setCopyRightText(copyrightText);

};