import React, {useEffect} from 'react';
import SavedPostComponent from '../../components/SavedPost';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/ProfileNavigator';
import {SavedPostStackParamList} from '../../navigations/SavedPostNavigator';

type SavedPostScreenProps = {
  navigation: StackNavigationProp<SavedPostStackParamList, 'SavedPost'>;
};

const SavedPostScreen: React.FC<SavedPostScreenProps> = ({navigation}) => {
  
  return <SavedPostComponent navigation={navigation} />;
};

export default SavedPostScreen;
