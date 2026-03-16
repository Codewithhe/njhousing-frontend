import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../common/Text";
import CustomLogo from "../../CustomLogo";
import Botttombar from "./Botttombar";
import { COLORS, FONT_SIZE, FONT_FAMILY, SPACING } from "../../../utils/theme";

const { height } = Dimensions.get("window");

const Splashtwo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/onboarding/ob2.png")}
      >
        <LinearGradient
          colors={["transparent", "rgba(5, 17, 56, 0.4)", "rgba(5, 17, 56, 1)"]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.content}>
            <View style={styles.topSection}>
              <CustomLogo
                color={COLORS.white}
                image={require("../../../assets/images/logo_comp/nj_house_map.png")}
              />
            </View>

            <View style={styles.textSection}>
              <CustomText style={styles.title}>
                Search, Apply,{"\n"}
                <Text style={styles.titleBold}>and Connect.</Text>
              </CustomText>
              
              <Text style={styles.description}>
                Easily search for housing options and connect with landlords — all hassle-free.
              </Text>
            </View>

            <View style={styles.bottomSection}>
              <Botttombar
                title="Next"
                navigation={() => navigation.navigate("Splashthree")}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Splashtwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    paddingTop: height * 0.05,
    alignItems: "center",
  },
  textSection: {
    paddingHorizontal: SPACING.xxxl,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    color: COLORS.white,
    lineHeight: 38,
    fontFamily: FONT_FAMILY.light,
  },
  titleBold: {
    fontSize: 34,
    color: COLORS.white,
    fontFamily: FONT_FAMILY.bold,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.lg,
    lineHeight: 24,
    fontFamily: FONT_FAMILY.regular,
  },
  bottomSection: {
    paddingBottom: SPACING.xl,
  },
});
