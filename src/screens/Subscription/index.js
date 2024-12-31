
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { SubscriptionIcon, } from '../../assets/icons';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { RFValue } from 'react-native-responsive-fontsize';
import screenResolution from '../../utilities/constants/screenResolution';

const Subscription = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('preferences')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />

            <ScrollView
                style={{ width: '90%' }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <SubscriptionIcon marginTop={10} />
                <Text style={[Typography.text_heading, { color: colors.White_Primary_01, marginTop: 10 }]}>{t('UpgradeToPremium')}</Text>
                <Text style={[Typography.text_subHeading_1, { color: colors.black, marginTop: 10, marginBottom: 10 }]}>{t('UnlimitedPostJobs')}</Text>


                <View style={styles.subscription}>
                    <View style={styles.subscriptionHeading}>
                        <Text style={[Typography.text_subHeading_1, { color: colors.BothWhite, }]}>{t('clein')}</Text>
                    </View>

                    <View style={{ height: 109, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={[Typography.text_heading, { color: colors.black, fontSize: RFValue(26, screenResolution.screenHeight), }]}>{'01'}</Text>
                        <Text style={[Typography.text_heading, { color: colors.Neutral_01, }]}>{t('MonthsString')}</Text>
                        <Text style={[Typography.text_heading, { color: colors.Neutral_01, }]}>{'$ 9.00'}</Text>
                    </View>
                </View>

                <CTAButton1 title={t('Subscribe')} />

                <Text style={[Typography.text_subHeading_1, { color: colors.black, marginTop: 10 }]}>{t('WhenwillIbebilled')}</Text>
                <Text style={[Typography.text_paragraph, { color: colors.black, marginTop: 10 }]}>{t('YourItunesAccount')}</Text>
            </ScrollView>

        </View>
    );
};

export default Subscription;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        boxContainer: {
            flex: 1,
            width: '90%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20,
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
        box: {
            marginTop: 10,
            height: 44,
            width: 106,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Primary_03
        },
        subscription: {
            height: 144,
            width: 100,
            marginBottom: 20,
            borderRadius: 15,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: colors.Neutral_01,
            borderWidth: .5
        },
        subscriptionHeading: {
            width: '100%',
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
            backgroundColor: colors.White_Primary_01
        }
    });
};
