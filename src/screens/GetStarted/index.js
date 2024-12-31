import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, } from 'react-native';
import { Select } from 'native-base';
import { _retrieveData } from '../../services/assynsStorage';
import { GetstartedIcon1, GetstartedIcon2, LanguageIcon, ItalyFlag } from '../../assets/icons';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { Typography } from '../../utilities/constants/constant.style';
import { t } from 'i18next';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { onLanguageSelect } from '../../assets/language';
import screenResolution from '../../utilities/constants/screenResolution';
import { RFValue } from 'react-native-responsive-fontsize';

export default function GetStarted({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
  const styles = createStyles(colors);

  const [page, setpage] = useState(0);
  const [language, setlanguage] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value) => {
    setlanguage(value)
    onLanguageSelect(value, setIsEnabled, isEnabled)
    setIsEnabled(previousState => !previousState);
  }

  const submit = () => {
    page === 0 && setpage(1)
    if (page !== 0) {
      navigation.navigate('Signin')
    }
  }

  return (
    <>
      {
        (page === 0) ? (
          <View style={styles.container}>
            <View style={{ flex: 8.5, paddingTop: 20, alignItems: 'center', }}>
              <GetstartedIcon1 height={250} width={250} marginTop={'10%'} />
              <View style={styles.text_container}>
                <Text style={[Typography.text_heading, { color: colors.black, textAlign: 'center' }]}>{t('ourservices')}</Text>
                <Text style={[Typography.text_heading, { color: colors.black, textAlign: 'center' }]}>{t('awayfromhome')}</Text>
                <View style={{ marginTop: '5%' }}>
                  <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, fontWeight: 'normal' }]}>{t('becleanisaplatform')}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
              <CTAButton1 title={t('getstarted')} submitHandler={() => submit()} />
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ flex: 8.5, paddingTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
              <Text style={[Typography.text_heading, { color: colors.black, textAlign: 'center' }]}>{t('personalizeyourexp')}</Text>
              <GetstartedIcon2 height={175} width={175} style={{ marginTop: 30 }} />

              <View style={{ marginTop: 30 }}>
                <View style={styles.list}>
                  <Select
                    bg={colors.Neutral_03}
                    borderWidth={0}
                    selectedValue={language}
                    minWidth="100%"
                    dropdownIcon={<LanguageIcon />}
                    accessibilityLabel={t('language')}
                    placeholder={t('language')}
                    fontSize={RFValue(14, screenResolution.screenHeight)}
                    placeholderTextColor={
                      colors.Neutral_01
                    }
                    _selectedItem={{
                      background: colors.Primary_01,
                    }}
                    mt={1} onValueChange={itemValue => toggleSwitch(itemValue)}
                  >
                    <Select.Item label="English" value="en" _text={{ fontSize: RFValue(14, screenResolution.screenHeight) }} />
                    <Select.Item label="Italian" value="it" _text={{ fontSize: RFValue(14, screenResolution.screenHeight) }} />
                  </Select>
                </View>
              </View>



              <View style={[styles.list, { justifyContent: 'space-between' }]}>
                <Text style={{ marginLeft: 10, color: colors.Neutral_01, fontSize: RFValue(14, screenResolution.screenHeight) }}>{t('country')}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ marginRight: 10, color: colors.Neutral_01 }}>{t('italy')}</Text>
                  <ItalyFlag />
                </View>
              </View>

            </View>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
              <CTAButton1 title={t('getstarted')} submitHandler={() => submit()} />
            </View>
          </View>
        )
      }
    </>
  )
}


const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      marginHorizontal: '5%',
      backgroundColor: colors.white
    },
    text_container: {
      marginTop: '5%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    list: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 7,
      height: 50,
      width: '100%',
      overflow: 'hidden',
      backgroundColor: colors.Neutral_03
    },
  });
}