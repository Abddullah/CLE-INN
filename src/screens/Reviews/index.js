import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { Typography } from '../../utilities/constants/constant.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HorizontalListWithStar from '../../components/horizontalListWithStar';
import VerticalStarList from '../../components/VerticalStarList';
import ReviewsList from '../../components/Review';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import screenResolution from '../../utilities/constants/screenResolution';

const Reviews = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);

    let isError = useSelector((state) => state.reducer.isError);
    const [selectedStar, setselectedStar] = useState('');

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('reviews')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <View style={{ flexDirection: 'row', marginTop: 10, height: 200, width: '95%', borderBottomColor: colors.Neutral_02, borderBottomWidth: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightColor: colors.Neutral_02, borderRightWidth: 1 }}>
                    <Text style={[Typography.text_paragraph_1, { fontWeight: 'bold', color: colors.black, fontSize: RFValue(30, screenResolution.screenHeight) }]}>{'5'}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <FontAwesome name="star" size={20} color={colors.yellow} />
                        <FontAwesome name="star" size={20} color={colors.yellow} />
                        <FontAwesome name="star" size={20} color={colors.yellow} />
                        <FontAwesome name="star" size={20} color={colors.yellow} />
                        <FontAwesome name="star" size={20} color={colors.yellow} />
                    </View>
                    <Text style={[Typography.text_paragraph_1, { color: colors.black, fontSize: RFValue(16, screenResolution.screenHeight), marginTop: 10 }]}>{'1 Review'}</Text>
                </View>
                <VerticalStarList />
            </View>
            <ScrollView
                style={{ width: '90%', marginTop: 10 }}
                contentContainerStyle={styles.scrollBar}
                showsVerticalScrollIndicator={false}
            >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', marginTop: 10 }}
                >
                    <HorizontalListWithStar selectedState={selectedStar} setselectedState={setselectedStar} title={t('all')} />
                    <HorizontalListWithStar selectedState={selectedStar} setselectedState={setselectedStar} title={'5'} />
                    <HorizontalListWithStar selectedState={selectedStar} setselectedState={setselectedStar} title={'4'} />
                    <HorizontalListWithStar selectedState={selectedStar} setselectedState={setselectedStar} title={'3'} />
                    <HorizontalListWithStar selectedState={selectedStar} setselectedState={setselectedStar} title={'2'} />
                    <HorizontalListWithStar selectedState={selectedStar} setselectedState={setselectedStar} title={'1'} />
                </ScrollView>

                <ReviewsList />

            </ScrollView>
        </View>
    );
};

export default Reviews;

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
    });
};


