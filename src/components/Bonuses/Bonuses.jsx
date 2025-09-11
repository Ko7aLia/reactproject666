import React from 'react';

const Bonuses = ({ arrayName }) => {
  const bonusesData = {
    bonusArray1: [10000] 
  };

  const bonus = bonusesData[arrayName];

  return (
    <div>
      {bonus !== undefined ? (
        <div>{bonus.map((bonus, index) => (
            // Используем `toLocaleString` для форматирования числа с пробелами
            <p key={index}>{bonus.toLocaleString('ru-RU')}</p>
          ))}</div>
      ) : (
        <p>Указанный массив не найден.</p>
      )}
    </div>
  );
};

export default Bonuses;