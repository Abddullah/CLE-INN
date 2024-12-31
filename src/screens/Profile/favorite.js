
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import Images from '../../assets/images/index'
import ServiceCard from '../../components/ServiceCard';
import ServiceCardDiscounted from '../../components/ServiceCardDiscounted';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import CustomTabs from '../../components/CustomTabs';

const Favorite = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    const [selectedTab, setselectedTab] = useState(t('allFavorites'));
    const [data, setdata] = useState([
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: Images.cleaning
        },
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: Images.cleaning
        },
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: Images.cleaning
        },
        {
            title: 'Cleaning at Company',
            description: 'We specialize in delivering top-quality house cleaning services, ensuring every corner is spotless. Our team is committed to using 100% effort and care in every task, from dusting and vacuuming to deep cleaning kitchens and bathrooms.',
            price: 25,
            discount: 30,
            images: Images.cleaning
        },

    ]);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('Favorites')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <View style={styles.buttonContainer}>
                <CustomTabs selectedState={selectedTab} setselectedState={setselectedTab} title={t('allFavorites')} />
                <CustomTabs selectedState={selectedTab} setselectedState={setselectedTab} title={t('discountinFavorites')} />
            </View>

            {
                selectedTab === t('allFavorites') &&
                <FlatList
                    data={data}
                    style={{ marginTop: 10, }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} // Add padding for even spacing on the sides
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ServiceCard
                            data={item}
                            isFav={true}
                        // submitHandler={() => { navigation.navigate('AdFullView', { item: item, isBooking: false }) }}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Add vertical space between rows
                />

            }
            {
                selectedTab === t('discountinFavorites') &&
                <FlatList
                    data={data}
                    contentContainerStyle={{ marginTop: 10, marginLeft: 20, paddingRight: 35 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ServiceCardDiscounted data={item} />}
                />
            }
        </View>
    );
};

export default Favorite;

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
        buttonContainer: {
            marginTop: 10,
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        button: {
            borderRadius: 5,
            width: '40%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.White_Primary_01
        }
    });
};


