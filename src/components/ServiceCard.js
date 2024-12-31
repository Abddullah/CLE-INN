
// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
// import { colors } from '../utilities/constants';
// import { Typography } from '../utilities/constants/constant.style';
// import images from '../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
// import { useTheme } from '../../ThemeContext';

// const ServiceCard = ({
//     data,
//     submitHandler,
//     isFav
// }) => {
//     const { theme } = useTheme();
//     const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
//     const styles = createStyles(colors, theme);

//     return (
//         <TouchableOpacity
//             onPress={submitHandler}
//             style={styles.wrapper}
//             activeOpacity={.8}
//         >
//             <View style={{ width: 170, height: 110, borderRadius: 10, overflow: 'hidden' }}>
//                 <Image
//                     resizeMode="cover"
//                     style={{
//                         width: 170, height: 110,
//                     }}
//                     source={images.cleaning}
//                 />
//                 {
//                     isFav === true &&
//                     <TouchableOpacity activeOpacity={.8} style={{ position: 'absolute', right: 10, top: 10 }}>
//                         <AntDesign name="heart" style={{ fontSize: 20, color: colors.Primary_01, }} />
//                     </TouchableOpacity>
//                 }
//             </View>
//             <View style={styles.textContainer}>
//                 <Text style={[Typography.text_paragraph, { marginLeft: 10, color: theme === 'dark' ? colors.black : colors.Primary_02, fontWeight: 'bold' }]}>{'$' + data.price + '/hr'}</Text>
//                 <Text style={[Typography.text_paragraph, { marginLeft: 10, color: colors.black, fontWeight: 'bold' }]}>{data.title}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };

// export default ServiceCard;

// const createStyles = (colors, theme) => {
//     return StyleSheet.create({
//         wrapper: {
//             height: 180,
//             width: 170,
//             borderRadius: 5,
//             overflow: 'hidden',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             borderWidth: 0.3,
//             borderColor: 'gray',
//             margin: 7,
//         },
//         textContainer: {
//             height: 70,
//             width: '100%',
//             alignItems: 'flex-start',
//             justifyContent: 'center',
//         }
//     });
// };




// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
// import { colors } from '../utilities/constants';
// import { Typography } from '../utilities/constants/constant.style';
// import images from '../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
// import { useTheme } from '../../ThemeContext';

// const ServiceCard = ({
//     data,
//     submitHandler,
//     isFav
// }) => {
//     const { theme } = useTheme();
//     const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
//     const styles = createStyles(colors, theme);

//     return (
//         <TouchableOpacity
//             onPress={submitHandler}
//             style={styles.wrapper}
//             activeOpacity={.8}
//         >
//             <View style={{ width: 140, height: 100, overflow: 'hidden' }}>
//                 <Image
//                     resizeMode="cover"
//                     style={{
//                         width: '100%', height: 110,
//                     }}
//                     source={images.cleaning}

//                 />
//                 {
//                     isFav === true &&
//                     <TouchableOpacity activeOpacity={.8} style={{ position: 'absolute', right: 10, top: 10 }}>
//                         <AntDesign name="heart" style={{ fontSize: 20, color: colors.Primary_01, }} />
//                     </TouchableOpacity>
//                 }
//                 <View style={{ width: '100%', height: 20, justifyContent: 'center', backgroundColor: colors.Neutral_02, position: 'absolute', bottom: 0, }}>
//                     <Text style={[Typography.text_paragraph, { marginLeft: 10, textAlign: 'left', color: colors.black, fontWeight: 'bold', }]}>{data.title}</Text>
//                 </View>
//             </View>

//             {/* <View style={styles.textContainer}>
//                 <Text style={[Typography.text_paragraph, { marginLeft: 10, color: theme === 'dark' ? colors.black : colors.Primary_02, fontWeight: 'bold' }]}>{'$' + data.price + '/hr'}</Text>
//                 <Text style={[Typography.text_paragraph, { marginLeft: 10, color: colors.black, fontWeight: 'bold' }]}>{data.title}</Text>
//             </View> */}

//         </TouchableOpacity>
//     );
// };

// export default ServiceCard;

// const createStyles = (colors, theme) => {
//     return StyleSheet.create({
//         wrapper: {
//             height: 100,
//             width: 140,
//             borderRadius: 5,
//             overflow: 'hidden',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             borderWidth: .5,
//             borderColor: 'gray',
//             margin: 10,
//         },
//         textContainer: {
//             height: 70,
//             width: '100%',
//             alignItems: 'flex-start',
//             justifyContent: 'center',
//         }
//     });
// };



// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { Typography } from '../utilities/constants/constant.style';
// import images from '../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
// import { useTheme } from '../../ThemeContext';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import screenResolution from '../utilities/constants/screenResolution'; 

// const { width } = Dimensions.get('window'); // Get the screen width

// const ServiceCard = ({
//     data,
//     submitHandler,
//     isFav,
//     index
// }) => {
//     let user = useSelector((state) => state.reducer.user);
//     const { theme } = useTheme();
//     const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
//     const styles = createStyles(colors, theme, user, index);

//     return (
//         <TouchableOpacity
//             onPress={submitHandler}
//             style={styles.wrapper}
//             activeOpacity={.8}
//         >
//             <View style={styles.imageContainer}>
//                 <Image
//                     resizeMode="cover"
//                     style={styles.image}
//                     source={images.cleaning}
//                 />
//                 {
//                     isFav === true &&
//                     <TouchableOpacity activeOpacity={.8} style={styles.favIcon}>
//                         <AntDesign name="heart" style={styles.favIconHeart} />
//                     </TouchableOpacity>
//                 }
//                 <View style={styles.titleContainer}>
//                     <Text style={styles.titleText}>{data.title}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

// export default ServiceCard;

// const createStyles = (colors, theme, user, index) => {
//     const cardWidth = (width / 2) - 30; // Adjusted to account for padding
//     const marginHorizontal = width * 0.02; // Set marginHorizontal to 2% of screen width (you can adjust this value)

//     return StyleSheet.create({
//         wrapper: {
//             // width: user.role === 'user' ? cardWidth * .98 : cardWidth, // Dynamically set width
//             width: cardWidth, // Dynamically set width
//             height: cardWidth * 0.7, // Maintain a 7:5 aspect ratio
//             borderRadius: 5,
//             overflow: 'hidden',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             borderWidth: 1,
//             borderColor: 'gray',
//             marginHorizontal: marginHorizontal,
//             marginLeft: index != 0 ? null : 0
//             // marginHorizontal: user.role === 'user' ? null : marginHorizontal,
//             // marginLeft: user.role === 'user' ? index != 0 ? 10 : 0 : null,
//         },
//         imageContainer: {
//             width: '100%',
//             height: '100%',
//             overflow: 'hidden',
//         },
//         image: {
//             width: '100%',
//             height: '100%',
//         },
//         favIcon: {
//             position: 'absolute',
//             right: 10,
//             top: 10,
//         },
//         favIconHeart: {
//             fontSize: RFValue(20, screenResolution.screenHeight),
//             color: colors.Primary_01,
//         },
//         titleContainer: {
//             width: '100%',
//             height: 20,
//             justifyContent: 'center',
//             alignItems: 'flex-start',
//             backgroundColor: colors.Neutral_02,
//             position: 'absolute',
//             bottom: 0,
//         },
//         titleText: {
//             marginLeft: 10,
//             textAlign: 'left',
//             color: colors.black,
//             fontWeight: 'bold',
//             ...Typography.text_paragraph,
//         },
//     });
// };








// import React from 'react'
// import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { Typography } from '../utilities/constants/constant.style';
// import images from '../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
// import { useTheme } from '../../ThemeContext';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import screenResolution from '../utilities/constants/screenResolution';

// const { width } = Dimensions.get('window');

// const ServiceCard = ({
//     data,
//     submitHandler,
//     isFav,
//     index
// }) => {
//     let user = useSelector((state) => state.reducer.user);
//     const { theme } = useTheme();
//     const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
//     const styles = createStyles(colors, theme, user, index);

//     return (
//         <TouchableOpacity
//             onPress={submitHandler}
//             style={styles.wrapper}
//             activeOpacity={.8}
//         >
//             <View style={styles.imageContainer}>
//                 <Image
//                     resizeMode="cover"
//                     style={styles.image}
//                     source={images.cleaning}
//                 />
//                 {
//                     isFav === true &&
//                     <TouchableOpacity activeOpacity={.8} style={styles.favIcon}>
//                         <AntDesign name="heart" style={styles.favIconHeart} />
//                     </TouchableOpacity>
//                 }
//                 <View style={styles.titleContainer}>
//                     <Text style={[Typography.text_paragraph, styles.titleText]}>{data.title}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

// export default ServiceCard;

// const createStyles = (colors, theme, user, index) => {
//     const cardWidth = (width / 2) - 35;
//     const marginHorizontal = width * 0.02;

//     return StyleSheet.create({
//         wrapper: {
//             width: cardWidth,
//             height: cardWidth * 0.7,
//             borderRadius: 5,
//             overflow: 'hidden',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             borderWidth: 1.5,
//             borderColor: 'gray',
//             marginHorizontal: marginHorizontal,
//             marginLeft: index != 0 ? null : 0,
//         },
//         imageContainer: {
//             width: '100%',
//             height: '100%',
//             overflow: 'hidden',
//         },
//         image: {
//             width: '100%',
//             height: '100%',
//         },
//         favIcon: {
//             position: 'absolute',
//             right: 10,
//             top: 10,
//         },
//         favIconHeart: {
//             fontSize: RFValue(20, screenResolution.screenHeight),
//             color: colors.Primary_01,
//         },
//         titleContainer: {
//             width: '100%',
//             height: 20,
//             justifyContent: 'center',
//             alignItems: 'flex-start',
//             backgroundColor: colors.Neutral_02,
//             position: 'absolute',
//             bottom: 0,
//         },
//         titleText: {
//             marginLeft: 10,
//             textAlign: 'left',
//             color: colors.black,
//             fontWeight: 'bold',
//         },
//     });
// };








// import React from 'react'
// import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { Typography } from '../utilities/constants/constant.style';
// import images from '../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
// import { useTheme } from '../../ThemeContext';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import screenResolution from '../utilities/constants/screenResolution';

// const { width } = Dimensions.get('window');

// const ServiceCard = ({
//     data,
//     submitHandler,
//     isFav,
//     index
// }) => {
//     let user = useSelector((state) => state.reducer.user);
//     const { theme } = useTheme();
//     const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
//     const styles = createStyles(colors, theme, user, index);

//     return (
//         <TouchableOpacity
//             onPress={submitHandler}
//             style={styles.wrapper}
//             activeOpacity={.8}
//         >
//             <View style={styles.imageContainer}>
//                 <Image
//                     resizeMode="cover"
//                     style={styles.image}
//                     source={images.cleaning}
//                 />
//                 {
//                     isFav === true &&
//                     <TouchableOpacity activeOpacity={.8} style={styles.favIcon}>
//                         <AntDesign name="heart" style={styles.favIconHeart} />
//                     </TouchableOpacity>
//                 }
//                 <View style={styles.titleContainer}>
//                     <Text style={[Typography.text_paragraph, styles.titleText]}>{data.title}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

// export default ServiceCard;

// const createStyles = (colors, theme, user, index) => {
//     const cardWidth = (width / 2) - 35;
//     const marginHorizontal = width * 0.02;

//     return StyleSheet.create({
//         wrapper: {
//             width: cardWidth,
//             height: cardWidth * 0.7,
//             borderRadius: 5,
//             overflow: 'hidden',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             borderColor: 'gray',
//             marginHorizontal: marginHorizontal,
//             marginLeft: index != 0 ? null : 0,
//         },
//         imageContainer: {
//             width: '100%',
//             height: '100%',
//             overflow: 'hidden',
//         },
//         image: {
//             width: '100%',
//             height: '100%',
//         },
//         favIcon: {
//             position: 'absolute',
//             right: 10,
//             top: 10,
//         },
//         favIconHeart: {
//             fontSize: RFValue(20, screenResolution.screenHeight),
//             color: colors.Primary_01,
//         },
//         titleContainer: {
//             width: '100%',
//             height: 20,
//             justifyContent: 'center',
//             alignItems: 'flex-start',
//             backgroundColor: colors.Neutral_02,
//             position: 'absolute',
//             bottom: 0,
//         },
//         titleText: {
//             marginLeft: 10,
//             textAlign: 'left',
//             color: colors.black,
//             fontWeight: 'bold',
//         },
//     });
// }



import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '../utilities/constants/constant.style';
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';

const { width } = Dimensions.get('window');

const ServiceCard = ({
    data,
    submitHandler,
    isFav,
    index
}) => {
    let user = useSelector((state) => state.reducer.user);
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme, user, index);

    return (
        <TouchableOpacity
            onPress={submitHandler}
            style={styles.wrapper}
            activeOpacity={.8}
        >
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={images.cleaning}
                />
                <View style={styles.overlay} />
                {
                    isFav === true &&
                    <TouchableOpacity activeOpacity={.8} style={styles.favIcon}>
                        <AntDesign name="heart" style={styles.favIconHeart} />
                    </TouchableOpacity>
                }
                <View style={styles.titleContainer}>
                    <Text style={[Typography.text_paragraph, styles.titleText]}>{data.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;

const createStyles = (colors, theme, user, index) => {
    const cardWidth = (width / 2) - 35;
    const marginHorizontal = width * 0.02;

    return StyleSheet.create({
        wrapper: {
            width: cardWidth,
            height: cardWidth * 0.7,
            borderRadius: 5,
            overflow: 'hidden',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: 'gray',
            marginHorizontal: marginHorizontal,
            marginLeft: index != 0 ? null : 0,
            backgroundColor: 'white',

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,


        },


        imageContainer: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        favIcon: {
            position: 'absolute',
            right: 10,
            top: 10,
        },
        favIconHeart: {
            fontSize: RFValue(20, screenResolution.screenHeight),
            color: colors.Primary_01,
        },
        titleContainer: {
            width: '100%',
            height: 20,
            justifyContent: 'center',
            alignItems: 'flex-start',
            // backgroundColor: colors.Neutral_02,
            position: 'absolute',
            bottom: 5,
        },
        titleText: {
            marginLeft: 10,
            textAlign: 'left',
            color: colors.white,
            fontWeight: 'bold',
        },
    });
};
