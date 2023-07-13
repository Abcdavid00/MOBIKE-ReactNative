import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {SavedPostStackParamList} from '../../navigations/SavedPostNavigator';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ColorThemeProps} from '../../assets/theme/colors';
import {getThemeColor} from '../../utils/getThemeColor';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {
  POPPINS_BOLD,
  POPPINS_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import Container from '../common/container';
import {POST_DETAIL, POST_DETAIL_NAVIGATOR} from '../../constants/routeNames';
import {GetLikedPosts, GetPost} from '../../backendAPI';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import {getSavedPostList} from '../../services/SavedPost';
import PostPreview, {PostPreviewType} from '../PostPreview';
import {useIsFocused, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type SavedPostComponentProps = {
  navigation: StackNavigationProp<SavedPostStackParamList, 'SavedPost'>;
};

const widthScreen = Dimensions.get('window').width;

const SavedPostComponent: React.FC<SavedPostComponentProps> = ({
  navigation,
}) => {
  const onGoBack = () => {
    navigation.goBack();
  };
  const color = useTheme().colors.customColors;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const postListTmp = await getSavedPostList();
    let tmp: PostPreviewType[] = [];
    if (postListTmp) {
      for (let i = 0; i < postListTmp?.length; i++) {
        const post = await GetPost(postListTmp[i]);
        if (post) {
          tmp.push(post);
        }
      }
      setPostList(tmp);
    }
    setIsLoading(false);
  };

  const [postList, setPostList] = React.useState<Array<PostPreviewType>>([]);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
              isAdmin: false,
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

  const renderHeader = () => {
    return (
      <View style={styles.wrapperHeader}>
        <Pressable
          onPress={onGoBack}
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
            Saved Post
          </Text>
        </View>

        <View
          style={{
            height: 70,
            width: 50,
          }}
        />
      </View>
    );
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  return (
    <View style={{backgroundColor: color.background, flex: 1, height: '100%'}}>

      <FlatList
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
            const loadingArray = [1, 2];
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  marginHorizontal: widthScreen * 0.01,
                }}>
                {loadingArray.map((item, index) => (
                  <PostPreviewLoader key={item} />
                ))}
              </View>
            );
          }
          if (postList.length == 0) {
            return (
              <View
                style={{
                  height: widthScreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/out-of-stock.png')}
                  style={{width: 100, height: 100, resizeMode: 'center'}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: POPPINS_REGULAR,
                    fontSize: getFontSize(14),
                    color: color.onBackground_light,
                    marginTop: 20,
                    marginHorizontal: 24,
                  }}>
                  {'You have not saved any posts yet. Click on the Save Post '}
                  <Ionicons
                    name={'heart'}
                    size={16}
                    color={color.error}
                    style={{marginHorizontal: 4}}
                  />
                  {' button in the post to save it and watch it later'}
                </Text>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

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

export default SavedPostComponent;
