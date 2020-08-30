import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView, Text, Animated } from 'react-native';
import styles from './style';

import BoardContext from "./model/boardContext";
import BoardClass from './model/board';
import Board from './components/Board';

export default function exemple1() {
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text>JOGO DOS 15</Text>
            </View>
            <View style={styles.content}>
            <BoardContext.Provider value={new BoardClass(4)} >
                <Board n={4} />
            </BoardContext.Provider>
            </View>
        </View>
    );
}
