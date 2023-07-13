import {View, Text, StyleSheet, Animated, TouchableOpacity, Pressable, KeyboardAvoidingView} from 'react-native';
import React, {useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../navigations/ChatNavigator';
import {Room} from '../../redux/slice/roomSlice';
import {useSelector} from 'react-redux';
import store, {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import Container from '../common/container';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_BOLD} from '../../assets/fonts';
import {RouteProp} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import TextField from '../common/textField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/theme/colors';
import {ThemeState} from '../../redux/slice/themeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sendMessage } from '../../services/ChatDrawer';

type ChatRoomComponentProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatRoom'>;
  roomID: string;
};

const ChatRoomComponent: React.FC<ChatRoomComponentProps> = ({
  navigation,
  roomID,
}) => {
  const uid = store.getState().auth.ID;

  const messages = useSelector((state: RootState) => state.message[roomID]);

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Send Message: ' + currentMessage);
    sendMessage(roomID, currentMessage);
    setCurrentMessage('');
  }

  return (
    <View>
      <View
        style={{
          // Header
          height: '10%',
          backgroundColor: 'pink',
        }}>
        <Text>Chat Room</Text>
        <Text>RoomID: {roomID}</Text>
        <Text>UID: {uid}</Text>
      </View>

      <View
        style={{
          // Messages
          height: '80%',
        }}>
        <FlatList
          data={messages}
          renderItem={({item}) => {
            const isOwnMessage = item.senderId == uid;
            return (
              <View key="abc">
                <Text
                  style={{
                    textAlign: 'center',
                    height: 0,
                  }}>
                  {item.timestamp?.toLocaleString()}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginVertical: 5,
                    justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                    // backgroundColor: "black"
                  }}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   handleShowTime(item);
                    // }}
                    style={{
                      maxWidth: '70%',
                      backgroundColor: 'pink',
                      padding: 10,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}>
                    <Text>{item.content}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
          style={{
            height: 500,
            width: '100%',
            paddingHorizontal: '2%',
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{
          // Input
          height: '10%',
          backgroundColor: 'pink',
          paddingHorizontal: '2%',
          flexDirection: 'row',
        }}>
        <TextField
          label=""
          iconClass={MaterialCommunityIcons}
          iconName="email"
          iconColor={color.primary}
          iconSize={20}
          onChangeText={value => {
            setCurrentMessage(value);
          }}
          maxLength={32}
          value={currentMessage}
          spellCheck={false}
          style={{
            width: '85%',
          }}
        />

        <Pressable style={{
          width:'15%' ,
          height: '100%',
          backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleSendMessage}
        >
          <Ionicons
            name="notifications-outline"
            color={color.onBackground_light}

            size={28}
          />
          <Text>Hello</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
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
