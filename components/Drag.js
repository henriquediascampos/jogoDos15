import React from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function Drag() {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureteste = useAnimatedGestureHandler({
    onStart(eventm, ctx) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
      posX.value = ctx.posX + event.translationX;
      posY.value = ctx.posY + event.translationY;
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
    <View style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={onGestureteste}>
        <Animated.View
          style={[
            {
              width: 150,
              height: 150,
              backgroundColor: 'red',
            },
            positionStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}
