import { useCallback, useState } from 'react';
import { IUsePopup } from '../common/interfaces/usePopup';

const UsePopup = (): IUsePopup => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const togglePopup = useCallback(() => {
    setIsOpenPopup((prev) => !prev);
  }, []);

  return { isOpenPopup, togglePopup };
};

export default UsePopup;
