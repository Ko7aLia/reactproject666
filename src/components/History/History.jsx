import eth from '../../assets/ethereum.svg';
import btc from '../../assets/bitcoin.svg';
import usd from '../../assets/dollar.svg';
import waiting from '../../assets/waiting.svg';
import HistoryBoxes from './HistoryBoxes.jsx';
//import useMousePosition from './HistoryDraggable';

import React, { useState, useEffect, useRef } from 'react';

import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'

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
            <p className="mt-10 flex justify-center text-white opacity-[80%]">История</p>

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

                            <div className="custom_box h-[118px] w-[220px] p-[12px]">

                                <div className="flex gap-[8px] h-[62px] w-[196px]">

                                    <div className="custom_box flex h-[40px] w-[40px] items-center justify-center">
                                      <DragSvgLock>
                                          <img src={eth} className="h-[24px] w-[24px]" alt="eth" />
                                      </DragSvgLock>

                                    </div>

                                        <div className="flex flex-col h-[62px] w-[148px]">

                                            <div className="flex gap-[4px] h-[20px]"> 
                                                <p className="font-bold text-[16px]">0.000399</p> <p className="mt-[6px] font-normal text-[10px] opacity-[40%]">ETH</p>

                                            </div>

                                            <p className="opacity-[30%] mt-[3px] h-auto leading-[11px] font-normal text-[10px] col-span-2 break-all">drdrz444xcsdf99w554efvfgerwqsacx4zcsdcdvbdf8bdx</p>
                                            <p className="font-normal mt-[1px] text-[12px] col-span-2 h-[14px]">29.03.2025</p>

                                        </div>

                                </div>
                                <div className="flex gap-[8px] items-center mt-[10px] h-[20px] w-[196px]">
                                    <div className="flex custom_box items-center justify-center ml-[5px] h-[23px] w-[35px]"><p className="font-normal text-[10px]">14:25</p></div> <p className="font-normal text-[10px] text-[rgb(255,_187,_0)]">Ожидает отправки</p>
                                    
                                </div>

                            </div>

                             <div className="custom_box h-[118px] w-[220px] p-[12px]">

                                <div className="flex gap-[8px] h-[62px] w-[196px]">

                                    <div className="custom_box flex h-[40px] w-[40px] items-center justify-center">
                                      <DragSvgLock>
                                          <img src={btc} className="h-[24px] w-[24px]" alt="btc" />
                                      </DragSvgLock>

                                    </div>

                                        <div className="flex flex-col h-[62px] w-[148px]">

                                            <div className="flex gap-[4px] h-[20px]"> 
                                                <p className="font-bold text-[16px]">0.000000059</p> <p className="mt-[6px] font-normal text-[10px] opacity-[40%]">BTC</p>

                                            </div>

                                            <p className="opacity-[30%] mt-[3px] h-auto leading-[11px] font-normal text-[10px] col-span-2 break-all">drdrz444xcsdf99w554efvfgerwqsacx4zcsdcdvbdf8bdx</p>
                                            <p className="font-normal mt-[1px] text-[12px] col-span-2 h-[14px]">29.03.2025</p>

                                        </div>

                                </div>
                                <div className="flex gap-[8px] items-center mt-[10px] h-[20px] w-[196px]">
                                    <div className="flex custom_box items-center justify-center ml-[5px] h-[23px] w-[35px]"><img src={waiting} alt="waiting"></img></div> <p className="font-normal text-[10px] text-[rgb(255,_187,_0)]">Ожидает подтверждения</p>
                                    
                                </div>

                            </div>

                            <HistoryBoxes />

              </div>

           

        </div>
    </>
  );
}

export default History;