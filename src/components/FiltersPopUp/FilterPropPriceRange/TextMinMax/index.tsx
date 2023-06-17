import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputOutline from '../../../common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  minMaxTextType,
  priceRangeType,
  setMinMaxText,
  setPriceRange,
} from '../../../../redux/slice/filterSlice';
import {RootState} from '../../../../redux/store';
import TextField from '../../../common/textField';
import {ThemeState} from '../../../../redux/slice/themeSlice';
import {ColorThemeProps} from '../../../../assets/theme/colors';
import {getThemeColor} from '../../../../utils/getThemeColor';

type TextMinMaxComponentProps = {
  Min: number;
  Max: number;
  step: number;
  sliderWidth: number;
};

const TextMinMaxComponent: React.FC<TextMinMaxComponentProps> = ({
  Min,
  Max,
  step,
  sliderWidth,
}) => {
  const dispatch = useDispatch();
  const minMaxText = useSelector<RootState, minMaxTextType>(
    state => state.filter.minMaxText,
  );
  const priceRange = useSelector<RootState, priceRangeType>(
    state => state.filter.priceRange,
  );
  //tmp = priceRange;

  const [min, setMin] = useState(minMaxText.min.toString());
  const [max, setMax] = useState(minMaxText.max.toString());

  useEffect(() => {
    setMin(minMaxText.min.toString());
    setMax(minMaxText.max.toString());
  }, [minMaxText]);
  const onEndEditing = (text: String, type: string) => {
    let textTmp = text.replace(/[^0-9]/g, '');
    if (type === 'min') {
      if (textTmp === '' || parseInt(textTmp) < Min) {
        setMin(Min.toString());
        textTmp = Min.toString();
        // return;
      } else if (parseInt(textTmp) > parseInt(max)) {
        setMin(max);
        textTmp = max;
      }
      let minPosition = (sliderWidth * (parseInt(textTmp) - Min)) / (Max - Min);
      dispatch(
        setPriceRange({
          min: textTmp,
          max: priceRange.max,
          minPosition: minPosition,
          maxPosition: priceRange.maxPosition,
        }),
      );
      dispatch(setMinMaxText({min: textTmp, max: minMaxText.max}));
    } else {
      if (textTmp === '' || parseInt(textTmp) > Max) {
        setMax(Max.toString());
        textTmp = Max.toString();
        // return;
      } else if (parseInt(textTmp) < parseInt(min)) {
        setMax(min);
        textTmp = min;
      }
      let maxPosition = (sliderWidth * (parseInt(textTmp) - Min)) / (Max - Min);
      dispatch(
        setPriceRange({
          min: priceRange.min,
          max: textTmp,
          minPosition: priceRange.minPosition,
          maxPosition: maxPosition,
        }),
      );
      dispatch(setMinMaxText({min: minMaxText.min, max: textTmp}));
    }
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  return (
    <View style={{alignItems: 'center', marginTop: 12}}>
      <TextField
        label={'Min'}
        style={{width: '85%'}}
        iconClass={MaterialIcons}
        iconName={'attach-money'}
        iconColor={color.primary}
        keyboardType={'number-pad'}
        value={min}
        non_existingAnimation
        onChangeText={text => setMin(text)}
        onEndEditing={() => onEndEditing(min, 'min')}
      />
      <TextField
        label={'Max'}
        style={{width: '85%'}}
        iconClass={MaterialIcons}
        iconName={'attach-money'}
        iconColor={color.primary}
        keyboardType={'number-pad'}
        value={max}
        non_existingAnimation
        onChangeText={text => setMax(text)}
        onEndEditing={() => onEndEditing(max, 'max')}
      />
    </View>
  );
};

export default TextMinMaxComponent;
