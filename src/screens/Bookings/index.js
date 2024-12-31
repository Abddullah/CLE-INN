import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import BookingStatusTab from '../../components/BookingStatusTab';
import BookingCard from '../../components/BookingCard';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import BookingCardProvider from '../../components/BookingCardProvider';
import { FlatList } from 'native-base';

const Bookings = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    let user = useSelector((state) => state.reducer.user);
    let isError = useSelector((state) => state.reducer.isError);

    const [selectedTab, setselectedTab] = useState('');

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
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },]
        }, {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: [Images.cleaning],
            openTime: '10:00 AM to 12:00 PM',
            let: 0,
            lng: 0,
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },]
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
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },]
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
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },]
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
            reviews: [{ img: Images.profilePic, name: 'Charollette Hanlin', date: '23 May, 2023 | 02:00 PM', star: '5', review: 'Lorem ipsum dolor sit amet consectetur. Purus massa tristique arcu tempus ut ac porttitor. Lorem ipsum dolor sit amet consectetur. ' },]
        },


    ]);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={user.role === 'user' ? t('JobRequest') : t('booking')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />

            {
                user.role !== 'user' &&
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', marginTop: 10, height: 48, maxHeight: 48, }}
                >
                    <BookingStatusTab selectedState={selectedTab} setselectedState={setselectedTab} title={t('pending')} />
                    <BookingStatusTab selectedState={selectedTab} setselectedState={setselectedTab} title={t('upcoming')} />
                    <BookingStatusTab selectedState={selectedTab} setselectedState={setselectedTab} title={t('ongoing')} />
                    <BookingStatusTab selectedState={selectedTab} setselectedState={setselectedTab} title={t('completed')} />
                </ScrollView>
            }

            {/* {
                user.role === 'user' &&
                <ScrollView
                    style={{ width: '90%' }}
                    contentContainerStyle={styles.scrollBar}
                    showsVerticalScrollIndicator={false}
                >
                    <BookingCard />
                    <BookingCard />
                    <BookingCard />
                </ScrollView>
            } */}

            {
                (user.role === 'provider' || user.role === 'user') &&
                <FlatList
                    data={data}
                    style={{ width: '90%' }}
                    contentContainerStyle={{ padding: 5 }}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <BookingCardProvider data={item} isFav={true} submitHandler={() => { navigation.navigate('AdFullView', { item: item, isBooking: true }) }} />}
                />
            }
        </View>
    );
};

export default Bookings;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scrollBar: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: 50
        },
    });
};



