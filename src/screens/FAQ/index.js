
import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CTA_Profile from '../../components/CTA_PROFILE';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import screenResolution from '../../utilities/constants/screenResolution';

const FAQ = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    const [search, setsearch] = useState('');

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('fAQ')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <View style={styles.boxContainer}>
                <View style={{ width: '100%', }}>
                    <View style={styles.inputContiner}>
                        <AntDesign name="search1"
                            style={{
                                fontSize: RFValue(20, screenResolution.screenHeight),
                                color: colors.White_Primary_01,
                            }}
                        />
                        <TextInput
                            keyboardType='number-pad'
                            style={styles.input}
                            value={search}
                            onChangeText={(e) => { setsearch(e) }}
                            placeholder={t('search')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                    <CTA_Profile title={t('howdoibookacleaning')} icon={null} submitHandler={() => { }} />
                    <CTA_Profile title={t('howdoipayforthe')} icon={null} submitHandler={() => { }} />
                    <CTA_Profile title={t('howdoicontact')} icon={null} submitHandler={() => { }} />
                </View>
            </View>
        </View>
    );
};

export default FAQ;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        boxContainer: {
            flex: 1,
            width: '90%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: 10,
        },
        box: {
            marginTop: 10,
            height: 44,
            width: 106,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Primary_03
        },
        inputContiner: {
            width: '98%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 10,
            backgroundColor: colors.white,
            borderColor: colors.White_Primary_01,
            borderRadius: 5,
            borderWidth: theme === 'dark' ? 0.5 : 1,
            marginTop: 10,
        },
        input: {
            height: 50, width: "90%", color: colors.black,
            marginLeft: 7,
        }
    });
};
