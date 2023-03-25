import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVersion, getPermissions, getCities, getDistricts, getWards, getImageTypes, getVehicleBrands, getVehicleLineups, getVehicleConditions, getVehicleTypes, getColors } from '../../backendAPI';
import Store from '../../redux/store';
import { setCities, setDistricts, setWards, setTree } from '../../redux/clientDatabase/location';
import { setImageTypes } from '../../redux/clientDatabase/imageType';
import { setPermissions } from '../../redux/clientDatabase/permission';
import { setVehicleBrands, setVehicleLineUps } from '../../redux/clientDatabase/vehicleModel';
import { setVehicleTypes } from '../../redux/clientDatabase/vehicleType';
import { setVehicleConditions } from '../../redux/clientDatabase/vehicleCondition';
import { setColors } from '../../redux/clientDatabase/color';
import { createSelectorCreator } from 'reselect';

const LOCATIONS = 'Locations';
const PERMISSIONS = 'Permissions';
const IMAGETYPES = 'ImageTypes';
const VEHICLEBRANDS = 'VehicleBrands';
const VEHICLELINEUPS = 'VehicleLineups';
const VEHICLETYPES = 'VehicleTypes';
const VEHICLECONDITIONS = 'VehicleConditions';
const COLORS = 'Colors';


export const init = async () => {
    try {
        let isCientDatabaseInitialized = await AsyncStorage.getItem('ClientDatabaseInitted');
        if (!isCientDatabaseInitialized) {
            console.log('Initializing client database');
            AsyncStorage.setItem('ClientDatabaseInitted', '1');
            await AsyncStorage.setItem('ClientDatabaseVersion', JSON.stringify({
                Locations: 0,
                Permissions: 0,
                ImageTypes: 0,
                VehicleBrands: 0,
                VehicleLineUps: 0,
                VehicleTypes: 0,
                VehicleConditions: 0,
                Colors: 0
            }));
        }

        await updateAndLoadClientDatabase();
        
        console.log('Client database initialized');
    } catch (error) {
        console.log("Init client database error: " + error);
    }
}

const updateAndLoadClientDatabase = async () => {
    try {
        await Promise.all([
            updateLocations(),
            updatePermissions(),
            updateImageTypes(),
            updateVehicleBrands(),
            updateVehicleLineups(),
            updateVehicleTypes(),
            updateVehicleConditions(),
            updateColors()
        ]).then((res) => {
            // console.log("Location from server: " + JSON.stringify(res[0]))
            Store.dispatch(setCities(res[0].Cities));
            console.log("Client database: " + Store.getState().locations.Cities.length + " cities loaded" )
            Store.dispatch(setDistricts(res[0].Districts));
            console.log("Client database: " + Store.getState().locations.Districts.length + " districts loaded")
            Store.dispatch(setWards(res[0].Wards));
            console.log("Client database: " + Store.getState().locations.Wards.length + " wards loaded")
            Store.dispatch(setTree(res[0].Tree));
            Store.dispatch(setPermissions(res[1]));
            console.log("Client database: " + Store.getState().permissions.length + " permissions loaded")
            Store.dispatch(setImageTypes(res[2]));
            console.log("Client database: " + Store.getState().imageTypes.length + " image types loaded")
            Store.dispatch(setVehicleBrands(res[3]));
            console.log("Client database: " + Store.getState().vehicleModels.VehicleBrands.length + " vehicle brands loaded")
            Store.dispatch(setVehicleLineUps(res[4]));
            console.log("Client database: " + Store.getState().vehicleModels.VehicleLineUps.length + " vehicle lineups loaded")
            Store.dispatch(setVehicleTypes(res[5]));
            console.log("Client database: " + Store.getState().vehicleTypes.length + " vehicle types loaded")
            Store.dispatch(setVehicleConditions(res[6]));
            console.log("Client database: " + Store.getState().vehicleConditions.length + " vehicle conditions loaded")
            Store.dispatch(setColors(res[7]));
            console.log("Client database: " + Store.getState().colors.length + " colors loaded")
        });
        // console.log("Location loaded: " + JSON.stringify(Store.getState().locations));
    } catch (error) {
        console.log("Update and load client database error: " + error);
    }
}

const updateLocations = async () => {
    try {
        const onlineLocationsVersion = (await getVersion(LOCATIONS)).Version;
        // console.log('Online locations version: ' + onlineLocationsVersion);
        const localLocationsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).Locations;
        // console.log('Local locations version: ' + localLocationsVersion);
        console.log("Client database: " + localLocationsVersion + " locations version")
        if (localLocationsVersion >= onlineLocationsVersion) {
            console.log('Locations are up to date');
            return JSON.parse(await AsyncStorage.getItem(LOCATIONS));
        }

        console.log("Updating locations");

        let wards = undefined;
        let districts = undefined;
        let cities = undefined;

        await Promise.all([getWards(), getDistricts(), getCities()]).then((res) => {
            [wards, districts, cities] = res;
        })

        //Create address tree
        console.log("Creating Address Tree");
        tree = [];
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            let cityDistricts = districts.filter(district => district.ID_City == city.ID);
            let cityDistrictsTree = [];
            for (let j = 0; j < cityDistricts.length; j++) {
                let district = cityDistricts[j];
                let districtWards = wards.filter(ward => ward.ID_District == district.ID);
                cityDistrictsTree.push({
                    ...district,
                    Wards: districtWards
                });
            }
            tree.push({
                ...city,
                Districts: cityDistrictsTree
            });
        }
        console.log("Address Tree created");

        const Locations = {
            Cities: cities,
            Districts: districts,
            Wards: wards,
            Tree: tree
        }

        await AsyncStorage.setItem(LOCATIONS, JSON.stringify(Locations));

        const version = {
            Locations: onlineLocationsVersion,
        }
        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Locations updated, current version: " + onlineLocationsVersion);

        return Locations;

    } catch (error) {
        console.log("Update locations error: " + error);
    }
}

const updateVehicleBrands = async () => {
    try {
        const onlineVehicleBrandsVersion = (await getVersion(VEHICLEBRANDS)).Version;
        // console.log('Online vehicle brands version: ' + onlineVehicleBrandsVersion);
        const localVehicleBrandsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).VehicleBrands;
        // console.log('Local vehicle brands version: ' + localVehicleBrandsVersion);
        console.log("Client database: " + localVehicleBrandsVersion + " vehicle brands version")
        if (localVehicleBrandsVersion >= onlineVehicleBrandsVersion) {
            console.log('Vehicle brands are up to date');
            return JSON.parse(await AsyncStorage.getItem(VEHICLEBRANDS));
        }

        console.log("Updating vehicle brands");

        const VehicleBrands = await getVehicleBrands();

        await AsyncStorage.setItem(VEHICLEBRANDS, JSON.stringify(VehicleBrands));

        const version = {
            VehicleBrands: onlineVehicleBrandsVersion,
        }

        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Vehicle brands updated, current version: " + onlineVehicleBrandsVersion);

        return VehicleBrands;

    } catch (error) {
        console.log("Update vehicle brands error: " + error);
    }
}

const updateVehicleLineups = async () => {
    try {
        const onlineVehicleLineupsVersion = (await getVersion(VEHICLELINEUPS)).Version;
        // console.log('Online vehicle lineups version: ' + onlineVehicleLineupsVersion);
        const localVehicleLineupsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).VehicleLineups;
        // console.log('Local vehicle lineups version: ' + localVehicleLineupsVersion);
        console.log("Client database: " + localVehicleLineupsVersion + " vehicle lineups version")
        if (localVehicleLineupsVersion >= onlineVehicleLineupsVersion) {
            console.log('Vehicle lineups are up to date');
            return JSON.parse(await AsyncStorage.getItem(VEHICLELINEUPS));
        }

        console.log("Updating vehicle lineups");

        const VehicleLineups = await getVehicleLineups();

        await AsyncStorage.setItem(VEHICLELINEUPS, JSON.stringify(VehicleLineups));

        const version = {
            VehicleLineups: onlineVehicleLineupsVersion,
        }

        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Vehicle lineups updated, current version: " + onlineVehicleLineupsVersion);

        return VehicleLineups;

    } catch (error) {
        console.log("Update vehicle lineups error: " + error);
    }
}

const updateVehicleTypes = async () => {
    try {
        const onlineVehicleTypesVersion = (await getVersion(VEHICLETYPES)).Version;
        // console.log('Online vehicle types version: ' + onlineVehicleTypesVersion);
        const localVehicleTypesVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).VehicleTypes;
        // console.log('Local vehicle types version: ' + localVehicleTypesVersion);
        console.log("Client database: " + localVehicleTypesVersion + " vehicle types version")
        if (localVehicleTypesVersion >= onlineVehicleTypesVersion) {
            console.log('Vehicle types are up to date');
            return JSON.parse(await AsyncStorage.getItem(VEHICLETYPES));
        }

        console.log("Updating vehicle types");

        const VehicleTypes = await getVehicleTypes();

        await AsyncStorage.setItem(VEHICLETYPES, JSON.stringify(VehicleTypes));

        const version = {
            VehicleTypes: onlineVehicleTypesVersion,
        }

        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Vehicle types updated, current version: " + onlineVehicleTypesVersion);

        return VehicleTypes;
    } catch (error) {
        console.log("Update vehicle types error: " + error);
    }
}

const updateVehicleConditions = async () => {
    try {
        const onlineVehicleConditionsVersion = (await getVersion(VEHICLECONDITIONS)).Version;
        // console.log('Online vehicle conditions version: ' + onlineVehicleConditionsVersion);
        const localVehicleConditionsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).VehicleConditions;
        // console.log('Local vehicle conditions version: ' + localVehicleConditionsVersion);
        console.log("Client database: " + localVehicleConditionsVersion + " vehicle conditions version")
        if (localVehicleConditionsVersion >= onlineVehicleConditionsVersion) {
            console.log('Vehicle conditions are up to date');
            return JSON.parse(await AsyncStorage.getItem(VEHICLECONDITIONS));
        }

        console.log("Updating vehicle conditions");

        const VehicleConditions = await getVehicleConditions();

        await AsyncStorage.setItem(VEHICLECONDITIONS, JSON.stringify(VehicleConditions));

        const version = {
            VehicleConditions: onlineVehicleConditionsVersion,
        }

        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Vehicle conditions updated, current version: " + onlineVehicleConditionsVersion);

        return VehicleConditions;
    } catch (error) {
        console.log("Update vehicle conditions error: " + error);
    }
}

const updateColors = async () => {
    try {
        const onlineColorsVersion = (await getVersion(COLORS)).Version;
        // console.log('Online colors version: ' + onlineColorsVersion);
        const localColorsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).Colors;
        // console.log('Local colors version: ' + localColorsVersion);
        console.log("Client database: " + localColorsVersion + " colors version")
        if (localColorsVersion >= onlineColorsVersion) {
            console.log('Colors are up to date');
            return JSON.parse(await AsyncStorage.getItem(COLORS));
        }

        console.log("Updating colors");

        const Colors = await getColors();

        await AsyncStorage.setItem(COLORS, JSON.stringify(Colors));

        const version = {
            Colors: onlineColorsVersion,
        }

        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Colors updated, current version: " + onlineColorsVersion);

        return Colors;
    } catch {
        console.log("Update colors error: " + error);
    }
}

const updatePermissions = async () => {
    try {
        const onlinePermissionsVersion = (await getVersion(PERMISSIONS)).Version;
        // console.log('Online permissions version: ' + onlinePermissionsVersion);
        const localPermissionsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).Permissions;
        // console.log('Local permissions version: ' + localPermissionsVersion);
        console.log("Client database: " + localPermissionsVersion + " permissions version")
        if (localPermissionsVersion >= onlinePermissionsVersion) {
            console.log('Permissions are up to date');
            return JSON.parse(await AsyncStorage.getItem(PERMISSIONS));
        }

        console.log("Updating permissions");

        const Permissions = await getPermissions();

        await AsyncStorage.setItem(PERMISSIONS, JSON.stringify(Permissions));

        const version = {
            Permissions: onlinePermissionsVersion,
        }
        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Permissions updated, current version: " + onlinePermissionsVersion);

        return Permissions;

    } catch (error) {
        console.log("Update permissions error: " + error);
    }
}

const updateImageTypes = async () => {
    try {
        const onlineImageTypesVersion = (await getVersion(IMAGETYPES)).Version;
        // console.log('Online image types version: ' + onlineImageTypesVersion);
        const localImageTypesVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).ImageTypes;
        // console.log('Local image types version: ' + localImageTypesVersion);
        console.log("Client database: " + localImageTypesVersion + " image types version")
        if (localImageTypesVersion >= onlineImageTypesVersion) {
            console.log('Image types are up to date');
            return JSON.parse(await AsyncStorage.getItem(IMAGETYPES));
        }

        console.log("Updating image types");

        const ImageTypes = await getImageTypes();

        await AsyncStorage.setItem(IMAGETYPES, JSON.stringify(ImageTypes));

        const version = {
            ImageTypes: onlineImageTypesVersion,
        }
        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Image types updated, current version: " + onlineImageTypesVersion);

        return ImageTypes;

    } catch (error) {
        console.log("Update image types error: " + error);
    }
}

export const print = async () => {
    try {
        let isClientDatabaseInitialized = await AsyncStorage.getItem('ClientDatabaseInitted');
        if (isClientDatabaseInitialized) {
            let version = await AsyncStorage.getItem('ClientDatabaseVersion');
            console.log("ClientDatabaseVersion: " + version);
            let locations = JSON.parse(await AsyncStorage.getItem(LOCATIONS));
            console.log("Locations: ");
            console.log("\tCities: " + locations.Cities.length);
            console.log("\tDistricts: " + locations.Districts.length);
            console.log("\tWards: " + locations.Wards.length);
            let permissions = await AsyncStorage.getItem(PERMISSIONS);
            console.log("Permissions: " + permissions);
            let imageTypes = await AsyncStorage.getItem(IMAGETYPES);
            console.log("ImageTypes: " + imageTypes);
        } else {
            console.log('ClientDatabase has not initialized');
        }
    } catch (e) {
        console.log("Print client database error: " + e);
    }
}

export default {init, print}

