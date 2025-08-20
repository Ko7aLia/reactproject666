import React, { useState, useEffect, useRef } from 'react';


const DragHistory = ({ parentRef }) => {
    const [position, setPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState(0);
    const draggableRef = useRef(null);

    // Центрирование элемента внутри родительского на начальном этапе
    useEffect(() => {
        if (parentRef.current && draggableRef.current) {
            const parentWidth = parentRef.current.clientWidth;
            const draggableWidth = draggableRef.current.clientWidth;
            const initialPosition = (parentWidth - draggableWidth) / 2;
            setPosition(initialPosition);
        }
    }, [parentRef]);

    // Установка начальной позиции и состояния перетаскивания
    const handleMouseDown = (event) => {
        const currentOffset = event.clientX - position;
        setOffset(currentOffset);
        setDragging(true);
    };

    // Обработка перемещения элемента
    const handleMouseMove = (event) => {
        if (dragging) {
            const newPosition = event.clientX - offset;
            if (parentRef.current && draggableRef.current) {
                const parentRect = parentRef.current.getBoundingClientRect();
                const draggableRect = draggableRef.current.getBoundingClientRect();

                // Ограничение перемещения в пределах родителя
                const minPosition = 0;
                const maxPosition = parentRect.width - draggableRect.width;
                setPosition(Math.min(Math.max(newPosition, minPosition), maxPosition));
            }
        }
    };

    // Завершение перетаскивания
    const handleMouseUp = () => {
        setDragging(false);
    };

    // Присоединение и удаление событий мыши
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, offset]);

    return (
        <div
            ref={draggableRef}
            onMouseDown={handleMouseDown}
            style={{
                position: 'absolute',
                left: `${position}px`,
                cursor: 'grab',
            }}
        >
            {/* Вложенный контент или стилизация элемента */}
        </div>
    );
};

export default DragHistory;