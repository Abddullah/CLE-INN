import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { RFValue } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
// local import
import { useTheme } from '../../ThemeContext';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import screenResolution from '../utilities/constants/screenResolution';

const AdditionalServices = ({ onSelectedServicesChange }) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
  const styles = createStyles(colors);
  let additionalService = useSelector((state) => state.reducer.additionalService);

  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(additionalService)
  }, [additionalService])

  const toggleCheckbox = (index) => {
    const updatedServices = services.map((item, i) =>
      i === index ? { ...item, isSelect: !item.isSelect } : item
    );
    setServices(updatedServices);
    const selectedServices = updatedServices.filter((service) => service.isSelect);
    onSelectedServicesChange(selectedServices);
  };

  const renderServicesInRows = () => {
    const rows = [];
    for (let i = 0; i < services.length; i += 3) {
      rows.push(
        <View key={i} style={styles.rowContainer}>
          {services.slice(i, i + 3).map((service, index) => (
            <View key={index} style={styles.optionContainer}>
              <CheckBox
                value={service.isSelect}
                onValueChange={() => toggleCheckbox(i + index)}
                tintColors={{ true: colors.Primary_01, false: colors.Primary_01 }}
              />
              <Text style={styles.optionText}>
                {service.title}
                {/* - ${service.price} */}
              </Text>
            </View>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('additionalService')}</Text>
      {renderServicesInRows()}
    </View>
  );
};

const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      paddingTop: 25,
    },
    heading: {
      fontSize: RFValue(14, screenResolution.screenHeight),
      fontWeight: 'bold',
      color: colors.black,
      marginBottom: 12,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    optionText: {
      fontSize: RFValue(16, screenResolution.screenHeight),
      color: colors.black,
    },
  });
};

export default AdditionalServices;

