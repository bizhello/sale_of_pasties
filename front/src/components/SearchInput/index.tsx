import React, { FC } from 'react';
import { TEXT_ENUM } from '../../common/enums/searchInput';
import { IProps } from '../../common/interfaces/searchInput';

const SearchInput: FC<IProps> = ({ searchValue, changeSearchValue }) => {
  return (
    <section className="search">
      <input
        id="searchInput"
        name="search"
        type="search"
        className="search_input"
        placeholder={TEXT_ENUM.INPUT_HOLDER}
        value={searchValue}
        onChange={(e) => changeSearchValue(`${e.target.value}`)}
      />
      <label htmlFor="searchInput" className="search__label">
        {TEXT_ENUM.LABEL}
      </label>
    </section>
  );
};

export default SearchInput;