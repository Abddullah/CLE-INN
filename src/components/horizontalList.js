
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { colors } from '../utilities/constants';
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const HorizontalList = ({ selectedState, setselectedState, title }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={[styles.catBox, {
                backgroundColor: selectedState === title ? colors.White_Primary_01 : colors.white,
                borderColor: selectedState !== title ? colors.White_Primary_01 : colors.white,
                borderWidth: 0.5,
            }]}
            onPress={() => { setselectedState(title) }}
        >
            <Text style={[Typography.text_paragraph, { color: selectedState !== title ? colors.White_Primary_01 : colors.white, }]}>{title}</Text>
        </TouchableOpacity>
    );
};
export default HorizontalList;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        catBox: {
            width: 40,
            height: 40,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
        }
    });
};

