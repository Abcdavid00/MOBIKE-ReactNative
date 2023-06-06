import React from 'react';
import {StyleSheet, Dimensions, Image, View} from 'react-native';
import MobikeImage from '../../common/image';

export const {width, height} = Dimensions.get('window');

type CarouselItemProps = {
  item: any;
  isUri?: boolean;
  isImageID?: boolean;
  index: number;
};

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  isUri,
  isImageID,
  index,
}) => {
  const _renderContent = () => {
    if (isUri) {
      const {uri} = item;
      return (
        <Image
          source={{uri: uri}}
          style={[styles.image, {height: width / 1.5}]}
          key={index}
        />
      );
    } else if (isImageID) {
      return (
        <MobikeImage
          imageID={item}
          style={[styles.image, {height: width / 1.5}]}
          key={index}
        />
      );
    } else {
      return <Image source={item} style={styles.image} key={index} />;
    }
  };

  return <View style={styles.cardView}>{_renderContent()}</View>;
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 50,
    height: height / 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },

  image: {
    height: '100%',
    width: width - 50,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: 'black',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },

  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CarouselItem;
