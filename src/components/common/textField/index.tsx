import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
import {useTheme} from '@react-navigation/native';
import {getFontSize} from '../../../utils/fontSizeResponsive';

export type TextFieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  isTypePassword?: boolean;
  iconClass?: React.ComponentType<IconProps>;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  error?: string;
  non_existingAnimation?: boolean;
  flagLabel?: Boolean;
  flagIcon?: Boolean;
  large?: boolean;
  largest?: boolean;
  styleWrapper?: ViewStyle;
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
    non_existingAnimation,
    large = false,
    largest = false,
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
  const color = useTheme().colors.customColors;

  const _renderBackground = () => {
    if (theme == 'light') {
      if (large) {
        return (
          <Image
            source={require('../../../assets/images/input_large_light.png')}
            style={{width: '100%', resizeMode: 'cover'}}
          />
        );
      } else if (largest) {
        return (
          <Image
            source={require('../../../assets/images/input_largest_light.png')}
            style={{width: '100%', resizeMode: 'cover'}}
          />
        );
      } else
        return (
          <Image
            source={require('../../../assets/images/input_light.png')}
            style={{width: '100%', resizeMode: 'contain'}}
          />
        );
    } else {
      if (large) {
        return (
          <Image
            source={require('../../../assets/images/input_large_dark.png')}
            style={{width: '100%', resizeMode: 'cover'}}
          />
        );
      } else if (largest) {
        return (
          <Image
            source={require('../../../assets/images/input_largest_dark.png')}
            style={{width: '100%', resizeMode: 'cover'}}
          />
        );
      } else
        return (
          <Image
            source={require('../../../assets/images/input_dark.png')}
            style={{width: '100%', resizeMode: 'contain'}}
          />
        );
    }
  };

  useEffect(() => {
    setValueTmp(value);
  }, [value]);
  return (
    <View style={[{width: '100%'}, style]}>
      {/* {theme == 'light' ? (
        <Image
          source={require('../../../assets/images/input_light.png')}
          style={{width: '100%', resizeMode: 'contain'}}
        />
      ) : (
        <Image
          source={require('../../../assets/images/input_dark.png')}
          style={{width: '100%', resizeMode: 'contain'}}
        />
      )} */}
      {_renderBackground()}
      <TextInput
        style={[
          styles.input,
          {color: color.onBackground_light},
          (large || largest) && {
            paddingStart: 24,
            top: 0,
            paddingEnd: 20,
            fontSize: getFontSize(14),
          },
          style,
        ]}
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
        value={value}
        textAlignVertical={large || largest ? 'top' : 'auto'}
        spellCheck={false}
        autoCorrect={false}
        {...restOfProps}
      />

      <View
        style={[
          styles.labelContainer,
          valueTmp || isFocused ? {width: iconSize} : null,
          (large || largest) && {top: 12},
        ]}>
        {/*Label */}
        {!isFocused && !valueTmp && (
          <Animated.Text
            entering={FadeInRight}
            exiting={non_existingAnimation ? undefined : FadeOutRight}
            style={[styles.label, {color: color.onBackground_light}]}>
            {label}
          </Animated.Text>
        )}

        {/*Icon */}
        {(isFocused || valueTmp) && (
          <Animated.View
            entering={FadeInLeft}
            exiting={non_existingAnimation ? undefined : FadeOutLeft}>
            {iconClass && Icon && (
              <Icon
                name={iconName || ''}
                color={iconColor || ''}
                size={iconSize}
                style={{bottom: 2}}
              />
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
        <Text
          style={[
            styles.error,
            {color: color.error},
            (large || largest) && {marginTop: 4},
          ]}>
          {error}
        </Text>
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
    marginTop: -8,
  },
});
