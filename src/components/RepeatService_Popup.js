import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import { useTheme } from '../../ThemeContext';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { Typography } from '../utilities/constants/constant.style';
import screenResolution from '../utilities/constants/screenResolution';
import CTAButton1 from './CTA_BUTTON1';

const RepeatService = ({ modalVisible, setModalVisible, }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    const [selected, setSelected] = useState(t('oneTime'));
    const [selected2, setSelected2] = useState('One Time');

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(selected2) }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <TouchableOpacity style={styles.choosContainer}>
                        <Text style={[Typography.text_heading, { fontWeight: '900' }]}>{t('chooseyourfreq')}</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, width: '100%', marginTop: 20, justifyContent: 'flex-start', alignItems: 'center', }}>

                        <TouchableOpacity
                            onPress={() => { setSelected(t('weekly')); setSelected2('Weekly') }}
                            activeOpacity={.8}
                            style={[styles.cardContainer, {

                                borderWidth: 1,
                                borderColor: selected === t('weekly') ? colors.BothPrimary_01 : colors.Neutral_01,
                                backgroundColor: selected === t('weekly') ? '#EBFAFF' : colors.white
                            }]}>
                            <View style={{ position: 'absolute', top: -18, left: 0, width: 120, borderRadius: 5, backgroundColor: colors.BothPrimary_01 }}>
                                <Text style={[Typography.text_subHeading_1, { color: colors.white }]}>{t('mostPopular')}</Text>
                            </View>

                            <View style={styles.cardContainer_C1}>
                                <Text style={[Typography.text_subHeading, { color: colors.black }]}>{t('weekly')}</Text>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={styles.radioButtonContainer}
                                    onPress={() => { setSelected(t('weekly')); setSelected2('Weekly') }}
                                >
                                    <View style={styles.radioButton}>
                                        {selected === t('weekly') && <View style={styles.radioButtonSelected} />}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardContainer_C2}>
                                <View style={styles.discount}>
                                    <Text style={[Typography.text_paragraph_1, { color: '#5C9E73', fontWeight: 'bold' }]}>{'10% Off'}</Text>
                                </View>
                            </View>

                            <View style={styles.cardContainer_C3}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[Typography.text_paragraph_1, { marginRight: 5 }]}>•</Text>
                                    <Text style={Typography.text_paragraph_1}>{t('enjoyhavingthesame')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={[Typography.text_paragraph_1, { marginRight: 5 }]}>•</Text>
                                    <Text style={Typography.text_paragraph_1}>{t('pauseorcancelanytime')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => { setSelected(t('every2weeks')); setSelected2('Every 2 weeks') }}
                            activeOpacity={.8}
                            style={[styles.cardContainer, {
                                borderWidth: 1,
                                borderColor: selected === t('every2weeks') ? colors.BothPrimary_01 : colors.Neutral_01,
                                backgroundColor: selected === t('every2weeks') ? '#EBFAFF' : colors.white
                            }]}>
                            <View style={styles.cardContainer_C1}>
                                <Text style={[Typography.text_subHeading, { color: colors.black }]}>{t('every2weeks')}</Text>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={styles.radioButtonContainer}
                                    onPress={() => { setSelected(t('every2weeks')); setSelected2('Every 2 weeks') }}
                                >
                                    <View style={styles.radioButton}>
                                        {selected === t('every2weeks') && <View style={styles.radioButtonSelected} />}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardContainer_C2}>
                                <View style={styles.discount}>
                                    <Text style={[Typography.text_paragraph_1, { color: '#5C9E73', fontWeight: 'bold' }]}>{'5% Off'}</Text>
                                </View>
                            </View>

                            <View style={styles.cardContainer_C3}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[Typography.text_paragraph_1, { marginRight: 5 }]}>•</Text>
                                    <Text style={Typography.text_paragraph_1}>{t('enjoyhavingthesame2')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={[Typography.text_paragraph_1, { marginRight: 5 }]}>•</Text>
                                    <Text style={Typography.text_paragraph_1}>{t('pauseorcancelanytime')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setSelected(t('oneTime')); setSelected2('One Time') }}
                            activeOpacity={.8}
                            style={[styles.cardContainer, {
                                paddingVertical: '3%',
                                height: screenResolution.screenHeight / 10 * 1.2,
                                borderWidth: 1,
                                borderColor: selected === t('oneTime') ? colors.BothPrimary_01 : colors.Neutral_01,
                                backgroundColor: selected === t('oneTime') ? '#EBFAFF' : colors.white
                            }]}>

                            <View style={styles.cardContainer_C1}>
                                <Text style={[Typography.text_subHeading, { color: colors.black }]}>{t('oneTime')}</Text>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={styles.radioButtonContainer}
                                    onPress={() => { setSelected(t('oneTime')); setSelected2('One Time') }}
                                >
                                    <View style={styles.radioButton}>
                                        {selected === t('oneTime') && <View style={styles.radioButtonSelected} />}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardContainer_C3}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[Typography.text_paragraph_1, { marginRight: 5 }]}>•</Text>
                                    <Text style={Typography.text_paragraph_1}>{t('perfectPickwhen')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: '90%', marginTop: 20 }}>
                            <CTAButton1 title={t('selectRepeatService')} submitHandler={() => { setModalVisible(selected2) }} />
                        </View>

                    </View>

                </View>
            </View>
        </Modal>
    );
};


const createStyles = (colors, theme) => {
    const cardHeight = (screenResolution.screenHeight / 5);

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            height: '90%',
            width: '100%',
            overflow: 'hidden',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: 'white',
            // alignItems: 'flex-start',
            // justifyContent: 'flex-start',
        },
        modalText: {
            marginTop: 50,
        },
        radioButtonContainer: {
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 10,
        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.White_Primary_01,
            alignItems: 'center',
            justifyContent: 'center',
        },
        radioButtonSelected: {
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: colors.White_Primary_01,
        },
        choosContainer: {
            height: 50,
            width: '100%',
            paddingLeft: '5%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderBottomColor: colors.Neutral_01,
            borderBottomWidth: .5,
        },
        cardContainer: {
            // minHeight: 140,
            height: cardHeight,
            width: '90%',
            borderRadius: 5,
            marginTop: 20
            // borderColor: colors.BothPrimary_01,
            // borderWidth: 1,
            // backgroundColor: '#EBFAFF'

        },
        cardContainer_C1: {
            flex: 1.5,
            flexDirection: 'row',
            width: '90%',
            marginHorizontal: '5%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cardContainer_C2: {
            flex: 1.5,
            width: '90%',
            marginHorizontal: '5%',
            // paddingHorizontal: '5%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderBottomColor: colors.Neutral_01,
            borderBottomWidth: .5

        },
        cardContainer_C3: {
            flex: 2,
            width: '90%',
            marginHorizontal: '5%',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        discount: {
            height: 30,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#D0EEE9'

        },
    });
};

export default RepeatService;