import {View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputOutline from '../common/textInputOutline-Kohana';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../assets/theme/colors';
import {
  FILTERS_POP_UP_NAVIGATOR,
} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
const HeaderSearch = () => {
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInputOutline
        label={'Search (by name)'}
        iconClass={Ionicons}
        iconName={'search-outline'}
        iconColor={'#90B4D3'}
        inputPadding={6}
        borderWidthtoTop={0}
        bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
        containerStyle={{height: 44, borderColor: '#555'}}
        labelStyle={{fontSize: 12}}
        inputStyle={{fontSize: 14}}
        labelContainerStyle={{padding: 13}}
        iconSize={20}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          navigate(FILTERS_POP_UP_NAVIGATOR);
        }}>
        <View style={{paddingHorizontal: 20}}>
          <SimpleLineIcon name="equalizer" size={24} color="#292D32" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HeaderSearch;
