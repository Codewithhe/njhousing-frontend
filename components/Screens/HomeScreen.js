import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import LocationHeader from "../common/LocationHeader";
import SearchBar from "./SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import AvailableforRent from "./HomeScreenComp/AvailableforRent";

import CustomText from "../common/Text";
import { useSelector } from "react-redux";
import { COLORS, GRADIENTS, SPACING, FONT_SIZE } from "../../utils/theme";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.backgroundImageContainer}>
            <Image
              source={require("../../assets/images/background/picnic.png")}
              style={styles.backgroundImage}
              resizeMode="cover"
              pointerEvents="none"
            />
            {/* Blue Shadow/Overlay for better readability */}
            <View style={styles.imageOverlay} />
          </View>

          <LinearGradient
            colors={GRADIENTS.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <LocationHeader image={user?.user?.premiumEnabled} />

            <View style={styles.headerContentContainer}>
              <Text style={styles.heroText}>
                Discover Your Perfect Home in NJ 
              </Text>
              <CustomText style={styles.subHeroText}>
                Affordable, reliable, and premium listings
              </CustomText>
            </View>

            <View style={styles.searchContainer}>
              <SearchBar />
            </View>
          </LinearGradient>

          <View style={styles.bodyContent}>
            <AvailableforRent />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImageContainer: {
    width: width,
    height: 320,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 17, 56, 0.3)', // Blue shadow overlay
  },
  headerGradient: {
    paddingBottom: SPACING.xl * 1.5,
    paddingTop: SPACING.sm,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContentContainer: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  heroText: {
    fontFamily: "Poppins-Bold",
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.white,
    lineHeight: 38,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subHeroText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray300,
    opacity: 0.95,
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: -SPACING.xl, 
  },
  bodyContent: {
    paddingTop: SPACING.xxxl,
    paddingHorizontal: SPACING.xs,
    zIndex: 1,
  },
});
