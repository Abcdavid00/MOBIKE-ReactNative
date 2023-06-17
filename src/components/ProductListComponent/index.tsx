import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, View} from 'react-native';
import {GetAllPosts, PostFilter} from '../../backendAPI';
import {RootState} from '../../redux/store';
import Container from '../common/container';
import PostPreview from '../PostPreview/listItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {FilterState} from '../../redux/slice/filterSlice';
import {
  FILTERS_POP_UP,
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

const ProductListComponent: React.FC<ProductListComponentProps> = ({
  navigation,
}) => {
  const filter = useSelector<RootState, FilterState>(state => state.filter);
  useEffect(() => {
    getFilterPostList(
      PostFilter(
        filter.title,
        undefined,
        undefined,
        true,
        filter.priceRange.min * 1000000,
        filter.priceRange.max * 1000000,
        filter.brand,
        filter.lineup,
        filter.vehicleType,
        filter.color,
        filter.manufacturerYear,
      ),
    );
    console.log('First time Filter State: ' + JSON.stringify(filter));
  }, []);

  const getFilterPostList = async () => {
    const postListTmp = await GetAllPosts(filterPost);
  const getFilterPostList = async (agrs: string) => {
    const postListTmp = await GetAllPosts(agrs);
    // console.log('In function get: ' + agrs);
    // console.log('postList: ' + JSON.stringify(postListTmp));
    setPostList(postListTmp);
    setIsLoading(false);
    setIsReady(true);
  };

  const [postList, setPostList] = React.useState<PostList>([]);
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
      // console.log('PostList length: ' + postList.length);
      // console.log('Loading: ' + isLoading);
      console.log('In fuction get: ' + JSON.stringify(filter));
      getFilterPostList(
        PostFilter(
          filter.title,
          undefined,
          undefined,
          true,
          filter.priceRange.min * 1000000,
          filter.priceRange.max * 1000000,
          filter.brand,
          filter.lineup,
          filter.vehicleType,
          filter.color,
          filter.manufacturerYear,
        ),
      );
    } else {
      onClose();
    }
  }, [isFocused]);

  const sortOptionSelected = useSelector<RootState, SortState>(
    state => state.sort,
  );
  const onSetOptionSelected = (id: number) => {
    dispatch(setSort(id));
  };

  const onNavigateFilter = () => {
    navigation.navigate(FILTERS_POP_UP);
  };

  const onClose = () => {
    // setIsLoading(true);
    setPostList([]);
    setIsReady(false);
    console.log('Clear');
  };

  const [isReady, setIsReady] = useState(false);
  const _renderContent = () => {
    if (postList.length != 0) {
      return postList.map((item, index) => {
        return (
          <PostPreview
            postID={item.ID}
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
      });
    } else if (isFocused && isReady) {
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: widthScreen,
            marginLeft: widthScreen * -0.01,
          }}>
          <Image
            source={require('../../assets/images/not-found.png')}
            style={{width: '30%', height: '30%'}}
          />
          <Text
            style={{
              fontSize: getFontSize(16),
              fontFamily: POPPINS_SEMI_BOLD,
              textAlign: 'center',
              marginTop: '5%',
            }}>
            No matching posts found
          </Text>
          <Text
            style={{
              fontSize: getFontSize(12),
              fontFamily: POPPINS_REGULAR,
              textAlign: 'center',
              paddingHorizontal: '10%',
            }}>
            There are no matches for the selected keyword or filter. Try
            changing keywords or filter criteria
          </Text>
        </View>
      );
    }
  };

  const isFiltered = useSelector<RootState, Boolean>(
    state => state.filter.isFiltered,
  );

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  return (
    <View style={{backgroundColor: color.background, flex: 1}}>
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
              source={theme=='light'? require('../../assets/images/filter_on_light.png') : require('../../assets/images/filter_on_dark.png')}
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

      <Container
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
      </Container>
    </View>
  );
};

export default ProductListComponent;

const styles = StyleSheet.create({
  styleWrapper: {
    backgroundColor: '#EDEDED',
    padding: 12,
    borderRadius: 5,
    marginEnd: 13,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperHeader: {
    flexDirection: 'row',
    paddingLeft: '6%',
    paddingEnd: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
