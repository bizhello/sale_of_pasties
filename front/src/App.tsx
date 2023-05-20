import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import SearchInput from './components/SearchInput';
import SelectWithButton from './components/SelectWithButton';

import { SORT_ENUM } from './common/enums/selectWithButton';
import Popup from './components/Popup';
import { ICard, ICardDto, IChangeCard } from './common/interfaces/card';
import CardService from './services/CardService';
import UseCards from './hooks/UseCards';
import UsePopup from './hooks/UsePopup';
import Card from './components/Card';

function App() {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [cards, setCards] = useState<ICard[] | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortedCards, setSortedCards] = useState<SORT_ENUM>(SORT_ENUM.DATE_CREATED_AT);
  const { isOpenPopup, togglePopup } = UsePopup();
  const searchCards = UseCards(searchValue, cards, sortedCards)
  const [valuePopup, setValuePopup] = useState<IChangeCard>({
    id: '',
    title: '',
    price: null,
    dateFrom: null,
    dateTo: null,
    count: null,
  });

  const changeSearchValue = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);
  const changeSortedCards = useCallback((value: SORT_ENUM): void => {
    setSortedCards(value)
  }, [])
  const changeValuePopup = useCallback((value: IChangeCard): void => {
    setValuePopup({ ...valuePopup, ...value })
  }, [valuePopup])
  
  const createCard = useCallback(async (cardDto: ICardDto): Promise<void> => {
    try {
      const newCard: ICard = await CardService.createCard(cardDto);
      setCards([...cards, newCard]);
    } catch (e) {
      toast("Не удалось создать карточку товара!");
    }
  }, [cards])

  const changeCard = useCallback(async (card: ICard): Promise<void> => {
    try {
      const newCard:ICard = await CardService.changeCard(card);
      const indexCard = cards.findIndex(
        (item) => item.id === newCard.id
      );
      const copyCards = cards.slice(0);
      copyCards[indexCard] = card;
      setCards(copyCards)
    } catch (e) {
      toast("Не удалось изменить товар!");
    }
  }, [cards])

  const decrementCard = useCallback(async (idCard: string): Promise<void> => {
    try {
      await CardService.decrementCard(idCard);
      const newCards = cards.map((card) => {
        let newCount = card.count;
        if (card.id === idCard) {
          newCount -= 1;
        }

        return { ...card, count: newCount }
      })

      setCards(newCards || null)
    } catch (e) {
      toast("Не удалось уменьшить кол-во товара!");
    }
  }, [cards])

  const incrementCard = useCallback(async (idCard: string): Promise<void> => {
    try {
      await CardService.incrementCard(idCard);
      const newCards = cards.map((card) => {
        let newCount = card.count;
        if (card.id === idCard) {
          newCount += 1;
        }

        return { ...card, count: newCount }
      })

      setCards(newCards || null)
    } catch (e) {
      toast("Не удалось увеличить кол-во товара!");
    }
  }, [cards])

  const removeCard = useCallback(async (idCard: string): Promise<void> => {
    try {
      await CardService.removeCard(idCard)
      setCards(cards.filter(card => card.id !== idCard))
    } catch {
      toast("Не удалось удалить товара!");
    }
  }, [cards])

  const fetchCards = useCallback(async (): Promise<void> => {
    try {
      setIsLoad(true);
      const dataCards = await CardService.getCards();
      let myCards = dataCards.cards
      const newAr = myCards.map((item) => {
        return ({ ...item, dateFrom: new Date(item.dateFrom), dateTo: new Date(item.dateTo) })
      })
      
      setCards([...cards, ...newAr]);
    } catch (error) {
      toast("Не удалось загрузить товар!");
    } finally {
      setIsLoad(false);
    }
  }, [])
  
  useEffect(() => {
    fetchCards();
  }, [fetchCards])

  return (
    <div className="App">
      <Header />
      <SearchInput changeSearchValue={changeSearchValue} searchValue={searchValue} />
      <SelectWithButton togglePopup={togglePopup} sortedCards={sortedCards} changeSortedCards={changeSortedCards} />
      <TransitionGroup>
          {!isLoad && searchCards && searchCards.map(card => (
            <CSSTransition
              key={card.id}
              timeout={500}
              classNames="card">
              <Card togglePopup={togglePopup} changeValuePopup={changeValuePopup} card={card} incrementCard={incrementCard} decrementCard={decrementCard} removeCard={removeCard} />
            </CSSTransition>
          ))}
      </TransitionGroup>
      {!isLoad && searchCards?.length === 0 && <h2 style={{ margin: '2em' }}>Товар не найден</h2>}
      {isOpenPopup && <Popup togglePopup={togglePopup} changeValuePopup={changeValuePopup} valuePopup={valuePopup} changeCard={changeCard} createCard={createCard} />}
      <ToastContainer />
    </div>
  );
}

export default App;
