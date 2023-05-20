import { ICardWithId } from "../../interfaces/ICard";
import { IGetCardsRes } from "../../interfaces/IGetCards";

export default class ResGetCardsDto implements IGetCardsRes {
    public readonly cards: ICardWithId[];
}