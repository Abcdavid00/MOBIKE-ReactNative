import React, {useEffect} from 'react';
import MarketplaceComponent from '../../components/Marketplace';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useIsFocused, useNavigationState} from '@react-navigation/native';
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
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      dispatch(setInitial());
      console.log('Clear');
    }
  }, [isFocus]);
  return <MarketplaceComponent navigation={navigation} />;
};

export default MarketplaceScreen;
