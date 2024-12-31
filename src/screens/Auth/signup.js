
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import Toast from 'react-native-toast-message';
// local imports
import Images from '../../assets/images'
import { BackIcon } from '../../assets/icons';
import Feather from 'react-native-vector-icons/Feather';
import { Typography } from '../../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import screenResolution from '../../utilities/constants/screenResolution';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { registerUser, showError, } from '../../store/actions/action'

export default function Signup({ navigation }) {
    const dispatch = useDispatch()
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    const [fullName, setfullName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [rePassword, setrePassword] = useState('');
    const [secureEntryState, setsecureEntryState] = useState(true);
    const [secureEntryState1, setsecureEntryState1] = useState(true);

    const submit = () => {
        let credentials = {
            fullName,
            email,
            password,
            rePassword,
            role: 'user',
            dob: '',
            phone: '',
            gender: '',
            address: '',
            profilePhoto: '',
        }
        // navigation.navigate('OtpVerify')
        // dispatch(registerUser(credentials, navigation))
        // dispatch(showError())
        password !== '' && email != '' && dispatch(registerUser(credentials, navigation))
        dispatch(showError())
    }

    return (
        <View style={[styles.mainContainer, { marginTop: Platform.OS === 'ios' ? 50 : 0, }]}>

            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.Primary_01 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signin')}
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
                    <Text style={[Typography.text_subHeading, { marginTop: 20, color: theme === 'dark' ? colors.black : colors.Primary_01 }]}>{t('pleaseRegisterHere')}</Text>
                    <View style={styles.containerc1_c2}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('fullname')}</Text>
                                {
                                    isError && fullName == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </View>
                            <View style={styles.inputContiner}>
                                <TextInput
                                    style={styles.input}
                                    value={fullName}
                                    onChangeText={(e) => { setfullName(e) }}
                                    placeholder={t('fullname')}
                                    placeholderTextColor={colors.Neutral_01}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('emailAddress')}</Text>
                                {
                                    isError && email == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </View>
                            <View style={styles.inputContiner}>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={(e) => { setemail(e) }}
                                    placeholder={t('email')}
                                    placeholderTextColor={colors.Neutral_01}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('password')}</Text>
                                {
                                    isError && password == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </View>
                            <View style={styles.inputContiner}>
                                <TextInput
                                    secureTextEntry={secureEntryState}
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
                                    secureTextEntry={secureEntryState1}
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
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: 20 }}>
                            <Text style={[Typography.text_paragraph, { textAlign: 'right', color: theme === 'dark' ? colors.black : colors.Primary_01, }]} onPress={() => Alert.alert('Under Development')}>{t('registerasacleaner')}</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 20 }}>
                            <CTAButton1 title={t('signup')} submitHandler={() => submit()} />
                        </View>
                    </View>

                    <View style={styles.containerc1_c3}>
                        <TouchableOpacity style={styles.socialText}
                            onPress={() => navigation.navigate('Signin')}
                        >
                            <Text style={[styles.socialTextC1, Typography.text_paragraph_1,]}>{t('alreadyhaveanaccount')} </Text>
                            <Text style={[styles.socialTextC1, Typography.text_paragraph_1, { color: theme === 'dark' ? colors.black : colors.Primary_01, fontWeight: 'bold' }]}> {t('signIn')}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

const createStyles = (colors) => {
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
            marginTop: 20
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
            lineHeight: 38,
            letterSpacing: -0.3,
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
            flexDirection: "row",
            alignItems: 'center'
        },
        list: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderColor: colors.Primary_01,
            borderWidth: 1,
            borderRadius: 7,
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.white
        },
    });
};
