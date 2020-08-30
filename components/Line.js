import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../style';
import Cell from './Cell';

export default function Line({line_}) {
  const [line, setLine] = useState(line_);

  return (
    <View style={styles.line} >
      {line && line.getCells() ? (
        line
          .getCells()
          .map((cell, index) => (
            <Cell
              key={index}
              cell_={cell}
            />
          ))
      ) : (
        <Text>patos</Text>
      )}
    </View>
  );
}
