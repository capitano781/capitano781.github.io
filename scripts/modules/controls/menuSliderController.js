import elements from '../utils/domElementRegistry.js';
import setHandler from '../core/initHandler.js';
import { EVENTS, SELECTORS } from '../utils/constants.js';

export const setSliderPosition = (targetMenu) => {
    const { offsetLeft } = targetMenu;
    elements.menuSlider.style.left = `${offsetLeft}px`;
};

export const findSliderMenu = (viewId) => {
    elements.mainMenuItems.forEach((menuItem) => {
        if (menuItem?.id?.includes(viewId)) {
            menuItem.classList.add("menuActive");
            setSliderPosition(menuItem);
        } else {
            menuItem.classList.remove("menuActive");
        }
    });
};

const setActiveView = (menuId, setSlider = true) => {
    elements.sectionViews.forEach((view) => {
        if (menuId.includes(view?.id)) {
            view.classList.add("activeSection");
            if (setSlider) findSliderMenu(view?.id);
        } else {
            view.classList.remove("activeSection");
        }
    });
};

export const initMenuSliderHandlers = () => {
    setHandler(elements.hamburgerIcon, EVENTS.CLICK, SELECTORS.hamburgerIcon);

    elements.mainMenuItems.forEach((menuItem) => {
        setHandler(menuItem, EVENTS.CLICK, SELECTORS.menuItem, { menuId: menuItem.id });
    });

    elements.hamburgerMenuItems.forEach((menuItem) => {
        setHandler(menuItem, EVENTS.CLICK, SELECTORS.hamburgerMenuItem, { menuId: menuItem.id });
    });
};

export default setActiveView;