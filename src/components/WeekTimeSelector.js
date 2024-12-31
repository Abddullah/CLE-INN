import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import { t } from 'i18next';
import screenResolution from '../utilities/constants/screenResolution';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const deviceWidth = screenResolution.screenWidth;

const WeekdayTimeSelector = ({ theme, colors }) => {
    const [days, setDays] = useState({
        Monday: { enabled: false, openingTime: null, closingTime: null },
        Tuesday: { enabled: false, openingTime: null, closingTime: null },
        Wednesday: { enabled: false, openingTime: null, closingTime: null },
        Thursday: { enabled: false, openingTime: null, closingTime: null },
        Friday: { enabled: false, openingTime: null, closingTime: null },
        Saturday: { enabled: false, openingTime: null, closingTime: null },
        Sunday: { enabled: false, openingTime: null, closingTime: null },
    });

    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedType, setSelectedType] = useState(null); // 'openingTime' or 'closingTime'

    const handleDayToggle = (day) => {
        setDays((prevDays) => ({
            ...prevDays,
            [day]: { ...prevDays[day], enabled: !prevDays[day].enabled },
        }));
    };

    const handleTimeChange = (day, type, time) => {
        setDays((prevDays) => ({
            ...prevDays,
            [day]: { ...prevDays[day], [type]: time },
        }));
        setPickerVisible(false);
    };

    const showTimePicker = (day, type) => {
        setSelectedDay(day);
        setSelectedType(type);
        setPickerVisible(true);
    };

    const renderDayRow = (day) => (
        <View style={styles.row} key={day}>
            {/* Day with Checkbox */}
            <View style={styles.column}>
                <CheckBox
                    tintColors={{
                        true: theme === 'dark' ? colors.Neutral_01 : colors.Primary_01,
                        false: colors.Neutral_01,
                    }}
                    disabled={false}
                    value={days[day].enabled}
                    onValueChange={() => handleDayToggle(day)}
                />
                <Text style={[styles.text, { color: colors.Neutral_01 }]}>{day}</Text>
            </View>

            {/* Opening Time */}
            <View style={styles.column}>
                <TouchableOpacity
                    style={[
                        styles.timeBox,
                        { borderColor: days[day].enabled ? colors.White_Primary_01 : colors.Neutral_02 },
                    ]}
                    disabled={!days[day].enabled}
                    onPress={() => showTimePicker(day, 'openingTime')}
                >
                    <Text style={{
                        color: colors.Neutral_01, fontSize: RFValue(12, screenResolution.screenHeight),
                    }}>
                        {days[day].openingTime
                            ? days[day].openingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Select Time'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Closing Time */}
            <View style={styles.column}>
                <TouchableOpacity
                    style={[
                        styles.timeBox,
                        { borderColor: days[day].enabled ? colors.White_Primary_01 : colors.Neutral_02 },
                    ]}
                    disabled={!days[day].enabled}
                    onPress={() => showTimePicker(day, 'closingTime')}
                >
                    <Text style={{ color: colors.Neutral_01, fontSize: RFValue(12, screenResolution.screenHeight) }}>
                        {days[day].closingTime
                            ? days[day].closingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Select Time'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={styles.column}>
                    <Text style={[styles.heading, { color: colors.Neutral_01 }]}>{'Time Slot'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={[styles.heading, { color: colors.Neutral_01 }]}>{t('openingTime')}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={[styles.heading, { color: colors.Neutral_01 }]}>{t('closingTime')}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 150, }} style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                {/* Days and Time Selection */}
                {Object.keys(days).map((day) => renderDayRow(day))}

                {/* DatePicker Modal */}
                {isPickerVisible && (
                    <DatePicker
                        modal
                        open={isPickerVisible}
                        date={days[selectedDay][selectedType] || new Date()}
                        mode="time"
                        onConfirm={(time) => handleTimeChange(selectedDay, selectedType, time)}
                        onCancel={() => setPickerVisible(false)}
                    />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        // backgroundColor: 'green'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // backgroundColor: 'yellow'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between',
        marginBottom: 10,
        // backgroundColor: 'red'
    },
    column: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'purple'
        // marginHorizontal: deviceWidth < 360 ? 5 : 10,
    },
    heading: {
        fontSize: RFValue(12, screenResolution.screenHeight),
        fontWeight: 'bold',
    },
    text: {
        fontSize: RFValue(12, screenResolution.screenHeight),
    },
    timeBox: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: deviceWidth < 360 ? 6 : 8,
        // paddingHorizontal: deviceWidth < 360 ? 10 : 12,
        // minWidth: deviceWidth < 360 ? 80 : 100,

        paddingVertical: 6,
        paddingHorizontal: 10,
        minWidth: 90,
        // backgroundColor: 'gray'
    },
});

export default WeekdayTimeSelector;
