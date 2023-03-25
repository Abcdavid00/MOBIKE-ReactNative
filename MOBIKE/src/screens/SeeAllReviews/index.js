import React from 'react';
import { Text, View } from 'react-native';
import SeeAllReviewsComponent from '../../components/SeeAllReviews';

const SeeAllReviews = ({
    route,
}) => {
    const { ratingPost } = route.params;
    return (
        <SeeAllReviewsComponent ratingPost={ratingPost} />
    )
};

export default SeeAllReviews;
