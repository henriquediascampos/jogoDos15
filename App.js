import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text>JOGO DOS 15</Text>
      </View>
      <View style={styles.content}>
        <Board />
      </View>
    </View>
  );
}

function Board() {
  // const [board, setBoard] = useState([]);

  // useEffect(() => {
  //   let i = 0;
  //   let lines = [];
  //   while (i < n) {
  //     lines = [...lines, {lines: i, cells: []}];
  //   }
  //   setBoard(lines);
  // }, [n]);

  return (
    <View style={styles.board}>
      <Line />
      <Line />
      <Line />
      <Line />
      {/* {board.map((line, index) => (
        <Line key={index} cells={line.length} value={line} />
      ))} */}
    </View>
  );
}

function Line() {
  return (
    <View style={styles.line}>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </View>
  );
}

function Cell() {
  return <View style={styles.cell} />;
}

const styles = StyleSheet.create({
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
    padding: 5,
    borderWidth: 3,
    borderColor: '#20232a',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    minHeight: '14%',
  },
  cell: {
    width: '22%',
    margin: 5,
    borderWidth: 3,
    borderColor: '#20232a',
  },
});
