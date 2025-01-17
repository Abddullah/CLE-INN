
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Platform, ActivityIndicator, } from 'react-native';
import { t } from 'i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
// local imports
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { Typography } from '../../utilities/constants/constant.style';
import Images from '../../assets/images'
import screenResolution from '../../utilities/constants/screenResolution';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { loginUser, showError, } from '../../store/actions/action'

export default function SignIn({ navigation }) {
    const dispatch = useDispatch()
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    let isLoader = useSelector((state) => state.reducer.isLoader);
    // const [email, setemail] = useState('provider@gmail.com');
    const [email, setemail] = useState('user@gmail.com');
    const [password, setpassword] = useState('12345678');
    const [isSelectedRemember, setisSelectedRemember] = useState(false);
    const [secureEntryState, setsecureEntryState] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setisSelectedRemember(!isSelectedRemember)
        }, 1000);
    }, [])

    const submit = () => {
        let credentials = {
            email: email,
            password: password,
        }
        // navigation.navigate('Tabs')
        dispatch(loginUser(credentials, isSelectedRemember, navigation))
        dispatch(showError())
    }

    return (
        <View style={[styles.mainContainer, { marginTop: Platform.OS === 'ios' ? 50 : 0, }]}>
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.Primary_01 }}>
                <View style={styles.containerc1_c1}>
                    <Image resizeMode='contain' style={{ width: 250, height: 120, }} source={Images.LogoWithText} />
                </View>
            </View>

            <View style={{ flex: 8, }}>
                <ScrollView contentContainerStyle={styles.containerC1}>
                    <Text style={[Typography.text_subHeading, { marginTop: 20, color: theme === 'dark' ? colors.black : colors.Primary_01 }]}>{t('pleaseLoginHere')}</Text>
                    <View style={styles.containerc1_c2}>
                        <View>
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

                        <View style={styles.checkboxContainer}>
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                <CheckBox
                                    tintColors={{
                                        true: colors.Primary_01,
                                        false: colors.Neutral_01,
                                    }}
                                    disabled={false}
                                    value={isSelectedRemember}
                                    onValueChange={setisSelectedRemember}
                                />
                                <Text style={[styles.label, Typography.text_paragraph, { textAlign: 'left' }]}>{t('rememberme')}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: 10 }}>
                                <Text style={[Typography.text_paragraph, { textAlign: 'right', color: theme === 'dark' ? colors.black : colors.Primary_01, }]} onPress={() => navigation.navigate('ForgotPassword')}>{t('forgotPassword')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <CTAButton1 title={t('signIn')} submitHandler={() => submit()} />
                        </View>
                    </View>

                    <View style={styles.containerc1_c3}>
                        <TouchableOpacity style={styles.socialText}
                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={[styles.socialTextC1, Typography.text_paragraph_1,]}>{t('donthaveaccount')} </Text>
                            <Text style={[styles.socialTextC1, Typography.text_paragraph_1, { color: theme === 'dark' ? colors.black : colors.Primary_01, fontWeight: 'bold' }]}> {t('signup')}</Text>
                        </TouchableOpacity>
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
        forget_Password: {
            fontWeight: '400',
            fontSize: RFValue(12, screenResolution.screenHeight),
            lineHeight: 16,
            letterSpacing: -0.3,
            color: theme === 'dark' ? colors.black : colors.Primary_01,
            textAlign: 'right',
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
        checkboxContainer: {
            marginTop: 5,
            flex: 1,
            flexDirection: "row",
            alignItems: 'center',
            // justifyContent: 'space-between'
        },
    });
};

