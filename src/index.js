import React, { useState } from 'react';
import { View, SafeAreaView, Text, Button } from 'react-native';
import styles from './styles/style';

import BoardClass from './model/board';
import Board from './components/Board';
import BoardContext from './model/boardContext';

export default function exemple1() {
    const [n, setN] =  useState(4);
    const [board, setBoard] =  useState(new BoardClass(n));
    
    const changeN = () => {
        setN(0)
        if (n === 2) {
            setN(3)
        } else if(n === 3) {
            setN(4)
        } else {
            setN(2)
        }
        
        setBoard(new BoardClass(n))
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>JOGO DOS 15</Text>
                {/* <Button title="render" onPress={changeN} style={{margin: 5, width: 200 }}></Button> */}
            </View>
            <View style={styles.content}>
                <BoardContext.Provider value={board}>
                    <Board board={board} />
                </BoardContext.Provider>
            </View>
        </SafeAreaView>
    );
}
