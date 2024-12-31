import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import CTAButton1 from '../../components/CTA_BUTTON1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SuccessModalBooking from '../../components/Booking_Success_Popup';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const AddReview = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    const [review, setreview] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <SuccessModalBooking modalVisible={modalVisible} setModalVisible={() => { setModalVisible(false); navigation.navigate('Home') }} navigation={navigation} />
            <CustomHeader
                title={t('addreview')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 20, width: '60%', justifyContent: 'space-evenly', }}>
                    <TouchableOpacity activeOpacity={.8}>
                        <FontAwesome name="star" size={30} color={colors.yellow} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8}>
                        <FontAwesome name="star" size={30} color={colors.yellow} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8}>
                        <FontAwesome name="star" size={30} color={colors.yellow} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8}>
                        <FontAwesome name="star" size={30} color={colors.yellow} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8}>
                        <FontAwesome name="star" size={30} color={colors.yellow} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', marginTop: 20 }}>
                    <View style={styles.heading}>
                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('comment')}</Text>
                    </View>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            keyboardType="default"
                            style={{ height: '100%', width: '100%', textAlignVertical: 'top', color: colors.black }}
                            value={review}
                            onChangeText={(e) => { setreview(e) }}
                            placeholder={t('comment')}
                            placeholderTextColor={colors.Neutral_01}
                            multiline={true}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{ width: '90%', }}>
                    <CTAButton1 title={t('send')} submitHandler={() => { setModalVisible(true); }} />
                </View>
            </View>
        </View>
    );
};


export default AddReview;

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
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        footer: {
            // flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        heading: {
            width: '100%',
            marginTop: 10,
        },
        textAreaContainer: {
            marginTop: 10,
            height: 185,
            width: '100%',
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderWidth: 1
        },
        headingText: {
            fontWeight: 'bold',
            color: colors.black,
            textAlign: 'left'
        },
    });
};


