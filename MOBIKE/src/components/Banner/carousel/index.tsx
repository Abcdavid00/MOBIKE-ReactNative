import React from 'react';
import {View, StyleSheet, Dimensions, FlatList, Animated} from 'react-native';
import CarouselItem from '../carouselItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import colors from '../../../assets/theme/colors';

const {width, height} = Dimensions.get('window');

type CarouselProps = {
  data: Array<string>;
  isUri?: boolean;
  isImageID?: boolean;
  havingBackground?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  data,
  isUri = false,
  isImageID = false,
  havingBackground = false,
}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
  
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  if (data && data.length) {
    return (
      <View style={{}}>
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

        <View
          style={[
            styles.dotView,
            havingBackground && {
              backgroundColor: theme=='light' ? '#ffffff55': '#00000055',
              borderRadius: 10,
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
      </View>
    );
  }
  console.log('Please provide Images');
  return null;
};

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
