import {ImageSourcePropType} from 'react-native';

export type SortOptionType = {
  id: number;
  title: string;
  image: ImageSourcePropType;
};

export const sortOption: SortOptionType[] = [
  {
    id: 1,
    title: 'Relevant',
    image: require('../assets/images/relevant.png'),
  },
  {
    id: 2,
    title: 'Most Recent',
    image: require('../assets/images/most_recent.png'),
  },
  {
    id: 3,
    title: 'Price: low to high',
    image: require('../assets/images/price_increase.png'),
  },
  {
    id: 4,
    title: 'Price: high to low',
    image: require('../assets/images/price_decrease.png'),
  },
];
