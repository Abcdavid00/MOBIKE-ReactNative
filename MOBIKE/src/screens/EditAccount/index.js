import React, {useEffect} from 'react';
import EditAccountComponent from '../../components/Profile/EditAccount';

const EditAccount = ({navigation}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#EDF8FF',
          minHeight: 56,
          maxHeight: 80,
        },
      });
  }, [navigation]);
  return <EditAccountComponent />;
};

export default EditAccount;
