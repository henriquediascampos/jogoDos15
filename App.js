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
    let groupCell = cells.splice(0, 4);
    if (groupCell.indexOf(16) > -1) {
      groupCell.splice(groupCell.indexOf(cells.length), 1);
    }
    console.log(groupCell);
    return {line, cells: groupCell};
  });

  return lines;
}

function Board({n}) {
  const [board, setBoard] = useState(createBoard(n));

  // useEffect(() => {
  //   setBoard(createBoard(n));
  // }, [n]);

  return (
    <View style={styles.board}>
      {board.map((line, index) => (
        <Line key={index} line_={line} />
      ))}
    </View>
  );
}

function Line({line_}) {
  const [line, setLine] = useState(line_);
  const pan = useRef(new Animated.ValueXY()).current;
  const [cellline, setCellline] = useState({});

  console.log({pan});

  return (
    <View style={styles.line}>
      {line && line.cells ? (
        line.cells.map((cell, index) => (
          <Cell key={index} cell_={{cell, line: line.line}} />
        ))
      ) : (
        <Text>patos</Text>
      )}
    </View>
  );
}

function Cell({cell_}) {
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
    },
  });

  useEffect(() => {
    const teste = cell;
    teste.pan = pan;
    setCell(teste);
    console.log(cell.pan);
  }, [pan.dx, cell]);

  return (
    <Animated.View
      key={cell}
      style={[pan.getLayout(), styles.cell]}
      {...panResponder.panHandlers}>
      <Text style={styles.cellText}>{cell_.cell + ''}</Text>
    </Animated.View>
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
    width: '100%',
    justifyContent: 'flex-start',
    minHeight: '14%',
    borderWidth: 0.1,
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
    margin: 5,
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
