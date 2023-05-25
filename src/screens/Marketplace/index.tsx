import React from 'react';
import MarketplaceComponent from '../../components/Marketplace';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';

type MarketplaceScreenProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Marketplace'>;
};

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({navigation}) => {
  return <MarketplaceComponent navigation={navigation} />;
};

export default MarketplaceScreen;
