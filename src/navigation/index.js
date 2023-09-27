import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  LoginScreen,
  ForgotPasswordScreen,
  TrackingScreen,
  CarsScreen,
  CarDetail,
  EventsScreen,
  EventDetailsScreen,
  ContactScreen,
  WebVersionScreen,
  SettingScreen,
  GeneralSettingsScreen,
  HistoryScreen,
  HistoryFrontScreen,
  ObjectControlListScreen,
  ObjectControlFormScreen,
  AboutScreen,
  SahaScreen,
  SahaEkle,
  MusteriEkle,
  Changelog,
} from "../containers";
import FooterContent from "../common/FooterContent";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


/* =============================================================================
<TrackingStack />
============================================================================= */
const TrackingBottom = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <FooterContent {...props} />}>
    <Tab.Screen name="Cars" component={CarsScreen} />
    <Tab.Screen name="HistoryFront" component={HistoryFrontScreen} />
    <Tab.Screen name="TrackingScreen" component={TrackingScreen} />
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="GeneralSettings" component={GeneralSettingsScreen} />
    <Tab.Screen name="CarDetail" component={CarDetail} />
    <Tab.Screen name="History" component={HistoryScreen} />
  </Tab.Navigator>
);

/* =============================================================================
<UnAuthenticatedRoutes />
============================================================================= */
const UnAuthenticatedRoutes = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
/* =============================================================================
<AuthenticatedRoutes />
============================================================================= */

const AuthenticatedRoutes = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tracking" component={TrackingBottom} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Changelog" component={Changelog} />
      <Stack.Screen name="Saha" component={SahaScreen} />
      <Stack.Screen name="SahaEkle" component={SahaEkle} />
      <Stack.Screen name="MusteriEkle" component={MusteriEkle} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="WebVersion" component={WebVersionScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen
        name="ObjectControlList"
        component={ObjectControlListScreen}
      />
      <Stack.Screen
        name="ObjectControlForm"
        component={ObjectControlFormScreen}
      />
      <Stack.Screen name="Aboutus" component={AboutScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

/* Exports
============================================================================= */
export { AuthenticatedRoutes, UnAuthenticatedRoutes };
