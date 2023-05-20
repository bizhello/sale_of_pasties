import { ICard } from '../../common/interfaces/card';


class ResForCardDto implements ICard {
  public readonly id!: string;

  public readonly title!: string;

  public readonly price!: number;

  public readonly dateFrom!: Date;

  public readonly dateTo!: Date;

  public readonly count!: number;
}
class ResCardDto {
  public readonly cards!: ResForCardDto[];
}


class ResMessageCardDto {
//   public readonly ['name']!: string;
public readonly name!: string;
}

export { ResCardDto, ResMessageCardDto };