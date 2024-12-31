// import { StyleSheet } from 'react-native'
// import colors from './colors';

// export const Typography = StyleSheet.create({
//     text_heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: colors.black
//     },
//     text_subHeading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: colors.Primary_01,
//         textAlign: 'center'
//     },
//     text_subHeading_1: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: colors.black,
//         textAlign: 'center'
//     },
//     text_paragraph_1: {
//         fontSize: 16,
//         color: colors.Neutral_01,
//         textAlign: 'center'
//     },
//     text_CTA1: {
//         fontSize: 16,
//         color: colors.white,
//         fontWeight: 'bold',
//         textAlign: 'center'
//     },
//     text_paragraph: {
//         fontSize: 14,
//         color: colors.Neutral_01,
//         textAlign: 'center'
//     },
// })


// import { StyleSheet, Appearance } from 'react-native';
// import { LightThemeColors, DarkThemeColors } from './colors';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// // Detect the current theme
// const colorScheme = Appearance.getColorScheme();
// const colors = colorScheme === 'dark' ? DarkThemeColors : LightThemeColors;


// export const Typography = StyleSheet.create({
//   text_heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     fontFamily: 'Lato-Regular'
//   },
//   text_subHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'Lato-Regular',
//     textAlign: 'center',
//   },
//   text_subHeading_1: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     fontFamily: 'Lato-Regular',
//     textAlign: 'center',
//   },
//   text_paragraph_1: {
//     fontSize: 14,
//     textAlign: 'center',
//     fontFamily: 'Lato-Regular'
//   },
//   text_CTA1: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Lato-Regular'
//   },
//   text_paragraph: {
//     fontSize: 12,
//     fontFamily: 'Lato-Regular',
//     textAlign: 'center',
//   },
// });





import { StyleSheet, Appearance, } from 'react-native';
import { LightThemeColors, DarkThemeColors } from './colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import screenResolution from './screenResolution';

// Detect the current theme
const colorScheme = Appearance.getColorScheme();
const colors = colorScheme === 'dark' ? DarkThemeColors : LightThemeColors;


export const Typography = StyleSheet.create({
  text_heading: {
    fontSize: RFValue(20, screenResolution.screenHeight),
    // fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular'
  },
  text_subHeading: {
    // fontSize: 18,
    // fontSize: RFPercentage(2.2),
    fontSize: RFValue(18, screenResolution.screenHeight),
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  text_subHeading_1: {
    // fontSize: 16,
    // fontSize: RFPercentage(2),
    fontSize: RFValue(16, screenResolution.screenHeight),
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  text_paragraph_1: {
    // fontSize: 14,
    // fontSize: RFPercentage(1.7),
    fontSize: RFValue(14, screenResolution.screenHeight),
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  },
  text_CTA1: {
    // fontSize: RFPercentage(1.7),
    fontSize: RFValue(14, screenResolution.screenHeight),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  },
  text_paragraph: {
    // fontSize: 12,
    // fontSize: RFPercentage(1.5),
    fontSize: RFValue(12, screenResolution.screenHeight),
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },

  
});
