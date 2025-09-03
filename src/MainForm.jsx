import usdt from './assets/usdt.svg';
import USD from './assets/usd.svg';
import ethereum from './assets/ethereum.svg';
import bitcoin from './assets/bitcoin.svg';
import './MainForm.css';
import send from './assets/send.svg';

import DragSvgLock from './DragSvgLock.jsx'

import Select from 'react-select'
import { components } from 'react-select';
import { useState } from 'react';


function MainForm() {

  // Кастомный компонент SingleValue для отображения иконки у выбранного элемента
  const CustomSingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={props.data.icon}
            alt={props.data.label}
            style={{ width: 20, height: 20, marginRight: 3,  }}
          />
          {props.data.label}
        </div>
      </components.SingleValue>
    );
  };

  // Кастомный компонент Option для добавления иконки в список значений
  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={props.data.icon}
            alt={props.data.label}
            style={{ width: 20, height: 20, marginRight: 3, }}
          />
          {props.data.label}
        </div>
      </components.Option>
    );
  };

  //// Кастомный компонент для индикатора
  //const DropdownIndicator = props => {
  //  return (
  //    <components.DropdownIndicator {...props}>
  //      <span className={`dropdown-indicator ${props.selectProps.menuIsOpen ? 'rotate' : ''}`}>▼</span>
  //    </components.DropdownIndicator>
  //  );
  //};

  // Кастомизация стиля всего выпадающего списка
  const customStyles = {

    //контейнер для элемента управления вводом
    control: (base, state) => ({
      ...base,

      height: 60,
      width: 116,
      background: "linear-gradient(to bottom, rgb(38,38,38), rgb(64,64,64))",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgb(84,84,84)", //state.isFocused ? "yellow" : "green",  цвет границы в зависимости от состояния
      boxShadow: state.isFocused ? null : null, // убирает странную границу вокруг контейнера
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "&:hover": { // стиль элемента будет меняться при наведении курсора мыши
        borderColor: state.isFocused ? "grey" : "black"
      },

    }),

      ////контейнер для выбранных значений
      //valueContainer: (provided) => ({
      //  ...provided,
      // 
      //  background: "red",
      //  
      //}),

            //отображение одного выбранного значения списка
            singleValue: (provided) => ({
              ...provided,
            
              color: "white",
              display: "flex",
              justifyContent: "center",
              overflow: "visible",
            
            }), 

        //контейнер для индикаторов
        indicatorsContainer: (provided) => ({
          ...provided,
          
          padding: 0,  
          margin: 0,
          
        
        }),
      
            //индикатор выпадающего меню, обычно стрелка
            dropdownIndicator: (provided, state) => ({
              ...provided,

              padding: 0, 
              color: state.isFocused ? "rgb(168, 162, 158)" : "rgb(105, 100, 100)",
              //color: state.isActive ? "blue" : "red",

              
              ':hover': {
                color: 'rgb(168, 162, 158)', // Цвет при наведении мыши
                
              },
              
            
            }),

    //контейнер для выпадающего меню
    menu: base => ({
      ...base,

      background: "rgba(0, 0, 0, 0.4)",
      boxShadow: "7px 7px 10px rgba(0, 0, 0, 0.4), -7px 0px 10px rgba(0, 0, 0, 0.4)",
      marginTop: 0,

    }),

        //список вариантов выбора
        menuList: base => ({
          ...base, 

          padding: 0, // убирает пустое пространство на первом и последнем варианте
          
        }),

            //элемент списка, представляющий вариант выбора
            option: (base, state) => ({
              ...base, 

              background: "linear-gradient(to bottom, rgb(38,38,38), rgb(64,64,64))",
              borderWidth: 1,
              borderColor: "rgb(84,84,84)",
              borderRadius: 10,

              "&:hover": { // переопределяет разные состояния границы
                borderColor: state.isFocused ? "grey" : "black"
              },

            }),
   
  };

  //список
  const options = [

      { value: 'USD', label: 'USD', icon: USD },
      { value: 'USDT', label: 'USDT', icon: usdt },
      { value: 'Bitcoin', label: 'Bitcoin', icon: bitcoin},
      { value: 'Ethereum', label: 'Ethereum', icon: ethereum},

  ];

  //инициализация изначального значения списка и последующего изменения значений
  const [selectedOption, setSelectedOption] = useState(options[0]);


    return (
    <>
            <main className="place-items-center text-white">

                    <p className="adapt flex flex-col font-normal">Возврат бонусов</p>

                    
                <form className="mt-2 grid grid-cols-[116px_240px] gap-3 text-white md:grid-cols-[116px_328px]">

                    <div className="custom_box flex h-[60px] items-center justify-center">

                        <svg className="fill-white pr-1" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4268 1.15357C10.6622 0.679929 11.3378 0.679929 11.5732 1.15356L14.3921 6.82711C14.4853 7.01467 14.6643 7.14477 14.8715 7.17544L21.1385 8.10317C21.6616 8.18061 21.8704 8.8232 21.4927 9.19337L16.9679 13.6275C16.8183 13.7741 16.7499 13.9846 16.7848 14.1911L17.8391 20.4381C17.9271 20.9596 17.3805 21.3567 16.9117 21.1118L11.2963 18.1788C11.1107 18.0818 10.8893 18.0818 10.7037 18.1788L5.08832 21.1118C4.61954 21.3567 4.07292 20.9596 4.16093 20.4381L5.21521 14.1911C5.25006 13.9846 5.18166 13.7741 5.03208 13.6275L0.507314 9.19337C0.12958 8.8232 0.338367 8.18061 0.861542 8.10317L7.1285 7.17544C7.33567 7.14477 7.51474 7.01467 7.60793 6.82711L10.4268 1.15357Z" />
                            
                        </svg>

                     Бонусов
                    </div>

                    <input placeholder="Введите количество бонусов" className="custom_box custom_hover h-[60px] w-full p-2" />

                    
                        
                    <div>    
                        
                        < Select    isSearchable={false}
                                    options={options} //список вариантов значений
                                    value={selectedOption} //первоначальное значение
                                    onChange={setSelectedOption} //замена значения после выбора нового значения из списка
                                    styles={customStyles} //кастомные стили
                                    classNamePrefix="my-select"

                                    //переопределение стандартных компонентов на кастомные
                                    components={{ Option: CustomOption, 
                                                  SingleValue: CustomSingleValue,
                                                  IndicatorSeparator: () => null, //IndicatorSeparator: () => null - обнуление вертикального разделителя
                                                   }}  
                        />
                    </div>
                    

                    <div>

                        <input placeholder="Итоговая сумма" className="custom_box block h-[60px] w-full p-2" />

                    

                    <span className="inline-block pl-2 text-center text-xs text-stone-400">

                     Комиссия будет расчитана после конечной суммы
                     </span>

                    </div>

                  <label className="relative col-span-2">

                        <input placeholder="Номер кошелька" className="custom_box h-[60px] w-full p-2 pr-16" />

                       

                        <button className="absolute top-2 right-2 flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-emerald-500">
                            <DragSvgLock>
                                <img src={send} className="h-4 w-4" alt="send" />
                            </DragSvgLock>
                        </button>

                        

                  </label>

                </form>
                    
            </main>


    </>

  );
}

export default MainForm;