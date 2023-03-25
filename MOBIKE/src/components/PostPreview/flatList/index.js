import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import ListItem from '../listItem';

const renderItem = ({ item, index }) => {
  return <ListItem postID={item} index={index} key={index} />;
};

const keyExtractor = (item, index) => {
  return item;
};

const PostPreviewList = ({ data, ...props }) => {
  return (
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <FlatList
      contentContainerStyle={{
        alignSelf: 'flex-start',
      }}
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
      {...props}
    />
    // </ScrollView>
  );
};

export default PostPreviewList;
