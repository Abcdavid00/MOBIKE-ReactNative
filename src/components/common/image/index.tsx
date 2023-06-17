import React from 'react';
import {Image, ImageStyle} from 'react-native';

type MobikeImageProps = {
  imageID: number;
  style?: ImageStyle;
};

const MobikeImage: React.FC<MobikeImageProps> = ({imageID, style}) => (
  <Image
    source={{
      uri: 'https://abcdavid-knguyen.ddns.net:30001/image/get/' + imageID,
    }}
    style={[
      {
        resizeMode: 'contain',
      },
      style,
    ]}
  />
);

export default MobikeImage;
