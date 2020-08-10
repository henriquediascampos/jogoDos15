import React, {useRef, useState} from 'react';
import styles from '../style';
import {
  View,
  Text,
  PanResponder,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import MOVE from '../model/EMove';

export default function Cell({cell_, handleUpdateCell}) {
  const [cell, setCell] = useState(cell_);

  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureteste = useAnimatedGestureHandler({
    onStart(eventm, ctx) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
      if (cell.move === MOVE.DOWN && event.translationY > 0) {
        posY.value = ctx.posY + event.translationY;
      } else if (cell.move === MOVE.UP && event.translationY < 0) {
        posY.value = ctx.posY + event.translationY;
      } else if (cell.move === MOVE.LEFT && event.translationX < 0) {
        posX.value = ctx.posX + event.translationX;
      } else if (cell.move === MOVE.RIGHT && event.translationX > 0) {
        posX.value = ctx.posX + event.translationX;
      }
    },
    onEnd() {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: posX.value}, {translateY: posY.value}],
    };
  });

  return (
    <View style={styles.cellContainer}>
      <PanGestureHandler onGestureEvent={onGestureteste}>
        <Animated.View style={[styles.cell, positionStyle]}>
          <Text>{cell.cell}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
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
