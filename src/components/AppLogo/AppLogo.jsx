import {useContext} from 'react';

import mainLogo from '../../assets/logotype.svg'
import star from '../../assets/star.svg'
import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'


import { BonusesContext } from '../../components/Bonuses/Bonuses.jsx';

function MainLogo() {

    //баланс бонусов
    const {bonusesData} = useContext(BonusesContext);

    // Функция для форматирования бонусов
    const getFormattedBonuses = (bonus) => {
        return bonus.toLocaleString('ru-RU');
    };

    // для отображения ТОЛЬКО первого элемента из массива bonusesData
    const formattedBonuses = getFormattedBonuses(bonusesData[0]);



  return (
    <>

      <header className="adapt flex flex-col text-white">

              <DragSvgLock>
                      <img src={mainLogo} className="mt-[20px] mb-[40px] md:mb-[108px]" alt="Main logo" />
              </DragSvgLock>
                      <p className="m-0 p-0 font-normal opacity-[80%]">Ваш баланс:</p>
                      <div className="m-0 p-0 whitespace-nowrap leading-[100px] font-semibold text-[72px] md:text-[128px]">
                        
                        {formattedBonuses}

                      </div>
              <DragSvgLock>
                      <p className="mt-[8px] mb-[56px] flex gap-1 font-medium"> <img src={star} alt="star" />Бонусов</p>
              </DragSvgLock>
      </header>
      

    </>
  )
}

export default MainLogo
