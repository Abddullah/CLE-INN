import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { Typography } from '../../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import ServiceCard from '../../components/ServiceCard';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';

const CategoriesList = ({ navigation }) => {
    let user = useSelector((state) => state.reducer.user);
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme, user,);
    const route = useRoute();
    let subCatTitle = route.params?.subCatTitle;
    let ads = route.params?.ads;

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
        <>
            <View style={{ width: '100%', alignItems: 'center', }}>
                <CustomHeader
                    title={t('subCategories')}
                    isLeft={true}
                    leftPress={() => { navigation.goBack() }}
                />
                <View style={styles.subCatTextContainer}>
                    <Text style={[Typography.text_subHeading, { fontWeight: 'bold', color: colors.black, marginTop: 20 }]}>
                        {subCatTitle}
                    </Text>
                </View>
                <View style={{ width: '95%', alignItems: ads.length > 1 ? 'center' : 'flex-start', }}>
                    <FlatList
                        data={ads}
                        style={{ marginTop: 10 }}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ServiceCard
                                data={item}
                                isFav={true}
                                submitHandler={() => { navigation.navigate('AdFullView', { item: item }) }}
                            />
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    />
                </View>
            </View >
        </>
    );
};

export default CategoriesList;

const createStyles = (colors, theme, user,) => {
    return StyleSheet.create({
        subCatTextContainer: {
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between'
        }
    });
};




