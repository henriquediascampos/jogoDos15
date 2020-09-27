import React, { useState, useContext, useEffect } from 'react';
import styles from '../styles/style';
import { View, Text } from 'react-native';

import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    cancelAnimation,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import MOVE from '../model/EMove';
import BoardContext from '../model/boardContext';


const Cell = ({ cell }) => {
    const [cellValue, setcellValue] = useState(cell)

    const board = useContext(BoardContext);
    const value = useSharedValue(cell);
    const posX = useSharedValue(0);
    const posY = useSharedValue(0);
    const lockMatch = useSharedValue(false);
    const move = useSharedValue("");

    useEffect(() => {

        setcellValue(cell);
        value.value=cell;
    });

    function getMove() {
        move.value = board.getMove(value.value);

    }

    const onGestureteste = useAnimatedGestureHandler({
        onStart(event, ctx) {
            ctx.posX = posX.value;
            ctx.posY = posY.value;
            getMove();
            cancelAnimation({value: 0})
        },
        onActive(event, ctx) {
            getLockMatch();
            if (!lockMatch.value && move) {
                if (move.value === MOVE.UP && event.translationY < 0) {
                    posY.value = ctx.posY + event.translationY;
                } else if (move.value === MOVE.DOWN && event.translationY > 0) {
                    posY.value = ctx.posY + event.translationY;
                } else if (move.value === MOVE.LEFT && event.translationX < 0) {
                    posX.value = ctx.posX + event.translationX;
                } else if (move.value === MOVE.RIGHT && event.translationX > 0) {
                    posX.value = ctx.posX + event.translationX;
                }
                checkThisIsMatchPosition(posX.value, posY.value);
            }
        },
        onFinish() {
            posX.value = withSpring(0);
            posY.value = withSpring(0);
        }
    });

    function checkThisIsMatchPosition(x, y, cancel) {
        board.checkThisIsMatchPosition(value.value, x, y);
    }

    function getLockMatch() {
        lockMatch.value = board.getLockMatch();
    }

    const positionStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: posY.value },
                { translateX: posX.value }
            ],
        };
    });

    return (
        <View
            style={cellValue != -1 ? styles.cellContainer : styles.cellContainerEmpty}
            onLayout={(e) => board.setLayoutCell(value.value, e.nativeEvent)}>
            <PanGestureHandler onGestureEvent={onGestureteste}>
                <Animated.View
                    style={[
                        cellValue != -1 ? styles.cell : styles.cellEmpty,
                        positionStyle,
                    ]}>
                    <Text style={styles.cellText}>{cellValue == -1 ? "patos" : cellValue}</Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default Cell;
