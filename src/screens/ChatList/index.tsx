import {View, Text} from 'react-native';
import React from 'react';
import ChatListComponent from '../../components/ChatList';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../navigations/ChatNavigator';

type ChatRoomScreenProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatList'>;
};

const ChatListScreen: React.FC<ChatRoomScreenProps> = ({navigation}) => {
  return <ChatListComponent navigation={navigation} />;
};

export default ChatListScreen;
