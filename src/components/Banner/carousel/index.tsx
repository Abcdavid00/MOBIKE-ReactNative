import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  ViewStyle,
} from 'react-native';
import CarouselItem from '../carouselItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import colors from '../../../assets/theme/colors';
import * as ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');

type CarouselProps = {
  data: Array<string> | Array<number> | Array<ImagePicker.Asset>;
  isUri?: boolean;
  isImageID?: boolean;
  havingBackground?: boolean;
  style?: ViewStyle;
};

const Carousel: React.FC<CarouselProps> = ({
  data,
  isUri = false,
  isImageID = false,
  havingBackground = false,
  style,
}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  // if (data && data.length) {
  return (
    <View style={style}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => 'key' + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={'normal'}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <CarouselItem
              item={item}
              isUri={isUri}
              isImageID={isImageID}
              index={index}
            />
          );
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
      {data.length > 1 && (
        <View
          style={[
            styles.dotView,
            havingBackground && {
              backgroundColor: theme == 'light' ? '#ffffff55' : '#00000055',
              borderRadius: 10,
              bottom: 28,
            },
          ]}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 5,
                  width: 5,
                  backgroundColor: color.onBackground,
                  margin: 2,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
// console.log('Please provide Images');
// return null;
// };

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 1,
    paddingHorizontal: 3,
  },
});

export default Carousel;
