import React from 'react';
import { Modal, StyleSheet, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import Images from '../assets/images/index'
import { Typography } from '../utilities/constants/constant.style';
import { t } from 'i18next';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const SuccessModalBooking = ({ modalVisible, setModalVisible, isCancel }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible() }}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => { setModalVisible() }}
                style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <ImageBackground
                        style={{ height: 250, width: 300, justifyContent: 'center', alignItems: 'center' }}
                        resizeMode="cover"
                        source={theme === 'dark' ? Images.popupBgBookingDM : Images.popupBgBooking}
                    >
                        {
                            (isCancel) ? (
                                <Text style={[Typography.text_subHeading, { marginTop: '55%' }]}>{t('bookingCancel')}</Text>
                            ) : (
                                <Text style={[Typography.text_subHeading, { marginTop: '55%' }]}>{t('successful')}</Text>
                            )
                        }
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            overflow:'hidden',
            borderRadius: 35,
            backgroundColor: 'white',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalText: {
            marginTop: 50,
        },
    });
};

export default SuccessModalBooking;