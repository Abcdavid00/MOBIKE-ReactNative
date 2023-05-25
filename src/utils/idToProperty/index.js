import Store from '../../redux/store';

//Brand
export const brandNameFromID = (ID) => {
    const brand = Store.getState().vehicleModels.VehicleBrands.find((item) => item.ID == ID);
    if (brand)
        return brand.Name;
    else return '';
};

//Lineup
export const lineupNameFromID = (ID) => {
    const lineup = Store.getState().vehicleModels.VehicleLineUps.find((item) => item.ID == ID);
    if (lineup)
        return lineup.Lineup;
    else return '';
};

//Type
export const typeNameFromID = (ID) => {
    const type = Store.getState().vehicleTypes.find((item) => item.ID == ID);
    if (type)
        return type.Type;
    else return '';
};

//Color
export const colorNameFromID = (ID) => {
    const color = Store.getState().colors.find((item) => item.ID == ID);
    if (color)
        return convertFirstCharacterToUppercase(color.Name);
    else return '';
};

export const colorHexFromID = (ID) => {
    const color = Store.getState().colors.find((item) => item.ID == ID);
    if (color)
        return '#' + color.Color_hex;
    else return '';
};

export const convertFirstCharacterToUppercase = (stringToConvert) => {
    var firstCharacter = stringToConvert.substring(0, 1);
    var restString = stringToConvert.substring(1);
    return firstCharacter.toUpperCase() + restString;
}


//Condition
export const conditionNameFromID = (ID) => {
    const condition = Store.getState().vehicleConditions.find((item) => item.ID == ID);
    if (condition)
        return condition.Condition;
    else return '';
};

//Price
export const formatPrice = (price) => {
    if (price == undefined) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//City
export const cityNameFromID = (ID) => {
    const city = Store.getState().locations.Cities.find((item) => item.ID == ID);
    if (city)
        return city.Name;
    else return '';
}

//District
export const districtNameFromID = (ID) => {
    const district = Store.getState().locations.Districts.find((item) => item.ID == ID);
    if (district)
        return district.Name;
    else return '';
}

//Ward
export const wardNameFromID = (ID) => {
    const ward = Store.getState().locations.Wards.find((item) => item.ID == ID);
    if (ward)
        return ward.Name;
    else return '';
}
