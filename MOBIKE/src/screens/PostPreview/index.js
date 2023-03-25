import React from 'react';
import { Text, View } from 'react-native';
import PostPreviewComponent from '../../components/PostPreviewComponent';

const PostPreview = ({
    navigation,
    route,
}) => {
    const { form, onPost } = route.params;
    return (
        <PostPreviewComponent form={form} onPost={onPost} />
    )
};

export default PostPreview;
