import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AddPostComponent from '../../components/AddPost';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';

type AddPostScreenProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'AddPost'>;
};

const AddPostScreen: React.FC<AddPostScreenProps> = ({navigation}) => {
  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent().setOptions({
        tabBarStyle: {
          backgroundColor: color.background_bottomNav,
          minHeight: 56,
          maxHeight: 80,
        },
      });
  }, [navigation]);

  return <AddPostComponent navigation={navigation} />;
};

export default AddPostScreen;

const styles = StyleSheet.create({
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  ImageSections: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
