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

const Splashthree = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/onboarding/ob3.png")}
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
                Expert Guidance,{"\n"}
                <Text style={styles.titleBold}>Every Step.</Text>
              </CustomText>
              
              <Text style={styles.description}>
                Join thousands of families finding their perfect home in New Jersey. Your journey starts here.
              </Text>
            </View>

            <View style={styles.bottomSection}>
              <Botttombar
                title="Get Started"
                navigation={() => navigation.navigate("Login")}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
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
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: SPACING.xxxl,
  },
  textSection: {
    paddingHorizontal: SPACING.xxxl,
    marginTop: height * 0.05,
  },
  title: {
    fontSize: FONT_SIZE.hero,
    color: COLORS.white,
    fontFamily: FONT_FAMILY.regular,
    lineHeight: 48,
  },
  titleBold: {
    fontFamily: FONT_FAMILY.bold,
  },
  description: {
    fontSize: FONT_SIZE.lg,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: FONT_FAMILY.regular,
    marginTop: SPACING.md,
    lineHeight: 24,
  },
  topSection: {
    alignItems: "center",
    marginTop: SPACING.xxl,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
  },
});
