import { ICard, ICardDto, IChangeCard } from "./card";

interface IProps {
    valuePopup: IChangeCard;
    togglePopup: () => void;
    changeValuePopup: (value: IChangeCard) => void;
    changeCard: (card: ICard) => Promise<void>;
    createCard: (
        cardDto: ICardDto,
    ) => Promise<void>;
}

export type { IProps };
