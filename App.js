import React, {useState, useEffect} from 'react';
import {View, Text, TouchableHighlight, Slider, StyleSheet} from 'react-native';

export default function App() {
  const [value, setValue] = useState(50);

  function change(value) {
    setValue(parseFloat(value));
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text>JOGO DOS 15</Text>
      </View>
      <View style={styles.content}>

        <Board n={4} />
      </View>
    </View>
  );
}

function Board({n}) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    let i = 0;
    let lines = [];
    while (i < n) {
      lines = [...lines, {line: i, cells: [], n: n}];
      i= i+1;
    }
    setBoard(lines);
  }, [n]);

  return (
    <View style={styles.board}>
      {board.map((line, index) => (<Line key={index} line_={line} />))}
    </View>
  );
}

function Line({line_}) {
  const [line, setLine] = useState({});
  useEffect(() => {
    let i = 0;
    let cells = [];
    let max = line_.line === line_.n -1 ? line_.n -1 : line_.n;
    while (i < max) {
      cells = [...cells, {index: line_.line * line_.n + i + 1}];
      i= i+1;
    }
    setLine({'line': line_.line, cells});
  }, [line_]);

  return (
    <View style={styles.line}>
      {line && line.cells 
        ? line.cells.map((cell, index) => (<Cell key={index} cell={cell} />)) 
        : <Text>patos</Text>}
    </View>
  );
}

function Cell({cell}) {

  function handleTouch(e) {
    // console.log('estou','X: ' + e.nativeEvent.locationX, 'Y: ' +e.nativeEvent.locationY );
    // console.log('fui', e.nativeEvent.touches.lenght ? 
      // ('X: ' +e.nativeEvent.touches[0].locationX, 'Y: '+e.nativeEvent.touches[0].locationY): '');
      console.log(e.nativeEvent);
  }

  return (
    <TouchableHighlight style={styles.cell} key={cell.index} 
      activeOpacity={0.1}
      underlayColor="#45bb29" onPressIn={ e => handleTouch(e)}
      onT
      >
      <Text style={styles.cellText}>{cell.index + ""}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50,
    textAlign: 'center'
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
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    width: '22%',
    margin: 5,
    borderWidth: 3,
    borderColor: '#20232a',
    backgroundColor: '#000',
  },
  cellText: {
    fontSize: 28,
    color: 'red',
    fontWeight: "bold",
  }
});
