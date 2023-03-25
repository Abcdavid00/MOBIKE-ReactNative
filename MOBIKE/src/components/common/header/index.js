import { Gesture } from 'react-native-gesture-handler';
import { View, Text, TouchableWithoutFeedback, BackHandler } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/theme/colors';
import { MARKETPLACE } from '../../../constants/routeNames';
import { Dimensions } from 'react-native';
const heightScreen = Dimensions.get('window').height;
const Header = ({ title, iconRight, textRight, onClickRight, onLeftClick }) => {
  return (
    <View
      style={{
        height: heightScreen / 12,
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableWithoutFeedback onPress={onLeftClick}>
        <SimpleLineIcon
          name="arrow-left"
          size={20}
          color="#292D32"
          style={{ marginLeft: 15 }}
        />
      </TouchableWithoutFeedback>

      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '700',
        }}>
        {title}
      </Text>

      {iconRight || textRight ? (
        <TouchableWithoutFeedback onPress={onClickRight}>
          {iconRight ? (
            <Ionicons
              name={iconRight}
              size={26}
              color="#292D32"
              style={{ marginRight: 15 }}
            />
          ) : (
            <Text
              style={{
                color: '#3B8AD3',
                fontSize: 16,
                fontWeight: '700',
                marginEnd: 15,
              }}>
              {textRight}
            </Text>
          )}
        </TouchableWithoutFeedback>
      ) : (
        <View style={{ width: 35 }} />
      )}
    </View>
  );
};

export default Header;
