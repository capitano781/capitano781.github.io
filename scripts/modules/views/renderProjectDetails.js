'use strict';

import { getState } from '../../script.js';
import { getApiResponse } from '../core/initApiResponse.js';
import setHandler from '../core/initHandler.js';
import { CLASSES, EVENTS, SELECTORS, STATE_PROPS } from '../utils/constants.js';
import elements from '../utils/domElementRegistry.js';
import {
    setElementText,
    getAllElements,
} from '../utils/utilityScripts.js';
import { isValidArray } from '../utils/validator.js';
import setProjectContents from './project_details_views/renderProjectContents.js';
import setProjectTabs from './project_details_views/renderProjectTabs.js';

const getProjectSections = (projectData) => {
    if (projectData && projectData.sections && isValidArray(projectData?.sections)) {
        return projectData?.sections.filter((section, index) => index < getState(STATE_PROPS.projectSectionsLimit));
    }
};

export const setActiveContent = (index) => {
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

const setProjectDetailsCancelHandler = () => {
    setHandler(elements.projectDetailsCancel, EVENTS.CLICK, SELECTORS.projectDetailsCancel);
};

const setProjectTitle = (value) => {
    setElementText(SELECTORS.projectDetailsHeaderSectionTitle, value);
};

export const setProjectDetailsPageData = (index = 0) => {

    const apiResponse = getApiResponse();
    const projectData = apiResponse?.Project_Section?.Projects[index];

    setProjectDetailsCancelHandler();
    setProjectTitle(projectData?.Title);
    const projectSections = getProjectSections(projectData);
    setProjectTabs(projectSections);
    setProjectContents(projectSections);
    setActiveContent(0);
};