
const genericDataParsingErrorMessage = 'Data Plug Error';

const isArrayDataValid = (data) => {
    if (data && Array.isArray(data) && data.length > 0) return true;
    return false;
};

const throwElementNullError = (element) => {
    console.warn(`Element ${element} not found!`);
};

const setHeaderSectionData = (data) => {
    const headerTitle = document.getElementById('headerTitle');
    headerTitle.textContent = data?.Header_Title || genericDataParsingErrorMessage;

    const headerDescription = document.getElementById('headerDescription');
    headerDescription.textContent = data?.Header_Description || genericDataParsingErrorMessage;

    if (!headerTitle) throwElementNullError('#headerTitle');
    if (!headerDescription) throwElementNullError('#headerDescription');
};

const setProjectSectionData = (Project_Section) => {
    document.getElementById('projectTitle').textContent = Project_Section?.Title;
    
    const projectGrid = document.getElementById('projectGrid');
    const projectBoxTemplate = document.getElementById('projectBox');

    if (!projectGrid) throwElementNullError('#projectGrid');
    if (!projectBoxTemplate) throwElementNullError('#projectBoxTemplate');

    if (isArrayDataValid(Project_Section?.Projects))
        Project_Section?.Projects.forEach(project => {

            const projectBoxClone = projectBoxTemplate.content.cloneNode(true);
            if (!projectBoxClone) throwElementNullError('projectBoxClone');

            const projectTitle = projectBoxClone.querySelector('#projectTitle');
            projectTitle.textContent = project?.Title || genericDataParsingErrorMessage;
            if (!projectTitle) throwElementNullError('#projectTitle');

            const projectDescText = projectBoxClone.querySelector('#projectDescText');
            projectDescText.textContent = project?.OnelineDescription || genericDataParsingErrorMessage;
            if (!projectDescText) throwElementNullError('#projectDescText');

            const projectDetailsIndexPageButton = projectBoxClone.querySelector('#projectDetailsIndexPageButton');
            projectDetailsIndexPageButton.textContent = project?.indexPageButtonLabel || genericDataParsingErrorMessage;
            if (!projectDetailsIndexPageButton) throwElementNullError('#projectDetailsIndexPageButton');

            projectGrid.appendChild(projectBoxClone);
        });
};

const setAboutmeSectionData = (About_Section) => {
    const aboutTitle = document.getElementById('aboutTitle');
    aboutTitle.textContent = About_Section?.Title || genericDataParsingErrorMessage;
    if (!aboutTitle) throwElementNullError('#aboutTitle');

    const aboutContent = document.getElementById('aboutContent');
    if (!aboutContent) throwElementNullError('#aboutContent');

    const aboutSummeryDescriptionTemplate = document.getElementById('aboutSummeryDescription');
    if (!aboutSummeryDescription) throwElementNullError('#aboutSummeryDescription');

    if (isArrayDataValid(About_Section?.Descriptions))
        About_Section.Descriptions.forEach((Description) => {
            const aboutSummeryDescriptionTemplateClone = aboutSummeryDescriptionTemplate.content.cloneNode(true);
            if (!aboutSummeryDescriptionTemplateClone) throwElementNullError('aboutSummeryDescriptionTemplateClone');

            const aboutSummeryDescriptionWrapper = aboutSummeryDescriptionTemplateClone.querySelector('#aboutSummeryDescriptionWrapper');
            aboutSummeryDescriptionWrapper.textContent = Description.DescriptionPara || genericDataParsingErrorMessage;
            if (!aboutSummeryDescriptionWrapper) throwElementNullError('aboutSummeryDescriptionWrapper');

            aboutContent.appendChild(aboutSummeryDescriptionTemplateClone);
    });
};

const setTechSkillSectionData = (Technical_Skills_Section) => {
    document.getElementById('techSkillTitle').textContent = Technical_Skills_Section?.Title;

    const techSkillContent = document.getElementById('techSkillContent');
    const skillGroupTemplate = document.getElementById('skillGroup');

    if (isArrayDataValid(Technical_Skills_Section?.Categories))
        Technical_Skills_Section.Categories.forEach(category => {
            
            const skillGroupTemplateClone = skillGroupTemplate.content.cloneNode(true);

            skillGroupTemplateClone.querySelector('#skillCategory').textContent = category?.Category || genericDataParsingErrorMessage;

            const skillTags = skillGroupTemplateClone.querySelector('#skillTags');
            const skillTagTemplate = skillGroupTemplateClone.querySelector('#skillTag');

            if (isArrayDataValid(category?.Descriptions))
                category.Descriptions.forEach(description => {
                    const skillTagTemplateClone = skillTagTemplate.content.cloneNode(true);
                    skillTagTemplateClone.querySelector('#skillTagWrapper').textContent = description || genericDataParsingErrorMessage

                    skillTags.appendChild(skillTagTemplateClone);
                });

            techSkillContent.appendChild(skillGroupTemplateClone);
        });
};

const setContactSectionData = (Contact_Section) => {
    document.getElementById('contactTitle').textContent = Contact_Section?.Title;

    const contactContent = document.getElementById('contactContent');
    const contactDescriptionTemplate = document.getElementById('contactDescription');

    if (isArrayDataValid(Contact_Section?.Descriptions))
        Contact_Section.Descriptions.forEach(description => {
            const contactDescriptionTemplateClone = contactDescriptionTemplate.content.cloneNode(true);
            
            contactDescriptionTemplateClone.querySelector('#contactText').textContent = description?.text;

            const contactLink = contactDescriptionTemplateClone.querySelector('#contactLink');

            contactLink.textContent = description?.hyperlink_Label_Text;
            contactLink.setAttribute('href', description?.link);

            contactContent.appendChild(contactDescriptionTemplateClone);
        });
};

const setCopyRightText = (copyrightText) => {
    document.getElementById('copyrightSection').textContent = copyrightText;
};

export const setStaticPageData = (data) => {

    setHeaderSectionData(data);

    setProjectSectionData(data?.Project_Section);

    setAboutmeSectionData(data?.About_Section);
    
    setTechSkillSectionData(data?.Technical_Skills_Section);

    setContactSectionData(data?.Contact_Section);
    
    setCopyRightText(data?.Footer_Section?.copyrightText);
};