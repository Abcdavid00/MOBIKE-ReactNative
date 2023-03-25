import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import PostDetailComponent from '../../components/PostDetail';
import store from '../../redux/store';

const PostDetail = ({
    navigation,
}) => {
    useEffect(() => {
        navigation.getParent()
            .getParent()?.setOptions({
                tabBarStyle: {
                    display: 'none',
                },
            });
        return () =>
            navigation.getParent()
                .getParent()?.setOptions({
                    tabBarStyle: { backgroundColor: '#EDF8FF', minHeight: 56, maxHeight: 80 },
                });
    }, [navigation]);

    const selectedPost = store.getState().selectedPost;

    return (
        <PostDetailComponent postID={selectedPost.ID} isActivePost={selectedPost.isActivePost} isAdmin={selectedPost.isAdmin} />
    );
}

export default PostDetail;
