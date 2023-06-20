import {View, Text} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../navigations/ChatNavigator';

type ChatRoomScreenProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatRoom'>;
};

const ChatRoomComponent: React.FC<ChatRoomScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>ChatRoomComponent</Text>
    </View>
  );
};

export default ChatRoomComponent;
