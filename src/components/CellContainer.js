import React, { useState, useContext, useEffect, useCallback } from 'react';
import Cell from './Cell';
import BoardContext from '../model/boardContext';


export default CellContainer = ({ initinalValue }) => {
    const [value, setValue] = useState(initinalValue);
    const forceUpdate = useCallback((cellValue) => {
        setValue(cellValue)
    });
    const board = useContext(BoardContext);
    board.setRenderCell(value, forceUpdate);

    
    return <Cell cell={value} />
};

