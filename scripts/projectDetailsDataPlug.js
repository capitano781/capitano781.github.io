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

/*********************************
 * Project details data load
 **********************************/

const sectionLimit = 5;

const getProjectSections = (projectData) => {
    if (projectData && projectData.sections && isValidArray(projectData?.sections)) {
        return projectData?.sections.filter((section, index) => index < sectionLimit);
    }
};

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

const setProjectTabs = (projectSections) => {
    const tabsList = projectSections.map(section => {
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

const setProjectContents = (projectSections) => {
    const detailsContentContainer = getElement(SELECTORS.detailsContentContainer);
    detailsContentContainer.innerHTML = '';
    const detailsContentContainerTemplate = getElement(SELECTORS.detailsContentContainerTemplate);

    if (projectSections && isArrayDataValid(projectSections)) {
        projectSections.forEach(section => {
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

                            if (section?.content.length === 1) getTemplateElementChild(plainListTemplateClone, SELECTORS.plainListBulletIcon).remove();

                            if (data.primaryText) setTemplateElementText(plainListTemplateClone, SELECTORS.primaryText, data.primaryText);

                            if (data.secondaryText) setTemplateElementText(plainListTemplateClone, SELECTORS.secondaryText, data.secondaryText);

                            detailsContent.appendChild(plainListTemplateClone);
                        });
                    }

                    break;
                }
                case 'largeIconTextBoxList': {

                    const largeIconTextBoxContainer = getElement(SELECTORS.largeIconTextBoxContainer)

                    const largeIconTextBoxTemplate = getTemplateElementChild(largeIconTextBoxContainer, SELECTORS.largeIconTextBoxTemplate);

                    if (isValidArray(section?.content)) {
                        largeIconTextBoxContainer.classList.remove('hideElement');
                        section?.content.forEach(data => {

                            const largeIconTextBoxTemplateClone = getElementTemplateClone(largeIconTextBoxTemplate, SELECTORS.largeIconTextBoxTemplate);

                            getTemplateElementChild(largeIconTextBoxTemplateClone, SELECTORS.largeIcon).style.background = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}icons/${data}.svg') ${CONFIG.IMAGE_FILE_URL_ATTR}`;

                            setTemplateElementText(largeIconTextBoxTemplateClone, SELECTORS.iconText, data);

                            largeIconTextBoxContainer.appendChild(largeIconTextBoxTemplateClone);
                        });
                    }

                    detailsContent.appendChild(largeIconTextBoxContainer);

                    break;
                }
                default: null;
            };
            detailsContentContainer.appendChild(detailsContentContainerTemplateClone);
        });
    }
};

export const setProjectDetailsPageData = (projectData) => {
    setProjectTitle(projectData?.Title);
    const projectSections = getProjectSections(projectData);
    setProjectTabs(projectSections);
    setProjectContents(projectSections);
    setActiveContent(0);
};