import React from "react";
import RootStackNavigator from "./navigation/AuthNavigation/NonAuthenticatedNavigation";
import { View, StatusBar, Platform } from "react-native";
import AuthRootStackNavigator from "./navigation/AuthNavigation/AuthenticatedNavigation";
import { useSelector } from "react-redux";
import { COLORS } from "./utils/theme";

const Main = () => {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        translucent={Platform.OS === "android"}
      />
      {isLoggedIn ? <AuthRootStackNavigator /> : <RootStackNavigator />}
    </View>
  );
};

export default Main;
