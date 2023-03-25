import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing, EasingNode, Layout } from 'react-native-reanimated';
import React, { useEffect, useRef, useState } from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FilterPropFrameComponent = ({
  onToggle,
  children,
  type,
  show,
  animate = true,
  divider = true,
  styleLabel,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const durationLayout = 300;
  const toggle = () => {
    onToggle();
    Animated.timing(rotateAnim, {
      toValue: show ? 0 : 1,
      duration: 200,
      easing: EasingNode.linear,
      useNativeDriver: true,
    }).start();
  };
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
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
          style={styleLabel ? styleLabel : {
            marginStart: 25,
            color: 'black',
            fontSize: 16,
            fontStyle: 'italic',
            fontWeight: '700',
          }}>
          {type}
        </Animated.Text>
        <TouchableWithoutFeedback onPress={toggle}>
          <Animated.View
            layout={Layout.stiffness(100)
              .damping(10)
              .duration(durationLayout)}
            style={{ marginEnd: 25, transform: [{ rotateZ: rotate }] }}>
            <SimpleLineIcon name="arrow-down" size={15} color={'black'} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      {show && children}
      {divider && <Animated.View
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
        style={{
          backgroundColor: '#A9A9A9',
          height: 1,
          marginStart: 25,
          marginTop: show ? 10 : 6,
        }}
      />}
    </Animated.View>
  );
};

export default FilterPropFrameComponent;
