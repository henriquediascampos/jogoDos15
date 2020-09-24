import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/style';
import { View, Text } from 'react-native';
import Line from './Line';
import BoardContext from '../model/boardContext';

export default function Board({ n }) {
    const [board, setBoard] = useState({});
    const boardContext = useContext(BoardContext);

    useEffect(() => {
        setBoard({})
        setTimeout(()=> {
            setBoard(boardContext.newRender(n))
        }, 200);
    }, [n]);

    return (
        <View style={styles.board}>
            {
                board && board.getLines
                    ? board.getLines()
                        .map((line, index) => (<Line key={index} line_={line} />))
                    : <Text>Carregando ...</Text>
            }
        </View>
    );
}
