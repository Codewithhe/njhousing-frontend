import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import SplashScreen from "../../components/Screens/SplashScreen";
import LiveChat from "../../components/Screens/LiveChat";
import { Avatar } from "react-native-paper";
import { Text, View } from "react-native";
import TenantFinderScreen from "../../components/Screens/Owner/TenantFinder";
import Dashboard from "../../components/Screens/Owner/Dashboard";
import { Foundation, AntDesign } from "react-native-vector-icons";
import LoginScreen from "../../components/Screens/Authentication/LoginScreen";
import SignupScreen from "../../components/Screens/Authentication/SignupScreen";
import PropertyDetailScreen from "../../components/Screens/PropertyDetail";
import ContactQueryForm from "../../components/ContactQueryForm";
import VerifyOTPScreen from "../../components/Screens/Authentication/VerifyOTP";
import DrawerNavigator from "../drawer/navigtor";
import SeacrResults from "../../components/Screens/SearchResults";
import PaymentGateway from "../../components/Payment/paymenrButton";
import Splashone from "../../components/Screens/SplashScreens/Splashone";
import Splashtwo from "../../components/Screens/SplashScreens/Splashtwo";
import Splashthree from "../../components/Screens/SplashScreens/Splashthree";
import Faq from "../../components/Screens/Faq/screen";
import Terms from "../../components/Screens/TermsAndConditions/screen";

const RootStack = createStackNavigator();

const AuthRootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen
        name="Splash"
        options={{ headerShown: false, headerTitle: "" }}
        component={SplashScreen}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Root"
        options={{ headerShown: false, headerTitle: "" }}
        component={DrawerNavigator}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Login"
        options={{ headerShown: false, headerTitle: "" }}
        component={LoginScreen}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Signup"
        options={{ headerShown: false, headerTitle: "" }}
        component={SignupScreen}
      ></RootStack.Screen>
      <RootStack.Screen
        name="VerifyOtp"
        options={{ headerShown: false, headerTitle: "" }}
        component={VerifyOTPScreen}
      ></RootStack.Screen>

      <RootStack.Screen
        name="LiveChat"
        options={({ route }) => ({
          headerShown: true,
          headerLeft: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <Text>
                <Avatar.Image
                  size={24}
                  source={require("../../assets/icon.png")}
                />
              </Text>
              <Text>{route.params.name}</Text>
            </View>
          ),
        })}
        component={LiveChat}
      ></RootStack.Screen>
      <RootStack.Screen
        name="Splashone"
        options={{ headerShown: false, headerTitle: "" }}
        component={Splashone}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Splashtwo"
        options={{ headerShown: false, headerTitle: "" }}
        component={Splashtwo}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Splashthree"
        options={{ headerShown: false, headerTitle: "" }}
        component={Splashthree}
      ></RootStack.Screen>
      <RootStack.Screen
        name="TenantFinder"
        options={({ route }) => ({
          headerShown: true,
          headerLeft: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                flexDirection: "row",
              }}
            ></View>
          ),
        })}
        component={TenantFinderScreen}
      ></RootStack.Screen>
      <RootStack.Screen
        name="Dashboard"
        options={({ route }) => ({
          headerShown: true,
          headerLeft: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </View>
          ),
          headerTitle: "Dashboard",
          headerRight: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <Foundation size={24} name="align-left" color={"black"} />
            </View>
          ),
        })}
        component={Dashboard}
      ></RootStack.Screen>

      <RootStack.Screen
        name="PropertyDetail"
        options={{ headerShown: false, headerTitle: "" }}
        component={PropertyDetailScreen}
      ></RootStack.Screen>

      <RootStack.Screen
        name="PropertyListings"
        options={{ headerShown: true, headerTitle: "" }}
        component={PropertyDetailScreen}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Contact_now"
        options={{ headerShown: true, headerTitle: "" }}
        component={ContactQueryForm}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Search_Results"
        options={{ headerShown: true, headerTitle: "" }}
        component={SeacrResults}
      ></RootStack.Screen>
      <RootStack.Screen
        name="Payment"
        options={{ headerShown: true, headerTitle: "" }}
        component={PaymentGateway}
      ></RootStack.Screen>

      <RootStack.Screen
        name="Faq"
        options={{ headerShown: true, headerTitle: "" }}
        component={Faq}
      ></RootStack.Screen>
      <RootStack.Screen
        name="Terms"
        options={{ headerShown: true, headerTitle: "" }}
        component={Terms}
      ></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default AuthRootStackNavigator;
