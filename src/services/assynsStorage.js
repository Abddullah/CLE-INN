import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key, defaultValue) => {
    try {
        const value = await AsyncStorage.getItem(`${key}`)

        if (value) {
            return JSON.parse(value)
        } else {
            return defaultValue
        }
    } catch (error) {
        return null
    }
}

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(`${key}`, JSON.stringify(value))
        return true
    } catch (error) {
        return null
    }
}

export const deleteItem = async (key) => {
    try {
        await AsyncStorage.removeItem(`${key}`);
        return true;
    } catch (error) {
        return null;
    }
}

export const changeRoute = async (navigation, value, prams) => {
    try {
        if (value == 'pop') { navigation.pop() }
        else { navigation.navigate(value, prams) }
    } catch (error) {
        return null
    }
}

export const formatPhoneNumber = (phoneNumber) => {
    var cleaned = ('' + phoneNumber)
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d{4})(\d{4})/, '+$1 $2 $3');

    return cleaned;
};

export const findClosest = (arr, target) => {
    let distance = Math.abs(arr[0] - target);
    let idx = 0;
    for (let c = 1; c < arr.length; c++) {
        let cdistance = Math.abs(arr[c] - target);
        if (cdistance < distance) {
            idx = c;
            distance = cdistance;
        }
    }
    return arr[idx];
}
