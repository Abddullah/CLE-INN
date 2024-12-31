import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
// local import
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const CTAButton1 = ({
    title,
    submitHandler,
    icon
}) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    let isLoader = useSelector((state) => state.reducer.isLoader);

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

export default CTAButton1;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        CRAButton1: {
            backgroundColor: colors.Primary_01,
            borderRadius: 5,
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        CRAButton1_Text: {
            textAlign: 'center',
            color: theme === 'dark' ? colors.black : colors.white,
        },
    });
};

