import {View, Text, Image} from 'react-native';
import React from 'react';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import {POPPINS_SEMI_BOLD} from '../../../assets/fonts';
import LoadingText from '../../LoadingText';

type PopUpLoadingProps = {
  visibility: boolean;
  onChangePopupVisibility: (visibility: boolean) => void;
  text: string;
};

const PopUpLoading: React.FC<PopUpLoadingProps> = ({
  visibility,
  onChangePopupVisibility,
  text,
}) => {
  const color = useTheme().colors.customColors;
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  return (
    <Modal
      // onTouchOutside={() => {
      //   onChangePopupVisibility(false);
      // }}
      width={0.5}
      visible={visibility}
      // onSwipeOut={() => onChangePopupVisibility(false)}
      modalAnimation={
        new ScaleAnimation({
          animationDuration: 0,
          useNativeDriver: true,
        })
      }
      onHardwareBackPress={() => {
        console.log('onHardwareBackPress');
        onChangePopupVisibility(false);
        return true;
      }}>
      <ModalContent
        style={{
          backgroundColor: theme == 'light' ? '#fff' : color.background,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            margin: 0,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <LoadingText text={text} />
          <Image
            source={require('../../../assets/images/loading-wheel.gif')}
            style={{width: 80, height: 80, marginTop: 10, marginBottom: 10}}
          />
        </View>
      </ModalContent>
    </Modal>
  );
};

export default PopUpLoading;
