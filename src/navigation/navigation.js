import * as React from 'react';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// local imports
import Splash from './../screens/Splash/index';
import GetStarted from './../screens/GetStarted/index';
import Signin from './../screens/Auth/signin';
import Signup from './../screens/Auth/signup';
import OtpVerify from './../screens/Auth/otp';
import ForgotPassword from './../screens/Auth/forgotPassword';
import ResetPassword from './../screens/Auth/resetPassword';
import { AppBottomNavigator } from './BottomNavigation';
import AdFullView from '../screens/AdFullView/index';
import CreateBooking from '../screens/BookingCreate/index';
import CreateService from '../screens/ServiceCreate';
import CustomerInfo from '../screens/CustomerInfo/index';
import Reviews from '../screens/Reviews/index';
import Chat from '../screens/Chat/index';
import BookingView from '../screens/Bookings/BookingView';
import CancelBooking from '../screens/Bookings/CancelBooking';
import AddReview from '../screens/Reviews/addReview';
import CategoriesList from '../screens/CategoriesList/index';
import SignatureScreen from '../screens/NDA/index';
//profile
import EditProfile from './../screens/Profile/editProfile';
import Favorite from './../screens/Profile/favorite';
import Bookings from './../screens/Bookings/index';
import Notification from './../screens/Notification/index';

import CreditCard from './../screens/CreditCard/index';
import AddNewCard from './../screens/CreditCard/addNewCard';
import ReferralDiscounts from './../screens/ReferralDiscounts/index';
import Preferences from './../screens/Preferences/index';
import FAQ from './../screens/FAQ/index';
import Settings from './../screens/Setting/index';
import PrivacyPolicy from './../screens/PrivacyPolicy/index';
import TermsAndCondition from './../screens/TermsAndCondition/index';
import Feedback from './../screens/FeedBack/index';
import Support from './../screens/Support/index';
import DeleteAccount from './../screens/DeleteAccount/index';
import JobsRequest from './../screens/JobsRequest/index';
import Subscription from './../screens/Subscription/index';

const Stack = createNativeStackNavigator();


function App() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;

  const MyTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: colors.white }
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} component={Splash} name="Splash" />
        <Stack.Screen options={{ headerShown: false }} component={GetStarted} name="GetStarted" />
        <Stack.Screen options={{ headerShown: false }} component={Signin} name="Signin" />
        <Stack.Screen options={{ headerShown: false }} component={Signup} name="Signup" />
        <Stack.Screen options={{ headerShown: false }} component={ForgotPassword} name="ForgotPassword" />
        <Stack.Screen options={{ headerShown: false }} component={OtpVerify} name="OtpVerify" />
        <Stack.Screen options={{ headerShown: false }} component={ResetPassword} name="ResetPassword" />
        <Stack.Screen options={{ headerShown: false }} name="Tabs" component={AppBottomNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="AdFullView" component={AdFullView} />
        <Stack.Screen options={{ headerShown: false }} name="CreateBooking" component={CreateBooking} />
        <Stack.Screen options={{ headerShown: false }} name="ServiceCreate" component={CreateService} />
        <Stack.Screen options={{ headerShown: false }} name="CustomerInfo" component={CustomerInfo} />
        <Stack.Screen options={{ headerShown: false }} name="Reviews" component={Reviews} />
        <Stack.Screen options={{ headerShown: false }} name="Chat" component={Chat} />
        <Stack.Screen options={{ headerShown: false }} name="BookingView" component={BookingView} />
        <Stack.Screen options={{ headerShown: false }} name="CancelBooking" component={CancelBooking} />
        <Stack.Screen options={{ headerShown: false }} name="AddReview" component={AddReview} />
        <Stack.Screen options={{ headerShown: false }} name="CategoriesList" component={CategoriesList} />
        <Stack.Screen options={{ headerShown: false }} name="SignatureScreen" component={SignatureScreen} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={{ headerShown: false }} name="Favorite" component={Favorite} />
        <Stack.Screen options={{ headerShown: false }} name="Booking" component={Bookings} />
        <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
        <Stack.Screen options={{ headerShown: false }} name="CreditCard" component={CreditCard} />
        <Stack.Screen options={{ headerShown: false }} name="AddNewCard" component={AddNewCard} />
        <Stack.Screen options={{ headerShown: false }} name="ReferralDiscounts" component={ReferralDiscounts} />
        <Stack.Screen options={{ headerShown: false }} name="Preferences" component={Preferences} />
        <Stack.Screen options={{ headerShown: false }} name="FAQ" component={FAQ} />
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
        <Stack.Screen options={{ headerShown: false }} name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen options={{ headerShown: false }} name="TermsAndCondition" component={TermsAndCondition} />
        <Stack.Screen options={{ headerShown: false }} name="Feedback" component={Feedback} />
        <Stack.Screen options={{ headerShown: false }} name="Support" component={Support} />
        <Stack.Screen options={{ headerShown: false }} name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen options={{ headerShown: false }} name="JobsRequest" component={JobsRequest} />
        <Stack.Screen options={{ headerShown: false }} name="Subscription" component={Subscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;