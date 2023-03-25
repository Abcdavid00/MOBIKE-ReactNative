import {View, Text, Image, Button} from 'react-native';
import React from 'react';
import {setLoading} from '../../redux/slice/loadingSlice';
import {useDispatch, useSelector} from 'react-redux';
import LoadingText from '../LoadingText';

const LoadingComponent = () => {
  const isLoading = useSelector(state => state.loading.loading);
  const dispatch = useDispatch();
  const onChangingLoading = () => {
    dispatch(setLoading(!isLoading));
  };
  return (
    <View>
      <Image
        resizeMode="stretch"
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/loading.png')}
      />

      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: 70,
          alignItems: 'center',
        }}>
        <LoadingText/>
        <Image source={require('../../assets/images/loading-wheel.gif')} />
        {/* <Button onPress={() => onChangingLoading()} title="setLoading" /> */}
      </View>
    </View>
  );
};

export default LoadingComponent;
