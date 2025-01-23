import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../components/Header';
import {t} from 'i18next';
import {Typography} from '../../utilities/constants/constant.style';
import CTAButton1 from '../../components/CTA_BUTTON1';
import {LightThemeColors, DarkThemeColors} from '../../utilities/constants';
import {useTheme} from '../../../ThemeContext';
import {useRoute} from '@react-navigation/native';

const CustomerInfo = ({navigation}) => {
  const route = useRoute();
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
  const styles = createStyles(colors, theme);

  let isError = useSelector(state => state.reducer.isError);
  let isJobCreate = route.params?.isJobCreate;

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t('customerInfo')}
        isLeft={true}
        leftPress={() => {
          navigation.goBack();
        }}
      />

      {/* <View style={styles.body}>
            </View> */}

      <ScrollView
        contentContainerStyle={styles.scrollBar}
        style={{width: '100%'}}>
        <View style={{width: '90%'}}>
          <View style={[styles.heading, {marginTop: 20}]}>
            <Text style={[Typography.text_paragraph_1, styles.headingText]}>
              {t('fullname')}
            </Text>
            <Text style={[Typography.text_paragraph_1, styles.editText]}>
              {'Kam David'}
            </Text>
          </View>

          <View style={[styles.heading, {marginTop: 20}]}>
            <Text style={[Typography.text_paragraph_1, styles.headingText]}>
              {t('phoneNo')}
            </Text>
            <Text style={[Typography.text_paragraph_1, styles.editText]}>
              {'0987654321'}
            </Text>
          </View>

          <View style={[styles.heading, {marginTop: 20}]}>
            <Text style={[Typography.text_paragraph_1, styles.headingText]}>
              {t('emailAddress')}
            </Text>
            <Text style={[Typography.text_paragraph_1, styles.editText]}>
              {'kamdavid@gmail.com'}
            </Text>
          </View>

          <View style={[styles.heading, {marginTop: 20}]}>
            <Text style={[Typography.text_paragraph_1, styles.headingText]}>
              {t('dob')}
            </Text>
            <Text style={[Typography.text_paragraph_1, styles.editText]}>
              {'11/07/2024'}
            </Text>
          </View>

          <View style={[styles.heading, {marginTop: 20}]}>
            <Text style={[Typography.text_paragraph_1, styles.headingText]}>
              {t('gender')}
            </Text>
            <Text style={[Typography.text_paragraph_1, styles.editText]}>
              {'Male'}
            </Text>
          </View>

          <View style={[styles.heading, {marginTop: 20}]}>
            <Text style={[Typography.text_paragraph_1, styles.headingText]}>
              {t('address')}
            </Text>
            <Text style={[Typography.text_paragraph_1, styles.editText]}>
              {'3 W. Peachtree St.Schererville, IN 46375'}
            </Text>
          </View>

          {isJobCreate && (
            <View style={{width: '100%'}}>
              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('service')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'Cleaning at Home'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('description')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'This is text description'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('cleaners')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'3'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('workFrequency')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'Weekly'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('areaSize')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'51 - 100 m2'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('roomsNumber')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'1 Room'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('needCleaningMaterials')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'Yes Please'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('price')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'€30/hr'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('selectDate')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'8 Jan, 2024'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('selectTime')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'10:00 AM - 12:00 AM'}
                </Text>
              </View>

              <View style={[styles.heading, {marginTop: 20}]}>
                <Text style={[Typography.text_paragraph_1, styles.headingText]}>
                  {t('location')}
                </Text>
                <Text style={[Typography.text_paragraph_1, styles.editText]}>
                  {'Jameria Residence'}
                </Text>
              </View>

              <View style={styles.taxContainer}>
                <Text style={[Typography.text_CTA1, {color: colors.black}]}>
                  {t('pay') + ':'}
                </Text>

                <View style={styles.taxContainer_C1}>
                  <Text
                    style={[Typography.text_CTA1, {color: colors.Neutral_01}]}>
                    {t('amount')}
                  </Text>
                  <Text style={[Typography.text_CTA1, {color: colors.black}]}>
                    {'€450'}
                  </Text>
                </View>

                <View style={styles.taxContainer_C1}>
                  <Text
                    style={[Typography.text_CTA1, {color: colors.Neutral_01}]}>
                    {t('vat')}
                  </Text>
                  <Text style={[Typography.text_CTA1, {color: colors.black}]}>
                    {'€50'}
                  </Text>
                </View>

                <View style={styles.taxContainer_C1}>
                  <Text
                    style={[Typography.text_CTA1, {color: colors.Neutral_01}]}>
                    {t('total')}
                  </Text>
                  <Text style={[Typography.text_CTA1, {color: colors.black}]}>
                    {'€500'}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* <View style={styles.taxContainer}>
                        <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('pay') + ':'}</Text>
                        <View style={styles.taxContainer_C1}>
                            <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('amount')}</Text>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'$450'}</Text>
                        </View>
                        <View style={styles.taxContainer_C1}>
                            <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('vat')}</Text>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'$50'}</Text>
                        </View>
                        <View style={styles.taxContainer_C1}>
                            <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('total')}</Text>
                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'$500'}</Text>
                        </View>
                    </View> */}
        </View>
      </ScrollView>

      {/* <View style={styles.footer}>
                <View style={{ width: '90%', }}>
                    <CTAButton1 title={t('addreview')} submitHandler={() => { navigation.navigate('AddReview') }} />
                </View>
                <View style={{ width: '90%', marginTop: 10 }}>
                    <CTAButton1 title={t('cancel')} submitHandler={() => { navigation.navigate('CancelBooking') }} />
                </View>
            </View> */}
    </View>
  );
};

export default CustomerInfo;

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
      marginBottom: 20,
    },
    scrollBar: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50,
    },
    heading: {
      width: '100%',
      marginTop: 10,
      alignItems: 'flex-start',
    },
    headingText: {
      fontWeight: 'bold',
      color: colors.black,
      textAlign: 'left',
    },
    editText: {
      // fontSize: 14,
      textAlign: 'left',
      color: colors.black,
    },
    taxContainer: {
      height: 185,
      width: '100%',
      padding: 10,
      marginTop: 20,
      borderRadius: 5,
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      backgroundColor: colors.Neutral_02,
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
