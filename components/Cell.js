import React, {useRef, useState} from 'react';
import styles from '../style';
import {Animated, View, Text, PanResponder} from 'react-native';

export default function Cell({cell_, handleUpdateCell}) {
  const [cell, setCell] = useState(cell_);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x,
        dy: pan.y,
      },
    ]),
    onPanResponderGrant: () => {
      pan.setOffset({x: pan.x._value, y: pan.y._value});
    },
    onPanResponderEnd: () => {
      pan.flattenOffset();
      let newCell = cell;
      cell.pan = pan;
      setCell(newCell);
      handleUpdateCell(cell);
    },
    onPanResponderTerminationRequest: () => true,
  });

  // USAR ANIMAÇÕES PARA ESQUERDA DIREITA X E Y

  return (
    <View key={cell} style={styles.cellContainer}>
      <Animated.View
        key={cell}
        style={[pan.getLayout(), styles.cell]}
        {...panResponder.panHandlers}>
        <Text style={styles.cellText}>{cell_.cell + ''}</Text>
      </Animated.View>
    </View>
  );
}
