import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type cityType = {
  ID: number;
  Name: string;
};

type districtType = {
  ID: number;
  ID_City: number;
  Name: string;
};

type wardType = {
  ID: number;
  ID_District: number;
  Name: string;
};

export type addressTree = Array<{
  ID: number;
  Name: string;
  Districts: Array<{
    ID: number;
    ID_City: number;
    name: string;
    Wards: Array<wardType>;
  }>;
}>;

export type locationState = {
  Cities: Array<cityType>;
  Districts: Array<districtType>;
  Wards: Array<wardType>;
  Tree: addressTree;
  CityNameFromID?: (ID: number) => string;
  DistrictNameFromID?: (ID: number) => string;
  WardNameFromID?: (ID: number) => string;
};

const initialState: locationState = {
  Cities: [],
  Districts: [],
  Wards: [],
  Tree: [],
  CityNameFromID: undefined,
  DistrictNameFromID: undefined,
  WardNameFromID: undefined,
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<cityType[]>) => {
      state.Cities = action.payload;
      // console.log("Set Cities finished: " + JSON.stringify(state.Cities))
      state.CityNameFromID = ID => {
        let result = action.payload.find(city => city.ID === ID);
        if (result === undefined) {
          return 'cne';
        }
        return result.Name;
      };
    },
    setDistricts: (state, action: PayloadAction<districtType[]>) => {
      state.Districts = action.payload;
      // console.log("Set Distriscts finished: " + JSON.stringify(state.Districts))
      state.DistrictNameFromID = ID => {
        let result = action.payload.find(district => district.ID === ID);
        if (result === undefined) {
          return 'dne';
        }
        return result.Name;
      };
    },
    setWards: (state, action: PayloadAction<wardType[]>) => {
      state.Wards = action.payload;
      //   console.log('Set Wards finished: ' + JSON.stringify(state.Wards));
      state.WardNameFromID = ID => {
        let result = action.payload.find(ward => ward.ID === ID);
        if (result === undefined) {
          return 'wne';
        }
        return result.Name;
      };
    },
    setTree: (state, action) => {
      state.Tree = action.payload;
      // console.log('Set tree finised: ' + JSON.stringify(state.Tree));
    },
  },
});

export default locationSlice.reducer;

export const {setCities, setDistricts, setWards, setTree} =
  locationSlice.actions;
