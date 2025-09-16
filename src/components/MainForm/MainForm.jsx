import usdt from '../../assets/tether.svg';
import usd from '../../assets/dollar.svg';
import eth from '../../assets/ethereum.svg';
import btc from '../../assets/bitcoin.svg';
import './MainForm.css';
import sendPlay from '../../assets/send.svg';

import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'

import Select from 'react-select'
import { components } from 'react-select';
import { useState, useRef } from 'react';

import Bonuses from '../../components/Bonuses/Bonuses.jsx';

import { CustomStyles, CustomSingleValue, CustomOption } from './SelectStyles.jsx';



function MainForm() {

  //список select
  const options = [

      { value: 'USD', label: 'USD', icon: usd },
      { value: 'USDT', label: 'USDT', icon: usdt },
      { value: 'BTC', label: 'BTC', icon: btc},
      { value: 'ETH', label: 'ETH', icon: eth},

  ];
  
  //инициализация изначального значения select и последующего изменения значений
  const [selectedOption, setSelectedOption] = useState(options[0]);


  

  const handleChildClick = (event) => {
        event.stopPropagation();
    };
    
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const inputVal = e.target.value;
        // Разрешить вводить только числа (0–9) с помощью регулярного выражения
        const regex = /^[0-9]*$/;
        if (inputVal === '' || regex.test(inputVal)) {
            setInputValue(inputVal);
        };
            // Проверка, является ли значение числом и не превышает ли бонусы
        if (Number(inputVal) >= 10000) {
          setInputValue(10000); 
        };
        
    };

    

const handleButtonClick = (e) => {
  
 e.preventDefault();//убирает стандартную реакцию браузера на перезагрузку после нажатия кнопки

};

  return (
    <>
            <main className="place-items-center text-white">

                    <p className="adapt flex flex-col font-normal opacity-[80%]">Возврат бонусов</p>

                    
                <form className="mt-2 grid grid-cols-[116px_240px] gap-3 text-white md:grid-cols-[116px_328px]">

                    <div className="custom-box flex h-[60px] items-center justify-center">

                        <svg className="fill-white pr-1" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4268 1.15357C10.6622 0.679929 11.3378 0.679929 11.5732 1.15356L14.3921 6.82711C14.4853 7.01467 14.6643 7.14477 14.8715 7.17544L21.1385 8.10317C21.6616 8.18061 21.8704 8.8232 21.4927 9.19337L16.9679 13.6275C16.8183 13.7741 16.7499 13.9846 16.7848 14.1911L17.8391 20.4381C17.9271 20.9596 17.3805 21.3567 16.9117 21.1118L11.2963 18.1788C11.1107 18.0818 10.8893 18.0818 10.7037 18.1788L5.08832 21.1118C4.61954 21.3567 4.07292 20.9596 4.16093 20.4381L5.21521 14.1911C5.25006 13.9846 5.18166 13.7741 5.03208 13.6275L0.507314 9.19337C0.12958 8.8232 0.338367 8.18061 0.861542 8.10317L7.1285 7.17544C7.33567 7.14477 7.51474 7.01467 7.60793 6.82711L10.4268 1.15357Z" />
                            
                        </svg>

                     Бонусов
                    </div>

                    <input placeholder="Введите количество бонусов" 
                           type="text" value={inputValue} 
                           onChange={handleChange} 
                           className="custom-box custom-hover h-[60px] w-full p-2" 
                    />

                    {/*<Bonuses arrayName={defaultArrayName}/>*/}
                        
                    <div>    
                        
                        < Select    
                                    isSearchable={false}
                                    options={options} //список вариантов значений
                                    value={selectedOption} //первоначальное значение
                                    onChange={setSelectedOption} //замена значения после выбора нового значения из списка
                                    styles={CustomStyles} //кастомные стили из import SelectStyles.jsx
                                    classNamePrefix="my-select"

                                    //переопределение стандартных компонентов на кастомные
                                    components={{ Option: CustomOption, 
                                                  SingleValue: CustomSingleValue,
                                                  IndicatorSeparator: () => null, //IndicatorSeparator: () => null - обнуление вертикального разделителя
                                                   }}  
                        />
                    </div>
                    

                    <div>

                        <input placeholder="Итоговая сумма" disabled className="custom-box block h-[60px] w-full p-2" />

                    

                    <span className="inline-block pl-2 text-center text-xs opacity-[30%]">

                     Комиссия будет расчитана после конечной суммы
                     </span>

                    </div>

                  <label className="relative col-span-2">

                        <input placeholder="Номер кошелька" /*value={inputValue} onChange={handleInputChange}*/ className="custom-box custom-hover h-[60px] w-full p-2 pr-16" />

                       

                        <button onMouseEnter={handleChildClick} onClick={handleButtonClick} className="custom-send-button-hover absolute top-2 right-2 flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-[rgb(74,_41,_192)]">
                            <DragSvgLock>
                                <img src={sendPlay} onMouseEnter={handleChildClick} className="h-4 w-4" alt="send" />
                            </DragSvgLock>
                        </button>

                        

                  </label>

                </form>
                    
            </main>
                                                  {/*  {selectedBonusArray && <Bonuses arrayName={selectedBonusArray} />} */}

    </>

  );
}

export default MainForm;