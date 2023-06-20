import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import loadingReducer from '../slice/loadingSlice';
import personalInfo from '../clientDatabase/personalInfo';
import imageType from '../clientDatabase/imageType';
import location from '../clientDatabase/location';
import vehicleModel from '../clientDatabase/vehicleModel';
import vehicleType from '../clientDatabase/vehicleType';
import vehicleCondition from '../clientDatabase/vehicleCondition';
import color from '../clientDatabase/color';
import permission from '../clientDatabase/permission';
import filterReducer from '../slice/filterSlice';
import selectedPostReducer from '../slice/selectedPostSlice';
import likeReducer from '../slice/likeSlice';
import themeReducer from '../slice/themeSlice';
import sortReducer from '../slice/sortSlice';
import roomReducer from '../slice/roomSlice';
import messageReducer from '../slice/messageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    personalInfo: personalInfo,
    locations: location,
    vehicleModels: vehicleModel,
    vehicleTypes: vehicleType,
    vehicleConditions: vehicleCondition,
    colors: color,
    imageTypes: imageType,
    permissions: permission,
    loading: loadingReducer,
    filter: filterReducer,
    selectedPost: selectedPostReducer,
    like: likeReducer,
    theme: themeReducer,
    sort: sortReducer,
    room: roomReducer,
    message: messageReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
