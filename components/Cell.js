import React, {useState, useContext} from 'react';
import styles from '../style';
import {View, Text} from 'react-native';

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import MOVE from '../model/EMove';
import BoardContext from '../model/boardContext';

const Cell = ({cell_}) => {
  const [cell, setCell] = useState(cell_);
  // const [match, setMatch] = useState(false);
  const board = useContext(BoardContext);

  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const match = useSharedValue(0);
  
  const onGestureteste = useAnimatedGestureHandler({
    onStart(event, ctx) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
      getMatch();
      console.log(match.value);
      if (!match.value) {
        if (cell.move === MOVE.DOWN && event.translationY > 0) {
          posY.value = ctx.posY + event.translationY;
          translationY.value = event.translationY;
        } else if (cell.move === MOVE.UP && event.translationY < 0) {
          translationY.value = event.translationY;
          posY.value = ctx.posY + event.translationY;
        } else if (cell.move === MOVE.LEFT && event.translationX < 0) {
          translationX.value = event.translationX;
          posX.value = ctx.posX + event.translationX;
        } else if (cell.move === MOVE.RIGHT && event.translationX > 0) {
          translationX.value = event.translationX;
          posX.value = ctx.posX + event.translationX;
        }
        checkThisIsMatchPosition(posX.value, posY.value)
      }
    },
    onEnd() {
      if (getMatch()) {
        isMatch()
      } else {
        posX.value = withSpring(0);
        posY.value = withSpring(0);
      }
    },
  });

  function checkThisIsMatchPosition(x, y) {
    board.checkThisIsMatchPosition(cell, x, y);
  }

  function getMatch() {
    const match = board.getMatch();
    if (match) {
      match.value = 1;
    }
  }
  
  function isMatch() {
    board.handleMatch(cell)
  }

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: posX.value}, {translateY: posY.value}],
      zIndex: 99,
      elevation: 99,
    };
  });

  return (
    <View 
      style={styles.cellContainer} 
      onLayout={(e) => board.setLayoutCell(cell, e.nativeEvent)}>
      <PanGestureHandler onGestureEvent={onGestureteste}>
        <Animated.View
          style={[
            cell.cell !== -1 ? styles.cell : styles.cellEmpty,
            positionStyle,
          ]}>
          <Text style={styles.cellText}>{cell.cell}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cell;
