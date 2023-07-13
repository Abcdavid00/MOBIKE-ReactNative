import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../../assets/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInUp, Layout} from 'react-native-reanimated';
import TextInputOutline from '../../../common/textInputOutline-Kohana';
import {Button, FAB} from 'react-native-paper';
import {Keyboard} from 'react-native';
import {addressTree} from '../../../../redux/clientDatabase/location';
import TextField from '../../../common/textField';
import {useTheme} from '@react-navigation/native';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
} from '../../../../assets/fonts';
import {getFontSize} from '../../../../utils/fontSizeResponsive';

const heightScreen = Dimensions.get('window').height;

type AddressBottomSheetContentProps = {
  data: addressTree;
  locationNameConverter: {
    Ward: (id: number) => string;
    District: (id: number) => string;
    City: (id: number) => string;
  };
  onCloseBottomSheet: () => void;
  onSetAddress: (address: any) => void;
  initialAddress: any;
};

type formState = {
  ID?: number;
  IsTemporary?: boolean;
  IsDeleted?: boolean;
  City: number;
  District?: number;
  Ward?: number;
  DetailAddress?: string;
};

const AddressBottomSheetContent: React.FC<AddressBottomSheetContentProps> = ({
  data,
  locationNameConverter,
  onCloseBottomSheet,
  onSetAddress,
  initialAddress,
}) => {
  const color = useTheme().colors.customColors;
  const [addressTree, setAddressTree] = useState([]);
  const [form, setForm] = useState<formState>({
    ID: undefined,
    IsTemporary: undefined,
    IsDeleted: undefined,
    City: 0,
    District: undefined,
    Ward: undefined,
    DetailAddress: '',
  });
  const [selected, setSelected] = useState('City');
  const [currentData, setCurrentData] = useState<any>(data);

  useEffect(() => {
    if (initialAddress) {
      console.log('Initial address: ' + JSON.stringify(initialAddress));
      setForm(initialAddress);
      if (initialAddress.City == 0) {
        setSelected('City');
        setShowDetailAddress(false);
        setCurrentData(data);
      }
      // const city = data.filter(item => item.ID === initialAddress.City)[0];
      // setCurrentData(data.filter(item => item.ID === initialAddress.City)[0].Districts);
      // setSelected('District');
    }
  }, [initialAddress]);

  const onSelect = (name: string) => {
    setSelected(name);
    if (name === 'City') {
      setCurrentData(data);
    } else if (name === 'District') {
      setCurrentData(data.filter(item => item.ID === form.City)[0].Districts);
    } else if (name === 'Ward') {
      setCurrentData(
        data
          .filter(item => item.ID === form.City)[0]
          .Districts.filter(item => item.ID === form.District)[0].Wards,
      );
    }
    setShowDetailAddress(false);
  };

  const onChooseLocation = (name: string, ID: number, value: any) => {
    if (name === 'City') {
      setSelected('District');
      setForm({...form, City: ID, District: 0, Ward: undefined});
      // setForm({ ...form, City: value, District: 'Choose district', Ward: '' });
      setCurrentData(
        currentData.filter((item: {ID: number}) => item.ID === ID)[0].Districts,
      );
      return;
    } else if (name === 'District') {
      setSelected('Ward');
      setForm({...form, District: ID, Ward: 0});
      // setForm({ ...form, District: value, Ward: 'Choose Ward' });
      setCurrentData(
        currentData.filter((item: {ID: number}) => item.ID === ID)[0].Wards,
      );
      return;
    }
    setForm({...form, [name]: ID});
    // setForm({ ...form, [name]: value });
    setShowDetailAddress(true);
    setSelected('');
  };

  const onDelete = () => {
    if (!form.IsDeleted) {
      const temp = {...form, IsDeleted: true};
      onSetAddress(temp);
    }
    onCloseBottomSheet();
  };

  useEffect(() => {
    if (selected === 'Ward' && form.Ward) {
      //onSetAddress(IDForm);
      // onCloseBottomSheet();
      setShowDetailAddress(true);
      setSelected('');
    }
  }, [form.Ward]);

  const _renderContent = (data: any, selected: string) => {
    return data.map((item: any, index: number) => {
      let flag = false;
      let firstLetter = '';
      if (
        (selected === 'City' && item.ID === form.City) ||
        (selected === 'District' && item.ID === form.District) ||
        (selected === 'Ward' && item.ID === form.Ward)
      )
        flag = true;
      if (index === 0) firstLetter = item.Name[0].toUpperCase();
      else if (item.Name[0] !== data[index - 1].Name[0])
        firstLetter = item.Name[0].toUpperCase();
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => onChooseLocation(selected, item.ID, item.Name)}>
          <View
            style={{
              paddingBottom: index === data.length - 1 ? 315 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
              }}>
              <View style={{width: 25}}>
                {firstLetter && (
                  <Text style={{color: color.onBackground_light}}>{firstLetter}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: flag ? colors.primary : color.onBackground,
                  }}>
                  {item.Name}
                </Text>

                {flag && (
                  <MaterialIcons
                    name="check"
                    size={16}
                    color={colors.primary}
                    style={{paddingTop: 3}}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                borderBottomWidth: 1,
                borderBottomColor: color.divider,
                marginStart: 35,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  const [showDetailAddress, setShowDetailAddress] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{backgroundColor: color.surface, height: '100%'}}>
        <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)}>
          <View style={[styles.selectedSectionLabel, {marginTop: 8}]}>
            <Text
              style={[
                styles.selectedLabel,
                {
                  fontFamily: POPPINS_SEMI_BOLD,
                  fontSize: getFontSize(14),
                  color: color.onBackground,
                },
              ]}>
              Selected area
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setForm({
                  City: 0,
                  District: undefined,
                  Ward: undefined,
                });
                setCurrentData(data);
                setSelected('City');
                setShowDetailAddress(false);
              }}>
              <Text
                style={[
                  styles.resetLabel,
                  {fontFamily: POPPINS_SEMI_BOLD, color: color.primary},
                ]}>
                Reset
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            layout={Layout.stiffness(100).damping(10).duration(300)}>
            {Object.keys(form).map((key, index) => {
              if (
                (key === 'City' || key === 'District' || key === 'Ward') &&
                form[key] != undefined
              ) {
                let text = '';
                if (key === 'City' && !isNaN(form.City)) {
                  if (form.City == 0) text = 'Choose city';
                  else text = locationNameConverter.City(form.City);
                } else if (key === 'District' && !isNaN(form.District || -1)) {
                  if (form.District == 0) text = 'Choose district';
                  else
                    text = locationNameConverter.District(form.District || -1);
                } else if (!isNaN(form.Ward || -1)) {
                  if (form.Ward == 0) text = 'Choose ward';
                  else text = locationNameConverter.Ward(form.Ward || -1);
                }
                return (
                  <Animated.View
                    key={index}
                    layout={Layout.springify()}
                    entering={FadeInUp}>
                    <TouchableWithoutFeedback onPress={() => onSelect(key)}>
                      <View style={styles.selectedSectionItem}>
                        <View style={{alignItems: 'center'}}>
                          {key !== 'City' && (
                            <View
                              style={[
                                {
                                  width: 1,
                                  height: 24,
                                  backgroundColor: color.divider,
                                  marginTop: 3,
                                },
                              ]}
                            />
                          )}
                          {selected === key ? (
                            <MaterialCommunityIcons
                              name="circle-slice-8"
                              size={16}
                              color={color.primary}
                              style={{paddingTop: 3}}
                            />
                          ) : (
                            <MaterialIcons
                              name="circle"
                              size={16}
                              color={color.divider}
                              style={{paddingTop: 3}}
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.selectedSectionItemText,
                            {color: color.onBackground},
                            selected === key && {
                              color: color.primary,
                              fontWeight: 'bold',
                            },
                          ]}>
                          {text}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>
                );
              }
            })}
          </Animated.View>
        </Animated.View>

        {!showDetailAddress && (
          <Animated.View
            layout={Layout.stiffness(100).damping(10).duration(300)}
            style={styles.selectedSectionContent}>
            <Text
              style={[
                styles.selectedLabel,
                {color: color.onBackground, fontFamily: POPPINS_SEMI_BOLD},
              ]}>
              {selected}
            </Text>
            <ScrollView>
              {_renderContent(
                Array.from(currentData).sort((a: any, b: any) =>
                  a.Name.localeCompare(b.Name),
                ),
                selected,
              )}
            </ScrollView>
          </Animated.View>
        )}

        {showDetailAddress && (
          <Animated.View
            layout={Layout.stiffness(100).damping(10).duration(300)}
            style={styles.selectedSectionContent}>
            <Text
              style={[
                styles.selectedLabel,
                {
                  marginBottom: 10,
                  marginTop: 15,
                  color: color.onBackground,
                  fontFamily: POPPINS_MEDIUM,
                },
              ]}>
              Detail Address
            </Text>

            <TextField
              label={'Detail address (optional)'}
              iconClass={MaterialCommunityIcons}
              iconName={'map-marker-outline'}
              iconColor={color.primary}
              style={{
                width: '90%',
                alignSelf: 'center',
                marginBottom: 8,
              }}
              value={form.DetailAddress}
              onChangeText={value => {
                setForm({
                  ...form,
                  DetailAddress: value,
                });
              }}
            />
          </Animated.View>
        )}

        {showDetailAddress && (
          <View
            style={{
              alignSelf: 'center',
              width: '80%',
              margin: 16,
              marginHorizontal: 20,
              marginTop: 30,
            }}>
            <FAB
              onPress={() => {
                onSetAddress(form);
                onCloseBottomSheet();
              }}
              label="Save"
              size="small"
              color={color.onSecondary}
              style={{
                backgroundColor: color.secondary,
                marginBottom: 30,
              }}
            />
            <FAB
              onPress={() => {
                onDelete();
              }}
              label="Delete"
              size="small"
              color={color.onBackground_light}
              style={{backgroundColor: color.divider}}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddressBottomSheetContent;

const styles = StyleSheet.create({
  selectedSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLabel: {
    marginStart: 15,
    // color: colors.black,
    // fontWeight: 'bold',
  },
  resetLabel: {
    marginEnd: 15,
    // color: colors.primary,
    // fontWeight: 'bold',
  },
  selectedSectionContent: {
    marginTop: 15,
  },

  selectedSectionItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 25,
  },
  selectedSectionItemText: {
    marginStart: 10,
    alignSelf: 'flex-end',
  },
});
