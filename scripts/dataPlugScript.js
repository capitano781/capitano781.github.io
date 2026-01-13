'use strict';

import { getElementTemplateClone, 
    setTemplateElementText, 
    getTemplateElementChild, 
    setTemplateElementAttribute, 
    setElementText, 
    getElement, 
    isArrayDataValid 
} from './utilityScripts.js';
import { SELECTORS } from './constants.js';

const setCommonHandler = (eventType, handlerFor, handlerElementId, index) => {
    if (handlerFor === 'button') {
        if (eventType === 'click') {
            window.location.href = `/projectDetails.html?id=${index}`;
        }
    }
};

const setHeaderSectionData = (data) => {
    setElementText(SELECTORS.headerTitle, data?.Header_Title);
    setElementText(SELECTORS.headerDescription, data?.Header_Description);
};

const setProjectSectionData = (Project_Section) => {

    setElementText(SELECTORS.projectTitle, Project_Section?.Title);
    
    const projectGrid = getElement(SELECTORS.projectGrid);
    const projectBoxTemplate = getElement(SELECTORS.projectBox);

    if (isArrayDataValid(Project_Section?.Projects))
        Project_Section?.Projects.forEach((project, index) => {
    
            const projectBoxClone = getElementTemplateClone(projectBoxTemplate, SELECTORS.projectBox);
            setTemplateElementText(projectBoxClone, SELECTORS.projectTitle, project?.Title);
            setTemplateElementText(projectBoxClone, SELECTORS.projectDescText, project?.OnelineDescription);
            setTemplateElementText(projectBoxClone, SELECTORS.projectDetailsIndexPageButton, project?.indexPageButtonLabel);

            projectBoxClone.querySelector(SELECTORS.projectDetailsIndexPageButton).addEventListener('click', (event) => {
                setCommonHandler(event.type, 'button', SELECTORS.projectDetailsIndexPageButton, index);
            });

            projectGrid.appendChild(projectBoxClone);
        });
};

const setAboutmeSectionData = (About_Section) => {
    
    setElementText(SELECTORS.aboutTitle, About_Section?.Title);
    const aboutContent = getElement(SELECTORS.aboutContent);
    const aboutSummeryDescriptionTemplate = getElement(SELECTORS.aboutSummeryDescription);

    if (isArrayDataValid(About_Section?.Descriptions))
        About_Section.Descriptions.forEach((Description) => {

            const aboutSummeryDescriptionTemplateClone = getElementTemplateClone(aboutSummeryDescriptionTemplate, SELECTORS.aboutSummeryDescription);

            setTemplateElementText(aboutSummeryDescriptionTemplateClone, SELECTORS.aboutSummeryDescriptionWrapper, Description.DescriptionPara);

            aboutContent.appendChild(aboutSummeryDescriptionTemplateClone);
    });
};

const setTechSkillSectionData = (Technical_Skills_Section) => {

    setElementText(SELECTORS.techSkillTitle, Technical_Skills_Section?.Title);
    const techSkillContent = getElement(SELECTORS.techSkillContent);
    const skillGroupTemplate = getElement(SELECTORS.skillGroup);

    if (isArrayDataValid(Technical_Skills_Section?.Categories))
        Technical_Skills_Section.Categories.forEach(category => {
            
            const skillGroupTemplateClone = getElementTemplateClone(skillGroupTemplate, SELECTORS.skillGroup);
            setTemplateElementText(skillGroupTemplateClone, SELECTORS.skillCategory, category?.Category);
            
            const skillTags = getTemplateElementChild(skillGroupTemplateClone, SELECTORS.skillTags);
            const skillTagTemplate = getTemplateElementChild(skillGroupTemplateClone, SELECTORS.skillTag);

            if (isArrayDataValid(category?.Descriptions))
                category.Descriptions.forEach(description => {

                    const skillTagTemplateClone = getElementTemplateClone(skillTagTemplate, SELECTORS.skillTag);
                    setTemplateElementText(skillTagTemplateClone, SELECTORS.skillTagWrapper, description);
                    
                    skillTags.appendChild(skillTagTemplateClone);
                });

            techSkillContent.appendChild(skillGroupTemplateClone);
        });
};

const setContactSectionData = (Contact_Section) => {

    setElementText(SELECTORS.contactTitle, Contact_Section?.Title);
    const contactContent = getElement(SELECTORS.contactContent);
    const contactDescriptionTemplate = getElement(SELECTORS.contactDescription);

    if (isArrayDataValid(Contact_Section?.Descriptions))
        Contact_Section.Descriptions.forEach(description => {

            const contactDescriptionTemplateClone = getElementTemplateClone(contactDescriptionTemplate, SELECTORS.contactDescription);
            
            setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactText, description?.text);

            setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactLink, description?.hyperlink_Label_Text);

            setTemplateElementAttribute(contactDescriptionTemplateClone, SELECTORS.contactLink, 'href', description?.link);

            contactContent.appendChild(contactDescriptionTemplateClone);
        });
};

const setCopyRightText = (copyrightText) => {
    setElementText(SELECTORS.copyrightSection, copyrightText);
};

export const setStaticPageData = (data) => {

    setHeaderSectionData(data);

    setProjectSectionData(data?.Project_Section);

    setAboutmeSectionData(data?.About_Section);
    
    setTechSkillSectionData(data?.Technical_Skills_Section);

    setContactSectionData(data?.Contact_Section);
    
    setCopyRightText(data?.Footer_Section?.copyrightText);
};