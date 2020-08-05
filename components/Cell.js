import React, {useRef, useState} from 'react';
import styles from '../style';
import {
  Animated,
  View,
  Text,
  PanResponder,
  Button,
  Pressable,
} from 'react-native';

export default function Cell({cell_, handleUpdateCell}) {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cell, setCell] = useState(cell_);

  const fadeIn = () => {
    console.log('passei');
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  return (
    <Pressable
      style={[styles.cellContainer, {translateX: fadeAnim}]}
      onPress={fadeIn}>
      {/* <Animated.View
        style={[
          styles.cell,
          {
            opacity: fadeAnim,
          },
        ]}
        onPress={fadeIn}>
        <Text>{cell.cell}</Text>
      </Animated.View> */}
    </Pressable>
  );
}

function CellComPanRespoder({cell_, handleUpdateCell}) {
  const [cell, setCell] = useState(cell_);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: true
      ? Animated.event([
          null,
          {
            dx: pan.x,
          },
        ])
      : Animated.event([
          null,
          {
            dy: pan.y,
          },
        ]),
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
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
