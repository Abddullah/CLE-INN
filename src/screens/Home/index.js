import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import FastImage from 'react-native-fast-image'
import { SliderBox } from "react-native-image-slider-box";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// local imports
import Images from '../../assets/images/index'
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import Categories from '../../components/Categories';
import screenResolution from '../../utilities/constants/screenResolution';
import CustomTabs from '../../components/CustomTabs';
import ServiceCard from '../../components/ServiceCard';
import { RFValue } from 'react-native-responsive-fontsize';
import { fetchAds, showError, } from '../../store/actions/action'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    let user = useSelector((state) => state.reducer.user);
    let allcategories = useSelector((state) => state.reducer.categories);
    let ads = useSelector((state) => state.reducer.allAds);
    let isLoader = useSelector((state) => state.reducer.isLoader);
    console.log('isLoader', isLoader);

    const [search, setsearch] = useState('');
    const [selectedTab, setselectedTab] = useState();
    const [selectedCat, setselectedCat] = useState('');
    const [subCat, setsubCat] = useState([]);

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
        },
    ]);

    useEffect(() => {
        if (allcategories.length != 0) {
            setselectedCat(allcategories[0]?.categoryName)
            setsubCat(allcategories[0]?.subCategories)
            dispatch(fetchAds(allcategories[0]?.categoryName, user.role === 'user' ? 'service' : 'jobs'))
        }
    }, [allcategories])

    useEffect(() => {
        user.role === 'user' && setselectedTab(t('services'))
        user.role !== 'user' && setselectedTab(t('myjobs'))
    }, [user])

    const selectedCatHandler = (title, subCategories) => {
        setselectedCat(title)
        setsubCat(subCategories)
        dispatch(fetchAds(title, user.role === 'user' ? 'service' : 'jobs'))
    }

    const groupedAds = subCat.reduce((acc, key) => {
        const adsForSubCat = ads.filter((item) => item.subCategory === key);
        if (adsForSubCat.length > 0) {
            acc[key] = adsForSubCat;
        }
        return acc;
    }, {});

    return (
        <View style={styles.container}>

            <View style={styles.boxContainer}>
                <View style={{ flexDirection: 'row', width: '100%', }}>
                    <Feather name="sun" style={{ fontSize: RFValue(20, screenResolution.screenHeight), color: colors.yellow, }} />
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, marginLeft: 10 }]}>{'Good Morning,'}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{' Mark Wisdom'}</Text>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{'  ' + user.role}</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', }}>
                    <FontAwesome5 name="map-marker-alt" style={{ fontSize: RFValue(18, screenResolution.screenHeight), color: colors.BothPrimary_01, left: 3 }} />
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginLeft: 13 }]}>{'Italy, Teramo city'}</Text>
                </View>


                <View style={{ width: '100%', }}>
                    <View style={styles.inputContiner}>
                        <AntDesign name="search1" style={{ fontSize: RFValue(20, screenResolution.screenHeight), color: colors.Primary_01, }} />
                        <TextInput
                            // keyboardType='number-pad'
                            style={styles.input}
                            value={search}
                            onChangeText={(e) => { setsearch(e) }}
                            placeholder={t('search')}
                            placeholderTextColor={theme === 'dark' ? colors.white : colors.Neutral_01}
                        />
                    </View>
                </View>
            </View>

            <ScrollView
                style={{ width: '95%', }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                {/* //////////////////////////////////////////////////////////////Provider////////////////////////////////////////////////////////// */}
                {
                    user.role !== 'user' &&
                    <View style={styles.buttonContainer}>
                        <CustomTabs selectedState={selectedTab} setselectedState={setselectedTab} title={t('myjobs')} />
                        <CustomTabs selectedState={selectedTab} setselectedState={setselectedTab} title={t('myads')} />
                    </View>
                }

                {/* //////////////////////////////////////////////////////////////User////////////////////////////////////////////////////////////// */}
                {
                    user.role === 'user' &&
                    <View style={styles.buttonContainer}>
                        <CustomTabs selectedState={selectedTab} setselectedState={setselectedTab} title={t('services')} />
                        <CustomTabs selectedState={selectedTab} setselectedState={setselectedTab} title={t('myjobs')} />
                    </View>
                }

                {/* My Ads Servives for provider*/}
                {
                    (user.role !== 'user' && selectedTab === t('myads')) &&
                    <>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <FlatList
                                data={data}
                                style={{ marginTop: 10, }}
                                contentContainerStyle={{ justifyContent: 'center', }} // Add padding for even spacing on the sides
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <ServiceCard
                                        data={item}
                                        isFav={true}
                                        submitHandler={() => { navigation.navigate('AdFullView', { item: item, isMyAd: true }) }}
                                    />
                                )}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Add vertical space between rows
                            />
                        </View>
                    </>
                }

                {/* My Jobs for User */}
                {
                    (user.role === 'user' && selectedTab === t('myjobs')) &&
                    <>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <FlatList
                                data={data}
                                style={{ marginTop: 10, }}
                                contentContainerStyle={{ justifyContent: 'center', }}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <ServiceCard
                                        data={item}
                                        isFav={true}
                                        submitHandler={() => { navigation.navigate('AdFullView', { item: item, isMyAd: true, isJobCreate: true }) }}
                                    />
                                )}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                            />
                        </View>
                    </>
                }

                {/* Jobs and services Tab */}
                {
                    (selectedTab === t('services') || (user.role === 'provider' ? selectedTab === t('myjobs') : selectedTab !== t('myjobs'))) &&
                    <>
                        <View style={styles.catContainer}>
                            <View style={styles.headerSection}>
                                <SliderBox
                                    autoplay={true}
                                    ImageComponent={FastImage}
                                    images={[Images.cleaning, Images.cleaning, Images.cleaning, Images.cleaning, Images.cleaning]}
                                    sliderBoxHeight={230}
                                    onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                                    dotColor={colors.Primary_01}
                                    inactiveDotColor="#90A4AE"
                                    resizeMethod={'resize'}
                                    resizeMode={'cover'}
                                    circleLoop
                                    dotStyle={{ width: 8, height: 8, borderRadius: 4, }}
                                />
                            </View>
                            <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('specialservices')}</Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{ flexDirection: 'row', marginTop: 10 }}
                            >
                                <FlatList
                                    data={allcategories}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) =>
                                        <Categories
                                            selectedCat={selectedCat}
                                            subCategories={item.subCategories}
                                            icon={item.image}
                                            title={item.categoryName}
                                            submitHandler={(title, subCategories) => {
                                                selectedCatHandler(title, subCategories)
                                            }}
                                        />
                                    }
                                />
                            </ScrollView>
                        </View>

                        {
                            Object.keys(groupedAds).map((key) => (
                                <View key={key} style={{ width: '95%', alignItems: 'flex-start' }}>
                                    <View style={styles.subCatTextContainer}>
                                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginTop: 20 }]}>
                                            {key}
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                navigation.navigate('CategoriesList', { subCatTitle: key });
                                            }}
                                        >
                                            <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginTop: 20 }]}>
                                                {t('viewAll')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={groupedAds[key]}
                                        contentContainerStyle={{ marginTop: 10, padding: 5, }}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) =>
                                            <ServiceCard
                                                index={index}
                                                data={item}
                                                isFav={true}
                                                submitHandler={() => {
                                                    navigation.navigate('AdFullView', { item: item });
                                                }}
                                            />
                                        }
                                    />
                                </View>
                            ))
                        }
                    </>
                }

            </ScrollView>

            <TouchableOpacity
                activeOpacity={.8}
                style={styles.febbutton}
                onPress={() => { navigation.navigate('ServiceCreate', { isJobCreate: user.role === 'user' ? true : false }) }}
            >
                <Ionicons name="add-outline" style={{ fontSize: RFValue(12, screenResolution.screenWidth), color: colors.white, }} />
            </TouchableOpacity>

        </View>
    );
};

export default Home;
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
        boxContainer: {
            width: '90%',
            height: 120,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingBottom: 10,
            // backgroundColor: 'red'
        },
        inputContiner: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 10,
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: colors.BothWhite
        },
        input: {
            width: "90%", color: colors.black,
            marginLeft: 7,
            fontSize: RFValue(7, screenResolution.screenWidth),
        },
        catContainer: {
            marginTop: 10,
            width: '95%',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        headerSection: {
            height: 180,
            width: '100%',
            overflow: 'hidden',
            borderRadius: 10,
            backgroundColor: 'white',
            marginBottom: 10
        },
        catBox: {
            width: 98,
            justifyContent: 'center',
            alignItems: 'center',
        },
        febbutton: {
            position: 'absolute', bottom: 25, right: 25,
            borderRadius: 50, height: 50, width: 50,
            backgroundColor: colors.White_Primary_01,
            justifyContent: 'center', alignItems: 'center',
            borderColor: colors.white,
            borderWidth: 2
        },
        buttonContainer: {
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        subCatTextContainer: {
            flexDirection: 'row',
            width: '97%',
            justifyContent: 'space-between'
        }
    });
};

