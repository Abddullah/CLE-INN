import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, ImageBackground, View, AppState } from 'react-native';
import { _retrieveData } from '../../services/assynsStorage';
import Images from '../../assets/images/index'
import { getCurrentUser, updateUserStatus } from '../../store/actions/action'
import { useTheme } from '../../../ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Splash({ navigation }) {
  const dispatch = useDispatch()
  const { theme } = useTheme();

  let appState = AppState.currentState;

  useFocusEffect(
    useCallback(() => {
      dispatch(getCurrentUser(navigation))
      return () => { };
    }, [])
  );

  useEffect(() => {
    AppState.addEventListener('change', async (nextAppState) => {
      const user = auth().currentUser;

      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App is foregrounded
        if (user) await updateUserStatus(user.uid, true);
      } else if (nextAppState.match(/inactive|background/)) {
        // App is going to background
        if (user) await updateUserStatus(user.uid, false);
      }

      appState = nextAppState;
    });

    console.log(appState, 'appState');


    auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in, set them as online
        await updateUserStatus(user.uid, true);

        // Set offline when the app is closed
        const unsubscribe = firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot(
            null,
            () => updateUserStatus(user.uid, false) // Set offline on error
          );

        // Cleanup listener on logout or app close
        return () => unsubscribe();
      } else {
        // User is logged out, no need to update
      }
    });

  }, [appState])



  return (
    <ImageBackground
      style={styles.background}
      resizeMode="stretch"
      source={theme === 'dark' ? Images.splashBgDM : Images.splashBg}
    >
      <View style={styles.overlay}>
        <Image
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
          source={theme === 'dark' ? Images.LogoDM : Images.Logo}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 20,
    borderRadius: 10,
  },
});
