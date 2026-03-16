import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../common/Text";
import CustomLogo from "../../CustomLogo";
import Botttombar from "./Botttombar";
import { COLORS, FONT_SIZE, FONT_FAMILY, SPACING } from "../../../utils/theme";

const { height } = Dimensions.get("window");

const Splashone = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/onboarding/ob1.png")}
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
                Affordable Housing,{"\n"}
                <Text style={styles.titleBold}>Made Simple.</Text>
              </CustomText>
              
              <Text style={styles.description}>
                Find homes, check your eligibility, and get expert guidance - all in one app.
              </Text>
            </View>

            <View style={styles.bottomSection}>
              <Botttombar
                title="Get Started"
                navigation={() => navigation.navigate("Splashtwo")}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Splashone;

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
