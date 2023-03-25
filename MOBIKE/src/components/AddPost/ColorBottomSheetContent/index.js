import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwnesome from 'react-native-vector-icons/FontAwesome';
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
const ColorBottomSheetContent = ({
    initialValue,
    onSetColor,
    onCloseBottomSheet,
}) => {

    useEffect(() => {
        setSelectedColor(initialValue.color)
    }, [initialValue])

    const dataColors = Store.getState().colors;

    const [selectedColor, setSelectedColor] = React.useState(initialValue.color);

    const onChoose = (item) => {
        onSetColor(item.ID);
        onCloseBottomSheet();
    };

    const _renderContent = (data) => {
        return data.map((item, index) => {
            let flag = false;

            if (item.ID == selectedColor) {
                flag = true;
            }

            return (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => onChoose(item)}>
                    <View style={{ marginHorizontal: 4, position: 'relative' }}>
                        <FontAwnesome
                            name='circle'
                            size={widthScreen / 8 - 4}
                            color={'#' + item.Color_hex}
                        />
                        {flag && <View style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
                        }}>
                            <MaterialIcons
                                name="check"
                                size={widthScreen / 16}
                                color={colors.primary}
                            />
                        </View>}
                    </View>
                </TouchableWithoutFeedback >
            );
        });
    };

    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <Text style={styles.selectedLabel}>Choose color</Text>
            <Animated.View
                layout={Layout.stiffness(100).damping(10).duration(300)}
                style={styles.selectedSectionContent}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 9 }}>{_renderContent(dataColors)}</View>
            </Animated.View>
        </View>
    );
}

export default ColorBottomSheetContent;

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
