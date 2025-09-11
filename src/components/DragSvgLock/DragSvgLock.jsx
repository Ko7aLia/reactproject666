import React from 'react';

const DragSvgLock = ({ children }) => {
    const handleDragStart = (event) => {
        event.preventDefault();
    };

    return React.Children.map(children, child =>
        React.cloneElement(child, { onDragStart: handleDragStart })
    );
};

export default DragSvgLock;