import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import styles from './style';
import Board from './components/Board';

export default function App() {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text>JOGO DOS 15</Text>
      </View>
      <View style={styles.content}>
        <Board n={4} />
      </View>
    </SafeAreaView>
  );
}
