import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SearchComponent from '../../components/Search';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';
import { useNavigationState } from '@react-navigation/native';
import { MARKETPLACE } from '../../constants/routeNames';

type SearchScreenProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Search'>;
};

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  const navigationState = useNavigationState(state => state);

  const previousScreen =
    navigationState.routes[navigationState.index - 1]?.name;
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    if (previousScreen == MARKETPLACE) {
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: color.background_bottomNav,
            minHeight: 56,
            maxHeight: 80,
          },
        });
    }
  }, [navigation]);
  return <SearchComponent navigation={navigation} />;
};

export default SearchScreen;
