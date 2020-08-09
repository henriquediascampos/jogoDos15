import React from 'react';
import {View, StatusBar} from 'react-native';

import styles from './style';
import Board from './components/Board';
import Cell from './components/Cell';
import Drag from './components/Drag';

export default function exemple1() {
  return (
    <Drag />
    // <SafeAreaView style={styles.body}>
    //   <View style={styles.header}>
    //     <Text>JOGO DOS 15</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Board n={4} />
    //   </View>
    // </SafeAreaView>
  );
}
