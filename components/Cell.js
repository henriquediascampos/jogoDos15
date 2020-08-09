import React, {useRef, useState} from 'react';
import styles from '../style';
import {Animated, View, Text, PanResponder} from 'react-native';

export default function Cell({cell_, handleUpdateCell}) {
  const [cell, setCell] = useState(cell_);

  const [largura, setLargura] = useState(new Animated.Value(70));
  const [altura, setAltura] = useState(new Animated.Value(70));

  Animated.sequence([
    Animated.timing(largura, {
      toValue: 70,
      duration: 800,
      useNativeDriver: false,
    }),
    Animated.timing(altura, {
      toValue: 140,
      duration: 800,
      useNativeDriver: false,
    }),
  ]).start();

  return (
    <Animated.View
      style={[
        styles.cellContainer,
        {
          // backgroundColor: '#94c7f4',
          width: largura,
          height: altura,
        },
      ]}
    />
  );
}

// const elevation = {
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 3,
//   },
//   shadowOpacity: 0.27,
//   shadowRadius: 4.65,
//   elevation: 3,
// };

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
