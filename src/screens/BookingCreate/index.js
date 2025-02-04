import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, } from 'react-native';
import { useSelector } from 'react-redux';
import { Select } from 'native-base';
import DatePicker from 'react-native-date-picker';
import { RFValue } from "react-native-responsive-fontsize";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { t } from 'i18next';

import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { Typography } from '../../utilities/constants/constant.style';
import screenResolution from '../../utilities/constants/screenResolution';
import CustomHeader from '../../components/Header';
import CTAButton1 from '../../components/CTA_BUTTON1';
import HorizontalList from '../../components/horizontalList';
import BookingStatusTab from '../../components/BookingStatusTab';
import RepeatService from '../../components/RepeatService_Popup';
import AdditionalServices from '../../components/AdditionalServices';
import InformationPopup from '../../components/Information_Popup';

const deviceWidth = screenResolution.screenWidth;

const CreateBooking = ({ navigation }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme, deviceWidth);
    let user = useSelector((state) => state.reducer.user);
    let isError = useSelector((state) => state.reducer.isError);

    const [modalVisible, setModalVisible] = useState(true);
    const [selectedHour, setselectedHour] = useState('');
    const [selectedProfessional, setselectedProfessional] = useState('');
    const [step, setstep] = useState(0);
    const [instructions, setinstructions] = useState('');
    const [date, setDate] = useState(new Date())
    const [openBs, setopenBs] = useState(false)
    const [showBs, setshowBs] = useState(false)
    const [timeSlots, settimeSlots] = useState([
        {
            startTime: '08:00 am',
            endTime: '10:00 am',
            isSelected: false
        },
        {
            startTime: '10:00 am',
            endTime: '12:00 pm',
            isSelected: false
        },
        {
            startTime: '12:00 pm',
            endTime: '02:00 pm',
            isSelected: false
        },
        {
            startTime: '02:00 pm',
            endTime: '04:00 pm',
            isSelected: false
        },
        {
            startTime: '04:00 pm',
            endTime: '06:00 pm',
            isSelected: false
        },
        {
            startTime: '06:00 pm',
            endTime: '08:00 pm',
            isSelected: false
        },
        {
            startTime: '08:00 pm',
            endTime: '10:00 pm',
            isSelected: false
        },
    ])

    const [roomsize, setroomsize] = useState('');
    const [roomsQty, setroomsQty] = useState('1');
    const [totalPrice, settotalPrice] = useState('5');
    const [selectedTab, setselectedTab] = useState('');

    const [informationPopup, setinformationPopup] = useState(false);
    const [informationPopup1, setinformationPopup1] = useState(false);
    const [location, setlocation] = useState('')

    const timeSlotHandler = (index) => {
        const updatedTimeSlots = timeSlots.map((slot, i) => ({
            ...slot,
            isSelected: i === index,
        }));
        settimeSlots(updatedTimeSlots);
    };

    const stepsHandler = () => {
        if (step < 3) {
            setstep(step + 1)
        } else {
            // navigation.navigate('Home')
            navigation.navigate('SignatureScreen')
        }
    }

    const backHandler = () => {
        if (step === 0) {
            navigation.goBack()
        } else {
            setstep(step - 1)
        }
    }


    const roomHandler = (itemValue) => {
        setroomsQty(itemValue)
        const roomCount = parseInt(itemValue.split('-')[0], 10);
        const pricePerRoom = 5;
        const totalPrice = roomCount * pricePerRoom;
        settotalPrice(totalPrice);
    }

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('bookservice')}
                isLeft={true}
                leftPress={() => { backHandler() }}
            />

            {
                user.role !== 'provider' && <RepeatService modalVisible={modalVisible} setModalVisible={() => setModalVisible(false)} />
            }

            <InformationPopup modalVisible={informationPopup} setModalVisible={() => setinformationPopup(false)} info={1} />
            <InformationPopup modalVisible={informationPopup1} setModalVisible={() => setinformationPopup1(false)} info={2} />

            {
                step === 0 &&
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%', }}>

                    <View style={styles.body}>
                        <View style={{ width: '90%', }}>
                            <View style={styles.heading}>
                                <TouchableOpacity
                                    onPress={() => { setinformationPopup(!informationPopup) }}
                                    activeOpacity={.8}
                                    style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, }}
                                >
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('howmanyhoursdoyou')}</Text>
                                    <FontAwesome5 name="info-circle" style={{ fontSize: RFValue(18, screenResolution.screenHeight), color: colors.White_Primary_01, marginLeft: 5 }} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalScroll}
                            >
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'1'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'2'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'3'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'4'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'5'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'6'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'7'} />
                                <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'8'} />
                            </ScrollView>
                            <View style={[styles.heading, { marginTop: 30 }]}>
                                <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('howmanyprofessional')}</Text>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalScroll}
                            >
                                <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'1'} />
                                <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'2'} />
                                <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'3'} />
                                <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'4'} />
                            </ScrollView>

                            <View style={{ marginTop: 30 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('areaSize')}</Text>
                                    {/* {
                                    isError && roomsize == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                } */}
                                </View>
                                <View style={styles.list}>
                                    <Select
                                        bg={colors.white}
                                        borderWidth={0}
                                        selectedValue={roomsize}
                                        minWidth="100%"
                                        accessibilityLabel="User"
                                        placeholder={t('areaSize')}
                                        placeholderTextColor={colors.Neutral_01}
                                        _selectedItem={{
                                            background: colors.Primary_01,
                                        }}
                                        color={colors.Neutral_01}
                                        mt={1} onValueChange={itemValue => setroomsize(itemValue)}
                                    >
                                        <Select.Item label="Less than 50 m2" value="Less than 50 m2" />
                                        <Select.Item label="51 - 100 m2" value="51 - 100 m2" />
                                        <Select.Item label="101 - 150 m2" value="101 - 150 m2" />
                                        <Select.Item label="151 - 200 m2" value="151 - 200 m2" />
                                        <Select.Item label="Over 200 m2" value="Over 200 m2" />
                                    </Select>
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('roomsNumber')}</Text>
                                    {/* {
                                    isError && roomsize == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                } */}
                                </View>
                                <View style={styles.list}>
                                    <Select
                                        bg={colors.white}
                                        borderWidth={0}
                                        selectedValue={roomsQty}
                                        minWidth="100%"
                                        accessibilityLabel="User"
                                        placeholder={t('roomsNumber')}
                                        placeholderTextColor={colors.Neutral_01}
                                        _selectedItem={{
                                            background: colors.Primary_01,
                                        }}
                                        color={colors.Neutral_01}
                                        mt={1} onValueChange={itemValue => roomHandler(itemValue)}
                                    >
                                        <Select.Item label="Studio" value="Studio" />
                                        <Select.Item label="1 Room" value="1 Room" />
                                        <Select.Item label="2 Rooms" value="2 Rooms" />
                                        <Select.Item label="3 Rooms" value="3 Rooms" />
                                        <Select.Item label="4 Rooms" value="4 Rooms" />
                                        <Select.Item label="5 Rooms" value="5 Rooms" />
                                    </Select>
                                </View>
                            </View>

                            {/* <Text style={[Typography.text_paragraph_1, styles.headingText, { marginTop: 30 }]}>{t('needCleaningMaterials')}</Text> */}


                            <TouchableOpacity
                                onPress={() => { setinformationPopup1(!informationPopup1) }}
                                activeOpacity={.8}
                                style={{ flexDirection: 'row', marginTop: 30, }}
                            >
                                <Text style={[Typography.text_paragraph_1, styles.headingText, {}]}>{t('needCleaningMaterials')}</Text>
                                <FontAwesome5 name="info-circle" style={{ fontSize: RFValue(18, screenResolution.screenHeight), color: colors.White_Primary_01, marginLeft: 5 }} />
                            </TouchableOpacity>

                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                                <BookingStatusTab selectedState={selectedTab} setselectedState={setselectedTab} title={t('noIhavethem')} />
                                <BookingStatusTab selectedState={selectedTab} setselectedState={setselectedTab} title={t('yesPlease')} />
                            </View>

                            {/* <AdditionalServices /> */}
                        </View>
                    </View>
                </ScrollView >
            }

            {
                step === 1 &&
                <View style={styles.body}>
                    <View style={{ width: '90%', }}>
                        {/* Heading */}
                        <View style={styles.heading}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('whenwouldyoulike')}</Text>
                        </View>

                        {/* Date Section */}
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.fieldHeading, { color: colors.Neutral_01 }]}>{t('selectDate')}</Text>
                                {isError && <Text style={{ top: 3, color: "red", top: -1 }}>*</Text>}
                            </View>

                            <View style={styles.list}>
                                <View style={styles.dob}>
                                    {/* Date Picker */}
                                    <TouchableOpacity onPress={() => { setopenBs(true) }}  >
                                        {!showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.Neutral_01 }]}>{t('selectDate')}</Text>}
                                        {showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.black }]}>{moment(date).format('DD MM YYYY')}</Text>}
                                    </TouchableOpacity>

                                    <DatePicker
                                        minimumDate={new Date()}
                                        mode='date'
                                        modal
                                        open={openBs}
                                        date={date}
                                        onConfirm={(date) => {
                                            setopenBs(false);
                                            setDate(date);
                                            setshowBs(true);
                                        }}
                                        onCancel={() => {
                                            setopenBs(false);
                                            setshowBs(false);
                                        }}
                                    />

                                    {/* Date Icon */}
                                    <TouchableOpacity onPress={() => { setopenBs(true) }}>
                                        <Fontisto name="date" style={styles.listIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Time Section */}
                        <View style={styles.heading}>
                            <Text style={[styles.listText, { color: colors.Neutral_01 }]}>{t('selectTime')}</Text>
                        </View>
                        <FlatList
                            data={timeSlots}
                            contentContainerStyle={[styles.timeFlatList,]}
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={[
                                        styles.timeContainer,
                                        { borderColor: item.isSelected ? colors.White_Primary_01 : colors.Neutral_02 },
                                    ]}
                                    onPress={() => timeSlotHandler(index)}
                                >
                                    <Text style={[styles.listText, { color: colors.black, fontSize: RFValue(12, screenResolution.screenHeight) }]}>{item.startTime}</Text>
                                    <Text style={[styles.listText, { color: colors.black, fontSize: RFValue(12, screenResolution.screenHeight) }]}>{t('to')}</Text>
                                    <Text style={[styles.listText, { color: colors.black, fontSize: RFValue(12, screenResolution.screenHeight) }]}>{item.endTime}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            }

            {
                step === 2 &&
                <View style={styles.body}>
                    <View style={{ width: '90%', }}>
                        <View style={styles.heading}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('location')}</Text>
                        </View>
                        <View style={styles.inputContiner}>
                            <TextInput
                                keyboardType='number-pad'
                                style={{ color: colors.black }}
                                value={location}
                                onChangeText={(e) => { setlocation(e) }}
                                placeholder={t('location')}
                                placeholderTextColor={colors.Neutral_01}
                            />
                            <Feather name="map-pin" style={styles.listIcon} />
                        </View>
                        <View style={styles.heading}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('anyspecificinstruction')}</Text>
                        </View>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                keyboardType="default"
                                style={{ height: '100%', width: '100%', textAlignVertical: 'top', color: colors.black }}
                                value={instructions}
                                onChangeText={(e) => { setinstructions(e) }}
                                placeholder={t('yourtext')}
                                placeholderTextColor={colors.Neutral_01}
                                multiline={true}
                            />
                        </View>
                    </View>
                </View>
            }

            {
                step === 3 &&
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%', }}>
                    <View style={{ width: '90%', }}>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('service')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'Cleaning at Home'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('description')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'This is text description'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('cleaners')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'3'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('workFrequency')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'Weekly'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('areaSize')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'51 - 100 m2'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('roomsNumber')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'1 Room'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('needCleaningMaterials')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'Yes Please'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('price')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'€30/hr'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('selectDate')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText,]}>{'8 Jan, 2024'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('selectTime')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'10:00 AM - 12:00 AM'}</Text>
                        </View>

                        <View style={[styles.heading, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('location')}</Text>
                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{'Jameria Residence'}</Text>
                        </View>

                        <View style={styles.taxContainer}>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('pay') + ':'}</Text>

                            <View style={styles.taxContainer_C1}>
                                <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('amount')}</Text>
                                <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€450'}</Text>
                            </View>

                            <View style={styles.taxContainer_C1}>
                                <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('vat')}</Text>
                                <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€50'}</Text>
                            </View>

                            <View style={styles.taxContainer_C1}>
                                <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('total')}</Text>
                                <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€500'}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }

            <View style={styles.footer}>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', }}>
                    {
                        (roomsQty != '') ? (
                            <>
                                <View style={{ width: '45%', justifyContent: 'center', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('total') + ': '}</Text>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{'€' + ' '}</Text>
                                        {
                                            selectedTab === t('yesPlease') && <Text style={[Typography.text_paragraph_1, styles.headingText]}>{totalPrice + 5}</Text>
                                        }
                                        {
                                            selectedTab !== t('yesPlease') && <Text style={[Typography.text_paragraph_1, styles.headingText]}>{totalPrice}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={{ width: '45%', }}>
                                    <CTAButton1 title={step < 4 ? t('next') : t('book')} submitHandler={() => { stepsHandler() }} />
                                </View>
                            </>

                        ) : (<CTAButton1 title={step < 4 ? t('next') : t('book')} submitHandler={() => { stepsHandler() }} />)
                    }
                </View>
            </View>

        </View>
    );
};

export default CreateBooking;

const createStyles = (colors, theme, deviceWidth) => {
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
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
            backgroundColor: colors.white,
            borderTopColor: colors.Neutral_02,
            borderTopWidth: .3,
            paddingTop: 5
        },
        heading: {
            width: '100%',
            marginTop: 10,
        },
        headingText: {
            fontWeight: 'bold',
            color: colors.black,
            textAlign: 'left'
        },
        editText: {
            textAlign: 'left',
            color: colors.black
        },
        horizontalScroll: {
            flexDirection: 'row',
            marginTop: 10,
            width: '100%',
            height: 40,
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
        dob: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },
        timeContainer: {
            margin: 10,
            height: 78,
            width: 90,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Neutral_02,
        },
        timeFlatList: {
            marginTop: 10,
            alignSelf: 'center',
        },
        inputContiner: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingLeft: 10,
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
        },
        listIcon: {
            fontSize: RFValue(18, screenResolution.screenHeight),
            marginRight: 15,
            color: colors.Neutral_01
        },
        taxContainer: {
            height: 185,
            width: '100%',
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            backgroundColor: colors.Neutral_02
        },
        taxContainer_C1: {
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
    });
};
