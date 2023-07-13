import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MobikeImage from '../../common/image';
import {
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
} from '../../../constants/routeNames';
import {
  brandNameFromID,
  formatPrice,
  typeNameFromID,
} from '../../../utils/idToProperty';
import {selectPost} from '../../../redux/slice/selectedPostSlice';
import {TouchableWithoutFeedback} from 'react-native';
import {
  AppAdminGetPost,
  GetPersonalPostDetail,
  GetPost,
} from '../../../backendAPI';
import ShadowWrapper from '../../common/shadowWrapper';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import colors from '../../../assets/theme/colors';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import {POPPINS_BOLD, POPPINS_ITALIC} from '../../../assets/fonts';
import {personalPostInfoType} from '../../PostDetail';
// import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export type PostPreviewType = {
  adress: {
    ID: number;
    ID_City: number;
    ID_District: number;
    ID_Ward: number;
  };
  post: {
    Content: string;
    ID: number;
    ID_Account: number;
    ID_Address: number;
    ID_VehicleInfo: number;
    Pricetag: number;
    Time_created: Date;
    Title: string;
    rel_Image: number[];
    rel_Like: string[];
    rel_Rating: string[];
  };
  user: {
    Gender?: number;
    ID: number;
    ID_Image_Profile?: number;
    Name: string;
    Phone_number: string;
    Time_created: Date;
  };
  vehicleinfo: {
    Cubic_power?: number;
    ID: number;
    ID_Color: number;
    ID_Condition: number;
    ID_VehicleBrand: number;
    ID_VehicleLineup: number;
    ID_VehicleType: number;
    License_plate: string;
    Manufacture_year: number;
    Odometer: number;
    Vehicle_name: string;
  };
};
interface PostPreviewProps extends PressableProps {
  postID: number;
  index: number;
  pressable?: boolean;
  styleWrapper?: ViewStyle;
  isActivePost?: boolean;
  post?: PostPreviewType | personalPostInfoType;
  isAdmin?: boolean;
  onPress: () => void;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  postID,
  index,
  pressable = true,
  styleWrapper,
  isActivePost = true,
  post,
  isAdmin = false,
  onPress,
  ...props
}) => {
  useEffect(() => {
    if (isAdmin) {
      getInactivePostByAdmin();
    } else if (isActivePost) {
      getPost();
    } else {
      getInactivePost();
    }
  }, []);

  //Get post
  const [postInfo, setPostInfo] = React.useState<PostPreviewType>();
  const getPost = async () => {
    const post = await GetPost(postID);
    setPostInfo(post);
  };

  //Get inactive post
  const getInactivePost = async () => {
    setPostInfo(await GetPersonalPostDetail(postID));
  };

  // Get inactive post by admin
  const getInactivePostByAdmin = async () => {
    const post = await AppAdminGetPost(postID);
    setPostInfo(post);
  };

  const onPressItem = () => {
    onPress();
  };

  const _renderContent = () => {
    if (!postInfo) return null;
    return (
      <View style={{marginVertical: 12}}>
        <ShadowWrapper
          style={{
            width: widthScreen * 0.42,
            height: widthScreen * 0.42 * 1.45,
            borderRadius: 11.75,
          }}>
          <Pressable
            style={[styles.styleWrapper, styleWrapper]}
            onPress={onPressItem}>
            <MobikeImage
              imageID={postInfo.post.rel_Image[0]}
              style={styles.styleImage}
            />

            <View style={styles.textWrapper}>
              <Text
                style={[styles.styleTitle, {color: color.onBackground}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {postInfo.post.Title}
              </Text>
              <Text
                style={[styles.styleInfo, {color: color.onBackground_light}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                <Text>
                  {typeNameFromID(postInfo.vehicleinfo.ID_VehicleType)}
                </Text>
                <Text> - </Text>
                <Text>
                  {brandNameFromID(postInfo.vehicleinfo.ID_VehicleBrand)}
                </Text>
              </Text>

              <Text
                style={[styles.stylePrice, {color: color.error}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {formatPrice(postInfo.post.Pricetag) + ' VND'}
              </Text>
            </View>
          </Pressable>
        </ShadowWrapper>
      </View>
    );

    // } else {
    //   return (
    //     <View
    //       style={[
    //         styles.styleWrapper,
    //         index === 0 ? {marginStart: 20} : null,
    //         styleWrapper,
    //       ]}>
    //       <MobikeImage
    //         imageID={postInfo.post.rel_Image[0]}
    //         style={styles.styleImage}
    //       />

    //       <View style={styles.textWrapper}>
    //         <Text
    //           style={styles.styleTitle}
    //           numberOfLines={1}
    //           ellipsizeMode="tail">
    //           {postInfo.post.Title}
    //         </Text>
    //         <Text
    //           style={styles.styleInfo}
    //           numberOfLines={1}
    //           ellipsizeMode="tail">
    //           <Text>{typeNameFromID(postInfo.vehicleinfo.ID_VehicleType)}</Text>
    //           <Text> - </Text>
    //           <Text>
    //             {brandNameFromID(postInfo.vehicleinfo.ID_VehicleBrand)}
    //           </Text>
    //         </Text>

    //         <Text
    //           style={styles.stylePrice}
    //           numberOfLines={1}
    //           ellipsizeMode="tail">
    //           {formatPrice(postInfo.post.Pricetag) + ' VND'}
    //         </Text>
    //       </View>
    //     </View>
    //   );
    // }
  };

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  return (
    <Pressable onPress={pressable ? onPressItem : null} key={postID} {...props}>
      {_renderContent()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  styleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  styleImage: {
    width: widthScreen * 0.35,
    height: widthScreen * 0.35,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  textWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: '9%',
  },

  styleTitle: {
    width: widthScreen * 0.35,
    paddingTop: 16,
    fontSize: getFontSize(15),
    fontFamily: POPPINS_BOLD,
    lineHeight: getFontSize(17), //to prevent lower height in truncated text
  },
  styleInfo: {
    width: widthScreen * 0.35,
    fontSize: getFontSize(12),
    fontFamily: POPPINS_ITALIC,
    textAlignVertical: 'center',
    lineHeight: getFontSize(14),
    paddingTop: 4,
  },
  stylePrice: {
    width: widthScreen * 0.35,
    fontSize: getFontSize(15),
    paddingTop: 8,
    fontFamily: POPPINS_BOLD,
    lineHeight: getFontSize(17),
  },
});

export default memo(PostPreview);
