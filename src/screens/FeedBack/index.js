
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { ScrollView } from 'native-base';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const Feedback = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    const [search, setsearch] = useState('');

    return (
        <View style={styles.container}>
            
            <CustomHeader
                title={t('feedback')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />

            <ScrollView
                style={{ width: '90%', marginTop: 10 }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ width: '100%' }}>
                    <Text style={{ marginVertical: 10, color: colors.Neutral_01 }}>{t('tellusaboutyour')}</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            keyboardType="default"
                            style={{ height: '100%', width: '100%', textAlignVertical: 'top', color: colors.black }}
                            value={search}
                            onChangeText={(e) => { setsearch(e) }}
                            placeholder={t('yourfeedback')}
                            placeholderTextColor={colors.Neutral_01}
                            multiline={true}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={{ width: '90%', marginBottom: 20 }}>
                <CTAButton1 title={t('send')} submitHandler={() => { }} />
            </View>

        </View>
    );
};

export default Feedback;

const createStyles = (colors, theme) => {
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
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderWidth: 1
        }
    });
};