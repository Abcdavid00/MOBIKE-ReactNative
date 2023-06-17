import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import MobikeImage from '../../common/image';
import { POST_DETAIL, POST_DETAIL_NAVIGATOR } from '../../../constants/routeNames';
import { brandNameFromID, formatPrice, typeNameFromID } from '../../../utils/idToProperty';
import { selectPost } from '../../../redux/slice/selectedPostSlice';
import { TouchableWithoutFeedback } from 'react-native';
import { GetPersonalPostDetail, GetPost } from '../../../backendAPI';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';


const PostPreview = ({
    postID,
    pressable = true,
    styleWrapper,
    ...props
}) => {

    useEffect(() => {
        if (isActivePost) {
            getPost();
        }
        else {
            getInactivePost();
        }
    }, []);

    const [postInfo, setPostInfo] = React.useState({});
    const getPost = async () => {
        const post = await GetPost(postID);
        setPostInfo(post);
        setIsLoading(false);
    }

    const getInactivePost = async () => {
        setPostInfo((await GetPersonalPostDetail(postID)));
        setIsLoading(false);
    }

    const [isLoading, setIsLoading] = React.useState(true);

    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const onNavigate = () => {
        navigate(POST_DETAIL_NAVIGATOR, { screen: POST_DETAIL });
        dispatch(selectPost({ ID: postID, isActivePost: isActivePost }));
    };

    const _renderContent = () => {
        if (isActivePost) {
            return (
                <View
                    style={[styles.styleWrapper, index === 0 ? { marginStart: 20 } : null, styleWrapper]}>
                    <MobikeImage imageID={postInfo.post.rel_Image[0]} style={styles.styleImage} />

                    <View style={styles.textWrapper}>
                        <Text
                            style={styles.styleTitle}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {postInfo.post.Title}
                        </Text>
                        <Text style={styles.styleInfo} numberOfLines={1} ellipsizeMode="tail">
                            <Text>{typeNameFromID(postInfo.vehicleinfo.ID_VehicleType)}</Text>
                            <Text> - </Text>
                            <Text>{brandNameFromID(postInfo.vehicleinfo.ID_VehicleBrand)}</Text>
                        </Text>

                        <Text style={styles.stylePrice}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {formatPrice(postInfo.post.Pricetag) + ' VND'}
                        </Text>

                    </View>
                </View>




            );
        } else {
            return (
                (
                    <View
                        style={[styles.styleWrapper, index === 0 ? { marginStart: 20 } : null, styleWrapper]}>
                        <MobikeImage imageID={postInfo.post.rel_Image[0]} style={styles.styleImage} />

                        <View style={styles.textWrapper}>
                            <Text
                                style={styles.styleTitle}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {postInfo.post.Title}
                            </Text>
                            <Text style={styles.styleInfo} numberOfLines={1} ellipsizeMode="tail">
                                <Text>{typeNameFromID(postInfo.vehicleinfo.ID_VehicleType)}</Text>
                                <Text> - </Text>
                                <Text>{brandNameFromID(postInfo.vehicleinfo.ID_VehicleBrand)}</Text>
                            </Text>


                            <Text style={styles.stylePrice}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {formatPrice(postInfo.post.Pricetag) + ' VND'}
                            </Text>

                        </View>
                    </View>
                )
            )
        }
    }

    // const _renderSkeleton = () => (
    //     <SkeletonContent
    //         containerStyle={[styles.styleWrapper, index === 0 ? { marginStart: 20 } : null, { backgroundColor: '#f5f5f5', }, styleWrapper]}
    //         highlightColor="#C0DAF155"
    //         isLoading={isLoading}
    //         layout={
    //             [
    //                 {
    //                     key: 'image', width: 135,
    //                     height: 135, borderRadius: 5,
    //                 },
    //                 {
    //                     key: 'title', width: 130,
    //                     height: 14,
    //                     marginTop: 10,
    //                 },
    //                 {
    //                     key: 'info', width: 130,
    //                     height: 10,
    //                     marginTop: 10,
    //                 },
    //                 {
    //                     key: 'price', width: 130,
    //                     height: 16,
    //                     marginTop: 10,
    //                 },
    //             ]}
    //     >
    //         <Text>Your content</Text>
    //         <Text>Other content</Text>
    //     </SkeletonContent >
    // )

    return (
        <TouchableWithoutFeedback onPress={pressable ? onNavigate : null} key={postID} {...props}>
            {
                isLoading ?
                    // _renderSkeleton()
                    <View />
                    : _renderContent()
            }
            {/* <Text>Hello</Text> */}
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    styleWrapper: {
        backgroundColor: '#EDEDED',
        padding: 12,
        borderRadius: 5,
        marginEnd: 13,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    styleImage: {
        width: 135,
        height: 135,
        resizeMode: 'cover',
        borderRadius: 5,
    },

    textWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginBottom: 3,
    },

    styleTitle: {
        width: 130,
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
    },
    styleInfo: {
        width: 130,
        paddingTop: 3,
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000000',
        fontStyle: 'italic',
    },
    stylePrice: {
        width: 130,
        paddingTop: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#BC2424',
    },
});

export default PostPreview;
