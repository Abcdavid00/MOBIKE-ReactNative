import { Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/common/container';
import * as ImagePicker from 'react-native-image-picker';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import colors from '../../assets/theme/colors';
import { KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import Animated, { Layout, onChange } from 'react-native-reanimated';
import BrandBottomSheetContent from './BrandBottomSheetContent';
import BottomSheet from 'reanimated-bottom-sheet';
import { Button, FAB, RadioButton } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native';
import Store from '../../redux/store';
import TypeBottomSheetContent from './TypeBottomSheetContent';
import ColorBottomSheetContent from './ColorBottomSheetContent';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { POST_PREVIEW, YOUR_POSTS_NAVIGATOR } from '../../constants/routeNames';
import { UploadPost } from '../../backendAPI';
import { Root, Popup } from 'popup-ui';
import { YOUR_POSTS } from './../../constants/routeNames';
import PostPreviewComponent from './../PostPreviewComponent/index';
const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;
const MAX_IMAGE = 8;
const AddPostComponent = ({ }) => {
    const { navigate } = useNavigation();

    const [form, setForm] = useState({
        title: '',
        content: '',
        price: undefined,
        name: "",
        brand: '',
        lineup: '',
        type: '',
        color: '',
        condition: '',
        odometer: undefined,
        licensePlate: '',
        manufacturerYear: "",
        cubicPower: undefined,
        address: undefined,
        images: [],
    });

    const [errors, setErrors] = useState({
        title: undefined,
        price: undefined,
        name: undefined,
        brand: undefined,
        type: undefined,
        condition: undefined,
        images: undefined,
        address: undefined,
    });

    const [isPreviewing, setIsPreviewing] = useState(false);

    const checkTitle = () => {
        if (!form.title) {
            console.log("title is empty")
            setErrors({ ...errors, title: "Title can't be empty" });
            return false;
        }
        setErrors({ ...errors, title: undefined });
        return true;
    }

    useEffect(() => {
        checkTitle();
    }, [form.title]);

    const checkPrice = () => {
        if (!form.price) {
            console.log("price is empty")
            setErrors((prevErrors) => {
                return { ...prevErrors, price: "Price can't be empty" };
            });
            return false;
        } else if (isNaN(form.price)) {
            console.log("price is not a number")
            setErrors((prevErrors) => { return { ...prevErrors, price: "Price must be a number" }; });
            return false;
        } else if (form.price < 0) {
            console.log("price is negative")
            setErrors((prevErrors) => { return { ...prevErrors, price: "Price must be a positive number" }; });
            return false;
        }
        setErrors({ ...errors, price: undefined });
        return true;
    }

    useEffect(() => {
        checkPrice();
    }, [form.price]);

    const checkName = () => {
        if (!form.name) {
            console.log("name is empty")
            setErrors((prevErrors) => { return { ...prevErrors, name: "Name can't be empty" }; });
            return false;
        }
        setErrors({ ...errors, name: undefined });
        return true;
    }

    useEffect(() => {
        checkName();
    }, [form.name]);

    const checkBrand = () => {
        if (!form.brand) {
            console.log("brand is empty")
            setErrors((prevErrors) => { return { ...prevErrors, brand: "Brand can't be empty" }; });
            return false;
        }
        setErrors({ ...errors, brand: undefined });
        return true;
    }

    useEffect(() => {
        checkBrand();
    }, [form.brand]);

    const checkType = () => {
        if (!form.type) {
            console.log("type is empty")
            setErrors((prevErrors) => { return { ...prevErrors, type: "Type can't be empty" }; });
            return false;
        }
        setErrors({ ...errors, type: undefined });
        return true;
    }

    useEffect(() => {
        checkType();
    }, [form.type]);

    const checkCondition = () => {
        if (!form.condition) {
            console.log("condition is empty")
            setErrors((prevErrors) => { return { ...prevErrors, condition: "Condition can't be empty" }; });
            return false;
        }
        setErrors({ ...errors, condition: undefined });
        return true;
    }

    useEffect(() => {
        checkCondition();
    }, [form.condition]);

    const checkImages = () => {
        if (form.images.length == 0) {
            console.log("images is empty")
            setErrors((prevErrors) => { return { ...prevErrors, images: "Images can't be empty" }; });
            return false;
        }
        setErrors({ ...errors, images: undefined });
        return true;
    }

    useEffect(() => {
        checkImages();
    }, [JSON.stringify(form.images)]);

    const checkAddress = () => {
        if (!form.address) {
            console.log("address is empty")
            setErrors((prevErrors) => { return { ...prevErrors, address: "Address can't be empty" }; });
            return false;
        }
        setErrors({ ...errors, address: undefined });
        return true;
    }

    useEffect(() => {
        checkAddress();
    }, [form.address]);

    useEffect(() => {
        console.log("Resetting errors")
        setErrors({
            title: undefined,
            price: undefined,
            name: undefined,
            brand: undefined,
            type: undefined,
            condition: undefined,
            images: undefined,
            address: undefined,
        })
    }, [])

    useEffect(() => {
        console.log("Errors changed: ", JSON.stringify(errors));
    }, [errors])

    const checkAll = () => {
        console.log("Checking all")
        const isTitleValid = checkTitle();
        const isPriceValid = checkPrice();
        const isNameValid = checkName();
        const isBrandValid = checkBrand();
        const isTypeValid = checkType();
        const isConditionValid = checkCondition();
        const isImagesValid = checkImages();
        const isAddressValid = checkAddress();
        return isTitleValid && isPriceValid && isNameValid && isBrandValid && isTypeValid && isConditionValid && isImagesValid && isAddressValid;
    }

    const Post = async () => {
        if (!checkAll()) {
            console.log("Errors: ", JSON.stringify(errors));
            Popup.show({
                type: 'Warning',
                title: 'Incomplete post',
                button: true,
                textBody: 'Please fill in all required fields',
                buttonText: 'OK',
                callback: () => Popup.hide()
            })
        } else {
            console.log("Posting...");
            Popup.show({
                title: 'Posting...',
                button: false,
                callback: () => { },
                icon: (
                    <Image source={require('../../assets/images/loading-wheel.gif')} />
                )
            });
            const postres = await UploadPost(
                form.images,
                form.title,
                form.content || '',
                form.price,
                form.address.ID,
                form.name,
                form.odometer || '-1',
                form.licensePlate || '',
                form.manufacturerYear || '-1',
                form.cubicPower || '-1',
                form.brand,
                form.lineup,
                form.type,
                form.condition,
                form.color,
            )
            if (postres) {
                Popup.show({
                    type: 'Success',
                    title: 'Post successful',
                    button: true,
                    textBody: 'Your post has been successfully posted',
                    buttonText: 'OK',
                    callback: () => {
                        Popup.hide();
                        navigate(YOUR_POSTS)
                    }
                })
            } else {
                Popup.show({
                    type: 'Danger',
                    title: 'Post failed',
                    button: true,
                    textBody: 'Your post has failed to be posted',
                    buttonText: 'OK',
                    callback: () => Popup.hide()
                })
            }
        }
    }

    const onPost = () => {
        setIsPreviewing(false);
        Post();
    }

    const Addresses = Object.values(Store.getState().personalInfo.Addresses)
    const cityNameFromID = Store.getState().locations.CityNameFromID;
    const districtNameFromID = Store.getState().locations.DistrictNameFromID;
    const wardNameFromID = Store.getState().locations.WardNameFromID;

    const onChange = ({ name, value }) => {
        console.log("Change " + name + " to " + value)
        setForm({ ...form, [name]: value });
    };

    const closeAllBottomSheet = () => {
        changeBottomSheetVisibility(false);
        changeTypeBottomSheetVisibility(false);
        changeColorBottomSheetVisibility(false);
        changeManufacturerYearBottomSheetVisibility(false);
        changeImageBottomSheetVisibility(false);
        changeAddressBottomSheetVisibility(false);
    }

    // //Price
    // const formatPrice = (price) => {
    //     if (price == undefined) return '';
    //     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }

    //Brand - Lineup
    const bottomSheet = useRef(null);
    const fall = new Animated.Value(1);
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const changeBottomSheetVisibility = visibility => {
        bottomSheet.current.snapTo(visibility ? 0 : 1);
        setBottomSheetVisible(visibility);
    };

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
                changeBottomSheetVisibility(false)
                checkBrand();
            }}
            initialValue={{
                brand: form.brand,
                lineup: form.lineup,
            }}
        />
    );

    const brandNameFromID = (ID) => {
        const brand = Store.getState().vehicleModels.VehicleBrands.find((item) => item.ID == ID);
        if (brand)
            return brand.Name;
        else return '';
    };

    const lineupNameFromID = (ID) => {
        const lineup = Store.getState().vehicleModels.VehicleLineUps.find((item) => item.ID == ID);
        if (lineup)
            return lineup.Lineup;
        else return '';
    };

    const onSetBrand_Lineup = (brandID, lineupID) => {
        setForm({ ...form, brand: brandID, lineup: lineupID });
    };

    //Type
    const typeBottomSheet = useRef(null);
    const changeTypeBottomSheetVisibility = visibility => {
        typeBottomSheet.current.snapTo(visibility ? 0 : 1);
        setBottomSheetVisible(visibility);
    };

    const _renderTypeContent = () => (
        <TypeBottomSheetContent
            onSetType={onSetType}
            onCloseBottomSheet={() => changeTypeBottomSheetVisibility(false)}
            initialValue={{
                type: form.type,
            }}
        />
    );

    const onSetType = (typeID) => {
        setForm({ ...form, type: typeID });
    };

    const typeNameFromID = (ID) => {
        const type = Store.getState().vehicleTypes.find((item) => item.ID == ID);
        if (type)
            return type.Type;
        else return '';
    };

    //Color
    const colorBottomSheet = useRef(null);
    const changeColorBottomSheetVisibility = visibility => {
        colorBottomSheet.current.snapTo(visibility ? 0 : 1);
        setBottomSheetVisible(visibility);
    };

    const _renderColorContent = () => (
        <ColorBottomSheetContent
            onSetColor={onSetColor}
            onCloseBottomSheet={() => changeColorBottomSheetVisibility(false)}
            initialValue={{
                color: form.color,
            }}
        />
    );

    const onSetColor = (colorID) => {
        setForm({ ...form, color: colorID });
    };

    const colorNameFromID = (ID) => {
        const color = Store.getState().colors.find((item) => item.ID == ID);
        if (color)
            return convertFirstCharacterToUppercase(color.Name);
        else return '';
    };

    const colorHexFromID = (ID) => {
        const color = Store.getState().colors.find((item) => item.ID == ID);
        if (color)
            return '#' + color.Color_hex;
        else return '';
    };

    const convertFirstCharacterToUppercase = (stringToConvert) => {
        var firstCharacter = stringToConvert.substring(0, 1);
        var restString = stringToConvert.substring(1);
        return firstCharacter.toUpperCase() + restString;
    }

    //Condition
    const dataConditon = Store.getState().vehicleConditions;

    const onSetCondition = (conditionID) => {
        setForm({ ...form, condition: conditionID });
    };

    //Manufacturer Year
    const manufacturerYearBottomSheet = useRef(null);
    const changeManufacturerYearBottomSheetVisibility = visibility => {
        manufacturerYearBottomSheet.current.snapTo(visibility ? 0 : 1);
        setBottomSheetVisible(visibility);
    };

    const dataYear = [];
    for (let i = 2023; i >= 1900; i--) {
        dataYear.push(i);
    }

    const _renderManufacturerYearContent = () => {
        return (
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <Text style={{
                    marginStart: 15,
                    marginTop: 10,
                    marginBottom: 10,
                    color: colors.black,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start'
                }}>Choose Manufacturer Year</Text>
                <ScrollView>
                    {dataYear.map((item, index) => {
                        let flag = false;
                        if (item == form.manufacturerYear) {
                            flag = true;
                        }
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => { onSetManufacturerYear(item); changeManufacturerYearBottomSheetVisibility(false); console.log(item) }}>
                                <View>
                                    <View
                                        style={[{
                                            flexDirection: 'row',
                                            padding: 12,
                                            paddingLeft: 15
                                        }]}>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                flex: 1,
                                            }}>
                                            <Text style={{ color: flag ? colors.primary : 'black', textAlignVertical: 'center' }}>
                                                {item}
                                            </Text>

                                            {flag && (
                                                <MaterialIcons
                                                    name="check"
                                                    size={16}
                                                    color={colors.primary}
                                                    style={{ paddingTop: 3 }}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            height: 1,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#e9e9e9',
                                            marginStart: 10,
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback >
                        );
                    })
                    }
                </ScrollView>
            </View >
        );
    };

    const onSetManufacturerYear = (year) => {
        setForm({ ...form, manufacturerYear: year });
    };

    //Image
    const [flag, setFlag] = useState(false);

    const onSetImages = (images) => {
        setForm({ ...form, images: images });
    };

    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));

                let tmp = form.images;
                for (let i = 0; i < response.assets.length; i++) {
                    tmp.push(response.assets[i]);
                }
                onSetImages(tmp);
                //setFlag(!flag);
            }
        });
    };

    const launchImageLibrary = () => {
        let options = {
            selectionLimit: MAX_IMAGE - form.images.length,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));

                var tmp = form.images;
                for (let i = 0; i < response.assets.length; i++) {
                    tmp.push(response.assets[i]);
                }
                onSetImages(tmp);
                //setFlag(!flag);
            }
        });
    };

    const deleteImage = (index) => {
        let tmp = form.images;
        tmp.splice(index, 1);
        onSetImages(tmp);
        setFlag(!flag);
    };

    const RenderFileUri = (images) => (
        form.images.map((item, index) => {
            if (item) {
                return (
                    <Animated.View key={index} layout={Layout.stiffness(100).damping(10).duration(300)} style={{ position: 'relative' }}>
                        <MaterialIcons name='cancel' size={18} color='#555'
                            style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, backgroundColor: '#fff', borderRadius: 50 }}
                            onPress={() => { deleteImage(index) }} />
                        <Image key={index} source={{ uri: item.uri }} style={styles.images} />
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
        })
    );

    const imageBottomSheet = useRef(null);
    const changeImageBottomSheetVisibility = visibility => {
        imageBottomSheet.current.snapTo(visibility ? 0 : 1);
        setBottomSheetVisible(visibility);
    };
    const _renderContentImage = () => {
        return (
            <View style={{ backgroundColor: '#fff', height: '100%', alignItems: 'center' }}>
                <Button mode='contained' onPress={() => { launchCamera(); changeImageBottomSheetVisibility(false) }} style={{ width: '80%', marginVertical: 10 }}>Take photo</Button>
                <Button mode='contained' onPress={() => { launchImageLibrary(); changeImageBottomSheetVisibility(false) }} style={{ width: '80%', marginVertical: 10 }}>Choose from library</Button>
                <Button mode='contained' onPress={() => changeImageBottomSheetVisibility(false)} style={{ width: '80%', marginVertical: 10, backgroundColor: '#BBB' }}>Cancel</Button>
            </View>
        );
    }

    //Address
    const addressBottomSheet = useRef(null);
    const changeAddressBottomSheetVisibility = visibility => {
        addressBottomSheet.current.snapTo(visibility ? 0 : 1);
        setBottomSheetVisible(visibility);
    };

    const _renderAddressContent = () => (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <Text style={{
                marginStart: 15,
                color: colors.black,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
            }}>Choose address</Text>
            <ScrollView>
                {
                    Addresses.map((item, index) => {
                        let flag = false;
                        if (form.address) {
                            if (item.ID == form.address.ID)
                                flag = true;
                        }
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => { onSetAddress(item); changeAddressBottomSheetVisibility(false) }}>
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            padding: 12,
                                        }}>
                                        <View style={{ width: 25, justifyContent: 'center' }}>
                                            <Text style={{ color: flag ? colors.primary : colors.grey }}>{index + 1}</Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                flex: 1,
                                            }}>
                                            <Text style={{ color: flag ? colors.primary : 'black' }}>
                                                {item.Detail_address}
                                            </Text>
                                            <Text style={{ color: flag ? colors.primary : 'black' }}>
                                                {wardNameFromID(item.ID_Ward)}, {districtNameFromID(item.ID_District)}, {cityNameFromID(item.ID_City)}
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
                            </TouchableWithoutFeedback>
                        );
                    }

                    )
                }
            </ScrollView>
        </View>
    );

    const onSetAddress = (a) => {
        setForm({
            ...form, address: a
        });
    };

    // const cityNameFromID = (ID) => {
    //     const city = Store.getState().locations.Cities.find((item) => item.ID == ID);
    //     if (city)
    //         return city.Name;
    //     else return '';
    // };

    // const districtNameFromID = (ID) => {
    //     const district = Store.getState().locations.Districts.find((item) => item.ID == ID);
    //     if (district)
    //         return district.Name;
    //     else return '';
    // };

    // const wardNameFromID = (ID) => {
    //     const ward = Store.getState().locations.Wards.find((item) => item.ID == ID);
    //     if (ward)
    //         return ward.Name;
    //     else return '';
    // };

    const onNavigate = () => {
        // navigate(POST_PREVIEW, { form: form, Post: Post });
        setIsPreviewing(true);
    };

    const onPreview = async () => {
        // console.log("Preview: " + JSON.stringify(form));
        // console.log("Address: " + JSON.stringify(Addresses));
        // if (form.address && form.brand && form.lineup && form.type && form.condition && form.color && form.price && form.images.length > 0) {
        //     if (!isNaN(form.address.ID) && !isNaN(form.price) && !isNaN(form.brand) && !isNaN(form.lineup) && !isNaN(form.type) && !isNaN(form.condition) && !isNaN(form.color)) {
        //         console.log("Posting")
        //         const postres = await UploadPost(
        //             form.images,
        //             form.title || 'No title',
        //             form.content || 'No content',
        //             form.price || '-1',
        //             form.address.ID,
        //             form.name || 'No name',
        //             form.odometer || '-1',
        //             form.licensePlate || 'No license plate',
        //             form.manufacturerYear || '-1',
        //             form.cubicPower || '-1',
        //             form.brand,
        //             form.lineup,
        //             form.type,
        //             form.condition,
        //             form.color,
        //         )
        //         console.log("Post res: " + JSON.stringify(postres));
        //     } else {
        //         console.log("ID is not a number")
        //     }
        // } else {
        //     console.log("Missing data")
        // }


        onNavigate();
    }

    return (
        <Root>
            {isPreviewing ?
                <PostPreviewComponent form={form} onPost={onPost} /> :
                <View style={{ height: '100%', position: 'relative', }}>
                    <Container keyboardShouldPersistTaps={'never'}
                        styleScrollView={{ backgroundColor: '#fff', height: heightScreen }}>
                        <TouchableWithoutFeedback onPress={closeAllBottomSheet}>
                            <Animated.View
                                style={{
                                    paddingHorizontal: 20,
                                    marginTop: 15,
                                    flex: 1,
                                    opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
                                    height: '100%',
                                }}
                            >
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Title & Description</Text>
                                </View>

                                <TextInputOutline
                                    label={'Title'}
                                    inputPadding={6}
                                    borderWidthtoTop={0}
                                    containerStyle={{
                                        height: 56,
                                        borderColor: '#555',
                                    }}
                                    labelStyle={{ fontSize: 12 }}
                                    numberOfLines={2}
                                    multiline={true}
                                    inputStyle={{
                                        textAlignVertical: 'top',
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        fontSize: 14,
                                    }}
                                    maxLength={128}
                                    labelContainerStyle={{ padding: 13 }}
                                    value={form.title}
                                    editable={!isBottomSheetVisible}
                                    onChangeText={value => {
                                        onChange({ name: 'title', value });
                                    }}
                                    onEndEditing={checkTitle}
                                    error={errors.title}
                                />

                                <TextInputOutline
                                    label={'Description'}
                                    inputPadding={6}
                                    borderWidthtoTop={0}
                                    containerStyle={{
                                        height: 145,
                                        borderColor: '#555',
                                    }}
                                    labelStyle={{ fontSize: 12 }}
                                    labelContainerStyle={{ padding: 13 }}
                                    value={form.content}
                                    numberOfLines={8}
                                    multiline={true}
                                    inputStyle={{
                                        textAlignVertical: 'top',
                                        paddingHorizontal: 16,
                                        paddingVertical: 10,
                                        fontSize: 14,
                                    }}
                                    editable={!isBottomSheetVisible}
                                    onChangeText={value => {
                                        onChange({ name: 'content', value });
                                    }} />

                                <TextInputOutline
                                    label={'Price'}
                                    iconClass={MaterialIcons}
                                    iconName={'attach-money'}
                                    iconColor={'#90B4D3'}
                                    inputPadding={6}
                                    borderWidthtoTop={0}
                                    containerStyle={{
                                        height: 44,
                                        borderColor: '#555',
                                    }}
                                    labelStyle={{ fontSize: 12 }}
                                    inputStyle={{ fontSize: 14 }}
                                    labelContainerStyle={{ padding: 13 }}
                                    iconSize={20}
                                    value={form.price}
                                    keyboardType={'numeric'}
                                    editable={!isBottomSheetVisible}
                                    onChangeText={value => {
                                        onChange({ name: 'price', value });
                                    }}
                                    onEndEditing={checkPrice}
                                    error={errors.price}
                                />

                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 5 }}>Detail Information</Text>
                                </View>

                                {/* Name */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Name</Text>
                                    <TextInputOutline
                                        label={'Name'}
                                        iconClass={MaterialIcons}
                                        iconName={'drive-file-rename-outline'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={form.name}
                                        editable={!isBottomSheetVisible}
                                        onChangeText={value => {
                                            onChange({ name: 'name', value });
                                        }}
                                        onEndEditing={checkName}
                                        error={errors.name}
                                    />
                                </View>

                                {/* Brand */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Brand - Lineup</Text>
                                    <TextInputOutline
                                        label={'Brand - Lineup'}
                                        iconClass={MaterialIcons}
                                        iconName={'motorcycle'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={(form.brand !== '' && form.lineup !== '') ? brandNameFromID(form.brand) + ' - ' + lineupNameFromID(form.lineup) : ''}
                                        editable={!isBottomSheetVisible}
                                        onTouchEnd={() => {
                                            changeBottomSheetVisibility(true)
                                            checkBrand()
                                        }}
                                        error={errors.brand}
                                    />

                                </View>

                                {/* Type */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Type</Text>
                                    <TextInputOutline
                                        label={'Type'}
                                        iconClass={MaterialIcons}
                                        iconName={'category'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={typeNameFromID(form.type)}
                                        editable={!isBottomSheetVisible}
                                        onTouchEnd={() => {
                                            changeTypeBottomSheetVisibility(true)
                                            checkType()
                                        }}
                                        error={errors.type}
                                    />
                                </View>

                                {/* Color */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Color</Text>
                                    <TextInputOutline
                                        label={'Color'}
                                        iconClass={FontAwesome}
                                        iconName={'circle'}
                                        iconColor={colorHexFromID(form.color)}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={colorNameFromID(form.color)}
                                        editable={!isBottomSheetVisible}
                                        onTouchEnd={() => changeColorBottomSheetVisibility(true)}
                                    />
                                </View>

                                {/*Condition*/}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Condition</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        {dataConditon.map((item, index) => {
                                            return (
                                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', width: '48%', borderWidth: 1, borderColor: '#555', borderRadius: 7, height: 44, backgroundColor: '#F5F5F5', paddingStart: 10 }}>
                                                    <RadioButton
                                                        value={item.Condition}
                                                        status={form.condition == item.ID ? 'checked' : 'unchecked'}
                                                        onPress={() => onSetCondition(item.ID)}
                                                        disabled={isBottomSheetVisible}
                                                    />
                                                    <Text style={{ color: form.condition == item.ID ? colors.primary : '#555', fontSize: 14, marginStart: 5 }}>{item.Condition}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>

                                    {errors.condition && (
                                        <Text
                                            style={{
                                                alignSelf: 'flex-end',
                                                color: '#F50057',
                                                paddingEnd: 5,
                                                fontSize: 12,
                                                paddingTop: 1,
                                                textAlign: 'right',
                                            }}>
                                            {errors.condition}
                                        </Text>
                                    )}

                                </View>

                                {/* Odometer */}
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Odometer</Text>
                                    <TextInputOutline
                                        label={'Odometer'}
                                        iconClass={Ionicons}
                                        iconName={'speedometer'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={form.odometer}
                                        editable={!isBottomSheetVisible}
                                        keyboardType={'numeric'}
                                        onChangeText={value => {
                                            onChange({ name: 'odometer', value });
                                        }} />
                                </View>

                                {/* License plate */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>License Plate</Text>
                                    <TextInputOutline
                                        label={'License Plate'}
                                        iconClass={Octicons}
                                        iconName={'number'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={form.licensePlate}
                                        editable={!isBottomSheetVisible}
                                        onChangeText={value => {
                                            onChange({ name: 'licensePlate', value });
                                        }} />
                                </View>

                                {/* Manufacturer Year */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Manufacturer Year</Text>
                                    <TextInputOutline
                                        label={'Manufacturer Year'}
                                        iconClass={Fontisto}
                                        iconName={'date'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={form.manufacturerYear.toString()}
                                        editable={!isBottomSheetVisible}
                                        onTouchEnd={() => changeManufacturerYearBottomSheetVisibility(true)}
                                    />
                                </View>

                                {/* Cubic Power */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Cubic Power</Text>
                                    <TextInputOutline
                                        label={'Cubic Power'}
                                        iconClass={MaterialIcons}
                                        iconName={'speed'}
                                        iconColor={'#90B4D3'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 44,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12 }}
                                        inputStyle={{ fontSize: 14 }}
                                        labelContainerStyle={{ padding: 13 }}
                                        iconSize={20}
                                        value={form.cubicPower}
                                        editable={!isBottomSheetVisible}
                                        keyboardType={'numeric'}
                                        onChangeText={value => {
                                            onChange({ name: 'cubicPower', value });
                                        }} />
                                </View>

                                {/* Image */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Image</Text>
                                    {form.images.length > 0 ?
                                        (
                                            <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                {RenderFileUri(form.images)}
                                                {form.images.length < 8 && form.images.length > 0 && (
                                                    <TouchableWithoutFeedback onPress={() => { changeImageBottomSheetVisibility(true) }}>
                                                        <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)} style={{
                                                            width: (widthScreen - 40) / 4 - 10,
                                                            height: (widthScreen - 40) / 4 - 10,
                                                            backgroundColor: '#f5f5f5',
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 5,
                                                            margin: 5,
                                                        }}>
                                                            <MaterialCommunityIcons name="camera-plus" size={24} color={colors.primary} />
                                                            <Text style={{ fontSize: 10, color: '#555', textAlign: 'center', marginTop: 5 }}>Add more</Text>
                                                        </Animated.View>
                                                    </TouchableWithoutFeedback>
                                                )}
                                            </Animated.View>

                                        ) :
                                        (
                                            <TouchableWithoutFeedback onPress={() => {
                                                changeImageBottomSheetVisibility(true)
                                                checkImages()
                                            }}>
                                                <View style={{ height: ((widthScreen - 40) / 4 - 10) * 2, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                                    <MaterialCommunityIcons name="camera-plus" size={48} color={colors.primary} />
                                                    <Text style={{ fontSize: 14, color: '#555', textAlign: 'center', marginTop: 5 }}>Upload 1 to 8 images for your vehicle</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}

                                    {errors.images && (
                                        <Text
                                            style={{
                                                alignSelf: 'flex-end',
                                                color: '#F50057',
                                                paddingEnd: 5,
                                                fontSize: 12,
                                                paddingTop: 1,
                                                textAlign: 'right',
                                            }}>
                                            {errors.images}
                                        </Text>
                                    )}
                                </View>


                                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Seller Information</Text>
                                </View>
                                {/* Address */}
                                <View>
                                    <Text style={{ marginBottom: 5, fontWeight: '500', color: '#555' }}>Address</Text>
                                    <TextInputOutline
                                        label={'Address'}
                                        inputPadding={6}
                                        borderWidthtoTop={0}
                                        containerStyle={{
                                            height: 70,
                                            borderColor: '#555',
                                        }}
                                        labelStyle={{ fontSize: 12, marginTop: 12, }}
                                        numberOfLines={2}
                                        multiline={true}
                                        inputStyle={{
                                            textAlignVertical: 'center',
                                            paddingHorizontal: 16,
                                            paddingVertical: 8,
                                            fontSize: 14,
                                        }}
                                        maxLength={128}
                                        labelContainerStyle={{ padding: 13 }}
                                        value={form.address ? form.address.Detail_address + '\n' + wardNameFromID(form.address.ID_Ward) + ', ' + districtNameFromID(form.address.ID_District) + ', ' + cityNameFromID(form.address.ID_City) : ''}
                                        editable={!isBottomSheetVisible}
                                        onTouchEnd={() => {
                                            changeAddressBottomSheetVisibility(true)
                                            checkAddress()
                                        }} />

                                    {errors.address && (
                                        <Text
                                            style={{
                                                alignSelf: 'flex-end',
                                                color: '#F50057',
                                                paddingEnd: 5,
                                                fontSize: 12,
                                                paddingTop: 1,
                                                textAlign: 'right',
                                            }}>
                                            {errors.address}
                                        </Text>
                                    )}

                                </View>

                                <View style={{ height: 200 }} />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Container>

                    {/*Brand Bottom Sheet*/}
                    <BottomSheet
                        ref={bottomSheet}
                        snapPoints={[heightScreen - 150, 0]}
                        initialSnap={1}
                        callbackNode={fall}
                        onCloseEnd={() => {
                            changeBottomSheetVisibility(false);
                        }}
                        enabledGestureInteraction={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                    />

                    {/*Type Bottom Sheet*/}
                    <BottomSheet
                        ref={typeBottomSheet}
                        snapPoints={[300, 0]}
                        initialSnap={1}
                        callbackNode={fall}
                        onCloseEnd={() => {
                            changeTypeBottomSheetVisibility(false);
                        }}
                        enabledGestureInteraction={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderTypeContent}
                    />

                    {/*Color Bottom Sheet*/}
                    <BottomSheet
                        ref={colorBottomSheet}
                        snapPoints={[200, 0]}
                        initialSnap={1}
                        callbackNode={fall}
                        onCloseEnd={() => {
                            changeColorBottomSheetVisibility(false);
                        }}
                        enabledGestureInteraction={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderColorContent}
                    />

                    {/*Manufacturer Year Bottom Sheet*/}
                    <BottomSheet
                        ref={manufacturerYearBottomSheet}
                        snapPoints={[500, 0]}
                        initialSnap={1}
                        callbackNode={fall}
                        onCloseEnd={() => {
                            changeManufacturerYearBottomSheetVisibility(false);
                        }}
                        enabledGestureInteraction={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderManufacturerYearContent}
                    />

                    {/*Images Bottom Sheet*/}
                    <BottomSheet
                        ref={imageBottomSheet}
                        snapPoints={[230, 0]}
                        initialSnap={1}
                        callbackNode={fall}
                        onCloseEnd={() => {
                            changeImageBottomSheetVisibility(false);
                        }}
                        enabledGestureInteraction={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderContentImage}
                    />

                    {/*Address Bottom Sheet*/}
                    <BottomSheet
                        ref={addressBottomSheet}
                        snapPoints={[500, 0]}
                        initialSnap={1}
                        callbackNode={fall}
                        onCloseEnd={() => {
                            changeAddressBottomSheetVisibility(false);
                        }}
                        enabledGestureInteraction={true}
                        renderHeader={_renderHeader}
                        renderContent={_renderAddressContent}
                    />

                    <FAB
                        onPress={() => {
                            onPreview();
                        }}
                        label='Preview'
                        variant='extended'
                        size='small'
                        style={{
                            position: 'absolute',
                            margin: 16,
                            marginHorizontal: 16,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            backgroundColor: colors.secondary,
                        }} />
                </View >
            }
        </Root>
    );
}

export default AddPostComponent;

const styles = StyleSheet.create({
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
        shadowOffset: { width: -1, height: -3 },
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
