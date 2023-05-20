import { useMemo } from "react";

import { ICard } from "../common/interfaces/card";
import { SORT_ENUM } from "../common/enums/selectWithButton";

const useSortedCards = (cards: ICard[], sort: SORT_ENUM): ICard[] | [] => {
    console.log(cards)
    const sortCards = useMemo((): ICard[] | [] => {
        if (cards.length > 0) {
            const newCards: ICard[] | [] = Object.assign([], cards);

            switch (sort) {
                case SORT_ENUM.DATE_START:
                    return newCards.sort(
                        (a, b) => a.dateFrom.getTime() - b.dateFrom.getTime()
                    );
                case SORT_ENUM.DATE_END:
                    return newCards.sort(
                        (a, b) => a.dateTo.getTime() - b.dateTo.getTime()
                    );
                default:
                    return cards;
            }
        }

        return [];
    }, [cards, sort]);

    return sortCards;
};

const useCards = (
    searchValue: string,
    cards: ICard[],
    sort: SORT_ENUM
): ICard[] => {
    const sortCards = useSortedCards(cards, sort);

    const searchCards = useMemo((): ICard[] => {
        if (searchValue) {
            return sortCards?.filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return sortCards;
    }, [searchValue, sortCards]);

    return searchCards;
};

export default useCards;
