import React, {useState, useEffect} from 'react';
import styles from '../style';
import {View} from 'react-native';
import Line from './Line';

function createSimpleArray(n) {
  return [...Array(n).keys()].map((i) => i + 1);
}

function createBoard(n) {
  const cells = createSimpleArray(n * n);
  cells.sort(() => 0.5 - Math.random());

  const lines = createSimpleArray(n).map((line) => {
    let groupCell = cells.splice(0, n);
    if (groupCell.indexOf(16) > -1) {
      groupCell = groupCell.map((e) => (e === n * n ? -1 : e));
    }
    groupCell = groupCell.map((cell) => ({cell}));
    return {line, cells: groupCell};
  });

  return lines;
}

export default function Board({n}) {
  const [board, setBoard] = useState(createBoard(n));

  useEffect(() => {
    setBoard(createBoard(n));
  }, [n]);

  function handleUpdateLine(newline) {
    const newBoard = board.reduce((accu, curr) => {
      const newLine = curr.line === newline.line ? newline : curr;
      accu = [...accu, newLine];
      return accu;
    }, []);
    setBoard(newBoard);
  }

  return (
    <View style={styles.board}>
      {board.map((line, index) => (
        <Line key={index} line_={line} handleUpdateLine={handleUpdateLine} />
      ))}
    </View>
  );
}
