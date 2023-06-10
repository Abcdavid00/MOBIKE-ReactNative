import {
  CHAT_LIST,
  CHAT_ROOM,
} from '../constants/routeNames';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChatListScreen from '../screens/ChatList';
import ChatRoomScreen from '../screens/ChatRoom';

export type MarketplaceStackParamList = {
  [CHAT_LIST]: undefined;
  [CHAT_ROOM]: undefined;
};

const ChatStack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator
      initialRouteName={CHAT_LIST}
      screenOptions={{headerShown: false}}>
      <ChatStack.Screen name={CHAT_LIST} component={ChatListScreen} />
      <ChatStack.Screen name={CHAT_ROOM} component={ChatRoomScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
