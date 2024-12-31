import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';
// icons
import {
    HomeActive, HomeInactive, HomeInactiveWhite,
    BookingActive, BookingInactive, BookingInactiveWhite,
    MapActive, MapInactive, MapInactiveWhite,
    ProfileActive, ProfileInactive, ProfileInactiveWhite,
    AnalyticsActive, AnalyticsInActive, AnalyticsInActiveWhite
} from '../assets/icons';

// bottom navigation screens
import Home from '../screens/Home/index';
// booking
import Bookings from '../screens/Bookings/index';
// map
import Map from '../screens/Map/index';
// analytics
import Analytics from '../screens/Analytics/index';
// notification
import Notification from './../screens/Notification/index';
// profile
import Profile from './../screens/Profile/index';
import { RFValue } from 'react-native-responsive-fontsize';
import screenResolution from '../utilities/constants/screenResolution';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeRoutes({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home1" component={Home} />
        </Stack.Navigator>
    )
}

function BookingRoutes({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Booking1" component={Bookings} />
        </Stack.Navigator>
    )
}

function MapRoutes({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Map1" component={Map} />
        </Stack.Navigator>
    )
}

function AnalyticsRoutes({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Analytics1" component={Analytics} />
            <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
        </Stack.Navigator>
    )
}

function NotificationRoutes({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
        </Stack.Navigator>
    )
}

function ProfileRoutes({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Profile1" component={Profile} />
        </Stack.Navigator>
    )
}

export function AppBottomNavigator() {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    let user = useSelector((state) => state.reducer.user);

    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            tabBar={(props) => {
                return (
                    <BottomTabBar {...props} />);
            }}
            screenOptions={{
                tabBarStyle: { backgroundColor: theme === 'dark' ? colors.Primary_01 : colors.white, },
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => {
                        return (<Text style={{ color: focused ? colors.BothPrimary_01 : colors.Neutral_01, fontSize: RFValue(6, screenResolution.screenWidth), top: -5 }}>{user.role === 'provider' ? t('myads') : t('home')}</Text>)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (focused ? <HomeActive /> : theme === 'dark' ? <HomeInactiveWhite /> : <HomeInactive />
                        )
                    },
                }}
                name="Home"
                component={HomeRoutes}
            />

            {
                user.role === 'user' &&
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ focused }) => { return (<Text style={{ color: focused ? colors.BothPrimary_01 : colors.Neutral_01, fontSize: RFValue(6, screenResolution.screenWidth), top: -5 }}>{user.role === 'user' ? t('JobRequest') : t('booking')}</Text>) },
                        tabBarIcon: ({ focused }) => { return (focused ? <BookingActive /> : theme === 'dark' ? <BookingInactiveWhite /> : <BookingInactive />) },
                    }}
                    name="Booking"
                    component={BookingRoutes}
                />
            }

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => { return (<Text style={{ color: focused ? colors.BothPrimary_01 : colors.Neutral_01, fontSize: RFValue(6, screenResolution.screenWidth), top: -5 }}>{t('map')}</Text>) },
                    tabBarIcon: ({ focused }) => { return (focused ? <MapActive /> : theme === 'dark' ? <MapInactiveWhite /> : <MapInactive />) },
                }}
                name="Map"
                component={MapRoutes}
            />
            {
                user.role === 'provider' &&
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ focused }) => { return (<Text style={{ color: focused ? colors.BothPrimary_01 : colors.Neutral_01, fontSize: RFValue(6, screenResolution.screenWidth), top: -5 }}>{t('analytics')}</Text>) },
                        tabBarIcon: ({ focused }) => { return (focused ? <AnalyticsActive /> : theme === 'dark' ? <AnalyticsInActiveWhite /> : <AnalyticsInActive />) },
                    }}
                    name="Analytics"
                    component={AnalyticsRoutes}
                />
            }
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => { return (<Text style={{ color: focused ? colors.BothPrimary_01 : colors.Neutral_01, fontSize: RFValue(6, screenResolution.screenWidth), top: -5 }}>{t('profile')}</Text>) },
                    tabBarIcon: ({ focused }) => { return (focused ? <ProfileActive /> : theme === 'dark' ? <ProfileInactiveWhite /> : <ProfileInactive />) },
                }}
                name="Profile"
                component={ProfileRoutes}
            />
        </Tab.Navigator >
    );
}

