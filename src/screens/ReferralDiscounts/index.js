
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Image, ImageBackground, } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import CustomHeader from '../../components/Header';
// import Images from '../../assets/images/index'

// import { t } from 'i18next';
// import { colors } from '../../utilities/constants';
// import { ScrollView } from 'native-base';
// import CTAButton1 from '../../components/CTA_BUTTON1';
// import CTA_Profile from '../../components/CTA_PROFILE';
// import { Typography } from '../../utilities/constants/constant.style';
// import { ShareCredit } from '../../assets/icons';
// import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
// import { useTheme } from '../../../ThemeContext';

// const ReferralDiscounts = ({ navigation }) => {
//     const { theme, toggleTheme } = useTheme();
//     const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
//     const styles = createStyles(colors, theme);

//     let isError = useSelector((state) => state.reducer.isError);

//     return (
//         <View style={styles.container}>
//             <CustomHeader
//                 title={t('creditCards')}
//                 isLeft={true}
//                 leftPress={() => { navigation.goBack() }}
//             />
//             <ScrollView
//                 style={{ width: '90%', marginTop: 10 }}
//                 contentContainerStyle={styles.scrollBar}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.banner}>
//                     <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('getfreecredit')}</Text>
//                     <Text style={[Typography.text_paragraph, { color: colors.black, textAlign: 'left', marginTop: 10 }]}>{t('sharethebestkepthome')}</Text>
//                     <Text style={[Typography.text_CTA1, { color: colors.black, marginTop: 10 }]}>{'tokyo1092371008'}</Text>
//                 </View>

//                 <CTA_Profile title={t('Favorites')} icon={<ShareCredit />} submitHandler={() => { }} />

//             </ScrollView>

//             <View style={{ width: '90%', marginBottom: 20 }}>
//                 <CTAButton1 title={t('save')} submitHandler={() => { }} />
//             </View>

//         </View>
//     );
// };

// export default ReferralDiscounts;

// const createStyles = (colors, theme) => {
//     return StyleSheet.create({
//         container: {
//             flex: 1,
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         scrollBar: {
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingBottom: 50
//         },
//         banner: {
//             borderWidth: theme === 'dark' ? 0.5 : 0,
//             borderColor: theme === 'dark' ? colors.black : null,
//             marginTop: 5,
//             height: 185,
//             width: '98%',
//             padding: 10,
//             borderRadius: 5,
//             justifyContent: 'center',
//             alignItems: 'flex-start',
//             backgroundColor: colors.white,
//             shadowColor: "#000",
//             shadowOffset: {
//                 width: 0,
//                 height: 2,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,

//             elevation: 5,
//         },
//     });
// };



import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import Images from '../../assets/images/index';

import { t } from 'i18next';
import { colors } from '../../utilities/constants';
import { ScrollView } from 'native-base';
import CTAButton1 from '../../components/CTA_BUTTON1';
import CTA_Profile from '../../components/CTA_PROFILE';
import { Typography } from '../../utilities/constants/constant.style';
import { ShareCredit } from '../../assets/icons';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';

const ReferralDiscounts = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('creditCards')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <ScrollView
                style={{ width: '90%', marginTop: 10 }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground
                    resizeMode="cover"
                    source={Images.profileShadow}
                    style={styles.banner}
                >
                    <Text style={[Typography.text_CTA1, { color: colors.black }]}>{t('getfreecredit')}</Text>
                    <Text style={[Typography.text_paragraph, { color: colors.black, textAlign: 'left', marginTop: 10 }]}>{t('sharethebestkepthome')}</Text>
                    <Text style={[Typography.text_CTA1, { color: colors.black, marginTop: 10 }]}>{'tokyo1092371008'}</Text>
                </ImageBackground>

                <CTA_Profile title={t('Favorites')} icon={<ShareCredit />} submitHandler={() => { }} />
            </ScrollView>

            <View style={{ width: '90%', marginBottom: 20 }}>
                <CTAButton1 title={t('save')} submitHandler={() => { }} />
            </View>
        </View>
    );
};

export default ReferralDiscounts;

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
        banner: {
            borderWidth: theme === 'dark' ? 0.5 : 0,
            borderColor: theme === 'dark' ? colors.black : null,
            marginTop: 5,
            height: 185,
            width: '98%',
            padding: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            overflow: 'hidden' // Ensures rounded corners
        },
    });
};


