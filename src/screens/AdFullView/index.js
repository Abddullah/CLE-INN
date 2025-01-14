import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image'
// local imports
import { Typography } from '../../utilities/constants/constant.style';
import { MapSmall } from '../../assets/icons';
import Images from '../../assets/images/index'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import screenResolution from '../../utilities/constants/screenResolution';
import CustomHeader from '../../components/Header';
import CTAButton1 from '../../components/CTA_BUTTON1';
import CTAButton2 from '../../components/CTA_BUTTON2';

const AdFullView = ({ navigation }) => {
    const route = useRoute();
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    let user = useSelector((state) => state.reducer.user);
    let isError = useSelector((state) => state.reducer.isError);

    let data = route.params?.item;
    let isBooking = route.params?.isBooking;
    let isMyAd = route.params?.isMyAd;
    let isService = route.params?.isService;
    let isReviewBooking = route.params?.isReviewBooking;
    let isJobCreate = route.params?.isJobCreate;
    // console.log(data, "data");

    return (
        <View style={styles.container}>
            <CustomHeader
                title={isJobCreate ? t('myads') : t('serviceprovider')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <ScrollView
                style={{ width: '90%', marginTop: 10 }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <SliderBox
                        autoplay={true}
                        ImageComponent={FastImage}
                        images={data.images}
                        sliderBoxHeight={230}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor={colors.Primary_01}
                        inactiveDotColor="#90A4AE"
                        resizeMethod={'resize'}
                        resizeMode={'cover'}
                    />
                </View>

                <View style={styles.list}>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('title')}</Text>
                    <Text style={[Typography.text_paragraph, { color: colors.Neutral_01 }]}>{data.title}</Text>
                </View>

                <View style={styles.list}>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('description')}</Text>
                    <Text style={[Typography.text_paragraph, { textAlign: 'left', color: colors.Neutral_01 }]}>{data.description}</Text>
                </View>

                <View style={styles.list2}>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('price')}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'€' + data.price + '/hr'}</Text>
                </View>

                {
                    isJobCreate &&
                    <View style={styles.list2}>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('cleaners')}</Text>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'3'}</Text>
                    </View>
                }

                {
                    isJobCreate &&
                    <View style={styles.list2}>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('workFrequency')}</Text>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'Weekly'}</Text>
                    </View>
                }


                {
                    isJobCreate &&
                    <View style={styles.list2}>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('areaSize')}</Text>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'51 - 100 m2'}</Text>
                    </View>
                }

                {
                    isJobCreate &&
                    <View style={styles.list2}>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('roomsNumber')}</Text>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'1 Room'}</Text>
                    </View>
                }

                {
                    isJobCreate &&
                    <View style={styles.list2}>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('needCleaningMaterials')}</Text>
                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'Yes Please'}</Text>
                    </View>
                }

                <View style={[styles.list2, { flexDirection: 'column' }]}>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('availability')}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginTop: 5 }]}>{'Monday'}</Text>
                    <Text style={[Typography.text_paragraph_1, { color: colors.White_Primary_01, }]}>{'08:00 AM to 22:00 PM'}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'Tuesday'}</Text>
                    <Text style={[Typography.text_paragraph_1, { color: colors.White_Primary_01, }]}>{'08:00 AM to 22:00 PM'}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'Wednesday'}</Text>
                    <Text style={[Typography.text_paragraph_1, { color: colors.White_Primary_01, }]}>{'08:00 AM to 22:00 PM'}</Text>
                </View>

                <View style={styles.list}>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('location')}</Text>
                    <MapSmall width={'100%'} marginTop={10} />
                </View>

                <TouchableOpacity
                    activeOpacity={.8}
                    style={styles.centerStyle}
                    onPress={() => { navigation.navigate('CustomerInfo', { isJobCreate: isJobCreate }) }}
                >
                    <FontAwesome5 name="info-circle" style={{ fontSize: RFValue(18, screenResolution.screenHeight), color: colors.White_Primary_01, marginLeft: 10 }} />
                    {
                        user.role === 'user' &&
                        <Text style={[Typography.text_CTA1, styles.dateTime]}>{t('ServiceProviderInfo')}</Text>
                    }
                    {
                        user.role === 'provider' &&
                        <Text style={[Typography.text_CTA1, styles.dateTime]}>{t('customerInfo')}</Text>
                    }
                </TouchableOpacity>

                {
                    !isReviewBooking &&
                    <>
                        <View style={[styles.list2, { marginTop: 20 }]}>
                            <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('reviews')}</Text>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { navigation.navigate('Reviews') }}
                            >
                                <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.White_Primary_01, }]}>{t('seeAll')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[{ flex: 1, height: 50 }, styles.list2]}>
                            <View style={styles.reviewContiner}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{ borderRadius: 100, width: 48, height: 48 }}
                                        source={Images.profilePic}
                                    />
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.White_Primary_01, }]}>{'Charollette Hanlin'}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontAwesome name="star" size={20} color={colors.yellow} />
                                            <FontAwesome name="star" size={20} color={colors.yellow} />
                                            <FontAwesome name="star" size={20} color={colors.yellow} />
                                            <FontAwesome name="star" size={20} color={colors.yellow} />
                                            <FontAwesome name="star" size={20} color={colors.yellow} />
                                        </View>
                                    </View>
                                </View>
                                <Text style={[Typography.text_paragraph, { color: colors.Neutral_01, textAlign: 'right' }]}>{'23 May, 2023'}</Text>
                            </View>
                        </View>
                        <View style={styles.list2}>
                            <Text style={[Typography.text_paragraph, { textAlign: 'left', color: colors.Neutral_01 }]}>{'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. '}</Text>
                        </View>
                    </>
                }
            </ScrollView>

            <View style={{ width: '90%', marginBottom: 20 }}>
                {
                    (isReviewBooking && !isBooking) &&
                    <CTAButton1
                        title={t('post')}
                        submitHandler={() => { navigation.navigate('Home') }}
                    />
                }

                {
                    (!isReviewBooking && isBooking === true) &&
                    <>
                        <View>
                            <CTAButton1 title={t('accept')} submitHandler={() => { }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <CTAButton2 title={t('cancel')} submitHandler={() => { }} />
                        </View>
                    </>
                }

                {
                    (isService === true) &&
                    <CTAButton1 title={t('book')} submitHandler={() => { navigation.navigate('CreateBooking') }} />
                }

                {
                    (isService === false) &&
                    <CTAButton1 title={t('apply')} submitHandler={() => { navigation.navigate('SignatureScreen') }} />
                }

                {
                    (isMyAd === true) &&
                    <>
                        <View>
                            <CTAButton1 title={t('edit')} submitHandler={() => { }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <CTAButton2 title={t('delete')} submitHandler={() => { }} />
                        </View>
                    </>
                }
            </View>

        </View>
    );
};

export default AdFullView;

const createStyles = (colors) => {
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
        textAreaContainer: {
            height: 185,
            width: '100%',
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: colors.white
        },
        headerSection: {
            height: 230,
            width: '100%',
            overflow: 'hidden',
            borderRadius: 10,
            backgroundColor: 'white',
        },
        list: {
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%'
        },
        list2: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%'
        },
        reviewContiner: {
            flex: 1,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'space-between',
        },
        centerStyle: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
        },
        dateTime: {
            color: colors.black,
            fontWeight: 'bold',
            marginLeft: 10
        }
    });
};
