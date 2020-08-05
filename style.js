import {StyleSheet} from 'react-native';

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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
    margin: 5,
    borderWidth: 1,
    padding: 3,
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    margin: 5,
    borderWidth: 0.8,
  },
  cellContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 5,
    padding: 1,
    borderColor: '#000',
    borderWidth: 1,
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'skyblue',
  },
  cellText: {
    fontSize: 28,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default styles;
