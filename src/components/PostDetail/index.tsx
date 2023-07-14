import React, {useEffect} from 'react';
import {
  FlatList,
  Linking,
  ListRenderItem,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import {RootState} from '../../redux/store';
import ReadMore from '@fawazahmed/react-native-read-more';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {SceneMap} from 'react-native-tab-view';
import MobikeImage from '../common/image';
import {useState} from 'react';
import {
  conditionNameFromID,
  brandNameFromID,
  lineupNameFromID,
  typeNameFromID,
  colorNameFromID,
  colorHexFromID,
  formatPrice,
  wardNameFromID,
  districtNameFromID,
  cityNameFromID,
} from '../../utils/idToProperty';
import {
  AppAdminGetPost,
  AppAdminSetStatus,
  CreateRoom,
  GetPersonalPostDetail,
  GetUserInfo,
  LikePost,
  GetPost,
  GetAllReact,
  GetAllRatings,
  AddContact,
} from '../../backendAPI';
// import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useSelector} from 'react-redux';
import {getThemeColor} from '../../utils/getThemeColor';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {
  POPPINS_BOLD,
  POPPINS_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {PostDetailStackParamList} from '../../navigations/PostDetailNavigator';
import PostPreviewLoader from '../common/contentLoader/postPreview';
import {
  APPLICATION_ADMIN,
  CHAT_NAVIGATOR,
  CHAT_ROOM,
  POST_DETAIL,
  POST_DETAIL_NAVIGATOR,
} from '../../constants/routeNames';
import {FAB} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {getSavedPostList, savePost} from '../../services/SavedPost';
import PostPreviewList from '../PostPreviewList';
import PostPreview, {PostPreviewType} from '../PostPreview';
import {personalInfoState} from '../../redux/clientDatabase/personalInfo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PopUpLoading from '../common/popupLoading';
import PopUpMessage from '../common/popupMessage';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

type PostDetailComponentProps = {
  postID: number;
  isActivePost?: boolean;
  isAdmin?: boolean;
  navigation: StackNavigationProp<PostDetailStackParamList, 'PostDetail'>;
  // route : RouteProp
};

type postInfoType = {
  address: {
    Detail_address: string;
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
    rel_Image: Array<number>;
    rel_Like: Array<number>;
    rel_Rating: Array<number>;
  };
  user: {
    Gender: number;
    ID: number;
    ID_Image_Profile: number;
    Name: string;
    Phone_number: string;
    Time_created: Date;
  };
  vehicleinfo: {
    Cubic_power: number;
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

type userInfoType = {
  account: {
    ID: number;
    ID_AccountInfo: number;
    ID_Permission: number;
  };
  accountinfo: {
    Gender: number;
    ID: number;
    ID_Image_Profile: number;
    Name: string;
    Phone_number: string;
    Time_created: Date;
  };
  posts: Array<{
    ID: number;
    Pricetag: number;
    Time_created: Date;
    Title: string;
    rel_Image: Array<number>;
  }>;
};

export type rating = {
  account: number;
  accountinfo: {
    Gender: number;
    ID: number;
    ID_Image_Profile: number;
    Name: string;
    Phone_number: string;
    Time_created: Date;
  };
  rating: {
    Content: string;
    ID: number;
    ID_Account: number;
    Rating_point: number;
    Time_created: Date;
  };
};

export type status = {
  ID: number;
  ID_Post: number;
  Information: string;
  Status: number;
  Time_created: Date;
};

export type personalPostInfoType = {
  address: {
    Detail_address: string;
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
    rel_Image: Array<number>;
    rel_Like: Array<number>;
    rel_Rating: Array<number>;
  };
  ratings: Array<rating>;
  stat: {
    Contact_amount: number;
    Like_amount: number;
    Rating_amount: number;
    View_amount: number;
  };
  statuses: Array<status>;
  vehicleinfo: {
    Cubic_power: number;
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

export type personalReact = {
  contacted: boolean;
  liked: boolean;
  rating: {
    Content: string;
    ID: number;
    ID_Account: number;
    Rating_point: number;
    Time_created: Date;
  };
};

const PostDetailComponent: React.FC<PostDetailComponentProps> = ({
  postID,
  isActivePost,
  isAdmin,
  navigation,
}) => {
  const post = {
    images: [
      {
        ID: '1',
      },
      {
        ID: '2',
      },
      {
        ID: '3',
      },
    ],
    type: 1,
    title: 'SC Project S1 KTM12-41T Slip On Titanium Exhaust | KTM Duke 790',
    price: 45000000,
    content:
      'The Honda Master 125cc is a very comfortable bike for travelling Vietnam thanks to the riding position and the large seat. It is reliable and have easily enough power to take 1 or 2 people through the country. \nThe Honda Master has a high cruising speed means that you can cover many km in a day and still not feel uncomfortable.While it doesn’t offer the off road capabilities of the Honda XR it is great for the highway and main roads between HCM and Hanoi and is available at a cheaper price. \nThe price shown below is for a month rent but you can see the daily and longer rental price on the right side. \nThe Honda Master comes with a rack suitable for 1 bag and a strong phone holder for navigation as well as a map, a D- Lock and bungee cords.',
    name: 'ABC',
    lineup: '1',
    manufacturerYear: 2020,
    condition: 1,
    cubicPower: 125,
    odometer: 10000,
    color: 1,
    brand: 1,
    licensePlate: '29A-12345',
  };

  const ratingPost = [
    {
      ID: 1,
      Rating_point: 5,
      Content:
        'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
      Time_created: '13:50 - 11/01/2022',
      ID_Post: 1,
      ID_Account: 1,
      User_Info: {
        ID: 1,
        ID_Avatar: 1,
        Name: 'Dang Khoa Nguyen',
      },
    },
    {
      ID: 2,
      Rating_point: 4,
      Content: 'Nice bike, good !!!',
      Time_created: '21:30 - 09/01/2022',
      ID_Post: 1,
      ID_Account: 2,
      User_Info: {
        ID: 1,
        ID_Avatar: 2,
        Name: 'Khang Huynh',
      },
    },
    {
      ID: 3,
      Rating_point: 3,
      Content: 'Good cusomer service, I like it.',
      Time_created: '21:30 - 01/01/2022',
      ID_Post: 1,
      ID_Account: 3,
      User_Info: {
        ID: 1,
        ID_Avatar: 3,
        Name: 'Khanh Nguyen',
      },
    },
    {
      ID: 4,
      Rating_point: 1,
      Content:
        'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
      Time_created: '13:50 - 11/01/2022',
      ID_Post: 1,
      ID_Account: 4,
      User_Info: {
        ID: 4,
        ID_Avatar: 4,
        Name: 'Minj07',
      },
    },
    {
      ID: 5,
      Rating_point: 2,
      Content: 'Nice bike, good !!!',
      Time_created: '21:30 - 09/01/2022',
      ID_Post: 1,
      ID_Account: 5,
      User_Info: {
        ID: 5,
        ID_Avatar: 5,
        Name: 'Abcdavid',
      },
    },
    {
      ID: 6,
      Rating_point: 3,
      Content: 'Good cusomer service, I like it.',
      Time_created: '21:30 - 01/01/2022',
      ID_Post: 1,
      ID_Account: 6,
      User_Info: {
        ID: 6,
        ID_Avatar: 6,
        Name: 'Khanh Nguyen',
      },
    },
    {
      ID: 1,
      Rating_point: 5,
      Content:
        'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
      Time_created: '13:50 - 11/01/2022',
      ID_Post: 1,
      ID_Account: 1,
      User_Info: {
        ID: 1,
        ID_Avatar: 1,
        Name: 'Dang Khoa Nguyen',
      },
    },
    {
      ID: 2,
      Rating_point: 4,
      Content: 'Nice bike, good !!!',
      Time_created: '21:30 - 09/01/2022',
      ID_Post: 1,
      ID_Account: 2,
      User_Info: {
        ID: 1,
        ID_Avatar: 2,
        Name: 'Khang Huynh',
      },
    },
    {
      ID: 3,
      Rating_point: 3,
      Content: 'Good cusomer service, I like it.',
      Time_created: '21:30 - 01/01/2022',
      ID_Post: 1,
      ID_Account: 3,
      User_Info: {
        ID: 1,
        ID_Avatar: 3,
        Name: 'Khanh Nguyen',
      },
    },
  ];

  //Get post data
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    if (isAdmin) {
      getInactivePostByAdmin();
    } else if (isActivePost) {
      getData();
      getPersonalReact();
      getRatingList();
    } else {
      getInactivePost();
      getRatingList();
    }
  }, []);

  const getData = async () => {
    const post: postInfoType = await GetPost(postID);
    // console.log('Post Detail: ' + JSON.stringify(post));
    setPostInfo(prevPost => post);
    const user: userInfoType = await GetUserInfo(post.user.ID);
    // console.log('User Info: ' + JSON.stringify(user));
    let tmp = Array.from(user.posts.filter(item => item.ID != postID));
    let tmp2: PostPreviewType[] = [];
    for (let i = 0; i < tmp.length; i++) {
      let post = await GetPost(tmp[i].ID);
      tmp2.push(post);
    }
    setPostList(tmp2);
    setUserInfo(user);
    setIsLoading(false);
  };

  const [postInfo, setPostInfo] = React.useState<postInfoType>();
  const [userInfo, setUserInfo] = React.useState<userInfoType>();
  const [postList, setPostList] = React.useState<Array<PostPreviewType>>([]);

  const userPersonalInfo = useSelector<RootState, personalInfoState>(
    state => state.personalInfo,
  );

  const [personalReact, setPersonalReact] = useState<personalReact>();

  const [ratingList, setRatingList] = useState<rating[]>([]);

  const getRatingList = async () => {
    const result = await GetAllRatings(postID);
    setRatingList(result);
  };

  //Get inactive post data
  const getInactivePost = async () => {
    const post = await GetPersonalPostDetail(postID);
    console.log('Personal Post Detail: ' + JSON.stringify(post));
    setPostInfo(post);
    setIsLoading(false);
  };

  const getInactivePostByAdmin = async () => {
    const post = await AppAdminGetPost(postID);
    console.log('Post Detail by admin: ' + JSON.stringify(post));
    setPostInfo(post);
    setIsLoading(false);
  };

  const getPersonalReact = async () => {
    const react: personalReact = await GetAllReact(postID);
    console.log('React: ' + JSON.stringify(react));
    setIsLiked(react.liked);
    setIsContacted(react.contacted);
    setPersonalReact(react);
  };

  const OnApprovePost = () => {
    ApprovePost();
  };

  const ApprovePost = async () => {
    const approveRes = await AppAdminSetStatus(postID, 1, message);
    console.log('Approve post: ' + JSON.stringify(approveRes));
    // navigate(APPLICATION_ADMIN);
  };

  const renderStarRating = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Octicons
            key={i}
            name="star-fill"
            size={10}
            color="#FCC72E"
            style={{marginLeft: i != 1 ? 3 : 0}}
          />,
        );
      }
    }
    return stars;
  };

  const onNavigate = () => {
    // navigate(SEE_ALL_REVIEWS, {ratingPost});
  };

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
        {postInfo?.post.Content}
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
                {brandNameFromID(
                  postInfo ? postInfo.vehicleinfo.ID_VehicleBrand : -1,
                )}
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
                {conditionNameFromID(
                  postInfo ? postInfo.vehicleinfo.ID_Condition : -1,
                )}
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
                {postInfo && postInfo.vehicleinfo.Cubic_power > 0
                  ? postInfo.vehicleinfo.Cubic_power
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
                {postInfo && postInfo.vehicleinfo.License_plate
                  ? postInfo.vehicleinfo.License_plate
                  : '---'}
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
                  {lineupNameFromID(
                    postInfo ? postInfo.vehicleinfo.ID_VehicleLineup : -1,
                  )}
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
                  color={colorHexFromID(
                    postInfo ? postInfo.vehicleinfo.ID_Color : -1,
                  )}
                  style={{marginLeft: 5}}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: color.onBackground,
                    fontFamily: POPPINS_REGULAR,
                    flex: 1,
                  }}>
                  {colorNameFromID(
                    postInfo ? postInfo.vehicleinfo.ID_Color : -1,
                  )}
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
                  {postInfo && postInfo.vehicleinfo.Odometer > 0
                    ? postInfo.vehicleinfo.Odometer
                    : '---'}
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
                  {postInfo && postInfo.vehicleinfo.Manufacture_year > 0
                    ? postInfo.vehicleinfo.Manufacture_year
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
            {postInfo ? postInfo.vehicleinfo.Vehicle_name : '--'}
          </Text>
        </View>
      </View>
    </View>
  );

  const ReviewRoute = () => {
    if (ratingList.length == 0) {
      return (
        <View
          style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: color.onBackground_light,
              fontWeight: '500',
              fontFamily: POPPINS_REGULAR,
            }}>
            No review yet
          </Text>
        </View>
      );
    }
    let shorttenRatingPost = ratingList.slice(0, 5);
    return (
      <View>
        {shorttenRatingPost.map((item, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 8,
                marginLeft: 10,
              }}>
              <MobikeImage
                imageID={item.accountinfo.ID_Image_Profile}
                style={{width: 40, height: 40, borderRadius: 500}}
              />
              <View style={{marginHorizontal: 15, flex: 1}}>
                {/* Name & Time Created */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: color.onBackground,
                      fontFamily: POPPINS_MEDIUM,
                      fontSize: 12,
                      flex: 1,
                    }}>
                    {item.accountinfo.Name}
                  </Text>
                  <Text
                    style={{
                      color: color.onBackground_light,
                      fontWeight: '300',
                      fontSize: 10,
                      fontStyle: 'italic',
                      marginLeft: 10,
                    }}>
                    {item.rating.Time_created.toLocaleDateString()}
                  </Text>
                </View>

                {/* Rating Star */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  {renderStarRating(item.rating.Rating_point)}
                </View>

                {/* Content */}
                <Text style={{marginTop: 5, fontStyle: 'italic', fontSize: 12}}>
                  {item.rating.Content}
                </Text>
              </View>
            </View>

            {/* Seperate */}
            <View
              style={{height: 1, backgroundColor: color.divider, marginTop: 10}}
            />
          </View>
        ))}

        {/* View All */}
        <View
          style={{height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableNativeFeedback onPress={onNavigate}>
            <Text
              style={{
                color: colors.text,
                fontWeight: '400',
                fontStyle: 'italic',
                fontSize: 12,
              }}>
              {'See all (' + ratingPost.length + ') >'}
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Details', title: 'Details'},
    {key: 'Reviews', title: 'Reviews'},
  ]);

  const renderScene = SceneMap({
    Details: DetailRoute,
    Reviews: ReviewRoute,
  });

  const _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const [message, setMessage] = useState('');
  const onSetMessage = (content: string) => {
    setMessage(content);
  };

  const color = useTheme().colors.customColors;

  // const {navigate} = useNavigation();

  //Header
  const onGoBack = () => {
    navigation.goBack();
  };

  const onLikePost = () => {
    onSavePost(postID);
    LikePost(postID);
    setIsLiked(!isLiked);
  };
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [savedPostList, setSavedPostList] = useState<number[] | null>();

  useEffect(() => {
    const getDataSavedPostList = async () => {
      let arr: number[] | null = await getSavedPostList();
      setSavedPostList(arr);
      if (postID != null && arr?.includes(postID)) setIsLiked(true);
    };
    getDataSavedPostList();
  }, []);

  const onSavePost = async (id: number | null) => {
    if (id == null) return;
    if (savedPostList != null) {
      let arr = [...savedPostList];
      if (arr.includes(id)) {
        arr.splice(arr.indexOf(id), 1);
      } else {
        arr.unshift(id);
      }
      setSavedPostList(arr);
      await savePost(arr);
    } else {
      setSavedPostList([id]);
      await savePost([id]);
    }
  };

  const renderHeader = () => {
    return (
      <View>
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
              Post Detail
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
          data={
            postInfo && postInfo.post.rel_Image.length != 0
              ? postInfo.post.rel_Image
              : [-1]
          }
          isImageID={true}
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
              {typeNameFromID(
                postInfo ? postInfo.vehicleinfo.ID_VehicleType : -1,
              )}
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
              {postInfo ? postInfo.post.Title : ''}
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
              {formatPrice(postInfo?.post.Pricetag) + ' VND'}
            </Text>

            {/* Save button, only when viewed by other user */}
            {isActivePost && (
              <Pressable
                onPress={onLikePost}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: isLiked ? color.error + '4D' : color.divider,
                  }}>
                  {isLiked ? (
                    <Ionicons name={'heart'} size={20} color={color.error} />
                  ) : (
                    <Ionicons
                      name={'heart-outline'}
                      size={20}
                      color={color.onBackground_light}
                    />
                  )}

                  <Text
                    style={{
                      fontFamily: POPPINS_REGULAR,
                      fontSize: getFontSize(14),
                      color: isLiked ? color.error : color.onBackground_light,
                      marginStart: 4,
                      marginTop: 2,
                    }}>
                    Save Post
                  </Text>
                </View>
              </Pressable>
            )}
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
        {/* {ReviewRoute()} */}

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
        {isActivePost ? (
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingBottom: 12,
              marginLeft: 20,
            }}>
            <MobikeImage
              imageID={postInfo && postInfo.user.ID_Image_Profile}
              avatar={true}
            />

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
                  {postInfo ? postInfo.user.Name : '--'}
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
                  {wardNameFromID(postInfo && postInfo.address.ID_Ward) +
                    ', ' +
                    districtNameFromID(
                      postInfo && postInfo.address.ID_District,
                    ) +
                    ', ' +
                    cityNameFromID(postInfo && postInfo.address.ID_City)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingBottom: 12,
              marginLeft: 20,
            }}>
            <MobikeImage
              imageID={userPersonalInfo && userPersonalInfo.ID_Image_Profile}
              avatar={true}
            />

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
                  {userPersonalInfo ? userPersonalInfo.Name : '--'}
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
                  {wardNameFromID(postInfo && postInfo.address.ID_Ward) +
                    ', ' +
                    districtNameFromID(
                      postInfo && postInfo.address.ID_District,
                    ) +
                    ', ' +
                    cityNameFromID(postInfo && postInfo.address.ID_City)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/*if view post by personal user then show these statistic part */}
        {!isActivePost && !isAdmin && (
          <View>
            <View
              style={{
                backgroundColor: color.divider,
                height: 1,
                marginTop: 0,
                marginHorizontal: 20,
              }}
            />
            <Text
              style={{
                fontFamily: POPPINS_SEMI_BOLD,
                fontSize: getFontSize(16),
                color: color.onBackground,
                marginTop: 12,
                marginLeft: 20,
                marginBottom: 12,
              }}>
              Statistics
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingHorizontal: 20,
                alignSelf: 'center',
              }}>
              <View style={{width: widthScreen / 2 - 30}}>
                {/* Like */}
                <View style={{flexDirection: 'row', marginBottom: 15}}>
                  <AntDesign name="heart" size={18} color={color.error} />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: getFontSize(14),
                      color: color.onBackground_light,
                      fontFamily: POPPINS_REGULAR,
                    }}>
                    Like :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: color.onBackground,
                      fontFamily: POPPINS_REGULAR,
                      flex: 1,
                    }}>
                    {postInfo ? postInfo.stat.Like_amount : '--'}
                  </Text>
                </View>

                {/* Contact */}
                <View style={{flexDirection: 'row', marginBottom: 15}}>
                  <MaterialCommunityIcons
                    name="contacts"
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
                    Contact :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: color.onBackground,
                      fontFamily: POPPINS_REGULAR,
                      flex: 1,
                    }}>
                    {postInfo ? postInfo.stat.Contact_amount : '--'}
                  </Text>
                </View>
              </View>
              <View style={{width: widthScreen / 2 - 30}}>
                {/* View */}
                <View style={{flexDirection: 'row', marginBottom: 15}}>
                  <MaterialCommunityIcons
                    name="account-eye-outline"
                    size={18}
                    color={color.onBackground_light}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: getFontSize(14),
                      color: color.onBackground_light,
                      fontFamily: POPPINS_REGULAR,
                    }}>
                    View :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: color.onBackground,
                      fontFamily: POPPINS_REGULAR,
                      flex: 1,
                    }}>
                    {postInfo ? postInfo.stat.View_amount : '--'}
                  </Text>
                </View>

                {/* Rating */}
                <View style={{flexDirection: 'row', marginBottom: 15}}>
                  <FontAwesome5
                    name="comment-dots"
                    size={18}
                    color={color.popupWarning}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: getFontSize(14),
                      color: color.onBackground_light,
                      fontFamily: POPPINS_REGULAR,
                    }}>
                    Rating :{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: color.onBackground,
                      fontFamily: POPPINS_REGULAR,
                      flex: 1,
                    }}>
                    {postInfo ? postInfo.stat.Rating_amount : '--'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderItem: ListRenderItem<PostPreviewType> = ({item, index}) => {
    return (
      <PostPreview
        postID={item.post.ID}
        post={item}
        key={index}
        styleWrapper={{marginTop: 13}}
        isActivePost={true}
        pressable={true}
        onPress={() => {
          navigation.push(POST_DETAIL, {
            postID: item.post.ID,
            isActivePost: true,
            isAdmin: false,
          });
        }}
        index={index}
        color={color}
      />
    );
  };

  const keyExtractor = (item: PostPreviewType) => {
    return item.post.ID.toString();
  };

  const loadingArray = [1, 2, 3, 4, 5, 6];

  const {navigate} = useNavigation();

  const onApprove = async (status: number) => {
    setIsLoadingPopup(true);
    let res = await AppAdminSetStatus(postInfo?.post.ID, status, messageAdmin);
    setIsLoadingPopup(false);
    if (res) {
      setIsSuccess(true);
      setTextSuccess('Approve post successfully');
    } else {
      setIsError(true);
      setTextError('Approve post failed');
    }
  };

  const [messageAdmin, setMessageAdmin] = useState<string>('');

  //Popup message
  const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
  const onChangeLoadingState = (x: boolean) => {
    setIsLoadingPopup(x);
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

  const onContact = async (ID: number) => {
    await AddContact(ID);
  };
  const [isContacted, setIsContacted] = useState<boolean>();

  return (
    <View
      style={{
        height: '100%',
        position: 'relative',
        flex: 1,
        backgroundColor: color.background,
      }}>
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-around',
          marginHorizontal: widthScreen * 0.01,
        }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        data={postList}
        ListHeaderComponent={renderHeader()}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={() => {
          if (isLoading) {
            const loadingArray = [1, 2];
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  marginHorizontal: widthScreen * 0.01,
                  marginBottom: 80,
                }}>
                {loadingArray.map((item, index) => (
                  <PostPreviewLoader key={item} />
                ))}
              </View>
            );
          }
          return <View style={{height: 100}} />;
        }}
      />
      {/*if post view by admin and other user then show these buttons */}
      {isActivePost && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: color.background_bottomNav,
            height: 70,
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              width: '50%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
            onPress={async () => {
              // TODO: Navigate to chat screen
              if (isAdmin) {
                onApprove(1);
              } else {
                let room = await CreateRoom(postID, [
                  userPersonalInfo.ID,
                  postInfo?.user.ID,
                ]);
                console.log('Room created: ' + JSON.stringify(room));
                onContact(postID);
                navigate(CHAT_NAVIGATOR, {
                  screen: CHAT_ROOM,
                  params: {
                    roomID: room.room._id,
                    sellerID: postInfo?.user.ID,
                  },
                });
              }
            }}>
            {!isAdmin && (
              <Ionicons
                name="chatbubbles-outline"
                size={24}
                color={'#8DEE8B'}
              />
            )}
            <Text
              style={{
                marginStart: 12,
                fontSize: getFontSize(20),
                fontFamily: POPPINS_REGULAR,
                color: color.onBackground_light,
              }}>
              {isAdmin ? 'Approve' : 'Chat'}
            </Text>
          </Pressable>
          <View
            style={{width: 1, height: '50%', backgroundColor: color.divider}}
          />
          <Pressable
            style={{
              flexDirection: 'row',
              width: '50%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
            onPress={() => {
              if (isAdmin) {
                onApprove(3);
                return;
              }
              Linking.openURL(
                `tel:${userInfo && userInfo.accountinfo.Phone_number}`,
              );
              onContact(postID);
              setIsContacted(true);
            }}>
            {!isAdmin && (
              <Feather name="phone-call" size={24} color={'#8DEE8B'} />
            )}
            <Text
              style={{
                marginStart: 12,
                fontSize: getFontSize(20),
                fontFamily: POPPINS_REGULAR,
                color: color.onBackground_light,
              }}>
              {isAdmin ? 'Decline' : 'Call'}
            </Text>
          </Pressable>
        </View>
      )}

      <PopUpLoading
        text={'Loading...'}
        visibility={isLoadingPopup}
        onChangePopupVisibility={onChangeLoadingState}
      />
      <PopUpMessage
        message={textSuccess}
        type={'success'}
        visibility={isSuccess}
        onChangePopupVisibility={onChangeSuccessState}
        havingTwoButton={true}
        labelCTA="Go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <PopUpMessage
        message={textError}
        type={'error'}
        visibility={isError}
        onChangePopupVisibility={onChangeErrorState}
        havingTwoButton={true}
        labelCTA="Ok"
      />
    </View>
  );
};

export default PostDetailComponent;

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
  styleWrapper: {
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});
