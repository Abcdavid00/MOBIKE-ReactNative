import {
  UIManager,
} from 'react-native';
import Animated, {
  Layout,
  SlideInLeft,
} from 'react-native-reanimated';
import React, { useState } from 'react';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropNameComponent = () => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };

  //Prepare data for filter
  const title = useSelector(state => state.filter.title);
  const dispatch = useDispatch();
  const changeName = text => {
    dispatch(setTitle(text));
  };

  return (
    <FilterPropFrameComponent type={'Name'} onToggle={onToggle} show={show}>
      <Animated.View
        entering={SlideInLeft.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
        <TextInputOutline
          label={'Honda Wave...'}
          iconClass={MaterialIcons}
          iconName={'drive-file-rename-outline'}
          iconColor={'#90B4D3'}
          inputPadding={6}
          borderWidthtoTop={0}
          bigContainerStyle={{ flex: 1, marginStart: 15, marginBottom: 0 }}
          containerStyle={{
            height: 44,
            borderColor: '#555',
            marginStart: 5,
            marginEnd: 20,
          }}
          labelStyle={{ fontSize: 12 }}
          inputStyle={{ fontSize: 16 }}
          labelContainerStyle={{ padding: 13 }}
          iconSize={20}
          onChangeText={text => {
            changeName(text);
          }}
          value={title}
        />
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropNameComponent;
