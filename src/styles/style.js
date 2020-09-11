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
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#795548',
  },
  textHeader: {
    fontWeight: '400',
    fontSize: 32,
    fontFamily: 'Grandstander-Bold',
    color: '#F5DEB3'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5DEB3',
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
    width: '90%',
    borderWidth: 1,
    borderColor: '#FF4500',

  },
  line: {
    flexDirection: 'row',
    flex: 1,
    width: '100%'
  },
  cellContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: '#FF4500',
    borderWidth: 1
  },
  cellContainerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: '#FFA500',
    borderWidth: 1
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFA500'//'#76c3e2',
  },
  cellEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    flex: 1
  },
  cellText: {
    fontSize: 30,
    fontFamily: 'Grandstander-Light',
  },
});

export default styles;
