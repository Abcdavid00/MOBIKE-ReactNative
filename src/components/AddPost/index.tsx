import {Pressable, Text, View} from 'react-native';
import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import TextInputOutline from '../common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../common/container';
import * as ImagePicker from 'react-native-image-picker';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import {Dimensions} from 'react-native';
import Animated, {
  Easing,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BrandBottomSheetContent from './BrandBottomSheetContent';
import {Button, FAB, RadioButton} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native';
import Store, {RootState} from '../../redux/store';
import TypeBottomSheetContent from './TypeBottomSheetContent';
import ColorBottomSheetContent from './ColorBottomSheetContent';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useTheme} from '@react-navigation/native';
import {UploadPost} from '../../backendAPI';
import {POST_PREVIEW, YOUR_POSTS} from '../../constants/routeNames';
import PostPreviewComponent from '../PostPreviewComponent/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';
import BottomSheet from '@gorhom/bottom-sheet';
import TextField from '../common/textField';
import {useSelector} from 'react-redux';
import {getThemeColor} from '../../utils/getThemeColor';
import {
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../assets/fonts';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {addressesType} from '../../redux/clientDatabase/personalInfo';
import store from '../../redux/store';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CustomButton from '../common/customButton';
import PopUpLoading from '../common/popupLoading';
import PopUpMessage from '../common/popupMessage';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;
const MAX_IMAGE = 8;

type AddPostComponentProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'AddPost'>;
};

export type formAddPostState = {
  title: string;
  content: string;
  price: number;
  name: string;
  brand: number;
  lineup: number;
  type: number;
  color: number;
  condition: number;
  odometer?: number;
  licensePlate?: string;
  manufacturerYear?: number;
  cubicPower?: number;
  address: addressesType;
  images: ImagePicker.Asset[];
};

type errorState = {
  title?: string;
  price?: string;
  name?: string;
  brand?: string;
  type?: string;
  condition?: string;
  images?: string;
  address?: string;
};

const AddPostComponent: React.FC<AddPostComponentProps> = ({navigation}) => {
  const [form, setForm] = useState<formAddPostState>({
    title: '',
    content: '',
    price: -1,
    name: '',
    brand: -1,
    lineup: -1,
    type: -1,
    color: -1,
    condition: -1,
    odometer: undefined,
    licensePlate: '',
    manufacturerYear: -1,
    cubicPower: undefined,
    address: {
      ID: -1,
      ID_City: -1,
      ID_District: -1,
      ID_Ward: -1,
      Detail_address: '',
    },
    images: [],
  });

  const [errors, setErrors] = useState<errorState>({
    title: undefined,
    price: undefined,
    name: undefined,
    brand: undefined,
    type: undefined,
    condition: undefined,
    images: undefined,
    address: undefined,
  });

  const [isEdited, setIsEdited] = useState<boolean>(false);

  const checkTitle = () => {
    if (!form.title) {
      console.log('title is empty');
      setErrors({...errors, title: "Title can't be empty"});
      return false;
    }
    setErrors({...errors, title: undefined});
    return true;
  };

  useEffect(() => {
    checkTitle();
  }, [form.title]);

  const checkPrice = () => {
    if (!form.price) {
      console.log('price is empty');
      setErrors(prevErrors => {
        return {...prevErrors, price: "Price can't be empty"};
      });
      return false;
    } else if (isNaN(form.price)) {
      console.log('price is not a number');
      setErrors(prevErrors => {
        return {...prevErrors, price: 'Price must be a number'};
      });
      return false;
    } else if (form.price < 0) {
      console.log('price is negative');
      setErrors(prevErrors => {
        return {...prevErrors, price: 'Price must be a positive number'};
      });
      return false;
    }
    setErrors({...errors, price: undefined});
    return true;
  };

  useEffect(() => {
    checkPrice();
  }, [form.price]);

  const checkName = () => {
    if (!form.name) {
      console.log('name is empty');
      setErrors(prevErrors => {
        return {...prevErrors, name: "Name can't be empty"};
      });
      return false;
    }
    setErrors({...errors, name: undefined});
    return true;
  };

  useEffect(() => {
    checkName();
  }, [form.name]);

  const checkBrand = () => {
    if (!form.brand) {
      console.log('brand is empty');
      setErrors(prevErrors => {
        return {...prevErrors, brand: "Brand can't be empty"};
      });
      return false;
    }
    setErrors({...errors, brand: undefined});
    return true;
  };

  useEffect(() => {
    checkBrand();
  }, [form.brand]);

  const checkType = () => {
    if (!form.type) {
      console.log('type is empty');
      setErrors(prevErrors => {
        return {...prevErrors, type: "Type can't be empty"};
      });
      return false;
    }
    setErrors({...errors, type: undefined});
    return true;
  };

  useEffect(() => {
    checkType();
  }, [form.type]);

  const checkCondition = () => {
    if (!form.condition) {
      console.log('condition is empty');
      setErrors(prevErrors => {
        return {...prevErrors, condition: "Condition can't be empty"};
      });
      return false;
    }
    setErrors({...errors, condition: undefined});
    return true;
  };

  useEffect(() => {
    checkCondition();
  }, [form.condition]);

  const checkImages = () => {
    if (form.images.length == 0) {
      console.log('images is empty');
      setErrors(prevErrors => {
        return {...prevErrors, images: "Images can't be empty"};
      });
      return false;
    }
    setErrors({...errors, images: undefined});
    return true;
  };

  useEffect(() => {
    checkImages();
  }, [JSON.stringify(form.images)]);

  const checkAddress = () => {
    if (!form.address) {
      console.log('address is empty');
      setErrors(prevErrors => {
        return {...prevErrors, address: "Address can't be empty"};
      });
      return false;
    }
    setErrors({...errors, address: undefined});
    return true;
  };

  useEffect(() => {
    checkAddress();
  }, [form.address]);

  useEffect(() => {
    console.log('Resetting errors');
    setErrors({
      title: undefined,
      price: undefined,
      name: undefined,
      brand: undefined,
      type: undefined,
      condition: undefined,
      images: undefined,
      address: undefined,
    });
  }, []);

  useEffect(() => {
    console.log('Errors changed: ', JSON.stringify(errors));
  }, [errors]);

  const checkAll = () => {
    console.log('Checking all');
    const isTitleValid = checkTitle();
    const isPriceValid = checkPrice();
    const isNameValid = checkName();
    const isBrandValid = checkBrand();
    const isTypeValid = checkType();
    const isConditionValid = checkCondition();
    const isImagesValid = checkImages();
    const isAddressValid = checkAddress();
    return (
      isTitleValid &&
      isPriceValid &&
      isNameValid &&
      isBrandValid &&
      isTypeValid &&
      isConditionValid &&
      isImagesValid &&
      isAddressValid
    );
  };

  const Post = async () => {
    if (!checkAll()) {
      console.log('Errors: ', JSON.stringify(errors));
      setTextError('Please fill in all required fields');
      setIsError(true);
    } else {
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
        setTextSuccess('Your post has been successfully posted.');
        setIsSuccess(true);
      } else {
        setTextError(
          'Your post has failed to be posted. Please try again later.',
        );
        setIsError(true);
      }
    }
  };

  const onPost = () => {
    // setIsPreviewing(false);
    Post();
  };

  const Addresses: addressesType[] | undefined = useSelector<
    RootState,
    addressesType[] | undefined
  >(state => state.personalInfo.Addresses);

  const onChange = ({name, value}: {name: string; value: any}) => {
    setForm({...form, [name]: value});
    if (!isEdited) setIsEdited(true);
  };

  //Brand - Lineup
  //   const brandBottomSheet = useRef(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const changeBottomSheetVisibility = (visibility: boolean) => {
    setBottomSheetVisible(visibility);
  };

  const bottomSheetBrandRef = useRef<BottomSheet>(null);
  const snapPointsBrand = useMemo(() => ['80%'], []);

  // callbacks
  const handleBrandSheetChange = useCallback((index: number) => {
    console.log('handleBrandSheetChange', index);
  }, []);
  const handleBrandSnapPress = useCallback((index: number) => {
    bottomSheetBrandRef.current?.snapToIndex(index);
    setBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseBrandPress = useCallback(() => {
    bottomSheetBrandRef.current?.close();
    changeBottomSheetVisibility(false);
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);

  const _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const _renderContent = () => (
    <BrandBottomSheetContent
      onSetBrand_Lineup={onSetBrand_Lineup}
      onCloseBottomSheet={() => {
        handleCloseBrandPress();
        checkBrand();
      }}
      initialValue={{
        brand: form.brand,
        lineup: form.lineup,
      }}
    />
  );

  const brandNameFromID = (ID: number) => {
    const brand = Store.getState().vehicleModels.VehicleBrands.find(
      item => item.ID == ID,
    );
    if (brand) return brand.Name;
    else return '';
  };

  const lineupNameFromID = (ID: number) => {
    const lineup = Store.getState().vehicleModels.VehicleLineUps.find(
      item => item.ID == ID,
    );
    if (lineup) return lineup.Lineup;
    else return '';
  };

  const onSetBrand_Lineup = (brandID: number, lineupID: number) => {
    setForm({...form, brand: brandID, lineup: lineupID});
  };

  //Type
  const bottomSheetTypeRef = useRef<BottomSheet>(null);
  const snapPointsType = useMemo(() => ['40%'], []);

  const handleTypeSheetChange = useCallback((index: number) => {
    console.log('handleTypeSheetChange', index);
  }, []);
  const handleTypeSnapPress = useCallback((index: number) => {
    bottomSheetTypeRef.current?.snapToIndex(index);
    setBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseTypePress = useCallback(() => {
    bottomSheetTypeRef.current?.close();
    setBottomSheetVisible(false);
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);

  const _renderTypeContent = () => (
    <TypeBottomSheetContent
      onSetType={onSetType}
      onCloseBottomSheet={() =>
        // changeTypeBottomSheetVisibility(false)
        handleCloseTypePress()
      }
      initialValue={{
        type: form.type,
      }}
    />
  );

  const onSetType = (typeID: number) => {
    setForm({...form, type: typeID});
  };

  const typeNameFromID = (ID: number) => {
    const type = Store.getState().vehicleTypes.find(item => item.ID == ID);
    if (type) return type.Type;
    else return '';
  };

  //Color
  const bottomSheetColorRef = useRef<BottomSheet>(null);
  const snapPointsColor = useMemo(() => ['30%'], []);

  const handleColorSheetChange = useCallback((index: number) => {
    console.log('handleColorSheetChange', index);
  }, []);
  const handleColorSnapPress = useCallback((index: number) => {
    bottomSheetColorRef.current?.snapToIndex(index);
    setBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseColorPress = useCallback(() => {
    bottomSheetColorRef.current?.close();
    setBottomSheetVisible(false);
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);

  const _renderColorContent = () => (
    <ColorBottomSheetContent
      onSetColor={onSetColor}
      onCloseBottomSheet={() =>
        // changeColorBottomSheetVisibility(false)
        handleCloseColorPress()
      }
      initialValue={{
        color: form.color,
      }}
    />
  );

  const onSetColor = (colorID: number) => {
    setForm({...form, color: colorID});
  };

  const colorNameFromID = (ID: number) => {
    const color = Store.getState().colors.find(item => item.ID == ID);
    if (color) return convertFirstCharacterToUppercase(color.Name);
    else return '';
  };

  const colorHexFromID = (ID: number) => {
    const color = Store.getState().colors.find(item => item.ID == ID);
    if (color) return '#' + color.Color_hex;
    else return '#000';
  };

  const convertFirstCharacterToUppercase = (stringToConvert: string) => {
    var firstCharacter = stringToConvert.substring(0, 1);
    var restString = stringToConvert.substring(1);
    return firstCharacter.toUpperCase() + restString;
  };

  //Condition
  const dataConditon = Store.getState().vehicleConditions;

  const onSetCondition = (conditionID: number) => {
    setForm({...form, condition: conditionID});
  };

  //Manufacturer Year

  const bottomSheetManufacturerYearRef = useRef<BottomSheet>(null);
  const snapPointsManufacturerYear = useMemo(() => ['50%'], []);

  const handleManufacturerYearSheetChange = useCallback((index: number) => {
    console.log('handleManufacturerYearSheetChange', index);
  }, []);
  const handleManufacturerYearSnapPress = useCallback((index: number) => {
    bottomSheetManufacturerYearRef.current?.snapToIndex(index);
    setBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseManufacturerYearPress = useCallback(() => {
    bottomSheetManufacturerYearRef.current?.close();
    setBottomSheetVisible(false);
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);

  const dataYear: number[] = [];
  for (let i = 2023; i >= 1900; i--) {
    dataYear.push(i);
  }

  const _renderManufacturerYearContent = () => {
    return (
      <View style={{backgroundColor: color.surface, height: '100%'}}>
        <Text
          style={{
            marginStart: 15,
            marginTop: 10,
            marginBottom: 10,
            color: colors.black,
            fontFamily: POPPINS_SEMI_BOLD,
            fontSize: getFontSize(16),
            alignSelf: 'flex-start',
          }}>
          Choose Manufacturer Year
        </Text>
        <ScrollView>
          {dataYear.map((item, index) => {
            let flag = false;
            if (item == form.manufacturerYear) {
              flag = true;
            }
            return (
              <Pressable
                key={index}
                onPress={() => {
                  onSetManufacturerYear(item);
                  //   changeManufacturerYearBottomSheetVisibility(false);
                  handleCloseManufacturerYearPress();
                  console.log(item);
                }}>
                <View>
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        padding: 12,
                        paddingLeft: 15,
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          color: flag ? color.primary : color.onBackground,
                          textAlignVertical: 'center',
                          fontFamily: POPPINS_REGULAR,
                        }}>
                        {item}
                      </Text>

                      {flag && (
                        <MaterialIcons
                          name="check"
                          size={16}
                          color={color.primary}
                          style={{paddingTop: 3}}
                        />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: color.divider,
                      marginStart: 10,
                    }}
                  />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const onSetManufacturerYear = (year: number) => {
    setForm({...form, manufacturerYear: year});
  };

  //Image
  const [flag, setFlag] = useState(false);

  const onSetImages = (images: ImagePicker.Asset[]) => {
    setForm({...form, images: images});
  };

  const launchCamera = () => {
    let options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      // else if (response) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
        const source = {uri: response.assets};
        console.log('response', JSON.stringify(response));

        if (response.assets) {
          let tmp = form.images;
          for (let i = 0; i < response.assets.length; i++) {
            tmp.push(response.assets[i]);
          }
          onSetImages(tmp);
        }
        //setFlag(!flag);
      }
    });
  };

  const launchImageLibrary = () => {
    let options: ImagePicker.ImageLibraryOptions = {
      selectionLimit: MAX_IMAGE - form.images.length,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
        const source = {uri: response.assets};
        console.log('response', JSON.stringify(response));

        if (response.assets) {
          var tmp = form.images;
          for (let i = 0; i < response.assets.length; i++) {
            tmp.push(response.assets[i]);
          }
          onSetImages(tmp);
          //setFlag(!flag);
        }
      }
    });
  };

  const deleteImage = (index: number) => {
    let tmp = form.images;
    tmp.splice(index, 1);
    onSetImages(tmp);
    setFlag(!flag);
  };

  const RenderFileUri = () =>
    form.images.map((item, index) => {
      if (item) {
        return (
          <Animated.View
            key={index}
            layout={Layout.stiffness(100).damping(10).duration(300)}
            style={{position: 'relative'}}>
            <MaterialIcons
              name="cancel"
              size={18}
              color="#555"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: '#fff',
                borderRadius: 50,
              }}
              onPress={() => {
                deleteImage(index);
              }}
            />
            <Image key={index} source={{uri: item.uri}} style={styles.images} />
          </Animated.View>
        );
      } else
        return (
          <Image
            key={index}
            source={require('../../assets/images/image-not-available.png')}
            style={styles.images}
          />
        );
    });

  const bottomSheetImageRef = useRef<BottomSheet>(null);
  const snapPointsImage = useMemo(() => ['30%'], []);

  const handleImageSheetChange = useCallback((index: number) => {
    console.log('handleImageSheetChange', index);
  }, []);
  const handleImageSnapPress = useCallback((index: number) => {
    bottomSheetImageRef.current?.snapToIndex(index);
    setBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseImagePress = useCallback(() => {
    bottomSheetImageRef.current?.close();
    setBottomSheetVisible(false);
    opacity.value = 1;
    opacityBlack.value = 0;
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
            launchCamera();
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
            launchImageLibrary();
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

  //Address
  const bottomSheetAddressRef = useRef<BottomSheet>(null);
  const snapPointsAddress = useMemo(() => ['80%'], []);

  const handleAddressSheetChange = useCallback((index: number) => {
    console.log('handleAddressSheetChange', index);
  }, []);
  const handleAddressSnapPress = useCallback((index: number) => {
    bottomSheetAddressRef.current?.snapToIndex(index);
    setBottomSheetVisible(true);
    if (index == 0) {
      opacity.value = 0.3;
      opacityBlack.value = 0.3;
    }
  }, []);
  const handleCloseAddressPress = useCallback(() => {
    bottomSheetAddressRef.current?.close();
    setBottomSheetVisible(false);
    opacity.value = 1;
    opacityBlack.value = 0;
  }, []);

  const cityNameFromID = (ID: number) => {
    const city = Store.getState().locations.Cities.find(item => item.ID == ID);
    if (city) return city.Name;
    else return '';
  };

  const districtNameFromID = (ID: number) => {
    const district = Store.getState().locations.Districts.find(
      item => item.ID == ID,
    );
    if (district) return district.Name;
    else return '';
  };

  const wardNameFromID = (ID: number) => {
    const ward = Store.getState().locations.Wards.find(item => item.ID == ID);
    if (ward) return ward.Name;
    else return '';
  };

  const _renderAddressContent = () => (
    <View style={{backgroundColor: color.surface, height: '100%'}}>
      <Text
        style={{
          marginStart: 15,
          color: colors.black,
          fontFamily: POPPINS_SEMI_BOLD,
          fontSize: getFontSize(16),
          alignSelf: 'flex-start',
          marginTop: 8,
        }}>
        Choose address
      </Text>
      <ScrollView>
        {Addresses &&
          Object.values(Addresses).map((item, index) => {
            let flag = false;
            if (form.address) {
              if (item.ID == form.address.ID) flag = true;
            }
            return (
              <Pressable
                key={index}
                onPress={() => {
                  onSetAddress(item);
                  // changeAddressBottomSheetVisibility(false);
                  handleCloseAddressPress();
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 12,
                    }}>
                    <View style={{width: 25, justifyContent: 'center'}}>
                      <Text
                        style={{
                          color: flag
                            ? color.primary
                            : color.onBackground_light,
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      {item.Detail_address != '' && (
                        <Text
                          style={{
                            color: flag ? color.primary : color.onBackground,
                          }}>
                          {item.Detail_address}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: flag ? color.primary : color.onBackground,
                        }}>
                        {wardNameFromID(item.ID_Ward)},{' '}
                        {districtNameFromID(item.ID_District)},{' '}
                        {cityNameFromID(item.ID_City)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: '#e9e9e9',
                      marginStart: 35,
                      marginEnd: 20,
                    }}
                  />
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );

  const onSetAddress = (a: addressesType) => {
    setForm({
      ...form,
      address: a,
    });
  };

  const onPreview = async () => {
    if (!checkAll()) {
      console.log('Errors: ', JSON.stringify(errors));
      setTextError('Please fill in all required fields');
      setIsError(true);
    } else {
      navigation.navigate(POST_PREVIEW, {form: form});
    }
  };

  const onGoBack = () => {
    if (isEdited) {
      setIsWarning(true);
      setTextWarning('Do you want to discard the post?');
    } else navigation.goBack();
  };

  const color = useTheme().colors.customColors;

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
    <View style={{height: '100%'}}>
      <Animated.View
        style={[
          styles.wrapperHeader,
          //  opacityAnimatedStyle
        ]}>
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
            Add Post
          </Text>
        </View>

        <View
          style={{
            height: 70,
            width: 50,
          }}
        />
      </Animated.View>

      <Container
        keyboardShouldPersistTaps={'never'}
        styleScrollView={{
          backgroundColor: color.background,
          height: heightScreen,
        }}>
        <Animated.View
          style={[
            {
              flex: 1,
              height: '100%',
            },
            // opacityAnimatedStyle,
          ]}>
          {/*Title & Description */}
          <View style={styles.wrapperTitle_Description}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.divider + '88',
                width: '100%',
                height: 40,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: color.primary,
                  fontFamily: POPPINS_SEMI_BOLD,
                  fontSize: getFontSize(16),
                }}>
                Title & Description
              </Text>
            </View>

            <View style={{paddingHorizontal: 20}}>
              <TextField
                label={'Title'}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  marginBottom: 16,
                }}
                maxLength={60}
                value={form.title}
                editable={!isBottomSheetVisible}
                onChangeText={value => {
                  onChange({name: 'title', value});
                }}
                onEndEditing={checkTitle}
                error={errors.title}
                multiline={true}
                numberOfLines={2}
                large={true}
              />

              <TextField
                label={'Description'}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  marginBottom: 8,
                  height: 184,
                }}
                maxLength={1500}
                value={form.content}
                editable={!isBottomSheetVisible}
                onChangeText={value => {
                  onChange({name: 'content', value});
                }}
                onEndEditing={checkTitle}
                multiline={true}
                numberOfLines={8}
                largest={true}
              />

              <TextField
                label={'Price'}
                iconClass={MaterialIcons}
                iconName={'attach-money'}
                iconColor={color.primary}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  marginBottom: 8,
                }}
                value={form.price == -1 ? '' : form.price.toString()}
                keyboardType={'numeric'}
                editable={!isBottomSheetVisible}
                onChangeText={value => {
                  onChange({name: 'price', value});
                }}
                onEndEditing={checkPrice}
                error={errors.price}
              />
            </View>
          </View>

          {/*Detail Information */}
          <View style={styles.wrapperDetailInformation}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.divider + '88',
                width: '100%',
                height: 40,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: color.primary,
                  fontFamily: POPPINS_SEMI_BOLD,
                  fontSize: getFontSize(16),
                }}>
                Detail Information
              </Text>
            </View>

            <View style={{paddingHorizontal: 20}}>
              {/* Name */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Name
                </Text>
                <TextField
                  label={'Name'}
                  iconClass={MaterialIcons}
                  iconName={'drive-file-rename-outline'}
                  iconColor={color.primary}
                  style={{fontSize: 14}}
                  value={form.name}
                  editable={!isBottomSheetVisible}
                  onChangeText={value => {
                    onChange({name: 'name', value});
                  }}
                  onEndEditing={checkName}
                  error={errors.name}
                />
              </View>

              {/* Brand */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Brand - Lineup
                </Text>
                <Pressable
                  onPress={() => {
                    handleBrandSnapPress(0);
                    checkBrand();
                  }}>
                  <TextField
                    label={'Brand - Lineup'}
                    iconClass={MaterialIcons}
                    iconName={'motorcycle'}
                    iconColor={color.primary}
                    style={{fontSize: 14}}
                    value={
                      form.brand != -1 && form.lineup != -1
                        ? brandNameFromID(form.brand) +
                          ' - ' +
                          lineupNameFromID(form.lineup)
                        : ''
                    }
                    editable={false}
                    error={errors.brand}
                  />
                </Pressable>
              </View>

              {/* Type */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Type
                </Text>
                <Pressable
                  onPress={() => {
                    //   changeBottomSheetVisibility(true);
                    handleTypeSnapPress(0);
                    checkType();
                  }}>
                  <TextField
                    label={'Type'}
                    iconClass={MaterialIcons}
                    iconName={'category'}
                    iconColor={color.primary}
                    style={{fontSize: 14}}
                    value={form.type != -1 ? typeNameFromID(form.type) : ''}
                    editable={false}
                    error={errors.type}
                  />
                </Pressable>
              </View>

              {/* Color */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Color
                </Text>
                <Pressable
                  onPress={() => {
                    handleColorSnapPress(0);
                  }}>
                  <TextField
                    label={'Color'}
                    iconClass={FontAwesome}
                    iconName={'circle'}
                    iconColor={colorHexFromID(form.color)}
                    style={{fontSize: 14}}
                    value={form.color != -1 ? colorNameFromID(form.color) : ''}
                    editable={false}
                  />
                </Pressable>
              </View>

              {/*Condition*/}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Condition
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    marginTop: 8,
                  }}>
                  {dataConditon.map((item, index) => {
                    return (
                      <View
                        key={item.ID}
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
                          value={item.Condition}
                          status={
                            form.condition == item.ID ? 'checked' : 'unchecked'
                          }
                          onPress={() => onSetCondition(item.ID)}
                        />
                        <Text
                          style={{
                            color:
                              form.condition == item.ID
                                ? colors.primary
                                : color.onBackground_light,
                            fontSize: getFontSize(14),
                            top: 2,
                            fontFamily:
                              form.condition == item.ID
                                ? POPPINS_MEDIUM
                                : POPPINS_REGULAR,
                            marginStart: 5,
                          }}>
                          {item.Condition}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {errors.condition && (
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: color.error,
                      paddingEnd: 5,
                      fontSize: 12,
                      paddingTop: 1,
                      textAlign: 'right',
                      fontFamily: POPPINS_REGULAR,
                    }}>
                    {errors.condition}
                  </Text>
                )}
              </View>

              {/* Odometer */}
              <View style={{marginTop: 10}}>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Odometer
                </Text>

                <TextField
                  label={'Odometer'}
                  iconClass={Ionicons}
                  iconName={'speedometer'}
                  iconColor={color.primary}
                  style={{fontSize: 14}}
                  value={form.odometer != -1 ? form.odometer?.toString() : ''}
                  editable={!isBottomSheetVisible}
                  keyboardType={'numeric'}
                  onChangeText={value => {
                    onChange({name: 'odometer', value});
                  }}
                />
              </View>

              {/* License plate */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  License Plate
                </Text>

                <TextField
                  label={'License Plate'}
                  iconClass={Octicons}
                  iconName={'number'}
                  iconColor={color.primary}
                  style={{fontSize: 14}}
                  value={form.licensePlate}
                  editable={!isBottomSheetVisible}
                  onChangeText={value => {
                    onChange({name: 'licensePlate', value});
                  }}
                />
              </View>

              {/* Manufacturer Year */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Manufacturer Year
                </Text>
                <Pressable
                  onPress={() => {
                    handleManufacturerYearSnapPress(0);
                  }}>
                  <TextField
                    label={'Manufacturer Year'}
                    iconClass={Fontisto}
                    iconName={'date'}
                    iconColor={color.primary}
                    style={{fontSize: 14}}
                    value={
                      form.manufacturerYear != -1
                        ? form.manufacturerYear?.toString()
                        : ''
                    }
                    editable={false}
                  />
                </Pressable>
              </View>

              {/* Cubic Power */}
              <View>
                <Text style={[styles.styleTitle, {color: color.onBackground}]}>
                  Cubic Power
                </Text>
                <TextField
                  label={'Odometer'}
                  iconClass={MaterialIcons}
                  iconName={'speed'}
                  iconColor={color.primary}
                  style={{fontSize: 14}}
                  value={
                    form.cubicPower != -1 ? form.cubicPower?.toString() : ''
                  }
                  editable={!isBottomSheetVisible}
                  keyboardType={'numeric'}
                  onChangeText={value => {
                    onChange({name: 'cubicPower', value});
                  }}
                />
              </View>

              {/* Image */}
              <View>
                <Text
                  style={[
                    styles.styleTitle,
                    {color: color.onBackground, marginBottom: 4},
                  ]}>
                  Image
                </Text>
                {form.images.length > 0 ? (
                  <Animated.View
                    layout={Layout.stiffness(100).damping(10).duration(300)}
                    style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {RenderFileUri()}
                    {form.images.length < 8 && form.images.length > 0 && (
                      <Pressable
                        onPress={() => {
                          //   changeImageBottomSheetVisibility(true);
                          handleImageSnapPress(0);
                        }}>
                        <Animated.View
                          layout={Layout.stiffness(100)
                            .damping(10)
                            .duration(300)}
                          style={{
                            width: (widthScreen - 40) / 4 - 10,
                            height: (widthScreen - 40) / 4 - 10,
                            // backgroundColor: color.surface,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            margin: 5,
                            borderColor: color.divider,
                            borderWidth: 1,
                          }}>
                          <MaterialCommunityIcons
                            name="camera-plus"
                            size={24}
                            color={color.primary}
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              color: color.onBackground_light,
                              textAlign: 'center',
                              marginTop: 5,
                              fontFamily: POPPINS_REGULAR,
                            }}>
                            Add more
                          </Text>
                        </Animated.View>
                      </Pressable>
                    )}
                  </Animated.View>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      //   changeImageBottomSheetVisibility(true);
                      handleImageSnapPress(0);
                      checkImages();
                    }}>
                    <View
                      style={{
                        height: ((widthScreen - 40) / 4 - 10) * 2,
                        // backgroundColor: color.surface + '44',
                        borderColor: color.divider,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <MaterialCommunityIcons
                        name="camera-plus"
                        size={48}
                        color={color.primary}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: color.onBackground_light,
                          textAlign: 'center',
                          marginTop: 5,
                          fontFamily: POPPINS_REGULAR,
                        }}>
                        Upload 1 to 8 images for your vehicle
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}

                {errors.images && (
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: color.error,
                      fontFamily: POPPINS_REGULAR,
                      paddingEnd: 5,
                      fontSize: 12,
                      paddingTop: 1,
                      textAlign: 'right',
                    }}>
                    {errors.images}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.divider + '88',
                width: '100%',
                height: 40,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: color.primary,
                  fontFamily: POPPINS_SEMI_BOLD,
                  fontSize: getFontSize(16),
                }}>
                Seller Information
              </Text>
            </View>
          </View>
          {/* Address */}
          <View style={{paddingHorizontal: 20}}>
            <Text
              style={[
                styles.styleTitle,
                {color: color.onBackground, marginBottom: 8},
              ]}>
              Address
            </Text>

            <Pressable
              onPress={() => {
                handleAddressSnapPress(0);
                checkAddress();
              }}>
              <TextField
                label={'Address'}
                large={true}
                style={{fontSize: 14}}
                value={
                  form.address.ID != -1
                    ? (form.address.Detail_address != ''
                        ? form.address.Detail_address + ', '
                        : '') +
                      wardNameFromID(form.address.ID_Ward) +
                      ', ' +
                      districtNameFromID(form.address.ID_District) +
                      ', ' +
                      cityNameFromID(form.address.ID_City)
                    : ''
                }
                editable={false}
                multiline={true}
                numberOfLines={2}
              />
            </Pressable>

            {errors.address && (
              <Text
                style={{
                  alignSelf: 'flex-end',
                  color: color.error,
                  fontFamily: POPPINS_REGULAR,
                  paddingEnd: 5,
                  fontSize: 12,
                  paddingTop: 1,
                  textAlign: 'right',
                }}>
                {errors.address}
              </Text>
            )}
          </View>

          <View style={{height: 50}} />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 40,
              justifyContent: 'space-around',
            }}>
            <CustomButton onPress={onPreview} title="Preview" />
            <CustomButton onPress={onPost} title="Post" />
          </View>
        </Animated.View>
      </Container>

      {/*Brand Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetBrandRef}
        index={-1}
        snapPoints={snapPointsBrand}
        onClose={() => changeBottomSheetVisibility(false)}
        enablePanDownToClose={true}
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
        {_renderContent()}
      </BottomSheet>

      {/*Type Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetTypeRef}
        index={-1}
        onClose={() => {
          opacity.value = 1;
          opacityBlack.value = 0;
        }}
        snapPoints={snapPointsType}
        enablePanDownToClose={true}
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
        {_renderTypeContent()}
      </BottomSheet>

      {/*Color Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetColorRef}
        index={-1}
        snapPoints={snapPointsColor}
        enablePanDownToClose={true}
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
        {_renderColorContent()}
      </BottomSheet>

      {/*Manufacturer Year Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetManufacturerYearRef}
        index={-1}
        snapPoints={snapPointsManufacturerYear}
        enablePanDownToClose={true}
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
        {_renderManufacturerYearContent()}
      </BottomSheet>

      {/*Images Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetImageRef}
        index={-1}
        snapPoints={snapPointsImage}
        enablePanDownToClose={true}
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

      {/*Address Bottom Sheet*/}
      <BottomSheet
        ref={bottomSheetAddressRef}
        index={-1}
        snapPoints={snapPointsAddress}
        enablePanDownToClose={true}
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
        {_renderAddressContent()}
      </BottomSheet>

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
        labelCTA="Go to your posts"
        onPress={() => {
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
      <PopUpMessage
        message={textWarning}
        type={'warning'}
        visibility={isWarning}
        onChangePopupVisibility={onChangeWarningState}
        havingTwoButton={true}
        labelCTA="Go Back"
        labelCancel="Discard"
        onPressCancel={() => {
          navigation.navigate(YOUR_POSTS);
        }}
      />
    </View>
  );
};

export default AddPostComponent;

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
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  ImageSections: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: (widthScreen - 40) / 4 - 10,
    height: (widthScreen - 40) / 4 - 10,
    resizeMode: 'cover',
    margin: 5,
    borderRadius: 5,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
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
  styleTitle: {
    fontSize: getFontSize(14),
    fontFamily: POPPINS_MEDIUM,
    marginBottom: -4,
    marginTop: 8,
  },
  wrapperTitle_Description: {
    marginTop: 12,
    marginBottom: 16,
  },
  wrapperDetailInformation: {
    marginBottom: 16,
  },
});
