import React, {useEffect} from 'react';
import ProductListComponent from '../../components/ProductListComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from '@react-navigation/native';
import {MARKETPLACE} from '../../constants/routeNames';

type ProductListProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'ProductList'>;
};

const ProductListScreen: React.FC<ProductListProps> = ({navigation}) => {
  return <ProductListComponent navigation={navigation} />;
};

export default ProductListScreen;
