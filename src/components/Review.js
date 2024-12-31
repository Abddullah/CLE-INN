
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../utilities/constants';
import { Typography } from '../utilities/constants/constant.style';
import { t } from 'i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import screenResolution from '../utilities/constants/screenResolution';

const deviceWidth = screenResolution.screenWidth;

const ReviewsList = ({ selectedState, setselectedState, title }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <>
            <View style={[{ flex: 1, height: 50, }, styles.list2]}>
                <View style={styles.reviewContiner}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            resizeMode="contain"
                            style={{ borderRadius: 100, width: 48, height: 48 }}
                            source={Images.profilePic}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.White_Primary_01, }]}>{'Charollette Hanlin'}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome name="star" size={20} color={colors.yellow} />
                                <FontAwesome name="star" size={20} color={colors.yellow} />
                                <FontAwesome name="star" size={20} color={colors.yellow} />
                                <FontAwesome name="star" size={20} color={colors.yellow} />
                                <FontAwesome name="star" size={20} color={colors.yellow} />
                            </View>
                        </View>
                    </View>
                    <Text style={[Typography.text_paragraph, { color: colors.Neutral_01 }]}>{'23 May, 2023 '}</Text>
                </View>
            </View>
            <View style={styles.list2}>
                <Text style={[Typography.text_paragraph, { textAlign: 'left', color: colors.Neutral_01 }]}>{'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. '}</Text>
            </View>
        </>
    );
};
export default ReviewsList;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        reviewContiner: {
            flex: 1,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'space-between',
        },
        list2: {
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%'
        },
    });
};

