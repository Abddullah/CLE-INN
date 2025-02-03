import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import getFirebaseErrorMessage from '../../services/firebaseErrorHandler';
import { CommonActions } from '@react-navigation/native';
import { setItem, deleteItem, getItem } from '../../services/assynsStorage';

export const showError = (errMsg) => async dispatch => {
  dispatch({ type: 'IS_ERROR', payload: true });
  dispatch({ type: 'SET_ERROR_MSG', payload: errMsg });
  setTimeout(() => {
    dispatch({ type: 'IS_ERROR', payload: false });
    dispatch({ type: 'SET_ERROR_MSG', payload: '' });
  }, 5000);
};

export const getCurrentUser = (navigation) => async dispatch => {
  const user = await getItem('user')
  console.log(user, "Current_user");
  const launchApp = await getItem('launchApp')
  if (user) {
    dispatch({ type: 'SET_USER', payload: user });
    navigation.navigate('Tabs')
  }
  else {
    if (launchApp === undefined) {
      dispatch({ type: 'SET_USER', payload: {} });
      setItem('launchApp', true)
      navigation.navigate('GetStarted')
    } else {
      navigation.navigate('Signin')
    }
  }
  dispatch(fetchCategories());
  dispatch(fetchHourlyRates());
  dispatch(fetchRoomAreaSize());
  dispatch(fetchNoOfRooms());
  dispatch(fetchAditionalService());
  dispatch(fetchPayments());
  dispatch(fetchFixedRatesForServices());
};

export const loginUser = (credentials, isSelectedRemember, navigation) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const userCredential = await auth().signInWithEmailAndPassword(credentials.email, credentials.password);
    const user = userCredential.user._user;
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    isSelectedRemember && setItem('user', userData)
    !isSelectedRemember && deleteItem('user')
    dispatch({ type: 'SET_USER', payload: userData });
    dispatch({ type: 'IS_LOADER', payload: false });
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Tabs' }], }));
    const customMessage = await getFirebaseErrorMessage('Login successful!');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
  } catch (error) {
    console.log(error, 'loginUser_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code,);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const registerUser = (credentials, navigation) => async (dispatch) => {
  if (credentials.password !== credentials.rePassword) {
    const customMessage = await getFirebaseErrorMessage('Passwords do not match.');
    Toast.show({ type: 'error', text1: customMessage, position: 'bottom' });
    return;
  }
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const userCredential = await auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
    const userId = userCredential.user.uid;
    await firestore().collection('users').doc(userId).set({
      fullName: credentials.fullName,
      email: credentials.email,
      role: credentials.role,
      dob: credentials.dob,
      phone: credentials.phone,
      gender: credentials.gender,
      address: credentials.address,
      profilePhoto: credentials.profilePhoto,
      hourlyRate: credentials.hourlyRate,
      userId: userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    dispatch({ type: 'IS_LOADER', payload: false });
    const customMessage = await getFirebaseErrorMessage('User registered successfully!');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
    navigation.navigate('Signin')
  } catch (error) {
    console.log(error, 'registerUser_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code,);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const forgotPassword = (email, navigation, setemail) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    await auth().sendPasswordResetEmail(email);
    const customMessage = await getFirebaseErrorMessage('Password reset email sent successfully.');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
    setemail('')
    dispatch({ type: 'IS_LOADER', payload: false });
    navigation.navigate('Signin')
  } catch (error) {
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code,);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const updateUser = (credentials, userId, navigation) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    await firestore().collection('users').doc(userId).update(credentials);
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    setItem('user', userData)
    dispatch({ type: 'SET_USER', payload: userData });
    dispatch({ type: 'IS_LOADER', payload: false });
    const customMessage = await getFirebaseErrorMessage('User update successfully!');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
    navigation.goBack()
  } catch (error) {
    console.log(error, 'updateUser_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code,);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const updateUserStatus = async (userId, isOnline) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    await userRef.update({
      online: isOnline,
      lastSeen: isOnline ? null : firestore.FieldValue.serverTimestamp(),
    });
    console.log(`User status updated: ${isOnline ? 'Online' : 'Offline'}`);
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};

export const logoutUser = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    await auth().signOut();
    deleteItem('user')
    dispatch({ type: 'SET_USER', payload: {} });
    dispatch({ type: 'IS_LOADER', payload: false });
    navigation.navigate('Signin')
  } catch (error) {
    navigation.navigate('Signin')
    console.log(error, 'logoutUser_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchCategories = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const snapshot = await firestore().collection('categories').get();
    const categories = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    dispatch({ type: 'SET_CATEGORIES', payload: categories });
    dispatch({ type: 'IS_LOADER', payload: false });
  } catch (error) {
    console.log(error, 'fetchCategories_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchHourlyRates = (navigation) => async (dispatch) => {
  try {
    const snapshot = await firestore().collection('hourlyRates').get();
    const hourlyRates = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    dispatch({ type: 'SET_HOURLY_RATE', payload: hourlyRates ? hourlyRates[0]?.rate : 5 });
  } catch (error) {
    console.log(error, 'fetchAditionalService_error');
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchRoomAreaSize = (navigation) => async (dispatch) => {
  try {
    const snapshot = await firestore().collection('roomSize').get();
    let roomSize = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    roomSize = roomSize.sort((a, b) => {
      const aIsNumber = !isNaN(a.title);
      const bIsNumber = !isNaN(b.title);
      if (aIsNumber && bIsNumber) {
        return Number(b.title) - Number(a.title);
      } else if (aIsNumber) {
        return -1;
      } else if (bIsNumber) {
        return 1;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    dispatch({ type: 'SET_ROOM_SIZE', payload: roomSize });
  } catch (error) {
    console.log(error, 'fetchAditionalService_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchNoOfRooms = (navigation) => async (dispatch) => {
  try {
    const snapshot = await firestore().collection('NoOfRooms').get();
    let noOfRooms = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    noOfRooms = noOfRooms.sort((a, b) => {
      const aIsNumber = !isNaN(a.title);
      const bIsNumber = !isNaN(b.title);
      if (aIsNumber && bIsNumber) {
        return Number(a.title) - Number(b.title);
      } else if (aIsNumber) {
        return -1;
      } else if (bIsNumber) {
        return 1;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    dispatch({ type: 'SET_NO_OF_ROOMS', payload: noOfRooms });
    dispatch({ type: 'IS_LOADER', payload: false });
  } catch (error) {
    console.log(error, 'fetchAditionalService_error');
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchAditionalService = (navigation) => async (dispatch) => {
  try {
    const snapshot = await firestore().collection('additionalServices').get();
    const additionalServices = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    dispatch({ type: 'SET_ADITIONAL_SERVICE', payload: additionalServices });
    dispatch({ type: 'IS_LOADER', payload: false });
  } catch (error) {
    console.log(error, 'fetchAditionalService_error');
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchPayments = (navigation) => async (dispatch) => {
  try {
    const snapshot = await firestore().collection('payments').get();
    const taxes = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    dispatch({ type: 'SET_TAXES', payload: taxes[0]?.tax });
  } catch (error) {
    console.log(error, 'fetchAditionalService_error');
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchFixedRatesForServices = (navigation) => async (dispatch) => {
  try {
    const snapshot = await firestore().collection('fixRates').get();
    const fixRates = snapshot.docs.map((doc) => ({ ...doc.data(), }));
    fixRates.sort((a, b) => a.rate - b.rate);
    dispatch({ type: 'SET_FIXED_RATES', payload: fixRates });
  } catch (error) {
    console.log(error, 'fetchAditionalService_error');
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const createJob = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const docRef = firestore().collection('jobs').doc();
    const jobId = docRef.id;
    const updatedData = { ...data, jobId: jobId };
    // Save the data with the jobId in Firestore
    await docRef.set(updatedData);
    dispatch({ type: 'IS_LOADER', payload: false });
    const customMessage = await getFirebaseErrorMessage('jobCreatedSuccess');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
    navigation.navigate('Home');
  } catch (error) {
    console.log(error, 'createJob_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const createService = (data, navigation) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const docRef = firestore().collection('service').doc();
    const serviceId = docRef.id;
    const updatedData = { ...data, serviceId: serviceId };
    // Save the data with the serviceId in Firestore
    await docRef.set(updatedData);
    dispatch({ type: 'IS_LOADER', payload: false });
    const customMessage = await getFirebaseErrorMessage('serviceCreatedSuccess');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
    navigation.navigate('Home');
  } catch (error) {
    console.log(error, 'createJob_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchAdsByUser = (userId, collection) => dispatch => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    return firestore()
      .collection(collection)
      .where('postedBy', '==', userId)
      .onSnapshot(snapshot => {
        const myAds = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        dispatch({ type: 'SET_My_ADS', payload: myAds });
        dispatch({ type: 'IS_LOADER', payload: false });
      }, error => {
        console.log(error, 'fetch_jobs_error');
        dispatch({ type: 'IS_LOADER', payload: false });
        const errorMessage = getFirebaseErrorMessage(error.code);
        Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
      });
  } catch (error) {
    console.log(error, 'fetch_jobs_error');
    dispatch({ type: 'IS_LOADER', payload: false });
  }
};

export const fetchAds = (selectedCategory, collection) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const snapshot = await firestore().collection(collection).where('category', '==', selectedCategory).get();
    const allAds = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'SET_ADS', payload: allAds });
    dispatch({ type: 'IS_LOADER', payload: false });
  } catch (error) {
    console.log(error, 'fetch_ads_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const updateUserAdsById = (adId, data, collection, navigation) => async dispatch => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    await firestore().collection(collection).doc(adId).update(data);
    dispatch({ type: 'UPDATE_AD_SUCCESS', payload: adId });
    dispatch({ type: 'IS_LOADER', payload: false });
    const customMessage = await getFirebaseErrorMessage('Ad updated successfully!');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom' });
    navigation.navigate('Home');
  } catch (error) {
    console.error('Error updating service:', error);
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const deleteAdById = (adId, collection, navigation) => async dispatch => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    await firestore().collection(collection).doc(adId).delete();
    dispatch({ type: 'DELETE_AD_SUCCESS', payload: adId });
    dispatch({ type: 'IS_LOADER', payload: false });
    const customMessage = await getFirebaseErrorMessage('Ad deleted successfully!');
    Toast.show({ type: 'success', text1: customMessage, position: 'bottom', });
    navigation.navigate('Home');
  } catch (error) {
    console.error('Error deleting ad:', error.message);
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const saveBookMark = (userId, adId) => async (dispatch) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    await userRef.update({
      bookMarks: firestore.FieldValue.arrayUnion(adId),
    });
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    setItem('user', userData)
    dispatch({ type: 'SET_USER', payload: userData });
  } catch (error) {
    console.log(error, 'bookmark_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const removeBookMark = (userId, adId) => async (dispatch) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    await userRef.update({
      bookMarks: firestore.FieldValue.arrayRemove(adId),
    });
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    setItem('user', userData)
    dispatch({ type: 'SET_USER', payload: userData });
  } catch (error) {
    console.log(error, 'bookmark_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
};

export const fetchBookMarkAds = (bookMarksIds, collection) => async (dispatch) => {
  let adId = collection != 'service' ? 'jobId' : 'serviceId';
  try {
    if (bookMarksIds.length === 0) {
      dispatch({ type: 'SET_BOOK_MARKS', payload: [] });
      return;
    }
    dispatch({ type: 'IS_LOADER', payload: true });
    const snapshot = await firestore().collection(collection).where(adId, 'in', bookMarksIds).get();
    const bookMarks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'SET_BOOK_MARKS', payload: bookMarks });
    dispatch({ type: 'IS_LOADER', payload: false });
  } catch (error) {
    console.log(error, 'fetch_bookmark_ads_error');
    dispatch({ type: 'IS_LOADER', payload: false });
    const errorMessage = await getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  }
}

export const fetchUserById = (userId) => async dispatch => {
  try {
    dispatch({ type: 'IS_LOADER', payload: true });
    const userDoc = await firestore().collection('users').doc(userId).get();
    if (userDoc.exists) {
      dispatch({ type: 'SET_POSTED_BY_USER', payload: { ...userDoc.data(), id: userDoc.id } });
    } else {
      dispatch({ type: 'SET_POSTED_BY_USER', payload: null });
      Toast.show({ type: 'error', text1: 'User not found', position: 'bottom' });
    }
  } catch (error) {
    console.log(error, 'fetch_user_error');
    const errorMessage = getFirebaseErrorMessage(error.code);
    Toast.show({ type: 'error', text1: errorMessage, position: 'bottom' });
  } finally {
    dispatch({ type: 'IS_LOADER', payload: false });
  }
};
