import React, {useEffect} from 'react';
import FiltersPopUpComponent from '../../components/FiltersPopUp';
import {StackNavigationProp} from '@react-navigation/stack';
import {FilterPopUpStackParamList} from '../../navigations/FiltersPopUpNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';

type FilterPopUpScreen = {
  navigation: StackNavigationProp<FilterPopUpStackParamList, 'FiltersPopUp'>;
};

const FiltersPopUpScreen: React.FC<FilterPopUpScreen> = ({navigation}) => {
  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  return <FiltersPopUpComponent navigation={navigation} />;
};

export default FiltersPopUpScreen;
