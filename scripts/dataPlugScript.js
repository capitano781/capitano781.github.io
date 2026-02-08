"use strict";

import {
  getElementTemplateClone,
  setTemplateElementText,
  setElementAttribute,
  getTemplateElementChild,
  setTemplateElementAttribute,
  setElementText,
  getElement,
  isArrayDataValid,
  setActiveView,
} from "./utilityScripts.js";
import { SELECTORS } from "./constants.js";
import { setProjectDetailsPageData } from "./projectDetailsDataPlug.js";

const setCommonHandler = (eventType, handlerFor, handlerElementId, index, data) => {
  if (handlerFor === "button") {
    if (eventType === "click") {
      if (handlerElementId === SELECTORS.projectDetailsIndexPageButton) {

        setProjectDetailsPageData(data?.Project_Section?.Projects[index]);

        setActiveView(SELECTORS.projectDetailsView, false);
        // window.location.href = `/projectDetails.html?id=${index}`;
      }
    }
  }
};

const setHeaderSectionData = (data) => {
  setElementText(
    SELECTORS.headerTitlePart1,
    data?.Header_Title?.Header_Title_Part1
  );
  setElementText(
    SELECTORS.headerTitlePart2,
    data?.Header_Title?.Header_Title_Part2
  );
  setElementText(SELECTORS.headerDescription, data?.Header_Description);
  setElementText(SELECTORS.headerTag, data?.Header_Tag);
  setElementText(
    SELECTORS.headerViewWorkButton,
    data?.Header_ViewWorkButtonLabel
  );

  const headerViewWorkButton = getElement(SELECTORS.headerViewWorkButton);
  headerViewWorkButton.addEventListener("click", () => { });
};

const setProjectSectionData = (data) => {
  setElementText(SELECTORS.projectSectionTitle, data?.Project_Section?.Title);
  setElementText(SELECTORS.projectSectionSecondaryTitle, data?.Project_Section?.Secondary_Title);

  const projectGrid = getElement(SELECTORS.projectGrid);
  const projectBoxTemplate = getElement(SELECTORS.projectBox);

  const getProjectNumber = (index) => {
    if (index < 10) return `0${Number(index) + 1}`;
    return `${Number(index) + 1}`;
  };

  if (isArrayDataValid(data?.Project_Section?.Projects))
    data?.Project_Section?.Projects.forEach((project, index) => {
      const projectBoxClone = getElementTemplateClone(projectBoxTemplate, SELECTORS.projectBox);
      setTemplateElementText(projectBoxClone, SELECTORS.projectTitle, project?.Title);
      setTemplateElementText(projectBoxClone, SELECTORS.projectNumber, getProjectNumber(index));
      setTemplateElementText(projectBoxClone, SELECTORS.projectDescText, project?.OnelineDescription);
      setTemplateElementText(projectBoxClone, SELECTORS.projectDetailsIndexPageButton, project?.indexPageButtonLabel);

      projectBoxClone.querySelector(SELECTORS.projectDetailsIndexPageButton).addEventListener("click", (event) => {
        setTimeout(() => {
          setCommonHandler(event.type, "button", SELECTORS.projectDetailsIndexPageButton, index, data);
        }, 400);
      });

      projectGrid.appendChild(projectBoxClone);
    });
};

const setAboutmeSectionData = (About_Section) => {
  setElementText(SELECTORS.aboutTitle, About_Section?.Title);
  const aboutContent = getElement(SELECTORS.aboutContent);
  const aboutSummeryDescriptionTemplate = getElement(
    SELECTORS.aboutSummeryDescription
  );

  if (isArrayDataValid(About_Section?.Descriptions))
    About_Section.Descriptions.forEach((Description) => {
      const aboutSummeryDescriptionTemplateClone = getElementTemplateClone(
        aboutSummeryDescriptionTemplate,
        SELECTORS.aboutSummeryDescription
      );

      setTemplateElementText(
        aboutSummeryDescriptionTemplateClone,
        SELECTORS.aboutSummeryDescriptionWrapper,
        Description.DescriptionPara
      );

      aboutContent.appendChild(aboutSummeryDescriptionTemplateClone);
    });
};

const setTechSkillSectionData = (Technical_Skills_Section) => {
  setElementText(SELECTORS.techSkillTitle, Technical_Skills_Section?.Title);
  const techSkillContent = getElement(SELECTORS.techSkillContent);
  const skillGroupTemplate = getElement(SELECTORS.skillGroup);

  if (isArrayDataValid(Technical_Skills_Section?.Categories))
    Technical_Skills_Section.Categories.forEach((category) => {
      const skillGroupTemplateClone = getElementTemplateClone(skillGroupTemplate, SELECTORS.skillGroup);
      setTemplateElementText(skillGroupTemplateClone, SELECTORS.skillCategory, category?.Category);

      const skillTags = getTemplateElementChild(skillGroupTemplateClone, SELECTORS.skillTags);
      const skillTagTemplate = getTemplateElementChild(skillGroupTemplateClone, SELECTORS.skillTag);

      if (isArrayDataValid(category?.Descriptions))
        category.Descriptions.forEach((description) => {
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
    Contact_Section.Descriptions.forEach((description) => {
      const contactDescriptionTemplateClone = getElementTemplateClone(contactDescriptionTemplate, SELECTORS.contactDescription);

      setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactText, description?.text
      );

      setTemplateElementText(contactDescriptionTemplateClone, SELECTORS.contactLink, description?.hyperlink_Label_Text);

      setTemplateElementAttribute(contactDescriptionTemplateClone, SELECTORS.contactLink, "href", description?.link);

      contactContent.appendChild(contactDescriptionTemplateClone);
    });
};

const setCopyRightText = (copyrightText) => {
  setElementText(SELECTORS.copyrightSection, copyrightText);
};

export const setStaticPageData = (data) => {
  setHeaderSectionData(data);

  setProjectSectionData(data);

  setAboutmeSectionData(data?.About_Section);

  setTechSkillSectionData(data?.Technical_Skills_Section);

  setContactSectionData(data?.Contact_Section);

  setCopyRightText(data?.Footer_Section?.copyrightText);
};
