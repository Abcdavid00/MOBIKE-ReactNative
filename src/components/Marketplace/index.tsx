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
import React, {useState} from 'react';
import Container from '../common/container';
import colors from '../../assets/theme/colors';
import Carousel from '../Banner/carousel';
import imageBanner from '../../data/imageBanner';
import CategoryList from '../CategoryList/flatList';
import {RootState} from '../../redux/store';
import {
  POST_DETAIL_NAVIGATOR,
  PRODUCT_LIST,
  SEARCH,
} from '../../constants/routeNames';
import {useDispatch, useSelector} from 'react-redux';
import {setInitial} from '../../redux/slice/filterSlice';
import {GetAllPosts} from '../../backendAPI';
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
import PostPreview from '../PostPreview/listItem';
import {setSort} from '../../redux/slice/sortSlice';

const widthScreen = Dimensions.get('window').width;
const ITEM_HEIGHT = widthScreen * 0.42 * 1.45;

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
      page ? 'page=' + page.toString() : '',
    );
    // console.log('postList: ' + JSON.stringify(postListTmp));
    console.log('Page: ' + page);
    let tmp: Array<number> = [...postList];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(postListTmp[i].ID);
    }
    setPostList(tmp);
    setIsLoading(false);
  };

  const [postList, setPostList] = React.useState<Array<number>>([]);

  const onNavigateProductList = () => {
    navigation.navigate(PRODUCT_LIST);
  };

  const onNavigateSearch = () => {
    navigation.navigate(SEARCH);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const loadingArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  //Infinite Scroll
  const [page, setPage] = useState(1);
  const [isScrollEndReached, setIsScrollEndReached] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (
      offsetY + layoutHeight >= contentHeight - 100 &&
      !isScrollEndReached &&
      !isLoading
    ) {
      setIsScrollEndReached(true);
      setIsLoading(true);
      setPage(page + 1);
    }
  };

  // useEffect(() => {
  //   if (isScrollEndReached) {
  //     console.log('page: ' + page);
  //     setIsScrollEndReached(false);
  //     getFilterPostList(page);
  //     setPage(page + 1);
  //   }
  // }, [isScrollEndReached]);

  // const renderItemPostPreview: ListRenderItem<number> = ({item, index}) => (
  //   <PostPreview
  //     postID={item}
  //     key={item}
  //     styleWrapper={{marginTop: 13}}
  //     isActivePost={true}
  //     pressable={true}
  //     onPress={() => {
  //       navigation.navigate(POST_DETAIL_NAVIGATOR);
  //     }}
  //     index={index}
  //   />
  // );

  // const keyExtractorPostPreview = (item: number) => {
  //   return item.toString();
  // };

  // const getItemLayout = (data: number[] | undefined | null, index: number) => ({
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT * index,
  //   index,
  // });

  // const onEndReached = ({distanceFromEnd}: {distanceFromEnd: number}) => {
  //   if (distanceFromEnd < 0) return;
  //   console.log('isScrollEnd :' + isScrollEndReached);
  //   if (!isScrollEndReached) {
  //   setIsLoading(true);
  //   setIsScrollEndReached(true);
  //   getFilterPostList(page);
  //   setPage(page + 1);
  //   }
  // };

  const {height} = Dimensions.get('window');

  return (
    <Container
      keyboardShouldPersistTaps="always"
      // onScroll={handleScroll}
      styleScrollView={{
        backgroundColor: color.background,
        height: height,
        flex: 1,
      }}
      styleWrapper={{}}>
      {/* Header */}
      <View style={styles.wrapperHeader}>
        <TextField
          label={'What are you looking for ?'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={color.primary}
          style={{width: '85%'}}
          onTouchEnd={onNavigateSearch}
        />
        <Pressable>
          <Ionicons
            name="notifications-outline"
            color={color.onBackground_light}
            size={28}
          />
        </Pressable>
      </View>

      {/* Banner */}
      <Carousel data={imageBanner} />

      {/*Vehicle Type*/}
      <View>
        <Text style={[styles.vehicleTypeHeading, {color: color.onBackground}]}>
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
        <Text style={[styles.mostRecentlyHeading, {color: color.onBackground}]}>
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

      {/*Preview Post List */}

      <View style={{marginLeft: widthScreen * 0.01}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {postList.map((item, index) => {
            return (
              <PostPreview
                postID={item}
                key={index}
                styleWrapper={{marginTop: 13}}
                isActivePost={true}
                pressable={true}
                onPress={() => {
                  navigation.navigate(POST_DETAIL_NAVIGATOR);
                }}
                index={index}
              />
            );
          })}
          {isLoading &&
            loadingArray.map((item, index) => (
              <PostPreviewLoader key={index} />
            ))}
        </View>
      </View>

      {/* <FlatList
        data={postList}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={keyExtractorPostPreview}
        renderItem={renderItemPostPreview}
        ListFooterComponent={isLoading ? <PostPreviewLoader /> : null}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          setIsScrollEndReached(false);
        }}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      /> */}
    </Container>
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
