import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Mapbox, { MapView, Camera } from '@rnmapbox/maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { t } from 'i18next';
// local imports
import Images from '../../assets/images/index'
import { useTheme } from '../../../ThemeContext';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { isLocationSet } from '../../store/actions/action'
import { checkLocationPermission, } from '../../services/locationServiceCheck';
import PlacesModal from '../../components/PlacesModal';
import { Bubble } from '../../assets/icons';
import { Typography } from '../../utilities/constants/constant.style';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { RFValue } from 'react-native-responsive-fontsize';
import screenResolution from '../../utilities/constants/screenResolution';

Mapbox.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
Mapbox.setAccessToken('pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ');

export default function Map({ navigation }) {
    const dispatch = useDispatch()
    let user = useSelector((state) => state.reducer.user);
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    const savedCords = useSelector((state) => state.reducer.savedCords);
    const isLocation = useSelector((state) => state.reducer.isLocation);

    const [isLocationErr, setisLocationErr] = useState(false);
    const [isPlacesVisible, setisPlacesVisible] = useState(false);
    const [isFlag, setisFlag] = useState(false);

    const [data, setdata] = useState([
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: [Images.cleaning, Images.cleaning, Images.cleaning, Images.cleaning, Images.cleaning],
            openTime: '10:00 AM to 12:00 PM',
            let: 0,
            lng: 0,
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },],
            coordinates: [24.979781, 67.067024]
        }, {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: [Images.cleaning],
            openTime: '10:00 AM to 12:00 PM',
            let: 0,
            lng: 0,
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },],
            coordinates: [24.979781, 67.067024]
        },
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: [Images.cleaning],
            openTime: '10:00 AM to 12:00 PM',
            let: 0,
            lng: 0,
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },],
            coordinates: [24.8854, 67.0159],
        },
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: [Images.cleaning],
            openTime: '10:00 AM to 12:00 PM',
            let: 0,
            lng: 0,
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },],
            coordinates: [24.963673, 67.06837]
        },
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: [Images.cleaning],
            openTime: '10:00 AM to 12:00 PM',
            let: 0,
            lng: 0,
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },],
            coordinates: [24.963673, 67.06837]
        },


    ]);

    useEffect(() => {
        gpsenable()
    }, []);

    useEffect(() => {
        setisLocationErr(isLocation)
    }, [isLocation]);

    const gpsenable = () => {
        checkLocationPermission()
            .then(async (position) => {
                let loc = [position.coords.latitude, position.coords.longitude]
                let loc1 = [24.9107, 67.0311]
                dispatch(isLocationSet(true, loc1));
            })
            .catch((error) => {
                console.log(error, "error");
                dispatch(isLocationSet(false, []));
            });
    }

    const cameraRef = useRef(null);
    const recenterMap = (loc) => {
        if (cameraRef.current) {
            // dispatch(fetchPosts(savedCords?.length > 0 ? savedCords : ipLocation));
            cameraRef.current.setCamera({
                centerCoordinate: [savedCords[1], savedCords[0]],
                zoomLevel: 11,
                animationDuration: 500,
            });
            setisFlag(!isFlag)
        }
    };

    return (
        <View style={{ height: '100%', width: '100%', position: 'absolute', }}>
            {
                !isLocationErr &&
                <View style={styles.locationError}>
                    <Text style={[Typography.text_paragraph, { color: colors.black, marginBottom: 20 }]}>{t('locationNotAvailable')}</Text>
                    <CTAButton1
                        title={t('turnOnGps')}
                        submitHandler={async () => { gpsenable() }
                        }
                    />
                </View>
            }

            {
                isLocationErr &&
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.searchLocationContainer}
                        onPress={() => setisPlacesVisible(true)}
                        activeOpacity={0.8}
                    >
                        <AntDesign name="search1" style={{ fontSize: RFValue(25, screenResolution.screenHeight), color: colors.white, }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.locateMeContainer}
                        onPress={recenterMap}
                        activeOpacity={0.8}
                    >
                        <FontAwesome6 name="location-arrow" style={{ fontSize: RFValue(25, screenResolution.screenHeight), color: colors.white, }} />
                    </TouchableOpacity>

                    <View style={{ height: '100%', width: '100%' }}>
                        {
                            (savedCords?.length > 0) && (
                                <MapView
                                    styleJSON={'mapbox://styles/mapbox/streets-v8'}
                                    style={{ flex: 1 }}
                                    scaleBarEnabled={false}
                                    attributionPosition={{ bottom: 8, left: Platform.OS === 'ios' ? 90 : 130 }}
                                    rotateEnabled={false}
                                    pitchEnabled={false}
                                    localizeLabels={true}
                                // onRegionDidChange={handleRegionDidChange}
                                >
                                    <Camera
                                        ref={cameraRef}
                                        defaultSettings={{
                                            zoomLevel: 11,
                                            centerCoordinate: savedCords?.length > 0 && [savedCords[1], savedCords[0]]
                                        }}
                                    />

                                    {/* services marker */}
                                    {
                                        data.map((key, index) => {
                                            const latitude = key.coordinates[0];
                                            const longitude = key.coordinates[1];
                                            const isSameLocation = longitude === savedCords[1] && latitude === savedCords[0];
                                            const offset = isSameLocation ? 0.00001 * (index + 1) : 0; // Apply offset to avoid exact overlap
                                            return (
                                                <Mapbox.MarkerView
                                                    key={index}
                                                    coordinate={[longitude + offset, latitude + offset]}
                                                >
                                                    <TouchableOpacity
                                                        activeOpacity={0.9}
                                                        onPress={() => {
                                                            navigation.navigate('AdFullView', { item: key, isService: user.role === 'user' ? true : false, isJobCreate: user.role !== 'user' ? true : false, })
                                                        }}
                                                    >
                                                        <Bubble />
                                                    </TouchableOpacity>
                                                </Mapbox.MarkerView>
                                            );
                                        })
                                    }

                                    {/* current location marker */}
                                    <Mapbox.MarkerView coordinate={[savedCords[1], savedCords[0]]}>
                                        <View style={styles.locationMarke}>
                                            <Animatable.View
                                                iterationCount={200000}
                                                useNativeDriver
                                                animation={'zoomIn'}
                                                duration={3000}
                                                style={{
                                                    alignSelf: 'center',
                                                    borderRadius: 15,
                                                    height: 19,
                                                    width: 19,
                                                    backgroundColor: colors.BothPrimary_01
                                                }}
                                            />
                                        </View>
                                    </Mapbox.MarkerView>

                                </MapView>
                            )
                        }
                    </View>

                    <PlacesModal
                        isVisible={isPlacesVisible}
                        cameraRef={cameraRef}
                        onClose={() => setisPlacesVisible(false)}
                    />

                </View>
            }
        </View>
    );
}

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginVertical: 15,
            marginHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },

        searchLocationContainer: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50, width: 50,
            borderRadius: 25,
            backgroundColor: colors.White_Primary_01,
            zIndex: 1,
            top: 15,
            right: 16,
            marginTop: 5
        },

        locateMeContainer: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            bottom: 15,
            right: 16,
            marginTop: 5,
            height: 50, width: 50,
            borderRadius: 25,
            backgroundColor: colors.White_Primary_01,
        },

        locationMarke: {
            alignItems: 'center',
            borderRadius: 15,
            justifyContent: 'center',
            alignSelf: 'center',
            height: 24, width: 24,
            backgroundColor: colors.BothWhite,
            zIndex: 10,
        },
        locationError: {
            flex: 1,
            width: '50%',
            marginHorizontal: '25%',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
};