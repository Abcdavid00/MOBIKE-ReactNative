import {
    UIManager,
} from 'react-native';
import Animated, {
    Layout,
    SlideInLeft,
} from 'react-native-reanimated';
import React, { useState } from 'react';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import { useDispatch, useSelector } from 'react-redux';
import { setManufacturerYear } from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';
import Fontisto from 'react-native-vector-icons/Fontisto';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropManufacturerYearComponent = () => {
    //Toogle show/hide filter options
    const [show, setShow] = useState(false);
    const durationLayout = 300;
    const onToggle = () => {
        setShow(prevState => !prevState);
    };

    //Prepare data for filter
    const manufacturerYear = useSelector(state => state.filter.manufacturerYear);
    const dispatch = useDispatch();
    const changeManufacturerYear = text => {
        dispatch(setManufacturerYear(text));
    };

    return (
        <FilterPropFrameComponent type={'Manufacture Year'} onToggle={onToggle} show={show}>
            <Animated.View
                entering={SlideInLeft.duration(300).delay(100)}
                layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
                <TextInputOutline
                    label={'Manufacturer Year'}
                    iconClass={Fontisto}
                    iconName={'date'}
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
                    keyboardType={'numeric'}
                    onChangeText={text => {
                        changeManufacturerYear(text);
                    }}
                    value={manufacturerYear}
                />
            </Animated.View>
        </FilterPropFrameComponent>
    );
};

export default FilterPropManufacturerYearComponent;
