import ethereum from './assets/ethereum.svg';
import bitcoin from './assets/bitcoin.svg';
import USD from './assets/usd.svg';
//import useMousePosition from './HistoryDraggable';

import React, { useState, useEffect, useRef } from 'react';

import DragSvgLock from './DragSvgLock.jsx'

function History() {

    const [position, setPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState(0);

    const parentRef = useRef(null);
    const draggableRef = useRef(null);

    const [hasBeenDragged, setHasBeenDragged] = useState(false);

    ////центральная позиция перетаскиваемого элемента внутри родительского
    const calculateInitialPosition = () => {
        if (!hasBeenDragged) { // Проверяем, не перемещался ли элемент
            if (window.innerWidth > 800) { 
                if (parentRef.current && draggableRef.current) {

                    const parentWidth = parentRef.current.clientWidth;
                    const draggableWidth = draggableRef.current.clientWidth;
                    const initialPosition = (parentWidth - draggableWidth) / 2;
                    
                    setPosition(initialPosition);
                };
            } else {

                setPosition(0); // На мобильных устройствах начнем с позиции 0

            };
        };
    };
    
    // выравнивание блока истории по мере уменьшения окна
    useEffect(() => {
        calculateInitialPosition();
        window.addEventListener('resize', calculateInitialPosition); 

        return () => {
            window.removeEventListener('resize', calculateInitialPosition);
        };
    }, [hasBeenDragged]); // Обновляйте эффект при изменении вашего нового состояния


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

    //движение блока истории внутри родительского блока
    const handleMouseMove = (event) => {
        if (dragging) {
            const newPosition = event.clientX - offset;
            if (parentRef.current && draggableRef.current) {
                const parentRect = parentRef.current.getBoundingClientRect();
                const draggableRect = draggableRef.current.getBoundingClientRect();

                
                // Ограничение перемещения div в пределах родителя
                const minPosition = 0;
                const maxPosition = parentRect.width - draggableRect.width;
                const draggableRectStartOrEnd = draggableRect.width * (2/3) + 20; // ограничение движения блока, чтобы на экране всегда был первый/последний блок при перемещении вправо/влево окна соответственно
                
                if (window.innerWidth > 800) {

                    if (newPosition >= minPosition && newPosition <= maxPosition) {
                        setPosition(newPosition);
                    };

                }else{

                    if (newPosition >= minPosition - draggableRectStartOrEnd && newPosition <= maxPosition + draggableRectStartOrEnd) {
                        //console.log(newPosition, draggableRect.width, draggableRectStartOrEnd);
                        setPosition(newPosition);
                    };

                };
            };
        };
    };

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
                const draggableRectStartOrEnd = draggableRect.width * (2/3) + 20; // ограничение движения блока, чтобы на экране всегда был первый/последний блок при перемещении вправо/влево окна соответственно
                
                if (window.innerWidth > 800) {

                    if (newPosition >= minPosition && newPosition <= maxPosition) {
                        setPosition(newPosition);
                    };

                }else{

                    if (newPosition >= minPosition - draggableRectStartOrEnd && newPosition <= maxPosition + draggableRectStartOrEnd) {
                        //console.log(newPosition, draggableRect.width, draggableRectStartOrEnd);
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

    React.useEffect(() => {
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
            <p className="mt-10 flex justify-center text-white">История</p>

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

                  className="absolute cursor-grab flex flex-row gap-x-3"
              >

                             <div className="custom_box h-[118px] w-[220px] p-3">

                                  <div className="custom_box flex h-[40px] w-[40px] items-center justify-center">
                                    <DragSvgLock>
                                        <img src={ethereum} className="h-[24px] w-[24px]" alt="ethereum" />
                                    </DragSvgLock>

                                  </div>

                             </div>

                             <div className="custom_box h-[118px] w-[220px] p-3">

                                  <div className="custom_box flex h-[40px] w-[40px] items-center justify-center">
                                    <DragSvgLock>
                                      <img src={bitcoin} className="h-[24px] w-[24px]" alt="bitcoin" />
                                    </DragSvgLock>

                                  </div>

                             </div>

                             <div className="custom_box h-[118px] w-[220px] p-3">

                                  <div className="custom_box flex h-[40px] w-[40px] items-center justify-center">
                                    <DragSvgLock>
                                      <img src={USD} className="h-[24px] w-[24px]" alt="dollar" />
                                    </DragSvgLock>

                                  </div>

                             </div>

              </div>

           

        </div>
    </>
  );
}

export default History;