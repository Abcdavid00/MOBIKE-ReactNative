import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import React from 'react';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {CategoryItem} from '../flatList';
import {RootState} from '../../../redux/store';
import {getThemeColor} from '../../../utils/getThemeColor';
import {POPPINS_SEMI_BOLD} from '../../../assets/fonts';
import {setType, setVehicleType} from '../../../redux/slice/filterSlice';

type ListItemProps = {
  item: CategoryItem;
  image: ImageSourcePropType;
  index: number;
  last: boolean;
};

const ListItemFilter: React.FC<ListItemProps> = ({
  item,
  image,
  index,
  last,
}) => {
  const isSelected = useSelector<RootState, boolean>(
    state => state.filter.vehicleType == item.ID,
  );

  const dispatch = useDispatch();

  const onPress = () => {
    if (!isSelected) {
      dispatch(setVehicleType(item.ID));
    } 
    else dispatch(setVehicleType(undefined));
  };

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.styleWrapper,
          {
            backgroundColor: isSelected
              ? color.secondary + '4D'
              : color.background,
            borderColor: isSelected ? color.secondary : color.divider,
          },
          last && {marginRight: 40},
        ]}>
        <Image source={image} style={styles.styleImage} />
        <Text style={[styles.styleTitle, {color: color.onBackground}]}>
          {item.Type}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  styleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 8,
  },

  styleImage: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },

  styleTitle: {
    marginStart: 8,
    fontSize: 14,
    textAlignVertical: 'bottom',
    fontFamily: POPPINS_SEMI_BOLD,
  },
});
export default ListItemFilter;
