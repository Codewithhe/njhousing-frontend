import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
  Pressable,
  StatusBar,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import property_details from "../../utils/properties_detail.json";
import { ActivityIndicator, Avatar } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import CustomText from "../common/Text";
import { fetchpropdetails } from "../../utils/apicalls/fetchbytitle";
import CustomTextBold from "../common/BoldCustomtext";
import { useSelector } from "react-redux";
import { propertyImages } from "../../utils/propertyImageMapping";
import { HOST } from "../../utils/static";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from "../../utils/theme";

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen() {
  const user = useSelector((state) => state.user);
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchpropdetails(setData, id, setLoading);
  }, []);

  const region = {
    latitude: 37.7749, // Example: San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // var unit = data.unit;
  // var utilities = data.utilities;
  // var parking = data.parkingAndEntry;
  // var nearbyServices = data.nearbyServices;
  // var accessibility = data.accessibility;

  if (data.length === undefined) {
    const handleTabPress = (tab, index) => {
      setActive(tab);

      // Slide content
      Animated.spring(translateX, {
        toValue: -width * index,
        useNativeDriver: true,
      }).start();

      // Move indicator
      Animated.spring(indicatorX, {
        toValue: index * 150, // assuming button width of 150
        useNativeDriver: true,
      }).start();
    };

    const desc = data.description
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const cleanedStrig = desc.split("•").map((part) => part.trim());
    const tabs = ["Kitchen", "Utilities", "Appliances"];
    const tableKeys = ["table_10", "table_7", "table_6"];

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <SafeAreaView style={styles.container}>
          <View showsVerticalScrollIndicator={false}>
            <View
              style={{
                position: "absolute",
                zIndex: 9999,
                top: 30,
                marginHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
              }}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: "white",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../assets/navigation/back.png")}
                />
              </Pressable>
            </View>

            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 100 }}
              >
                <View style={styles.imageContainer}>
                  {(() => {
                    const localImg = propertyImages[id];
                    const PLACEHOLDER = require("../../assets/images/propertyImage/unit_619802_webfile.png");
                    let source = PLACEHOLDER;

                    if (localImg) {
                      source = localImg;
                    } else if (typeof data.image === "string" && /^https?:/i.test(data.image)) {
                      source = { uri: data.image };
                    } else if (data.image && data.image !== "N/A") {
                      source = { uri: `${HOST}resources/${data.image}` };
                      console.log(source)
                    }

                    return (
                      <Image source={source} style={styles.image} />
                    );
                  })()}

                  {user?.user?.premiumEnabled === true ? (
                    <TouchableOpacity
                      style={styles.videoButton}
                      onPress={() =>
                        navigation.navigate("Root", {
                          screen: "Tabs",
                          params: {
                            screen: "Lottery",
                          },
                        })
                      }
                    >
                      <CustomText style={styles.videoButtonText}>
                        Lottery
                      </CustomText>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.videoButton}
                      onPress={() =>
                        navigation.navigate("Root", {
                          screen: "Tabs",
                          params: {
                            screen: "Subscription",
                          },
                        })
                      }
                    >
                      <CustomText style={styles.videoButtonText}>
                        Subscribe Plan
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.content}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <CustomTextBold style={styles.title}>
                        {data.title}{" "}
                      </CustomTextBold>
                    </View>
                  </View>

                  <View style={styles.iconText}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      color="#888"
                    />
                    <CustomText>{data.address}</CustomText>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.iconText}>
                      <MaterialCommunityIcons
                        name="bed-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                      <CustomText style={styles.infoText}>
                        {cleanedStrig[0]}
                      </CustomText>
                    </View>
                    <View style={styles.iconText}>
                      <MaterialCommunityIcons
                        name="shower"
                        size={18}
                        color={COLORS.primary}
                      />
                      <CustomText style={styles.infoText}>
                        {cleanedStrig[1]}
                      </CustomText>
                    </View>
                    <View style={styles.iconText}>
                      <MaterialCommunityIcons
                        name="office-building"
                        size={18}
                        color={COLORS.primary}
                      />
                      <CustomText style={styles.infoText}>
                        {cleanedStrig[2]}
                      </CustomText>
                    </View>
                  </View>

                  {[
                    { key: "Kitchen & Appliances", icon: "fridge-outline", title: "Kitchen & Appliances" },
                    { key: "Bathroom", icon: "shower", title: "Bathroom" },
                    { key: "Safety & Fire", icon: "fire", title: "Safety & Fire" },
                    { key: "Accessibility", icon: "wheelchair-accessibility", title: "Accessibility" },
                    { key: "Building & Entry", icon: "office-building", title: "Building & Entry" },
                    { key: "Outdoor & Amenities", icon: "tree-outline", title: "Outdoor & Amenities" },
                    { key: "Basic Features & Policies", icon: "shield-check-outline", title: "Basic Features & Policies" },
                    { key: "Utilities", icon: "lightning-bolt", title: "Utilities" },
                    { key: "Parking", icon: "car", title: "Parking" },
                    { key: "neighborhood_amenities", icon: "map-marker-radius", title: "Amenities" }
                  ].map((category, idx) => {
                    return data.details?.[category.key] ? (
                      <View key={idx} style={styles.cardSection}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: SPACING.md }}>
                          <MaterialCommunityIcons name={category.icon} size={24} color={COLORS.primary} style={{ marginRight: 8 }} />
                          <CustomTextBold style={[styles.cardHeader, { marginBottom: 0 }]}>
                            {category.title}
                          </CustomTextBold>
                        </View>
                        {Object.entries(data.details[category.key]).map(([k, v], i) => (
                          <View key={i} style={styles.detailRow}>
                            <CustomText style={styles.detailKey}>{k}:</CustomText>
                            <CustomText style={styles.detailValue}>{v ? String(v).split("|")[0] : "N/A"}</CustomText>
                          </View>
                        ))}
                      </View>
                    ) : null;
                  })}

                  {data.details?.["Other Details"] && (
                    <View style={styles.cardSection}>
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: SPACING.md }}>
                        <MaterialCommunityIcons name="information-outline" size={24} color={COLORS.primary} style={{ marginRight: 8 }} />
                        <CustomTextBold style={[styles.cardHeader, { marginBottom: 0 }]}>
                          Other Details
                        </CustomTextBold>
                      </View>
                      {Object.entries(data.details["Other Details"]).map(([key, value], index) => (
                        <View key={index} style={[styles.detailRow, { flexDirection: "column", alignItems: "flex-start" }]}>
                          <CustomText style={[styles.detailKey, { marginBottom: 4 }]}>{key}:</CustomText>
                          <CustomText style={[styles.detailValue, { textAlign: "left" }]}>{value ? String(value).split("|")[0] : "N/A"}</CustomText>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.section}>
                  <CustomTextBold style={styles.sectionTitle}>
                    Location
                  </CustomTextBold>
                  <MapView style={styles.map} initialRegion={region} />
                </View>
              </ScrollView>

              <View style={styles.footerFixed}>
                {user?.user?.premiumEnabled === true ? (
                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() =>
                      navigation.navigate("Root", {
                        screen: "Tabs",
                        params: {
                          screen: "Lottery",
                        },
                      })
                    }
                  >
                    <CustomText style={styles.contactText}>Lottery</CustomText>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() =>
                      navigation.navigate("Root", {
                        screen: "Tabs",
                        params: {
                          screen: "Subscription",
                        },
                      })
                    }
                  >
                    <CustomText style={styles.contactText}>
                      Subscribe
                    </CustomText>
                  </TouchableOpacity>
                )}
              </View>
            </>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="small" color="#917AFD" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 320, borderBottomLeftRadius: BORDER_RADIUS.xxl, borderBottomRightRadius: BORDER_RADIUS.xxl },
  videoButton: {
    position: 'absolute',
    bottom: -SPACING.xl,
    right: SPACING.xl,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.pill,
    alignItems: "center",
    ...SHADOWS.medium,
    zIndex: 10,
  },
  videoButtonText: {
    color: COLORS.white,
    fontFamily: "Poppins-Bold",
    fontSize: FONT_SIZE.md,
  },
  content: { paddingHorizontal: SPACING.lg, marginBottom: 80, paddingTop: SPACING.xl },
  title: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    fontFamily: "Poppins-Bold",
    lineHeight: 32,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "space-around",
    ...SHADOWS.small,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    marginLeft: 4,
    fontFamily: "Poppins-Semi",
  },
  cardSection: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardHeader: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.primary,
    marginBottom: SPACING.md,
    fontFamily: "Poppins-Bold",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  detailKey: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
    flex: 1,
  },
  detailValue: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    flex: 1,
    fontFamily: "Poppins-Semi",
    textAlign: "right",
  },
  section: { marginBottom: SPACING.xxl, marginHorizontal: SPACING.lg },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: FONT_SIZE.xl,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  map: { width: "100%", height: 180, borderRadius: BORDER_RADIUS.xl, marginVertical: SPACING.md },
  footerFixed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.pill,
    width: width - SPACING.xxl * 2,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  contactText: { color: COLORS.white, fontFamily: "Poppins-Bold", fontSize: FONT_SIZE.lg },
  tabRow: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBase: {
    width: 150,
    padding: SPACING.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  inactiveButton: {
    borderColor: COLORS.gray300,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.accent,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: 150,
    height: 2,
    backgroundColor: COLORS.accent,
  },
  tabContent: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  longcontainer: {
    alignItems: "center",
    marginTop: 50,
  },
  toggleWrapper: {
    width: 320,
    height: 44,
    borderRadius: BORDER_RADIUS.pill,
    backgroundColor: COLORS.gray100,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  activeText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  activeBg: {
    position: "absolute",
    width: 320 / 3,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.pill,
    zIndex: 0,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
  }
});

const ToggleScreen = ({ active, setActive }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePress = (index) => {
    setActive(index);
    Animated.spring(animatedValue, {
      toValue: index,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.longcontainer}>
      <View style={styles.toggleWrapper}>
        <Animated.View
          style={[
            styles.activeBg,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, 320 / 3, (320 / 3) * 2],
                  }),
                },
              ],
            },
          ]}
        />
        {["Kitchen", "Bathroom", "Appliances"].map((label, index) => (
          <Pressable
            key={index}
            style={styles.toggleButton}
            onPress={() => handlePress(index)}
          >
            <CustomText
              style={[styles.text, active === index && styles.activeText]}
            >
              {label}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
