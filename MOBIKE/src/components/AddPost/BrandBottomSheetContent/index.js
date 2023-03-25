import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import MobikeImage from '../../common/image';
import { useState } from 'react';
import Animated, { Layout } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import Store from '../../../redux/store';
import { useEffect } from 'react';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const BrandBottomSheetContent = ({
    initialValue,
    onSetBrand_Lineup,
    onCloseBottomSheet,
}) => {

    useEffect(() => {
        setIsManufacturerSelected(true);
        setSelectedManufacturer(initialValue.brand)
        setSelectedLineup(initialValue.lineup)
        setSearchData(dataManufacturer);
    }, [initialValue])

    const dataManufacturer = Store.getState().vehicleModels.VehicleBrands;
    const dataLineup = Array.from(Store.getState().vehicleModels.VehicleLineUps).sort((a, b) => a.Lineup.localeCompare(b.Lineup));

    const [selectedManufacturer, setSelectedManufacturer] = React.useState(initialValue.brand);
    const [selectedLineup, setSelectedLineup] = React.useState(initialValue.lineup);
    const [isManufacturerSelected, setIsManufacturerSelected] = React.useState(true);

    const [dataLineupSelected, setDataLineupSelected] = React.useState(dataLineup);

    const onChoose = (item) => {
        if (isManufacturerSelected) {
            setIsManufacturerSelected(false);
            setSelectedManufacturer(item.ID);
            const tmp = dataLineup.filter((i) => i.ID_VehicleBrand == item.ID);
            setSearchData(tmp);
            setDataLineupSelected(tmp);
        }
        else {
            onSetBrand_Lineup(item.ID_VehicleBrand, item.ID)
            console.log('onChoose + ' + selectedManufacturer + ' ' + item.ID);
            onCloseBottomSheet();
        }
    };

    const _renderContent = (data) => {
        return data.map((item, index) => {
            let flag = false;
            let firstLetter = '';

            if ((isManufacturerSelected && item.ID == selectedManufacturer) || (!isManufacturerSelected && item.ID == selectedLineup)) {
                flag = true;
            }

            if (!isManufacturerSelected && item) {
                if (index === 0) firstLetter = item.Lineup[0].toUpperCase();
                else if (item.Lineup[0] !== data[index - 1].Lineup[0])
                    firstLetter = item.Lineup[0].toUpperCase();
            }
            return (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => onChoose(item)}>
                    <View>
                        {!isManufacturerSelected && <View
                            style={{
                                paddingBottom: index === data.length - 1 ? (heightScreen / 12) + 110 : 0,
                            }}>
                            <View
                                style={[{
                                    flexDirection: 'row',
                                    // }, isManufacturerSelected && {
                                    //     paddingStart: 10,
                                    //     paddingVertical: 5,
                                    //     paddingEnd: 12,
                                }, !isManufacturerSelected && { padding: 12 }]}>

                                {!isManufacturerSelected &&
                                    (<View style={{ width: 25 }}>
                                        {firstLetter && (
                                            <Text style={{ color: colors.grey }}>{firstLetter}</Text>
                                        )}
                                    </View>)
                                }
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        flex: 1,
                                    }}>
                                    <Text style={{ color: flag ? colors.primary : 'black', textAlignVertical: 'center' }}>
                                        {isManufacturerSelected ? item.Name : item.Lineup}
                                    </Text>

                                    {flag && (
                                        <MaterialIcons
                                            name="check"
                                            size={16}
                                            color={colors.primary}
                                            style={{ paddingTop: isManufacturerSelected ? 8 : 3 }}
                                        />
                                    )}
                                </View>
                            </View>

                            <View
                                style={{
                                    height: 1,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#e9e9e9',
                                    marginStart: isManufacturerSelected ? 50 : 35,
                                }}
                            />
                        </View>}
                        {isManufacturerSelected &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}>
                                <View style={{ width: widthScreen / 4 - 2, marginBottom: 5, padding: 10 }}>
                                    <View style={{ borderWidth: 1, borderColor: flag ? colors.primary : '#f2f2f2', borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                        <MobikeImage style={{ width: widthScreen / 4 - 30, height: widthScreen / 4 - 30 }} imageID={item.ID_Image} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: flag ? colors.primary : 'black', textAlignVertical: 'center', fontSize: 12, textAlign: 'center' }}>
                                                {item.Name}
                                            </Text>
                                            {flag && <MaterialIcons
                                                name="check"
                                                size={16}
                                                color={colors.primary}
                                                style={{ marginLeft: 2, }}
                                            />}
                                        </View>
                                    </View>


                                </View>
                            </View>}
                    </View>
                </TouchableWithoutFeedback >
            );
        });
    };

    //Search bar
    const [searchData, setSearchData] = useState(dataManufacturer);
    const onTextChange = (text) => {
        if (text) {
            if (isManufacturerSelected) {
                const newData = dataManufacturer.filter((item) => {
                    const itemData = item.Name
                        ? item.Name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setSearchData(newData);
            }
            else {
                const newData = dataLineuccpSelected.filter((item) => {
                    const itemData = item.Lineup
                        ? item.Lineup.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setSearchData(newData);
            }

        } else {
            setSearchData(isManufacturerSelected ? dataManufacturer : dataLineupSelected);
        }
    };
    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <Text style={styles.selectedLabel}>{isManufacturerSelected ? 'Choose brand' : 'Choose lineup'}</Text>
            <TextInputOutline
                label={'Search ' + (isManufacturerSelected ? 'brand' : 'lineup')}
                iconClass={Ionicons}
                iconName={'search-outline'}
                iconColor={'#90B4D3'}
                inputPadding={6}
                borderWidthtoTop={0}
                bigContainerStyle={{ marginHorizontal: 15, marginTop: 15, marginBottom: 0, }}
                containerStyle={{ height: 44, borderColor: 'transparent' }}
                labelStyle={{ fontSize: 12 }}
                inputStyle={{ fontSize: 14 }}
                labelContainerStyle={{ padding: 13 }}
                iconSize={20}
                onChangeText={(text) => onTextChange(text)}
            />
            <Animated.View
                layout={Layout.stiffness(100).damping(10).duration(300)}
                style={styles.selectedSectionContent}>
                {!isManufacturerSelected && <ScrollView>{_renderContent(searchData)}</ScrollView>}
                {isManufacturerSelected && <ScrollView><View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 4 }}>{_renderContent(searchData)}</View></ScrollView>}
            </Animated.View>
        </View>
    );
}

export default BrandBottomSheetContent;

const styles = StyleSheet.create({
    selectedSectionLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    selectedLabel: {
        marginStart: 15,
        color: colors.black,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    resetLabel: {
        marginEnd: 15,
        color: colors.primary,
        fontWeight: 'bold',
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
        color: '#000',
        alignSelf: 'flex-end',
    },
});
