import {FlatList, FlatListProps, ListRenderItem} from 'react-native';
import React from 'react';
import ListItem from '../listItem';

interface PostPreviewListProps extends FlatListProps<number> {
  data: number[];
  onPress: () => void;
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({
  data,
  onPress,
  ...props
}) => {
  const renderItem: ListRenderItem<number> = ({item, index}) => {
    return (
      <ListItem postID={item} index={index} key={index} onPress={onPress} />
    );
  };

  const keyExtractor = (item: number) => {
    return item.toString();
  };
  return (
    <FlatList
      contentContainerStyle={{
        alignSelf: 'flex-start',
      }}
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
      {...props}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default PostPreviewList;
