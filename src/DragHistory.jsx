import React, { useState, useEffect, useRef } from 'react';


const DragHistory = ({ parentRef }) => {
    const [position, setPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState(0);
    const draggableRef = useRef(null);

    // ������������� �������� ������ ������������� �� ��������� �����
    useEffect(() => {
        if (parentRef.current && draggableRef.current) {
            const parentWidth = parentRef.current.clientWidth;
            const draggableWidth = draggableRef.current.clientWidth;
            const initialPosition = (parentWidth - draggableWidth) / 2;
            setPosition(initialPosition);
        }
    }, [parentRef]);

    // ��������� ��������� ������� � ��������� ��������������
    const handleMouseDown = (event) => {
        const currentOffset = event.clientX - position;
        setOffset(currentOffset);
        setDragging(true);
    };

    // ��������� ����������� ��������
    const handleMouseMove = (event) => {
        if (dragging) {
            const newPosition = event.clientX - offset;
            if (parentRef.current && draggableRef.current) {
                const parentRect = parentRef.current.getBoundingClientRect();
                const draggableRect = draggableRef.current.getBoundingClientRect();

                // ����������� ����������� � �������� ��������
                const minPosition = 0;
                const maxPosition = parentRect.width - draggableRect.width;
                setPosition(Math.min(Math.max(newPosition, minPosition), maxPosition));
            }
        }
    };

    // ���������� ��������������
    const handleMouseUp = () => {
        setDragging(false);
    };

    // ������������� � �������� ������� ����
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
            {/* ��������� ������� ��� ���������� �������� */}
        </div>
    );
};

export default DragHistory;