import elements from '../utils/domElementRegistry.js';
import setHandler from '../core/initHandler.js';
import { EVENTS, SELECTORS, CLASSES } from '../utils/constants.js';

const incrementPosition = (position) => {
    return (position + 1) < elements.projectSlides.length ? (position + 1) : 0;
};

const decrementPosition = (position) => {
    return (position - 1) >= 0 ? (position - 1) : (elements.projectSlides.length - 1);
};

const getTargetPositions = (position) => {

    const firstSlide = position;
    const secondSlide = incrementPosition(position);
    const thirdSlide = decrementPosition(position);
    return { firstSlide, secondSlide, thirdSlide };
};

const shiftBoxSlidePositions = (position) => {
    const targetPositions = getTargetPositions(position);

    elements.projectSlides.forEach((slide, index) => {
        // remove all boxSlider classes
        slide.classList.remove(CLASSES.slidePosition1);
        slide.classList.remove(CLASSES.slidePosition2);
        slide.classList.remove(CLASSES.slidePosition3);
        slide.classList.remove(CLASSES.sendSlideBackToDeck);
        // set slide position classes
        if (targetPositions.firstSlide === index) {
            slide.classList.add(CLASSES.slidePosition1);
        } else if (targetPositions.secondSlide === index) {
            slide.classList.add(CLASSES.slidePosition2);
        } else if (targetPositions.thirdSlide === index) {
            slide.classList.add(CLASSES.slidePosition3);
        } else {
            // hide remainig slides
            slide.classList.add(CLASSES.sendSlideBackToDeck);
        }
    });
};

const setBoxSliderCardPosition = (position = 0) => {
    if (!elements.projectSlides.length) console.log('No slides present');
    shiftBoxSlidePositions(position);
};

export const initBoxSliderHandlers = () => {
    setHandler(elements.boxSliderLeftNav, EVENTS.CLICK, SELECTORS.SliderLeftNav, { boxSliderLength: elements.projectSlides.length });
    setHandler(elements.boxSliderRightNav, EVENTS.CLICK, SELECTORS.SliderRightNav, { boxSliderLength: elements.projectSlides.length });
};

export default setBoxSliderCardPosition;
