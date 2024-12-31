
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { RFValue } from "react-native-responsive-fontsize";
import { t } from 'i18next';
// local imports
import Images from '../../assets/images'
import { BackIcon } from '../../assets/icons';
import { Typography } from '../../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import screenResolution from '../../utilities/constants/screenResolution';
import CTAButton1 from '../../components/CTA_BUTTON1';
import SuccessModal from '../../components/Success_Popup';
import { signIn, showError, } from '../../store/actions/action'


export default function OtpVerify({ navigation }) {
    const dispatch = useDispatch()
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    let isLoader = useSelector((state) => state.reducer.isLoader);
    const CELL_COUNT = 6;
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    const submit = () => {
        setModalVisible(true)
        let credentials = {
            token: value,
        }
        // dispatch(signIn(credentials, isSelectedRemember, navigation))
        // dispatch(showError())
    }

    const modalClose = () => {
        setModalVisible(false)
        navigation.navigate('Signin')
    }

    return (
        <View style={[styles.mainContainer, { marginTop: Platform.OS === 'ios' ? 50 : 0, }]}>
            <SuccessModal modalVisible={modalVisible} setModalVisible={() => modalClose()} navigation={navigation} />
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
            <View style={{ flex: 8, width: '90%', marginHorizontal: '5%', justifyContent: 'space-between', }}>
                <View>
                    <Text style={[Typography.text_subHeading, { marginTop: 20, color: theme === 'dark' ? colors.black : colors.Primary_01, }]}>{t('otp')}</Text>
                    <Text style={[styles.socialTextC1, Typography.text_subHeading_1, { fontWeight: 'normal', marginTop: 20 }]}>{t('enter6digitcode')} </Text>
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.inputContiner}>
                            <CodeField
                                ref={ref}
                                {...props}
                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                                testID="my-code-input"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                    </View>
                    <Text style={[Typography.text_subHeading, { marginTop: 30, color: theme === 'dark' ? colors.black : colors.Primary_01, }]}>{'00:54'}</Text>
                    <Text style={[styles.socialTextC1, Typography.text_subHeading_1, {}]}>{t('sendagain')} </Text>
                </View>
                <View style={styles.containerc1_c2}>
                    {
                        value.length >= 6 &&
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <CTAButton1 title={t('verify')} submitHandler={() => submit()} />
                        </View>
                    }
                </View>
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
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red'
        },
        input: {
            height: 50, width: "90%", color: colors.black,
            marginLeft: 7,
            fontWeight: 'bold'
        },
        forget_Password: {
            fontWeight: '400',
            fontSize: RFValue(12, screenResolution.screenHeight),
            lineHeight: 16,
            letterSpacing: -0.3,
            color: colors.Primary_01,
            textAlign: 'right',
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

        root: { flex: 1, padding: 20 },
        title: {
            textAlign: 'center',
            fontSize: RFValue(30, screenResolution.screenHeight),
        },
        codeFieldRoot: { marginTop: 0 },
        cell: {
            margin: '1.5%',
            width: 40,
            height: 40,
            lineHeight: 38,
            fontSize: RFValue(24, screenResolution.screenHeight),
            borderWidth: 2,
            borderColor: theme === 'dark' ? colors.Primary_01 : colors.Neutral_01,
            textAlign: 'center',
            color: colors.black
        },
        focusCell: {
            borderColor: colors.White_Primary_01,
            color: colors.black
        },
    });
};
