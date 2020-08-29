import React, {useState} from 'react';
import {View, StatusBar, SafeAreaView, Text, Animated} from 'react-native';

import styles from './style';
import Board from './components/Board';

export default function exemple1() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  let ctx = {};
  function setLayout(nativeEvent) {
    setX(nativeEvent.locationX - ctx.x);
    setY(nativeEvent.locationY - ctx.y);
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text>JOGO DOS 15</Text>
      </View>
      <View style={styles.content}>
        {/* <Board n={4} /> */}
        <Animated.View
          style={[
            {width: 99, height: 99, backgroundColor: 'red'},
            {transform: [{translateX: x}, {translateY: y}]},
          ]}
          onStartShouldSetResponder={(evt) => true}
          // onMoveShouldSetResponder={(evt) => console.log(evt)}
          onResponderGrant={(evt) => {
            ctx.x = evt.nativeEvent.locationX;
            ctx.y = evt.nativeEvent.locationY;
          }}
          onResponderMove={(evt) => setLayout(evt.nativeEvent)}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>oi</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
