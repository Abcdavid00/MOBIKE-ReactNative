import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import Store, {RootState} from '../../redux/store';
import ReadMore from '@fawazahmed/react-native-read-more';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FAB} from 'react-native-paper';
import {useNavigation, useTheme} from '@react-navigation/native';
import {YOUR_POSTS} from '../../constants/routeNames';
import MobikeImage from '../common/image';
import {ADD_POST} from '../../constants/routeNames';
import {UploadPost} from '../../backendAPI';
import {formAddPostState} from '../AddPost';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';
import {
  brandNameFromID,
  cityNameFromID,
  colorHexFromID,
  colorNameFromID,
  conditionNameFromID,
  districtNameFromID,
  formatPrice,
  lineupNameFromID,
  typeNameFromID,
  wardNameFromID,
} from '../../utils/idToProperty';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {
  POPPINS_BOLD,
  POPPINS_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {personalInfoState} from '../../redux/clientDatabase/personalInfo';
import {useSelector} from 'react-redux';
import PopUpLoading from '../common/popupLoading';
import PopUpMessage from '../common/popupMessage';
import CustomButton from '../common/customButton';

type PostPreviewComponentProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'PostPreview'>;
  form: formAddPostState;
};

const widthScreen = Dimensions.get('window').width;
const PostPreviewComponent: React.FC<PostPreviewComponentProps> = ({
  form,
  navigation,
}) => {
  const userInfo = useSelector<RootState, personalInfoState>(
    state => state.personalInfo,
  );

  const onBackToEdit = () => {
    navigation.navigate(ADD_POST);
  };

  const Post = async () => {
    console.log('Posting...');
    setIsLoading(true);
    const postres = await UploadPost(
      form.images,
      form.title,
      form.content || '',
      form.price,
      form.address.ID,
      form.name,
      form.odometer || -1,
      form.licensePlate || '',
      form.manufacturerYear || -1,
      form.cubicPower || -1,
      form.brand,
      form.lineup,
      form.type,
      form.condition,
      form.color,
    );
    setIsLoading(false);
    if (postres) {
      setTextSuccess('Your post has been successfully posted');
      setIsSuccess(true);
    } else {
      setTextError('Your post has failed to be posted. Please try again later');
      setIsError(true);
    }
  };

  const color = useTheme().colors.customColors;

  const DetailRoute = () => (
    <View style={{paddingHorizontal: 20, marginTop: 15}}>
      <ReadMore
        seeMoreStyle={{
          color: color.text,
          fontSize: getFontSize(14),
          fontFamily: POPPINS_ITALIC,
        }}
        seeLessStyle={{
          color: color.text,
          fontSize: getFontSize(14),
          fontFamily: POPPINS_ITALIC,
        }}
        style={{
          color: color.onBackground_light,
          fontSize: getFontSize(14),
          fontFamily: POPPINS_REGULAR,
        }}
        seeMoreContainerStyleSecondary={{position: 'relative'}}
        numberOfLines={10}>
        {form.content}
      </ReadMore>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            marginBottom: 15,
            fontSize: getFontSize(16),
            fontFamily: POPPINS_MEDIUM,
            color: color.onBackground,
          }}>
          Detail Information
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 5,
          }}>
          <View style={{width: widthScreen / 2 - 30}}>
            {/* Brand */}
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <MaterialIcons
                name="motorcycle"
                size={18}
                color={color.primary}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: getFontSize(14),
                  color: color.onBackground_light,
                  fontFamily: POPPINS_REGULAR,
                }}>
                Brand :{' '}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: color.onBackground,
                  fontFamily: POPPINS_REGULAR,
                  flex: 1,
                }}>
                {brandNameFromID(form ? form.brand : -1)}
              </Text>
            </View>

            {/* Condition */}
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <MaterialCommunityIcons
                name="list-status"
                size={18}
                color={colors.primary}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: getFontSize(14),
                  color: color.onBackground_light,
                  fontFamily: POPPINS_REGULAR,
                }}>
                Condition :{' '}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: color.onBackground,
                  fontFamily: POPPINS_REGULAR,
                  flex: 1,
                }}>
                {conditionNameFromID(form ? form.condition : -1)}
              </Text>
            </View>

            {/* Cubic Power */}
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <MaterialIcons name="speed" size={18} color={colors.primary} />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: getFontSize(14),
                  color: color.onBackground_light,
                  fontFamily: POPPINS_REGULAR,
                }}>
                Cubic Power :{' '}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: color.onBackground,
                  fontFamily: POPPINS_REGULAR,
                  flex: 1,
                }}>
                {form.cubicPower && form.cubicPower > 0
                  ? form.cubicPower
                  : '---'}
              </Text>
            </View>

            {/* License Plate */}
            <View
              style={{flexDirection: 'row', marginBottom: 15, paddingLeft: 5}}>
              <Octicons name="number" size={18} color={colors.primary} />
              <Text
                style={{
                  marginLeft: 7,
                  fontSize: getFontSize(14),
                  color: color.onBackground_light,
                  fontFamily: POPPINS_REGULAR,
                }}>
                Plate :{' '}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: color.onBackground,
                  fontFamily: POPPINS_REGULAR,
                  flex: 1,
                }}>
                {form && form.licensePlate ? form.licensePlate : '---'}
              </Text>
            </View>
          </View>
          <View style={{width: widthScreen / 2 - 30}}>
            <View>
              {/* Lineup */}
              <View style={{flexDirection: 'row', marginBottom: 15}}>
                <MaterialCommunityIcons
                  name="label-multiple-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: getFontSize(14),
                    color: color.onBackground_light,
                    fontFamily: POPPINS_REGULAR,
                  }}>
                  Lineup :{' '}
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    color: color.onBackground,
                    fontFamily: POPPINS_REGULAR,
                    flex: 1,
                  }}>
                  {lineupNameFromID(form ? form.lineup : -1)}
                </Text>
              </View>

              {/* Color */}
              <View style={{flexDirection: 'row', marginBottom: 15}}>
                <Ionicons
                  name="color-palette-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: getFontSize(14),
                    color: color.onBackground_light,
                    fontFamily: POPPINS_REGULAR,
                  }}>
                  Color :{' '}
                </Text>
                <FontAwesome
                  name="circle"
                  size={18}
                  color={colorHexFromID(form ? form.color : -1)}
                  style={{marginLeft: 5}}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: color.onBackground,
                    fontFamily: POPPINS_REGULAR,
                    flex: 1,
                  }}>
                  {colorNameFromID(form ? form.color : -1)}
                </Text>
              </View>

              {/* Odometer */}
              <View style={{flexDirection: 'row', marginBottom: 15}}>
                <Ionicons
                  name="speedometer-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: getFontSize(14),
                    color: color.onBackground_light,
                    fontFamily: POPPINS_REGULAR,
                  }}>
                  Odometer :{' '}
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    color: color.onBackground,
                    fontFamily: POPPINS_REGULAR,
                    flex: 1,
                  }}>
                  {form.odometer && form.odometer > 0 ? form.odometer : '---'}
                </Text>
              </View>

              {/* Manufacturer Year */}
              <View style={{flexDirection: 'row', marginBottom: 15}}>
                <Fontisto name="date" size={18} color={colors.primary} />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: getFontSize(14),
                    color: color.onBackground_light,
                    fontFamily: POPPINS_REGULAR,
                  }}>
                  Year :{' '}
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    color: color.onBackground,
                    fontFamily: POPPINS_REGULAR,
                    flex: 1,
                  }}>
                  {form.manufacturerYear && form.manufacturerYear > 0
                    ? form.manufacturerYear
                    : '---'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Name */}
        <View style={{flexDirection: 'row', marginBottom: 8, paddingLeft: 5}}>
          <AntDesign name="edit" size={18} color={colors.primary} />
          <Text
            style={{
              marginLeft: 7,
              fontSize: getFontSize(14),
              color: color.onBackground_light,
              fontFamily: POPPINS_REGULAR,
            }}>
            Name :{' '}
          </Text>
          <Text
            style={{
              marginLeft: 5,
              color: color.onBackground,
              fontFamily: POPPINS_REGULAR,
              flex: 1,
            }}>
            {form ? form.name : '--'}
          </Text>
        </View>
      </View>
    </View>
  );

  //Popup message
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onChangeLoadingState = (x: boolean) => {
    setIsLoading(x);
  };

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [textSuccess, setTextSuccess] = useState<string>('');
  const onChangeSuccessState = (x: boolean) => {
    setIsSuccess(x);
  };
  const [isError, setIsError] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>('');
  const onChangeErrorState = (x: boolean) => {
    setIsError(x);
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.wrapperHeader}>
          <Pressable
            onPress={onBackToEdit}
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
              Post Preview
            </Text>
          </View>

          <View
            style={{
              height: 70,
              width: 50,
            }}
          />
        </View>
        {/* Image */}
        <Carousel
          data={form && form.images.length != 0 ? form.images : [-1]}
          isUri={true}
          havingBackground={true}
        />

        <View style={{paddingHorizontal: 20, marginTop: 5}}>
          {/* Type */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <FontAwesome name="circle" size={8} color={color.secondary} />
            <Text
              style={{
                color: color.text,
                fontSize: 12,
                marginLeft: 8,
                fontFamily: POPPINS_MEDIUM,
              }}>
              {typeNameFromID(form ? form.type : -1)}
            </Text>
          </View>

          {/* Title */}
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: 5,
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                fontFamily: POPPINS_SEMI_BOLD,
                color: color.onBackground,
                fontSize: getFontSize(16),
              }}>
              {form ? form.title : ''}
            </Text>
          </View>

          {/* Price */}
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              paddingHorizontal: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: POPPINS_BOLD,
                color: color.error,
                fontSize: getFontSize(18),
                alignSelf: 'flex-end',
                top: 4,
              }}>
              {form?.price != -1 ? formatPrice(form?.price) + ' VND' : '--'}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: color.divider,
            height: 1,
            marginTop: 20,
            marginHorizontal: 20,
          }}
        />

        {DetailRoute()}

        {/* Seperate */}
        <View
          style={{
            backgroundColor: color.divider,
            height: 1,
            marginTop: 20,
            marginHorizontal: 20,
          }}
        />

        {/*Seller Info */}
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 12,
            marginLeft: 20,
          }}>
          <MobikeImage imageID={userInfo.ID_Image_Profile} avatar={true} />

          <View style={{marginHorizontal: 15, flex: 1}}>
            {/* Name & View Page */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: color.onBackground,
                  fontFamily: POPPINS_MEDIUM,
                  fontSize: 14,
                  flex: 1,
                  marginStart: 16,
                }}>
                {userInfo.Name}
              </Text>
            </View>

            {/* Address */}
            <View
              style={{
                flexDirection: 'row',
                marginEnd: 15,
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <SimpleLineIcons
                name="location-pin"
                size={12}
                color={color.onBackground}
                style={{marginTop: 2}}
              />
              <Text
                style={{
                  color: color.onBackground_light,
                  fontFamily: POPPINS_ITALIC,
                  fontSize: getFontSize(12),
                  marginLeft: 5,
                }}>
                <Text>
                  {form.address.Detail_address != ''
                    ? form.address.Detail_address + ', '
                    : ''}
                </Text>
                <Text>
                  {wardNameFromID(form && form.address.ID_Ward) +
                    ', ' +
                    districtNameFromID(form && form.address.ID_District) +
                    ', ' +
                    cityNameFromID(form && form.address.ID_City)}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{height: '100%', position: 'relative'}}>
      <Container
        keyboardShouldPersistTaps="always"
        styleScrollView={{backgroundColor: color.background}}>
        {renderHeader()}

        <View style={{height: 100}} />
      </Container>

      <CustomButton
        onPress={Post}
        title="Post"
        style={{
          height: 50,
          position: 'absolute',
          marginHorizontal: 16,
          bottom: 30,
          right: 0,
          left: 0,
        }}
      />
      <PopUpLoading
        text="Uploading post..."
        visibility={isLoading}
        onChangePopupVisibility={onChangeLoadingState}
      />
      <PopUpMessage
        message={textSuccess}
        type={'success'}
        visibility={isSuccess}
        onChangePopupVisibility={onChangeSuccessState}
        havingTwoButton={true}
        labelCTA="Go to Posts"
        onPress={() => {
          navigation.navigate(YOUR_POSTS);
        }}
        onPressCancel={() => {
          navigation.navigate(YOUR_POSTS);
        }}
      />
      <PopUpMessage
        message={textError}
        type={'error'}
        visibility={isError}
        onChangePopupVisibility={onChangeErrorState}
        labelCancel="Cancel"
      />
    </View>
  );
};

export default PostPreviewComponent;

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
