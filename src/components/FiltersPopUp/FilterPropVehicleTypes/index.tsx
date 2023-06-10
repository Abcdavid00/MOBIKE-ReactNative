import {UIManager} from 'react-native';
import Animated, {FadeInUp, Layout} from 'react-native-reanimated';
import React, {useState} from 'react';
import CategoryList from '../../CategoryList/flatList';
import FilterPropFrameComponent from '../FilterPropFrame';
import store, {RootState} from '../../../redux/store';
import {
  imageVehicleTypes,
  imageVehicleTypesType,
} from '../../../data/imageVehicleTypes';
import {useSelector} from 'react-redux';
import {
  vehicleType,
  vehicleTypeState,
} from '../../../redux/clientDatabase/vehicleType';

UIManager.setLayoutAnimationEnabledExperimental(true);

const FilterPropVehicleTypes: React.FC = () => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };

  const dataType = useSelector<RootState, vehicleType[]>(
    state => state.vehicleTypes,
  );
  //Prepare data for filter

  return (
    <FilterPropFrameComponent
      type={'Vehicle Types'}
      onToggle={onToggle}
      show={show}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
        <CategoryList
          data={dataType}
          type={'choose'}
          imageVehicleTypes={imageVehicleTypes}
          renderItem={undefined}
        />
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropVehicleTypes;
