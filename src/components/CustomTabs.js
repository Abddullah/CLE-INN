
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const CustomTabs = ({ selectedState, setselectedState, title }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={[styles.catBox, {
                backgroundColor: selectedState === title ? colors.Primary_01 : colors.Neutral_02,
                borderColor: selectedState !== title ? colors.Primary_01 : colors.black,
                // borderWidth: 0.5,
            }]}
            onPress={() => { setselectedState(title) }}
        >
            <Text style={[Typography.text_paragraph_1, { color: selectedState !== title ? colors.black : colors.white, fontWeight: selectedState !== title ? 'normal' : 'bold' }]}>{title}</Text>
        </TouchableOpacity >
    );
};
export default CustomTabs;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        catBox: {
            width: '46%',
            height: 40,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

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




