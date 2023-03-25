import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  FILTERS_POP_UP,
  FILTERS_POP_UP_MANUFACTURER,
  FILTER_PROP_MANUFACTURER,
  LOADING,
  MARKETPLACE,
} from '../constants/routeNames';
import FilterPropManufacturer from '../screens/FilterPropManufacturer';
import FiltersPopUp from '../screens/FiltersPopUp';
import Loading from '../screens/Loading';
import Marketplace from '../screens/Marketplace';

const Stack = createNativeStackNavigator();

const FiltersPopUpNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={FILTERS_POP_UP}>
      <Stack.Screen
        name={FILTERS_POP_UP}
        component={FiltersPopUp}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Filters'}
              textRight={'Reset'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={FILTERS_POP_UP_MANUFACTURER}
        component={FilterPropManufacturer}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Manufacturer'}
              textRight={'Reset'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default FiltersPopUpNavigator;
