import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import styles from './styles/style';

import BoardClass from './model/board';
import Board from './components/Board';
import BoardContext from './model/boardContext';
import { Picker } from '@react-native-community/picker';

export default function exemple1() {
    const [n, setN] = useState("4");

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>JOGO DOS 15</Text>
            </View>
            <Picker
                selectedValue={n}
                mode={"dropdown"}
                style={{ height: 50, width: 250 }}
                onValueChange={(itemValue, index) => setN(itemValue)}>
                <Picker.Item label="2 X 2" value="2" />
                <Picker.Item label="3 X 3" value="3" />
                <Picker.Item label="4 X 4" value="4" />
            </Picker>
            <View style={styles.content}>
                <BoardContext.Provider value={new BoardClass(parseInt(n))}>
                    <Board n={parseInt(n)} />
                </BoardContext.Provider>
            </View>
        </SafeAreaView>
    );
}
