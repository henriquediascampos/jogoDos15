import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/style';

import BoardContext from '../model/boardContext';
import CellContainer from './CellContainer';

export default function Line({line_}) {
  const [line, setLine] = useState(line_);
  const boardContext = useContext(BoardContext);

  return (
    <View style={styles.line} onLayout={e => boardContext.setLayoutLine(line, e.nativeEvent)}>
      {line && line.getCells() ? (
        line
          .getCells()
          .map((cell, index) => (
            <CellContainer
              key={index}
              initinalValue={cell.cell}
            />
          ))
      ) : (
        <Text>patos</Text>
      )}
    </View>
  );
}
