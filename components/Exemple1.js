import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export default function Exemple1() {
  const titlePosition = useSharedValue(80);

  useEffect(() => {
    titlePosition.value = withTiming(0, {
      duration: 1500,
      easing: Easing.bounce,
    });
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: titlePosition.value}],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles2.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131A" />
      <Animated.Text style={[styles2.title, titleStyle]}>
        fala dev
      </Animated.Text>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13131a',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFF',
  },
});
