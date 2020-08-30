import React, { useState, useEffect, useContext } from 'react';
import styles from '../style';
import { View, Text } from 'react-native';
import Line from './Line';
import BoardContext from "../model/boardContext";
export default function Board({ n }) {
    // const [board, setBoard] = useState(new BoardClass(n));
    const board = useContext(BoardContext);
    // useEffect(() => {
    //     setBoard();
    // }, [n]);

    return (
        <View style={styles.board}>
            {
                board && board.getLines() 
                    ? board.getLines().map((line, index) => (<Line key={index} line_={line}/>))
                    : <Text>Carregando ...</Text>
            }
        </View>
    );
}
