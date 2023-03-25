import {View, Text, FlatList, ScrollView} from 'react-native';
import React from 'react';
import ListItem from '../listItem';
import colors from '../../../assets/theme/colors';

var typeEventClick = '';

const renderItem = ({item, index}) => {
  return <ListItem item={item} index={index} type={typeEventClick} />;
};

const keyExtractor = item => {
  return item.ID;
};

const CategoryList = ({data, type, ...props}) => {
  typeEventClick = type;
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
      {...props}
    />
    // </ScrollView>
  );
};

export default CategoryList;
