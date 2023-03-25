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

const heightScreen = Dimensions.get('window').height;
const TypeBottomSheetContent = ({
    initialValue,
    onSetType,
    onCloseBottomSheet,
}) => {

    useEffect(() => {
        setSelectedType(initialValue.type)
    }, [initialValue])

    const dataVehicleTypes = Store.getState().vehicleTypes;

    const [selectedType, setSelectedType] = React.useState(initialValue.type);

    const onChoose = (item) => {
        onSetType(item.ID);
        onCloseBottomSheet();
    };

    const _renderContent = (data) => {
        return data.map((item, index) => {
            let flag = false;
            let firstLetter = '';

            if (item.ID == selectedType) {
                flag = true;
            }

            return (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => onChoose(item)}>
                    <View>
                        <View
                            style={[{
                                flexDirection: 'row',
                                padding: 12,
                                paddingLeft: 15
                            }]}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                }}>
                                <Text style={{ color: flag ? colors.primary : 'black', textAlignVertical: 'center' }}>
                                    {item.Type}
                                </Text>

                                {flag && (
                                    <MaterialIcons
                                        name="check"
                                        size={16}
                                        color={colors.primary}
                                        style={{ paddingTop: 3 }}
                                    />
                                )}
                            </View>
                        </View>
                        <View
                            style={{
                                height: 1,
                                borderBottomWidth: 1,
                                borderBottomColor: '#e9e9e9',
                                marginStart: 10,
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback >
            );
        });
    };

    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <Text style={styles.selectedLabel}>Choose type</Text>
            <Animated.View
                layout={Layout.stiffness(100).damping(10).duration(300)}
                style={styles.selectedSectionContent}>
                <ScrollView>{_renderContent(dataVehicleTypes)}</ScrollView>
            </Animated.View>
        </View>
    );
}

export default TypeBottomSheetContent;

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
        alignSelf: 'flex-start',
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
