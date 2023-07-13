import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import ChatListComponent from '../../components/ChatList';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../navigations/ChatNavigator';
import {useIsFocused, useTheme} from '@react-navigation/native';

type ChatRoomScreenProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatList'>;
};

const ChatListScreen: React.FC<ChatRoomScreenProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  const color = useTheme().colors.customColors;
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: color.background_bottomNav,
          minHeight: 56,
          maxHeight: 80,
        },
      });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  }, [isFocused]);
  return <ChatListComponent navigation={navigation} />;
};

export default ChatListScreen;
