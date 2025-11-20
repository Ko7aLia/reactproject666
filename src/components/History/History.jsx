import eth from '../../assets/ethereum.svg';
import btc from '../../assets/bitcoin.svg';
import usd from '../../assets/dollar.svg';
import waiting from '../../assets/waiting.svg';
import HistoryBoxes from './HistoryBoxes.jsx';


import React, { useState, useEffect, useRef, useContext } from 'react';

import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'

import { BlocksValueContext } from '../../components/MainForm/MainForm.jsx';

function History() {
    //!!!!!!!!!!!!
    const {blocks, setBlocks} = useContext(BlocksValueContext);

    const [position, setPosition] = useState(0);

    //состояние для определения происходит перетаскивание блоков истории в даннай момент или нет
    const [dragging, setDragging] = useState(false);

    const [offset, setOffset] = useState(0);

    const parentRef = useRef(null);
    const draggableRef = useRef(null);

    const [draggableRectWidth, setDraggableRectWidth] = useState(false);

    //состояние для определения изменения размеров окна браузера для определения начального/центрального положения блоков истории
    const [hasBeenDragged, setHasBeenDragged] = useState(false);



    //центральная позиция перетаскиваемого элемента внутри родительского
    const calculateInitialPosition = () => {

            //получить размер элементов истории операций и их положение относительно viewport
                        const draggableRect = draggableRef.current.getBoundingClientRect();

            console.log("calculate отработал");
        
                //необходимо делать выравнивание элементов по ширине до тех пор, пока размер окна браузера более 800px и при этом размер блоков истории не превышает размер видимой области окна браузера
                if (window.innerWidth > 800 && draggableRect.width <= window.innerWidth) { 

                    if (parentRef.current && draggableRef.current) {

                        //ширина родительского элемента где находятся блоки истории
                        const parentWidth = parentRef.current.clientWidth;

                        

                        const draggableWidth = draggableRef.current.clientWidth;
                        const initialPosition = (parentWidth - draggableWidth)/2;

                        setPosition(initialPosition);

                        setDraggableRectWidth(draggableRect.width);

                        console.log(draggableRectWidth);

                    };

                } else {

                    setPosition(0); // На мобильных устройствах начинает с позиции 0

                };
        
    };
    
    
    const[dragWidth, setDragWidth] = useState(0);

    // выравнивание блока истории по мере уменьшения окна
   useEffect(() => {

       console.log("useEffect отработал");
           
           calculateInitialPosition();
        
           window.addEventListener('resize', calculateInitialPosition); 


               return () => {
                  window.removeEventListener('resize', calculateInitialPosition);
              };
       
   }, [blocks]); // Обновляет эффект при изменении количества блоков историй операций


    //отслеживание изменения позиции курсора, установка перетаскивания
    const handleMouseDown = (event) => {
        const currentOffset = event.clientX - position;
        setOffset(currentOffset);
        setDragging(true);
    };

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        const currentOffset = touch.clientX - position;
        setOffset(currentOffset);
        setDragging(true);
    };






    //движение блока истории внутри родительского блока ДЛЯ МЫШИ
    const handleMouseMove = (event) => {
        if (dragging) {

            //определения координат курсора относительно элемента
            const newPosition = event.clientX - offset;

            if (parentRef.current && draggableRef.current) {

                //получить размер родительского элемента и его положение относительно viewport
                const parentRect = parentRef.current.getBoundingClientRect();

                //получить размер элементов истории операций и их положение относительно viewport
                const draggableRect = draggableRef.current.getBoundingClientRect();

                console.log(draggableRect.width);
                setDragWidth(draggableRect.width);
                console.log(dragWidth);
                
                // Ограничение перемещения div в пределах родителя
                const minPosition = 0;
                const maxPosition = parentRect.width - draggableRect.width;
                
                
                if (window.innerWidth > 800) {

                    if(draggableRect.width >= parentRect.width) {

                        if (newPosition <= minPosition && newPosition >= maxPosition) {
                        
                            setPosition(newPosition);
                        };

                    }else{ 
                        
                        if(newPosition >= minPosition && newPosition <= maxPosition) {

                            setPosition(newPosition);
                        };
                    };

                }else{

                    if (newPosition <= minPosition && newPosition >= maxPosition) {
                        
                        setPosition(newPosition);
                    };

                };
            };
        };
    };
    
    //движение блока истории внутри родительского блока ДЛЯ ТАЧСКРИНА
    const handleTouchMove = (event) => {
        if (dragging) {
            const touch = event.touches[0];
            const newPosition = touch.clientX - offset;
            
            if (parentRef.current && draggableRef.current) {
                const parentRect = parentRef.current.getBoundingClientRect();
                const draggableRect = draggableRef.current.getBoundingClientRect();

                
                // Ограничение перемещения div в пределах родителя
                const minPosition = 0;
                const maxPosition = parentRect.width - draggableRect.width;
                
                
                if (window.innerWidth > 800) {

                     if(draggableRect.width >= parentRect.width) {

                        if (newPosition <= minPosition && newPosition >= maxPosition) {
                        
                            setPosition(newPosition);
                        };

                    }else{ 
                        
                        if(newPosition >= minPosition && newPosition <= maxPosition) {

                            setPosition(newPosition);
                        };
                    };

                }else{

                    if (newPosition <= minPosition && newPosition >= maxPosition) {
                        
                        setPosition(newPosition);
                    };

                };
            };
            
        }
    };


    // остановка расчета позиции блока истории относительно курсора
    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleTouchEnd = () => {
        setDragging(false);
        setHasBeenDragged(true); // Элемент взаимодействовал
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

  return (
      <>
            <p className="mt-10 flex justify-center text-white opacity-[80%]">История транзакций</p>

        <div 
            ref={parentRef}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative mt-2 mb-[31px] h-[118px] md:mb-[83px]">

           
           
              <div
                  ref={draggableRef}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{ 
                      left: position,
                  }}

                  className="text-white absolute cursor-grab flex flex-row gap-x-3"
              >

                            <HistoryBoxes />

              </div>

           

        </div>
    </>
  );
}

export default History;