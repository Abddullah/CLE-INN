import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
// local import
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { t } from 'i18next';

const Categories = ({
    icon,
    title,
    subCategories,
    submitHandler,
    selectedCat,

}) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <TouchableOpacity
            onPress={() => { submitHandler(title, subCategories) }}
            activeOpacity={.8}
            style={styles.catBox}
        >
            <Image
                resizeMode="contain"
                style={{ width: 65, height: 65, borderRadius: 50, borderWidth: selectedCat === title ? 2 : 0, borderColor: colors.BothPrimary_01 }}
                source={{ uri: icon }}
            />
            <Text style={[Typography.text_paragraph, { color: colors.black }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Categories;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        catBox: {
            width: 98,
            marginHorizontal: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            // backgroundColor: 'red'
        }
    });
};

