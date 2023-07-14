import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../assets/theme/colors';
import PostRoute from './PostRoute';
import {StackNavigationProp} from '@react-navigation/stack';
import {ApplicatonAdminStackParamList} from '../../navigations/AdminApplicationNavigator';
import {useTheme} from '@react-navigation/native';
import {AppAdminGetInactivePost, AppAdminGetPost} from '../../backendAPI';
import PostPreview, {PostPreviewType} from '../PostPreview';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import {POST_DETAIL, POST_DETAIL_NAVIGATOR} from '../../constants/routeNames';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {signOut} from '../../services/TokenStorage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '../../assets/fonts';

const widthScreen = Dimensions.get('window').width;

type ApplicationAdminComponentProps = {
  navigation: StackNavigationProp<
    ApplicatonAdminStackParamList,
    'ApplicationAdmin'
  >;
};

const ApplicationAdminComponent: React.FC<ApplicationAdminComponentProps> = ({
  navigation,
}) => {
  useEffect(() => {
    getInactivePostList();
  }, []);

  const getInactivePostList = async () => {
    const postListTmp = await AppAdminGetInactivePost();

    let tmp: Array<PostPreviewType> = [];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(await AppAdminGetPost(postListTmp[i].ID_Post));
    }
    setPostList(tmp);
    setIsLoading(false);
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getInactivePostList();
  }, []);

  const [postList, setPostList] = React.useState<Array<PostPreviewType>>([]);
  const color = useTheme().colors.customColors;

  const renderItem: ListRenderItem<PostPreviewType> = ({item, index}) => {
    return (
      <PostPreview
        postID={item.post.ID}
        post={item}
        key={index}
        styleWrapper={{marginTop: 13}}
        isActivePost={true}
        pressable={true}
        onPress={() => {
          navigation.navigate(POST_DETAIL_NAVIGATOR, {
            screen: POST_DETAIL,
            params: {
              postID: item.post.ID,
              isActivePost: true,
              isAdmin: true,
            },
          });
        }}
        index={index}
        color={color}
      />
    );
  };

  const keyExtractor = (item: PostPreviewType) => {
    return item.post.ID.toString();
  };

  const onLogOut = () => {
    signOut();
  };

  const [isLoading, setIsLoading] = React.useState(true);

  const renderHeader = () => (
    <View>
      <View style={styles.wrapperHeader}>
        <Pressable
          onPress={onLogOut}
          style={{
            height: 70,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="logout"
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
            Inactive Posts
          </Text>
        </View>

        <View
          style={{
            height: 70,
            width: 50,
          }}
        />
      </View>
    </View>
  );

  return (
    <View
      style={{
        height: '100%',
        position: 'relative',
        flex: 1,
        backgroundColor: color.background,
      }}>
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
        data={postList}
        ListHeaderComponent={renderHeader()}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
          return <View style={{height: 100}} />;
        }}
      />
    </View>
  );
};

export default ApplicationAdminComponent;

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
  resetText: {
    fontSize: getFontSize(14),
    fontFamily: POPPINS_MEDIUM,
    marginTop: 4,
    height: 24,
  },
});
