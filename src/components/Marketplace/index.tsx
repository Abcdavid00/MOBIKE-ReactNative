import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import React from 'react';
import Container from '../common/container';
import colors from '../../assets/theme/colors';
import Carousel from '../Banner/carousel';
import imageBanner from '../../data/imageBanner';
import dataCategoryList from '../../data/dataCategoryList';
import dataPostPreviewList from '../../data/dataPostPreviewList';
import CategoryList from '../CategoryList/flatList';
import PostPreviewList from '../PostPreview/flatList';
import store, {RootState} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_LIST} from '../../constants/routeNames';
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
import ShadowWrapper from '../common/shadowWrapper';

type MarketplaceComponentProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Marketplace'>;
};

const MarketplaceComponent: React.FC<MarketplaceComponentProps> = ({
  navigation,
}) => {
  const dataType = store.getState().vehicleTypes;
  console.log('dataType', dataType);
  const dispatch = useDispatch();

  useEffect(() => {
    getFilterPostList();
  }, []);

  const getFilterPostList = async () => {
    const postListTmp = await GetAllPosts();
    console.log('postList: ' + JSON.stringify(postListTmp));
    let tmp: Array<string> = [];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(postListTmp[i].ID);
    }
    setPostList(tmp);
    setIsLoading(false);
  };

  const [postList, setPostList] = React.useState<Array<string>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const RenderSkeleton = (index: number) => {
  //   return (
  //     <SkeletonContent
  //       containerStyle={[
  //         styles.styleWrapper,
  //         index == 0 ? {marginLeft: 20} : null,
  //         {backgroundColor: '#f5f5f5'},
  //       ]}
  //       highlightColor="#C0DAF155"
  //       isLoading={isLoading}
  //       layout={[
  //         {
  //           key: 'image',
  //           width: 135,
  //           height: 135,
  //           borderRadius: 5,
  //         },
  //         {
  //           key: 'title',
  //           width: 130,
  //           height: 14,
  //           marginTop: 10,
  //         },
  //         {
  //           key: 'info',
  //           width: 130,
  //           height: 10,
  //           marginTop: 10,
  //         },
  //         {
  //           key: 'price',
  //           width: 130,
  //           height: 16,
  //           marginTop: 10,
  //         },
  //       ]}>
  //       <Text>Your content</Text>
  //       <Text>Other content</Text>
  //     </SkeletonContent>
  //   );
  // };

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleScrollView={{backgroundColor: 'white'}}>
      <View style={styles.wrapperHeader}>
        <TextField
          label={'What are you looking for ?'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={color.primary}
          style={{width: '85%'}}
        />
        <Pressable>
          <Ionicons
            name="notifications-outline"
            color={color.onBackground_light}
            size={28}
          />
        </Pressable>
      </View>
      <Carousel data={imageBanner} />
      {/* <ShadowWrapper
        style={{
          height: 300,
          width: 300,
          alignSelf: 'center',
        }}
        contentStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Hello</Text>
      </ShadowWrapper> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginStart: 20,
              marginTop: 5,
              marginBottom: 7,
              color: '#000000',
            }}>
            Vehicle Types
          </Text>
          <CategoryList data={dataType} type={undefined} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              Most Recently
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(PRODUCT_LIST);
                dispatch(setInitial);
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: colors.primary,
                  fontStyle: 'italic',
                }}>
                {'See more >'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          {/* {isLoading ? (
            <View style={{flexDirection: 'row'}}>
              {loadingArray.map((item, index) => RenderSkeleton(index))}
            </View>
          ) : (
            <PostPreviewList data={postList} />
          )} */}

          <PostPreviewList data={postList} />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default MarketplaceComponent;

const styles = StyleSheet.create({
  styleWrapper: {
    backgroundColor: '#EDEDED',
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
