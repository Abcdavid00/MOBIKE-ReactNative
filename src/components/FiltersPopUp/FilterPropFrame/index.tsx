import {View, TouchableWithoutFeedback, Pressable} from 'react-native';
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

type FilterPropFrameComponentProps = {
  onToggle: () => void;
  children: React.ReactNode;
  type: string;
  show: boolean;
  animate?: boolean;
  divider?: boolean;
  styleLabel?: Animated.AnimateProps<
    React.ComponentProps<typeof View>
  >['style'];
};

const FilterPropFrameComponent: React.FC<FilterPropFrameComponentProps> = ({
  onToggle,
  children,
  type,
  show,
  animate = true,
  divider = true,
  styleLabel,
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
  return (
    <Animated.View
      layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 20,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <Animated.Text
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
          style={[
            {
              marginStart: 25,
              color: 'black',
              fontSize: 16,
              fontStyle: 'italic',
              fontWeight: '700',
            },
            styleLabel,
          ]}>
          {type}
        </Animated.Text>
        <Pressable onPress={toggle}>
          <Animated.View
            layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
            style={[{marginEnd: 25}, animatedStyles]}>
            <SimpleLineIcon name="arrow-down" size={15} color={'black'} />
          </Animated.View>
        </Pressable>
      </View>
      {show && children}
      {divider && (
        <Animated.View
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
          style={{
            backgroundColor: '#A9A9A9',
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
