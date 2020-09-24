import React,  { useContext, useState } from 'react';
import styles from '../styles/style';
import { View, Text } from 'react-native';
import Line from './Line';
import BoardContext from '../model/boardContext';

export default function Board() {
    const [board] = useState(useContext(BoardContext));
    console.log(board);
    return (
        <View style={styles.board}>
            {
                // board && board.getLines() > 0
                board.getLines()
                    .map((line, index) => (<Line key={index} line_={line} />))
                    // : <Text>Carregando ... {JSON.stringify(board)}</Text>
            }
        </View>
    );
}
