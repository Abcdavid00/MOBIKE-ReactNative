import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native';
import { Root, Popup } from 'popup-ui'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import data from '../../data/imageBanner';
import dataPostPreviewList from '../../data/dataPostPreviewList';
import { Image } from 'react-native';
import Store from '../../redux/store';
import Animated, { color } from 'react-native-reanimated';
import ReadMore from '@fawazahmed/react-native-read-more';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { APPLICATION_ADMIN, MARKETPLACE, SEE_ALL_REVIEWS, YOUR_POSTS } from '../../constants/routeNames';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { height } from '../Banner/carouselItem';
import MobikeImage from '../common/image';
import { TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import PostPreviewList from '../PostPreview/flatList';
import { conditionNameFromID, brandNameFromID, lineupNameFromID, typeNameFromID, colorNameFromID, colorHexFromID, convertFirstCharacterToUppercase, formatPrice, wardNameFromID, districtNameFromID, cityNameFromID } from '../../utils/idToProperty';
import { AppAdminGetPost, GetPersonalPostDetail, GetPost, GetUserInfo } from '../../backendAPI';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import ReportBottomSheetContent from './ReportBottomSheetContent';
import TextInputOutline from '../common/textInputOutline-Kohana';
import { Keyboard } from 'react-native';
import { AppAdminSetStatus } from '../../backendAPI';

import { Linking } from 'react-native'

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const PostDetailComponent = ({
    postID,
    isActivePost,
    isAdmin,
}) => {
    const { navigate } = useNavigation();

    const selectedPost = useSelector(state => state.selectedPost.ID);

    const post = {
        images: [{
            ID: '1',
        }, {
            ID: '2',
        }, {
            ID: '3',
        }],
        type: 1,
        title: 'SC Project S1 KTM12-41T Slip On Titanium Exhaust | KTM Duke 790',
        price: 45000000,
        content: 'The Honda Master 125cc is a very comfortable bike for travelling Vietnam thanks to the riding position and the large seat. It is reliable and have easily enough power to take 1 or 2 people through the country. \nThe Honda Master has a high cruising speed means that you can cover many km in a day and still not feel uncomfortable.While it doesn’t offer the off road capabilities of the Honda XR it is great for the highway and main roads between HCM and Hanoi and is available at a cheaper price. \nThe price shown below is for a month rent but you can see the daily and longer rental price on the right side. \nThe Honda Master comes with a rack suitable for 1 bag and a strong phone holder for navigation as well as a map, a D- Lock and bungee cords.',
        name: 'ABC',
        lineup: '1',
        manufacturerYear: 2020,
        condition: 1,
        cubicPower: 125,
        odometer: 10000,
        color: 1,
        brand: 1,
        licensePlate: '29A-12345',
    }

    const ratingPost = [
        {
            ID: 1,
            Rating_point: 5,
            Content: 'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 1,
            User_Info: {
                ID: 1,
                ID_Avatar: 1,
                Name: 'Dang Khoa Nguyen',
            }
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
            }
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
            }
        },
        {
            ID: 4,
            Rating_point: 1,
            Content: 'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 4,
            User_Info: {
                ID: 4,
                ID_Avatar: 4,
                Name: 'Minj07',
            }
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
            }
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
            }
        },
        {
            ID: 1,
            Rating_point: 5,
            Content: 'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 1,
            User_Info: {
                ID: 1,
                ID_Avatar: 1,
                Name: 'Dang Khoa Nguyen',
            }
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
            }
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
            }
        },
    ]

    const starAverage = 4.5;

    //Get post data
    const [isLoading, setIsLoading] = React.useState(true);
    useEffect(() => {
        if (isAdmin) {
            getInactivePostByAdmin();
        }
        else if (isActivePost) {
            getData();
        }
        else {
            getInactivePost();
        }
    }, []);

    const getData = async () => {
        const post = await GetPost(postID);
        console.log('Post Detail: ' + JSON.stringify(post));
        setPostInfo((prevPost) => post);
        const user = await GetUserInfo(post.user.ID);
        console.log('User Info: ' + JSON.stringify(user));
        let tmp = Array.from(user.posts.filter((item) => item.ID != postID));
        let tmp2 = tmp.map((item) => {
            return item.ID
        });
        setPostList(tmp2);
        setUserInfo(user);
        setIsLoading(false);
    }

    const [postInfo, setPostInfo] = React.useState({});
    const [userInfo, setUserInfo] = React.useState({});
    const [postList, setPostList] = React.useState([]);

    //Get inactive post data
    const getInactivePost = async () => {
        const post = await GetPersonalPostDetail(postID);
        console.log('Personal Post Detail: ' + JSON.stringify(post));
        setPostInfo(post);
        setIsLoading(false);
    }

    const getInactivePostByAdmin = async () => {
        const post = await AppAdminGetPost(postID);
        console.log('Post Detail by admin: ' + JSON.stringify(post));
        setPostInfo(post);
        setIsLoading(false);
    }

    const OnApprovePost = () => {
        ApprovePost();
    }

    const ApprovePost = async () => {
        const approveRes = await AppAdminSetStatus(postID, 1, message);
        console.log('Approve post: ' + JSON.stringify(approveRes));
        navigate(APPLICATION_ADMIN);
    }

    const _renderSkeleton = () => (
        <SkeletonContent
            containerStyle={[styles.styleWrapper]}
            highlightColor="#C0DAF155"
            isLoading={isLoading}
            layout={
                [
                    {
                        key: 'image', width: widthScreen - 20,
                        height: heightScreen / 3, borderRadius: 5,
                        marginTop: 10,
                    },
                    {
                        key: 'title', width: widthScreen - 20,
                        height: 50,
                        marginTop: 10, borderRadius: 5,
                    },
                    {
                        key: 'detail', width: widthScreen - 40,
                        height: 150,
                        marginTop: 10, borderRadius: 5,
                    },
                    {
                        key: 'detail_information', width: 60,
                        height: 16,
                        marginTop: 10,
                        marginHorizontal: 20,
                        alignSelf: 'flex-start', borderRadius: 5,
                    },
                    {
                        key: 'detail_information_1', width: widthScreen - 100,
                        height: 20,
                        marginTop: 5, borderRadius: 5,
                    },
                    {
                        key: 'detail_information_2', width: widthScreen - 100,
                        height: 20,
                        marginTop: 5, borderRadius: 5,
                    },
                    {
                        key: 'detail_information_3', width: widthScreen - 100,
                        height: 20,
                        marginTop: 5, borderRadius: 5,
                    },
                    {
                        key: 'detail_information_4', width: widthScreen - 100,
                        height: 20,
                        marginTop: 5, borderRadius: 5,
                    },
                ]}
        />
    )


    const renderStarRating = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<Octicons key={i} name='star-fill' size={10} color='#FCC72E' style={{ marginLeft: i != 1 ? 3 : 0, }} />)
            }
        }
        return stars;
    }

    const onNavigate = () => {
        navigate(SEE_ALL_REVIEWS, { ratingPost });
    }

    const DetailRoute = () => (
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
            <ReadMore seeMoreStyle={{ color: colors.text, fontStyle: 'italic', }} seeLessStyle={{ color: colors.text, fontStyle: 'italic' }} style={{ color: '#384653', fontSize: 14, fontWeight: '400' }} numberOfLines={10}>{postInfo.post.Content}</ReadMore>
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginBottom: 15, fontWeight: '500', color: '#000' }}>Detail Information</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 5 }}>
                    <View style={{ width: widthScreen / 2 - 30 }}>

                        {/* Brand */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <MaterialIcons name='motorcycle' size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Brand : </Text>
                            <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{brandNameFromID(postInfo.vehicleinfo.ID_VehicleBrand)}</Text>
                        </View>

                        {/* Condition */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <MaterialCommunityIcons name='list-status' size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Condition : </Text>
                            <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{conditionNameFromID(postInfo.vehicleinfo.ID_Condition)}</Text>
                        </View>

                        {/* Cubic Power */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <MaterialIcons name='speed' size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Cubic Power : </Text>
                            <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{postInfo.vehicleinfo.Cubic_power > 0 ? postInfo.vehicleinfo.Cubic_power : "---"}</Text>
                        </View>

                        {/* Name */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <AntDesign name='edit' size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Name : </Text>
                            <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{postInfo.vehicleinfo.Vehicle_name}</Text>
                        </View>

                    </View>
                    <View style={{ width: widthScreen / 2 - 30 }}>
                        <View>

                            {/* Lineup */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <MaterialCommunityIcons name='label-multiple-outline' size={18} color={colors.primary} />
                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Lineup : </Text>
                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{lineupNameFromID(postInfo.vehicleinfo.ID_VehicleLineup)}</Text>
                            </View>

                            {/* Color */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Ionicons name='color-palette-outline' size={18} color={colors.primary} />
                                <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Color : </Text>
                                <FontAwesome name='circle' size={18} color={colorHexFromID(postInfo.vehicleinfo.ID_Color)} style={{ marginLeft: 5 }} />
                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{colorNameFromID(postInfo.vehicleinfo.ID_Color)}</Text>
                            </View>

                            {/* Odometer */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Ionicons name='speedometer-outline' size={18} color={colors.primary} />
                                <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Odometer : </Text>
                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{postInfo.vehicleinfo.Odometer > 0 ? postInfo.vehicleinfo.Odometer : '---'}</Text>
                            </View>

                            {/* Manufacturer Year */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Fontisto name='date' size={18} color={colors.primary} />
                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Year : </Text>
                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{postInfo.vehicleinfo.Manufacture_year > 0 ? postInfo.vehicleinfo.Manufacture_year : "---"}</Text>
                            </View>

                        </View>
                    </View>
                </View>
                {/* License Plate */}
                <View style={{ flexDirection: 'row', marginBottom: 15, paddingLeft: 7 }}>
                    <Octicons name='number' size={18} color={colors.primary} />
                    <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>License Plate : </Text>
                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{postInfo.vehicleinfo.License_plate ? postInfo.vehicleinfo.License_plate : "---"}</Text>
                </View>
            </View>
        </View>
    );

    const ReviewRoute = () => {
        if (ratingPost.length == 0) {
            return (
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#555', fontWeight: '500' }}>No review yet</Text>
                </View>
            )
        }
        let shorttenRatingPost = ratingPost.slice(0, 5);
        return (
            <View>
                {shorttenRatingPost.map((item, index) =>
                (
                    < View key={index} >
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 8, marginLeft: 10, }}>
                            <MobikeImage imageID={item.User_Info.ID_Avatar} style={{ width: 40, height: 40, borderRadius: 500 }} />
                            <View style={{ marginHorizontal: 15, flex: 1 }}>

                                {/* Name & Time Created */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, flex: 1 }}>{item.User_Info.Name}</Text>
                                    <Text style={{ color: '#555', fontWeight: '300', fontSize: 10, fontStyle: 'italic', marginLeft: 10, }}>{item.Time_created}</Text>
                                </View>

                                {/* Rating Star */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    {renderStarRating(item.Rating_point)}
                                </View>

                                {/* Content */}
                                <Text style={{ marginTop: 5, fontStyle: 'italic', fontSize: 12 }}>{item.Content}</Text>
                            </View>


                        </View>


                        {/* Seperate */}
                        <View style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 10 }} />

                    </View >
                ))}

                {/* View All */}
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableNativeFeedback onPress={onNavigate}>
                        <Text style={{ color: colors.text, fontWeight: '400', fontStyle: 'italic', fontSize: 12 }}>{'See all (' + ratingPost.length + ') >'}</Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    };

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Details', title: 'Details' },
        { key: 'Reviews', title: 'Reviews' },
    ]);

    const renderScene = SceneMap({
        Details: DetailRoute,
        Reviews: ReviewRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={colors.text}
            inactiveColor={'#8D8D8D'}
            indicatorStyle={{ backgroundColor: colors.secondary, height: 3, }}
            labelStyle={{ fontSize: 14, fontWeight: '500', textTransform: 'none' }}
            pressOpacity={0.8}
            pressColor={'#C0DAF155'}
            style={{ backgroundColor: 'white', elevation: 0, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }}
        />
    );

    // //Saved post
    // const [isSaved, setIsSaved] = useState(false);

    // const onSetSaved = () => {
    //     setIsSaved(!isSaved);
    // }

    //Report
    const [report, setReport] = useState('');
    const fall = new Animated.Value(1);
    const reportBottomSheet = useRef(null);
    const changeReportBottomSheetVisibility = visibility => {
        reportBottomSheet.current.snapTo(visibility ? 0 : 1);
    };

    const _renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const _renderReportContent = () => (
        <ReportBottomSheetContent
            onSetReport={onSetReport}
            onCloseBottomSheet={() => changeReportBottomSheetVisibility(false)}
        />
    );

    const onSetReport = (content) => {
        setReport(content);
    };

    const [message, setMessage] = useState('');
    const onSetMessage = (content) => {
        setMessage(content);
    };


    return (
        <Root>
            <View style={{ height: '100%', position: 'relative' }}>
                <Animated.View
                    style={{
                        flex: 1,
                        opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
                        height: '100%',
                    }}
                >
                    {isLoading ?
                        _renderSkeleton()
                        :
                        (<Container
                            keyboardShouldPersistTaps="always"
                            styleScrollView={{
                                backgroundColor: '#FFFFFF'
                            }}
                        >

                            {/* Image */}
                            <Carousel data={postInfo.post.rel_Image} isImageID={true} havingBackground={true} />

                            <View style={{ paddingHorizontal: 20, marginTop: 5, }}>

                                {/* Type */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
                                    <FontAwesome name="circle" size={8} color={colors.secondary} />
                                    <Text style={{ color: colors.text, fontSize: 12, marginLeft: 8, fontWeight: '500' }}>{typeNameFromID(postInfo.vehicleinfo.ID_VehicleType)}</Text>
                                </View>

                                {/* Title */}
                                <View style={{ alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 16 }}>{postInfo.post.Title}</Text>
                                </View>

                                {/* Price */}
                                <View style={{ alignSelf: 'flex-end', marginTop: 5, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', color: colors.textRed, fontSize: 18 }}>{formatPrice(postInfo.post.Pricetag) + ' VND'}</Text>

                                    {/* Star Average
                                {!isAdmin &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                            <Octicons name="star-fill" size={14} color={'#FCC72E'} />
                                            <Text style={{ color: '#000', fontSize: 12, marginLeft: 5, fontWeight: '500' }}>{starAverage}</Text>
                                        </View>
                                        <Text style={{ color: '#000', fontSize: 10, fontWeight: '300', fontStyle: 'italic' }}>/ {ratingPost.length} Reviews</Text>
                                    </View>} */}

                                </View>
                            </View>

                            {isAdmin && <View style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 20, }} />}

                            {!isAdmin &&
                                <TabView
                                    navigationState={{ index, routes }}
                                    renderScene={() => null}
                                    onIndexChange={setIndex}
                                    initialLayout={{ width: layout.width }}
                                    renderTabBar={renderTabBar}
                                    style={{ marginTop: 5 }}
                                />}

                            {index == 0 ? DetailRoute() : ReviewRoute()}



                            {/* Seperate */}
                            <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />



                            {(isActivePost && !isAdmin) ?
                                (<View>

                                    {/* Report
                                <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingVertical: 15, marginHorizontal: 20 }} >
                                    <Octicons name="shield-check" size={36} color={colors.primary} style={{ marginRight: 20 }} />
                                    <Text style={{ fontSize: 14, fontWeight: '400', fontStyle: 'italic', flex: 1, alignSelf: 'center' }}>
                                        <Text>This post has been approved. If it has any problem, please </Text>
                                        <TouchableWithoutFeedback onPress={() => changeReportBottomSheetVisibility(true)}><Text style={{ color: colors.textRed }}>report here</Text></TouchableWithoutFeedback>
                                        <Text>.</Text>
                                    </Text>
                                </View> */}

                                    {/* Seperate
                                <View style={{ backgroundColor: '#F6F6F6', height: 8 }} /> */}
                                    {/* Seller Info */}
                                    {/* < View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 12, marginLeft: 10, }}>

                                        
                                        <View style={{ alignSelf: 'flex-end', marginTop: 5, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', color: colors.textRed, fontSize: 18 }}>{formatPrice(postInfo.post.Pricetag) + ' VND'}</Text>

                                            
                                            {!isAdmin &&
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                                        <Octicons name="star-fill" size={14} color={'#FCC72E'} />
                                                        <Text style={{ color: '#000', fontSize: 12, marginLeft: 5, fontWeight: '500' }}>{starAverage}</Text>
                                                    </View>
                                                    <Text style={{ color: '#000', fontSize: 10, fontWeight: '300', fontStyle: 'italic' }}>/ {ratingPost.length} Reviews</Text>
                                                </View>}

                                        </View>
                                    </View> */}

                                    {isAdmin && <View style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 20, }} />}



                                    {/* Seperate */}
                                    <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />



                                    {(isActivePost && !isAdmin) ?
                                        (<View>

                                            {/* Report */}
                                            <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingVertical: 15, marginHorizontal: 20 }} >
                                                <Octicons name="shield-check" size={36} color={colors.primary} style={{ marginRight: 20 }} />
                                                <Text style={{ fontSize: 14, fontWeight: '400', fontStyle: 'italic', flex: 1, alignSelf: 'center' }}>
                                                    <Text>This post has been approved. If it has any problem, please </Text>
                                                    <TouchableWithoutFeedback onPress={() => changeReportBottomSheetVisibility(true)}><Text style={{ color: colors.textRed }}>report here</Text></TouchableWithoutFeedback>
                                                    <Text>.</Text>
                                                </Text>
                                            </View>

                                            {/* Seperate */}
                                            <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />
                                            {/* Seller Info */}
                                            < View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 12, marginLeft: 10, }}>

                                                <MobikeImage imageID={postInfo.user.ID_Image_Profile} style={{ width: 48, height: 48, borderRadius: 500, borderWidth: 1, borderColor: '#e8e8e8' }} />

                                                <View style={{ marginHorizontal: 15, flex: 1 }}>

                                                    {/* Name & View Page */}
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 14, flex: 1 }}>{postInfo.user.Name}</Text>
                                                        <Text style={{ color: colors.text, fontWeight: '400', fontSize: 12, fontStyle: 'italic', marginLeft: 10, }}>View page ></Text>
                                                    </View>

                                                    {/* Address */}
                                                    <View style={{ flexDirection: 'row', marginTop: 5, marginEnd: 15, alignItems: 'flex-start', flex: 1 }}>
                                                        <SimpleLineIcons name="location-pin" size={12} color={'#374957'} style={{ marginTop: 2 }} />
                                                        <Text style={{ color: '#555', fontWeight: '300', fontSize: 12, fontStyle: 'italic', marginLeft: 5 }}>{wardNameFromID(postInfo.address.ID_Ward) + ', ' + districtNameFromID(postInfo.address.ID_District) + ', ' + cityNameFromID(postInfo.address.ID_City)}</Text>
                                                    </View>

                                                    {/* Feature */}
                                                    <View style={{ flexDirection: 'row', marginTop: 5, }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                                            <Text style={{ fontSize: 12, color: colors.text }}>50</Text>
                                                            <Text style={{ fontSize: 10, color: '#000', fontWeight: '300', marginStart: 5, marginRight: 15, }}>Posts</Text>
                                                            <View style={{ height: '90%', width: 1, backgroundColor: '#e8e8e8' }} />
                                                        </View>

                                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginStart: 12 }}>
                                                            <Text style={{ fontSize: 12, color: colors.text }}>5.0</Text>
                                                            <Text style={{ fontSize: 10, color: '#000', fontWeight: '300', marginStart: 5, marginRight: 15, }}>Rate</Text>
                                                            {/* <View style={{ height: '90%', width: 1, backgroundColor: '#e8e8e8' }} /> */}
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>

                                            {/* Seperate */}
                                            <View style={{ backgroundColor: '#E8E8E8', height: 1 }} />

                                            {!isAdmin ?

                                                (< View >
                                                    {/* Statistics
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginHorizontal: 20, marginBottom: 5, }}>
                                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>
                                                    <Text>Statistics</Text>
                                                </Text>
                                            </View> */}
                                                </View>)
                                                :
                                                (
                                                    <View style={{ paddingVertical: 20 }}>
                                                        {/* Approve */}
                                                        <TextInputOutline
                                                            label={'Message to user'}
                                                            inputPadding={6}
                                                            borderWidthtoTop={0}
                                                            containerStyle={{
                                                                height: 56,
                                                                borderColor: '#555',
                                                                marginHorizontal: '5%',
                                                                marginTop: 10,
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
                                                            labelContainerStyle={{ padding: 13 }}
                                                            value={message}
                                                            onChangeText={value => {
                                                                onSetMessage(value);
                                                            }}
                                                        />
                                                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', width: '100%', marginTop: 10, }}>

                                                            <FAB
                                                                onPress={() => {

                                                                }}
                                                                label='Decline'
                                                                variant='extended'
                                                                size='small'
                                                                style={{ backgroundColor: '#DDD', marginBottom: 50, }}
                                                            />
                                                            <FAB
                                                                onPress={() => {
                                                                }}
                                                                label='Approve'
                                                                variant='extended'
                                                                size='small'
                                                                style={{
                                                                    backgroundColor: colors.secondary,
                                                                    marginBottom: 50,
                                                                }} />
                                                        </View>
                                                        <PostPreviewList data={postList} extraData={selectedPost} />
                                                    </View>
                                                )}

                                        </View>
                                        )
                                        :
                                        (
                                            <View>

                                                {/* Seperate */}
                                                <View style={{ backgroundColor: '#E8E8E8', height: 1 }} />

                                                {!isAdmin ?

                                                    (< View >
                                                        {/* Statistics */}
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginHorizontal: 20, marginBottom: 5, }}>
                                                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>
                                                                <Text>Statistics</Text>
                                                            </Text>
                                                        </View>
                                                    </View>)
                                                    :
                                                    (
                                                        <View style={{ paddingVertical: 20 }}>
                                                            {/* Approve */}
                                                            <TextInputOutline
                                                                label={'Message to user'}
                                                                inputPadding={6}
                                                                borderWidthtoTop={0}
                                                                containerStyle={{
                                                                    height: 56,
                                                                    borderColor: '#555',
                                                                    marginHorizontal: '5%',
                                                                    marginTop: 10,
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
                                                                labelContainerStyle={{ padding: 13 }}
                                                                value={message}
                                                                onChangeText={value => {
                                                                    onSetMessage(value);
                                                                }}
                                                            />
                                                            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', width: '100%', marginTop: 10, }}>

                                                                {/* <FAB
                                                            onPress={() => {

                                                            }}
                                                            label='Decline'
                                                            variant='extended'
                                                            size='small'
                                                            style={{ backgroundColor: '#DDD', marginBottom: 50, }}
                                                        /> */}
                                                                <FAB
                                                                    onPress={() => {
                                                                        OnApprovePost();
                                                                    }}
                                                                    label='Approve'
                                                                    variant='extended'
                                                                    size='small'
                                                                    style={{
                                                                        backgroundColor: colors.secondary,
                                                                        marginBottom: 50,
                                                                    }} />
                                                            </View>

                                                            <View style={{ backgroundColor: '#fff', height: 200 }} />
                                                        </View>
                                                    )}
                                            </View>

                                        )
                                    }




                                    <View style={{ backgroundColor: '#fff', height: 100 }} />

                                </View>) : null}
                        </Container>)}
                </Animated.View>

                {/*Report Bottom Sheet*/}
                <BottomSheet
                    ref={reportBottomSheet}
                    snapPoints={[500, 0]}
                    initialSnap={1}
                    callbackNode={fall}
                    onCloseEnd={() => {
                        changeReportBottomSheetVisibility(false);
                    }}
                    enabledGestureInteraction={true}
                    renderHeader={_renderHeader}
                    renderContent={_renderReportContent}
                />

                {!isAdmin && isActivePost &&
                    (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10, position: 'absolute', bottom: 0, backgroundColor: '#f5f5f5', height: 70, alignItems: 'center' }}>

                            <FAB
                                onPress={() => {

                                }}
                                label='Message'
                                variant='extended'
                                size='small'
                                style={{ backgroundColor: colors.secondary, height: 50, paddingHorizontal: 10, }}
                            />
                            <FAB
                                onPress={() => {
                                }}
                                label='Call'
                                variant='extended'
                                size='small'
                                style={{
                                    backgroundColor: "#59FB69",
                                    Bottom: 0,
                                    paddingHorizontal: 30,
                                    height: 50,
                                }} />
                        </View>

                    )
                }

                {/* Report Bottom Sheet
            <BottomSheet
                ref={reportBottomSheet}
                snapPoints={[500, 0]}
                initialSnap={1}
                callbackNode={fall}
                onCloseEnd={() => {
                    changeReportBottomSheetVisibility(false);
                }}
                enabledGestureInteraction={true}
                renderHeader={_renderHeader}
                renderContent={_renderReportContent}
            /> */}

                {!isAdmin && isActivePost &&
                    (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10, position: 'absolute', bottom: 0, backgroundColor: '#f5f5f5', height: 70, alignItems: 'center' }}>
                            <FAB
                                onPress={() => {
                                    Linking.openURL(`tel:${userInfo.accountinfo.Phone_number}`)
                                }}
                                label='Call'
                                variant='extended'
                                size='small'
                                style={{
                                    backgroundColor: "#59FB69",
                                    Bottom: 0,
                                    paddingHorizontal: 30,
                                    height: 50,
                                }} />
                        </View>

                    )
                }

            </View >
        </Root>
    );
};

export default PostDetailComponent;

const styles = StyleSheet.create({
    styleWrapper: {
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        justifyContent: 'center',
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