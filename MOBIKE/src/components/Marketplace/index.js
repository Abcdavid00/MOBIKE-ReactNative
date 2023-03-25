import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import Container from '../common/container';
import colors from '../../assets/theme/colors';
import Carousel from '../Banner/carousel';
import imageBanner from '../../data/imageBanner';
import dataCategoryList from '../../data/dataCategoryList';
import dataPostPreviewList from '../../data/dataPostPreviewList';
import CategoryList from '../CategoryList/flatList';
import PostPreviewList from '../PostPreview/flatList';
import store from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_LIST } from '../../constants/routeNames';
import { useDispatch } from 'react-redux';
import { setInitial } from '../../redux/slice/filterSlice';
import { GetAllPosts } from '../../backendAPI';
import { useEffect } from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { StyleSheet } from 'react-native';

const MarketplaceComponent = () => {

  const dataType = store.getState().vehicleTypes;
  console.log('dataType', dataType);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getFilterPostList();
  }, [])

  const getFilterPostList = async () => {
    const postListTmp = await GetAllPosts();
    console.log('postList: ' + JSON.stringify(postListTmp));
    let tmp = []
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(postListTmp[i].ID);
    }
    setPostList(tmp);
    setIsLoading(false);
  };

  const [postList, setPostList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const RenderSkeleton = (index) => {
    return (
      <SkeletonContent
        containerStyle={[styles.styleWrapper, index == 0 ? { marginLeft: 20 } : null, { backgroundColor: '#f5f5f5', }]
        }
        highlightColor="#C0DAF155"
        isLoading={isLoading}
        layout={
          [
            {
              key: 'image', width: 135,
              height: 135, borderRadius: 5,
            },
            {
              key: 'title', width: 130,
              height: 14,
              marginTop: 10,
            },
            {
              key: 'info', width: 130,
              height: 10,
              marginTop: 10,
            },
            {
              key: 'price', width: 130,
              height: 16,
              marginTop: 10,
            },
          ]}
      >
        <Text>Your content</Text>
        <Text>Other content</Text>
      </SkeletonContent >
    )
  }

  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleScrollView={{ backgroundColor: '#FFFFFF' }}>
      <Carousel data={imageBanner} />
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
          <CategoryList data={dataType} />

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
            <TouchableWithoutFeedback onPress={() => { navigate(PRODUCT_LIST); dispatch(setInitial) }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: colors.primary,
                  fontStyle: 'italic',
                }}>
              See more >
              </Text>
            </TouchableWithoutFeedback>
          </View>
          {isLoading ?
            <View style={{ flexDirection: 'row' }}>
              {loadingArray.map((item, index) => RenderSkeleton(index))}
            </View>

            : <PostPreviewList data={postList} />}
{/* 
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
              From Merchants
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: colors.primary,
                fontStyle: 'italic',
              }}>
              See more >
            </Text>
          </View> */}
          {/* <PostPreviewList data={[4, 5, 3]} /> */}
          {/* <View
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
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: colors.primary,
                fontStyle: 'italic',
              }}>
              See more >
            </Text>
          </View> */}
          {/* <PostPreviewList data={[4, 5, 3,]} /> */}
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default MarketplaceComponent;

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
});