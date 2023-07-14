import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {FAB} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../../../assets/theme/colors';
import {
  DeactivatePost,
  GetPersonalPost,
  GetPersonalPostDetail,
  SoldPost,
} from '../../../backendAPI';
import {
  ADD_POST,
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
} from '../../../constants/routeNames';
import {selectPost} from '../../../redux/slice/selectedPostSlice';
import Container from '../../common/container';

import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../../navigations/YourPostsNavigator';
import PostPreviewList from '../../PostPreviewList';
import PostPreview, {PostPreviewType} from '../../PostPreview';
import {personalPostInfoType} from '../../PostDetail';
import PostPreviewLoader from '../../common/contentLoader/postPreview';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../../assets/fonts';
import PopUpLoading from '../../common/popupLoading';
import PopUpMessage from '../../common/popupMessage';

const widthScreen = Dimensions.get('window').width;

type ActiveRouteProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'YourPosts'>;
};

const ActiveRoute: React.FC<ActiveRouteProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);
  useEffect(() => {
    if (isFocused) {
      getPersonalPost();
    }
  }, [isFocused]);

  const getPostDetailPersonal = async (ID: number) => {
    return await GetPersonalPostDetail(ID);
  };

  const getPersonalPost = async () => {
    const postListTmp = await GetPersonalPost();
    let postListID: Array<number> = [];
    Object.values(postListTmp.active).forEach((item: any) => {
      postListID.push(item.ID);
    });

    let activePostListTmp: Array<personalPostInfoType> = [];
    for (let i = 0; i < postListID.length; i++) {
      activePostListTmp.push(await getPostDetailPersonal(postListID[i]));
    }
    setActivePostList(activePostListTmp);
    setIsLoading(false);
    setRefreshing(false);
    if (activePostListTmp.length == 0) setIsEmpty(true);
  };

  const [activePostList, setActivePostList] = React.useState<
    Array<personalPostInfoType>
  >([]);

  const onViewDetail = (ID: number) => {
    navigation.navigate(POST_DETAIL_NAVIGATOR, {
      screen: POST_DETAIL,
      params: {
        postID: ID,
        isActivePost: false,
        isAdmin: false,
      },
    });
  };

  const onSold = async (ID: number) => {
    setIsLoadingPopup(true);
    const res = await SoldPost(ID);
    setIsLoadingPopup(false);
    if (res) {
      setIsSuccess(true);
      setTextSuccess('Change post status successfully');
      getPersonalPost();
    } else {
      setIsError(true);
      setTextError('Change post status failed');
    }
  };

  const onDeactivate = async (ID: number) => {
    setIsLoadingPopup(true);
    const res = await DeactivatePost(ID);
    setIsLoadingPopup(false);
    if (res) {
      setIsSuccess(true);
      setTextSuccess('Change post status successfully');
      getPersonalPost();
    } else {
      setIsError(true);
      setTextError('Change post status failed');
    }
  };

  const renderItem: ListRenderItem<personalPostInfoType> = ({item, index}) => {
    return (
      <ContextMenu
        actions={[
          {title: 'View Detail'},
          {title: 'Sold'},
          {title: 'Deactivated'},
        ]}
        onPress={e => {
          if (e.nativeEvent.index == 0) {
            onViewDetail(item.post.ID);
          } else if (e.nativeEvent.index == 1) {
            onSold(item.post.ID);
          } else if (e.nativeEvent.index == 2) {
            onDeactivate(item.post.ID);
          }
        }}
        dropdownMenuMode={true}
        key={index}>
        <PostPreview
          postID={item.post.ID}
          post={item}
          key={index}
          styleWrapper={{marginTop: 13}}
          isActivePost={true}
          pressable={true}
          onPress={() => {}}
          index={index}
          color={color}
        />
      </ContextMenu>
    );
  };

  const keyExtractor = (item: personalPostInfoType) => {
    return item.post.ID.toString();
  };

  //Popup message
  const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
  const onChangeLoadingState = (x: boolean) => {
    setIsLoadingPopup(x);
  };

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [textSuccess, setTextSuccess] = useState<string>('');
  const onChangeSuccessState = (x: boolean) => {
    setIsSuccess(x);
  };
  const [isError, setIsError] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>('');
  const onChangeErrorState = (x: boolean) => {
    setIsError(x);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPersonalPost();
  }, []);

  const color = useTheme().colors.customColors;
  return (
    <View
      style={{
        backgroundColor: color.background,
        height: '100%',
        flex: 1,
      }}>
      {/*Preview Post List */}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        columnWrapperStyle={{
          justifyContent: 'space-around',
          marginHorizontal: widthScreen * 0.01,
        }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        data={activePostList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={() => <View style={{height: 20}} />}
        ListFooterComponent={() => {
          if (isLoading) {
            const loadingArray = [1, 2, 3, 4, 5, 6];
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  marginHorizontal: widthScreen * 0.01,
                  marginBottom: 80,
                }}>
                {loadingArray.map((item, index) => (
                  <PostPreviewLoader key={item} />
                ))}
              </View>
            );
          }
          // if (isEmpty) {
          //   return (
          //     <View
          //       style={{
          //         width: '100%',
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         height: widthScreen,
          //         marginLeft: widthScreen * -0.01,
          //         backgroundColor: color.background,
          //       }}>
          //       <Image
          //         source={require('../../../assets/images/out-of-stock.png')}
          //         style={{width: '30%', height: '30%'}}
          //       />
          //       <Text
          //         style={{
          //           fontSize: getFontSize(16),
          //           fontFamily: POPPINS_MEDIUM,
          //           textAlign: 'center',
          //           marginTop: '5%',
          //           color: color.onBackground,
          //         }}>
          //         No active posts
          //       </Text>
          //     </View>
          //   );
          // }
          return <View style={{height: 100}} />;
        }}
      />
      <PopUpLoading
        text={'Changing...'}
        visibility={isLoadingPopup}
        onChangePopupVisibility={onChangeLoadingState}
      />
      <PopUpMessage
        message={textSuccess}
        type={'success'}
        visibility={isSuccess}
        onChangePopupVisibility={onChangeSuccessState}
        havingTwoButton={true}
        labelCTA="Ok"
      />
      <PopUpMessage
        message={textError}
        type={'error'}
        visibility={isError}
        onChangePopupVisibility={onChangeErrorState}
        havingTwoButton={true}
        labelCTA="Ok"
      />
    </View>
  );
};

export default React.memo(ActiveRoute);
