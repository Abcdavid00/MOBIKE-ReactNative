import React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { GetAllPosts, PostFilter } from '../../backendAPI';
import store from '../../redux/store';
import Container from '../common/container';
import PostPreview from '../PostPreview/listItem';
const ProductListComponent = ({

}) => {

    useEffect(() => {
        getFilterPostList();
    }, [])
    const filter = store.getState().filter;
    const filterPost = PostFilter(
        filter.title,
        undefined,
        undefined,
        true,
        filter.priceRange.min * 1000000,
        undefined,
        filter.brand,
        filter.lineup,
        filter.vehicleTypes[filter.vehicleTypes.length - 1],
        filter.color,
        filter.manufacturerYear,
    );
    console.log('filter: ' + JSON.stringify(filter));
    console.log(JSON.stringify(filterPost));

    const getFilterPostList = async () => {
        const postListTmp = await GetAllPosts(filterPost);
        console.log('postList: ' + JSON.stringify(postListTmp));
        setPostList(postListTmp);
        setIsLoading(false);
    };

    const [postList, setPostList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const RenderSkeleton = (index) => {
        return (
            <SkeletonContent
                containerStyle={[styles.styleWrapper, { backgroundColor: '#f5f5f5', }]}
                highlightColor="#C0DAF155"
                isLoading={isLoading}
                layout={
                    [
                        {
                            key: 'image', width: 135,
                            height: 135, borderRadius: 5,
                        },
                        {
                            key: 'title', width: 130,
                            height: 14,
                            marginTop: 10,
                        },
                        {
                            key: 'info', width: 130,
                            height: 10,
                            marginTop: 10,
                        },
                        {
                            key: 'price', width: 130,
                            height: 16,
                            marginTop: 10,
                        },
                    ]}
            >
                <Text>Your content</Text>
                <Text>Other content</Text>
            </SkeletonContent >
        )
    }
    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{
                backgroundColor: '#FFFFFF'
            }}
        >
            <View style={{ marginLeft: 13, }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        isLoading ? loadingArray.map((item, index) => (<RenderSkeleton key={index} index={index} />))
                            :
                            postList.map((item, index) => {
                                return (
                                    <PostPreview
                                        postID={item.ID}
                                        key={index}
                                        styleWrapper={{ marginTop: 13, }}
                                        isActivePost={true}
                                        pressable={true} />
                                )
                            })

                    }

                </View>
            </View>
        </Container>
    )
};

export default ProductListComponent;

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
});