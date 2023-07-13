import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import React, {ReactNode} from 'react';
import {PostPreviewType} from '../PostPreview';
import {Dimensions} from 'react-native';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import {
  POPPINS_ITALIC,
  POPPINS_LIGHT,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {ColorThemeProps} from '../../assets/theme/colors';
import {NUM_PER_PAGE} from '../../backendAPI';

type PostPreviewListProps = {
  data: PostPreviewType[];
  ListHeaderComponent?: React.ReactElement | null;
  onEndReached: () => void;
  onMomentumScrollBegin: () => void;
  renderItem: ListRenderItem<PostPreviewType>;
  keyExtractor: (item: PostPreviewType) => string;
  // isLoading?: boolean;
  isEmpty?: boolean;
  isEnd: boolean;
  color: ColorThemeProps;
};
const widthScreen = Dimensions.get('window').width;
const ITEM_HEIGHT = widthScreen * 0.42 * 1.45;

const PostPreviewList: React.FC<PostPreviewListProps> = ({
  data,
  ListHeaderComponent,
  renderItem,
  keyExtractor,
  onEndReached,
  onMomentumScrollBegin,
  isEnd = false,
  isEmpty = false,
  color,
  
}) => {
  const loadingArray = [1, 2, 3, 4, 5, 6];
  const getItemLayout = (
    data: PostPreviewType[] | undefined | null,
    index: number,
  ) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <FlatList
      columnWrapperStyle={{
        justifyContent: 'space-around',
        marginHorizontal: widthScreen * 0.01,
      }}
      contentContainerStyle={{
        backgroundColor: color.background,
      }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      data={data}
      ListHeaderComponent={ListHeaderComponent && ListHeaderComponent}
      numColumns={2}
      ListFooterComponent={() => {
        if (isEmpty)
          return (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                height: widthScreen,
                marginLeft: widthScreen * -0.01,
                backgroundColor: color.background,
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
                  color: color.onBackground,
                }}>
                No matching posts found
              </Text>
              <Text
                style={{
                  fontSize: getFontSize(12),
                  fontFamily: POPPINS_REGULAR,
                  textAlign: 'center',
                  paddingHorizontal: '10%',
                  color: color.onBackground_light,
                }}>
                There are no matches for the selected keyword or filter. Try
                changing keywords or filter criteria
              </Text>
            </View>
          );
        if (isEnd && data.length >= NUM_PER_PAGE) {
          return (
            <View
              style={{
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/out-of-stock.png')}
                style={{width: 60, height: 60, resizeMode: 'center'}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: POPPINS_ITALIC,
                  fontSize: getFontSize(12),
                  color: color.onBackground_light,
                  marginTop: 8,
                }}>
                This is the end of the list of posts
              </Text>
            </View>
          );
        }
        if (data.length < NUM_PER_PAGE && data.length != 0) {
          return null;
        }
        // if (isLoading) {
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
        // } else return null;
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={1.4}
      onMomentumScrollBegin={onMomentumScrollBegin}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // getItemLayout={getItemLayout}

      //   removeClippedSubviews={true} // Unmount components when outside of window
      //   initialNumToRender={4} // Reduce initial render amount
      //   maxToRenderPerBatch={6} // Reduce number in each render batch
      //   updateCellsBatchingPeriod={100} // Increase time between renders
      //   windowSize={7} // Reduce the window size
    />
  );
};

export default PostPreviewList;
