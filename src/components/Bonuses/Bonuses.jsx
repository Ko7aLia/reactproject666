import React, { createContext, useState} from 'react';

// Создаем контекст
const BonusesContext = createContext();

// Провайдер для контекста
const BonusesProvider = ({ children }) => {
    const [bonusesData, setBonusesData] = useState([10000,2000]);

    

    const updateBonusesData = (newBonus) => {
        setBonusesData([newBonus, ...bonusesData.slice(1)]);
    };

    return (
        <BonusesContext.Provider value={{ bonusesData, updateBonusesData }}>
            {children}
        </BonusesContext.Provider>
    );


    
};

export {BonusesProvider, BonusesContext};
