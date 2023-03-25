import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },

  wrapper: {
    paddingBottom: 50,
    paddingHorizontal: 35,
    justifyContent: 'space-between',
  },

  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 300,
    height: 200,
  },

  boldText: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: 'black',
  },

  form: {
    paddingTop: 10,
  },
});
