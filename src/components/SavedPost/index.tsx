import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
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
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import Container from '../common/container';
import {POST_DETAIL_NAVIGATOR} from '../../constants/routeNames';
import {GetLikedPosts} from '../../backendAPI';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import PostPreview from '../PostPreview/listItem';

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
  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getFilterPostList();
  }, []);

  const getFilterPostList = async (page?: number) => {
    const postListTmp = await GetLikedPosts();
    console.log('Saved Post: ' + JSON.stringify(postListTmp));
    console.log('Page: ' + page);
    let tmp: Array<number> = [...postList];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(postListTmp[i].ID);
    }
    setPostList(tmp);
    setIsLoading(false);
  };

  const [postList, setPostList] = React.useState<Array<number>>([]);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={{backgroundColor: color.background, flex: 1}}>
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
      </Container>
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
