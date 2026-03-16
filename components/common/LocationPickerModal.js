import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "../../redux/slices/user";
import { requestAndDetectLocation } from "../../utils/locationService";
import { COLORS, FONT_FAMILY } from "../../utils/theme";
import CustomText from "./Text";
import CustomTextBold from "./BoldCustomtext";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// NJ Cities available in the app
const NJ_CITIES = [
  { city: "Dover", state: "New Jersey", county: "Morris County" },
  { city: "Clifton", state: "New Jersey", county: "Passaic County" },
  { city: "Hopewell Township", state: "New Jersey", county: "Mercer County" },
  { city: "Haddonfield", state: "New Jersey", county: "Camden County" },
  { city: "Newark", state: "New Jersey", county: "Essex County" },
  { city: "Jersey City", state: "New Jersey", county: "Hudson County" },
  { city: "Paterson", state: "New Jersey", county: "Passaic County" },
  { city: "Elizabeth", state: "New Jersey", county: "Union County" },
  { city: "Trenton", state: "New Jersey", county: "Mercer County" },
  { city: "Camden", state: "New Jersey", county: "Camden County" },
  { city: "Atlantic City", state: "New Jersey", county: "Atlantic County" },
  { city: "Hoboken", state: "New Jersey", county: "Hudson County" },
];

const LocationPickerModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const userCity = useSelector((state) => state.user.userCity);
  const userState = useSelector((state) => state.user.userState);
  const locationLoading = useSelector((state) => state.user.locationLoading);

  const [searchText, setSearchText] = useState("");
  const [detectingLocation, setDetectingLocation] = useState(false);

  const filteredCities = NJ_CITIES.filter((item) => {
    const q = searchText.toLowerCase();
    return (
      item.city.toLowerCase().includes(q) ||
      item.county.toLowerCase().includes(q)
    );
  });

  const handleSelectCity = (item) => {
    dispatch(
      setUserLocation({
        city: item.city,
        state: item.state,
      })
    );
    setSearchText("");
    onClose();
  };

  const handleDetectLocation = async () => {
    setDetectingLocation(true);
    await requestAndDetectLocation();
    setDetectingLocation(false);
    setSearchText("");
    onClose();
  };

  const currentLocation = userCity
    ? `${userCity}, ${userState || "NJ"}`
    : userState || "New Jersey";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            {/* Handle */}
            <View style={styles.handleBar} />

            {/* Title */}
            <CustomTextBold style={styles.title}>
              Change Location
            </CustomTextBold>

            {/* Current Location */}
            <View style={styles.currentLocationBox}>
              <View style={styles.currentLocationLeft}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={22}
                  color={COLORS.accent}
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <CustomText style={styles.currentLabel}>
                    Current Location
                  </CustomText>
                  <CustomTextBold style={styles.currentCity}>
                    {currentLocation}
                  </CustomTextBold>
                </View>
              </View>
              <View style={styles.activeDot} />
            </View>

            {/* Detect My Location Button */}
            <TouchableOpacity
              style={styles.detectButton}
              onPress={handleDetectLocation}
              disabled={detectingLocation}
              activeOpacity={0.7}
            >
              {detectingLocation ? (
                <ActivityIndicator size="small" color={COLORS.accent} />
              ) : (
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  size={20}
                  color={COLORS.accent}
                />
              )}
              <CustomText style={styles.detectText}>
                {detectingLocation
                  ? "Detecting your location..."
                  : "Use my current location"}
              </CustomText>
            </TouchableOpacity>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={18}
                color={COLORS.textTertiary}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search city or county..."
                placeholderTextColor={COLORS.textTertiary}
                value={searchText}
                onChangeText={setSearchText}
                autoCorrect={false}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={COLORS.textTertiary}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Available Cities Label */}
            <CustomText style={styles.sectionLabel}>
              Available Cities
            </CustomText>

            {/* City List */}
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item.city}
              style={styles.cityList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item.city === userCity;
                return (
                  <TouchableOpacity
                    style={[
                      styles.cityItem,
                      isSelected && styles.cityItemSelected,
                    ]}
                    onPress={() => handleSelectCity(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.cityItemLeft}>
                      <View
                        style={[
                          styles.cityIcon,
                          isSelected && styles.cityIconSelected,
                        ]}
                      >
                        <Entypo
                          name="location-pin"
                          size={18}
                          color={isSelected ? COLORS.white : COLORS.accent}
                        />
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text
                          style={[
                            styles.cityName,
                            isSelected && styles.cityNameSelected,
                          ]}
                        >
                          {item.city}
                        </Text>
                        <Text style={styles.countyName}>{item.county}</Text>
                      </View>
                    </View>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={COLORS.accent}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <CustomText style={styles.emptyText}>
                    No cities found for "{searchText}"
                  </CustomText>
                </View>
              }
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

export default LocationPickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    maxHeight: SCREEN_HEIGHT * 0.75,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray300,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  currentLocationBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.accentSoft,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  currentLocationLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  currentLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  currentCity: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 2,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },
  detectButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: COLORS.accentSoft,
    borderRadius: 14,
    marginBottom: 16,
    gap: 10,
  },
  detectText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.regular,
  },
  sectionLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  cityList: {
    maxHeight: SCREEN_HEIGHT * 0.35,
  },
  cityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  cityItemSelected: {
    backgroundColor: COLORS.accentSoft,
  },
  cityItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  cityIconSelected: {
    backgroundColor: COLORS.accent,
  },
  cityName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.semiBold,
  },
  cityNameSelected: {
    color: COLORS.accent,
  },
  countyName: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 1,
    fontFamily: FONT_FAMILY.regular,
  },
  emptyList: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textTertiary,
    fontSize: 14,
  },
});
