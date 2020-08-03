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
    flex: 1,
    width: '100%',
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
    margin: 5,
    borderWidth: 0.1,
    borderColor: '#20232a',
    backgroundColor: '#000',
  },
  cellText: {
    fontSize: 28,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default styles;
