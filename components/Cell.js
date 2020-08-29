import React, {useRef, useState, useEffect} from 'react';
import styles from '../style';
import {View, Text} from 'react-native';

// import React, {useState, useRef, useEffect} from 'react';
// import {View, Animated, PanResponder, Text} from 'react-native';
// import styles from '../style';
// export default Cell = ({cell_, handleUpdateCell}) => {
//   const [cell, setCell] = useState(cell_);
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderGrant: (evt, gestureState) => {
//       // The gesture has started. Show visual feedback so the user knows
//       // what is happening!
//       // gestureState.d{x,y} will be set to zero now
//       pan.x = gestureState.x0;
//       pan.y = gestureState.y0;
//     },
//     onPanResponderMove: Animated.event([
//       null,
//       {
//         dx: pan.x, // x,y are Animated.Value
//         dy: pan.y,
//       },
//     ]),
//     onPanResponderRelease: (e, gest) => {
//       console.log(gest);
//       // Animated.spring(
//       //   pan, // Auto-multiplexed
//       //   {toValue: {x: 0, y: 0}}, // Back to zero
//       // ).start();
//     },
//     onPanResponderEnd: () => {},
//   });

//   const positionStyle = {
//     transform: [{translateX: pan.x}, {translateY: pan.y}],
//     // zIndex: 99,
//     // elevation: 99,
//   };
//   const [position, setPosition] = useState({});

//   // useEffect(() => {
//   //   Animated.event([
//   //     null,
//   //     {
//   //       dx: pan.x, // x,y are Animated.Value
//   //       dy: pan.y,
//   //     },
//   //   ]);
//   // }, [pan]);

//   return (
//     <Animated.View
//       {...panResponder.panHandlers}
//       // onStartShouldSetResponder={(evt) => true}
//       // onResponderMove={(e) => {
//       //   pan.x = e.nativeEvent.pageX;
//       //   console.log(e.nativeEvent.pageX);
//       // }}
//       onLayout={(e) => {
//         console.log(e.nativeEvent.layout);
//         setPosition(e.nativeEvent.layout);
//       }}
//       style={[
//         cell.cell !== -1 ? styles.cell : styles.cellEmpty,
//         pan.getLayout(),
//         // positionStyle,
//       ]}>
//       <Text style={[styles.cellText, {zIndex: 99, elevation: 99}]}>
//         {cell.cell === -1 ? position.x : ''}
//       </Text>
//     </Animated.View>
//   );
// };

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

const Cell = ({cell_, handleUpdateCell}) => {
  const [cell, setCell] = useState(cell_);
  const [p, setP] = useState({});
  let ref = useRef({});

  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const onGestureteste = useAnimatedGestureHandler({
    onStart(event, ctx) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
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
    },
    onEnd() {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
    },
  });

  // const getP = () => {
  //   if (translationX.value || translationX.value) {
  //     const p_ = {x: p.x, y: p.y};
  //     if (translationX.value) {
  //       p_.x = p.x + translationX.value;
  //     }
  //     console.log(translationY);
  //     if (translationY.value) {
  //       p_.y = p.y + translationY.value;
  //     }
  //     setP(p_);
  //   }
  // };

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: posX.value}, {translateY: posY.value}],
      zIndex: 99,
      elevation: 99,
    };
  });

  function setGest(g) {
    console.log(g);
  }

  return (
    <View style={styles.cellContainer}>
      <PanGestureHandler onGestureEvent={onGestureteste}>
        <Animated.View
          onGestureEvent={(e) => setGest(e)}
          onLayout={(e) => setP(e.nativeEvent)}
          style={[
            cell.cell !== -1 ? styles.cell : styles.cellEmpty,
            positionStyle,
          ]}>
          <Text style={styles.cellText}>{JSON.stringify(ref.current)}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cell;
