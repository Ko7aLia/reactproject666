import { components } from 'react-select';

// Кастомный компонент SingleValue для отображения иконки у выбранного элемента
export const CustomSingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={props.data.icon}
            alt={props.data.label}
            style={{ width: 20, height: 20, marginRight: 5, marginLeft: 4   }}
          />
          {props.data.label}
        </div>
      </components.SingleValue>
    );
  };

// Кастомный компонент Option для добавления иконки в список значений
export const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={props.data.icon}
            alt={props.data.label}
            style={{ width: 20, height: 20, marginRight: 5, }}
          />
          {props.data.label}
        </div>
      </components.Option>
    );
  };



// Кастомизация стиля всего выпадающего списка

export const CustomStyles = {

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

      //контейнер для выбранных значений
      valueContainer: (provided) => ({
        ...provided,
       
        padding: 0,
        margin: 0,
        
      }),

            //отображение одного выбранного значения списка
            singleValue: (provided) => ({
              ...provided,
            
              color: "white",
              display: "flex",
              justifyContent: "center",
              overflow: "visible",

              padding: 0,
              margin: 0,
            
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

              padding: 4, 
              
              color: state.isFocused ? "rgb(168, 162, 158)" : "rgb(105, 100, 100)",
              
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

          borderRadius: 10,
          padding: 0, // убирает пустое пространство на первом и последнем варианте
          
        }),

            //элемент списка, представляющий вариант выбора
            option: (base, state) => ({
              ...base, 

              background: "linear-gradient(to bottom, rgb(38,38,38), rgb(64,64,64))",
              borderWidth: 1,
              borderColor: "rgb(84,84,84)",
              
              

              "&:hover": { // переопределяет разные состояния границы
                borderColor: state.isFocused ? "grey" : "black"
              },

            }),
   
  };