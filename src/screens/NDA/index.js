import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Typography } from "../../utilities/constants/constant.style";
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import CustomHeader from "../../components/Header";
import SignatureComponent from "../../components/Signature";
import { t } from 'i18next';
import CTAButton1 from "../../components/CTA_BUTTON1";
import { RFValue } from "react-native-responsive-fontsize";
import screenResolution from "../../utilities/constants/screenResolution";

const SignatureScreen = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    const [modalVisible, setModalVisible] = useState(false);
    const [signature, setSign] = useState(null);
    const [fullName, setfullName] = useState('');


    const [modalVisible1, setModalVisible1] = useState(false);
    const [signature1, setSign1] = useState(null);
    const [fullName1, setfullName1] = useState('');


    return (
        <View style={styles.container}>
            <SignatureComponent modalVisible={modalVisible} setModalVisible={() => { setModalVisible(false) }} setSign={setSign} />
            <SignatureComponent modalVisible={modalVisible1} setModalVisible={() => { setModalVisible1(false) }} setSign={setSign1} />
            <CustomHeader
                title={t('NDA')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <ScrollView
                style={{ width: '90%', marginTop: 10 }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ width: '100%' }}>
                    <Text style={[Typography.text_subHeading, { fontWeight: 'bold', color: colors.black, textAlign: 'left' }]}>{t('NonDisclosure')}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginTop: 10, textAlign: 'left' }]}>
                        By applying for this job, you agree to keep all confidential information you receive from the client strictly private and confidential. You are not allowed to share, disclose, or use any confidential information for any purpose other than providing the agreed-upon services. This agreement is effective from the date of acceptance of the job and remains in place indefinitely, unless explicitly released from these obligations by the client in writing.
                    </Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginTop: 10, textAlign: 'left' }]}>
                        Violation of this agreement may result in legal action.
                    </Text>
                </View>

                <View style={styles.nameContainer}>
                    <View style={{ width: '50%', height: 48, justifyContent: 'center' }}>
                        <Text style={[Typography.text_paragraph, { textAlign: 'left', fontWeight: 'bold', color: colors.black, }]}>{t('jobCreatorName')}</Text>
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            style={[styles.input, Typography.text_paragraph, { textAlign: 'left' }]}
                            value={fullName}
                            onChangeText={(e) => { setfullName(e) }}
                            placeholder={'Name'}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={styles.nameContainer}>
                    <View style={{ width: '50%', height: 48, justifyContent: 'center' }}>
                        <Text style={[Typography.text_paragraph, { textAlign: 'left', fontWeight: 'bold', color: colors.black, }]}>{t('jobCreatorSignature')}</Text>
                    </View>
                    {
                        signature ? (
                            <TouchableOpacity
                                style={styles.preview}
                                onPress={() => setModalVisible(true)}
                            >
                                <Image
                                    resizeMode={"contain"}
                                    style={{ width: 335, height: 114 }}
                                    source={{ uri: signature }}
                                />
                            </TouchableOpacity>
                        ) :
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={[styles.inputContiner, { justifyContent: 'center', alignItems: 'flex-start' }]}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={[Typography.text_paragraph, { textAlign: 'left', color: colors.Neutral_01, }]}>{t('taphereforsignature')}</Text>
                            </TouchableOpacity>
                    }
                </View>

                <View style={styles.nameContainer}>
                    <View style={{ width: '50%', height: 48, justifyContent: 'center' }}>
                        <Text style={[Typography.text_paragraph, { textAlign: 'left', fontWeight: 'bold', color: colors.black, }]}>{t('serviceproviderName')}</Text>
                    </View>
                    <View style={[styles.inputContiner]}>
                        <TextInput
                            style={[styles.input, Typography.text_paragraph, { textAlign: 'left' }]}
                            value={fullName1}
                            onChangeText={(e) => { setfullName1(e) }}
                            placeholder={'Name'}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={styles.nameContainer}>
                    <View style={{ width: '50%', height: 48, justifyContent: 'center' }}>
                        <Text style={[Typography.text_paragraph, { textAlign: 'left', fontWeight: 'bold', color: colors.black, }]}>{t('serviceproviderSignature')}</Text>
                    </View>
                    {
                        signature1 ? (
                            <TouchableOpacity
                                style={styles.preview}
                                onPress={() => setModalVisible1(true)}
                            >
                                <Image
                                    resizeMode={"contain"}
                                    style={{ width: 335, height: 114 }}
                                    source={{ uri: signature1 }}
                                />
                            </TouchableOpacity>
                        ) :
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={[styles.inputContiner, { justifyContent: 'center', alignItems: 'flex-start' }]}
                                onPress={() => setModalVisible1(true)}
                            >
                                <Text style={[Typography.text_paragraph, { textAlign: 'left', color: colors.Neutral_01, }]}>{t('taphereforsignature')}</Text>
                            </TouchableOpacity>
                    }
                </View>

                <View style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
                    <CTAButton1 title={t('apply')} submitHandler={() => { navigation.navigate('Home') }} />
                </View>

            </ScrollView>
        </View>
    );
};

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
        preview: {
            width: '50%',
            height: 50,
            backgroundColor: "#F8F8F8",
            justifyContent: "center",
            alignItems: "center",
        },
        nameContainer: {
            borderBottomColor: colors.Neutral_02,
            borderBottomWidth: 1,
            flexDirection: 'row',
            width: '100%',
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20
        },
        inputContiner: {
            height: 48,
            width: '50%',
            backgroundColor: colors.white,
            justifyContent: 'center',
        },
        input: {
            // fontSize: RFValue(7, screenResolution.screenWidth),
            width: "100%",
            color: colors.black,
            padding: 0,
            margin: 0,
            lineHeight: RFValue(14, screenResolution.screenWidth),
        },
    });
};


export default SignatureScreen