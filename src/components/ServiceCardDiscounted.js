import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Typography } from '../utilities/constants/constant.style';
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PantagonShap } from '../assets/icons';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';

const ServiceCardDiscounted = ({
    data,
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
            <View style={{ width: 350, height: 215, borderRadius: 10, overflow: 'hidden' }}>
                <Image
                    resizeMode="cover"
                    style={{
                        width: 350, height: 215,
                    }}
                    source={images.cleaning}
                />
                <TouchableOpacity activeOpacity={.8} style={{ position: 'absolute', right: 20, top: 20 }}>
                    <AntDesign name="heart" style={{ fontSize: RFValue(20, screenResolution.screenHeight), color: colors.Primary_01, }} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.textContainer}>
                    <Text style={[Typography.text_subHeading_1, { marginLeft: 10, color: theme === 'dark' ? colors.black : colors.Primary_02, fontWeight: 'bold', }]}>{'€' + data.price + '/hr'}</Text>
                    <Text style={[Typography.text_subHeading_1, { marginLeft: 10, color: colors.black, fontWeight: 'bold', }]}>{data.title}</Text>
                </View>
                <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <PantagonShap style={{ fontSize: RFValue(50, screenResolution.screenHeight) }} />
                    <Text style={[Typography.text_paragraph, { color: colors.white, fontWeight: 'bold', fontSize: 10, position: 'absolute' }]}>
                        {`${data.discount + '%'}\noff`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCardDiscounted;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        wrapper: {
            height: 300,
            width: 350,
            borderRadius: 5,
            overflow: 'hidden',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: .5,
            borderColor: 'gray',
            margin: 5,
        },
        bottomContainer: {
            height: 70,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
        },
        textContainer: {
            height: 70,
            alignItems: 'flex-start',
            justifyContent: 'center',
        }
    });
};




