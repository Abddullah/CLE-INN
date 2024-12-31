import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
// local import
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const CTAButton2 = ({
    title,
    submitHandler,
    isLoader,
    icon
}) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            onPress={submitHandler}
            activeOpacity={0.8}
            style={styles.CRAButton1}
        >
            {
                !isLoader ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {icon && icon}
                        <Text style={[styles.CRAButton1_Text, Typography.text_CTA1]}>{title}</Text>
                    </View>
                ) : (
                    <ActivityIndicator color={"white"} />
                )
            }
        </TouchableOpacity>
    );
};

export default CTAButton2;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        CRAButton1: {
            // backgroundColor: colors.Primary_01,
            borderRadius: 5,
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: colors.White_Primary_01,
            borderWidth: 1
        },
        CRAButton1_Text: {
            textAlign: 'center',
            color: colors.White_Primary_01,
        },
    });
};

