import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import ChatBox from '../../components/chatBox';
import CommentInput from '../../components/commentsInput';
import Images from '../../assets/images/index'
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const Chat = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    return (
        <View style={styles.container}>
         
            <CustomHeader
                title={t('chat')}
                isLeft={true}
                isRight={true}
                leftPress={() => { navigation.goBack() }}
                rightPress={() => { Linking.openURL(`tel:${+923450558623}`) }}
            />

            <View style={styles.container_C1}>
                <View style={styles.profilePhoto}>
                    <Image
                        resizeMode="contain"
                        style={{ borderRadius: 100, width: 70, height: 70 }}
                        source={Images.profilePic}
                    />
                </View>
                <Text style={[Typography.text_subHeading, { color: theme === 'dark' ? colors.black : colors.white }]}>Jenny Abbas</Text>
            </View>

            <View style={styles.container_C2}>
                <View style={styles.body}>
                    <ChatBox />
                </View>
                <View style={styles.footer}>
                    <CommentInput />
                </View>
            </View>

        </View>
    );
};

export default Chat;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? colors.white : colors.Primary_01
        },
        container_C1: {
            top: -15,
            height: 100,
            width: '100%',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? colors.white : colors.Primary_01
        },
        container_C2: {
            flex: 1,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            width: '100%',
            backgroundColor: colors.white
        },
        body: {
            flex: 1,
        },
        footer: {
            width: '95%',
            marginHorizontal: '2.5%',
            paddingVertical: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5
        },
        profilePhoto: {
            height: 73, width: 73,
            justifyContent: 'center', alignItems: 'center',
            borderRadius: 100,
            borderWidth: 2,
            borderColor: colors.white,
        },
    });
};



