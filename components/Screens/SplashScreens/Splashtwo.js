import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomTextBold from "../../common/BoldCustomtext";
import CustomText from "../../common/Text";
import Botttombar from "./Botttombar";
import CustomLogo from "../../CustomLogo";
import { Entypo } from "react-native-vector-icons";

const Splashtwo = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../../assets/fonts/Hind/Hind-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);
  return (
    <ImageBackground style={[styles.container, {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "white"
    }]} source={require("../../../assets/images/background/splash.png")}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

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
                },
              ]}
            >
              Affordable Housing,
            </CustomText>
            <CustomText
              style={[
                styles.text,
                {
                  fontSize: 24,
                  fontWeight: "200",
                },
              ]}
            >
             Search, Apply, and Connect

            </CustomText>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  color: "gray",
                  marginTop: 30,
                  fontWeight: "200",
                  textAlign: "center",
                },
              ]}
            >
           Easily search for housing options, check eligibility, and connect with landlords and housing authorities — hassle-free.
            </Text>

            {/* <Button
              mode="contained"
              outlineColor="#6246ea"
              onPress={() => navigation.navigate("Splashthree")}
              buttonColor="#051138"
              style={{
                width: 300,
                borderColor: "#6246ea",

                marginHorizontal: 20,
                marginTop: 20,
                marginRight: 20,
              }}
            >
              Next{" "}
              <Entypo name="chevron-thin-right" style={{ marginLeft: 10 }} />
            </Button> */}
          </View>
        </View>
      </SafeAreaView>

      <View
      >
        <Botttombar
          title="Next"
          navigation={() => navigation.navigate("Splashthree")}
        />
      </View>
    </ImageBackground>
  );
};

export default Splashtwo;

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
    // alignItems: "center",
    position: "absolute",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
});
