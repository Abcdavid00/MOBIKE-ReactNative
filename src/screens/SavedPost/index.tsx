import React, {useEffect} from 'react';
import SavedPostComponent from '../../components/SavedPost';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';
import {SavedPostStackParamList} from '../../navigations/SavedPostNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';

type SavedPostScreenProps = {
  navigation: StackNavigationProp<SavedPostStackParamList, 'SavedPost'>;
};

const SavedPostScreen: React.FC<SavedPostScreenProps> = ({navigation}) => {
  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  useEffect(() => {
    navigation
      .getParent()
      ?.getParent()
      .setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    return () =>
      navigation
        .getParent()
        ?.getParent()
        .setOptions({
          tabBarStyle: {
            backgroundColor: color.background_bottomNav,
            minHeight: 56,
            maxHeight: 80,
          },
        });
  }, [navigation]);
  return <SavedPostComponent navigation={navigation} />;
};

export default SavedPostScreen;
