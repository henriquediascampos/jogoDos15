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
    width: '90%',
    margin: 5,
    padding: 3,
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    // width: 1,
    // height: 1,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 5
    // elevation: 7,
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    margin: 5,
    borderWidth: 0.8,
  },
  cellContainer: {
    // display: 'flex',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: '#000',
    borderWidth: 1,
    margin: 5,
    padding: 1,
  },
  cell: {
    // display: 'flex',
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
