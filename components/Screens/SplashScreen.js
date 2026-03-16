import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import CustomLogo from "../CustomLogo";
import { COLORS } from "../../utils/theme";

const SplashScreen = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.navigate("Root");
      } else {
        navigation.navigate("Splashone");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation, isLoggedIn]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={require("../../assets/images/background/premium_bg.png")}
        style={styles.imageBackground}
      >
        <LinearGradient
          colors={["rgba(5, 17, 56, 0.4)", "rgba(5, 17, 56, 0.8)"]}
          style={styles.overlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoWrapper}>
              <CustomLogo
                color={COLORS.white}
                image={require("../../assets/images/logo_comp/nj_house_map.png")}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    transform: [{ scale: 1.15 }],
    alignItems: "center",
    justifyContent: "center",
  },
});
