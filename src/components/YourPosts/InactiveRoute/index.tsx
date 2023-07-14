import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {
  DeactivatePost,
  GetPersonalPost,
  GetPersonalPostDetail,
  SoldPost,
} from '../../../backendAPI';
import Container from '../../common/container';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../../navigations/YourPostsNavigator';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {personalPostInfoType} from '../../PostDetail';
import {
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
} from '../../../constants/routeNames';
import PostPreview from '../../PostPreview';
import PostPreviewLoader from '../../common/contentLoader/postPreview';
import {Image} from 'react-native';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {POPPINS_MEDIUM, POPPINS_SEMI_BOLD} from '../../../assets/fonts';
import PopUpLoading from '../../common/popupLoading';
import PopUpMessage from '../../common/popupMessage';

const widthScreen = Dimensions.get('window').width;

type InActiveRouteProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'YourPosts'>;
};

const InactiveRoute: React.FC<InActiveRouteProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);
  useEffect(() => {
    if (isFocused) {
      console.log('Inactive Tab');
      getPersonalPost();
    }
  }, [isFocused]);

  const getPostDetailPersonal = async (ID: number) => {
    return await GetPersonalPostDetail(ID);
  };

  const getPersonalPost = async () => {
    const postListTmp = await GetPersonalPost();
    let postListID: Array<number> = [];
    Object.values(postListTmp.inactive).forEach((item: any) => {
      //   console.log('Inacive ID :' + item.ID);
      postListID.push(item.ID);
    });

    let inactivePostListTmp: Array<personalPostInfoType> = [];
    for (let i = 0; i < postListID.length; i++) {
      inactivePostListTmp.push(await getPostDetailPersonal(postListID[i]));
    }
    setInactivePostList(inactivePostListTmp);
    setIsLoading(false);
    setRefreshing(false);
    if (inactivePostListTmp.length == 0) setIsEmpty(true);
  };

  const [inactivePostList, setInactivePostList] = React.useState<
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

  const color = useTheme().colors.customColors;

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
        data={inactivePostList}
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
          //         No inactive posts
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

export default React.memo(InactiveRoute);
