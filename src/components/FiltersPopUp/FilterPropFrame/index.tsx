import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  Easing,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import React, {useRef} from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {getThemeColor} from '../../../utils/getThemeColor';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {POPPINS_REGULAR} from '../../../assets/fonts';
import {ThemeState} from '../../../redux/slice/themeSlice';

type FilterPropFrameComponentProps = {
  onToggle: () => void;
  children: React.ReactNode;
  type: string;
  show: boolean;
  animate?: boolean;
  divider?: boolean;
  styleLabel?: TextStyle;
  styleWrapper?: ViewStyle;
};

const FilterPropFrameComponent: React.FC<FilterPropFrameComponentProps> = ({
  onToggle,
  children,
  type,
  show,
  animate = true,
  divider = true,
  styleLabel,
  styleWrapper,
}) => {
  const rotateAnim = useSharedValue('0deg');
  const durationLayout = 300;
  const toggle = () => {
    onToggle();
    if (show) {
      rotateAnim.value = '0deg';
    } else rotateAnim.value = '180deg';
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: withTiming(rotateAnim.value, {
            duration: 400,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  return (
    <Animated.View
      layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
      <View style={[styles.styleWrapper, styleWrapper]}>
        <Animated.Text
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
          style={[styles.styleLabel, {color: color.onBackground}, styleLabel]}>
          {type}
        </Animated.Text>
        <Pressable onPress={toggle}>
          <Animated.View
            layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
            style={[{marginEnd: 25}, animatedStyles]}>
            <SimpleLineIcon
              name="arrow-down"
              size={16}
              color={color.onBackground}
            />
          </Animated.View>
        </Pressable>
      </View>
      {show && children}
      {divider && (
        <Animated.View
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
          style={{
            backgroundColor: color.divider,
            height: 1,
            marginStart: 25,
            marginTop: show ? 10 : 6,
          }}
        />
      )}
    </Animated.View>
  );
};

export default FilterPropFrameComponent;

const styles = StyleSheet.create({
  styleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
  },
  styleLabel: {
    marginStart: 25,
    fontSize: getFontSize(16),
    fontFamily: POPPINS_REGULAR,
  },
});
