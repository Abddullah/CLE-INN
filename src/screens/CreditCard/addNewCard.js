
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, Image, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { CardIcon } from '../../assets/icons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const AddNewCard = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    const [cardNumber, setcardNumber] = useState('');
    const [cvvNumber, setcvvNumber] = useState('');

    const [date, setDate] = useState(new Date())
    const [openBs, setopenBs] = useState(false)
    const [showBs, setshowBs] = useState(false)

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('addanewcard')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />

            <ScrollView
                style={{ width: '90%' }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >

                <View style={{ width: '100%', marginTop: 20 }}>
                    <View style={[styles.inputContiner, { height: 53, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: colors.Primary_03, borderWidth: 0 }]}>
                        <CardIcon style={{ marginLeft: 10 }} />
                        <Text style={{ color: colors.black, marginLeft: 10 }}>{t('creditDebitCard')}</Text>

                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ top: 3, color: colors.Neutral_01 }}>{t('cardNumber')}</Text>
                        {
                            isError && cardNumber == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            keyboardType='number-pad'
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={(e) => { setcardNumber(e) }}
                            placeholder={t('cardNumber')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ top: 3, color: colors.Neutral_01 }}>{t('cvvNumber')}</Text>
                        {
                            isError && cvvNumber == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            keyboardType='number-pad'
                            style={styles.input}
                            value={cvvNumber}
                            onChangeText={(e) => { setcvvNumber(e) }}
                            placeholder={t('cvvNumber')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.fieldHeading, { color: colors.Neutral_01 }]}>{t('expiryDate')}</Text>
                        {
                            isError && <Text style={{ top: 3, color: "red", top: -1 }}>*</Text>
                        }
                    </View>
                    <View style={styles.list}>
                        <View style={styles.dob}>
                            <TouchableOpacity onPress={() => { setopenBs(true) }}  >
                                {
                                    !showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.Neutral_01 }]}>{t('expiryDate')}</Text>
                                }
                                {
                                    showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.black }]}>{moment(date).format('DD MM YYYY')}</Text>
                                }
                            </TouchableOpacity>
                            <DatePicker
                                minimumDate={new Date()}
                                mode='date'
                                modal
                                open={openBs}
                                date={date}
                                onConfirm={(date) => {
                                    setopenBs(false)
                                    setDate(date)
                                    setshowBs(true)
                                }}
                                onCancel={() => {
                                    setopenBs(false)
                                    setshowBs(false)
                                }}
                            />
                            <TouchableOpacity onPress={() => { setopenBs(true) }}>
                                <Fontisto name="date" style={styles.listIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



                <View style={{ width: '100%', marginTop: 50 }}>
                    <CTAButton1 title={t('SAVE')} />
                </View>

            </ScrollView>

        </View >
    );
};

export default AddNewCard;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        profilePhoto: {
            height: 130, width: 130,
            marginTop: 10,
            justifyContent: 'center', alignItems: 'center',
            borderRadius: 100,
            borderWidth: 2,
            borderColor: colors.Primary_01,
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
        list: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            width: '100%',
            borderRadius: 5,
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderWidth: 1,

        },
        fieldHeading: {
            // marginLeft: '1%',
            // fontSize: 12,
            color: 'black',
        },
        inputContiner: {
            paddingLeft: 10,
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
        },
        input: {
            height: 50, width: "90%", color: colors.black,
            marginLeft: 7,
        },
        listIcon: {
            fontSize: RFValue(18, screenResolution.screenHeight),
            marginRight: 15,
            color: colors.Neutral_01
        },
        dob: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },
    });
};
