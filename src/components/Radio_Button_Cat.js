import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';

const RadioButtonCat = ({ options, onSelect }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
        setSelected(value);
        onSelect(value);
    };

    return (
        <View>
            {
                options.map((option, index) => (
                    <TouchableOpacity
                        activeOpacity={.8}
                        key={index}
                        style={styles.radioButtonContainer}
                        onPress={() => handleSelect(option.value)}
                    >
                        <View style={styles.radioButton}>
                            {selected === option.value && <View style={styles.radioButtonSelected} />}
                        </View>
                        <Text style={styles.radioButtonLabel}>{option.label}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        radioButtonContainer: {
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: colors.Neutral_02
        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.White_Primary_01,
            alignItems: 'center',
            justifyContent: 'center',
        },
        radioButtonSelected: {
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: colors.White_Primary_01,
        },
        radioButtonLabel: {
            marginLeft: 10,
            fontSize: RFValue(16, screenResolution.screenHeight),
            color: colors.black
        },
    });
};

export default RadioButtonCat;
