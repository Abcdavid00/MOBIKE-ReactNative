import React, {useEffect} from 'react';
import FiltersPopUpComponent from '../../components/FiltersPopUp';
import {StackNavigationProp} from '@react-navigation/stack';
import {FilterPopUpStackParamList} from '../../navigations/FiltersPopUpNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import { MarketplaceStackParamList } from '../../navigations/MarketplaceNavigator';

type FilterPopUpScreen = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'FiltersPopUp'>;
};

const FiltersPopUpScreen: React.FC<FilterPopUpScreen> = ({navigation}) => {
  return <FiltersPopUpComponent navigation={navigation} />;
};

export default FiltersPopUpScreen;
