'use strict';

/**
 * Validators for portfolio data structure
 * Validates JSON schema and required fields to prevent silent failures
 */

// ============================================
// Core Validators
// ============================================

/**
 * Validates if data is a non-empty array
 * @param {any} data - Data to validate
 * @returns {boolean} True if valid array with items
 */
export const isValidArray = (data) => {
    return Array.isArray(data) && data.length > 0;
};

/**
 * Validates if a value exists and is not empty
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is truthy
 */
export const isValidValue = (value) => {
    return value !== null && value !== undefined && value !== '';
};

// ============================================
// Section Validators
// ============================================

/**
 * Validates Header section structure
 * @param {object} headerData - Header section from JSON
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateHeaderSection = (headerData) => {
    const errors = [];

    if (!headerData) {
        errors.push('Header section is missing');
        return { isValid: false, errors };
    }

    if (!isValidValue(headerData.Header_Title)) {
        errors.push('Header_Title is required and cannot be empty');
    }

    if (!isValidValue(headerData.Header_Description)) {
        errors.push('Header_Description is required and cannot be empty');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates a single project object
 * @param {object} project - Project object
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateProjectObject = (project) => {
    const errors = [];
    const requiredFields = ['Title', 'OnelineDescription', 'indexPageButtonLabel', 'backToHomeButtonLabel'];

    requiredFields.forEach(field => {
        if (!isValidValue(project?.[field])) {
            errors.push(`Project missing required field: ${field}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates Project section structure
 * @param {object} projectSection - Project section from JSON
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateProjectSection = (projectSection) => {
    const errors = [];

    if (!projectSection) {
        errors.push('Project section is missing');
        return { isValid: false, errors };
    }

    if (!isValidValue(projectSection.Title)) {
        errors.push('Project section Title is required');
    }

    if (!isValidArray(projectSection.Projects)) {
        errors.push('Project section must have at least one project');
        return { isValid: false, errors };
    }

    // Validate each project
    projectSection.Projects.forEach((project, index) => {
        const projectValidation = validateProjectObject(project);
        if (!projectValidation.isValid) {
            errors.push(`Project ${index}: ${projectValidation.errors.join(', ')}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates About section structure
 * @param {object} aboutSection - About section from JSON
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateAboutSection = (aboutSection) => {
    const errors = [];

    if (!aboutSection) {
        errors.push('About section is missing');
        return { isValid: false, errors };
    }

    if (!isValidValue(aboutSection.Title)) {
        errors.push('About section Title is required');
    }

    if (!isValidArray(aboutSection.Descriptions)) {
        errors.push('About section must have at least one description');
        return { isValid: false, errors };
    }

    aboutSection.Descriptions.forEach((desc, index) => {
        if (!isValidValue(desc.DescriptionPara)) {
            errors.push(`About description ${index}: DescriptionPara is required`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates Technical Skills section structure
 * @param {object} skillsSection - Technical skills section from JSON
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateTechSkillsSection = (skillsSection) => {
    const errors = [];

    if (!skillsSection) {
        errors.push('Technical Skills section is missing');
        return { isValid: false, errors };
    }

    if (!isValidValue(skillsSection.Title)) {
        errors.push('Technical Skills section Title is required');
    }

    if (!isValidArray(skillsSection.Categories)) {
        errors.push('Technical Skills section must have at least one category');
        return { isValid: false, errors };
    }

    skillsSection.Categories.forEach((category, index) => {
        if (!isValidValue(category.Category)) {
            errors.push(`Skill category ${index}: Category name is required`);
        }

        if (!isValidArray(category.Descriptions)) {
            errors.push(`Skill category ${index}: Must have at least one skill`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates Contact section structure
 * @param {object} contactSection - Contact section from JSON
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateContactSection = (contactSection) => {
    const errors = [];

    if (!contactSection) {
        errors.push('Contact section is missing');
        return { isValid: false, errors };
    }

    if (!isValidValue(contactSection.Title)) {
        errors.push('Contact section Title is required');
    }

    if (!isValidArray(contactSection.Descriptions)) {
        errors.push('Contact section must have at least one description');
        return { isValid: false, errors };
    }

    contactSection.Descriptions.forEach((contact, index) => {
        if (!isValidValue(contact.text)) {
            errors.push(`Contact ${index}: text is required`);
        }

        if (!isValidValue(contact.hyperlink_Label_Text)) {
            errors.push(`Contact ${index}: hyperlink_Label_Text is required`);
        }

        if (!isValidValue(contact.link)) {
            errors.push(`Contact ${index}: link is required`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates Footer section structure
 * @param {object} footerSection - Footer section from JSON
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validateFooterSection = (footerSection) => {
    const errors = [];

    if (!footerSection) {
        errors.push('Footer section is missing');
        return { isValid: false, errors };
    }

    if (!isValidValue(footerSection.copyrightText)) {
        errors.push('Footer copyrightText is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// ============================================
// Main Validator
// ============================================

/**
 * Validates entire portfolio data structure
 * @param {object} data - Complete JSON data from API/file
 * @returns {object} { isValid: boolean, allErrors: string[] }
 */
export const validatePortfolioData = (data) => {
    const allErrors = [];

    if (!data || typeof data !== 'object') {
        return {
            isValid: false,
            allErrors: ['Data is null, undefined, or not an object']
        };
    }

    // Validate all sections
    const headerValidation = validateHeaderSection(data);
    if (!headerValidation.isValid) {
        allErrors.push(...headerValidation.errors);
    }

    const projectValidation = validateProjectSection(data.Project_Section);
    if (!projectValidation.isValid) {
        allErrors.push(...projectValidation.errors);
    }

    const aboutValidation = validateAboutSection(data.About_Section);
    if (!aboutValidation.isValid) {
        allErrors.push(...aboutValidation.errors);
    }

    const skillsValidation = validateTechSkillsSection(data.Technical_Skills_Section);
    if (!skillsValidation.isValid) {
        allErrors.push(...skillsValidation.errors);
    }

    const contactValidation = validateContactSection(data.Contact_Section);
    if (!contactValidation.isValid) {
        allErrors.push(...contactValidation.errors);
    }

    const footerValidation = validateFooterSection(data.Footer_Section);
    if (!footerValidation.isValid) {
        allErrors.push(...footerValidation.errors);
    }

    return {
        isValid: allErrors.length === 0,
        allErrors
    };
};
