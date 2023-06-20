import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../navigations/ChatNavigator';
import {Room} from '../../redux/slice/roomSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import Container from '../common/container';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_BOLD} from '../../assets/fonts';

type ChatRoomComponentProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatRoom'>;
};

const ChatRoomComponent: React.FC<ChatRoomComponentProps> = ({navigation}) => {
  return <Text>Chat Room</Text>;
};

export default ChatRoomComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  textHeader: {
    fontSize: getFontSize(18),
    fontFamily: POPPINS_BOLD,
    height: 24,
  },
});
