
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const BookingStatusTab = ({ selectedState, setselectedState, title }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={[styles.catBox, {
                backgroundColor: selectedState === title ? colors.Primary_01 : colors.Neutral_02,
                borderColor: selectedState !== title ? colors.Primary_01 : colors.black,
            }]}
            onPress={() => { setselectedState(title) }}
        >
            <Text style={[Typography.text_paragraph, { color: selectedState !== title ? colors.black : colors.white, fontWeight: selectedState !== title ? 'normal' : 'bold' }]}>{title}</Text>
        </TouchableOpacity >
    );
};
export default BookingStatusTab;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        catBox: {
            width: 105,
            height: 32,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
        }
    });
};




