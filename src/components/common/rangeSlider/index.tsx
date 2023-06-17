import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedProps,
  runOnJS,
  GestureHandlers,
} from 'react-native-reanimated';
import {priceRangeType} from '../../../redux/slice/filterSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {getThemeColor} from '../../../utils/getThemeColor';
import themeSlice from '../../../redux/slice/themeSlice';

Animated.addWhitelistedNativeProps({text: true});

type RangeSliderProps = {
  sliderWidth: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: priceRangeType) => void;
  minPosition: number;
  maxPosition: number;
  minValue: number;
  maxValue: number;
};

type AnimatedGHContext = {
  startX: number;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
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
  const gestureHandler = useAnimatedGestureHandler<
    GestureEvent<PanGestureHandlerEventPayload>,
    AnimatedGHContext
  >({
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
  const gestureHandler2 = useAnimatedGestureHandler<
    GestureEvent<PanGestureHandlerEventPayload>,
    AnimatedGHContext
  >({
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
    } as any;
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
    } as any;
  });

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  return (
    <View style={[styles.styleContainer]}>
      <View
        style={[
          styles.sliderBack,
          {width: sliderWidth, backgroundColor: color.onBackground_disabled},
        ]}
      />
      <Animated.View
        style={[
          styles.sliderFront,
          {width: sliderWidth, backgroundColor: color.primary},
          animatedStyleSlider,
        ]}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.sliderThumb,
            {backgroundColor: color.primary},
            animatedStyle,
          ]}>
          <Animated.View
            style={[
              styles.label,
              {backgroundColor: color.primary},
              opacityStyle,
            ]}>
            <AnimatedTextInput
              style={[styles.labelText, {color: color.onPrimary}]}
              defaultValue={''}
              animatedProps={minLabelText}
              value={minValue + ' mVND'}
              editable={false}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler2}>
        <Animated.View
          style={[
            styles.sliderThumb,
            {backgroundColor: color.primary},
            animatedStyle2,
          ]}>
          <Animated.View
            style={[
              styles.label,
              {backgroundColor: color.primary},
              opacityStyle2,
            ]}>
            <AnimatedTextInput
              style={[styles.labelText, {color: color.onPrimary}]}
              defaultValue={''}
              animatedProps={maxLabelText}
              editable={false}
              value={maxValue + ' mVND'}
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
