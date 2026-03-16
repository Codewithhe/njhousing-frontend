import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo, EvilIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomText from "./Text";
import CustomTextBold from "./BoldCustomtext";
import LocationPickerModal from "./LocationPickerModal";
import { COLORS } from "../../utils/theme";

const LocationHeader = ({ image }) => {
  const navigation = useNavigation();
  const userCity = useSelector((state) => state.user.userCity);
  const userState = useSelector((state) => state.user.userState);
  const locationLoading = useSelector((state) => state.user.locationLoading);
  const [showPicker, setShowPicker] = useState(false);

  // Build display text
  const locationText = locationLoading
    ? "Detecting..."
    : userCity
    ? `${userCity}, ${userState || "NJ"}`
    : userState || "New Jersey";

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.container}>
        {/* Location - Tappable to open picker */}
        <Pressable
          onPress={() => setShowPicker(true)}
          style={styles.locationTouchable}
        >
          <CustomText style={styles.greetingText}>
            Searching in
          </CustomText>
          <View style={styles.locationRow}>
            <Image
              source={require("../../assets/location_icon.png")}
              style={styles.locationIcon}
            />
            {locationLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="white" />
                <CustomText style={styles.detectingText}>
                  Detecting...
                </CustomText>
              </View>
            ) : (
              <CustomTextBold style={styles.locationText}>
                {locationText}
              </CustomTextBold>
            )}
            <Entypo
              name="chevron-down"
              color="white"
              size={22}
              style={{ marginLeft: 4 }}
            />
          </View>
        </Pressable>

        {/* Right Side - Premium/Profile */}
        {image ? (
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={styles.premiumButton}
          >
            <CustomTextBold style={styles.premiumText}>
              Premium
            </CustomTextBold>
            <Image
              source={require("../../assets/images/background/premium.png")}
              style={styles.premiumIcon}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={styles.profileButton}
          >
            <EvilIcons name="user" size={44} color="white" />
          </Pressable>
        )}
      </View>

      {/* Location Picker Modal */}
      <LocationPickerModal
        visible={showPicker}
        onClose={() => setShowPicker(false)}
      />
    </SafeAreaView>
  );
};

export default LocationHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  locationTouchable: {
    flex: 1,
    paddingVertical: 4,
  },
  greetingText: {
    marginLeft: 10,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 0.3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationIcon: {
    marginLeft: 10,
    width: 18,
    height: 18,
    backgroundColor: "white",
    borderRadius: 9,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  detectingText: {
    fontSize: 12,
    marginLeft: 5,
    color: "rgba(255,255,255,0.7)",
  },
  locationText: {
    fontSize: 15,
    marginLeft: 6,
    color: "white",
  },
  premiumButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  premiumText: {
    color: "#d6a534",
    fontSize: 12,
  },
  premiumIcon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    marginLeft: 6,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
