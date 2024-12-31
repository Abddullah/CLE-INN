import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ChatBox from '../../components/chatBox';
import CommentInput from '../../components/commentsInput';
import CustomHeader from '../../components/Header';
import { t } from 'i18next';
import { LightThemeColors, DarkThemeColors } from '../../utilities/constants';
import { useTheme } from '../../../ThemeContext';
import firestore from '@react-native-firebase/firestore';

export default function Support({ route }) {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors);
    const navigation = useNavigation();
    let user = useSelector((state) => state.reducer.user);

    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState('');

    useEffect(() => {
        const chatIdentifier = `${user.userId}`;
        setChatId(chatIdentifier);
        // Fetch messages in real-time
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatIdentifier)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    setMessages(doc.data().messages);
                }
            });

        return () => unsubscribe();
    }, [user.userId]);

    return (
        <View style={styles.mainContainer}>
            <CustomHeader
                title={t('support')}
                isLeft={true}
                leftPress={() => navigation.goBack()}
            />
            <View style={styles.body}>
                <ChatBox messages={messages} />
            </View>
            <View style={styles.footer}>
                <CommentInput chatId={chatId} senderId={user.userId} />
            </View>
        </View>
    );
}

const createStyles = (colors) => StyleSheet.create({
    mainContainer: { flex: 1 },
    body: { flex: 1 },
    footer: {
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


