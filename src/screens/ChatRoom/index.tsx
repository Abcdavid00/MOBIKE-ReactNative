import {View, Text} from 'react-native';
import React from 'react';
import ChatRoomComponent from '../../components/ChatRoom';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState} from '../../redux/store';
import {ChatStackParamList} from '../../navigations/ChatNavigator';

// type ChatRoomScreenProps = {
//   navigation: StackNavigationProp<ChatStackParamList, 'ChatRoom'>;
// };

import { RoomStackScreenProps } from '../../navigations/ChatNavigator';

const ChatRoomScreen: React.FC<RoomStackScreenProps> = ({navigation, route}) => {
  const roomID = route.params.roomID;
  return <ChatRoomComponent navigation={navigation} roomID={roomID} />;
};

export default ChatRoomScreen;
