import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import {Avatar, Button, FAB, RadioButton} from 'react-native-paper';
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import Container from '../../common/container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, {
  Easing,
  FadeInUp,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import AddressBottomSheetContent from './AddressBottomSheetContent';
import Store, {RootState} from '../../../redux/store';
import colors, {ColorThemeProps} from '../../../assets/theme/colors';
import {Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {KeyboardAvoidingView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FilterPropFrameComponent from '../../FiltersPopUp/FilterPropFrame';
import {
  SetProfileImage,
  SetPersonalInfo,
  SetIdentityImage,
  SetPersonalAddress,
} from '../../../backendAPI';
import {UpdatePersonalInfo} from '../../../services/TokenStorage';
import {useNavigation, useTheme} from '@react-navigation/native';
// import {Popup, Root} from 'popup-ui';
import {PROFILE} from '../../../constants/routeNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../../navigations/ProfileNavigator';
import TextField from '../../common/textField';
import {useSelector} from 'react-redux';
import {getThemeColor} from '../../../utils/getThemeColor';
import {
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../../assets/fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {getFontSize} from '../../../utils/fontSizeResponsive';
import CustomButton from '../../common/customButton';
import PopUpMessage from '../../common/popupMessage';
import PopUpLoading from '../../common/popupLoading';
import {addressTree} from '../../../redux/clientDatabase/location';
import {ThemeState} from '../../../redux/slice/themeSlice';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

type EditProfileComponentProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

const EditProfileComponent: React.FC<EditProfileComponentProps> = ({
  navigation,
}) => {
  const color = useTheme().colors.customColors;
  const theme = useSelector<RootState, ThemeState>(state => state.theme);

  const [isEdited, setIsEdited] = useState<boolean>(false);

  const addressTree = useSelector<RootState, addressTree>(
    state => state.locations.Tree,
  );
  const locations = {
    Cities: Store.getState().locations.Cities,
    Districts: Store.getState().locations.Districts,
    Wards: Store.getState().locations.Wards,
  };

  type formType = {
    name?: string;
    phone_number?: number;
    gender?: number;
    identification_number?: number;
    birthday?: string;
    profileImage?: number;
    idfrontImage?: number;
    idbackImage?: number;
  };

  const [form, setForm] = useState<formType>({
    name: '',
    phone_number: undefined,
    gender: 0,
    identification_number: undefined,
    birthday: '',
    profileImage: undefined,
    idfrontImage: undefined,
    idbackImage: undefined,
  });

  // useEffect(() => {
  //   if (!isEdited) setIsEdited(true);
  // }, [setForm]);

  const [errors, setErrors] = useState();
  const onChange = ({name, value}: {name: string; value: any}) => {
    setForm({...form, [name]: value});
    if (!isEdited) setIsEdited(true);
  };

  //set up date picker
  const [show, setShow] = useState(false);

  useEffect(() => {
    const personalInfo = Store.getState().personalInfo;
    console.log('Personal Info: ' + JSON.stringify(personalInfo));
    if (personalInfo) {
      setForm({
        ...form,
        name: personalInfo.Name || '',
        phone_number: personalInfo.Phone_number || undefined,
        gender: personalInfo.Gender || 0,
        identification_number: personalInfo.Identification_number || undefined,
        birthday: personalInfo.Birthdate || '',
        profileImage: personalInfo.ID_Image_Profile || 0,
        idfrontImage: personalInfo.ID_Image_Identity_Front || 0,
        idbackImage: personalInfo.ID_Image_Identity_Back || 0,
      });
      const temp: Array<{
        ID: number;
        IsTemporary: boolean;
        IsDeleted: boolean;
        City: number;
        District: number;
        Ward: number;
        DetailAddress: string;
      }> = [];
      for (let index in personalInfo.Addresses) {
        // console.log('Adding address: ' + index + ' to address list');
        const address = personalInfo.Addresses[parseInt(index)];
        temp[parseInt(index)] = {
          ID: address.ID,
          IsTemporary: false,
          IsDeleted: false,
          City: address.ID_City,
          District: address.ID_District,
          Ward: address.ID_Ward,
          DetailAddress: address.Detail_address,
        };
      }
      // console.log('Temp: ' + JSON.stringify(temp));
      setAddressList(Object.values(temp));
    }
  }, []);

  const getNewAddressID = () => {
    if (addressList.length == 0) {
      return 1;
    }
    // Find max ID
    let maxID = 0;
    for (let index in addressList) {
      const address = addressList[index];
      if (address.ID > maxID) {
        maxID = address.ID;
      }
    }
    return maxID + 1;
  };

  const onBirthdateChange = (event: any, selectedDate: any) => {
    let currentDate;
    if (selectedDate) {
      currentDate =
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear();
    } else {
      currentDate = form.birthday;
    }
    setShow(false);
    onChange({name: 'birthday', value: currentDate});
  };
  const showDatePicker = () => {
    setShow(true);
    // console.log('show date picker');
  };

  //Which image is being selected
  const [selectedImage, setSelectedImage] = useState<string>();

  //Set up avatar image
  const [avatarImage, setAvatarImage] = useState<any>();

  //Set up upload identification number image
  const [Images, setImages] = useState([]);
  const [FrontIDImage, setFrontIDImage] = useState<any>();
  const [BackIDImage, setBackIDImage] = useState<any>();
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag(!flag);
  };
  const launchCamera = (selectedImage: any) => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response: any) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));

        // setFileData(response.data);
        if (selectedImage == 'front') {
          setFrontIDImage(response.assets[0]);
        } else if (selectedImage == 'back') {
          setBackIDImage(response.assets[0]);
        } else {
          setAvatarImage(response.assets[0]);
        }
        changeFlag();
      }
    });
  };

  const launchImageLibrary = (selectedImage: any) => {
    let options: any = {
      selectionLimit: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response: any) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));

        // setFileData(response.data);
        if (selectedImage == 'front') {
          setFrontIDImage(response.assets[0]);
        } else if (selectedImage == 'back') {
          setBackIDImage(response.assets[0]);
        } else {
          setAvatarImage(response.assets[0]);
        }
        changeFlag();
      }
    });
  };

  const opacity = useSharedValue(1);
  const opacityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 50,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const opacityBlack = useSharedValue(0);
  const opacityBlackAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityBlack.value, {
        duration: 50,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  // const imageBottomSheet = useRef(null);
  const [isImageBottomSheetVisible, setImageBottomSheetVisible] =
    useState(false);

  const imageBottomSheet = useRef<BottomSheet>(null);
  const snapPointsImage = useMemo(() => ['30%'], []);

  // callbacks
  const handleImageSheetChange = useCallback((index: number) => {
    // console.log('handleColorSheetChange', index);
  }, []);
  const handleImageSnapPress = useCallback((index: number) => {
    imageBottomSheet.current?.snapToIndex(index);
    setImageBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseImagePress = useCallback(() => {
    imageBottomSheet.current?.close();
    opacity.value = 1;
    opacityBlack.value = 0;
    setImageBottomSheetVisible(false);
  }, []);

  const _renderContentImage = () => {
    return (
      <View
        style={{
          backgroundColor: color.surface,
          height: '100%',
          alignItems: 'center',
          paddingTop: 12,
        }}>
        <Button
          mode="contained"
          onPress={() => {
            launchCamera(selectedImage);
            // changeImageBottomSheetVisibility(false);
            handleCloseImagePress();
          }}
          textColor={color.onSecondary}
          style={{
            width: '80%',
            marginVertical: 10,
            backgroundColor: color.secondary,
          }}>
          Take photo
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            launchImageLibrary(selectedImage);
            // changeImageBottomSheetVisibility(false);
            handleCloseImagePress();
          }}
          textColor={color.onSecondary}
          style={{
            width: '80%',
            marginVertical: 10,
            backgroundColor: color.secondary,
          }}>
          Choose from library
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            // changeImageBottomSheetVisibility(false);
            handleCloseImagePress();
          }}
          textColor={color.onBackground_light}
          style={{
            width: '80%',
            marginVertical: 10,
            backgroundColor: color.divider,
          }}>
          Cancel
        </Button>
      </View>
    );
  };

  //set up address picker
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [initialAddress, setInitialAddress] = useState({
    City: '',
    District: '',
    Ward: '',
  });

  const bottomSheetAddressRef = useRef<BottomSheet>(null);
  const snapPointsAddress = useMemo(() => ['80%'], []);

  // callbacks
  const handleAddressSheetChange = useCallback((index: number) => {
    // console.log('handleAddressSheetChange', index);
  }, []);
  const handleAddressSnapPress = useCallback((index: number) => {
    bottomSheetAddressRef.current?.snapToIndex(index);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
    setBottomSheetVisible(true);
  }, []);
  const handleCloseAddressPress = useCallback(() => {
    bottomSheetAddressRef.current?.close();
    opacity.value = 1;
    opacityBlack.value = 0;
    setBottomSheetVisible(false);
  }, []);

  //Set up address section
  const [showAddress, setShowAddress] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShowAddress(prevState => !prevState);
  };

  type addressItemType = {
    ID: number;
    IsTemporary: boolean;
    IsDeleted: boolean;
    City: number;
    District: number;
    Ward: number;
    DetailAddress: string;
  };
  const [addressList, setAddressList] = useState<addressItemType[]>([]);
  const [currentAddress, setCurrentAddress] = useState<any>();

  const cityNameFromID = (ID: number) => {
    const city = locations.Cities.find(city => city.ID === ID);
    if (city) return city.Name;
    else return 'cne';
  };

  const districtNameFromID = (ID: number) => {
    let district = locations.Districts.find(district => district.ID === ID);
    if (district) return district.Name;
    else return 'dne';
  };

  const wardNameFromID = (ID: number) => {
    let ward = locations.Wards.find(ward => ward.ID === ID);
    if (ward) return ward.Name;
    else return 'wne';
  };

  const OnAddressEditFinish = (address: any) => {
    // console.log('Edit address finish ' + JSON.stringify(address));
    const newAddressList = Array.from(addressList);
    const oldAddressIndex = newAddressList.findIndex(a => a.ID === address.ID);
    if (oldAddressIndex === -1) {
      newAddressList.push(address);
    } else {
      newAddressList[oldAddressIndex] = address;
    }
    setAddressList(newAddressList);
    if (!isEdited) setIsEdited(true);
  };

  const OnAddNewAddess = () => {
    // console.log('Add new address');
    let newAddress = {
      ID: getNewAddressID(),
      IsTemporary: true,
      IsDeleted: false,
      City: 0,
      District: undefined,
      Ward: undefined,
      DetailAddress: '',
    };
    setCurrentAddress(newAddress);
    // changeBottomSheetVisibility(true);
    handleAddressSnapPress(0);
  };

  const OnAddressEdit = (ID: number) => {
    // console.log('Edit address ' + ID);
    setCurrentAddress(addressList.find(address => address.ID === ID));
    // changeBottomSheetVisibility(true);
    handleAddressSnapPress(0);
  };

  const setName = (value: any) => {
    onChange({name: 'name', value: value});
  };

  const setGender = (value: any) => {
    onChange({name: 'gender', value: value});
  };

  const setPhoneNumber = (value: any) => {
    onChange({name: 'phone_number', value: value});
  };

  const setIdentificationNumber = (value: any) => {
    onChange({name: 'identification_number', value: value});
  };

  const onBack = () => {
    if (isEdited) {
      setIsWarning(true);
      setTextWarning('Do you want to discard the changed information?');
    } else navigation.navigate(PROFILE);
  };

  const Save = async () => {
    const pros = [];
    if (avatarImage) {
      // console.log('Uploading profile image: ' + JSON.stringify(avatarImage));
      pros.push(SetProfileImage(avatarImage));
    }

    console.log('Personal info after changes: ' + JSON.stringify(form));
    pros.push(
      SetPersonalInfo(
        form.name,
        form.birthday,
        form.gender,
        form.phone_number,
        form.identification_number,
      ),
    );

    if (FrontIDImage && BackIDImage) {
      console.log(
        'Uploading ID image: ' +
          JSON.stringify(FrontIDImage) +
          ' ' +
          JSON.stringify(BackIDImage),
      );
      pros.push(SetIdentityImage(FrontIDImage, BackIDImage));
    }

    // console.log('Address list: ' + JSON.stringify(addressList));
    pros.push(SetPersonalAddress(addressList));

    const res = await Promise.all(pros);
    setIsLoading(false);
    if (res.every(result => result)) {
      await UpdatePersonalInfo();
      setTextSuccess('Profiled saved');
      setIsSuccess(true);
    } else {
      setTextError('Profile save failed');
      setIsError(true);
    }
  };
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

  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [textWarning, setTextWarning] = useState<string>('');
  const onChangeWarningState = (x: boolean) => {
    setIsWarning(x);
  };

  return (
    // <Root>
    <KeyboardAvoidingView
      style={{height: '100%'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View
        style={[{height: '100%', backgroundColor: color.background}]}>
        <View style={styles.wrapperHeader}>
          <Pressable
            onPress={onBack}
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
              Edit Profile
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
          keyboardShouldPersistTaps={'never'}
          styleScrollView={{
            backgroundColor: color.background,
            height: heightScreen,
          }}>
          <Animated.View
            style={[
              {
                paddingHorizontal: 20,
                marginTop: 15,
                flex: 1,
                height: '100%',
              },
              // opacityAnimatedStyle,
            ]}>
            {avatarImage ? (
              <Avatar.Image
                size={80}
                source={{uri: avatarImage.uri}}
                style={{alignSelf: 'center'}}
              />
            ) : (
              <Avatar.Image
                size={80}
                source={
                  form.profileImage != 0
                    ? {
                        uri:
                          'https://abcdavid-knguyen.ddns.net:30001/image/get/' +
                          form.profileImage,
                      }
                    : require('../../../assets/images/image-not-found.jpg')
                }
                style={{alignSelf: 'center'}}
              />
            )}
            <Pressable
              onPress={() => {
                handleImageSnapPress(0);
                setSelectedImage('avatar');
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: colors.primary,
                  fontFamily: POPPINS_MEDIUM,
                  marginTop: 5,
                }}>
                Change avatar
              </Text>
            </Pressable>
            <View style={{marginTop: 10}}>
              {/*Name*/}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Name
                </Text>
                <TextField
                  label={''}
                  iconClass={MaterialIcons}
                  iconName={'drive-file-rename-outline'}
                  iconColor={color.primary}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginBottom: 8,
                  }}
                  onChangeText={value => {
                    setName(value);
                  }}
                  editable={!isBottomSheetVisible && !isImageBottomSheetVisible}
                  value={form.name}
                />
              </View>

              {/*Birthday*/}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Birthday
                </Text>
                <Pressable onPress={showDatePicker}>
                  <TextField
                    label={''}
                    iconClass={MaterialIcons}
                    iconName={'date-range'}
                    iconColor={color.primary}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      marginBottom: 8,
                    }}
                    editable={false}
                    value={form.birthday}
                  />
                </Pressable>
              </View>

              {/*Gender*/}
              <View style={{marginBottom: 12}}>
                <Text
                  style={[
                    styles.styleTitle,
                    {color: color.onBackground, marginBottom: 8},
                  ]}>
                  Gender
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '48%',
                      borderWidth: 1,
                      borderColor: color.divider,
                      borderRadius: 7,
                      height: 44,
                      backgroundColor: color.background,
                      paddingStart: 10,
                    }}>
                    <RadioButton
                      value="Male"
                      status={form.gender === 1 ? 'checked' : 'unchecked'}
                      onPress={() => setGender(1)}
                      disabled={
                        isBottomSheetVisible || isImageBottomSheetVisible
                      }
                    />
                    <Text
                      style={{
                        color:
                          form.gender === 1
                            ? colors.primary
                            : color.onBackground_light,
                        fontSize: getFontSize(14),
                        top: 2,
                        fontFamily: POPPINS_REGULAR,
                        marginStart: 5,
                      }}>
                      Male
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '48%',
                      borderWidth: 1,
                      borderColor: color.divider,
                      borderRadius: 7,
                      height: 44,
                      backgroundColor: color.background,
                      paddingStart: 10,
                    }}>
                    <RadioButton
                      value="Female"
                      status={form.gender === 2 ? 'checked' : 'unchecked'}
                      onPress={() => setGender(2)}
                      disabled={
                        isBottomSheetVisible || isImageBottomSheetVisible
                      }
                    />
                    <Text
                      style={{
                        color:
                          form.gender === 2
                            ? colors.primary
                            : color.onBackground_light,
                        fontSize: getFontSize(14),
                        top: 2,
                        fontFamily: POPPINS_REGULAR,
                        marginStart: 5,
                      }}>
                      Female
                    </Text>
                  </View>
                </View>
              </View>

              {/*Phone number*/}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Phone Number
                </Text>
                <TextField
                  label={''}
                  iconClass={Ionicons}
                  iconName={'call'}
                  iconColor={color.primary}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginBottom: 8,
                  }}
                  keyboardType={'number-pad'}
                  onChangeText={value => {
                    setPhoneNumber({name: 'phone number', value});
                  }}
                  editable={!isBottomSheetVisible && !isImageBottomSheetVisible}
                  value={form.phone_number?.toString()}
                />
              </View>

              {/*Identification number*/}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Identification Number
                </Text>
                <TextField
                  label={''}
                  iconClass={MaterialCommunityIcons}
                  iconName={'identifier'}
                  iconColor={color.primary}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginBottom: 8,
                  }}
                  value={form.identification_number?.toString()}
                  keyboardType={'number-pad'}
                  onChangeText={value => {
                    setIdentificationNumber(value);
                  }}
                  editable={!isBottomSheetVisible && !isImageBottomSheetVisible}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 5,
                  }}>
                  <View style={{alignItems: 'center', width: '48%'}}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        // changeImageBottomSheetVisibility(true);
                        handleImageSnapPress(0);
                        setSelectedImage('front');
                      }}>
                      {FrontIDImage ? (
                        <Image
                          source={{uri: FrontIDImage.uri}}
                          style={styles.images}
                        />
                      ) : form.idfrontImage ? (
                        <Image
                          source={{
                            uri:
                              'https://abcdavid-knguyen.ddns.net:30001/image/get/' +
                              form.idfrontImage,
                          }}
                          style={styles.images}
                        />
                      ) : (
                        <View
                          style={[
                            styles.images,
                            {
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                              backgroundColor: color.background,
                              borderColor: color.divider,
                              borderWidth: 1,
                              paddingHorizontal: 10,
                            },
                          ]}>
                          <Entypo
                            name="camera"
                            size={36}
                            color={color.primary}
                          />
                          <Text
                            style={{
                              fontSize: getFontSize(10),
                              fontFamily: POPPINS_REGULAR,
                              color: color.onBackground_light,
                              textAlign: 'center',
                              marginTop: 5,
                            }}>
                            Upload the front side of your ID card
                          </Text>
                        </View>
                      )}
                    </TouchableWithoutFeedback>

                    <Text
                      style={{
                        fontSize: getFontSize(14),
                        color: color.onBackground_light,
                        fontFamily: POPPINS_REGULAR,
                        marginTop: 3,
                      }}>
                      Front
                    </Text>
                  </View>

                  <View style={{alignItems: 'center', width: '48%'}}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        // changeImageBottomSheetVisibility(true);
                        handleImageSnapPress(0);
                        setSelectedImage('back');
                      }}>
                      {BackIDImage ? (
                        <Image
                          source={{uri: BackIDImage.uri}}
                          style={styles.images}
                        />
                      ) : form.idbackImage ? (
                        <Image
                          source={{
                            uri:
                              'https://abcdavid-knguyen.ddns.net:30001/image/get/' +
                              form.idbackImage,
                          }}
                          style={styles.images}
                        />
                      ) : (
                        <View
                          style={[
                            styles.images,
                            {
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                              backgroundColor: color.background,
                              borderColor: color.divider,
                              borderWidth: 1,
                              paddingHorizontal: 10,
                            },
                          ]}>
                          <Entypo
                            name="camera"
                            size={36}
                            color={color.primary}
                          />
                          <Text
                            style={{
                              fontSize: getFontSize(10),
                              fontFamily: POPPINS_REGULAR,
                              color: color.onBackground_light,
                              textAlign: 'center',
                              marginTop: 5,
                            }}>
                            Upload the back side of your ID card
                          </Text>
                        </View>
                      )}
                    </TouchableWithoutFeedback>

                    <Text
                      style={{
                        fontSize: getFontSize(14),
                        color: color.onBackground_light,
                        fontFamily: POPPINS_REGULAR,
                        marginTop: 3,
                      }}>
                      Backside
                    </Text>
                  </View>
                </View>
              </View>

              {/*Address*/}
              <FilterPropFrameComponent
                divider={false}
                styleLabel={{
                  color: color.onBackground,
                  fontSize: getFontSize(14),
                  fontFamily: POPPINS_MEDIUM,
                  marginStart: 0,
                }}
                type={'Address'}
                onToggle={onToggle}
                show={showAddress}>
                <Animated.View
                  entering={FadeInUp.duration(300).delay(100)}
                  layout={Layout.stiffness(100)
                    .damping(10)
                    .duration(durationLayout)}>
                  {addressList.length > 0
                    ? addressList
                        .filter(item => !item.IsDeleted)
                        .map((item, index) => (
                          <View key={index}>
                            <View
                              style={{
                                flexDirection: 'row',
                                padding: 12,
                                paddingEnd: 20,
                              }}>
                              <View
                                style={{
                                  width: 25,
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: !item.IsTemporary
                                      ? color.onBackground_light
                                      : color.primary,
                                    // fontWeight: item.IsTemporary
                                    //   ? 'bold'
                                    //   : '400',
                                    fontFamily: item.IsTemporary
                                      ? POPPINS_SEMI_BOLD
                                      : POPPINS_REGULAR,
                                    fontSize: getFontSize(14),
                                  }}>
                                  {index + 1}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  flex: 1,
                                  marginEnd: 15,
                                }}>
                                {item.DetailAddress && (
                                  <Text
                                    style={{
                                      color: color.onBackground,
                                      // fontFamily: POPPINS_REGULAR,
                                      fontSize: getFontSize(14),
                                    }}>
                                    {item.DetailAddress}
                                  </Text>
                                )}
                                <Text
                                  style={{
                                    color: color.onBackground,
                                    // fontFamily: POPPINS_REGULAR,
                                    fontSize: getFontSize(14),
                                  }}>
                                  {wardNameFromID(item.Ward)},{' '}
                                  {districtNameFromID(item.District)},{' '}
                                  {cityNameFromID(item.City)}
                                </Text>
                              </View>
                              <View style={{justifyContent: 'center'}}>
                                <TouchableWithoutFeedback
                                  onPress={() => {
                                    OnAddressEdit(item.ID);
                                  }}>
                                  <FontAwesome5
                                    name="edit"
                                    size={18}
                                    color={color.primary}
                                  />
                                </TouchableWithoutFeedback>
                              </View>
                            </View>

                            <View
                              style={{
                                height: 1,
                                borderBottomWidth: 1,
                                borderBottomColor: color.divider,
                                marginStart: 35,
                                marginEnd: 20,
                              }}
                            />
                          </View>
                        ))
                    : null}
                  <TouchableWithoutFeedback onPress={OnAddNewAddess}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color={color.primary}
                      />
                      <Text
                        style={{
                          fontSize: getFontSize(16),
                          fontFamily: POPPINS_MEDIUM,
                          // color: '#555',
                          marginStart: 5,
                          color: color.primary,
                          top: 2,
                        }}>
                        Add new address
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </Animated.View>
              </FilterPropFrameComponent>

              <View style={{height: 150}}></View>
            </View>
          </Animated.View>

          <CustomButton
            title="Apply Changes"
            onPress={() => {
              setIsLoading(true);
              Save();
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              marginBottom: 40,
            }}
          />
        </Container>

        {show && (
          <DateTimePicker
            testID="datetimePicker"
            value={
              form.birthday !== '' && form.birthday
                ? new Date(
                    parseInt(form.birthday.split('/')[2]),
                    parseInt(form.birthday.split('/')[1]) - 1,
                    parseInt(form.birthday.split('/')[0]),
                  )
                : new Date(Date.now())
            }
            mode={'date'}
            display="default"
            onChange={onBirthdateChange}
            themeVariant={theme}
          />
        )}

        {/*Address bottomsheet*/}
        <BottomSheet
          ref={bottomSheetAddressRef}
          index={-1}
          snapPoints={snapPointsAddress}
          enablePanDownToClose={true}
          onClose={() => {
            opacity.value = 1;
            opacityBlack.value = 0;
            setBottomSheetVisible(false);
          }}
          handleIndicatorStyle={{backgroundColor: color.onBackground_light}}
          handleStyle={{
            backgroundColor: color.background_bottomNav,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}
          style={{
            backgroundColor: color.background,
            borderColor: color.divider,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}>
          <AddressBottomSheetContent
            data={addressTree}
            locationNameConverter={{
              Ward: wardNameFromID,
              District: districtNameFromID,
              City: cityNameFromID,
            }}
            onCloseBottomSheet={() => {
              // changeBottomSheetVisibility(false)
              handleCloseAddressPress();
            }}
            onSetAddress={OnAddressEditFinish}
            initialAddress={currentAddress}
          />
        </BottomSheet>

        {/*Image bottomsheet*/}
        <BottomSheet
          ref={imageBottomSheet}
          index={-1}
          snapPoints={snapPointsImage}
          enablePanDownToClose={true}
          onClose={() => {
            opacity.value = 1;
            opacityBlack.value = 0;
            setImageBottomSheetVisible(false);
          }}
          handleIndicatorStyle={{backgroundColor: color.onBackground_light}}
          handleStyle={{
            backgroundColor: color.background_bottomNav,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}
          style={{
            backgroundColor: color.background,
            borderColor: color.divider,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}>
          {_renderContentImage()}
        </BottomSheet>
      </Animated.View>

      <PopUpLoading
        text={'Saving your changes...'}
        visibility={isLoading}
        onChangePopupVisibility={onChangeLoadingState}
      />
      <PopUpMessage
        message={textSuccess}
        type={'success'}
        visibility={isSuccess}
        onChangePopupVisibility={onChangeSuccessState}
        havingTwoButton={true}
        labelCTA="Go to profile"
        onPress={() => {
          navigation.navigate(PROFILE);
        }}
      />
      <PopUpMessage
        message={textError}
        type={'error'}
        visibility={isError}
        onChangePopupVisibility={onChangeErrorState}
        havingTwoButton={true}
        labelCTA="Try again"
        onPress={() => {
          Save();
        }}
      />
      <PopUpMessage
        message={textWarning}
        type={'warning'}
        visibility={isWarning}
        onChangePopupVisibility={onChangeWarningState}
        havingTwoButton={true}
        labelCTA="Go Back"
        labelCancel="Discard"
        onPressCancel={() => {
          navigation.navigate(PROFILE);
        }}
      />
    </KeyboardAvoidingView>
    // </Root>
  );
};

export default EditProfileComponent;

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
  ImageSections: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 120,
    height: 120,
  },
  styleTitle: {
    fontSize: getFontSize(14),
    fontFamily: POPPINS_MEDIUM,
  },
});
function alert(customButton: any) {
  throw new Error('Function not implemented.');
}
