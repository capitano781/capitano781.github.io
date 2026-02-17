"use strict";

import { CONFIG, MESSAGES, SELECTORS } from "./constants.js";

export const isArrayDataValid = (data) => {
  if (data && Array.isArray(data) && data.length > 0) return true;
  return false;
};

export const throwElementNullError = (elementId) => {
  console.error(`${MESSAGES.elementNotFound} - ${elementId}`);
};

export const getElement = (elementId) => {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error(`${MESSAGES.elementNotFound} - ${elementId}`);
    return null;
  }
  return element;
};

export const getAllElements = (elementsId) => {
  const elements = document.querySelectorAll(elementsId);
  if (!elements) {
    console.error(`${MESSAGES.elementsNotFound} - ${elementsId}`);
    return null;
  }
  return elements;
};

export const setElementText = (elementId, textContent) => {
  const element = getElement(elementId);
  if (element) element.textContent = textContent || CONFIG.ERROR_FALLBACK_TEXT;
};

export const setElementAttribute = (elementId, attributeName, value) => {
  const element = getElement(elementId);
  if (element)
    element.setAttribute(attributeName, value || CONFIG.ERROR_FALLBACK_TEXT);
};

export const getElementTemplateClone = (templateElement, templateElementId) => {
  const templateElementClone = templateElement.content.cloneNode(true);
  if (!templateElementClone) {
    console.error(`${MESSAGES.cloneFailed} ${templateElementId}`);
    return null;
  }
  return templateElementClone;
};

export const getTemplateElementChild = (templateElement, childId) => {
  const element = templateElement.querySelector(childId);
  if (!element) {
    throwElementNullError(childId);
    return null;
  }
  return element;
};

export const setTemplateElementText = (
  elementTemplateClone,
  targetId,
  textContent
) => {
  const element = elementTemplateClone.querySelector(targetId);
  if (!element) throwElementNullError(targetId);
  if (element) element.textContent = textContent || CONFIG.ERROR_FALLBACK_TEXT;
};

export const setTemplateElementAttribute = (
  elementTemplateClone,
  targetId,
  attributeName,
  value
) => {
  const element = elementTemplateClone.querySelector(targetId);
  if (!element) throwElementNullError(targetId);
  if (!value) console.error("invalid value for Id", targetId);
  if (element) element.setAttribute(attributeName, value);
};

export const setSliderPosition = (targetMenu) => {
  const menuSlider = getElement(SELECTORS.menuSlider);
  const { offsetLeft } = targetMenu;
  menuSlider.style.left = `${offsetLeft}px`;
};

export const findSliderMenu = (viewId) => {
  const mainMenuItems = getAllElements(SELECTORS.menuItem);
  mainMenuItems.forEach((menuItem) => {
    if (menuItem?.id?.includes(viewId)) {
      menuItem.classList.add("menuActive");
      setSliderPosition(menuItem);
    } else {
      menuItem.classList.remove("menuActive");
    }
  });
};

export const setActiveView = (menuId, setSlider = true) => {
  const sectionViews = getAllElements(SELECTORS.view);
  sectionViews.forEach((view) => {
    if (menuId.includes(view?.id)) {
      view.classList.add("activeSection");
      if (setSlider) findSliderMenu(view?.id);
    } else {
      view.classList.remove("activeSection");
    }
  });
};