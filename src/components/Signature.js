import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Signature from "react-native-signature-canvas";
import { t } from 'i18next';
import screenResolution from '../utilities/constants/screenResolution';
import { RFValue } from 'react-native-responsive-fontsize';

const SignatureComponent = ({ modalVisible, setModalVisible, setSign }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    const handleOK = (signature) => {
        setSign(signature);
        setModalVisible()
    };

    const handleEmpty = () => {
        console.log("Empty");
        // setSign(null);
        // setModalVisible()
    };

    const style = `.m-signature-pad--footer
    .button {
      background-color: #00BFFF;
      color: #FFF;
      font-size: ${RFValue(6, screenResolution.screenWidth)}px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }`;


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible() }}>

            <View style={styles.centeredView} >
                <TouchableOpacity
                    onPress={() => setModalVisible()}
                    activeOpacity={10}
                    style={styles.crossContainer}
                >
                    <FontAwesome name="close" size={24} color="red" />
                </TouchableOpacity>
                <View style={styles.modalView}>
                    <Signature
                        onOK={handleOK}
                        onEmpty={handleEmpty}
                        onClear={handleEmpty}
                        penColor="#00BFFF"
                        descriptionText={t('Sign')}
                        clearText={t('Clear')}
                        confirmText={t('save')}
                        webStyle={style}
                    />
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
            height: 350,
            width: '80%',
        },
        crossContainer: {
            height: 40,
            width: '80%',
            paddingRight: 10,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: colors.BothWhite
        }

    });
};

export default SignatureComponent;

