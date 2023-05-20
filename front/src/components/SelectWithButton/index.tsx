import React, { FC } from 'react';
import { IProps } from '../../common/interfaces/selectWithButton';
import { SORT_ENUM, TEXT_ENUM } from '../../common/enums/selectWithButton';

const SelectWithButton: FC<IProps> = ({
  togglePopup,
  sortedCards,
  changeSortedCards,
}) => {
  return (
    <section className="selectWithButton">
      <div className="selectWithButton__group selectWithButton__group-left">
        <select
          id="selectWithButton__select"
          className="selectWithButton__select"
          name="selectWithButton__select"
          value={sortedCards}
          onChange={(e) => changeSortedCards(e.target.value as SORT_ENUM)}
        >
          <option disabled>{TEXT_ENUM.CHOOSE_SORT}</option>
          <option value={SORT_ENUM.DATE_CREATED_AT}>{SORT_ENUM.DATE_CREATED_AT}</option>
          <option value={SORT_ENUM.DATE_END}>{SORT_ENUM.DATE_END}</option>
          <option value={SORT_ENUM.DATE_START}>{SORT_ENUM.DATE_START}</option>
        </select>
        <label htmlFor="selectWithButton__select" className="search__label">
          {TEXT_ENUM.CHOOSE_SORT}
        </label>
      </div>
      <div className="selectWithButton__group selectWithButton__group-right">
        <p className="selectInput__text">{TEXT_ENUM.ADD_PRODUCT}</p>
        <button
          className="selectWithButton__button"
          onClick={togglePopup}
        ></button>
      </div>
    </section>
  );
};

export default SelectWithButton;