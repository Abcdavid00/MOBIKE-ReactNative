import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import { FAB } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import colors from '../../../assets/theme/colors';
import { GetPersonalPost } from '../../../backendAPI';
import { ADD_POST, POST_DETAIL, POST_DETAIL_NAVIGATOR } from '../../../constants/routeNames';
import { selectPost } from '../../../redux/slice/selectedPostSlice';
import Container from '../../common/container';
import PostPreview from '../../PostPreview/listItem';

const ActiveRoute = ({
    params,
}) => {

    useEffect(() => {
        getPersonalPost();
    }, []);

    const getPersonalPost = async () => {
        console.log('Active Route: ' + JSON.stringify(await GetPersonalPost()));
        setActivePostList((await GetPersonalPost()).active);
    }

    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const onViewDetail = (postID) => {
        navigate(POST_DETAIL_NAVIGATOR, { screen: POST_DETAIL });
        dispatch(selectPost({ ID: postID, isActivePost: false }));
    }

    const [activePostList, setActivePostList] = React.useState({});
    return (
        <View style={{ height: '100%' }}>
            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{ backgroundColor: '#FFFFFF' }}>
                <View style={{ marginLeft: 13, }}>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                        {Object.keys(activePostList).map((key, index) => {
                            return (
                                <ContextMenu
                                    actions={[{ title: "View Detail", }, { title: "Sold" }, { title: "Deactivated" },]}
                                    onPress={(e) => {
                                        if (e.nativeEvent.index == 0) {
                                            onViewDetail(activePostList[key].ID);
                                        } else if (e.nativeEvent.index == 1) {
                                            console.log('Sold');
                                        } else if (e.nativeEvent.index == 2) {
                                            console.log('Deactivated');
                                        }
                                    }}
                                    dropdownMenuMode={true}
                                    key={index}
                                >
                                    <PostPreview
                                        postID={activePostList[key].ID}
                                        styleWrapper={{ marginTop: 13, }}
                                        post={{
                                            ID_Image: activePostList[key].rel_Image[0],
                                            Title: activePostList[key].Title,
                                            Time_created: activePostList[key].Time_created,
                                            Pricetag: activePostList[key].Pricetag,
                                        }}
                                        isActivePost={false}
                                        pressable={false} />
                                </ContextMenu>
                            )
                        })}

                    </View>

                </View>
            </Container>

            <FAB
                icon="plus"
                style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: colors.secondary }}
                onPress={() => navigate(ADD_POST)}
            />
        </View>
    )
};

export default ActiveRoute;
