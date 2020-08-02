import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Animated,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  PanResponder,
} from 'react-native';

export default function App() {
  const [value, setValue] = useState(50);

  function change(value) {
    setValue(parseFloat(value));
  }

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

function createSimpleArray(n) {
  return [...Array(n).keys()].map((i) => i + 1);
}

function createBoard(n) {
  const cells = createSimpleArray(n * n);
  cells.sort(() => 0.5 - Math.random());

  const lines = createSimpleArray(n).map((line) => {
    let groupCell = cells.splice(0, n);
    if (groupCell.indexOf(16) > -1) {
      groupCell = groupCell.map((e) => (e === n * n ? -1 : e));
    }
    return {line, cells: groupCell};
  });

  return lines;
}

function Board({n}) {
  const [board, setBoard] = useState(createBoard(n));

  useEffect(() => {
    setBoard(createBoard(n));
  }, [n]);

  function handleUpdateLine(newline) {
    //   const newBoard = board.reduce((curr, accu) => {
    //     const newLine = curr.line === newline.line ? newline : curr;
    //     accu = [...accu, newLine];
    //     return accu;
    //   });
    //   setBoard(newBoard);
  }

  return (
    <View style={styles.board}>
      {board.map((line, index) => (
        <Line key={index} line_={line} handleUpdateLine={handleUpdateLine} />
      ))}
    </View>
  );
}

function Line({line_, handleUpdateLine}) {
  const [line, setLine] = useState(line_);

  function handleUpdateCell(cell_) {
    console.log(cell_);
    // const newCells = line.cells.reduce((curr, accu) => {
    //   const newCell = curr.line === cell_.line ? cell_ : curr;
    //   accu = [...accu, newCell];
    //   return accu;
    // });
    // setLine({line: line.line, cells: newCells});
  }

  return (
    <View style={styles.line}>
      {line && line.cells ? (
        line.cells.map((cell, index) => (
          <Cell
            key={index}
            cell_={{cell, line: line.line}}
            handleUpdateCell={handleUpdateCell}
          />
        ))
      ) : (
        <Text>patos</Text>
      )}
    </View>
  );
}

function Cell({cell_, handleUpdateCell}) {
  const [cell, setCell] = useState(cell_);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x,
        dy: pan.y,
      },
    ]),
    onPanResponderGrant: () => {
      pan.setOffset({x: pan.x._value, y: pan.y._value});
    },
    onPanResponderEnd: () => {
      pan.flattenOffset();
      setCell({cell: cell_.cell, pan});
      handleUpdateCell(cell);
    },
    onPanResponderTerminationRequest: () => true,
  });

  return (
    <View key={cell} style={styles.cellContainer}>
      <Animated.View
        key={cell}
        style={[pan.getLayout(), styles.cell]}
        {...panResponder.panHandlers}>
        <Text style={styles.cellText}>{cell_.cell + ''}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  },
  body: {
    flex: 1,
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 5
    // borderWidth: 3,
    // borderColor: '#20232a',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    // width: '100%',
    justifyContent: 'flex-start',
    minHeight: '14%',
    borderWidth: 0.1,
  },
  cellContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 5,
    borderWidth: 0.1,
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // margin: 5,
    borderWidth: 0.1
    // borderColor: #20232a',
    // backgroundColor: '#000',
  },
  cellText: {
    fontSize: 28,
    color: 'red',
    fontWeight: 'bold',
  },
});
