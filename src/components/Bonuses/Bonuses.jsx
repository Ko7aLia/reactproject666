import React from 'react';
const bonusesData = 10000;


const Bonuses = () => {
  

  const bonus = bonusesData;
  

  return (
    <div>
            {/* Используем `toLocaleString` для форматирования числа с пробелами */}
            <p>{bonus.toLocaleString('ru-RU')}</p>
          
    </div>
  );
};

export default Bonuses;