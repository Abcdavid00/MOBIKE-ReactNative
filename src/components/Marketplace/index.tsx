import {
  View,
  Text,
  Pressable,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../common/container';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import Carousel from '../Banner/carousel';
import imageBanner from '../../data/imageBanner';
import CategoryList from '../CategoryList/flatList';
import {RootState} from '../../redux/store';
import {
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
  PRODUCT_LIST,
  SEARCH,
} from '../../constants/routeNames';
import {useDispatch, useSelector} from 'react-redux';
import {setInitial} from '../../redux/slice/filterSlice';
import {
  AppAdminGetPost,
  GetAllPosts,
  GetPersonalPostDetail,
  GetPost,
} from '../../backendAPI';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {ThemeState} from '../../redux/slice/themeSlice';
import TextField from '../common/textField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {POPPINS_BOLD, POPPINS_ITALIC} from '../../assets/fonts';
import {vehicleType} from '../../redux/clientDatabase/vehicleType';
import {imageVehicleTypes} from '../../data/imageVehicleTypes';
import {getFontSize} from '../../utils/fontSizeResponsive';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import PostPreview from '../PostPreview';
import {setSort} from '../../redux/slice/sortSlice';
import {PostPreviewType} from '../PostPreview';
import {selectPost} from '../../redux/slice/selectedPostSlice';
import PostPreviewList from '../PostPreviewList';
import {useTheme} from '@react-navigation/native';
import {getThemeColor} from '../../utils/getThemeColor';
import {personalInfoState} from '../../redux/clientDatabase/personalInfo';

const widthScreen = Dimensions.get('window').width;

type MarketplaceComponentProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Marketplace'>;
};

const MarketplaceComponent: React.FC<MarketplaceComponentProps> = ({
  navigation,
}) => {
  const dataType = useSelector<RootState, vehicleType[]>(
    state => state.vehicleTypes,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getFilterPostList(page);
  }, []);

  const getFilterPostList = async (page?: number) => {
    const postListTmp = await GetAllPosts(
      'order=desc&' + (page ? 'page=' + page.toString() : ''),
    );
    console.log('Page: ' + page);
    // console.log('postList: ' + JSON.stringify(postListTmp));
    let tmp: Array<PostPreviewType> = [...postList];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(await getPost(postListTmp[i].ID));
    }
    setPostList(tmp);
    // setIsLoading(false);
    if (postListTmp.length == 0) {
      setIsEnd(true);
    }
  };

  const [postList, setPostList] = React.useState<Array<PostPreviewType>>([]);

  const onNavigateProductList = () => {
    navigation.navigate(PRODUCT_LIST);
  };

  const onNavigateSearch = () => {
    navigation.navigate(SEARCH);
  };

  // const [isLoading, setIsLoading] = React.useState(true);
  const loadingArray = [1, 2, 3, 4, 5, 6];

  // const color = useTheme().colors.customColors;
  const color = useTheme().colors.customColors;

  //Infinite Scroll
  const [page, setPage] = useState(1);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState<boolean>(true);

  useEffect(() => {
    if (page != 1) {
      getFilterPostList(page);
    }
  }, [page]);

  const userPersonalInfo = useSelector<RootState, personalInfoState>(
    state => state.personalInfo,
  );

  const renderItemPostPreview: ListRenderItem<PostPreviewType> = ({
    item,
    index,
  }) => (
    <PostPreview
      postID={item.post.ID}
      post={item}
      key={item.post.ID}
      styleWrapper={{marginTop: 13}}
      isActivePost={true}
      pressable={true}
      onPress={() => {
        navigation.navigate(POST_DETAIL_NAVIGATOR, {
          screen: POST_DETAIL,
          params: {
            postID: item.post.ID,
            isActivePost: item.user.ID == userPersonalInfo.ID ? false : true,
            isAdmin: false,
          },
        });
      }}
      index={index}
      color={color}
    />
  );

  const keyExtractorPostPreview = (item: PostPreviewType) => {
    return item.post.ID.toString();
  };

  const onEndReached = () => {
    if (
      !onEndReachedCalledDuringMomentum
      // && !isLoading
    ) {
      setPage(page + 1);
      setOnEndReachedCalledDuringMomentum(true);
      // setIsLoading(true);
    }
  };

  const onMomentumScrollBegin = () => {
    setOnEndReachedCalledDuringMomentum(false);
  };

  //Prepare data for post preview
  const getPost = async (postID: number) => {
    const post = await GetPost(postID);
    return post;
  };

  //End of List
  const [isEnd, setIsEnd] = useState<boolean>(false);

  // render header
  const renderHeader = () => {
    return (
      <View style={{marginBottom: 10}}>
        {/* Header */}
        <View style={styles.wrapperHeader}>
          <TextField
            label={'What are you looking for ?'}
            iconClass={Ionicons}
            iconName={'search-outline'}
            iconColor={color.primary}
            style={{width: '90%'}}
            onTouchEnd={onNavigateSearch}
          />
          {/* <Pressable>
            <Ionicons
              name="notifications-outline"
              color={color.onBackground_light}
              size={28}
            />
          </Pressable> */}
        </View>

        {/* Banner */}
        <Carousel data={imageBanner} />

        {/*Vehicle Type*/}
        <View>
          <Text
            style={[styles.vehicleTypeHeading, {color: color.onBackground}]}>
            Vehicle Types
          </Text>
          <CategoryList
            data={dataType}
            type={'navigate'}
            onNavigate={onNavigateProductList}
            renderItem={undefined}
            imageVehicleTypes={imageVehicleTypes}
          />
        </View>

        {/* Most Recent Title */}
        <View style={styles.mostRecentlyHeadingWrapper}>
          <Text
            style={[styles.mostRecentlyHeading, {color: color.onBackground}]}>
            Most Recent
          </Text>
          <Pressable
            onPress={() => {
              onNavigateProductList();
              dispatch(setInitial);
              dispatch(setSort(2));
            }}>
            <Text style={[styles.seeMoreHeading, {color: color.text}]}>
              {'See more >'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: color.background,
        height: '100%',
        flex: 1,
      }}>
      {/* Preview Post List */}
      <PostPreviewList
        data={postList}
        onEndReached={onEndReached}
        onMomentumScrollBegin={onMomentumScrollBegin}
        renderItem={renderItemPostPreview}
        keyExtractor={keyExtractorPostPreview}
        ListHeaderComponent={renderHeader()}
        isEnd={isEnd}
        color={color}
      />
    </View>
  );
};

export default MarketplaceComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    paddingLeft: '6%',
    paddingEnd: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleTypeHeading: {
    fontSize: 16,
    fontFamily: POPPINS_BOLD,
    paddingLeft: '6%',
    marginTop: 5,
    marginBottom: 7,
  },
  mostRecentlyHeadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  mostRecentlyHeading: {
    fontSize: getFontSize(16),
    fontFamily: POPPINS_BOLD,
  },
  seeMoreHeading: {
    fontSize: getFontSize(14),
    fontFamily: POPPINS_ITALIC,
  },
});
