
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const Preferences = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('preferences')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <View style={styles.boxContainer}>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('home')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('office')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('company')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('hospital')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('flexibletime')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('recurring')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('service')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('request')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} style={styles.box}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, }]}>{t('cleaning')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Preferences;

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
    });
};
