import React from 'react';
import { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import { GetPersonalPost } from '../../../backendAPI';
import Container from '../../common/container';
import PostPreview from '../../PostPreview/listItem';

const SoldRoute = ({
    params,
}) => {

    useEffect(() => {
        getPersonalPost();
    }, []);

    const getPersonalPost = async () => {
        console.log('Sold Route: ' + JSON.stringify(await GetPersonalPost()));
        setSoldPostList((await GetPersonalPost()).sold);
    }

    const [soldPostList, setSoldPostList] = React.useState({});
    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{ backgroundColor: '#FFFFFF' }}>
            <View style={{ marginLeft: 13, }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                    {Object.keys(soldPostList).map((key, index) => {
                        return (
                            // <PostPreview postID={activePostList[key].ID} key={index} />
                            <ContextMenu
                                actions={[{ title: "View Detail", }, { title: "Sold" }, { title: "Deactivated" },]}
                                onPress={(e) => {
                                    if (e.nativeEvent.index == 0) {
                                        console.log('View Detail');
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
                                    postID={soldPostList[key].ID}
                                    styleWrapper={{ marginTop: 13, }}
                                    post={{
                                        ID_Image: soldPostList[key].rel_Image[0],
                                        Title: soldPostList[key].Title,
                                        Time_created: soldPostList[key].Time_created,
                                        Pricetag: soldPostList[key].Pricetag,
                                    }}
                                    isActivePost={false}
                                    pressable={false} />
                            </ContextMenu>
                        )
                    })}

                </View>

            </View>
        </Container>
    )
};

export default SoldRoute;
