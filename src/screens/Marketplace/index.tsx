import React, {useEffect} from 'react';
import MarketplaceComponent from '../../components/Marketplace';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {
  useIsFocused,
  useNavigationState,
  useTheme,
} from '@react-navigation/native';
import {PRODUCT_LIST, SEARCH} from '../../constants/routeNames';
import {useDispatch} from 'react-redux';
import {setInitial, setTitle} from '../../redux/slice/filterSlice';

type MarketplaceScreenProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Marketplace'>;
};

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({navigation}) => {
  const navigationState = useNavigationState(state => state);
  const previousScreen =
    navigationState.routes[navigationState.index - 1]?.name;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const color = useTheme().colors.customColors;
  useEffect(() => {
    if (isFocused) {
      dispatch(setInitial());
      // console.log('Clear');
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: color.background_bottomNav,
          minHeight: 56,
          maxHeight: 80,
        },
      });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  }, [isFocused]);
  return <MarketplaceComponent navigation={navigation} />;
};

export default MarketplaceScreen;
