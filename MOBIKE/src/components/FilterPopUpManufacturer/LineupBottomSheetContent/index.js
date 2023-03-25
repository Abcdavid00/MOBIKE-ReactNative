import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import colors from '../../../assets/theme/colors';
import { useSelector } from 'react-redux';

const heightScreen = Dimensions.get('window').height;

const LineupBottomSheetContent = ({
    data,
    onCloseBottomSheet,
    manufacturer,
    selectedLineup,
    onChooseLineup,
}) => {

    const _renderContent = (data) => {
        return data.map((item, index) => {
            let flag = false;
            let firstLetter = '';
            if (selectedLineup.includes(item.id)) flag = true;
            if (index === 0) firstLetter = item.name[0].toUpperCase();
            else if (item.name[0] !== data[index - 1].name[0])
                firstLetter = item.name[0].toUpperCase();
            return (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => onChooseLineup(item)}>
                    <View
                        style={{
                            paddingBottom: index === data.length - 1 ? (heightScreen / 12) + 110 + (selectedLineup.length / 2) * 40 : 0,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 12,
                            }}>
                            <View style={{ width: 25 }}>
                                {firstLetter && (
                                    <Text style={{ color: colors.grey }}>{firstLetter}</Text>
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                }}>
                                <Text style={{ color: flag ? colors.primary : 'black' }}>
                                    {item.name}
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
                                marginStart: 35,
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            );
        });
    };
    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            {/* <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)}>
                <View style={styles.selectedSectionLabel}>
                    <Text style={styles.selectedLabel}>Selected Lineup</Text>
                </View>
                <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)}>
                    {selectedLineup.length > 0 ? (
                        <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)} style={{ flexWrap: 'wrap', flexDirection: 'row', marginStart: 20 }}>
                            {selectedLineup.map((item, index) => {
                                return (
                                    <View key={index} style={styles.selectedSectionItem} >
                                        <Text style={styles.selectedSectionItemText}>
                                            {manufacturer.value.find((x) => x.id === item).name}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={() => onChooseLineup({ id: item })}>
                                            <MaterialCommunityIcons
                                                name="close"
                                                size={14}
                                                color={colors.grey}
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>
                                );
                            })}
                        </Animated.View>)
                        :
                        (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.primary, fontStyle: 'italic' }}>Choose from list below</Text>
                            {selectedLineup.map((item, index) => {
                                return (
                                    <View key={index} style={styles.selectedSectionItem}>
                                        <Text style={styles.selectedSectionItemText}>
                                            {manufacturer.value.find((x) => x.id === item).name}
                                        </Text>
                                        <MaterialCommunityIcons
                                            name="checkbox-marked-circle"
                                            size={16}
                                            color={colors.primary}
                                        />
                                    </View>
                                );
                            })}
                        </View>)}
                </Animated.View>
            </Animated.View> */}
            <Animated.View
                layout={Layout.stiffness(100).damping(10).duration(300)}
                style={styles.selectedSectionContent}>
                <Text style={styles.selectedLabel}>Lineup from {manufacturer.name}</Text>
                <ScrollView>{_renderContent(data)}</ScrollView>
            </Animated.View>
        </View>
    );
};

export default LineupBottomSheetContent;

const styles = StyleSheet.create({
    selectedSectionLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    selectedLabel: {
        marginStart: 15,
        color: colors.black,
        fontWeight: 'bold',
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e9e9e9',
        // backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 5,
        paddingEnd: 7,
        margin: 5,
        marginEnd: 10,
    },
    selectedSectionItemText: {
        marginStart: 10,
        color: '#000',
        alignSelf: 'flex-end',
        fontWeight: '500',
        marginEnd: 5,
    },
});
