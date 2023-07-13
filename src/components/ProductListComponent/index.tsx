import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, View} from 'react-native';
import {GetAllPosts, GetPost, PostFilter} from '../../backendAPI';
import {RootState} from '../../redux/store';
import Container from '../common/container';
import PostPreview, {PostPreviewType} from '../PostPreview';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {FilterState} from '../../redux/slice/filterSlice';
import {
  FILTERS_POP_UP,
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
  SEARCH,
} from '../../constants/routeNames';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';
import TextField from '../common/textField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import {POPPINS_REGULAR, POPPINS_SEMI_BOLD} from '../../assets/fonts';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {SortOptionType, sortOption} from '../../data/sortOption';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SortState, setInitialSort, setSort} from '../../redux/slice/sortSlice';
import {useIsFocused} from '@react-navigation/native';
import PostPreviewList from '../PostPreviewList';
import {selectPost} from '../../redux/slice/selectedPostSlice';
import {personalInfoState} from '../../redux/clientDatabase/personalInfo';

const widthScreen = Dimensions.get('window').width;

type ProductListComponentProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'ProductList'>;
};

type PostListItem = {
  ID: number;
  Pricetag: number;
  Time_created: Date;
  Title: string;
  rel_Image: number[];
};

type PostList = PostListItem[];

type SortType = {
  asc: boolean;
  orderType: 'price' | 'time';
};

export type FilterObjectType = {
  title?: string;
  page?: Number;
  numperPage?: Number;
  asc?: Boolean;
  orderType?: string;
  priceStart?: Number;
  priceEnd?: Number;
  brand?: Number;
  lineup?: Number;
  type?: Number;
  color?: Number;
  manufacturerYear?: Number;
};

const NUM_PER_PAGE = 20;

const ProductListComponent: React.FC<ProductListComponentProps> = ({
  navigation,
}) => {
  const GenerateFilterObject = (filterState: FilterState): FilterObjectType => {
    return {
      title: filterState.title,
      page: page,
      numperPage: NUM_PER_PAGE,
      asc: sortSelected.asc,
      orderType: sortSelected.orderType,
      priceStart: filter.priceRange.min * 1000000,
      priceEnd: filter.priceRange.max * 1000000,
      brand: filter.brand,
      lineup: filter.lineup,
      type: filter.vehicleType,
      color: filter.color,
      manufacturerYear: filter.manufacturerYear,
    };
  };

  const filter = useSelector<RootState, FilterState>(state => state.filter);
  // useEffect(() => {
  //   getFilterPostList(PostFilter(GenerateFilterObject(filter)));
  //   console.log('First time Filter State: ' + JSON.stringify(filter));
  // }, []);

  const getSortOptionFromID = (ID: number) => {
    const tmp: SortType = {
      asc: ID == 1 || ID == 3,
      orderType: ID == 1 || ID == 2 ? 'time' : 'price',
    };
    return tmp;
  };

  const sortSelected = useSelector<RootState, SortType>(state => {
    const tmp: SortType = getSortOptionFromID(state.sort);
    return tmp;
  });

  const getFilterPostList = async (agrs: string) => {
    const postListTmp = await GetAllPosts(agrs);
    let tmp: Array<PostPreviewType> = [...postList];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(await GetPost(postListTmp[i].ID));
    }
    setPostList(tmp);
    // console.log('In function get: ' + agrs);
    // console.log('postListLoaded: ' + JSON.stringify(postListTmp));
    // console.log('postListCurrent: ' + JSON.stringify(tmp.length));
    setIsLoading(false);
    //trick
    if (tmp.length % 2 != 0) {
      setIsEnd(true);
    }

    if (postListTmp.length == 0) setIsEnd(true);
    if (tmp.length == 0) setIsEmpty(true);

    if (isSortSelecting) setSortSlecting(false);
  };

  const [postList, setPostList] = React.useState<PostPreviewType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const onNavigateSearch = () => {
    navigation.navigate(SEARCH);
  };

  const onGoBack = () => {
    dispatch(setInitialSort());
    navigation.goBack();
  };
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // console.log('Is Focused: ' + isFocused);
      setIsEmpty(false);
      setIsEnd(false);
      setIsLoading(true);
      getFilterPostList(PostFilter(GenerateFilterObject(filter)));
    } else {
      // console.log('Is Focused: ' + isFocused);
      onClose();
    }
  }, [isFocused]);

  const sortOptionSelected = useSelector<RootState, SortState>(
    state => state.sort,
  );
  const onSetOptionSelected = (id: number) => {
    dispatch(setSort(id));
    const sortTmp: SortType = getSortOptionFromID(id);
    onChooseSort();
  };
  const onChooseSort = () => {
    setPostList([]);
    setPage(1);
    setIsEmpty(false);
    setIsEnd(false);
    setSortSlecting(true);
  };

  const [isSortSelecting, setSortSlecting] = useState<boolean>(false);

  useEffect(() => {
    if (isSortSelecting) {
      // console.log('Render by Sort useEffect' + page);
      setIsLoading(true);
      getFilterPostList(PostFilter(GenerateFilterObject(filter)));
    }
  }, [isSortSelecting]);

  const onNavigateFilter = () => {
    navigation.navigate(FILTERS_POP_UP);
  };

  const onClose = () => {
    setPostList([]);
    setPage(1);
    // console.log('Clear');
  };

  const isFilteredState = useSelector<RootState, Boolean>(
    state => state.filter.isFiltered,
  );

  const [isFiltered, setIsFiltered] = useState(isFilteredState);
  useEffect(() => {
    setIsFiltered(isFilteredState);
  }, [isFocused]);

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  //Render Post Preview List
  const [page, setPage] = useState(1);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState<boolean>(true);

  useEffect(() => {
    if (page != 1 && !isSortSelecting) {
      // console.log('Render by Page useEffect : ' + page);
      setIsLoading(true);
      getFilterPostList(PostFilter(GenerateFilterObject(filter)));
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
      !onEndReachedCalledDuringMomentum &&
      !isEnd &&
      !isSortSelecting &&
      !isLoading
    ) {
      // console.log('Page increase by Scroll');
      // console.log('Current page on scroll: ' + page);
      // console.log('Future page on scroll: ' + (page + 1));
      setPage(page + 1);
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  const onMomentumScrollBegin = () => {
    setOnEndReachedCalledDuringMomentum(false);
  };

  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const renderHeader = () => (
    <View style={{marginBottom: '6%'}}>
      {/*Sort Option
       */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          marginStart: '6%',
          marginTop: '2%',
        }}>
        {/*Filter Icon Wrapper*/}
        <Pressable
          onPress={onNavigateFilter}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {isFiltered ? (
            <Image
              source={
                theme == 'light'
                  ? require('../../assets/images/filter_on_light.png')
                  : require('../../assets/images/filter_on_dark.png')
              }
              style={{width: 24, height: 24, resizeMode: 'cover'}}
            />
          ) : (
            <AntDesign
              name={'filter'}
              color={color.onBackground_light}
              size={24}
            />
          )}

          <Text
            style={{
              marginStart: 8,
              paddingTop: 8,
              fontSize: getFontSize(15),
              fontFamily: POPPINS_SEMI_BOLD,
              color: isFiltered ? color.primary : color.onBackground,
            }}>
            Filter
          </Text>
        </Pressable>
        {/*Divider*/}
        <View
          style={{
            height: 28,
            width: 1,
            backgroundColor: color.divider,
            marginStart: '4%',
            marginTop: 4,
          }}
        />
        {/*Sort Icon Wrapper */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 4,
            paddingStart: '4%',
            paddingEnd: widthScreen / 3,
          }}
          style={{}}>
          {sortOption.map((item: SortOptionType, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => onSetOptionSelected(item.id)}
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 16,
                    borderColor: color.divider,
                    paddingHorizontal: '2.5%',
                    paddingBottom: '0.5%',
                    marginEnd: 12,
                  },
                  item.id == sortOptionSelected
                    ? {
                        borderColor: color.secondary,
                        backgroundColor: color.secondary + '4D',
                      }
                    : {},
                ]}>
                <Image
                  source={item.image}
                  style={{width: 24, height: 24, resizeMode: 'cover'}}
                />
                <Text
                  style={{
                    marginStart: 8,
                    paddingTop: 8,
                    fontSize: getFontSize(15),
                    fontFamily: POPPINS_SEMI_BOLD,
                    color: color.onBackground,
                  }}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: color.background, flex: 1, height: '100%'}}>
      {/* <Container
        keyboardShouldPersistTaps="always"
        styleScrollView={{
          backgroundColor: color.background,
          marginTop: '2%',
        }}
        styleWrapper={{paddingBottom: '10%', paddingTop: '4%'}}>
        <View style={{marginLeft: widthScreen * 0.01}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {isLoading
              ? loadingArray.map((item, index) => (
                  <PostPreviewLoader key={index} />
                ))
              : _renderContent()}
          </View>
        </View>
      </Container> */}

      {/* {renderHeader()} */}
      <View style={styles.wrapperHeader}>
        <Pressable onPress={onGoBack}>
          <SimpleLineIcons
            name="arrow-left"
            color={color.onBackground_light}
            size={20}
          />
        </Pressable>
        <TextField
          label={!filter.title ? 'What are you looking for ?' : ''}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={color.primary}
          style={{width: '90%'}}
          onTouchEndCapture={onNavigateSearch}
          value={filter.title}
        />
      </View>

      <PostPreviewList
        data={postList}
        renderItem={renderItemPostPreview}
        keyExtractor={keyExtractorPostPreview}
        color={color}
        onEndReached={onEndReached}
        onMomentumScrollBegin={onMomentumScrollBegin}
        isEnd={isEnd}
        isEmpty={isEmpty}
        ListHeaderComponent={renderHeader()}
      />
    </View>
  );
};

export default ProductListComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    paddingLeft: '6%',
    paddingEnd: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
