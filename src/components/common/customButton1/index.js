import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../../assets/theme/colors';

const CustomButton1 = ({
  primary,
  secondary,
  title,
  loading,
  disabled,
  onPress,
  styleWrapper,
  styleTitle,
  ...props
}) => {
  const getBgColor = () => {
    if (primary) return colors.primary;

    if (danger) return colors.danger;

    if (secondary) return colors.secondary;

    if (disabled) return colors.grey;

    return colors.grey;
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, {backgroundColor: getBgColor()}, styleWrapper]}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator
            style={primary ? colors.secondary : colors.primary}
          />
        )}
        {title && (
          <Text
            style={[
              {
                color: disabled ? 'black' : 'white',
                paddingLeft: loading ? 10 : 0,
              },
              styleTitle,
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton1;
