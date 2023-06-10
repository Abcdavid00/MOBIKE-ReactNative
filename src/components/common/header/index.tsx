import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../../assets/theme/colors';
import { Dimensions } from 'react-native';
const heightScreen = Dimensions.get('window').height;

type HeaderProps = {
  title: string,
  iconRight?: string,
  textRight?: string,
  onClickRight?: () => void,
  onLeftClick?: () => void,
}

const Header : React.FC<HeaderProps> = ({ title, iconRight, textRight, onClickRight, onLeftClick }) => {
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
