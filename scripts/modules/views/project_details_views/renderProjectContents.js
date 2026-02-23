import { EVENTS, CONFIG, SELECTORS, CLASSES } from '../../utils/constants.js';
import elements from '../../utils/domElementRegistry.js';
import setHandler from '../../core/initHandler.js';
import {
    isArrayDataValid,
    getElement,
    setTemplateElementText,
    setTemplateElementAttribute,
    getElementTemplateClone,
    getTemplateElementChild,
} from '../../utils/utilityScripts.js';

export const setImageGalleryLargeView = (src) => {
    elements.imageGalleryLargeView.classList.remove(CLASSES.hiddenWithScale);
    elements.imageGalleryLargeView.style.background = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}${src}') ${CONFIG.IMAGE_FILE_URL_ATTR}`;
    elements.imageGalleryLargeView.style.backgroundColor = '#000000e4';
};

const setProjectContents = (projectSections) => {

    elements.detailsContentContainer.innerHTML = '';

    setHandler(elements.imageGalleryLargeViewCancel, EVENTS.CLICK, SELECTORS.imageGalleryLargeViewCancel);

    if (projectSections && isArrayDataValid(projectSections)) {
        projectSections.forEach(section => {
            const detailsContentContainerTemplateClone = getElementTemplateClone(elements.detailsContentContainerTemplate, SELECTORS.detailsContentContainerTemplate);

            // set content title
            setTemplateElementText(detailsContentContainerTemplateClone, SELECTORS.detailsTitle, section?.title);

            // set content data
            const detailsContent = getTemplateElementChild(detailsContentContainerTemplateClone, SELECTORS.detailsContent);

            switch (section.type) {
                case 'plainList': {

                    const plainListTemplate = getTemplateElementChild(detailsContentContainerTemplateClone, SELECTORS.plainListTemplate);

                    if (isArrayDataValid(section?.content)) {
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

                    if (isArrayDataValid(section?.content)) {
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

                    if (isArrayDataValid(section?.content)) {

                        if (section?.content.length > 4) imageGallerySmallView.style.alignItems = 'flex-start';

                        section?.content.forEach(content => {
                            const imageGallerySmallViewTemplateClone = getElementTemplateClone(imageGallerySmallViewTemplate, SELECTORS.imageGallerySmallViewTemplate);

                            const imageGallerySrc = getTemplateElementChild(imageGallerySmallViewTemplateClone, SELECTORS.imageGallerySrc);

                            imageGallerySrc.style.background = `url('${CONFIG.IMAGE_FILE_URL_INTERNAL}${content?.src}') ${CONFIG.IMAGE_FILE_URL_ATTR}`;

                            setHandler(imageGallerySrc, EVENTS.CLICK, SELECTORS.imageGallerySrc, { src: content?.src });

                            setTemplateElementText(imageGallerySmallViewTemplateClone, SELECTORS.imageGalleryLabel, content?.label);

                            imageGallerySmallView.appendChild(imageGallerySmallViewTemplateClone);
                        });
                    }
                    detailsContent.appendChild(imageGallerySmallView);
                    break;
                }
                case 'linksView': {

                    const linksViewContrainer = getElement(SELECTORS.linksViewContrainer);
                    linksViewContrainer.classList.remove(CLASSES.hidden);

                    const linksViewTemplate = getElement(SELECTORS.linksViewTemplate);

                    if (isArrayDataValid(section?.content)) {
                        section.content.forEach(content => {
                            const linksViewTemplateClone = getElementTemplateClone(linksViewTemplate, SELECTORS.linksViewTemplate);

                            if (content?.link) setTemplateElementAttribute(linksViewTemplateClone, SELECTORS.linksViewWrapper, 'href', content.link);

                            if (content?.label) setTemplateElementText(linksViewTemplateClone, SELECTORS.linkView, content.label);

                            linksViewContrainer.appendChild(linksViewTemplateClone);
                        });
                    }
                    detailsContent.appendChild(linksViewContrainer);
                    break;
                }
                default: null;
            };
            elements.detailsContentContainer.appendChild(detailsContentContainerTemplateClone);
        });
    }
};

export default setProjectContents;