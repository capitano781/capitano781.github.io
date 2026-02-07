'use strict';

import { SELECTORS } from './constants.js';
import {
    isArrayDataValid,
    setElementText,
    setElementAttribute,
    getElement,
    setTemplateElementText,
    setTemplateElementAttribute,
    getElementTemplateClone,
    getTemplateElementChild,
} from './utilityScripts.js';
import { isValidArray } from './validator.js';

const setCommonHandler = (eventType, fieldType, handlerElementId) => {
    if (fieldType === 'button') {
        if (eventType === 'click') {
            if (SELECTORS.backToHomeButton === handlerElementId) {
                window.location.href = `/index.html`;
            }
        }
    }
};

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

export const setProjectDetailsPageData = (ProjectSectionLabels, projectData, copyrightText) => {

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