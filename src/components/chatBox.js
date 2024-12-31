import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, } from 'react-native';
import Images from '../assets/images/index'
import { useSelector } from 'react-redux';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';
import moment from 'moment';

const ChatBox = ({ messages }) => {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
    const styles = createStyles(colors);
    let user = useSelector((state) => state.reducer.user);

    return (
        <ScrollView style={styles.wrapper} contentContainerStyle={{ paddingBottom: 30 }}>
            {messages.map((msg, index) => (
                <View
                    key={index}
                    style={[
                        styles.msgContainer,
                        { alignItems: msg.senderId === user.userId ? 'flex-end' : 'flex-start' },
                    ]}
                >
                    <View
                        style={[
                            styles.msgBubble,
                            {
                                backgroundColor:
                                    msg.senderId === user.userId ? colors.Primary_04 : colors.Neutral_05,
                            },
                        ]}
                    >
                        {
                            (msg.senderId === user.userId) ? (
                                (user.profilePhoto != '') ? (
                                    <Image
                                        source={{ uri: user.profilePhoto }}
                                        style={styles.profilePic}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <Image
                                        source={Images.noPhoto}
                                        style={styles.profilePic}
                                        resizeMode="contain"
                                    />
                                )
                            ) : (
                                <Image
                                    source={Images.noPhoto}
                                    style={styles.profilePic}
                                    resizeMode="contain"
                                />
                            )
                        }


                        <View style={styles.msgContent}>
                            <Text style={{ color: colors.black }}>{msg.text}</Text>
                            <Text style={styles.timestamp}>
                                {
                                    moment(msg.timestamp).format('LT')
                                }
                                {/* {new Date(msg.timestamp?.toDate()).toLocaleTimeString()} */}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default ChatBox;

const createStyles = (colors) => StyleSheet.create({
    wrapper: { flex: 1, marginTop: 10 },
    msgContainer: { marginTop: 10 },
    msgBubble: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    profilePic: { width: 40, height: 40, borderRadius: 50 },
    msgContent: { marginLeft: 20, maxWidth: '75%' },
    timestamp: { fontSize: 10, color: colors.black, textAlign: 'right' },
});
