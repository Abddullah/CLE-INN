
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import { NotificationIcon } from '../../assets/icons';
import moment from 'moment';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const Notification = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('notification')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <ScrollView
                style={{ width: '85%' }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.notificationContainer}>
                    <View style={styles.list}>
                        <NotificationIcon />
                        <View style={styles.list_C1}>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[Typography.text_paragraph_1, { color: colors.black, }]}>Notification Received</Text>
                                <Text style={[Typography.text_paragraph, { color: colors.black }]}>Today | 09:24 AM</Text>
                            </View>
                            <View style={styles.newButton}>
                                <Text style={[Typography.text_paragraph, { color: colors.white }]}>{t('new')}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[Typography.text_paragraph, { textAlign: 'left', marginTop: 12, color: colors.black, marginBottom: 10 }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </Text>
                </View>
                <View style={styles.notificationContainer}>
                    <View style={styles.list}>
                        <NotificationIcon />
                        <View style={styles.list_C1}>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[Typography.text_paragraph_1, { color: colors.black, }]}>Notification Received</Text>
                                <Text style={[Typography.text_paragraph, { color: colors.black }]}>Today | 09:24 AM</Text>
                            </View>
                            {/* <View style={styles.newButton}>
                                <Text style={[Typography.text_paragraph, { color: colors.white }]}>{t('new')}</Text>
                            </View> */}
                        </View>
                    </View>
                    <Text style={[Typography.text_paragraph, { textAlign: 'left', marginTop: 12, color: colors.black, marginBottom: 10 }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </Text>
                </View>
                <View style={styles.notificationContainer}>
                    <View style={styles.list}>
                        <NotificationIcon />
                        <View style={styles.list_C1}>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[Typography.text_paragraph_1, { color: colors.black, }]}>Notification Received</Text>
                                <Text style={[Typography.text_paragraph, { color: colors.black }]}>Today | 09:24 AM</Text>
                            </View>
                            {/* <View style={styles.newButton}>
                                <Text style={[Typography.text_paragraph, { color: colors.white }]}>{t('new')}</Text>
                            </View> */}
                        </View>
                    </View>
                    <Text style={[Typography.text_paragraph, { textAlign: 'left', marginTop: 12, color: colors.black, marginBottom: 10 }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </Text>
                </View>

            </ScrollView>
        </View>
    );
};

export default Notification;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
        notificationContainer: {
            marginTop: 10, height: 110, borderBottomColor: colors.Neutral_02, borderBottomWidth: 0.5
        },
        list: {
            flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
        },
        list_C1: {
            flex: 1, flexDirection: 'row', marginLeft: 10, justifyContent: 'space-between', alignItems: 'center'
        },
        newButton: {
            width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.White_Primary_01, height: 30, borderRadius: 5
        },
    });
};
