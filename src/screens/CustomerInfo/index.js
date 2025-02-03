import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const CustomerInfo = ({ navigation }) => {
    const route = useRoute();
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    let userInfo = route.params?.userInfo;

    return (
        <View style={styles.container}>

            <CustomHeader
                title={t('customerInfo')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />

            {/* <View style={styles.body}>
            </View> */}

            <ScrollView contentContainerStyle={styles.scrollBar} style={{ width: '100%', }}>
                <View style={{ width: '90%', }}>
                    <View style={[styles.heading, { marginTop: 20 }]}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('fullname')}</Text>
                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{userInfo?.fullName}</Text>
                    </View>

                    <View style={[styles.heading, { marginTop: 20 }]}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('phoneNo')}</Text>
                        <Text style={[Typography.text_paragraph_1, styles.editText,]}>{userInfo?.phone}</Text>
                    </View>

                    <View style={[styles.heading, { marginTop: 20 }]}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('emailAddress')}</Text>
                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{userInfo?.email}</Text>
                    </View>

                    <View style={[styles.heading, { marginTop: 20 }]}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('dob')}</Text>
                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{moment(userInfo?.dob).format('DD MM YYYY')}</Text>
                    </View>

                    <View style={[styles.heading, { marginTop: 20 }]}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('gender')}</Text>
                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{userInfo?.gender}</Text>
                    </View>

                    <View style={[styles.heading, { marginTop: 20 }]}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('address')}</Text>
                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{userInfo?.address}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


export default CustomerInfo;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        body: {
            flex: 10,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        footer: {
            // flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
        heading: {
            width: '100%',
            marginTop: 10,
            alignItems: 'flex-start',
        },
        headingText: {
            fontWeight: 'bold',
            color: colors.black,
            textAlign: 'left'
        },
        editText: {
            // fontSize: 14,
            textAlign: 'left',
            color: colors.black
        },
        taxContainer: {
            height: 185,
            width: '100%',
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            backgroundColor: colors.Neutral_02
        },
        taxContainer_C1: {
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
    });
};
