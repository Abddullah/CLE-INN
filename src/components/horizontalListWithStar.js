
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { colors } from '../utilities/constants';
import { Typography } from '../utilities/constants/constant.style';
import { t } from 'i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';

const HorizontalListWithStar = ({ selectedState, setselectedState, title }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={[styles.catBox, {
                backgroundColor: selectedState === title ? colors.yellow : colors.white,
                borderColor: selectedState !== title ? colors.yellow : colors.white,
                borderWidth: 0.5,
            }]}
            onPress={() => { setselectedState(title) }}
        >
            <FontAwesome
                name="star"
                size={15}
                color={selectedState !== title ? colors.yellow : colors.BothWhite}
            />
            <Text style={[Typography.text_paragraph, { color: selectedState !== title ? colors.yellow : colors.BothWhite, fontSize: RFValue(16, screenResolution.screenHeight), marginLeft: 8 }]}>{title}</Text>
        </TouchableOpacity >
    );
};
export default HorizontalListWithStar;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        catBox: {
            width: 90,
            height: 40,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
        }
    });
};