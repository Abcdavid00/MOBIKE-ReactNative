import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import colors from '../../../assets/theme/colors';
import {POPPINS_SEMI_BOLD} from '../../../assets/fonts';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
};

const CustomButton: React.FC<CustomButtonProps> = ({onPress, title, style}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  const _renderButton = () => (
    <View
      style={{
        width: widthScreen * (0.35 + 0.01 * title.length),
        height: heightScreen * (0.05 + 0.00075 * title.length),
        borderRadius: 16,
        backgroundColor: color.background,
        borderColor: theme == 'light' ? '#FEFEFF' : color.background,
        borderWidth: 0.5,
      }}
    />
  );
  if (theme == 'light') {
    return (
      <Pressable
        style={[{justifyContent: 'center', alignItems: 'center'}, style]}
        onPress={onPress}>
        <Shadow distance={10} startColor={'#A6B4C84D'} offset={[10, 10]}>
          {_renderButton()}
        </Shadow>
        <Shadow
          distance={20}
          startColor={'#FFFFFF66'}
          offset={[-12, -12]}
          containerStyle={{position: 'absolute'}}>
          {_renderButton()}
        </Shadow>
        <Text style={[styles.text, {color: color.onBackground}]}>{title}</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={[{justifyContent: 'center', alignItems: 'center'}, style]}
        onPress={onPress}>
        <Shadow distance={10} startColor={'#1F2427AA'} offset={[7, 7]}>
          {_renderButton()}
        </Shadow>
        <Shadow
          distance={20}
          startColor={'#48505777'}
          offset={[-10, -10]}
          containerStyle={{position: 'absolute'}}>
          {_renderButton()}
        </Shadow>
        <Text style={[styles.text, {color: color.onBackground}]}>{title}</Text>
      </Pressable>
    );
  }
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 16,
    fontFamily: POPPINS_SEMI_BOLD,
  },
});
