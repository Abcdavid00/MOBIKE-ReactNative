import { createSlice } from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';
import { validateDate, validateVnId, validateVnPhone } from '../../utils/Validator';

const initialState = {
    Birthdate: undefined,
    Gender: undefined,
    Identification_number: undefined,
    Name: undefined,
    Phone_number: undefined,
    ID_Image_Profile: undefined,
    ID_Image_Identity_Front : undefined,
    ID_Image_Identity_Back : undefined,
    Addresses: {}
}

export const personalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState,
    reducers: {
        setBirthdate: (state, action) => {
            if (validateDate(action.payload)) {
                state.Birthdate = action.payload;
            }
        },
        setGender: (state, action) => {
            state.Gender = action.payload;
        },
        setIdentification_number: (state, action) => {
            if (validateVnId(action.payload)) {
                state.Identification_number = action.payload;
            }
        },
        setName: (state, action) => {
            state.Name = action.payload;
        },
        setPhone_number: (state, action) => {
            if (validateVnPhone(action.payload)) {
                state.Phone_number = action.payload;
            }
        },
        setAddress: (state, action) => {
            state.Address = action.payload;
        },
        setAll: (state, action) => {
            try {
                if (action.payload) {
                    state.Birthdate = action.payload.Birthdate || undefined;
                    state.Gender = action.payload.Gender || undefined;
                    state.Identification_number = action.payload.Identification_number || undefined;
                    state.Name = action.payload.Name || undefined;
                    state.Phone_number = action.payload.Phone_number || undefined;
                    state.ID_Image_Profile = action.payload.ID_Image_Profile || undefined;
                    state.ID_Image_Identity_Front = action.payload.ID_Image_Identity_Front || undefined;
                    state.ID_Image_Identity_Back = action.payload.ID_Image_Identity_Back || undefined;
                    state.Addresses = action.payload.Addresses || undefined;
                    console.log("Set all personal info successfully: " + JSON.stringify(state))
                } else {
                    console.log("Set all personal info failed: " + JSON.stringify(state))
                }
            } catch (error) {
                console.log("Set personal info error: " + error);
            }
        }
    }
})

export default personalInfoSlice.reducer;

export const { setBirthdate, setGender, setIdentification_number0, setName, setPhone_number, setAddress, setAll } = personalInfoSlice.actions;