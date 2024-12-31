import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import Images from '../../assets/images/index'
import { Select } from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CTAButton1 from '../../components/CTA_BUTTON1';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { Typography } from '../../utilities/constants/constant.style';
import { launchImageLibrary } from 'react-native-image-picker';
import screenResolution from '../../utilities/constants/screenResolution';
import { RFValue } from 'react-native-responsive-fontsize';
import { updateUser, showError, } from '../../store/actions/action'

const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let user = useSelector((state) => state.reducer.user);
    let isError = useSelector((state) => state.reducer.isError);
    const [fullName, setfullName] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    // date of birth
    const [date, setDate] = useState(new Date())
    const [openBs, setopenBs] = useState(false)
    const [showBs, setshowBs] = useState(false)
    const [gender, setgender] = useState('');
    const [address, setaddress] = useState('');
    const [profileImage, setProfileImage] = useState(Images.profilePic);

    useEffect(() => {
        setemail(user.email)
        setfullName(user.fullName)
        setphone(user.phone)
        user.dob != '' && setDate(new Date(user.dob))
        user.dob != '' && setshowBs(true)
        setgender(user.gender)
        setaddress(user.address)
    }, [user]);


    const selectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.7 },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setProfileImage({ uri: response.assets[0].uri });
                }
            }
        );
    };

    const submit = () => {
        let credentials = {
            fullName,
            phone,
            dob: new Date(date).getTime(),
            gender,
            address,
            profilePhoto: '',
        }

        console.log(credentials, "credentials");
        dispatch(updateUser(credentials, user.userId, navigation,))
        dispatch(showError())
    }

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('editProfile')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <ScrollView
                style={{ width: '90%' }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.profilePhotoContainer}>
                    <Image
                        resizeMode="cover"
                        style={styles.profilePhoto}
                        source={profileImage}
                    />
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.cameraIconContainer} onPress={selectImage}
                    >
                        <Ionicons name="camera" size={24} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('fullname')}</Text>

                        {
                            isError && fullName == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={(e) => { setfullName(e) }}
                            placeholder={t('fullname')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('phoneNo')}</Text>
                        {
                            isError && phone == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            keyboardType='number-pad'
                            style={styles.input}
                            value={phone}
                            onChangeText={(e) => { setphone(e) }}
                            placeholder={t('phoneNo')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('email')}</Text>

                        {
                            isError && email == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            keyboardType='number-pad'
                            style={styles.input}
                            value={email}
                            // onChangeText={(e) => { setemail(e) }}
                            placeholder={t('email')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('dob')}</Text>
                        {
                            isError && <Text style={{ top: 3, color: "red", top: -1 }}>*</Text>
                        }
                    </View>
                    <View style={styles.list}>
                        <View style={styles.dob}>
                            <TouchableOpacity onPress={() => { setopenBs(true) }}  >
                                {
                                    !showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.Neutral_01 }]}>{t('selectDate')}</Text>
                                }
                                {
                                    showBs && <Text style={[styles.listText, { marginLeft: 10, color: colors.black }]}>{moment(date).format('DD MM YYYY')}</Text>
                                }
                            </TouchableOpacity>
                            <DatePicker
                                minimumDate={new Date()}
                                mode='date'
                                modal
                                open={openBs}
                                date={date}
                                onConfirm={(date) => {
                                    setopenBs(false)
                                    setDate(date)
                                    setshowBs(true)
                                }}
                                onCancel={() => {
                                    setopenBs(false)
                                    setshowBs(false)
                                }}
                            />
                            <TouchableOpacity onPress={() => { setopenBs(true) }}>
                                <Fontisto name="date" style={styles.listIcon} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>


                {/* <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('gender')}</Text>
                        {
                            isError && gender == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.list}>
                        <Select
                            bg={colors.white}
                            borderWidth={0}
                            value={gender}
                            selectedValue={gender}
                            minWidth="100%"
                            accessibilityLabel="Gender"
                            placeholder={t('gender')}
                            placeholderTextColor={colors.Neutral_01}
                            _selectedItem={{
                                background: colors.Primary_01,
                            }}
                            color={colors.Neutral_01}
                            mt={1} onValueChange={itemValue => setgender(itemValue)}
                        >
                            <Select.Item label={t('male')} value="male" />
                            <Select.Item label={t('female')} value="female" />
                            <Select.Item label={t('rathernotsay')} value="rathernotsay" />
                        </Select>
                    </View>
                </View> */}
                
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1]}>
                            {t('gender')}
                        </Text>
                        {isError && gender == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>}
                    </View>
                    <View style={styles.list}>
                        <Select
                            bg={colors.white}
                            borderWidth={0}
                            value={gender}
                            selectedValue={gender}
                            minWidth="100%"
                            accessibilityLabel="Gender"
                            placeholder={t('gender')}
                            placeholderTextColor={colors.Neutral_01}
                            _selectedItem={{
                                background: colors.Primary_01,
                            }}
                            color={gender ? 'black' : colors.Neutral_01}  // Set default color to black
                            mt={1}
                            onValueChange={itemValue => setgender(itemValue)}
                        >
                            <Select.Item label={t('male')} value="male" />
                            <Select.Item label={t('female')} value="female" />
                            <Select.Item label={t('rathernotsay')} value="rathernotsay" />
                        </Select>
                    </View>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[{ top: 3, color: colors.Neutral_01 }, Typography.text_paragraph_1,]}>{t('address')}</Text>
                        {
                            isError && phone == '' && <Text style={{ top: 3, color: colors.Error_Red }}>*</Text>
                        }
                    </View>
                    <View style={styles.inputContiner}>
                        <TextInput
                            keyboardType='number-pad'
                            style={styles.input}
                            value={address}
                            onChangeText={(e) => { setaddress(e) }}
                            placeholder={t('address')}
                            placeholderTextColor={colors.Neutral_01}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 50 }}>
                    <CTAButton1 title={t('SAVE')} submitHandler={() => submit()} />
                </View>
            </ScrollView >

        </View >
    );
};

export default EditProfile;

const createStyles = (colors, theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        profilePhoto: {
            height: 102, width: 102,
            marginTop: 10,
            justifyContent: 'center', alignItems: 'center',
            borderRadius: 100,
            borderWidth: 2,
            borderColor: colors.White_Primary_01,
        },
        profilePhotoContainer: {
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
        },
        cameraIconContainer: {
            position: 'absolute',
            bottom: 0,
            right: 10,
            backgroundColor: colors.Primary_01,
            borderRadius: 20,
            padding: 4,
        },
        scrollBar: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
        },
        list: {
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
        fieldHeading: {
            marginLeft: '1%',
            // fontSize: 12,
            color: 'black',
        },
        inputContiner: {
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
            // color: colors.Primary_01
        },
        dob: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },
        input: {
            height: 50, width: "90%", color: colors.black,
            marginLeft: 7,
        }

    });
};

