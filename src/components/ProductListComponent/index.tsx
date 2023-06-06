import React from 'react';
import {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {GetAllPosts, PostFilter} from '../../backendAPI';
import store, {RootState} from '../../redux/store';
import Container from '../common/container';
import PostPreview from '../PostPreview/listItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {useSelector} from 'react-redux';
import {FilterState} from '../../redux/slice/filterSlice';
import {
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
  PRODUCT_LIST,
  SEARCH,
} from '../../constants/routeNames';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';
import TextField from '../common/textField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PostPreviewLoader from '../common/contentLoader/postPreview';

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
  useEffect(() => {
    getFilterPostList();
  }, []);
  const filter = useSelector<RootState, FilterState>(state => state.filter);
  const filterPost = PostFilter(
    filter.title,
    undefined,
    undefined,
    true,
    filter.priceRange.min * 1000000,
    undefined,
    filter.brand,
    filter.lineup,
    filter.vehicleTypes[filter.vehicleTypes.length - 1],
    filter.color,
    filter.manufacturerYear,
  );
  console.log('filter: ' + JSON.stringify(filter));
  console.log(JSON.stringify(filterPost));

  const getFilterPostList = async () => {
    const postListTmp = await GetAllPosts(filterPost);
    console.log('postList: ' + JSON.stringify(postListTmp));
    setPostList(postListTmp);
    setIsLoading(false);
  };

  const [postList, setPostList] = React.useState<PostList>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const loadingArray = [1];
  const onNavigateSearch = () => {
    navigation.navigate(SEARCH);
  };

  const onGoBack = () => {
    navigation.goBack();
  };
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  return (
    <View style={{backgroundColor: color.background}}>
      <View style={styles.wrapperHeader}>
        <Pressable onPress={onGoBack}>
          <SimpleLineIcons
            name="arrow-left"
            color={color.onBackground_light}
            size={20}
          />
        </Pressable>
        <TextField
          label={'What are you looking for ?'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={color.primary}
          style={{width: '90%'}}
          onTouchEnd={onNavigateSearch}
        />
      </View>
      <Container
        keyboardShouldPersistTaps="always"
        styleScrollView={{
          backgroundColor: color.background,
        }}>
        <View style={{marginLeft: 13}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {true
              ? loadingArray.map((item, index) => (
                  // <RenderSkeleton key={index} index={index} />
                  <PostPreviewLoader key={index} />
                ))
              : postList.map((item, index) => {
                  return (
                    <PostPreview
                      postID={item.ID}
                      key={index}
                      styleWrapper={{marginTop: 13}}
                      isActivePost={true}
                      pressable={true}
                      onPress={() => {
                        navigation.navigate(POST_DETAIL_NAVIGATOR);
                        console.log('hello');
                      }}
                      index={index}
                    />
                  );
                })}
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
