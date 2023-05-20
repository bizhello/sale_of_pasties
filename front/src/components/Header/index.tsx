import React, { FC } from 'react';
import { TEXT_ENUM } from '../../common/enums/header'

const Header:FC = ()=> {
  return (
    <header className="header">
        <h2 className="header__title">{TEXT_ENUM.TITLE}</h2>
    </header>
  );
};

export default Header;
