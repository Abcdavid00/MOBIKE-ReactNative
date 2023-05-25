import React from 'react';
import { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Octicons from 'react-native-vector-icons/Octicons';
import MobikeImage from '../common/image';


const SeeAllReviewsComponent = ({
    ratingPost,
}) => {

    const [selectedCategory, setSelectedCategory] = useState(0);
    const onSetSelectedCategory = (index) => {
        setSelectedCategory(index);
    }

    // Filter Rating
    const filterRating = (rating) => {
        if (rating == 0)
            return ratingPost;
        return ratingPost.filter((item) => item.Rating_point == rating);
    }

    // Render Category
    const renderCategories = () => {
        let categories = [];
        for (let i = 0; i <= 5; i++) {
            categories.push(
                <TouchableWithoutFeedback key={i} onPress={() => onSetSelectedCategory(i)}>
                    <View
                        style={[{
                            height: 50, width: i != 0 ? '10%' : '32%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: selectedCategory == i ? '#C0DAF133' : '#F6F6F6',
                        }, selectedCategory == i && { borderWidth: 1, borderColor: colors.secondary }]}>

                        {/* Title */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#000', marginBottom: 3 }}>{i != 0 ? i : 'Total'}</Text>
                            {i != 0 && <Octicons name='star-fill' size={12} color='#FCC72E' style={{ marginLeft: 3 }} />}
                        </View>

                        {/* Count */}
                        {i != 0 ?
                            (
                                <Text style={{ color: '#000', fontSize: 12, fontWeight: '300', fontStyle: 'italic' }}>{filterRating(i).length}</Text>
                            ) :
                            (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                        <Octicons name="star-fill" size={12} color={'#FCC72E'} />
                                        <Text style={{ color: '#000', fontSize: 12, marginLeft: 5, fontWeight: '500' }}>{starAverage()}</Text>
                                    </View>
                                    <Text style={{ color: '#000', fontSize: 10, fontWeight: '300', fontStyle: 'italic' }}>/ {ratingPost.length} Reviews</Text>
                                </View>
                            )}

                    </View >
                </TouchableWithoutFeedback>
            )
        }
        return categories;
    }

    // Calculate Average
    const starAverage = () => {
        let total = 0;
        ratingPost.forEach((item) => {
            total += item.Rating_point;
        })
        return (total / ratingPost.length).toFixed(1);
    }

    // Render Rating Star
    const renderStarRating = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<Octicons key={i} name='star-fill' size={10} color='#FCC72E' style={{ marginLeft: i != 1 ? 3 : 0, }} />)
            }
        }
        return stars;
    }

    // Render Rating List
    const renderRatingList = () => {
        return (
            <View>
                {filterRating(selectedCategory).map((item, index) =>
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
                ))
                }
            </View>
        )
    }

    return (
        <View style={{ height: '100%', backgroundColor: '#FFFFFF' }}>

            {/* Category */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 15, marginBottom: 15 }}>
                {renderCategories()}
            </View>

            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{
                    backgroundColor: '#FFFFFF'
                }}
            >
                {renderRatingList()}
            </Container>
        </View>
    )
};

export default SeeAllReviewsComponent;
