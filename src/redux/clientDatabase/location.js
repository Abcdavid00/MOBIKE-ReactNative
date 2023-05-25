import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Cities: [],
    Districts: [],
    Wards: [],
    Tree: [],
    CityNameFromID: undefined,
    DistrictNameFromID: undefined,
    WardNameFromID: undefined,
}

export const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.Cities = action.payload;
            // console.log("Set Cities finished: " + JSON.stringify(state.Cities))
            state.CityNameFromID = (ID) => {
                let result = action.payload.find(city => city.ID === ID);
                if (result === undefined) {
                    return "cne";
                }
                return result.Name;
            }
        },
        setDistricts: (state, action) => {
            state.Districts = action.payload;
            // console.log("Set Distriscts finished: " + JSON.stringify(state.Districts))
            state.DistrictNameFromID = (ID) => {
                let result = action.payload.find(district => district.ID === ID);
                if (result === undefined) {
                    return "dne";
                }
                return result.Name;
            }
        },
        setWards: (state, action) => {
            state.Wards = action.payload;
            // console.log("Set Wards finished: " + JSON.stringify(state.Wards))
            state.WardNameFromID = (ID) => {
                let result = action.payload.find(ward => ward.ID === ID);
                if (result === undefined) {
                    return "wne";
                }
                return result.Name;
            }
        },
        setTree: (state, action) => {
            state.Tree = action.payload;
            // console.log("Set tree finised: " + JSON.stringify(state.Tree))
        }
    }
})

export default locationSlice.reducer;

export const {setCities, setDistricts, setWards, setTree} = locationSlice.actions;
