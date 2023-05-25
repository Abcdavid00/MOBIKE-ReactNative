import React, {useEffect} from 'react';
import FiltersPopUpComponent from '../../components/FiltersPopUp';

const FiltersPopUp = ({navigation}) => {
  useEffect(() => {
    navigation
      .getParent()
      .getParent()
      ?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    return () =>
      navigation
        .getParent()
        .getParent()
        ?.setOptions({
          tabBarStyle: {
            backgroundColor: '#EDF8FF',
            minHeight: 56,
            maxHeight: 80,
          },
        });
  }, [navigation]);
  // navigation.setOptions({
  //   header: () => <Header title={'Filters'} textRight={'Reset'} />,
  // });

  return <FiltersPopUpComponent></FiltersPopUpComponent>;
};

export default FiltersPopUp;