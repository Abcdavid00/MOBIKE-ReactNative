import {createSlice} from '@reduxjs/toolkit';
import {BooleanLiteral} from 'typescript';

export type priceRangeType = {
  min: number;
  max: number;
  minPosition: number;
  maxPosition: number;
};

export type minMaxTextType = {
  min: number;
  max: number;
};

export type manufacturerType = Array<{
  id: number;
  value: string;
}>;

export type FilterState = {
  name: string;
  vehicleType?: number;
  priceRange: priceRangeType;
  minMaxText: minMaxTextType;
  manufacturer: manufacturerType;
  asc: Boolean;
  title?: string;
  brand?: number;
  lineup?: number;
  // type?: number;
  color?: number;
  manufacturerYear?: number;

  isFiltered: Boolean;
};

// const checkIsNoFilter = (state: FilterState) => {
//   if (
//     state.vehicleType == undefined &&
//     JSON.stringify(state.priceRange).toString() ==
//       JSON.stringify(initialState.priceRange).toString() &&
//     state.brand == undefined &&
//     state.lineup == undefined &&
//     state.manufacturerYear == undefined &&
//     state.color == undefined
//   )
//     return true;
//   else return false;
// };

export const initialState: FilterState = {
  name: '',
  vehicleType: undefined,
  priceRange: {
    min: 0,
    max: 500,
    minPosition: 0,
    maxPosition: 300,
  },
  minMaxText: {
    min: 0,
    max: 500,
  },
  manufacturer: [],

  asc: true,
  title: undefined,
  brand: undefined,
  lineup: undefined,
  // type: undefined,
  color: undefined,
  manufacturerYear: undefined,

  isFiltered: false,
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
      state.isFiltered = true;
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
      // if (checkIsNoFilter(state)) state.isFiltered = false;
      // else state.isFiltered = true;
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
      state.isFiltered = true;
    },
    setLineup: (state, action) => {
      state.lineup = action.payload;
      state.isFiltered = true;
    },
    removeBrand_Lineup: state => {
      state.brand = undefined;
      state.lineup = undefined;
      // if (checkIsNoFilter(state)) state.isFiltered = false;
    },
    setType: (state, action) => {
      state.vehicleType = action.payload;
      // if (checkIsNoFilter(state)) state.isFiltered = false;
      // else state.isFiltered = true;
    },
    setColor: (state, action) => {
      state.color = action.payload;
      // if (checkIsNoFilter(state)) state.isFiltered = false;
      // else state.isFiltered = true;
    },
    setManufacturerYear: (state, action) => {
      state.manufacturerYear = action.payload;
      // if (checkIsNoFilter(state)) state.isFiltered = false;
      // else state.isFiltered = true;
    },
    setIsFiltered: (state, action) => {
      state.isFiltered = action.payload;
    },

    setInitial: state => {
      return {
        name: '',
        vehicleType: 0,
        priceRange: {
          min: 0,
          max: 500,
          minPosition: 0,
          maxPosition: 300,
        },
        minMaxText: {
          min: 0,
          max: 500,
        },
        manufacturer: [],

        asc: state.asc,
        // title: state.title,
        title: undefined,
        brand: undefined,
        lineup: undefined,
        // type: undefined,
        color: undefined,
        manufacturerYear: undefined,

        isFiltered: false,
      };
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
  removeBrand_Lineup,
  setType,
  setColor,
  setManufacturerYear,
  setIsFiltered,
} = filterSlice.actions;
export default filterSlice.reducer;
