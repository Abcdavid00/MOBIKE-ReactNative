import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../../assets/theme/colors';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {setIsSendingOddValue} from '../../../redux/slice/filterSlice';

Animated.addWhitelistedNativeProps({text: true});

const RangeSlider = ({
  sliderWidth,
  min,
  max,
  step,
  onValueChange,
  minPosition,
  maxPosition,
  minValue,
  maxValue,
}) => {
  const position = useSharedValue(minPosition);
  const position2 = useSharedValue(maxPosition);
  //const priceRange = useSelector(state => state.filter.priceRange);

  useEffect(() => {
    position.value = minPosition;
  }, [minPosition]);

  useEffect(() => {
    position2.value = maxPosition;
  }, [maxPosition]);

  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const opacity = useSharedValue(0.75);
  const opacity2 = useSharedValue(0.75);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position.value;
    },
    onActive: (event, ctx) => {
      opacity.value = 1;
      if (ctx.startX + event.translationX < 0) {
        position.value = 0;
      } else if (ctx.startX + event.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else if (ctx.startX + event.translationX > 300) {
        position.value = 300;
      } else {
        position.value = ctx.startX + event.translationX;
      }
    },
    onEnd: () => {
      opacity.value = 0.75;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
        minPosition: position.value,
        maxPosition: position2.value,
      });
    },
  });
  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position2.value;
    },
    onActive: (event, ctx) => {
      opacity2.value = 1;
      if (ctx.startX + event.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (ctx.startX + event.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else if (ctx.startX + event.translationX < 0) {
      } else {
        position2.value = ctx.startX + event.translationX;
      }
    },
    onEnd: () => {
      opacity2.value = 0.75;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
        minPosition: position.value,
        maxPosition: position2.value,
      });
    },
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
    zIndex: zIndex.value,
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{translateX: position2.value}],
    zIndex: zIndex2.value,
  }));
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  //Animate slider
  const animatedStyleSlider = useAnimatedStyle(() => ({
    width: position2.value - position.value,
    transform: [{translateX: position.value}],
  }));

  //Animate label
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => {
    let val =
      min +
      Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step;

    if (val > max) {
      val = max;
    }

    return {
      text: `${val}m VND`,
    };
  });
  const maxLabelText = useAnimatedProps(() => {
    let val =
      min +
      Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step;
    if (val > max) {
      val = max;
    }

    return {
      text: `${val}m VND`,
    };
  });
  return (
    <View style={[styles.styleContainer]}>
      <View style={[styles.sliderBack, {width: sliderWidth}]} />
      <Animated.View
        style={[styles.sliderFront, {width: sliderWidth}, animatedStyleSlider]}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.sliderThumb, animatedStyle]}>
          <Animated.View style={[styles.label, opacityStyle]}>
            <AnimatedTextInput
              style={styles.labelText}
              defaultValue={0}
              animatedProps={minLabelText}
              value={minValue + 'm VND'}
              editable={false}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler2}>
        <Animated.View style={[styles.sliderThumb, animatedStyle2]}>
          <Animated.View style={[styles.label, opacityStyle2]}>
            <AnimatedTextInput
              style={styles.labelText}
              defaultValue={0}
              animatedProps={maxLabelText}
              editable={false}
              value={maxValue+'m VND'}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  styleContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  sliderBack: {
    height: 2,
    backgroundColor: '#343A3D',
    borderRadius: 20,
  },
  sliderFront: {
    height: 2,
    backgroundColor: '#6CB4DC',
    borderRadius: 20,
    position: 'absolute',
  },
  sliderThumb: {
    position: 'absolute',
    left: -5,
    height: 10,
    width: 10,
    backgroundColor: '#6CB4DC',
    borderRadius: 20,
  },
  label: {
    position: 'absolute',
    top: -40,
    backgroundColor: '#6CB4DC',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
});
