import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Typography } from '../utilities/constants/constant.style';
import { t } from 'i18next';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import screenResolution from '../utilities/constants/screenResolution';
import { RFValue } from 'react-native-responsive-fontsize';

const InformationPopup = ({ modalVisible, setModalVisible, info }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(false) }}>
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPressOut={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>

                    <TouchableOpacity style={styles.choosContainer}>
                        {
                            info === 1 &&
                            <Text style={[Typography.text_subHeading_1]}>{t('howlongshouldibookfor')}</Text>
                        }
                        {
                            info === 2 &&
                            <Text style={[Typography.text_subHeading_1]}>{t('whichmaterialswill')}</Text>
                        }
                    </TouchableOpacity>

                    <View style={{ flex: 1, width: '100%', marginTop: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                        {/* Additional content */}
                        {
                            info === 1 &&

                            <View style={styles.card1}>
                                <Text style={styles.title}>{t('recommendedDuration')}</Text>
                                <View style={styles.topSection}>
                                    <View style={[styles.leftCard, { backgroundColor: '#0070FF' }]}>
                                        <Text style={styles.cardHeading}>{t('cleaningDuration')}</Text>
                                        <View style={styles.placesContainer}>
                                            {[
                                                { place: t('Studio'), duration: t('Hour1') },
                                                { place: t('Bedroom1'), duration: t('Hour1to2') },
                                                { place: t('Bedroom2'), duration: t('Hour2to3') },
                                                { place: t('Bedroom3'), duration: t('Hour3to4') },
                                                { place: t('Bedroom4'), duration: t('Hour4to5') },
                                                { place: t('Bedroom5'), duration: t('Hour5to6') },
                                                { place: t('Bedroom6'), duration: t('Hour6to7') },
                                            ].map((item, index) => (
                                                <View key={index} style={styles.placeRow}>
                                                    <Text style={styles.place}>{item.place}</Text>
                                                    <Text style={styles.duration}>{item.duration}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                    <View style={styles.rightSection}>
                                        {[
                                            { title: t('ExpressCleaning'), description: t('Hourforquickcleanup') },
                                            { title: t('VillasResident'), description: t('Extrahourrecommendedforvillas') },
                                        ].map((item, index) => (
                                            <View key={index} style={[styles.rightCard, { marginTop: index === 0 ? 0 : 5, backgroundColor: '#0070FF' }]}>
                                                <Text style={styles.cardText}>{item.title}</Text>
                                                <Text style={styles.cardDescription}>{item.description}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                <View style={[styles.bottomSection, { backgroundColor: colors.Primary_01 }]}>
                                    <Text style={styles.heading1}>{t('RegularCleaningList')}</Text>
                                    <View style={styles.barsContainer}>
                                        {[
                                            { label: t('KitchenDishescountertops'), time: t('Minutes30') },
                                            { label: t('BathroomCleaningwiping'), time: t('Minutes30') },
                                            { label: t('BedroomTidyingbedmaking'), time: t('Minutes20') },
                                            { label: t('GeneralDustingMoppingVacuumingtrashremoval'), time: t('Minutes40') },
                                        ].map((item, index) => (
                                            <View key={index} style={styles.bar}>
                                                <Text style={styles.barLabel}>{item.label}</Text>
                                                <Text style={styles.barTime}>{item.time}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <Text style={styles.addonsHeading}>{t('additionalService')}</Text>
                                    <View style={styles.badgesContainer}>
                                        {[t('Oven'), t('Laundry'), t('Fridge'), t('Ironing'), t('Balcony'), t('Cupboard')].map((addon, index) => (
                                            <View key={index} style={styles.badge1}>
                                                <Text style={styles.badgeText}>{addon}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>

                        }

                        {
                            info === 2 &&
                            <View style={styles.card}>
                                <Image
                                    source={{
                                        uri: "https://www.henryford.com/-/media/project/hfhs/henryford/henry-ford-blog/images/mobile-interior-banner-images/2019/02/bucket-of-cleaning-products.jpg",
                                    }}
                                    style={styles.image}
                                />

                                <Text style={styles.text}>{t('bookyourhomecleaning')}</Text>

                                <Text style={styles.heading}>{t('CleaningHome')}</Text>

                                <View style={styles.badgeContainer}>
                                    <Text style={styles.badge}>{t('FloorCleaner')}</Text>
                                    <Text style={styles.badge}>{t('Multipurposecleaner')}</Text>
                                    <Text style={styles.badge}>{t('KitchenCleaner')}</Text>
                                    <Text style={styles.badge}>{t('GlassCleaner')}</Text>
                                    <Text style={styles.badge}>{t('FurniturePolish')}</Text>
                                    <Text style={styles.badge}>{t('ToiletCleaner')}</Text>
                                </View>

                                <Text style={styles.heading}>{t('CleaningEquipment')}</Text>

                                <View style={styles.badgeContainer}>
                                    <Text style={styles.badge}>{t('VacuumCleaner')}</Text>
                                    <Text style={styles.badge}>{t('Mop')}</Text>
                                    <Text style={styles.badge}>{t('BucketSpinner')}</Text>
                                    <Text style={styles.badge}>{t('MicrofiberCloth')}</Text>
                                    <Text style={styles.badge}>{t('SpongCloth')}</Text>
                                    <Text style={styles.badge}>{t('Securingpad')}</Text>
                                </View>
                            </View>
                        }


                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};


const createStyles = (colors, theme) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            height: '90%',
            width: '100%',
            overflow: 'hidden',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: 'white',
        },
        choosContainer: {
            height: 50,
            width: '100%',
            paddingLeft: '5%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderBottomColor: colors.Neutral_01,
            borderBottomWidth: 0.5,
        },

        card: {
            backgroundColor: colors.Primary_01,
            padding: 20,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            width: '90%',
            // height: 490,
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
        },
        text: {
            color: "white",
            // fontSize: 19,
            fontSize: RFValue(19, screenResolution.screenHeight),
            fontWeight: "bold",
            textAlign: "center",
            // marginTop: 12,
        },
        heading: {
            color: "white",
            fontWeight: "bold",
            // fontSize: 16,
            fontSize: RFValue(12, screenResolution.screenHeight),
            marginTop: 20,
            marginBottom: 22,
        },
        badgeContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        badge: {
            // backgroundColor: "#BDD9E4",
            backgroundColor: "#0070FF",
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold',
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 20,
            margin: 5,
            // fontSize: 10,
            fontSize: RFValue(10, screenResolution.screenHeight),
        },




        card1: {
            width: '90%',
            // height: 200,
            padding: 20,
            backgroundColor: colors.Primary_01,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
        },
        title: {
            color: 'white',
            // fontSize: 22,
            fontSize: RFValue(16, screenResolution.screenHeight),
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        topSection: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // marginBottom: 16,
            // backgroundColor: 'red'
        },
        leftCard: {
            flex: 1,
            // padding: 5,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 8,
        },
        cardHeading: {
            // fontSize: 16,
            fontSize: RFValue(14, screenResolution.screenHeight),
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold'
        },
        placesContainer: {
            marginTop: 5,
        },
        placeRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
        },
        place: {
            // fontSize: 14,
            fontSize: RFValue(12, screenResolution.screenHeight),
            color: colors.white,
            // fontWeight: 'bold'
        },
        duration: {
            // fontSize: 14,
            fontSize: RFValue(12, screenResolution.screenHeight),
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold'
        },
        rightSection: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // marginLeft: 10,
        },
        rightCard: {
            flex: 1,
            width:'95%',
            padding: 16,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 12,
        },
        cardText: {
            // fontSize: 15,
            fontSize: RFValue(12, screenResolution.screenHeight),
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold',
            textAlign: 'center',
        },
        cardDescription: {
            marginTop: 6,
            // fontSize: 13,
            fontSize: RFValue(12, screenResolution.screenHeight),
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold',
            textAlign: 'center',
        },
        bottomSection: {
            // padding: 16,
            borderRadius: 8,
        },
        heading1: {
            // fontSize: 18,
            marginTop: 10,
            marginBottom: 10,
            fontSize: RFValue(16, screenResolution.screenHeight),
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
        },
        barsContainer: {
            marginBottom: 5,
        },
        bar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: '#BDD9E4',
            backgroundColor: '#0070FF',
            paddingVertical: 2,
            paddingHorizontal: 12,
            borderRadius: 8,
            marginBottom: 10,
            width: '100%',
            alignSelf: 'center',
        },
        barLabel: {
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold',
            // fontSize: 14,
            fontSize: RFValue(12, screenResolution.screenHeight),

            flex: 1,
        },
        barTime: {
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold',
            // fontSize: 12,
            fontSize: RFValue(12, screenResolution.screenHeight),

        },
        addonsHeading: {
            // fontSize: 16,
            fontSize: RFValue(12, screenResolution.screenHeight),
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 10,
        },
        badgesContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        badge1: {
            // backgroundColor: '#BDD9E4',
            backgroundColor: '#0070FF',
            // padding: 8,
            paddingVertical: 2,
            paddingHorizontal: 12,
            borderRadius: 12,
            margin: 5,
            // marginHorizontal: 5
        },
        badgeText: {
            color: colors.white,
            // color: colors.black,
            // fontWeight: 'bold',
            // fontSize: 13,
            fontSize: RFValue(12, screenResolution.screenHeight),

        },
    });
};

export default InformationPopup;
