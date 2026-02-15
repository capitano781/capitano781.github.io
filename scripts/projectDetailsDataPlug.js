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
    setActiveView
} from './utilityScripts.js';
import { isValidArray } from './validator.js';

/*********************************
 * Project details data load
 **********************************/

const imageGalleryLargeView = getElement(SELECTORS.imageGalleryLargeView);

const sectionLimit = 5;

const setImageGalleryLargeView = (src) => {
    imageGalleryLargeView.classList.remove(CLASSES.hiddenWithScale);
    imageGalleryLargeView.style.background = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}${src}') ${CONFIG.IMAGE_FILE_URL_ATTR}`;
    imageGalleryLargeView.style.backgroundColor = '#000000cd';
};

const closeImageGalleryLargeView = () => {
    imageGalleryLargeView.classList.add(CLASSES.hiddenWithScale);
};

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
            switch (handlerElementId) {
                case SELECTORS.backToHomeButton: {
                    window.location.href = `/index.html`;
                    break;
                }
                case SELECTORS.detailsTabIcon: {
                    setActiveContent(data.index);
                    break;
                }
                case SELECTORS.detailsTabText: {
                    setActiveContent(data.index);
                    break;
                }
                case SELECTORS.projectDetailsCancel: {
                    setActiveView("work", true);
                    break;
                }
                case SELECTORS.imageGalleryLargeViewCancel: {
                    closeImageGalleryLargeView();
                    break;
                }
                default: console.error('Handler element not found -', handlerElementId);
            };
        }
    }
    if (fieldType === 'div') {
        if (eventType === 'click') {
            switch (handlerElementId) {
                case SELECTORS.imageGallerySrc: {
                    setImageGalleryLargeView(data.src);
                    break;
                }
                default: console.error('Handler element not found -', handlerElementId);
            };
        }
    }
};

const setProjectDetailsCancelHandler = () => {
    getElement(SELECTORS.projectDetailsCancel).addEventListener('click', e => {
        setCommonHandler(e.type, 'button', SELECTORS.projectDetailsCancel);
    });
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

    const imageGalleryLargeViewCancel = getElement(SELECTORS.imageGalleryLargeViewCancel);
    imageGalleryLargeViewCancel.addEventListener('click', e => {
        setCommonHandler(e.type, 'button', SELECTORS.imageGalleryLargeViewCancel);
    });

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

                            const data1 = data.split(' ')[0];
                            getTemplateElementChild(largeIconTextBoxTemplateClone, SELECTORS.largeIcon).style.background = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}icons/${data1}.svg') ${CONFIG.IMAGE_FILE_URL_ATTR}`;

                            setTemplateElementText(largeIconTextBoxTemplateClone, SELECTORS.iconText, data);

                            largeIconTextBoxContainer.appendChild(largeIconTextBoxTemplateClone);
                        });
                    }

                    detailsContent.appendChild(largeIconTextBoxContainer);

                    break;
                }
                case 'imageGallery': {
                    const imageGallerySmallView = getElement(SELECTORS.imageGallerySmallView);
                    imageGallerySmallView.classList.remove(CLASSES.hidden);

                    const imageGallerySmallViewTemplate = getElement(SELECTORS.imageGallerySmallViewTemplate);

                    if (isValidArray(section?.content)) {

                        if (section?.content.length > 4) imageGallerySmallView.style.alignItems = 'flex-start';

                        section?.content.forEach(content => {
                            const imageGallerySmallViewTemplateClone = getElementTemplateClone(imageGallerySmallViewTemplate, SELECTORS.imageGallerySmallViewTemplate);

                            const imageGallerySrc = getTemplateElementChild(imageGallerySmallViewTemplateClone, SELECTORS.imageGallerySrc);

                            imageGallerySrc.style.background = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}${content?.src}') ${CONFIG.IMAGE_FILE_URL_ATTR}`;

                            imageGallerySrc.addEventListener('click', e => {
                                setCommonHandler(e.type, 'div', SELECTORS.imageGallerySrc, { src: content?.src });
                            });

                            setTemplateElementText(imageGallerySmallViewTemplateClone, SELECTORS.imageGalleryLabel, content?.label);

                            imageGallerySmallView.appendChild(imageGallerySmallViewTemplateClone);
                        });
                    }

                    detailsContent.appendChild(imageGallerySmallView);

                    break;
                }
                default: null;
            };
            detailsContentContainer.appendChild(detailsContentContainerTemplateClone);
        });
    }
};

export const setProjectDetailsPageData = (projectData) => {
    setProjectDetailsCancelHandler();
    setProjectTitle(projectData?.Title);
    const projectSections = getProjectSections(projectData);
    setProjectTabs(projectSections);
    setProjectContents(projectSections);
    setActiveContent(0);
};