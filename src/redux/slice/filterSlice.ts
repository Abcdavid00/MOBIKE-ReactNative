import {createSlice} from '@reduxjs/toolkit';

export type FilterState = {
  name: string;
  vehicleType: number;
  priceRange: {
    min: number;
    max: number;
    minPosition: number;
    maxPosition: number;
  };
  minMaxText: {
    min: number;
    max: number;
  };
  manufacturer: Array<{
    id: number;
    value: string;
  }>;
  asc: Boolean;
  title?: string;
  brand?: number;
  lineup?: number;
  type?: number;
  color?: number;
  manufacturerYear?: number;
};

const initialState: FilterState = {
  name: '',
  vehicleType: 0,
  priceRange: {
    min: 0,
    max: 0,
    minPosition: 0,
    maxPosition: 0,
  },
  minMaxText: {
    min: 0,
    max: 0,
  },
  manufacturer: [],

  asc: true,
  title: undefined,
  brand: undefined,
  lineup: undefined,
  type: undefined,
  color: undefined,
  manufacturerYear: undefined,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setVehicleType: (state, action) => {
      // state.vehicleTypes.push(action.payload);
      // state.vehicleTypes = [action.payload];
      // console.log('State update :' + state.vehicleTypes);
      state.vehicleType = action.payload;
    },
    // setVehicleTypesRemove: (state, action) => {
    //   let index = state.vehicleTypes.indexOf(action.payload);
    //   state.vehicleTypes.splice(index, 1);
    // },
    // setVehicleTypeRemoveAll: state => {
    //   state.vehicleTypes = [];
    //   return state;
    // },
    setPriceRange: (state, action) => {
      state.priceRange.min = action.payload.min;
      state.priceRange.max = action.payload.max;
      state.priceRange.minPosition = action.payload.minPosition;
      state.priceRange.maxPosition = action.payload.maxPosition;
    },
    setMinMaxText: (state, action) => {
      state.minMaxText.min = action.payload.min;
      state.minMaxText.max = action.payload.max;
    },
    setManufacturer: (state, action) => {
      let flag = false;
      let temp = action.payload.manufacturer;
      for (let i = 0; i <= state.manufacturer.length - 1; i++) {
        if (state.manufacturer[i].id === temp.id) {
          if (temp.value.length === 0) state.manufacturer.splice(i, 1);
          else {
            state.manufacturer[i].value = temp.value;
            flag = true;
          }
          break;
        }
      }
      if (!flag) state.manufacturer.push(temp);
    },

    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setLineup: (state, action) => {
      state.lineup = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setManufacturerYear: (state, action) => {
      state.manufacturerYear = action.payload;
    },

    setInitial: () => {
      return initialState;
    },
  },
});

export const {
  setTitle,
  setVehicleType,
  // setVehicleTypesRemove,
  // setVehicleTypeRemoveAll,
  setPriceRange,
  setMinMaxText,
  setManufacturer,
  setInitial,
  setBrand,
  setLineup,
  setType,
  setColor,
  setManufacturerYear,
} = filterSlice.actions;
export default filterSlice.reducer;
