import { getApiResponse } from "../core/initApiResponse.js";
import setHeaderSectionData from "./renderHero.js";
import setProjectSectionData from "./renderProjects.js";
import setTechSkillSectionData from "./renderSkills.js";
import setAboutmeSectionData from "./renderAbout.js";
import setContactSectionData from "./renderContact.js";

export const renderView = () => {
  const apiResponse = getApiResponse();
  setHeaderSectionData(apiResponse);
  setProjectSectionData(apiResponse);
  setTechSkillSectionData(apiResponse?.Technical_Skills_Section);
  setAboutmeSectionData(apiResponse?.About_Section);
  setContactSectionData(apiResponse?.Contact_Section);
};
