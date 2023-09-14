import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChatStackParamList} from '../../navigations/ChatNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {Room, RoomDictionary} from '../../redux/slice/roomSlice';
import {useSelector} from 'react-redux';
import store, {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import Container from '../common/container';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {
  POPPINS_BOLD,
  POPPINS_LIGHT_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import MobikeImage from '../common/image';
import {Pressable} from 'react-native';
import {CHAT_ROOM} from '../../constants/routeNames';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {GetUserInfo} from '../../backendAPI';
import { FlatList } from 'react-native-gesture-handler';

const widthScreen = Dimensions.get('window').width;

type ChatListComponentProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatList'>;
};

export type userInfoType = {
  account: {
    ID: number;
    ID_AccountInfo: number;
    ID_Permission: number;
  };
  accountinfo: {
    Gender: number;
    ID: number;
    ID_Image_Profile: number;
    Name: string;
    Phone_number: string;
    Time_created: Date;
  };
  posts: Array<{
    ID: number;
    Pricetag: number;
    Time_created: Date;
    Title: string;
    rel_Image: Array<number>;
  }>;
};

const ChatListComponent: React.FC<ChatListComponentProps> = ({navigation}) => {
  const [chatRoomList, setChatRoomList] = useState<Room[]>([]);
  const [userInfoList, setUserInfoList] = useState<userInfoType[]>([]);
  const data = Object.values(
    useSelector<RootState, RoomDictionary>(state => state.room),
  );
  // console.log('ChatRooms: ' + JSON.stringify(store.getState().room));
  const dataState = useSelector<RootState, RoomDictionary>(state => state.room);

  useEffect(() => {
    getData();
  }, [dataState]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) getData();
  }, [isFocused]);
  const getData = async () => {
    let dataTmp = data
      .sort((a, b) => {
        if (a.latestTimestamp && b.latestTimestamp) {
          return b.latestTimestamp.getTime() - a.latestTimestamp.getTime();
        }
        return 0;
      })
      .map(item => item);
    // console.log('ChatList: ' + JSON.stringify(dataTmp));
    setChatRoomList(dataTmp);

    let userInfoListTmp: userInfoType[] = [];
    for (let i = 0; i < dataTmp.length; i++) {
      let sellerID =
        dataTmp[i].users[0] != uid ? dataTmp[i].users[0] : dataTmp[i].users[1];
      let sellerInfo = await getUserInfo(sellerID);
      userInfoListTmp.push(sellerInfo);
    }
    // console.log('Seller Info List : ' + JSON.stringify(userInfoListTmp));
    setUserInfoList(userInfoListTmp);
  };

  const color = useTheme().colors.customColors;
  const truncateText = (text: string | null, maxLength: number) => {
    if (text == null) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const onPress = (roomID: string, userID: number) => {
    navigation.navigate(CHAT_ROOM, {roomID: roomID, sellerID: userID});
  };
  const uid = store.getState().auth.ID;
  const getUserInfo = async (userID: number) => {
    let result = await GetUserInfo(userID);
    return result;
  };

  const renderTime = (date: Date | null) => {
    if (date == null) return '';
    const today = new Date();
    if (sameDate(today, date)) {
      return date.toLocaleTimeString();
    } else if (isYesterday(today, date)) {
      return 'Yesterday';
    } else {
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      );
    }
  };

  const sameDate = (a: Date, b: Date) => {
    if (
      a.getFullYear() == b.getFullYear() &&
      a.getMonth() == b.getMonth() &&
      a.getDate() == b.getDate()
    ) {
      return true;
    }
    return false;
  };

  const isYesterday = (today: Date, date: Date) => {
    if (
      today.getDate() - date.getDate() == 1 &&
      today.getMonth() == date.getMonth() &&
      today.getFullYear() == date.getFullYear()
    ) {
      return true;
    }
    return false;
  };

  const _renderContent = (data: Room[]) => {
    if (data.length == 0) {
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: widthScreen,
            marginLeft: widthScreen * -0.01,
            backgroundColor: color.background,
          }}>
          <Image
            source={require('../../assets/images/out-of-stock.png')}
            style={{width: '30%', height: '30%'}}
          />
          <Text
            style={{
              fontSize: getFontSize(16),
              fontFamily: POPPINS_MEDIUM,
              textAlign: 'center',
              marginTop: '5%',
              color: color.onBackground,
            }}>
            Don't have any chat rooms
          </Text>
        </View>
      );
    } else {
      console.log('Data: ' + JSON.stringify(data));
      return (
        <View>
          {data.map((item, index) => {
            const sellerInfo = userInfoList[index];
            return (
              <Pressable
                onPress={() => onPress(item.id, sellerInfo.accountinfo.ID)}
                key={index}
                style={{
                  flexDirection: 'row',
                  marginVertical: 8,
                  paddingHorizontal: '4%',
                }}>
                <MobikeImage
                  imageID={
                    sellerInfo && sellerInfo.accountinfo.ID_Image_Profile
                  }
                  avatar={true}
                  style={{
                    width: 52,
                    height: 52,
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    flexGrow: 1,
                    marginLeft: 12,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: getFontSize(16),
                        fontFamily: POPPINS_MEDIUM,
                        color: color.onBackground,
                      }}>
                      {truncateText(
                        sellerInfo && sellerInfo.accountinfo.Name,
                        15,
                      )}
                    </Text>
                    <Text
                      style={{
                        fontSize: getFontSize(12),
                        fontFamily: POPPINS_LIGHT_ITALIC,
                        color: color.onBackground_light,
                      }}>
                      {/* date and time*/}
                      {'  -  ' + renderTime(item.latestTimestamp)}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: getFontSize(14),
                      fontFamily: POPPINS_MEDIUM,
                      color: color.onBackground_light,
                      marginTop: -2,
                    }}>
                    {truncateText(item.postTitle, 20)}
                  </Text>
                  <Text
                    style={{
                      fontSize: getFontSize(14),
                      fontFamily: POPPINS_REGULAR,
                      color: color.onBackground,
                    }}>
                    {truncateText(item.latestMessage && item.latestMessage.content, 20)}
                  </Text>
                </View>
                <MobikeImage
                  imageID={item.imageId}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
              </Pressable>
            );
          })}
          {/* <FlatList

          /> */}
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: color.background, flex: 1}}>
      <View style={styles.wrapperHeader}>
        <View
          style={{
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.textHeader, {color: color.onBackground}]}>
            Chats
          </Text>
        </View>
      </View>

      <Container
        keyboardShouldPersistTaps="always"
        styleScrollView={{
          backgroundColor: color.background,
          marginTop: '2%',
        }}
        styleWrapper={{paddingBottom: '10%', paddingTop: '4%'}}>
        {_renderContent(chatRoomList)}
      </Container>
    </View>
  );
};

export default ChatListComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  textHeader: {
    fontSize: getFontSize(20),
    fontFamily: POPPINS_BOLD,
    height: 24,
  },
});
