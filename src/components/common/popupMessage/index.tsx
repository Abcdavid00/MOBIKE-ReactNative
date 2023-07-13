import {View, Text} from 'react-native';
import React from 'react';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import {
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../../assets/fonts';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PopUpMessageProps = {
  message: string;
  type: 'error' | 'warning' | 'success';
  havingTwoButton?: boolean;
  onPress?: () => void;
  labelCTA?: string;
  onPressCancel?: () => void;
  labelCancel?: string;
  visibility: boolean;
  onChangePopupVisibility: (visibility: boolean) => void;
};

const PopUpMessage: React.FC<PopUpMessageProps> = ({
  message,
  type,
  havingTwoButton = false,
  onPress,
  labelCTA,
  onPressCancel,
  labelCancel,
  visibility,
  onChangePopupVisibility,
}) => {
  const color = useTheme().colors.customColors;
  const theme = useSelector<RootState, ThemeState>(state => state.theme);

  return (
    <Modal
      onTouchOutside={() => {
        onChangePopupVisibility(false);
      }}
      width={0.9}
      visible={visibility}
      onSwipeOut={() => onChangePopupVisibility(false)}
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
      }}
      modalTitle={
        type == 'error' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: color.popupError,
              height: 80,
              width: '100%',
            }}>
            <Feather name="x-circle" color={'#f5f5f5'} size={54} />
          </View>
        ) : type == 'warning' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: color.popupWarning,
              height: 80,
              width: '100%',
            }}>
            <AntDesign name="warning" color={'#f5f5f5'} size={54} />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: color.popupSuccess,
              height: 80,
              width: '100%',
            }}>
            <Ionicons
              name="checkmark-circle-outline"
              color={'#f5f5f5'}
              size={54}
            />
          </View>
        )
      }>
      <ModalContent
        style={{
          backgroundColor: theme == 'light' ? '#fff' : color.background,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            margin: 0,
            paddingTop: 10,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              fontFamily: POPPINS_SEMI_BOLD,
              fontSize: 20,
              color: color.onBackground,
            }}>
            {type == 'error'
              ? 'Error!'
              : type == 'warning'
              ? 'Warning!'
              : 'Success!'}
          </Text>
          <Text
            style={{
              fontFamily: POPPINS_LIGHT,
              fontSize: 16,
              color: color.onBackground,
              textAlign: 'center',
            }}>
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: havingTwoButton ? 'space-between' : 'center',
              width: '100%',
              marginTop: 12,
            }}>
            {havingTwoButton && (
              <Button
                mode="contained"
                style={{
                  backgroundColor:
                    type == 'error'
                      ? color.popupError
                      : type == 'warning'
                      ? color.popupWarning
                      : color.popupSuccess,
                  width: '48%',
                }}
                onPress={() => {
                  onChangePopupVisibility(false);
                  onPress && onPress();
                }}>
                <Text
                  style={{
                    fontFamily: POPPINS_SEMI_BOLD,
                    fontSize: 14,
                    color: '#f5f5f5',
                    textAlign: 'center',
                  }}>
                  {labelCTA ? labelCTA : 'OK'}
                </Text>
              </Button>
            )}
            <Button
              mode="contained"
              style={{
                backgroundColor: color.divider,
                width: '48%',
              }}
              onPress={() => {
                onChangePopupVisibility(false);
                onPressCancel && onPressCancel();
              }}>
              <Text
                style={{
                  fontFamily: POPPINS_REGULAR,
                  fontSize: 14,
                  color: color.onBackground_light,
                  textAlign: 'center',
                }}>
                {labelCancel ? labelCancel : 'Close'}
              </Text>
            </Button>
          </View>
        </View>
      </ModalContent>
    </Modal>
  );
};

export default PopUpMessage;
