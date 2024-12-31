import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import Images from '../../assets/images/index'
import { ThisWeekButton } from '../../assets/icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { ScrollView } from 'native-base';
import screenResolution from '../../utilities/constants/screenResolution';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const Analytics = ({ navigation }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    return (
        <View style={styles.container}>

            <CustomHeader
                title={t('analytics')}
                isLeft={true}
                isRight={true}
                isNotification={true}
                leftPress={() => { navigation.goBack() }}
                rightPress={() => { navigation.navigate('Notification') }}
            />

            <ScrollView contentContainerStyle={styles.scrollBar} style={{ width: '100%', }}>
                <View style={styles.body}>
                    <View style={styles.headingContainer}>
                        <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('myStats')}</Text>
                        <TouchableOpacity
                            activeOpacity={.8}
                        >
                            <ThisWeekButton />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={styles.statsContiner}>
                            <Text style={[Typography.text_CTA1, { color: colors.black, fontSize: RFValue(24, screenResolution.screenHeight) }]}>{'25'}</Text>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('totalServices')}</Text>
                        </View>
                        <View style={styles.statsContiner}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="star" size={20} color={colors.yellow} />
                                <Text style={[Typography.text_CTA1, { color: colors.black, fontSize: RFValue(24, screenResolution.screenHeight), marginLeft: 5 }]}>{'4.4'}</Text>
                            </View>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('rating')}</Text>
                        </View>
                        <View style={styles.statsContiner}>
                            <Text style={[Typography.text_CTA1, { color: colors.black, fontSize: RFValue(24, screenResolution.screenHeight) }]}>{'45'}</Text>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('totalbookings')}</Text>
                        </View>
                        <View style={styles.statsContiner}>
                            <Text style={[Typography.text_CTA1, { color: colors.black, fontSize: RFValue(24, screenResolution.screenHeight) }]}>{'01'}</Text>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('totalCancellations')}</Text>
                        </View>
                    </View>

                    <View style={{ height: 280, width: '100%', marginTop: 10, }}>
                        <Image
                            resizeMode="stretch"
                            style={{ width: '100%', height: '100%' }}
                            source={Images.AnalyticsChart}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


export default Analytics;

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
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
        headingContainer: {
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        statsContiner: {
            height: 100,
            width: '45%',
            padding: 5,
            // height: 100,
            // width: 175,
            margin: '1%',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Primary_05
        }

    });
};
