import React from 'react';
import { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import { GetPersonalPost } from '../../../backendAPI';
import Container from '../../common/container';
import PostPreview from '../../PostPreview/listItem';

const DeactivatedRoute = ({
    params,
}) => {

    useEffect(() => {
        getPersonalPost();
    }, []);

    const getPersonalPost = async () => {
        console.log('Sold Route: ' + JSON.stringify(await GetPersonalPost()));
        setDeactivatedPostList((await GetPersonalPost()).sold);
    }

    const [deactivatedPostList, setDeactivatedPostList] = React.useState({});
    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{ backgroundColor: '#FFFFFF' }}>
            <View style={{ marginLeft: 13, }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                    {Object.keys(deactivatedPostList).map((key, index) => {
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
                                    postID={deactivatedPostList[key].ID}
                                    styleWrapper={{ marginTop: 13, }}
                                    post={{
                                        ID_Image: deactivatedPostList[key].rel_Image[0],
                                        Title: deactivatedPostList[key].Title,
                                        Time_created: deactivatedPostList[key].Time_created,
                                        Pricetag: deactivatedPostList[key].Pricetag,
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

export default DeactivatedRoute;
