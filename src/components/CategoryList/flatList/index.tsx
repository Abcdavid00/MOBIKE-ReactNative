import {
  FlatList,
  FlatListProps,
  ImageSourcePropType,
  ListRenderItem,
  View,
} from 'react-native';
import React from 'react';
import ListItemFilter from '../listItem/ListItemFilter';
import ListItemMarketplace from '../listItem/ListItemMarketplace';

var typeEventClick = '';

export type CategoryItem = {
  ID: string;
  Type: string;
};

interface CategoryListProps extends FlatListProps<CategoryItem> {
  data: CategoryItem[];
  type: 'choose' | 'navigate' | undefined;
  onNavigate?: () => void;
  imageVehicleTypes: ImageSourcePropType[];
}

const CategoryList: React.FC<CategoryListProps> = props => {
  const {
    data,
    type,
    onNavigate = () => {},
    imageVehicleTypes,
    ...restOfProps
  } = props;

  const renderItemFilter: ListRenderItem<CategoryItem> = ({item, index}) => {
    return <ListItemFilter item={item} />;
  };

  const renderItemMarketplace: ListRenderItem<CategoryItem> = ({
    item,
    index,
  }) => {
    return (
      <ListItemMarketplace
        item={item}
        onNavigate={onNavigate}
        image={imageVehicleTypes[index]}
        index={index}
        last={index == data.length - 1}
      />
    );
  };

  const renderItem =
    type == 'choose' ? renderItemFilter : renderItemMarketplace;

  const keyExtractor = (item: CategoryItem, index: number) => {
    return item.ID;
  };
  return (
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <FlatList
      contentContainerStyle={{
        alignSelf: 'flex-start',
      }}
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restOfProps}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={{paddingLeft: '6%'}}
    />
    // </ScrollView>
  );
};

export default CategoryList;
