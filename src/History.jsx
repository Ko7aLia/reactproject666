import ethereum from './assets/ethereum.svg';
import bitcoin from './assets/bitcoin.svg';
import dollar from './assets/dollar.svg';
//import useMousePosition from './HistoryDraggable';

import React, { useState, useEffect, useRef } from 'react';

import DragSvgLock from './DragSvgLock.jsx'

function History() {

    const [position, setPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState(0);

    const parentRef = useRef(null);
    const draggableRef = useRef(null);

    ////центральная позиция перетаскиваемого элемента внутри родительского
    const calculateInitialPosition = () => {
        if (window.innerWidth > 800) { 
            if (parentRef.current && draggableRef.current) {
                const parentWidth = parentRef.current.clientWidth;
                const draggableWidth = draggableRef.current.clientWidth;
                const initialPosition = (parentWidth - draggableWidth) / 2;
                console.log(parentWidth, draggableWidth, initialPosition);
                setPosition(initialPosition);
            };
        } else {
            setPosition(0); // На мобильных устройствах начнем с позиции 0
        };
        
    };
    
    // выравнивание блока истории по мере уменьшения окна
    useEffect(() => {
        calculateInitialPosition();
        window.addEventListener('resize', calculateInitialPosition); 

        return () => {
            window.removeEventListener('resize', calculateInitialPosition);
        };
    }, []);


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
                
                if (window.innerWidth > 800) {
                        if (newPosition >= minPosition && newPosition <= maxPosition) {
                            setPosition(newPosition);
                        };
                }else{
                    setPosition(newPosition);
                };
            };
        };
    };

    const handleTouchMove = (event) => {
        if (dragging) {
            
            const newPosition = touch.clientX - offset;
            setPosition(newPosition);
        }
    };

    // остановка расчета позиции блока истории относительно курсора
    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleTouchEnd = () => {
        setDragging(false);
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

                             <div className="box h-[118px] w-[220px] p-3">

                                  <div className="box flex h-[40px] w-[40px] items-center justify-center">
                                    <DragSvgLock>
                                        <img src={ethereum} className="h-[24px] w-[24px]" alt="ethereum" />
                                    </DragSvgLock>

                                  </div>

                             </div>

                             <div className="box h-[118px] w-[220px] p-3">

                                  <div className="box flex h-[40px] w-[40px] items-center justify-center">
                                    <DragSvgLock>
                                      <img src={bitcoin} className="h-[24px] w-[24px]" alt="bitcoin" />
                                    </DragSvgLock>

                                  </div>

                             </div>

                             <div className="box h-[118px] w-[220px] p-3">

                                  <div className="box flex h-[40px] w-[40px] items-center justify-center">
                                    <DragSvgLock>
                                      <img src={dollar} className="h-[24px] w-[24px]" alt="dollar" />
                                    </DragSvgLock>

                                  </div>

                             </div>

              </div>

           

        </div>
    </>
  );
}

export default History;