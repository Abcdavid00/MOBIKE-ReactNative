import {View, UIManager} from 'react-native';
import Animated, {FadeInUp, Layout} from 'react-native-reanimated';
import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../../common/rangeSlider';
import {useDispatch, useSelector} from 'react-redux';
import {
  priceRangeType,
  setMinMaxText,
  setPriceRange,
} from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';
import TextMinMax from './TextMinMax';
import {RootState} from '../../../redux/store';

type FilterPropPriceRangeComponentProps = {
  min: number;
  max: number;
  step: number;
  sliderWidth: number;
};

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropPriceRangeComponent: React.FC<
  FilterPropPriceRangeComponentProps
> = ({min, max, step, sliderWidth}) => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
    //dispatch(setPriceRange(tmp));
  };

  //Prepare data for filter
  const priceRange = useSelector<RootState, priceRangeType>(
    state => state.filter.priceRange,
  );
  const dispatch = useDispatch();

  return (
    <FilterPropFrameComponent
      type={'Price Range'}
      onToggle={onToggle}
      show={show}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
        <GestureHandlerRootView>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <RangeSlider
              sliderWidth={sliderWidth}
              min={min}
              max={max}
              minPosition={priceRange.minPosition}
              maxPosition={priceRange.maxPosition}
              minValue={priceRange.min}
              maxValue={priceRange.max}
              step={step}
              onValueChange={range => {
                // tmp = range;
                  dispatch(setMinMaxText({min: range.min, max: range.max}));
                  dispatch(setPriceRange(range));
                // dispatch(setMinMaxText({min: range.min, max: range.max}));
              }}
            />
            <TextMinMax
              Min={min}
              Max={max}
              step={step}
              sliderWidth={sliderWidth}
            />
          </View>
        </GestureHandlerRootView>
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropPriceRangeComponent;
