import usdt from '../../assets/tether.svg';
import usd from '../../assets/dollar.svg';
import eth from '../../assets/ethereum.svg';
import btc from '../../assets/bitcoin.svg';
import './MainForm.css';
import sendPlay from '../../assets/send.svg';

import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'

import Select from 'react-select'

import { useState, useEffect, useContext, createContext } from 'react';

import clsx from 'clsx';

import { CustomStyles, CustomSingleValue, CustomOption } from './SelectStyles.jsx';

import { BonusesContext } from '../../components/Bonuses/Bonuses.jsx';
//import { InputValueContext } from '../../components/MainForm/InputContext.jsx';

export const BlocksValueContext = createContext();

export function BlocksValueProvider ({children}) {


    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

//!!!!!!!!!!!!!!!!!!
    const [blocks, setBlocks] = useState([]);

    return (
    <BlocksValueContext.Provider
    value={{ 
        blocks, setBlocks,
        formattedTime
        }}>
      {children}
    </BlocksValueContext.Provider>
  );

};

export const InputValueContext = createContext();

export function InputValueProvider({ children }) {

    //список select
  const options = [

      { value: 'USD', label: 'USD', icon: usd },
      { value: 'USDT', label: 'USDT', icon: usdt },
      { value: 'BTC', label: 'BTC', icon: btc},
      { value: 'ETH', label: 'ETH', icon: eth},

  ];

  const [finalSum, setFinalSum] = useState('');
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <InputValueContext.Provider 
    value={{ 
        finalSum, setFinalSum, 
        selectedOption, setSelectedOption
        }}>
      {children}
    </InputValueContext.Provider>
  );
};

function MainForm() {

  //баланс бонусов
  const {bonusesData} = useContext(BonusesContext);

  const {updateBonusesData} = useContext(BonusesContext);
    
  //список select
  const options = [

      { value: 'USD', label: 'USD', icon: usd },
      { value: 'USDT', label: 'USDT', icon: usdt },
      { value: 'BTC', label: 'BTC', icon: btc},
      { value: 'ETH', label: 'ETH', icon: eth},

  ];

//предотвращает дальнейшее распространение события?
  //const handleChildClick = (event) => {
  //      event.stopPropagation();
  //  };
  
  //значения select
  const {selectedOption, setSelectedOption} = useContext(InputValueContext);
  
  //желаемое количество бонусов для списания
  const [inputValue, setInputValue] = useState('');
  
  //итоговая сумма
  const {finalSum, setFinalSum} = useContext(InputValueContext);

  //комиссия
  const [commission, setCommission] = useState('');

  //возвращаемая сумма после комиссии
  const [returnSum, setReturnSum] = useState('');

  //номер кошелька
  const [wallet, setWallet] = useState('');

    //функция фиксации значений номера кошелька
    const walletChange = (e) =>{

        const newValue = e.target.value;
          //номер кошелька
        setWallet(newValue);

          //берет значение кошелька для проверки на заполненность поля
        setField2(e.target.value);
    };

    

    //ввод значений в поле списания бонусов
    const handleChange = (e) => {

        //само вводимое число
        const newValue = e.target.value;

        //регулярное выражение
        const regex = /^[0-9]*$/;

            // Разрешить вводить только числа (0–9) с помощью регулярного выражения
            if (regex.test(newValue)) {
                
                // Проверка, превышает ли вводимое значение колличество бонусов аккаунта
                if (newValue <= bonusesData[0]) {

                    setInputValue(newValue);
                
                }else{

                    setInputValue(bonusesData[0]);

                };
                
            };

        //берет значение бонусов для проверки на заполненность поля
        setField1(e.target.value);
            
    };

    //выполнение расчета итоговой суммы, отображение актуальных значений
    useEffect(() => {

        //курс
        let rate = 0;

        //знаки после запятой для каждой валюты
        let rounding = 0;

        //комиссия сервиса 10%
        let comm = 10;

        //проверка оставляет placeholder у итоговой суммы и не отображает 0.00
        if(inputValue){

            //фейковый курс валют
            switch (selectedOption.value) {
                
                case 'USD' :
                    
                    rate = 10;
                    rounding = 2;
                   
                break;

                case 'USDT' : 

                    rate = 79.8;
                    rounding = 6;
                    
                break;

                case 'BTC' : 

                    rate = 8906231;
                    rounding = 8;

                break;

                case 'ETH' : 

                    rate = 351934;
                    rounding = 18;

                break;

            };

            // расчёт итоговой суммы
            const result = inputValue / rate;
            setFinalSum(result.toFixed(rounding));

            //расчёт комиссии
            const resultComm = result.toFixed(rounding) / comm;

            const returnSum = result.toFixed(rounding) - resultComm.toFixed(rounding);

            
            setCommission(`Комиссия: ${resultComm.toFixed(rounding)} ${selectedOption.value}`);
            setReturnSum(`К возврату: ${returnSum.toFixed(rounding)} ${selectedOption.value}`);
            

        } else {setFinalSum(''), 
                setCommission(`Комиссия будет расчитана после конечной суммы`),
                setReturnSum('')};


    }, [inputValue, selectedOption])


    //значение бонусов
  const [field1, setField1] = useState('');

    //значение номера кошелька
  const [field2, setField2] = useState('');

    //ЗАЧЕМ?!!!!!!!!!!!!!!
  const [fieldErrors, setFieldErrors] = useState({ field1: false, field2: false });
 
    //значение для активации 1 части анимации для незаполненного поля
  const [buttonAnimErr, setButtonAnimErr] = useState(false);

    //значение для активации 2 части анимации для незаполненного поля
  const [buttonAnimError, setButtonAnimError] = useState(false);

    //значение для активации 1 части анимации для заполненного поля
  const [buttonAnimOk, setButtonAnimOk] = useState(false);

    //значение для активации 2 части анимации для заполненного поля
  const [buttonAnimSuccess, setButtonAnimSuccess] = useState(false);



   


  
    //незаполненность полей (конкретнее)!!!!!!!!!!!!
  const errors = {
      field1: !field1,
      field2: !field2,
    };



//!!!!!!!!!!!!!!!!!!
  const {blocks, setBlocks} = useContext(BlocksValueContext);
    
    //для кнопки отправки данных, когда поля заполнены
  const handleButtonClick = (e) => {

    //убирает стандартную реакцию браузера на перезагрузку после нажатия кнопки
    e.preventDefault();
    
        if (!errors.field1 && !errors.field2){
        
        
          // Добавить новый блок с введённым значением в список истории
          setBlocks([...blocks, finalSum]);
        
          // списывает бонусы с баланса
          updateBonusesData(bonusesData[0] - inputValue);

        };

  };




    //обработчик курсора в момент наведения на кнопку
  const handleMouseEnter = () => {

        //проверка, заполнены поля или нет
      setFieldErrors(errors);

          //проверка на незаполненность полей и применение соответствующих стилей для начала анимации
        if (errors.field1 || errors.field2) {

          setButtonAnimErr(true);
          setButtonAnimError(false);

        } else {

          setButtonAnimOk(true);
          setButtonAnimSuccess(false);

        };

  };

    //обработчик курсора в момент выхода из поля кнопки
  const handleAnimationLeave = () => {
      //обнуление анимаций
      setButtonAnimError(false);
      setButtonAnimSuccess(false);
        
      
  };

    //обработчик после проигрывания анимаций, обнуление анимаций
  const handleAnimationEnd = () => {

        //проверка на незаполненность полей и применение соответсвующих стилей для окончания анимации
      if(errors.field1 || errors.field2) {
      
        setButtonAnimErr(false);
        setButtonAnimError(true);
        
      } else {
      
        setButtonAnimOk(false);
        setButtonAnimSuccess(true);
        
      };
  
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
                           style={{ borderColor: fieldErrors.field1 ? 'red' : 'rgb(84,84,84)' }}
                           className="custom-box custom-hover h-[60px] w-full p-2" 
                    />

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
                    

                    <div className="flex flex-col">

                        <input placeholder="Итоговая сумма" value={finalSum} disabled className="custom-box block h-[60px] w-full p-2" />

                    

                        <span className="flex flex-row pt-[8px] pb-[12px] text-[12px] opacity-[30%] text-center">

                            <p className="pr-[16px]">{commission}</p>  <p>{returnSum}</p>
                                                   
                        </span>

                    </div>

                    <label className="relative col-span-2">

                          <input placeholder="Номер кошелька" onChange={walletChange} 
                                                              style={{ borderColor: fieldErrors.field2 ? 'red' : 'rgb(84,84,84)' }}
                                                              className="custom-box custom-hover h-[60px] w-full p-2 pr-16" />

                                                   

                          <button onClick={handleButtonClick} 
                                  onMouseEnter={handleMouseEnter} 
                                  onMouseLeave={handleAnimationLeave} 
                                  onAnimationEnd={handleAnimationEnd} 

                                  className={clsx("absolute top-2 right-2 flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-[rgb(74,_41,_192)]",
                                  {"custom-send-button-hover-err": buttonAnimErr},
                                  {"custom-send-button-hover-ok": buttonAnimOk},
                                  {"custom-send-button-hover-error": buttonAnimError},
                                  {"custom-send-button-hover-success": buttonAnimSuccess},
                                  
                                  )}>
                              
                              <DragSvgLock>
                                  <img src={sendPlay} className="h-4 w-4 mt-[1px] ml-[1px] origin-center" alt="send" />
                              </DragSvgLock>
                          </button>

                                                   
                    </label>

                </form>


                    
            </main>                          

    </>

  );
}


export default MainForm;