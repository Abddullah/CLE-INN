import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';

import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import CustomHeader from '../../components/Header';
import ServiceCard from '../../components/ServiceCard';
import { fetchBookMarkAds } from '../../store/actions/action'

const Favorite = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors, theme);
    let user = useSelector((state) => state.reducer.user);
    let bookMarks = useSelector((state) => state.reducer.bookMarks);
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.bookMarks) {
            dispatch(fetchBookMarkAds(user.bookMarks, user.role === 'user' ? 'service' : 'jobs'));
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <CustomHeader
                title={t('Favorites')}
                isLeft={true}
                leftPress={() => { navigation.goBack() }}
            />
            <FlatList
                data={bookMarks}
                style={{ marginTop: 10, width: '90%', }}
                contentContainerStyle={{ alignItems: bookMarks.length == 1 ? 'flex-start' : 'center' }}
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


