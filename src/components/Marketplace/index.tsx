import {
  View,
  Text,
  Pressable,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
      page ? 'page=' + page.toString() : '',
    );
    console.log('postList: ' + JSON.stringify(postListTmp));
    let tmp: Array<number> = Array.from(postList);
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
  // const [isScrollEndReached, setIsScrollEndReached] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      // setIsScrollEndReached(true);
      getFilterPostList(page + 1);
      // setIsLoading(true);
      setPage(page + 1);
    }
  };

  // useEffect(() => {
  //   if (isScrollEndReached) {
  //     console.log('page: ' + page);
  //     getFilterPostList(page);
  //     setIsScrollEndReached(false);
  //   }
  // }, [isScrollEndReached]);

  return (
    <Container
      keyboardShouldPersistTaps="always"
      // onScroll={e => handleScroll(e)}
      styleScrollView={{backgroundColor: color.background}}>
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

      <View style={{height: 100}} />
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
