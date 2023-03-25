import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    height: 50,
    //marginVertical: 0,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: '500',
    opacity: 0.5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    color: 'black',
    fontSize: 17,
  },

  rightIcon: {
    paddingVertical: 12,
    paddingEnd: 10,
  },

  iconContainer: {
    paddingVertical: 10,
    paddingStart: 15,
  },
});
