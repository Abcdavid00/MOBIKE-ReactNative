import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import ShadowWrapper from '../../shadowWrapper';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {ThemeState} from '../../../../redux/slice/themeSlice';
import colors from '../../../../assets/theme/colors';
import {useTheme} from '@react-navigation/native';

const widthScreen = Dimensions.get('window').width;

const PostPreviewLoader = () => {
  const color = useTheme().colors.customColors;
  const theme = useTheme().dark;

  return (
    <View style={{marginBottom: 24}}>
      <ShadowWrapper
        style={{
          width: widthScreen * 0.42,
          height: widthScreen * 0.42 * 1.45,
          borderRadius: 11.75,
        }}>
        <ContentLoader
          width={widthScreen * 0.42}
          height={widthScreen * 0.42 * 1.45}
          speed={1}
          backgroundColor={color.divider}
          foregroundColor={theme ? '#686868' : '#ecebeb'}>
          {/* Only SVG shapes */}
          <Rect
            x={widthScreen * 0.035}
            y={widthScreen * 0.035}
            rx="5"
            ry="5"
            width={widthScreen * 0.35}
            height={widthScreen * 0.35}
          />
          <Rect
            x={widthScreen * 0.035}
            y={widthScreen * 0.385 + 16}
            rx="4"
            ry="4"
            width={widthScreen * 0.35}
            height="15"
          />
          <Rect
            x={widthScreen * 0.035}
            y={widthScreen * 0.385 + 35}
            rx="4"
            ry="4"
            width={widthScreen * 0.2}
            height="10"
          />
          <Rect
            x={widthScreen * 0.035}
            y={widthScreen * 0.385 + 51}
            rx="4"
            ry="4"
            width={widthScreen * 0.3}
            height="15"
          />
        </ContentLoader>
      </ShadowWrapper>
    </View>
  );
};

export default PostPreviewLoader;

const styles = StyleSheet.create({
  styleWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
