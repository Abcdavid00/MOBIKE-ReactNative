import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SearchComponent from '../../components/Search';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';

type SearchScreenProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Search'>;
};

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor:
            theme == 'light' ? color.background_bottomNav : '#3d4146',
          minHeight: 56,
          maxHeight: 80,
        },
      });
  }, [navigation]);

  return <SearchComponent navigation={navigation} />;
};

export default SearchScreen;
