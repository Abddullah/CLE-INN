// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import DatePicker from 'react-native-date-picker';
// import { t } from 'i18next';
// import screenResolution from '../utilities/constants/screenResolution';
// import { RFValue } from "react-native-responsive-fontsize";
// import Toast from 'react-native-toast-message';

// const WeekdayTimeSelector = ({ theme, colors, onSelectedDaysChange, selectedDays }) => {
//     const [days, setDays] = useState({
//         Monday: { enabled: false, openingTime: null, closingTime: null },
//         Tuesday: { enabled: false, openingTime: null, closingTime: null },
//         Wednesday: { enabled: false, openingTime: null, closingTime: null },
//         Thursday: { enabled: false, openingTime: null, closingTime: null },
//         Friday: { enabled: false, openingTime: null, closingTime: null },
//         Saturday: { enabled: false, openingTime: null, closingTime: null },
//         Sunday: { enabled: false, openingTime: null, closingTime: null },
//     });

//     const [isPickerVisible, setPickerVisible] = useState(false);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedType, setSelectedType] = useState(null);

//     const handleDayToggle = (day) => {
//         setDays((prevDays) => ({
//             ...prevDays,
//             [day]: { ...prevDays[day], enabled: !prevDays[day].enabled },
//         }));
//     };

//     const handleTimeChange = (day, type, time) => {
//         const milliseconds = time.getHours() * 3600000 + time.getMinutes() * 60000;
//         const updatedDays = {
//             ...days,
//             [day]: { ...days[day], [type]: milliseconds },
//         };

//         if (type === 'closingTime' && updatedDays[day].openingTime !== null) {
//             if (milliseconds <= updatedDays[day].openingTime) {
//                 Toast.show({ type: 'error', text1: t('closingTimeMustBeLater'), position: 'bottom' });
//                 setPickerVisible(false);
//                 return;
//             }
//         }

//         setDays(updatedDays);
//         sendDataToParent(updatedDays);
//         setPickerVisible(false);
//     };

//     const showTimePicker = (day, type) => {
//         setSelectedDay(day);
//         setSelectedType(type);
//         setPickerVisible(true);
//     };

//     const sendDataToParent = (updatedDays) => {
//         const selectedDays = Object.keys(updatedDays)
//             .filter((day) => updatedDays[day].enabled)
//             .map((day) => ({
//                 day,
//                 openingTime: updatedDays[day].openingTime,
//                 closingTime: updatedDays[day].closingTime,
//             }));
//         onSelectedDaysChange(selectedDays);
//     };

//     const formatTime = (milliseconds) => {
//         if (milliseconds === null) return 'Select Time';
//         const date = new Date();
//         date.setHours(Math.floor(milliseconds / 3600000));
//         date.setMinutes((milliseconds % 3600000) / 60000);
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // AM/PM format
//     };

//     const renderDayRow = (day) => (
//         <View style={styles.row} key={day}>
//             {/* Day with Checkbox */}
//             <View style={styles.column}>
//                 <CheckBox
//                     tintColors={{
//                         true: theme === 'dark' ? colors.Neutral_01 : colors.Primary_01,
//                         false: colors.Neutral_01,
//                     }}
//                     disabled={false}
//                     value={days[day].enabled}
//                     onValueChange={() => handleDayToggle(day)}
//                 />
//                 <Text style={[styles.text, { color: colors.Neutral_01 }]}>{day}</Text>
//             </View>

//             {/* Opening Time */}
//             <View style={styles.column}>
//                 <TouchableOpacity
//                     style={[
//                         styles.timeBox,
//                         { borderColor: days[day].enabled ? colors.White_Primary_01 : colors.Neutral_02 },
//                     ]}
//                     disabled={!days[day].enabled}
//                     onPress={() => showTimePicker(day, 'openingTime')}
//                 >
//                     <Text style={{
//                         color: colors.Neutral_01, fontSize: RFValue(12, screenResolution.screenHeight),
//                     }}>
//                         {formatTime(days[day].openingTime)}
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Closing Time */}
//             <View style={styles.column}>
//                 <TouchableOpacity
//                     style={[
//                         styles.timeBox,
//                         { borderColor: days[day].enabled ? colors.White_Primary_01 : colors.Neutral_02 },
//                     ]}
//                     disabled={!days[day].enabled}
//                     onPress={() => showTimePicker(day, 'closingTime')}
//                 >
//                     <Text style={{ color: colors.Neutral_01, fontSize: RFValue(12, screenResolution.screenHeight) }}>
//                         {formatTime(days[day].closingTime)}
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             {/* Header Row */}
//             <View style={styles.headerRow}>
//                 <View style={styles.column}>
//                     <Text style={[styles.heading, { color: colors.Neutral_01 }]}>{'Time Slot'}</Text>
//                 </View>
//                 <View style={styles.column}>
//                     <Text style={[styles.heading, { color: colors.Neutral_01 }]}>{t('openingTime')}</Text>
//                 </View>
//                 <View style={styles.column}>
//                     <Text style={[styles.heading, { color: colors.Neutral_01 }]}>{t('closingTime')}</Text>
//                 </View>
//             </View>

//             <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 150, }} style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
//                 {/* Days and Time Selection */}
//                 {Object.keys(days).map((day) => renderDayRow(day))}

//                 {/* DatePicker Modal */}
//                 {isPickerVisible && (
//                     <DatePicker
//                         modal
//                         open={isPickerVisible}
//                         date={selectedType ? new Date(days[selectedDay][selectedType]) : new Date()}
//                         mode="time"
//                         onConfirm={(time) => handleTimeChange(selectedDay, selectedType, time)}
//                         onCancel={() => setPickerVisible(false)}
//                     />
//                 )}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column',
//         padding: 10,
//     },
//     headerRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     row: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     column: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     heading: {
//         fontSize: RFValue(12, screenResolution.screenHeight),
//         fontWeight: 'bold',
//     },
//     text: {
//         fontSize: RFValue(12, screenResolution.screenHeight),
//     },
//     timeBox: {
//         borderWidth: 1,
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         minWidth: 90,
//     },
// });

// export default WeekdayTimeSelector;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import { t } from 'i18next';
import screenResolution from '../utilities/constants/screenResolution';
import { RFValue } from "react-native-responsive-fontsize";
import Toast from 'react-native-toast-message';

const WeekdayTimeSelector = ({ theme, colors, onSelectedDaysChange, selectedDays }) => {
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
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        if (selectedDays && selectedDays.length > 0) {
            const updatedDays = { ...days };

            selectedDays.forEach(({ day, openingTime, closingTime }) => {
                if (updatedDays[day]) {
                    updatedDays[day] = {
                        enabled: true,
                        openingTime: openingTime || null,
                        closingTime: closingTime || null,
                    };
                }
            });

            setDays(updatedDays);
        }
    }, [selectedDays]);

    const handleDayToggle = (day) => {
        setDays((prevDays) => ({
            ...prevDays,
            [day]: { ...prevDays[day], enabled: !prevDays[day].enabled },
        }));
    };

    const handleTimeChange = (day, type, time) => {
        const milliseconds = time.getHours() * 3600000 + time.getMinutes() * 60000;
        const updatedDays = {
            ...days,
            [day]: { ...days[day], [type]: milliseconds },
        };

        if (type === 'closingTime' && updatedDays[day].openingTime !== null) {
            if (milliseconds <= updatedDays[day].openingTime) {
                Toast.show({ type: 'error', text1: t('closingTimeMustBeLater'), position: 'bottom' });
                setPickerVisible(false);
                return;
            }
        }

        setDays(updatedDays);
        sendDataToParent(updatedDays);
        setPickerVisible(false);
    };

    const showTimePicker = (day, type) => {
        setSelectedDay(day);
        setSelectedType(type);
        setPickerVisible(true);
    };

    const sendDataToParent = (updatedDays) => {
        const selectedDays = Object.keys(updatedDays)
            .filter((day) => updatedDays[day].enabled)
            .map((day) => ({
                day,
                openingTime: updatedDays[day].openingTime,
                closingTime: updatedDays[day].closingTime,
            }));
        onSelectedDaysChange(selectedDays);
    };

    const formatTime = (milliseconds) => {
        if (milliseconds === null) return 'Select Time';
        const date = new Date();
        date.setHours(Math.floor(milliseconds / 3600000));
        date.setMinutes((milliseconds % 3600000) / 60000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // AM/PM format
    };

    const renderDayRow = (day) => (
        <View style={styles.row} key={day}>
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
                        {formatTime(days[day].openingTime)}
                    </Text>
                </TouchableOpacity>
            </View>
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
                        {formatTime(days[day].closingTime)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
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
                {Object.keys(days).map((day) => renderDayRow(day))}
                {isPickerVisible && (
                    <DatePicker
                        modal
                        open={isPickerVisible}
                        date={selectedType ? new Date(days[selectedDay][selectedType]) : new Date()}
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
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    column: {
        flex: 1,
        alignItems: 'center',
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
        paddingVertical: 6,
        paddingHorizontal: 10,
        minWidth: 90,
    },
});

export default WeekdayTimeSelector;
