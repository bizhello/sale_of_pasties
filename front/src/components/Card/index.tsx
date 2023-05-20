import React, { FC, useMemo } from 'react';

import { dateReverse, parseDateInString } from '../../utils';
import { IProps } from '../../common/interfaces/card';
import { TEXT_ENUM } from '../../common/enums/card';

const Card: FC<IProps> = ({
  togglePopup,
  changeValuePopup,
  card,
  incrementCard,
  decrementCard,
  removeCard,
}) => {
  const { id, title, price, dateFrom, dateTo, count } = card;

  const onChangeCard = () => {
    changeValuePopup({
      ...card,
    });
    togglePopup();
  };

  const isDateValid = useMemo(() => {

    const difference = new Date(dateTo).getTime() - Date.now();

    return !(difference < 550383924);
  }, [dateTo]);

  return (
    <article className={isDateValid ? 'card' : 'card card-isError'}>
      <div className="card__group">
        <h4 className="card__description">{TEXT_ENUM.DESIGNATION}</h4>
        <p className="card__value">{title}</p>
      </div>
      <div className="card__group">
        <h4 className="card__description">{TEXT_ENUM.PRICE}</h4>
        <p className="card__value">{price} руб</p>
      </div>
      <div className="card__group">
        <h4 className="card__description">{TEXT_ENUM.EXPIRATION_DATE}</h4>
        <p className="card__value">
          {dateReverse(parseDateInString(dateFrom))} -{' '}
          {dateReverse(parseDateInString(dateTo))}
        </p>
      </div>
      <div className="card__group">
        <h4 className="card__description">{TEXT_ENUM.COUNT}</h4>
        <p className="card__value">{count} шт</p>
      </div>
      <div className="card__group">
        <button
          className="card__control card__control-plus"
          onClick={() => incrementCard(id)}
        />
        <button
          className="card__control card__control-minus"
          onClick={() => decrementCard(id)}
        />
      </div>
      <div className="card__group">
        <button
          className="card__control card__control-change"
          onClick={() => onChangeCard()}
        />
        <button
          className="card__control card__control-delete"
          onClick={() => removeCard(id)}
        />
      </div>
    </article>
  );
};

export default Card;