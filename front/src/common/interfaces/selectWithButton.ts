import { SORT_ENUM } from "../enums/selectWithButton";

interface IProps {
    sortedCards: SORT_ENUM;
    changeSortedCards: (value: SORT_ENUM) => void;
    togglePopup: () => void;
}

export type { IProps };
