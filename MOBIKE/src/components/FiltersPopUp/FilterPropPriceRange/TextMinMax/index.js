import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsSendingOddValue,
  setMinMaxText,
  setPriceRange,
} from '../../../../redux/slice/filterSlice';
import {InterpolateFromPositionToValue} from '../../../../utils/interpolation';

const TextMinMaxComponent = ({Min, Max, step, sliderWidth}) => {
  const dispatch = useDispatch();
  const minMaxText = useSelector(state => state.filter.minMaxText);
  const priceRange = useSelector(state => state.filter.priceRange);
  //tmp = priceRange;

  const [min, setMin] = useState(minMaxText.min.toString());
  const [max, setMax] = useState(minMaxText.max.toString());

  useEffect(() => {
    setMin(minMaxText.min.toString());
    setMax(minMaxText.max.toString());
  }, [minMaxText]);
  const onEndEditing = (text, type) => {
    text = text.replace(/[^0-9]/g, '');
    if (type === 'min') {
      if (text === '' || parseInt(text) < Min) {
        setMin(minMaxText.min.toString());
        return;
      } else if (parseInt(text) > parseInt(max)) {
        setMin(max);
        text = max;
      }
      minPosition = (sliderWidth * (text - Min)) / (Max - Min);
      dispatch(
        setPriceRange({
          min: text,
          max: priceRange.max,
          minPosition: minPosition,
          maxPosition: priceRange.maxPosition,
        }),
      );
      dispatch(setMinMaxText({min: text, max: minMaxText.max}));
    } else {
      if (text === '' || parseInt(text) > Max) {
        setMax(minMaxText.max.toString());
        return;
      } else if (parseInt(text) < parseInt(min)) {
        setMax(min);
        text = min;
      }
      maxPosition = (sliderWidth * (text - Min)) / (Max - Min);
      dispatch(
        setPriceRange({
          min: priceRange.min,
          max: text,
          minPosition: priceRange.minPosition,
          maxPosition: maxPosition,
        }),
      );
      dispatch(setMinMaxText({min: minMaxText.min, max: text}));
    }
  };

  return (
    <View>
      <TextInputOutline
        label={'Min'}
        iconClass={MaterialIcons}
        iconName={'attach-money'}
        iconColor={'#90B4D3'}
        inputPadding={6}
        borderWidthtoTop={0}
        bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
        containerStyle={{
          height: 44,
          borderColor: '#555',
          marginStart: 5,
          marginEnd: 20,
          marginBottom: 10,
          marginTop: 30,
        }}
        labelStyle={{fontSize: 12}}
        inputStyle={{fontSize: 16}}
        labelContainerStyle={{padding: 13}}
        iconSize={20}
        value={min}
        keyboardType={'number-pad'}
        onChangeText={text => setMin(text)}
        onEndEditing={text => onEndEditing(min, 'min')}
      />
      <TextInputOutline
        label={'Max'}
        iconClass={MaterialIcons}
        iconName={'attach-money'}
        iconColor={'#90B4D3'}
        inputPadding={6}
        borderWidthtoTop={0}
        bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
        containerStyle={{
          height: 44,
          borderColor: '#555',
          marginStart: 5,
          marginEnd: 20,
        }}
        labelStyle={{fontSize: 12}}
        inputStyle={{fontSize: 16}}
        labelContainerStyle={{padding: 13}}
        iconSize={20}
        value={max}
        keyboardType={'number-pad'}
        onChangeText={text => setMax(text)}
        onEndEditing={text => onEndEditing(max, 'max')}
      />
    </View>
  );
};

export default TextMinMaxComponent;
