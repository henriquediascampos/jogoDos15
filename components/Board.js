import React, {useState, useEffect} from 'react';
import styles from '../style';
import {View, Dimensions} from 'react-native';
import Line from './Line';
import cellClass from '../model/cell';
import lineClass from '../model/line';
import board from '../model/board';
import boardClass from '../model/board';

function createSimpleArray(n) {
  return [...Array(n).keys()].map((i) => i + 1);
}

function createBoard(n) {
  let cells = createSimpleArray(n * n);
  cells.sort(() => 0.5 - Math.random());

  cells = cells.map((cell_) => new cellClass(cell_));

  const lines = createSimpleArray(n).map((line_) => {
    let groupCell = cells.splice(0, n);
    return new lineClass(line_, groupCell);
  });
  const b = new board(lines);

  b.setEmptySpace(n);

  return b;
}

export default function Board({n}) {
  const [board, setBoard] = useState(new boardClass());

  useEffect(() => {
    setBoard(createBoard(n));
  }, [n]);

  function handleUpdateLine(newline) {
    // const newBoard = board.reduce((accu, curr) => {
    //   const newLine = curr.line === newline.line ? newline : curr;
    //   accu = [...accu, newLine];
    //   return accu;
    // }, []);
    // setBoard(newBoard);
  }

  return (
    <View style={styles.board}>
      {board.getLines().map((line, index) => (
        <Line key={index} line_={line} handleUpdateLine={handleUpdateLine} />
      ))}
    </View>
  );
}
