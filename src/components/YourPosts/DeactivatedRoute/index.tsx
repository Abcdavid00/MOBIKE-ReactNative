import React from 'react';
import {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  RefreshControl,
  View,
} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {GetPersonalPost, GetPersonalPostDetail} from '../../../backendAPI';
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
import {Text} from 'react-native';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {POPPINS_MEDIUM, POPPINS_SEMI_BOLD} from '../../../assets/fonts';

const widthScreen = Dimensions.get('window').width;

type DeactivatedRouteProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'YourPosts'>;
};

const DeactivatedRoute: React.FC<DeactivatedRouteProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);
  useEffect(() => {
    if (isFocused) {
      console.log('Sold Tab');
      getPersonalPost();
    }
  }, [isFocused]);

  const getPostDetailPersonal = async (ID: number) => {
    return await GetPersonalPostDetail(ID);
  };

  const getPersonalPost = async () => {
    const postListTmp = await GetPersonalPost();
    let postListID: Array<number> = [];
    Object.values(postListTmp.deactivated).forEach((item: any) => {
      //   console.log('Sold ID :' + item.ID);
      postListID.push(item.ID);
    });

    let deactivatedPostListTmp: Array<personalPostInfoType> = [];
    for (let i = 0; i < postListID.length; i++) {
      deactivatedPostListTmp.push(await getPostDetailPersonal(postListID[i]));
    }
    setDeactivatedPostList(deactivatedPostListTmp);
    setIsLoading(false);
    setRefreshing(false);
    if (deactivatedPostListTmp.length == 0) setIsEmpty(true);
  };

  const [deactivatedPostList, setDeactivatedPostList] = React.useState<
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

  const renderItem: ListRenderItem<personalPostInfoType> = ({item, index}) => {
    return (
      <ContextMenu
        actions={[{title: 'View Detail'}]}
        onPress={e => {
          if (e.nativeEvent.index == 0) {
            onViewDetail(item.post.ID);
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
        data={deactivatedPostList}
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
          //         No deactivated posts
          //       </Text>
          //     </View>
          //   );
          // }
          return <View style={{height: 100}} />;
        }}
      />
    </View>
  );
};

export default DeactivatedRoute;
