import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import colors from '../../../assets/theme/colors';
import data from '../../../data/imageBanner';
import CarouselItem from '../carouselItem';

const { width, height } = Dimensions.get('window');

const Carousel = ({ data, isUri = false, isImageID = false, havingBackground = false }) => {
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
          renderItem={({ item, index }) => {
            return <CarouselItem item={item} isUri={isUri} isImageID={isImageID} index={index} />;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
        />

        <View style={[styles.dotView, havingBackground && { backgroundColor: '#ffffff55', borderRadius: 10, }]}>
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
                  backgroundColor: '#000',
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
    bottom: 15,
    alignSelf: 'center',
    paddingVertical: 1,
    paddingHorizontal: 3,
  },
});

export default Carousel;
