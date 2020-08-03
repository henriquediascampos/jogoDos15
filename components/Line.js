import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../style';
import Cell from './Cell';

export default function Line({line_, handleUpdateLine}) {
  const [line, setLine] = useState(line_);

  function handleUpdateCell(cell_) {
    const newCells = line.cells.reduce((accu, curr) => {
      const newCell = curr.cell === cell_.cell ? cell_ : curr;
      accu = [...accu, newCell];
      return accu;
    }, []);
    setLine({line: line.line, cells: newCells});
    handleUpdateLine(line);
  }

  return (
    <View
      style={styles.line}
      onLayout={(event) => {
        // const layout = event;
        // console.log(layout);
      }}>
      {line && line.cells ? (
        line.cells.map((cell, index) => (
          <Cell key={index} cell_={cell} handleUpdateCell={handleUpdateCell} />
        ))
      ) : (
        <Text>patos</Text>
      )}
    </View>
  );
}
