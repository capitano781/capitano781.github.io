import { SELECTORS, EVENTS } from "../utils/constants.js";
import { setElementText } from "../utils/utilityScripts.js";
import setHandler from "../core/initHandler.js";
import elements from "../utils/domElementRegistry.js";

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

    setHandler(elements.headerViewWorkButton, EVENTS.CLICK, SELECTORS.headerViewWorkButton);
};

export default setHeaderSectionData;