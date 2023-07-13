import {useSelector} from 'react-redux';
import Store, {RootState} from '../../redux/store';

//Brand
export const brandNameFromID = (ID: number) => {
  const brand = Store.getState().vehicleModels.VehicleBrands.find(
    item => item.ID == ID,
  );
  if (brand) return brand.Name;
  else return '--';
};

//Lineup
export const lineupNameFromID = (ID: number) => {
  const lineup = Store.getState().vehicleModels.VehicleLineUps.find(
    item => item.ID == ID,
  );
  if (lineup) return lineup.Lineup;
  else return '--';
};

//Type
export const typeNameFromID = (ID: number) => {
  const type = Store.getState().vehicleTypes.find(item => item.ID == ID);
  if (type) return type.Type;
  else return '--';
};

//Color
export const colorNameFromID = (ID: number) => {
  const color = Store.getState().colors.find(item => item.ID == ID);
  if (color) return convertFirstCharacterToUppercase(color.Name);
  else return '--';
};

export const colorHexFromID = (ID: number) => {
  const color = Store.getState().colors.find(item => item.ID == ID);
  if (color) return '#' + color.Color_hex;
  else return '#000';
};

export const convertFirstCharacterToUppercase = (stringToConvert: String) => {
  var firstCharacter = stringToConvert.substring(0, 1);
  var restString = stringToConvert.substring(1);
  return firstCharacter.toUpperCase() + restString;
};

//Condition
export const conditionNameFromID = (ID: number) => {
  const condition = Store.getState().vehicleConditions.find(
    item => item.ID == ID,
  );
  if (condition) return condition.Condition;
  else return '--';
};

//Price
export const formatPrice = (price?: number) => {
  if (price == undefined) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

//City
export const cityNameFromID = (ID?: number) => {
  const city = Store.getState().locations.Cities.find(item => item.ID == ID);
  if (city) return city.Name;
  else return '--';
};

//District
export const districtNameFromID = (ID?: number) => {
  const district = Store.getState().locations.Districts.find(
    item => item.ID == ID,
  );
  if (district) return district.Name;
  else return '--';
};

//Ward
export const wardNameFromID = (ID?: number) => {
  const ward = Store.getState().locations.Wards.find(item => item.ID == ID);
  if (ward) return ward.Name;
  else return '--';
};
