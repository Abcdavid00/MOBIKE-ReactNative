import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../../../assets/theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  setInitial, setVehicleType,
} from '../../../redux/slice/filterSlice';
import {CategoryItem} from '../flatList';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import {POPPINS_SEMI_BOLD} from '../../../assets/fonts';

type ListItemProps = {
  item: CategoryItem;
  onNavigate: () => void;
  image: ImageSourcePropType;
  index: number;
  last?: boolean;
};

const ListItemMarketplace: React.FC<ListItemProps> = ({
  item,
  onNavigate,
  image,
  index,
  last,
}) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(setVehicleType(item.ID));
    onNavigate();
  };

  const onPressAll = () => {
    dispatch(setInitial());
    onNavigate();
  };

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  if (index != 0)
    return (
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.styleWrapper,
            {
              backgroundColor: color.background,
              borderColor: theme == 'light' ? '#d8d8d8' : '#4b4b4b',
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
  else {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={onPressAll}>
          <View
            style={[
              styles.styleWrapper,
              {
                backgroundColor: color.background,
                borderColor: theme == 'light' ? '#d8d8d8' : '#4b4b4b',
              },
            ]}>
            <Text
              style={[
                styles.styleTitle,
                {marginLeft: 0, paddingHorizontal: 5},
                {color: color.onBackground},
              ]}>
              All
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={onPress}>
          <View
            style={[
              styles.styleWrapper,
              {
                backgroundColor: color.background,
                borderColor: theme == 'light' ? '#d8d8d8' : '#4b4b4b',
              },
            ]}>
            <Image source={image} style={styles.styleImage} />
            <Text style={[styles.styleTitle, {color: color.onBackground}]}>
              {item.Type}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
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

export default ListItemMarketplace;


