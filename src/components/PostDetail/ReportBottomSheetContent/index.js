import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import { TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from 'react-native';
import { FAB } from 'react-native-paper';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const ReportBottomSheetContent = ({
    onSetReport,
    onCloseBottomSheet,
}) => {

    const [content, setContent] = React.useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <Text style={styles.selectedLabel}>Report</Text>
                <TextInputOutline
                    label={'Report content'}
                    inputPadding={6}
                    borderWidthtoTop={0}
                    containerStyle={{
                        height: 145,
                        borderColor: '#555',
                        marginTop: 20,
                        marginHorizontal: 20,
                    }}
                    labelStyle={{ fontSize: 12 }}
                    labelContainerStyle={{ padding: 13 }}
                    value={content}
                    numberOfLines={8}
                    multiline={true}
                    inputStyle={{
                        textAlignVertical: 'top',
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        fontSize: 14,
                    }}
                    onChangeText={value => {
                        setContent(value);
                    }} />
                <View
                    style={{
                        position: 'absolute',
                        margin: 16,
                        marginHorizontal: 20,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    }}>

                    <FAB
                        onPress={() => {
                            onSetReport(content);
                            onCloseBottomSheet();
                            console.log('Report: ', content)
                        }}
                        label='Send'
                        variant='extended'
                        size='small'
                        style={{
                            backgroundColor: colors.secondary,
                            marginBottom: 30,
                        }} />

                    <FAB
                        onPress={() => {
                            onCloseBottomSheet();
                        }}
                        label='Cancel'
                        variant='extended'
                        size='small'
                        style={{ backgroundColor: '#DDD', marginBottom: 30 }}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

export default ReportBottomSheetContent;

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
