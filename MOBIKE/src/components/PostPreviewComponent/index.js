import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native';
import { Root, Popup } from 'popup-ui'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import data from '../../data/imageBanner';
import { Image } from 'react-native';
import Store from '../../redux/store';
import { color } from 'react-native-reanimated';
import ReadMore from '@fawazahmed/react-native-read-more';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MARKETPLACE, YOUR_POSTS } from '../../constants/routeNames';
import MobikeImage from '../common/image';
import { ADD_POST } from './../../constants/routeNames';

const widthScreen = Dimensions.get('window').width;
const PostPreviewComponent = ({
    form,
    onPost
}) => {
    console.log(form.images);

    //Brand
    const brandNameFromID = (ID) => {
        const brand = Store.getState().vehicleModels.VehicleBrands.find((item) => item.ID == ID);
        if (brand)
            return brand.Name;
        else return '';
    };

    //Lineup
    const lineupNameFromID = (ID) => {
        const lineup = Store.getState().vehicleModels.VehicleLineUps.find((item) => item.ID == ID);
        if (lineup)
            return lineup.Lineup;
        else return '';
    };

    //Type
    const typeNameFromID = (ID) => {
        const type = Store.getState().vehicleTypes.find((item) => item.ID == ID);
        if (type)
            return type.Type;
        else return '';
    };

    //Color
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
    const conditionNameFromID = (ID) => {
        const condition = Store.getState().vehicleConditions.find((item) => item.ID == ID);
        if (condition)
            return condition.Condition;
        else return '';
    };

    // //Price
    const formatPrice = (price) => {
        if (price == undefined) return '';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const [showDetail, setShowDetail] = React.useState(false);

    //Post
    // const onPost = () => {
    //     Popup.show({
    //         type: 'Success',
    //         title: 'Success',
    //         button: true,
    //         textBody: 'Your post has been posted successfully',
    //         buttonText: 'OK',
    //         callback: () => { Popup.hide(); onClose(); }
    //     })
    // }

    const { navigate } = useNavigation();

    const onBackToEdit = () => {
        navigate(ADD_POST);
    }
    const onClose = () => {
        navigate(YOUR_POSTS);
    }

    return (
        <Root style={{ height: '100%', position: 'relative' }}>
            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{ backgroundColor: '#FFFFFF' }}>

                {/* Image */}
                <Carousel data={form.images} isUri={true} />

                <View style={{ paddingHorizontal: 20, marginTop: 5, }}>

                    {/* Type */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <FontAwesome name="circle" size={8} color={colors.secondary} />
                        <Text style={{ color: colors.text, fontSize: 12, marginLeft: 8, fontWeight: '500' }}>{typeNameFromID(form.type)}</Text>
                    </View>

                    {/* Title */}
                    <View style={{ alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 16 }}>{form.title}</Text>
                    </View>

                    {/* Price */}
                    <View style={{ alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: colors.textRed, fontSize: 18 }}>{formatPrice(form.price) + ' VND'}</Text>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 20, }} />

                {/* Description */}
                <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                    <ReadMore seeMoreStyle={{ color: colors.text, fontStyle: 'italic', }} seeLessStyle={{ color: colors.text, fontStyle: 'italic' }} style={{ color: '#384653', fontSize: 14, fontWeight: '400' }} numberOfLines={10}>{form.content}</ReadMore>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ marginBottom: 15, fontWeight: '500', color: '#000' }}>Detail Information</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 5 }}>
                            <View style={{ width: widthScreen / 2 - 30 }}>

                                {/* Branch */}
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <MaterialIcons name='motorcycle' size={18} color={colors.primary} />
                                    <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Branch : </Text>
                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{brandNameFromID(form.brand)}</Text>
                                </View>

                                {/* Condition */}
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <MaterialCommunityIcons name='list-status' size={18} color={colors.primary} />
                                    <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Condition : </Text>
                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{conditionNameFromID(form.condition)}</Text>
                                </View>

                                {/* Cubic Power */}
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <MaterialIcons name='speed' size={18} color={colors.primary} />
                                    <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Cubic Power : </Text>
                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.cubicPower}</Text>
                                </View>


                                {/* Name */}
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <MaterialIcons name='drive-file-rename-outline' size={18} color={colors.primary} />
                                    <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Name : </Text>
                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.name}</Text>
                                </View>

                            </View>
                            <View style={{ width: widthScreen / 2 - 30 }}>
                                <View>

                                    {/* Lineup */}
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <MaterialIcons name='label' size={18} color={colors.primary} />
                                        <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Lineup : </Text>
                                        <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{lineupNameFromID(form.lineup)}</Text>
                                    </View>

                                    {/* Color */}
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <FontAwesome name='circle' size={18} color={colorHexFromID(form.color)} />
                                        <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Color : </Text>
                                        <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{colorNameFromID(form.color)}</Text>
                                    </View>

                                    {/* Odometer */}
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Ionicons name='speedometer' size={18} color={colors.primary} />
                                        <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Odometer : </Text>
                                        <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.odometer}</Text>
                                    </View>

                                    {/* Manufacturer Year */}
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Fontisto name='date' size={18} color={colors.primary} />
                                        <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Year : </Text>
                                        <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.manufacturerYear}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        {/* License Plate */}
                        <View style={{ flexDirection: 'row', marginBottom: 15, paddingLeft: 7 }}>
                            <Octicons name='number' size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>License Plate : </Text>
                            <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.licensePlate}</Text>
                        </View>
                    </View>
                </View>


                {/* Seperate */}
                <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />

                {/* Address */}
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 12, marginLeft: 10, }}>

                    <MobikeImage imageID={1} style={{ width: 48, height: 48, borderRadius: 500, borderWidth: 1, borderColor: '#e8e8e8' }} />

                    <View style={{ marginHorizontal: 15, flex: 1 }}>

                        {/* Name & View Page */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: 14, flex: 1 }}>Huynh Duy Khang</Text>
                        </View>

                        {/* Address */}
                        <View style={{ flexDirection: 'row', marginTop: 5, marginEnd: 15, alignItems: 'flex-start', flex: 1 }}>
                            <SimpleLineIcons name="location-pin" size={12} color={'#374957'} style={{ marginTop: 2 }} />
                            <Text style={{ color: '#555', fontWeight: '300', fontSize: 12, fontStyle: 'italic', marginLeft: 5 }}>10/34, Thong Nhat Ward, Bien Hoa City, Dong Nai Province</Text>
                        </View>

                    </View>

                </View>

                {/* Seperate */}
                <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />

                <View style={{ height: 100 }} />


            </Container>
            <FAB
                onPress={onPost}
                label='Post'
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
        </Root>

    )
};

export default PostPreviewComponent;
