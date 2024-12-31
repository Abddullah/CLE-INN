import React from 'react';
import { Modal, StyleSheet, ImageBackground, Text, View } from 'react-native';
import Images from '../assets/images/index'
import CTAButton1 from './CTA_BUTTON1';
import { Typography } from '../utilities/constants/constant.style';
import { t } from 'i18next';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const SuccessModal = ({ modalVisible, setModalVisible, }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible() }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ImageBackground
                        style={{ height: 193, width: 300, justifyContent: 'center', alignItems: 'center' }}
                        resizeMode="cover"
                        source={theme === 'dark' ? Images.popupBgDM : Images.popupBg}
                    >
                        <Text style={[Typography.text_subHeading, { marginTop: 60 }]}>{t('success')}</Text>
                        <Text style={[Typography.text_paragraph, { marginTop: 5, color: colors.black, fontWeight: 'bold' }]}>{t('registerissucessfullyhaveenjoy')}</Text>
                        <View style={{ marginTop: 10, width: '80%' }}>
                            <CTAButton1 title={'OK'} submitHandler={() => { setModalVisible(); }} />
                        </View>
                    </ImageBackground>
                </View>
            </View>
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
            borderRadius: 10,
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

export default SuccessModal;