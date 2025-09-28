import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../common/Text";
import CustomLogo from "../../CustomLogo";
import Botttombar from "./Botttombar";
import * as Font from "expo-font";

const Splashthree = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../../assets/fonts/Hind/Hind-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or splash loader
  }

  return (
    <ImageBackground
      style={[
        styles.container,
        {
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "#051138", // 🔹 background color added
        },
      ]}
      source={require("../../../assets/images/background/splash.png")}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#051138" />

        <View style={{ marginHorizontal: 50 }}>
          <CustomLogo
            image={require("../../../assets/images/logo_comp/nj_house_map.png")}
          />

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomText
              style={[
                styles.text,
                {
                  fontSize: 25,
                  marginTop: 30,
                  fontWeight: "200",
                  color: "white", // text contrast on dark bg
                },
              ]}
            >
              Affordable Housing, Made Simple.
            </CustomText>

            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  color: "lightgray", // better visibility
                  marginTop: 1,
                  fontWeight: "200",
                  textAlign: "center",
                },
              ]}
            >
              Find homes, check your eligibility, and get expert guidance - all
              in one app
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Button */}
      <View style={styles.bottomBox}>
        <Botttombar
          title="Get Started"
          navigation={() => navigation.navigate("Splashtwo")}
        />
      </View>
    </ImageBackground>
  );
};

export default Splashthree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    width: "100%",
    height: 600,
    position: "absolute",
    zIndex:2
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "white", // default white text for dark background
    textAlign: "center",
  },
  centerBox: {
    backgroundColor: "#051138",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    zIndex:1
  },
  bottomBox: {
    marginBottom: 40,
    width: "100%",
    alignItems: "center",
  },
});
