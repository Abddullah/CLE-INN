import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { SendButton } from '../assets/icons';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import { RFValue } from "react-native-responsive-fontsize";
import screenResolution from '../utilities/constants/screenResolution';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const CommentInput = ({ chatId, senderId }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors);
    const [text, setText] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const sendMessage = async () => {
        if (!text.trim()) return;

        try {
            const message = {
                text: text.trim(),
                senderId: senderId || 'unknown',
                timestamp: new Date().getTime(),
            };

            const chatRef = firestore().collection('chats').doc(chatId);

            await chatRef.set(
                {
                    messages: firestore.FieldValue.arrayUnion(message),
                    lastMessage: {
                        text: text.trim(),
                        timestamp: new Date().getTime(),
                    },
                },
                { merge: true }
            );

            setText(''); // Clear input after sending
        } catch (error) {
            console.error('Error sending message:', error); // Log any errors
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.inputBox(isFocus)}>
                <TextInput
                    value={text}
                    placeholder="Type a message..."
                    placeholderTextColor="gray"
                    onChangeText={setText}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.8}
                style={styles.sendBtn}
            >
                <SendButton />
            </TouchableOpacity>
        </View>
    );
};

export default CommentInput;

const createStyles = (colors) => StyleSheet.create({
    wrapper: {
        backgroundColor: colors.Neutral_05,
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    inputBox: (isFocus) => ({
        width: '80%',
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderColor: isFocus ? colors.Primary_04 : 'transparent',
        borderWidth: isFocus ? 1 : 0,
    }),
    input: {
        borderRadius: 20,
        height: 50,
        color: colors.black,
        fontSize: RFValue(16, screenResolution.screenHeight),
    },
    sendBtn: {
        borderRadius: 20,
        backgroundColor: colors.Neutral_05,
        width: '20%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
