import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import ShadowWrapper from '../../shadowWrapper';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {ThemeState} from '../../../../redux/slice/themeSlice';
import colors from '../../../../assets/theme/colors';

const widthScreen = Dimensions.get('window').width;

const PostPreviewLoader = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  return (
    <View style={{marginVertical: 12}}>
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
          foregroundColor={theme == 'light' ? '#ecebeb' : '#686868'}>
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
