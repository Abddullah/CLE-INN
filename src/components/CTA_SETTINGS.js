
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const CTA_Setting = ({
    title,
    icon,
    submitHandler
}) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            onPress={submitHandler}
            style={styles.wrapper}
            activeOpacity={.8}
        >
            <Text style={[Typography.text_paragraph_1, { marginLeft: 10, color: colors.black, }]}>{title}</Text>
            <View style={{ top: 1, marginRight: 25 }}>
                {
                    icon
                }
            </View>
        </TouchableOpacity>
    );
};

export default CTA_Setting;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        wrapper: {
            backgroundColor: colors.white,
            flexDirection: 'row',
            width: '98%',
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingLeft: 15,
            borderRadius: 5,
            borderWidth: theme === 'dark' ? 0.5 : 0,
            borderColor: theme === 'dark' ? colors.black : null,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },

    });
};