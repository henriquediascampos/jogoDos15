import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';

import styles from './style';
import Board from './components/Board';
import Cell from './components/Cell';
import Drag from './components/Drag';

export default function exemple1() {
  return (
    <View
      style={styles.body}
      onStartShouldSetResponderCapture={(evt) => {
        console.log(evt.currentTarget);
      }}>
      <View style={styles.header}>
        <Text>JOGO DOS 15</Text>
      </View>
      <View style={styles.content}>
        <Board n={4} />
      </View>
    </View>
  );
}
