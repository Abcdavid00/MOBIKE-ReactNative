import React from 'react';
import ProductListComponent from '../../components/ProductListComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';

type ProductListProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'ProductList'>;
};

const ProductList: React.FC<ProductListProps> = ({navigation}) => {
  return <ProductListComponent navigation={navigation} />;
};

export default ProductList;
