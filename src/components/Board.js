import React,  { useState } from 'react';
import styles from '../styles/style';
import { View, Text } from 'react-native';
import Line from './Line';


export default function Board({board}) {
    const [lines, setLines] = useState(board.getLines());

    return (
        <View style={styles.board}>
            {
                lines.length > 0
                    ? lines.map((line, index) => (<Line key={index} line_={line} />))
                    : <Text>Carregando ...</Text>
            }
        </View>
    );
}
