import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChatStackParamList} from '../../navigations/ChatNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {Room} from '../../redux/slice/roomSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import Container from '../common/container';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {
  POPPINS_BOLD,
  POPPINS_LIGHT_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
} from '../../assets/fonts';
import MobikeImage from '../common/image';
import {Pressable} from 'react-native';
import {CHAT_ROOM} from '../../constants/routeNames';

type ChatListComponentProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'ChatList'>;
};
const ChatListComponent: React.FC<ChatListComponentProps> = ({navigation}) => {
  const data: Room[] = [
    {
      postTitle: 'MotorBike afwfawfawaaaaaaaaaaaaaaaaaaa',
      users: [6, 152],
      latestMessage: 'Hello friend',
      latestTimestamp: new Date('2023-05-31T12:34:56'),
      imageId: 1,
    },
    {
      postTitle: 'MotorBike 1111111111111111111111111111',
      users: [6, 152],
      latestMessage: 'Hello friend',
      latestTimestamp: new Date('2023-09-20T21:15:40'),
      imageId: 2,
    },
    {
      postTitle: '1',
      users: [6, 152],
      latestMessage:
        'Hello friend Hello friend Hello friend Hello friend Hello friend',
      latestTimestamp: new Date('2023-08-05T14:20:10'),
      imageId: 3,
    },
    {
      postTitle: '1',
      users: [6, 152],
      latestMessage: 'Hello friend',
      latestTimestamp: new Date('2023-07-10T18:45:23'),
      imageId: 4,
    },
    {
      postTitle: '1',
      users: [6, 152],
      latestMessage: 'Hello friend',
      latestTimestamp: new Date('2023-06-15T09:30:00'),
      imageId: 5,
    },
  ];

  const [chatRoomList, setChatRoomList] = useState<Room[]>([]);

  useEffect(() => {
    let arr: Room[] = Array.from(
      data.sort((a, b) => {
        if (a.latestTimestamp && b.latestTimestamp) {
          return b.latestTimestamp.getTime() - a.latestTimestamp.getTime();
        }
        return 0;
      }),
    );
    setChatRoomList(arr);
  }, []);

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );
  const truncateText = (text: string | null, maxLength: number) => {
    if (text == null) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const onPress = () => {
    navigation.navigate(CHAT_ROOM);
  };
  const _renderContent = (data: Room[]) => {
    if (data.length == 0) {
      return (
        <View style={{alignSelf: 'center'}}>
          <Text>Don't have any chat room</Text>
        </View>
      );
    } else {
      return (
        <View>
          {data.map((item, index) => (
            <Pressable
              onPress={onPress}
              style={{
                flexDirection: 'row',
                marginVertical: 8,
                paddingHorizontal: '4%',
              }}>
              <MobikeImage imageID={item.imageId} avatar={true} />
              <View
                style={{justifyContent: 'center', flexGrow: 1, marginLeft: 12}}>
                <Text
                  style={{
                    fontSize: getFontSize(16),
                    fontFamily: POPPINS_MEDIUM,
                    color: color.onBackground,
                  }}>
                  {truncateText(item.postTitle, 26)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: getFontSize(14),
                      fontFamily: POPPINS_REGULAR,
                      color: color.onBackground_light,
                    }}>
                    {truncateText(item.latestMessage, 24)}
                  </Text>
                  <Text
                    style={{
                      fontSize: getFontSize(12),
                      fontFamily: POPPINS_LIGHT_ITALIC,
                      color: color.onBackground_light,
                    }}>
                    {item.latestTimestamp?.getDay().toString() +
                      '/' +
                      item.latestTimestamp?.getMonth().toString() +
                      '/' +
                      item.latestTimestamp?.getFullYear().toString()}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
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
            Chat
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
