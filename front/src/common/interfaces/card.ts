interface ICardDto {
    readonly title: string;
    readonly price: number;
    readonly dateFrom: Date;
    readonly dateTo: Date;
    readonly count: number;
  }
  
  interface ICard extends ICardDto {
    readonly id: string;
  }
  
  interface IChangeCard {
    id?: string;
    title?: string;
    price?: number | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
    count?: number | null;
  }

  interface IProps {
    children?: JSX.Element | JSX.Element[];
    togglePopup: () => void;
    changeValuePopup: (value: IChangeCard) => void;
    card: ICard;
    decrementCard: (idCard: string) => Promise<void>;
    incrementCard: (idCard: string) => Promise<void>;
    removeCard: (idCard: string) => Promise<void>;
  }
  
  export type { ICard, ICardDto, IChangeCard , IProps};