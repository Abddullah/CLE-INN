
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';

const VerticalStarList = ({ }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.ratingLineContainer}
            >
                <View style={styles.ratingLineContainer_C1}>
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, fontSize: RFValue(16, screenResolution.screenHeight) }]}>{'5'}</Text>
                </View>
                <View style={styles.ratingLineContainer_C2}>
                    <View style={styles.line} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.ratingLineContainer}
            >
                <View style={styles.ratingLineContainer_C1}>
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, fontSize: RFValue(16, screenResolution.screenHeight) }]}>{'4'}</Text>
                </View>
                <View style={styles.ratingLineContainer_C2}>
                    <View style={[styles.line, { width: '80%' }]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.ratingLineContainer}
            >
                <View style={styles.ratingLineContainer_C1}>
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, fontSize: RFValue(16, screenResolution.screenHeight) }]}>{'3'}</Text>
                </View>
                <View style={styles.ratingLineContainer_C2}>
                    <View style={[styles.line, { width: '60%' }]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.ratingLineContainer}
            >
                <View style={styles.ratingLineContainer_C1}>
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, fontSize: RFValue(16, screenResolution.screenHeight) }]}>{'2'}</Text>
                </View>
                <View style={styles.ratingLineContainer_C2}>
                    <View style={[styles.line, { width: '40%' }]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.ratingLineContainer}
            >
                <View style={styles.ratingLineContainer_C1}>
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, fontSize: RFValue(16, screenResolution.screenHeight) }]}>{'1'}</Text>
                </View>
                <View style={styles.ratingLineContainer_C2}>
                    <View style={[styles.line, { width: '10%' }]} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default VerticalStarList;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        ratingLineContainer: {
            flexDirection: 'row',
            height: 40,
            width: '100%',
        },
        ratingLineContainer_C1: {
            flex: 2, justifyContent: 'center', alignItems: 'center',
        },
        ratingLineContainer_C2: {
            flex: 8,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        line: {
            height: 2,
            backgroundColor: colors.yellow,
            width: '100%',
        },
    });
};


