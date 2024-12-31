
import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'native-base';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import CTA_Setting from '../../components/CTA_SETTINGS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { onLanguageSelect } from '../../assets/language';
import { logoutUser, showError, } from '../../store/actions/action'

const Settings = ({ navigation }) => {
    const dispatch = useDispatch()
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    const [language, setlanguage] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);

    const [darkMode, setdarkMode] = useState(false);


    const toggleSwitch = (value) => {
        setlanguage(value)
        onLanguageSelect(value, setIsEnabled, isEnabled)
        setIsEnabled(previousState => !previousState);
    }

    // const darkModeHandler = () => {
    //     if (theme === 'dark') {
    //         setdarkMode(false)
    //     }
    //     else {
    //         setdarkMode(true)
    //     }
    //     toggleTheme()
    // }

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('settings')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <ScrollView
                style={{ width: '90%' }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.list, { marginTop: 30 }]}>
                    <Select
                        bg={colors.white}
                        borderWidth={0}
                        selectedValue={language}
                        minWidth="100%"
                        accessibilityLabel={t('language')}
                        placeholder={t('language')}
                        placeholderTextColor={colors.Neutral_01}
                        _selectedItem={{
                            background: colors.Primary_01
                        }}
                        mt={1} onValueChange={itemValue => toggleSwitch(itemValue)}
                    >
                        <Select.Item label="English" value="en" />
                        <Select.Item label="Italian" value="it" />
                    </Select>
                </View>

                {/* <View style={styles.list}>
                    {
                        darkMode &&
                        <Text style={[Typography.text_paragraph_1, { marginLeft: 10, color: colors.black, fontSize: 13 }]}>{t('themeModeD')}</Text>
                    }
                    {
                        !darkMode &&
                        <Text style={[Typography.text_paragraph_1, { marginLeft: 10, color: colors.black, fontSize: 13 }]}>{t('themeModeNormal')}</Text>
                    }
                    <Switch
                        trackColor={{ false: '#3e3e3e', true: '#3e3e3e' }}
                        thumbColor={darkMode ? colors.Primary_01 : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { darkModeHandler() }}
                        value={darkMode}
                    />
                </View> */}

                <CTA_Setting title={t('privacyPolicy')} icon={<AntDesign name="caretright" color={colors.Neutral_01} />} submitHandler={() => { navigation.navigate('PrivacyPolicy') }} />
                <CTA_Setting title={t('TermsConditions')} icon={<AntDesign name="caretright" color={colors.Neutral_01} />} submitHandler={() => { navigation.navigate('TermsAndCondition') }} />
                <CTA_Setting title={t('feedback')} icon={<AntDesign name="caretright" color={colors.Neutral_01} />} submitHandler={() => { navigation.navigate('Feedback') }} />
                <CTA_Setting title={t('supportandhelp')} icon={<AntDesign name="caretright" color={colors.Neutral_01} />} submitHandler={() => { navigation.navigate('Support') }} />
                <CTA_Setting
                    title={t('logout')}
                    icon={<AntDesign name="caretright" color={colors.Neutral_01} />}
                    submitHandler={() => {
                        dispatch(logoutUser(navigation))
                    }}
                />
                <CTA_Setting title={t('deletemyaccount')} icon={<AntDesign name="caretright" color={colors.Neutral_01} />} submitHandler={() => { navigation.navigate('DeleteAccount') }} />

            </ScrollView>

        </View>
    );
};

export default Settings;

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
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: 10,
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
        list: {
            // marginTop: 10,
            // flexDirection: 'row',
            // alignItems: 'center',
            // padding: 10,
            // width: '100%',
            // // borderColor: colors.Primary_01,
            // // borderWidth: 1,
            // borderRadius: 5,
            // height: 50,
            // overflow: 'hidden',
            // backgroundColor: colors.white

            width: '98%',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderWidth: theme === 'dark' ? 0.5 : 0,
            borderColor: theme === 'dark' ? colors.black : null,
            borderRadius: 7,
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
    });
};
