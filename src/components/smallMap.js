import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Mapbox, { MapView, Camera } from '@rnmapbox/maps';
import * as Animatable from 'react-native-animatable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { RFValue } from 'react-native-responsive-fontsize';
import screenResolution from '../utilities/constants/screenResolution';

import { useTheme } from '../../ThemeContext';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';

const SmallMap = ({ savedCords }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    const [isFlag, setisFlag] = useState(false);

    const cameraRef = useRef(null);
    const recenterMap = (loc) => {
        if (cameraRef.current) {
            cameraRef.current.setCamera({
                centerCoordinate: [savedCords[1], savedCords[0]],
                zoomLevel: 11,
                animationDuration: 500,
            });
            setisFlag(!isFlag)
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.locateMeContainer}
                onPress={recenterMap}
                activeOpacity={0.8}
            >
                <FontAwesome6 name="location-arrow" style={{ fontSize: RFValue(15, screenResolution.screenHeight), color: colors.white, }} />
            </TouchableOpacity>
            <View style={styles.map}>
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

                            {/* current location marker */}
                            <Mapbox.MarkerView
                                coordinate={[savedCords[1], savedCords[0]]}
                            >
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
        </View>
    );
};

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        map: {
            width: '100%',
            height: '100%',
        },
        locationMarke: {
            alignItems: 'center',
            borderRadius: 15,
            justifyContent: 'center',
            alignSelf: 'center',
            height: 24, width: 24,
            backgroundColor: colors.BothWhite,
        },
        locateMeContainer: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            bottom: 15,
            right: 16,
            marginTop: 5,
            height: 30, width: 30,
            borderRadius: 25,
            backgroundColor: colors.White_Primary_01,
        },
    });
};


export default SmallMap;