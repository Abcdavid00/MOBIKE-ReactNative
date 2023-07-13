import {View, Image} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingText from '../LoadingText';
import {RootState} from '../../redux/store';

const LoadingComponent = () => {
  const isLoading = useSelector<RootState, Boolean>(state => state.loading);
  const dispatch = useDispatch();
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
        <LoadingText text={'On the way'} />
        <Image
          source={require('../../assets/images/loading-wheel.gif')}
          style={{width: 80, height: 80}}
        />
        {/* <Button onPress={() => onChangingLoading()} title="setLoading" /> */}
      </View>
    </View>
  );
};

export default LoadingComponent;
