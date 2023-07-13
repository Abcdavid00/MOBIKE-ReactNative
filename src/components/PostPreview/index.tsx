import React, {memo, useEffect} from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Text, View} from 'react-native';
import MobikeImage from '../common/image';
import {
  brandNameFromID,
  formatPrice,
  typeNameFromID,
} from '../../utils/idToProperty';
import ShadowWrapper from '../common/shadowWrapper';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_BOLD, POPPINS_ITALIC} from '../../assets/fonts';
import {ColorThemeProps} from '../../assets/theme/colors';
import {personalPostInfoType} from '../PostDetail';

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
interface PostPreviewProps extends ViewProps {
  postID: number;
  index: number;
  pressable?: boolean;
  styleWrapper?: ViewStyle;
  isActivePost?: boolean;
  post: PostPreviewType | personalPostInfoType;
  isAdmin?: boolean;
  color: ColorThemeProps;
  onPress: () => void;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  postID,
  index,
  pressable = true,
  styleWrapper,
  isActivePost = true,
  post,
  color,
  isAdmin = false,
  onPress,
  ...props
}) => {
  //Get post
  const [postInfo, setPostInfo] = React.useState<
    PostPreviewType | personalPostInfoType
  >(post);

  const onPressItem = () => {
    // dispatch(
    //   selectPost({ID: postID, isActivePost: isActivePost, isAdmin: isAdmin}),
    // );
    console.log('Press');
    onPress();
  };

  const _renderContent = () => {
    if (!postInfo) return null;
    return (
      <View style={{marginBottom: 24}}>
        <ShadowWrapper
          onPress={onPressItem}
          style={{
            width: widthScreen * 0.42,
            height: widthScreen * 0.42 * 1.45,
            borderRadius: 11.75,
          }}>
          <View style={[styles.styleWrapper, styleWrapper]}>
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
          </View>
        </ShadowWrapper>
      </View>
    );
  };

  return (
    <View
      // onPress={pressable ? onPressItem : null}
      key={postID}
      {...props}>
      {_renderContent()}
    </View>
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
