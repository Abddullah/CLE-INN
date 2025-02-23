import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { CurrentRenderContext, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Select } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo'
import DatePicker from 'react-native-date-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
// local imports
import { useTheme } from '../../../ThemeContext';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { Typography } from '../../utilities/constants/constant.style';
import CTAButton1 from '../../components/CTA_BUTTON1';
import CustomHeader from '../../components/Header';
import WeekTimeSelector from '../../components/WeekTimeSelector';
import Images from '../../assets/images/index'
import screenResolution from '../../utilities/constants/screenResolution';
import RepeatService from '../../components/RepeatService_Popup';
import InformationPopup from '../../components/Information_Popup';
import BookingStatusTab from '../../components/BookingStatusTab';
import HorizontalList from '../../components/horizontalList';
import AdditionalServices from '../../components/AdditionalServices';
import { createJob, createService, showError, updateUserAdsById, } from '../../store/actions/action';
import SmallMap from '../../components/smallMap';
import Toast from 'react-native-toast-message';

const deviceWidth = screenResolution.screenWidth;
const CleaningAndHygineService = "Cleaning and Hygiene Services";

const CreateService = ({ navigation }) => {
    // styling themes state
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme, deviceWidth);

    const route = useRoute();
    const dispatch = useDispatch();
    const { adId, isEdit, } = route.params || null
    let isJobCreate = route.params.isJobCreate;
    let user = useSelector((state) => state.reducer.user);
    let isError = useSelector((state) => state.reducer.isError);
    let savedCords = useSelector((state) => state.reducer.savedCords);
    let allcategories = useSelector((state) => state.reducer.categories);
    // let hourlyRates = useSelector((state) => state.reducer.hourlyRates);
    let roomSizes = useSelector((state) => state.reducer.roomSize);
    let noOfRooms = useSelector((state) => state.reducer.noOfRooms);
    let taxes = useSelector((state) => state.reducer.taxes);
    let fixRates = useSelector((state) => state.reducer.fixRates);

    const [step, setstep] = useState(0);
    // repeate service modal state
    const [modalVisible, setModalVisible] = useState(true);
    const [repeateService, setrepeateService] = useState('One Time');
    // informationPopups state 
    const [informationPopup, setinformationPopup] = useState(false);
    const [informationPopup1, setinformationPopup1] = useState(false);

    const [hourlyRates, sethourlyRates] = useState('0');
    const [previousHourlyRates, setPreviousHourlyRates] = useState('0');

    const [selectedHour, setselectedHour] = useState(isJobCreate ? '1' : '0');
    const [previousSelectedHour, setPreviousSelectedHour] = useState('0');

    const [selectedProfessional, setselectedProfessional] = useState(isJobCreate ? '1' : '0');
    const [previousSelectedProfessional, setPreviousSelectedProfessional] = useState('0');

    const [selectedCategories, setselectedCategories] = useState('');
    const [subcategories, setsubcategories] = useState([]);
    const [selectedsubcategories, setselectedsubcategories] = useState('');

    const [roomsize, setroomsize] = useState('');
    const [previousRoomRate, setPreviousRoomRate] = useState(0);

    const [roomsQty, setroomsQty] = useState('');
    const [previousRoomQtyPrice, setPreviousRoomQtyPrice] = useState(0);

    const [needCleaningMaterials, setneedCleaningMaterials] = useState(t('noIhavethem'));

    const [aditionalSelectedServices, setaditionalSelectedServices] = useState([]);
    const [previousAdditionalServices, setPreviousAdditionalServices] = useState([]);

    const [totalPrice, settotalPrice] = useState('0');
    const [totalPriceWithTax, settotalPriceWithTax] = useState('0');

    const [productImages, setProductImages] = useState([{ imagURL: '' }, { imagURL: '' }, { imagURL: '' }, { imagURL: '' }, { imagURL: '' }, { imagURL: '' },]);

    const [date, setDate] = useState(new Date())
    const [openBs, setopenBs] = useState(false)
    const [showBs, setshowBs] = useState(false)
    const [dateSelected, setDateSelected] = useState(false);

    const [timeStart, settimeStart] = useState(new Date())
    const [timeStartOpen, settimeStartOpen] = useState(false)
    const [timeStartShow, settimeStartShow] = useState(false)
    const [timeStartSelected, settimeStartSelected] = useState(false);

    const [timeEnd, settimeEnd] = useState(new Date())
    const [timeEndOpen, settimeEndOpen] = useState(false)
    const [timeEndShow, settimeEndShow] = useState(false)
    const [timeEndSelected, settimeEndSelected] = useState(false);

    const [location, setlocation] = useState('')

    const [instructions, setinstructions] = useState('');
    const [description, setdescription] = useState('');

    const [selectedDays, setSelectedDays] = useState([]);

    const [isLoader, setisLoader] = useState(false);
    const [isFlag, setIsFlag] = useState(false);
    const [hasEdited, setHasEdited] = useState(false);

    useEffect(() => {
        sethourlyRates(user.hourlyRate);
        if (isEdit != null && !hasEdited) {
            const timeout = setTimeout(() => {
                setHasEdited(true);
                isEdit.addType === 'job' && totalForEdit();
            }, 0);
            editHandler();
            return () => clearTimeout(timeout);
        }
    }, [user, totalPrice]);

    useEffect(() => {
        taxHandler();
    }, [totalPrice]);

    useEffect(() => {
        isJobCreate && initialTotalPrice()
    }, [hourlyRates, selectedHour, selectedProfessional, aditionalSelectedServices]);

    const initialTotalPrice = async () => {
        let previousTotal = previousSelectedHour * previousHourlyRates * previousSelectedProfessional;
        let newTotal = selectedHour * hourlyRates * selectedProfessional;
        let total = Number(totalPrice) - previousTotal + newTotal;
        settotalPrice(total);
        // Update previous values
        setPreviousHourlyRates(hourlyRates);
        setPreviousSelectedHour(selectedHour);
        setPreviousSelectedProfessional(selectedProfessional);
        setIsFlag(!isFlag);
        taxHandler();
    };

    const categoryHandler = (categoryName) => {
        setselectedCategories(categoryName);
        let subCat = allcategories.find(category => category.categoryName === categoryName);
        setsubcategories(subCat.subCategories)
        // Clear the previous values
        let newTotal = selectedHour * hourlyRates * selectedProfessional;
        settotalPrice(newTotal);
        setselectedsubcategories('');
        setroomsize('');
        setroomsQty('');
        setneedCleaningMaterials(t('noIhavethem'));
        setaditionalSelectedServices([]);
    };

    const roomSizeHandler = (itemValue) => {
        setroomsize(itemValue);
        let find = roomSizes.find(item => item.title === itemValue);
        let total = Number(totalPrice) - Number(previousRoomRate) + Number(find.rate);
        settotalPrice(total);
        // Update previous values
        setPreviousRoomRate(Number(find.rate));
    }

    const roomQtyHandler = (itemValue) => {
        setroomsQty(itemValue);
        let find = noOfRooms.find(item => item.title === itemValue);
        let total = Number(totalPrice) - Number(previousRoomQtyPrice) + Number(find.price);
        settotalPrice(total);
        // Update previous values
        setPreviousRoomQtyPrice(Number(find.price));
    }

    const cleaningMaterialHandler = (itemValue) => {
        if (itemValue === 'No, I have them' || itemValue === 'No, li ho') {
            let total = Number(totalPrice) - 6;
            needCleaningMaterials !== ('No, I have them' || itemValue === 'No, li ho') && settotalPrice(total);
        } else {
            let total = Number(totalPrice) + 6;
            needCleaningMaterials === ('No, I have them' || itemValue === 'No, li ho') && settotalPrice(total);
        }
        setneedCleaningMaterials(itemValue);
    }

    const additionalServicesHandler = (itemValue) => {
        let total = Number(totalPrice);
        previousAdditionalServices.forEach(item => { total -= Number(item.price); });
        itemValue?.forEach(item => { total += Number(item.price); });
        setaditionalSelectedServices(itemValue);
        settotalPrice(total);
        setPreviousAdditionalServices(itemValue);
        setIsFlag(false)
    }

    useEffect(() => {
        if (route?.params?.item) {
            // setName(route?.params?.item.name)
            // setDescription(route?.params?.item.description)
            // setprice(route?.params?.item.price)
            // setlastHourDiscount(route?.params?.item.lastHourDiscount)
            // let imgs = [
            //     { imagURL: route?.params?.item.image[0] ? route?.params?.item.image[0] : '' },
            //     { imagURL: route?.params?.item.image[1] ? route?.params?.item.image[1] : '' },
            //     { imagURL: route?.params?.item.image[2] ? route?.params?.item.image[2] : '' },
            //     { imagURL: route?.params?.item.image[3] ? route?.params?.item.image[3] : '' },
            //     { imagURL: route?.params?.item.image[4] ? route?.params?.item.image[4] : '' },
            //     { imagURL: route?.params?.item.image[5] ? route?.params?.item.image[5] : '' },
            // ]
            // setProductImages(imgs)
        }
        return () => {
            // Clear the state when the component unmounts
            setProductImages([
                { imagURL: '' },
                { imagURL: '' },
                { imagURL: '' },
                { imagURL: '' },
                { imagURL: '' },
                { imagURL: '' },
            ])
        };
    }, [route?.params]);

    const crossImage = async (index) => {
        const updatedImages = [...productImages];
        updatedImages[index].imagURL = '';
        setProductImages(updatedImages);
    };

    const uploadImageToStorage = async (path, name) => {
        try {
            setisLoader(true)
            let reference = storage().ref(name);
            let task = await reference.putFile(path);
            setisLoader(false)
            if (task) {
                return await reference.getDownloadURL();
            }
        } catch (error) {
            console.log('Error uploading image:', error);
            setisLoader(false)
            return null;
        }
    };

    const pickImage = async (index) => {
        try {
            let options = {
                title: 'Select Image',
                includeBase64: true,
                customButtons: [
                    {
                        name: 'customOptionKey',
                        title: 'Choose Photo from Custom Option',
                    },
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                quality: 0.1,
            };
            launchImageLibrary(options, async (res) => {
                if (res.didCancel) {
                    // User canceled the image selection
                } else if (res.error) {
                    // Error occurred while selecting an image
                } else {
                    const updatedImages = [...productImages];
                    updatedImages[index].imagURL = res.assets[0].uri;
                    // updatedImages[index].imagURL = await uploadImageToStorage(res?.assets[0]?.uri, res?.assets[0]?.fileName);
                    setProductImages(updatedImages);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const pickImages = async () => {
        try {
            let options = {
                mediaType: 'photo',
                selectionLimit: 6, // Limit to 6 images at once
                includeBase64: false,
                customButtons: [
                    {
                        name: 'customOptionKey',
                        title: 'Choose Photo from Custom Option',
                    },
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                quality: 0.1,
            };

            launchImageLibrary(options, async (res) => {
                if (res.didCancel) {
                    console.log('User canceled the image selection');
                } else if (res.error) {
                    console.log('Error occurred while selecting an image:', res.error);
                } else {
                    const selectedImages = res.assets.map(asset => asset.uri);
                    const updatedImages = [...productImages];
                    for (let i = 0; i < selectedImages.length; i++) {
                        const imageName = `image_${Date.now()}_${i}.jpg`; // Unique name for each image
                        const downloadURL = await uploadImageToStorage(selectedImages[i], imageName);
                        if (downloadURL) {
                            let imageReplaced = false;
                            let emptySlotIndex = 0;
                            // Check if there's an empty slot
                            while (emptySlotIndex < updatedImages.length) {
                                if (updatedImages[emptySlotIndex].imagURL === '') {
                                    updatedImages[emptySlotIndex].imagURL = downloadURL;
                                    imageReplaced = true;
                                    emptySlotIndex++;
                                    break;
                                }
                                emptySlotIndex++;
                            }
                            // If no empty slot was found, replace images starting from the beginning
                            if (!imageReplaced) {
                                updatedImages[i % updatedImages.length].imagURL = downloadURL;
                            }
                        }
                    }
                    setProductImages(updatedImages);
                }
            });
        } catch (err) {
            console.log('Error in pickImages:', err);
        }
    };

    const handleSelectedDaysChange = (e) => {
        setSelectedDays(e);
    };

    const editHandler = () => {
        setrepeateService(isEdit.repeateService)

        setselectedHour(String(isEdit.howManyHourDoYouNeed))
        setPreviousSelectedHour(String(isEdit.howManyHourDoYouNeed))

        setselectedProfessional(String(isEdit.howManyProfessionalDoYouNeed))
        setPreviousSelectedProfessional(String(isEdit.howManyProfessionalDoYouNeed))

        setselectedCategories(isEdit.category)
        let subCat = allcategories.find(category => category.categoryName === isEdit.category)
        setsubcategories(subCat.subCategories)
        setselectedsubcategories(isEdit.subCategory)

        setroomsize(isEdit.roomSize)

        setroomsQty(isEdit.roomsQty)

        if (isEdit.needCleaningMaterials === 'No, I have them') {
            setneedCleaningMaterials(t('noIhavethem'))
        }
        if (isEdit.needCleaningMaterials === 'Yes, Please') {
            setneedCleaningMaterials(t('yesPlease'))
        }

        setaditionalSelectedServices(isEdit.aditionalServices);
        setPreviousAdditionalServices(isEdit.aditionalServices);

        setProductImages(isEdit.images)

        setDate(new Date(isEdit.bookingDate));
        setshowBs(true)
        setDateSelected(true)

        settimeStart(new Date(isEdit.bookingStart));
        settimeStartShow(true)
        settimeStartSelected(true)

        settimeEnd(new Date(isEdit.bookingEnd));
        settimeEndShow(true)
        settimeEndSelected(true)

        !isJobCreate && settotalPrice(isEdit.fixedRates)
        setlocation(isEdit.address)
        setinstructions(isEdit.instructions)
        setdescription(isEdit.description)
        setSelectedDays(isEdit.timeSlots)
    }

    const totalForEdit = () => {
        let total = 0;
        // set roomSizes price
        let findRoomSize = roomSizes.find(item => item.title === isEdit.roomSize);
        total = total + Number(findRoomSize.rate);
        setPreviousRoomRate(Number(findRoomSize.rate))
        // set roomQty price
        let findNoOfRooms = noOfRooms.find(item => item.title === isEdit.roomsQty);
        total = total + Number(findNoOfRooms.price);
        setPreviousRoomQtyPrice(Number(findNoOfRooms.price))
        // set aditionalServices price
        if (isEdit.needCleaningMaterials === 'Yes, Please') {
            total = total + 6;
        }
        // set aditionalServices price
        isEdit?.aditionalServices?.forEach(item => { total += Number(item.price); });
        settotalPrice(total + totalPrice)
    }

    const taxHandler = () => {
        let total = Number(totalPrice);
        let tax = 0;
        for (let i = 0; i < taxes.length; i++) {
            let taxPercentage = Number(taxes[i].percentage);
            let taxAmount = (total * taxPercentage) / 100;
            tax += taxAmount;
        }
        settotalPriceWithTax(Number(total + tax));
    };

    const stepsHandler = () => {
        if (isJobCreate) {
            if (step === 0) {
                if (selectedCategories === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectcategory'), position: 'bottom' });
                }
                else if (selectedsubcategories === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectsubcategory'), position: 'bottom' });
                }
                else if (selectedCategories === CleaningAndHygineService && roomsize === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectroomsize'), position: 'bottom' });
                }
                else if (selectedCategories === CleaningAndHygineService && roomsQty === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectroomquantity'), position: 'bottom' });
                }
                else if (selectedCategories === CleaningAndHygineService && needCleaningMaterials === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectcleaningmaterial'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 1) {
                if (productImages[0].imagURL === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectimage'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 2) {
                if (!dateSelected) {
                    Toast.show({ type: 'error', text1: t('Pleaseselectadate'), position: 'bottom' });
                }
                else if (!timeStart || isNaN(new Date(timeStart).getTime())) {
                    Toast.show({ type: 'error', text1: t('Pleaseselectavalidstarttime'), position: 'bottom' });
                } else if (!timeEnd || isNaN(new Date(timeEnd).getTime())) {
                    Toast.show({ type: 'error', text1: t('Pleaseselectavalidendtime'), position: 'bottom' });

                } else if (new Date(timeStart) >= new Date(timeEnd)) {
                    Toast.show({ type: 'error', text1: t('Starttimemustbebeforeendtime'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 3) {
                if (location === '') {
                    Toast.show({ type: 'error', text1: t('Pleasetypelocation'), position: 'bottom' });
                }
                else if (instructions === '') {
                    Toast.show({ type: 'error', text1: t('Pleasetypeinstructions'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 4) {
                createJobHandler()
            }
            dispatch(showError())
        } else {
            if (step === 0) {
                if (selectedCategories === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectcategory'), position: 'bottom' });
                }
                else if (selectedsubcategories === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectsubcategory'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 1) {
                if (totalPrice === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectrates'), position: 'bottom' });
                }
                else if (description === '') {
                    Toast.show({ type: 'error', text1: t('Pleasetypedescription'), position: 'bottom' });
                }
                else if (productImages[0].imagURL === '') {
                    Toast.show({ type: 'error', text1: t('Pleaseselectimage'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 2) {
                if (selectedDays.length === 0 || selectedDays.some(day => day?.openingTime == null || day?.closingTime == null)) {
                    Toast.show({ type: 'error', text1: t('PleaseSelectTimeSlot'), position: 'bottom' });
                }
                else {
                    setstep(step + 1)
                }
            }
            if (step === 3) {
                createServiceHandler()
            }
            dispatch(showError())
        }
    }

    const backHandler = () => {
        if (step === 0) {
            navigation.goBack()
        } else {
            setstep(step - 1)
        }
    }

    const createJobHandler = () => {
        const geoPoint = new firestore.GeoPoint(savedCords[0], savedCords[1]);

        let formatCleaningMaterials = '';

        if (needCleaningMaterials === t('noIhavethem')) {
            formatCleaningMaterials = 'No, I have them'
        }
        if (needCleaningMaterials === t('yesPlease')) {
            formatCleaningMaterials = 'Yes, Please'
        }

        let data = {
            repeateService: repeateService,
            howManyHourDoYouNeed: selectedHour,
            howManyProfessionalDoYouNeed: selectedProfessional,
            category: selectedCategories,
            subCategory: selectedsubcategories,
            roomSize: roomsize,
            roomsQty: roomsQty,
            needCleaningMaterials: formatCleaningMaterials,
            aditionalServices: aditionalSelectedServices,
            totalPrice: totalPrice,
            totalPriceWithTax: totalPriceWithTax,
            images: productImages,
            bookingDate: new Date(date).getTime(),
            bookingStart: new Date(timeStart).getTime(),
            bookingEnd: new Date(timeEnd).getTime(),
            address: location,
            geoPoint: geoPoint,
            instructions: instructions,
            addStatus: 'pending',
            addType: 'job',
            postedBy: user.userId,
        }
        if (adId != null) {
            dispatch(updateUserAdsById(adId, data, 'jobs', navigation))
        } else {
            dispatch(createJob(data, navigation))
        }
    }

    const createServiceHandler = () => {
        const geoPoint = new firestore.GeoPoint(savedCords[0], savedCords[1]);
        let data = {
            category: selectedCategories,
            subCategory: selectedsubcategories,
            totalPriceWithTax: totalPriceWithTax,
            fixedRates: totalPrice,
            description: description,
            images: productImages,
            createdAt: new Date().getTime(),
            geoPoint: geoPoint,
            timeSlots: selectedDays,
            addStatus: 'pending',
            addType: 'service',
            postedBy: user.userId,
        }
        if (adId != null) {
            dispatch(updateUserAdsById(adId, data, 'service', navigation))
        } else {
            dispatch(createService(data, navigation))
        }
    }

    return (
        (hourlyRates === 0 || hourlyRates === '' || hourlyRates === '0') ? (
            <View style={styles.container} >
                <CustomHeader
                    title={isJobCreate ? t('createJob') : t('createService')}
                    isLeft={true}
                    leftPress={() => { backHandler() }}
                />
                <View style={[styles.body, { justifyContent: 'center', width: "70%" }]}>
                    <Text style={[Typography.text_paragraph_1, styles.headingText, { textAlign: 'center' }]}>{t('pleaseSetYourHourlyRate')}</Text>
                </View>
            </View>
        ) : (
            <View style={styles.container} >
                <CustomHeader
                    title={isJobCreate ? t('createJob') : t('createService')}
                    isLeft={true}
                    leftPress={() => { backHandler() }}
                />

                {
                    user.role !== 'provider' && <RepeatService modalVisible={modalVisible} setModalVisible={(selected) => { setModalVisible(false); setrepeateService(selected) }} />
                }

                <InformationPopup modalVisible={informationPopup} setModalVisible={() => setinformationPopup(false)} info={1} />
                <InformationPopup modalVisible={informationPopup1} setModalVisible={() => setinformationPopup1(false)} info={2} />

                {
                    step === 0 &&
                    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%', }}>
                        <View style={{ width: '90%' }}>
                            {
                                isJobCreate &&
                                <>
                                    <View style={styles.heading}>
                                        <TouchableOpacity
                                            onPress={() => { setinformationPopup(!informationPopup) }}
                                            activeOpacity={.8}
                                            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, }}
                                        >
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('howmanyhoursdoyou')}</Text>
                                            <FontAwesome5 name="info-circle" style={{ fontSize: RFValue(18, screenResolution.screenHeight), color: colors.White_Primary_01, marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>

                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.horizontalScroll}
                                    >
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'1'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'2'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'3'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'4'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'5'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'6'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'7'} />
                                        <HorizontalList selectedState={selectedHour} setselectedState={setselectedHour} title={'8'} />
                                    </ScrollView>
                                    <View style={[styles.heading, { marginTop: 30 }]}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('howmanyprofessional')}</Text>
                                    </View>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.horizontalScroll}
                                    >
                                        <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'1'} />
                                        <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'2'} />
                                        <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'3'} />
                                        <HorizontalList selectedState={selectedProfessional} setselectedState={setselectedProfessional} title={'4'} />
                                    </ScrollView>
                                </>
                            }

                            <View style={[styles.heading, { marginTop: 30, }]}>
                                <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('selectCategory')}</Text>
                                {
                                    isError && selectedCategories == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </View>

                            <View style={styles.listDropDown}>
                                <Select
                                    bg={colors.white}
                                    borderWidth={0}
                                    selectedValue={selectedCategories}
                                    minWidth="100%"
                                    accessibilityLabel={t('selectCategory')}
                                    placeholder={t('selectCategory')}
                                    placeholderTextColor={colors.Neutral_01}
                                    _selectedItem={{
                                        background: colors.Primary_01,
                                    }}
                                    color={colors.Neutral_01}
                                    mt={1}
                                    onValueChange={itemValue => categoryHandler(itemValue)}
                                >
                                    {
                                        allcategories.length && allcategories.map((category, index) => (
                                            <Select.Item
                                                key={index}
                                                label={category.categoryName}
                                                value={category.categoryName}
                                            />
                                        ))
                                    }
                                </Select>
                            </View>

                            {
                                selectedCategories != '' &&
                                <>
                                    <View style={styles.heading}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('subCategories')}</Text>
                                        {
                                            isError && selectedsubcategories == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                        }
                                    </View>
                                    <View style={styles.listDropDown}>
                                        <Select
                                            bg={colors.white}
                                            borderWidth={0}
                                            selectedValue={selectedsubcategories}
                                            minWidth="100%"
                                            accessibilityLabel={t('subCategories')}
                                            placeholder={t('subCategories')}
                                            placeholderTextColor={colors.Neutral_01}
                                            _selectedItem={{
                                                background: colors.Primary_01,
                                            }}
                                            color={colors.Neutral_01}
                                            mt={1}
                                            onValueChange={itemValue => setselectedsubcategories(itemValue)}
                                        >
                                            {
                                                subcategories.length && subcategories.map((category, index) => (
                                                    <Select.Item
                                                        key={index}
                                                        label={category}
                                                        value={category}
                                                    />
                                                ))
                                            }
                                        </Select>
                                    </View>
                                </>
                            }

                            {
                                isJobCreate && selectedCategories === CleaningAndHygineService &&
                                <>
                                    <View style={styles.heading}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('areaSize')}</Text>
                                        {
                                            isError && roomsize == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                        }
                                    </View>
                                    <View style={styles.listDropDown}>
                                        <Select
                                            bg={colors.white}
                                            borderWidth={0}
                                            selectedValue={roomsize}
                                            minWidth="100%"
                                            accessibilityLabel="User"
                                            placeholder={t('areaSize')}
                                            placeholderTextColor={colors.Neutral_01}
                                            _selectedItem={{
                                                background: colors.Primary_01,
                                            }}
                                            color={colors.Neutral_01}
                                            mt={1} onValueChange={itemValue => roomSizeHandler(itemValue)}
                                        >
                                            {
                                                roomSizes.length && roomSizes.map((key, index) => (
                                                    <Select.Item
                                                        key={index}
                                                        label={key.title}
                                                        value={key.title}
                                                    />
                                                ))
                                            }
                                        </Select>
                                    </View>
                                </>
                            }

                            {
                                isJobCreate && selectedCategories === CleaningAndHygineService &&
                                <>
                                    <View style={styles.heading}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('roomsNumber')}</Text>
                                        {
                                            isError && roomsQty == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                        }
                                    </View>
                                    <View style={styles.listDropDown}>
                                        <Select
                                            bg={colors.white}
                                            borderWidth={0}
                                            selectedValue={roomsQty}
                                            minWidth="100%"
                                            accessibilityLabel="User"
                                            placeholder={t('roomsNumber')}
                                            placeholderTextColor={colors.Neutral_01}
                                            _selectedItem={{
                                                background: colors.Primary_01,
                                            }}
                                            color={colors.Neutral_01}
                                            mt={1} onValueChange={itemValue => roomQtyHandler(itemValue)}
                                        >
                                            {
                                                noOfRooms.length && noOfRooms.map((key, index) => (
                                                    <Select.Item
                                                        key={index}
                                                        label={key.title}
                                                        value={key.title}
                                                    />
                                                ))
                                            }
                                        </Select>
                                    </View>
                                </>
                            }

                            {
                                isJobCreate && selectedCategories === CleaningAndHygineService &&
                                <>
                                    <TouchableOpacity
                                        onPress={() => { setinformationPopup1(!informationPopup1) }}
                                        activeOpacity={.8}
                                        style={{ flexDirection: 'row', marginTop: 30, }}
                                    >
                                        <Text style={[Typography.text_paragraph_1, styles.headingText, {}]}>{t('needCleaningMaterials')}</Text>
                                        <FontAwesome5 name="info-circle" style={{ fontSize: RFValue(18, screenResolution.screenHeight), color: colors.White_Primary_01, marginLeft: 5 }} />
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 20 }}>
                                        <BookingStatusTab selectedState={needCleaningMaterials} setselectedState={(e) => cleaningMaterialHandler(e)} title={t('noIhavethem')} />
                                        <BookingStatusTab selectedState={needCleaningMaterials} setselectedState={(e) => cleaningMaterialHandler(e)} title={t('yesPlease')} />
                                    </View>
                                </>
                            }

                            {
                                isJobCreate && selectedCategories === CleaningAndHygineService &&
                                <AdditionalServices onSelectedServicesChange={(e) => { additionalServicesHandler(e) }} selectedService={aditionalSelectedServices} />
                            }

                        </View>
                    </ScrollView>
                }

                {
                    step === 1 &&
                    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%', }}>
                        {
                            !isJobCreate &&
                            <View style={{ width: '90%' }}>
                                <View style={styles.heading}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('adfixedrate')}</Text>
                                    {
                                        isError && totalPrice == '0' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                    }
                                </View>
                                <View style={styles.listDropDown}>
                                    <Select
                                        bg={colors.white}
                                        borderWidth={0}
                                        selectedValue={totalPrice}
                                        minWidth="100%"
                                        accessibilityLabel="User"
                                        placeholder={t('adfixedrate')}
                                        placeholderTextColor={colors.Neutral_01}
                                        _selectedItem={{
                                            background: colors.Primary_01,
                                        }}
                                        color={colors.Neutral_01}
                                        mt={1} onValueChange={itemValue => settotalPrice(itemValue)}
                                    >
                                        {
                                            fixRates.length && fixRates.map((key, index) => (
                                                <Select.Item
                                                    key={index}
                                                    label={key.rate + ' Euro'}
                                                    value={key.rate}
                                                />
                                            ))
                                        }
                                    </Select>
                                </View>
                            </View>
                        }

                        {
                            !isJobCreate &&
                            <View style={{ width: '90%' }}>
                                <View style={styles.heading}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('description')}</Text>
                                </View>
                                <View style={styles.textAreaContainer}>
                                    <TextInput
                                        keyboardType="default"
                                        style={{ height: '100%', width: '100%', textAlignVertical: 'top', color: colors.black }}
                                        value={description}
                                        onChangeText={(e) => { setdescription(e) }}
                                        placeholder={t('description')}
                                        placeholderTextColor={colors.Neutral_01}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                        }

                        <View style={{ width: '90%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={{ flexDirection: 'row', }}
                            >
                                <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('photos')}</Text>
                                {
                                    isError && productImages[0].imagURL === '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={pickImages}
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                activeOpacity={.8}
                            >
                                <Ionicons color={colors.White_Primary_01} name={'add-circle-outline'} size={22} style={{ top: 2, marginRight: 5 }} />

                                <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('photos')}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ width: '90%' }}>
                            <FlatList
                                data={productImages}
                                numColumns={3}
                                contentContainerStyle={{}}
                                columnWrapperStyle={styles.columnWrapperStyle}
                                renderItem={({ item, index }) => (
                                    <View style={styles.imageContainer}>
                                        {
                                            item?.imagURL ? (
                                                <>
                                                    <Image source={{ uri: item?.imagURL }} style={{ height: '100%', width: '100%' }} />
                                                    <TouchableOpacity onPress={async () => { crossImage(index) }}
                                                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                                                        <Entypo color={colors.White_Primary_01} name={'cross'} size={30} />
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                (isLoader === true) ? (
                                                    <ActivityIndicator color={'#000000'} />
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={async () => { await pickImage(index) }}
                                                    >
                                                        <AntDesign color={colors.White_Primary_01} name={'plus'} size={30} />
                                                    </TouchableOpacity>
                                                )
                                            )
                                        }
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <View style={styles.list}>
                                <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('location')}</Text>
                                <View style={{ height: 250, width: '100%', marginTop: 10, overflow: 'hidden' }}>
                                    <SmallMap savedCords={savedCords} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }

                {
                    step === 2 &&
                    <View style={styles.body}>
                        {
                            !isJobCreate &&
                            <View style={{ width: '90%' }}>
                                <WeekTimeSelector
                                    theme={theme}
                                    colors={colors}
                                    selectedDays={selectedDays}
                                    onSelectedDaysChange={handleSelectedDaysChange}
                                />
                            </View>
                        }

                        {
                            isJobCreate &&
                            <View style={{ width: '90%', }}>
                                {/* Heading */}
                                <View style={styles.heading}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('whenwouldyoulike')}</Text>
                                </View>

                                {/* Date Section */}
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.fieldHeading, { color: colors.Neutral_01 }]}>{t('selectDate')}</Text>
                                        {isError && !dateSelected && <Text style={{ top: 3, color: "red", top: -1 }}>*</Text>}
                                    </View>

                                    <View style={styles.list1}>
                                        <View style={styles.dob}>
                                            {/* Date Picker */}
                                            <TouchableOpacity onPress={() => { setopenBs(true) }}  >
                                                {!showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.Neutral_01 }]}>{t('selectDate')}</Text>}
                                                {showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.black }]}>{moment(date).format('DD MM YYYY')}</Text>}
                                            </TouchableOpacity>

                                            <DatePicker
                                                minimumDate={new Date()}
                                                mode='date'
                                                modal
                                                open={openBs}
                                                date={date}
                                                onConfirm={(date) => {
                                                    setopenBs(false);
                                                    setDate(date);
                                                    setshowBs(true);
                                                    setDateSelected(true);
                                                }}
                                                onCancel={() => {
                                                    setopenBs(false);
                                                    setshowBs(false);
                                                }}
                                            />

                                            {/* Date Icon */}
                                            <TouchableOpacity onPress={() => { setopenBs(true) }}>
                                                <Fontisto name="date" style={styles.listIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                {/* Time Section start*/}
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.fieldHeading, { color: colors.Neutral_01 }]}>{t('selectTimeStart')}</Text>
                                        {isError && !timeStartSelected && <Text style={{ top: 3, color: "red", top: -1 }}>*</Text>}
                                    </View>
                                    <View style={styles.list1}>
                                        <View style={styles.dob}>
                                            {/* Date Picker */}
                                            <TouchableOpacity onPress={() => { settimeStartOpen(true) }}  >
                                                {!timeStartShow && <Text style={[styles.listText, { marginLeft: 10, color: colors.Neutral_01 }]}>{t('selectTime')}</Text>}
                                                {timeStartShow && <Text style={[styles.listText, { marginLeft: 10, color: colors.black }]}>{moment(timeStart).format('LT')}</Text>}
                                            </TouchableOpacity>
                                            <DatePicker
                                                // minimumDate={new Date()}
                                                mode='time'
                                                modal
                                                open={timeStartOpen}
                                                date={timeStart}
                                                onConfirm={(date) => {
                                                    settimeStart(date);
                                                    settimeStartOpen(false);
                                                    settimeStartShow(true);
                                                    settimeStartSelected(true);
                                                }}
                                                onCancel={() => {
                                                    settimeStartOpen(false);
                                                    settimeStartShow(false);
                                                }}
                                            />
                                            {/* Date Icon */}
                                            <TouchableOpacity onPress={() => { settimeStartOpen(true) }}>
                                                <Fontisto name="date" style={styles.listIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                {/* Time Section end */}
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.fieldHeading, { color: colors.Neutral_01 }]}>{t('selectTimeEnd')}</Text>
                                        {isError && !timeEndSelected && <Text style={{ top: 3, color: "red", top: -1 }}>*</Text>}
                                    </View>
                                    <View style={styles.list1}>
                                        <View style={styles.dob}>
                                            {/* Date Picker */}
                                            <TouchableOpacity onPress={() => { settimeEndOpen(true) }}  >
                                                {!timeEndShow && <Text style={[styles.listText, { marginLeft: 10, color: colors.Neutral_01 }]}>{t('selectTime')}</Text>}
                                                {timeEndShow && <Text style={[styles.listText, { marginLeft: 10, color: colors.black }]}>{moment(timeEnd).format('LT')}</Text>}
                                            </TouchableOpacity>
                                            <DatePicker
                                                // minimumDate={new Date()}
                                                mode='time'
                                                modal
                                                open={timeEndOpen}
                                                date={timeEnd}
                                                onConfirm={(date) => {
                                                    settimeEnd(date);
                                                    settimeEndOpen(false);
                                                    settimeEndShow(true);
                                                    settimeEndSelected(true);
                                                }}
                                                onCancel={() => {
                                                    settimeEndOpen(false);
                                                    settimeEndShow(false);
                                                }}
                                            />
                                            {/* Date Icon */}
                                            <TouchableOpacity onPress={() => { settimeEndOpen(true) }}>
                                                <Fontisto name="date" style={styles.listIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                }

                {
                    step === 3 &&
                    <View style={styles.body}>
                        {
                            isJobCreate &&
                            <View style={{ width: '90%', }}>
                                <View style={styles.heading}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('location')}</Text>
                                    {
                                        isError && location == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                    }
                                </View>
                                <View style={styles.inputContiner}>
                                    <TextInput
                                        keyboardType='number-pad'
                                        style={{ color: colors.black }}
                                        value={location}
                                        onChangeText={(e) => { setlocation(e) }}
                                        placeholder={t('location')}
                                        placeholderTextColor={colors.Neutral_01}
                                    />
                                    <Feather name="map-pin" style={styles.listIcon} />
                                </View>
                                <View style={styles.heading}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('anyspecificinstruction')}</Text>
                                    {
                                        isError && instructions == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                                    }
                                </View>
                                <View style={styles.textAreaContainer}>
                                    <TextInput
                                        keyboardType="default"
                                        style={{ height: '100%', width: '100%', textAlignVertical: 'top', color: colors.black }}
                                        value={instructions}
                                        onChangeText={(e) => { setinstructions(e) }}
                                        placeholder={t('yourtext')}
                                        placeholderTextColor={colors.Neutral_01}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                        }

                        {
                            !isJobCreate &&
                            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%', }}>
                                <View style={{ width: '90%', }}>

                                    <View style={[styles.heading, { marginTop: 20 }]}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('service') + ' '}</Text>
                                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{selectedCategories + ' / ' + selectedsubcategories}</Text>
                                    </View>

                                    <View style={[styles.heading, { marginTop: 20 }]}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('description') + ' '}</Text>
                                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{description}</Text>
                                    </View>

                                    <View style={[styles.heading, { marginTop: 20 }]}>
                                        <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('price') + ' '}</Text>
                                        <Text style={[Typography.text_paragraph_1, styles.editText]}>{'€' + totalPrice}</Text>
                                    </View>

                                    <View style={[styles.list2, { flexDirection: 'column' }]}>
                                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, }]}>{t('availability')}</Text>
                                        {
                                            selectedDays.length > 0 && selectedDays.map((key, index) => {
                                                return (
                                                    <View key={index} style={{ alignItems: 'flex-start' }}>
                                                        <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, marginTop: 5 }]}>{key.day}</Text>
                                                        <Text style={[Typography.text_paragraph_1, { color: colors.White_Primary_01, }]}>{moment(key.openingTime).format('LT') + ' to ' + moment(key.closingTime).format('LT')}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>

                                    <View style={styles.taxContainer}>
                                        <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('pay') + ':'}</Text>

                                        <View style={styles.taxContainer_C1}>
                                            <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('amount')}</Text>
                                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€' + totalPrice}</Text>
                                        </View>
                                        {
                                            taxes.map((key, index) => {
                                                return (
                                                    <View key={index} style={styles.taxContainer_C1}>
                                                        <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{key.name + ' ' + key.percentage + '%'}</Text>
                                                        <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€' + Number(totalPrice / 100 * key.percentage).toFixed(1)}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                        <View style={styles.taxContainer_C1}>
                                            <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('total')}</Text>
                                            <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€' + totalPriceWithTax.toFixed(1)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        }
                    </View>
                }

                {
                    step === 4 &&
                    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%', }}>
                        {
                            isJobCreate &&
                            <View style={{ width: '90%', }}>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('service') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{selectedCategories + ' / ' + selectedsubcategories}</Text>
                                </View>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('description') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{instructions}</Text>
                                </View>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('cleaners') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{selectedProfessional}</Text>
                                </View>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('workFrequency') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{repeateService}</Text>
                                </View>

                                {
                                    selectedCategories === CleaningAndHygineService &&
                                    <>
                                        <View style={[styles.heading, { marginTop: 20 }]}>
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('areaSize') + ' '}</Text>
                                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{roomsize}</Text>
                                        </View>

                                        <View style={[styles.heading, { marginTop: 20 }]}>
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('roomsNumber') + ' '}</Text>
                                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{roomsQty}</Text>
                                        </View>

                                        <View style={[styles.heading, { marginTop: 20 }]}>
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('needCleaningMaterials') + ' '}</Text>
                                            <Text style={[Typography.text_paragraph_1, styles.editText]}>{needCleaningMaterials}</Text>
                                        </View>
                                        <View style={[styles.heading, { marginTop: 20 }]}>
                                            <View style={{ flexDirection: 'column', flexWrap: 'wrap', }}>
                                                <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('additionalService') + ' '}</Text>
                                                {
                                                    aditionalSelectedServices.map((service, index) => (
                                                        <Text key={index} style={[Typography.text_paragraph_1, styles.editText]}>{service.title}</Text>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </>
                                }

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('price') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{'€' + totalPrice}</Text>
                                </View>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('selectDate') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText,]}>{moment(date).format('DD MM YYYY')}</Text>
                                </View>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('selectTime') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{moment(timeStart).format('LT') + ' - ' + moment(timeEnd).format('LT')}</Text>
                                </View>

                                <View style={[styles.heading, { marginTop: 20 }]}>
                                    <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('location') + ' '}</Text>
                                    <Text style={[Typography.text_paragraph_1, styles.editText]}>{location}</Text>
                                </View>
                                <View style={styles.taxContainer}>
                                    <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{t('pay') + ':'}</Text>

                                    <View style={styles.taxContainer_C1}>
                                        <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('amount')}</Text>
                                        <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€' + totalPrice}</Text>
                                    </View>
                                    {
                                        taxes.map((key, index) => {
                                            return (
                                                <View key={index} style={styles.taxContainer_C1}>
                                                    <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{key.name + ' ' + key.percentage + '%'}</Text>
                                                    <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€' + Number(totalPrice / 100 * key.percentage).toFixed(1)}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                    <View style={styles.taxContainer_C1}>
                                        <Text style={[Typography.text_CTA1, { color: colors.Neutral_01, }]}>{t('total')}</Text>
                                        <Text style={[Typography.text_CTA1, { color: colors.black, }]}>{'€' + totalPriceWithTax.toFixed(1)}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    </ScrollView>
                }

                <View style={styles.footer}>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', }}>
                        {
                            (totalPrice != '0' || totalPrice != 0) ? (
                                <>
                                    <View style={{ width: '45%', justifyContent: 'center', }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{t('total') + ': '}</Text>
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{'€' + ' '}</Text>
                                            <Text style={[Typography.text_paragraph_1, styles.headingText]}>{totalPrice}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '45%', }}>
                                        {
                                            isJobCreate &&
                                            <CTAButton1 title={step < 4 ? t('next') : isEdit != null ? t('updateJob') : t('createJob')} submitHandler={() => { stepsHandler() }} />
                                        }
                                        {
                                            !isJobCreate &&
                                            <CTAButton1 title={step < 3 ? t('next') : isEdit != null ? t('updateService') : t('createService')} submitHandler={() => { stepsHandler() }} />
                                        }
                                    </View>
                                </>
                            ) : (
                                (isJobCreate) ? (
                                    <CTAButton1 title={step < 4 ? t('next') : isEdit != null ? t('updateJob') : t('createJob')} submitHandler={() => { stepsHandler() }} />
                                ) : (<CTAButton1 title={step < 3 ? t('next') : isEdit != null ? t('updateService') : t('createService')} submitHandler={() => { stepsHandler() }} />)
                            )
                        }
                    </View>
                </View>
            </View >
        )
    );
};

export default CreateService;

const createStyles = (colors, theme, deviceWidth) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        body: {
            flex: 10,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        footer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
            backgroundColor: colors.white,
            borderTopColor: colors.Neutral_02,
            borderTopWidth: .3,
            paddingTop: 5
        },
        heading: {
            width: '100%',
            marginTop: 10,
            flexDirection: 'row'
        },
        headingText: {
            fontWeight: 'bold',
            color: colors.black,
            textAlign: 'left'
        },
        list2: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%'
        },
        editText: {
            fontSize: RFValue(14, screenResolution.screenHeight),
            textAlign: 'left',
            color: colors.black
        },
        horizontalScroll: {
            flexDirection: 'row',
            marginTop: 10,
            width: '100%',
            height: 40,
        },
        textAreaContainer: {
            marginTop: 10,
            height: 185,
            width: '100%',
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderWidth: 1
        },
        list: {
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%'
        },
        list1: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            width: '100%',
            borderRadius: 5,
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderWidth: 1,
        },
        dob: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },
        timeContainer: {
            margin: 10,
            height: 78,
            width: 90,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Neutral_02
        },
        timeFlatList: {
            marginTop: 10,
            alignSelf: 'center',
        },
        inputContiner: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingLeft: 10,
            backgroundColor: colors.white,
            borderColor: colors.Primary_01,
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
        },
        listIcon: {
            fontSize: RFValue(18, screenResolution.screenHeight),
            marginRight: 15,
            color: colors.Neutral_01
        },
        taxContainer: {
            height: 185,
            width: '100%',
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            backgroundColor: colors.Neutral_02
        },
        taxContainer_C1: {
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        columnWrapperStyle: {
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            height: 120,
        },
        imageContainer: {
            flex: 1,
            height: deviceWidth < 360 ? 100 : 120,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: colors.Neutral_02,
            justifyContent: 'center',
            alignItems: 'center'
        },
        listDropDown: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderColor: colors.Primary_01,
            borderWidth: 1,
            borderRadius: 7,
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.white
        },

    });
};
