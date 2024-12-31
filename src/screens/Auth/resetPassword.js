
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
// local imports
import Images from '../../assets/images'
import Feather from 'react-native-vector-icons/Feather';
import { BackIcon } from '../../assets/icons';
import { Typography } from '../../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import screenResolution from '../../utilities/constants/screenResolution';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { signIn, showError, } from '../../store/actions/action'

export default function ResetPassword({ navigation }) {
    const dispatch = useDispatch()
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    let isLoader = useSelector((state) => state.reducer.isLoader);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [rePassword, setrePassword] = useState('');
    const [isSelectedRemember, setisSelectedRemember] = useState(false);
    const [secureEntryState, setsecureEntryState] = useState(true);
    const [secureEntryState1, setsecureEntryState1] = useState(true);

    const submit = () => {
        let credentials = {
            email: email,
        }
        navigation.navigate('Signin')
        // dispatch(signIn(credentials, isSelectedRemember, navigation))
        // dispatch(showError())
    }

    return (
        <View style={[styles.mainContainer, { marginTop: Platform.OS === 'ios' ? 50 : 0, }]}>
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.Primary_01 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={.8}
                    style={{ position: 'absolute', left: 20, top: 20 }}
                >
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.containerc1_c1}>
                    <Image resizeMode='contain' style={{ width: 250, height: 120, }} source={Images.LogoWithText} />
                </View>
            </View>

            <View style={{ flex: 8, }}>
                <ScrollView contentContainerStyle={styles.containerC1}>
                    <Text style={[Typography.text_subHeading, { marginTop: 20, color: theme === 'dark' ? colors.black : colors.Primary_01, }]}>{t('changePassword')}</Text>
                    <Text style={[styles.socialTextC1, Typography.text_subHeading_1, { fontWeight: 'normal', marginTop: 10, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }]}>{t('enteryournewpassword')} </Text>

                    <View style={styles.containerc1_c2}>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('password')}</Text>
                                {
                                    isError && password == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </View>
                            <View style={styles.inputContiner}>
                                <TextInput
                                    secureTextEntry
                                    style={styles.input}
                                    value={password}
                                    onChangeText={(e) => { setpassword(e) }}
                                    placeholder={t('password')}
                                    placeholderTextColor={colors.Neutral_01}
                                />
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}
                                    activeOpacity={.8}
                                    onPress={() => { setsecureEntryState(!secureEntryState) }}
                                >
                                    <Feather
                                        name={secureEntryState ? 'eye' : 'eye-off'}
                                        style={{ fontSize: RFValue(20, screenResolution.screenHeight), color: colors.White_Primary_01, }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('confirmpassword')}</Text>
                                {
                                    isError && password == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </View>
                            <View style={styles.inputContiner}>
                                <TextInput
                                    secureTextEntry
                                    style={styles.input}
                                    value={rePassword}
                                    onChangeText={(e) => { setrePassword(e) }}
                                    placeholder={t('confirmpassword')}
                                    placeholderTextColor={colors.Neutral_01}
                                />
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}
                                    activeOpacity={.8}
                                    onPress={() => { setsecureEntryState1(!secureEntryState1) }}
                                >
                                    <Feather
                                        name={secureEntryState1 ? 'eye' : 'eye-off'}
                                        style={{ fontSize: RFValue(20, screenResolution.screenHeight), color: colors.White_Primary_01, }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <CTAButton1 title={t('save')} submitHandler={() => submit()} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: colors.white,
        },
        containerC1: {
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: '10%',
            paddingBottom: 50
        },
        text: {
            fontWeight: '700',
            fontSize: RFValue(24, screenResolution.screenHeight),
            lineHeight: 32,
            letterSpacing: -0.3,
            color: colors.black
        },
        label: {
            color: colors.black
        },
        textInputYourEmail: {
            fontWeight: '700',
            fontSize: RFValue(16, screenResolution.screenHeight),
            lineHeight: 22,
            letterSpacing: -0.3,
            color: colors.black,
            marginBottom: 50
        },
        containerc1_c1: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        containerc1_c2: {
            width: '100%',
        },
        containerc1_c3: {
            width: '100%',
            justifyContent: 'flex-end',
        },
        inputContiner: {
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        input: {
            height: 50,
            color: colors.black,
            fontSize: RFValue(14, screenResolution.screenHeight),
            width: '90%'
        },
        socialText: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        socialTextC1: {
            fontSize: RFValue(16, screenResolution.screenHeight),
            color: colors.Neutral_01,
            fontWeight: 'normal',
            textAlign: 'center',
        },
        socialIcon: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        iconSize: {
            width: 50,
            height: 50,
        },
        checkboxContainer: {
            marginTop: 5,
            flexDirection: "row",
            alignItems: 'center'
        },
    });
};

