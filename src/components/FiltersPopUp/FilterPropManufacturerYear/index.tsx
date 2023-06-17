import {UIManager} from 'react-native';
import Animated, {Layout, SlideInLeft} from 'react-native-reanimated';
import React, {useState} from 'react';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import {useDispatch, useSelector} from 'react-redux';
import {
  manufacturerType,
  setManufacturerYear,
} from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {RootState} from '../../../redux/store';
import TextField from '../../common/textField';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {getThemeColor} from '../../../utils/getThemeColor';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropManufacturerYearComponent: React.FC = () => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };

  //Prepare data for filter
  const manufacturerYear = useSelector<RootState, number | undefined>(
    state => state.filter.manufacturerYear,
  );
  const dispatch = useDispatch();
  const changeManufacturerYear = (text: string) => {
    dispatch(setManufacturerYear(text));
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  return (
    <FilterPropFrameComponent
      type={'Manufacture Year'}
      onToggle={onToggle}
      show={show}>
      <Animated.View
        entering={SlideInLeft.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
        style={{alignItems: 'center'}}>
        <TextField
          label={'Manufacturer Year'}
          iconClass={Fontisto}
          iconName={'date'}
          iconColor={color.primary}
          style={{width: '85%'}}
          keyboardType={'numeric'}
          onChangeText={text => {
            changeManufacturerYear(text);
          }}
          value={manufacturerYear ? manufacturerYear.toString() : undefined}
          non_existingAnimation
        />
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropManufacturerYearComponent;
