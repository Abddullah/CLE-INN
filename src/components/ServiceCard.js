import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '../utilities/constants/constant.style';
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';

const { width } = Dimensions.get('window');

const ServiceCard = ({
    data,
    submitHandler,
    isFav,
    index
}) => {
    let user = useSelector((state) => state.reducer.user);
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme, user, index);

    // console.log('data', data);

    return (
        <TouchableOpacity
            onPress={submitHandler}
            style={styles.wrapper}
            activeOpacity={.8}
        >
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={images.cleaning}
                />
                <View style={styles.overlay} />
                {
                    isFav === true &&
                    <TouchableOpacity activeOpacity={.8} style={styles.favIcon}>
                        <AntDesign name="heart" style={styles.favIconHeart} />
                    </TouchableOpacity>
                }
                <View style={styles.titleContainer}>
                    <Text style={[Typography.text_paragraph, styles.titleText]}>{data?.category && data.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;

const createStyles = (colors, theme, user, index) => {
    const cardWidth = (width / 2) - 35;
    const marginHorizontal = width * 0.02;

    return StyleSheet.create({
        wrapper: {
            width: cardWidth,
            height: cardWidth * 0.7,
            borderRadius: 5,
            overflow: 'hidden',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: 'gray',
            marginHorizontal: marginHorizontal,
            marginLeft: index != 0 ? null : 0,
            backgroundColor: 'white',

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        favIcon: {
            position: 'absolute',
            right: 10,
            top: 10,
        },
        favIconHeart: {
            fontSize: RFValue(20, screenResolution.screenHeight),
            color: colors.Primary_01,
        },
        titleContainer: {
            width: '100%',
            height: 20,
            justifyContent: 'center',
            alignItems: 'flex-start',
            // backgroundColor: colors.Neutral_02,
            position: 'absolute',
            bottom: 5,
        },
        titleText: {
            marginLeft: 10,
            textAlign: 'left',
            color: colors.white,
            fontWeight: 'bold',
        },
    });
};
