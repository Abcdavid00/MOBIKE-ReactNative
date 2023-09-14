import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  ListRenderItem,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {RouteProp, useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import TextField from '../common/textField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/theme/colors';
import {ThemeState} from '../../redux/slice/themeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sendMessage} from '../../services/ChatDrawer';
import {Message} from '../../redux/slice/messageSlice';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {GetUserInfo} from '../../backendAPI';
import {userInfoType} from '../ChatList';

type ChatRoomComponentProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatRoom'>;
  roomID: string;
  sellerID: number;
};

const ChatRoomComponent: React.FC<ChatRoomComponentProps> = ({
  navigation,
  roomID,
  sellerID,
}) => {
  const uid = store.getState().auth.ID;
  const [sellerInfo, setSellerInfo] = useState<userInfoType>();
  const getUserInfo = async (userID: number) => {
    let result = await GetUserInfo(userID);
    setSellerInfo(result);
  };
  useEffect(() => {
    console.log('Render first time');
    getUserInfo(sellerID);
  }, []);

  const messages = useSelector<RootState, Message[]>(
    state => state.message[roomID],
  );

  const color = useTheme().colors.customColors;

  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Send Message: ' + currentMessage);
    sendMessage(roomID, currentMessage);
    setCurrentMessage('');
  };

  const renderItem: ListRenderItem<Message> = ({item}) => {
    const isOwnMessage = item.senderId == uid;
    return (
      <View>
        {/* <Text
          style={{
            textAlign: 'center',
            // height: 0,
          }}>
          {item.timestamp?.toLocaleString()}
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 5,
            justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
          }}>
          <TouchableOpacity
            // onPress={() => {
            //   handleShowTime(item);
            // }}
            style={{
              maxWidth: '70%',
              backgroundColor: isOwnMessage ? color.secondary : color.divider,
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: isOwnMessage ? color.onSecondary : color.onBackground,
              }}>
              {item.content}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      {/* <View
        style={{
          // Header
          height: '10%',
          backgroundColor: 'pink',
        }}>
        <Text>Chat Room</Text>
        <Text>RoomID: {roomID}</Text>
        <Text>UID: {uid}</Text>
      </View> */}
      <View style={styles.wrapperHeader}>
        <Pressable
          onPress={onBack}
          style={{
            height: 70,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SimpleLineIcons
            name="arrow-left"
            color={color.onBackground_light}
            size={20}
          />
        </Pressable>
        <View
          style={{
            height: 70,
            width: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.textHeader, {color: color.onBackground}]}>
            {sellerInfo?.accountinfo.Name}
          </Text>
        </View>

        <View
          style={{
            height: 70,
            width: 50,
          }}
        />
      </View>

      <View></View>

      <View
        style={{
          // Messages
          height: '80%',
        }}>
        <FlatList
          data={messages}
          renderItem={renderItem}
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
          backgroundColor: color.background,
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
          value={currentMessage}
          spellCheck={false}
          style={{
            width: '85%',
          }}
        />

        <Pressable
          style={{
            width: '15%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 8,
          }}
          onPress={handleSendMessage}>
          <Ionicons name="send" color={color.primary} size={28} />
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
