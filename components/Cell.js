import React, {useRef, useState} from 'react';
import styles from '../style';
import {View, Text} from 'react-native';

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedRef,
  useDerivedValue,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import MOVE from '../model/EMove';

export default function Cell({cell_, handleUpdateCell}) {
  const [cell, setCell] = useState(cell_);
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureteste = useAnimatedGestureHandler({
    onStart(event, ctx) {
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

  // const aref = useAnimatedRef();
  // if (cell.cell === -1) {
  //   console.log(aref.pageX);
  // }

  // useDerivedValue(() => {
  //   if (cell.cell === -1) {
  //     console.log(aref.current);
  //   }
  // }, []);
  return (
    <View
      style={styles.cellContainer}
      onHandlerStateChange={(event) => {
        if (cell.cell === -1) {
          console.log(event.nativeEvent);
        }
      }}
      // ref={aref}
      // onLayout={(event) => {
      //   if (cell.cell === -1) {
      //     // console.log(event.nativeEvent);
      //   }
      // }}
      // onStartShouldSetResponder={(a) => {
      //   if (cell.cell === -1) {
      //     console.log(a.target);
      //   }
      // }}
    >
      <PanGestureHandler onGestureEvent={onGestureteste}>
        <Animated.View
          style={[
            cell.cell !== -1 ? styles.cell : styles.cellEmpty,
            positionStyle,
          ]}>
          <Text>{cell.cell}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
