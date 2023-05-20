import React, {
    FC,
    useEffect,
    useState,
  } from 'react';

import { getDate, parseDateInString } from '../../utils';
import { TEXT_ENUM } from '../../common/enums/popup';
import { IProps } from '../../common/interfaces/popup';
import { ICard, ICardDto } from '../../common/interfaces/card';
  
  const Popup: FC<IProps> = ({
    togglePopup,
    changeValuePopup,
    valuePopup,
    changeCard,
    createCard,
  }) => {
    const { id, title, price, dateFrom, dateTo, count } = valuePopup;
  
    const { todayDate, todayMonth, todayDay } = getDate();
  
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
  
    const closePopup = () => {
      togglePopup();
      changeValuePopup({
        id: '',
        title: '',
        price: null,
        dateFrom: null,
        dateTo: null,
        count: null,
      });
    };
  
    const onClickSave = async () => {
      if (id) {
        await changeCard(valuePopup as ICard);
      } else {
        await createCard(valuePopup as ICardDto);
      }
  
      closePopup();
    };
  
    useEffect(() => {
      if (id) {
        title && price && dateFrom && dateTo && count && setIsFormValid(true);
      } else {
        title &&
          price &&
          dateFrom &&
          dateTo &&
          count &&
          setIsFormValid(true);
      }
    }, [title, price, dateFrom, dateTo, count, id]);
  
    return (
      <article
        className="popup"
        onClick={(e) => e.target === e.currentTarget && closePopup()}
      >
        <form className="popup__form">
          <div className="popup_group">
            <input
              value={title}
              onChange={(e) => changeValuePopup({ title: e.target.value })}
              className="popup__input"
              type="text"
              id="popup__title"
              name="popup__title"
            />
            <label
              htmlFor="popup__title"
              className={
                title
                  ? 'popup__label popup__label-filled'
                  : 'popup__label popup__label-empty'
              }
            >
              {TEXT_ENUM.LABEL_TITLE}
            </label>
          </div>
          <div className="popup_group">
            <input
              value={price || ''}
              onChange={(e) => changeValuePopup({ price: +e.target.value })}
              className="popup__input"
              type="text"
              id="popup__price"
              name="popup__price"
            />
            <label
              htmlFor="popup__price"
              className={
                price
                  ? 'popup__label popup__label-filled'
                  : 'popup__label popup__label-empty'
              }
            >
              {TEXT_ENUM.LABEL_PRICE}
            </label>
          </div>
          <div className="date">
            <p className="date__text">Дата срока годности</p>
            <div className="date__group">
              <div className="date__reverse">
                <input
                  min={`${todayDate.getFullYear() - 1}-${todayMonth}-${todayDay}`}
                  max={`${todayDate.getFullYear()}-${todayMonth}-${todayDay}`}
                  value={parseDateInString(dateFrom)}
                  onChange={(e) =>
                    changeValuePopup({ dateFrom: new Date(e.target.value) })
                  }
                  type="date"
                  className="date__input"
                />
                <p className="date__text">От</p>
              </div>
              <div className="date__reverse">
                <input
                  min={`${todayDate.getFullYear() - 1}-${todayMonth}-${todayDay}`}
                  max={`${todayDate.getFullYear() + 3}-${todayMonth}-${todayDay}`}
                  value={parseDateInString(dateTo)}
                  onChange={(e) =>
                    changeValuePopup({ dateTo: new Date(e.target.value) })
                  }
                  type="date"
                  className="date__input"
                />
                <p className="date__text">До</p>
              </div>
            </div>
          </div>
          <div className="popup_group">
            <input
              value={count || ''}
              onChange={(e) => changeValuePopup({ count: +e.target.value })}
              className="popup__input"
              type="text"
              id="popup__count"
              name="popup__count"
            />
            <label
              htmlFor="popup__count"
              className={
                count
                  ? 'popup__label popup__label-filled'
                  : 'popup__label popup__label-empty'
              }
            >
              {TEXT_ENUM.LABEL_COUNT}
            </label>
          </div>
          {!isFormValid && (
            <p>
              <span style={{ color: 'red' }}>Форма не валидна</span>
            </p>
          )}
          <div className="popup__button_group">
            <button
              disabled={!isFormValid}
              className={
                !isFormValid
                  ? 'popup__button popup__button-isNoValid'
                  : 'popup__button'
              }
              type="button"
              onClick={() => onClickSave()}
            >
              {TEXT_ENUM.SAVE}
            </button>
            <button className="popup__button" type="button" onClick={closePopup}>
              {TEXT_ENUM.CLOSE}
            </button>
          </div>
        </form>
      </article>
    );
  };
  
  export default Popup;
  