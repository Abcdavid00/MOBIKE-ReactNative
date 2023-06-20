import {View, Text} from 'react-native';
import React from 'react';
import ChatRoomComponent from '../../components/ChatRoom';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState} from '../../redux/store';
import {ChatStackParamList} from '../../navigations/ChatNavigator';

type ChatRoomScreenProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatRoom'>;
};

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({navigation}) => {
  return <ChatRoomComponent navigation={navigation} />;
};

export default ChatRoomScreen;
