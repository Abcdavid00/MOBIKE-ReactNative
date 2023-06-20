import React from 'react';
import {Image, ImageStyle, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ColorThemeProps} from '../../../assets/theme/colors';
import {getThemeColor} from '../../../utils/getThemeColor';

type MobikeImageProps = {
  imageID?: number | null;
  style?: ImageStyle;
  avatar?: boolean;
};

const MobikeImage: React.FC<MobikeImageProps> = ({imageID, style, avatar}) => {
  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  if (!imageID)
    return (
      <Image
        source={require('../../../assets/images/image-not-found.jpg')}
        style={[
          {
            resizeMode: 'contain',
          },
          avatar && {
            width: 48,
            height: 48,
            borderRadius: 500,
            borderWidth: 1,
            borderColor: color.divider,
          },
          style,
        ]}
      />
    );

  return (
    <Image
      source={{
        uri: 'https://mobike.ddns.net/image/get/' + imageID,
      }}
      style={[
        {
          resizeMode: 'contain',
        },
        avatar && {
          width: 48,
          height: 48,
          borderRadius: 500,
          borderWidth: 1,
          borderColor: color.divider,
        },
        style,
      ]}
    />
  );
};

export default MobikeImage;
