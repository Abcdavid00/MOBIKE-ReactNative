import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';
import {POPPINS_LIGHT_ITALIC, POPPINS_REGULAR} from '../../../assets/fonts';
import colors from '../../../assets/theme/colors';
import {ThemeState} from '../../../redux/slice/themeSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

type TextFieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  isTypePassword?: boolean;
  iconClass: React.ComponentType<IconProps>;
  iconName: string;
  iconColor: string;
  iconSize?: number;
  error?: string;
};

const TextField: React.FC<TextFieldProps> = props => {
  const {
    label,
    style,
    iconClass,
    iconName,
    iconColor,
    iconSize = 22,
    onBlur,
    onFocus,
    value,
    onChangeText,
    isTypePassword = false,
    error,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [valueTmp, setValueTmp] = useState(value);
  const Icon = iconClass;
  const [hidden, setHidden] = useState(isTypePassword);
  const onToggleHidden = () => {
    setHidden(!hidden);
  };
  const theme: ThemeState = useSelector<RootState, ThemeState>(
    state => state.theme,
  );
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
  return (
    <View style={[{width: '100%'}, style]}>
      {theme == 'light' ? (
        <Image
          source={require('../../../assets/images/input_light.png')}
          style={{width: '100%', resizeMode: 'contain'}}
        />
      ) : (
        <Image
          source={require('../../../assets/images/input_dark.png')}
          style={{width: '100%', resizeMode: 'contain'}}
        />
      )}
      <TextInput
        style={[style, styles.input, {color: color.onBackground_light}]}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onChangeText={e => {
          setValueTmp(e);
          onChangeText?.(e);
        }}
        secureTextEntry={hidden}
        {...restOfProps}
      />
      <View
        style={[
          styles.labelContainer,
          valueTmp || isFocused ? {width: iconSize} : null,
        ]}>
        {!isFocused && !valueTmp && (
          <Animated.Text
            entering={FadeInRight}
            exiting={FadeOutRight}
            style={[styles.label, {color: color.onBackground_light}]}>
            {label}
          </Animated.Text>
        )}
        {(isFocused || valueTmp) && (
          <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
            {iconClass && (
              <Icon name={iconName} color={iconColor} size={iconSize} />
            )}
          </Animated.View>
        )}
      </View>

      {isTypePassword && (
        <Pressable
          onPress={onToggleHidden}
          style={{position: 'absolute', zIndex: 2, top: 28, right: 22}}>
          <Feather
            name={hidden ? 'eye-off' : 'eye'}
            color={'#AAAAAA'}
            size={18}
          />
        </Pressable>
      )}
      {error && (
        <Text style={[styles.error, {color: color.error}]}>{error}</Text>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingStart: 60,
    paddingEnd: 30,
    fontSize: 16,
    fontFamily: POPPINS_REGULAR,
    position: 'absolute',
    zIndex: 2,
    top: 15,
  },
  labelContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 26,
    left: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: POPPINS_LIGHT_ITALIC,
  },
  error: {
    fontSize: 12,
    fontFamily: POPPINS_REGULAR,
    alignSelf: 'flex-end',
    textAlign: 'right',
    paddingHorizontal: 5,
    marginTop: -4,
  },
});
