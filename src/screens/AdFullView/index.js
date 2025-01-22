import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import {useRoute} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
// local imports
import {Typography} from '../../utilities/constants/constant.style';
import {MapSmall} from '../../assets/icons';
import Images from '../../assets/images/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LightThemeColors, DarkThemeColors} from '../../utilities/constants';
import {useTheme} from '../../../ThemeContext';
import screenResolution from '../../utilities/constants/screenResolution';
import CustomHeader from '../../components/Header';
import CTAButton1 from '../../components/CTA_BUTTON1';
import CTAButton2 from '../../components/CTA_BUTTON2';
import moment from 'moment';
import SmallMap from '../../components/smallMap';
import {deleteAdById} from '../../store/actions/action';

const CleaningAndHygineService = 'Cleaning and Hygiene Services';

const AdFullView = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
  const styles = createStyles(colors, theme);
  let user = useSelector(state => state.reducer.user);

  let data = route.params?.item;
  let isBooking = route.params?.isBooking;
  let isReviewBooking = route.params?.isReviewBooking;

  console.log(data, 'data');

  let images = [
    Images.cleaning,
    Images.cleaning,
    Images.cleaning,
    Images.cleaning,
    Images.cleaning,
  ];

  const formatTime = milliseconds => {
    if (milliseconds === null) return 'Select Time';
    const date = new Date();
    date.setHours(Math.floor(milliseconds / 3600000));
    date.setMinutes((milliseconds % 3600000) / 60000);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  //for delete the selected my Ad from app

  const deleteMyAd = async adId => {
    dispatch(deleteAdById(adId, 'service', navigation));
  };

  //for edit the selected my Ad from app

  const editMyAd = adId => {
    navigation.navigate('ServiceCreate', {adId,data });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={
          data.postedBy === user.userId
            ? t('myads')
            : data.addType === 'job'
            ? t('myjobs')
            : t('serviceprovider')
        }
        isLeft={true}
        leftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{width: '90%', marginTop: 10}}
        contentContainerStyle={styles.scrollBar}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <SliderBox
            autoplay={true}
            ImageComponent={FastImage}
            images={images}
            sliderBoxHeight={230}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor={colors.Primary_01}
            inactiveDotColor="#90A4AE"
            resizeMethod={'resize'}
            resizeMode={'cover'}
          />
        </View>

        <View style={styles.list}>
          <Text
            style={[
              Typography.text_paragraph_1,
              {fontWeight: 'bold', color: colors.black},
            ]}>
            {t('title')}
          </Text>
          <Text style={[Typography.text_paragraph, {color: colors.Neutral_01}]}>
            {data.category + ' / ' + data.subCategory}
          </Text>
        </View>

        <View style={styles.list}>
          <Text
            style={[
              Typography.text_paragraph_1,
              {fontWeight: 'bold', color: colors.black},
            ]}>
            {t('description')}
          </Text>
          {data.addType === 'job' && (
            <Text
              style={[
                Typography.text_paragraph,
                {textAlign: 'left', color: colors.Neutral_01},
              ]}>
              {data.instructions}
            </Text>
          )}
          {data.addType === 'service' && (
            <Text
              style={[
                Typography.text_paragraph,
                {textAlign: 'left', color: colors.Neutral_01},
              ]}>
              {data.description}
            </Text>
          )}
        </View>

        <View style={styles.list2}>
          <Text
            style={[
              Typography.text_paragraph_1,
              {fontWeight: 'bold', color: colors.black},
            ]}>
            {t('price')}
          </Text>
          {data.addType === 'job' && (
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {'€' + data.totalPrice}
            </Text>
          )}
          {data.addType === 'service' && (
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {'€' + (data.fixedRates || data.fixRates)}
            </Text>
          )}
        </View>

        {data.addType === 'job' && (
          <View style={styles.list2}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('RequiredHours')}
            </Text>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {data.howManyHourDoYouNeed}
            </Text>
          </View>
        )}

        {data.addType === 'job' && (
          <View style={styles.list2}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('cleaners')}
            </Text>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {data.howManyProfessionalDoYouNeed}
            </Text>
          </View>
        )}

        {data.addType === 'job' && (
          <View style={styles.list2}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('workFrequency')}
            </Text>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {data.repeateService}
            </Text>
          </View>
        )}

        {data.addType === 'job' &&
          data.category === CleaningAndHygineService && (
            <View style={styles.list2}>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {t('areaSize')}
              </Text>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {data.roomSize}
              </Text>
            </View>
          )}

        {data.addType === 'job' &&
          data.category === CleaningAndHygineService && (
            <View style={styles.list2}>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {t('roomsNumber')}
              </Text>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {data.roomsQty}
              </Text>
            </View>
          )}

        {data.addType === 'job' &&
          data.category === CleaningAndHygineService && (
            <View style={styles.list2}>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {t('needCleaningMaterials')}
              </Text>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {data.needCleaningMaterials}
              </Text>
            </View>
          )}

        {data.addType === 'job' &&
          data.category === CleaningAndHygineService && (
            <View style={styles.list2}>
              <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
                <Text
                  style={[
                    Typography.text_paragraph_1,
                    {fontWeight: 'bold', color: colors.black},
                  ]}>
                  {t('additionalService')}
                </Text>
                {data?.aditionalServices.map((service, index) => (
                  <Text
                    style={[
                      Typography.text_paragraph_1,
                      {textAlign: 'left', color: colors.White_Primary_01},
                    ]}>
                    {service.title}
                  </Text>
                ))}
              </View>
            </View>
          )}

        {data.addType === 'job' && (
          <View style={styles.list2}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('bookingDate') + ' '}
            </Text>
            <Text
              style={[
                Typography.text_paragraph_1,
                styles.editText,
                {color: colors.White_Primary_01},
              ]}>
              {moment(data.bookingDate).format('DD MM YYYY')}
            </Text>
          </View>
        )}

        {data.addType === 'job' && (
          <View style={styles.list2}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('bookingTime') + ' '}
            </Text>
            <Text
              style={[
                Typography.text_paragraph_1,
                styles.editText,
                {color: colors.White_Primary_01},
              ]}>
              {moment(data.bookingStart).format('LT') +
                ' - ' +
                moment(data.bookingEnd).format('LT')}
            </Text>
          </View>
        )}

        {data.addType === 'service' && (
          <View style={[styles.list2, {flexDirection: 'column'}]}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('availability')}
            </Text>
            {data.timeSlots.length > 0 &&
              data.timeSlots.map((key, index) => {
                return (
                  <View key={index} style={{alignItems: 'flex-start'}}>
                    <Text
                      style={[
                        Typography.text_paragraph_1,
                        {fontWeight: 'bold', color: colors.black, marginTop: 5},
                      ]}>
                      {key.day}
                    </Text>
                    <Text
                      style={[
                        Typography.text_paragraph_1,
                        {color: colors.White_Primary_01},
                      ]}>
                      {formatTime(key.openingTime) +
                        ' to ' +
                        formatTime(key.closingTime)}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}

        {data.addType === 'job' && (
          <View style={styles.list2}>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {t('address')}
            </Text>
            <Text
              style={[
                Typography.text_paragraph_1,
                {fontWeight: 'bold', color: colors.black},
              ]}>
              {data.address}
            </Text>
          </View>
        )}

        <View style={styles.list}>
          <Text
            style={[
              Typography.text_paragraph_1,
              {fontWeight: 'bold', color: colors.black},
            ]}>
            {t('location')}
          </Text>
          <View
            style={{
              height: 250,
              width: '100%',
              marginTop: 10,
              overflow: 'hidden',
            }}>
            <SmallMap
              savedCords={[data.geoPoint._latitude, data.geoPoint._longitude]}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.centerStyle}
          onPress={() => {
            navigation.navigate('CustomerInfo', {
              isJobCreate: data.addType === 'job' ? true : false,
            });
          }}>
          <FontAwesome5
            name="info-circle"
            style={{
              fontSize: RFValue(18, screenResolution.screenHeight),
              color: colors.White_Primary_01,
              marginLeft: 10,
            }}
          />
          {user.role === 'user' && (
            <Text style={[Typography.text_CTA1, styles.dateTime]}>
              {t('ServiceProviderInfo')}
            </Text>
          )}
          {user.role === 'provider' && (
            <Text style={[Typography.text_CTA1, styles.dateTime]}>
              {t('customerInfo')}
            </Text>
          )}
        </TouchableOpacity>

        {
          <>
            <View style={[styles.list2, {marginTop: 20}]}>
              <Text
                style={[
                  Typography.text_paragraph_1,
                  {fontWeight: 'bold', color: colors.black},
                ]}>
                {t('reviews')}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Reviews');
                }}>
                <Text
                  style={[
                    Typography.text_paragraph_1,
                    {fontWeight: 'bold', color: colors.White_Primary_01},
                  ]}>
                  {t('seeAll')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[{flex: 1, height: 50}, styles.list2]}>
              <View style={styles.reviewContiner}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    resizeMode="contain"
                    style={{borderRadius: 100, width: 48, height: 48}}
                    source={Images.profilePic}
                  />
                  <View style={{marginLeft: 5}}>
                    <Text
                      style={[
                        Typography.text_paragraph_1,
                        {fontWeight: 'bold', color: colors.White_Primary_01},
                      ]}>
                      {'Charollette Hanlin'}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesome
                        name="star"
                        size={20}
                        color={colors.yellow}
                      />
                      <FontAwesome
                        name="star"
                        size={20}
                        color={colors.yellow}
                      />
                      <FontAwesome
                        name="star"
                        size={20}
                        color={colors.yellow}
                      />
                      <FontAwesome
                        name="star"
                        size={20}
                        color={colors.yellow}
                      />
                      <FontAwesome
                        name="star"
                        size={20}
                        color={colors.yellow}
                      />
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    Typography.text_paragraph,
                    {color: colors.Neutral_01, textAlign: 'right'},
                  ]}>
                  {'23 May, 2023'}
                </Text>
              </View>
            </View>
            <View style={styles.list2}>
              <Text
                style={[
                  Typography.text_paragraph,
                  {textAlign: 'left', color: colors.Neutral_01},
                ]}>
                {
                  'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. '
                }
              </Text>
            </View>
          </>
        }
      </ScrollView>

      <View style={{width: '90%', marginBottom: 20}}>
        {isReviewBooking && !isBooking && (
          <CTAButton1
            title={t('post')}
            submitHandler={() => {
              navigation.navigate('Home');
            }}
          />
        )}

        {!isReviewBooking && isBooking === true && (
          <>
            <View>
              <CTAButton1 title={t('accept')} submitHandler={() => {}} />
            </View>
            <View style={{marginTop: 10}}>
              <CTAButton2 title={t('cancel')} submitHandler={() => {}} />
            </View>
          </>
        )}

        {data.postedBy !== user.userId && data.addType === 'service' && (
          <CTAButton1
            title={t('book')}
            submitHandler={() => {
              navigation.navigate('CreateBooking');
            }}
          />
        )}

        {data.postedBy !== user.userId && data.addType === 'job' && (
          <CTAButton1
            title={t('apply')}
            submitHandler={() => {
              navigation.navigate('SignatureScreen');
            }}
          />
        )}

        {data.postedBy === user.userId && (
          <>
            <View>
              <CTAButton1
                title={t('edit')}
                submitHandler={() => {
                  editMyAd(
                    data.addType === 'job' ? data.jobId : data.serviceId,
                  );
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <CTAButton2
                title={t('delete')}
                submitHandler={() => {
                  deleteMyAd(data.serviceId);
                }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default AdFullView;

const createStyles = colors => {
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
      paddingBottom: 50,
    },
    textAreaContainer: {
      height: 185,
      width: '100%',
      borderRadius: 5,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: colors.white,
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
      width: '100%',
    },
    list2: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
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
      marginLeft: 10,
    },
  });
};
