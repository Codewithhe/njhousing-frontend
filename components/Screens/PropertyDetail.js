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
  Platform,
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

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchpropdetails(setData, id);
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Regular.ttf"),
        "Hind-Jalandhar-Bold": require("../../assets/fonts/Hind/Hind-Bold.ttf"),
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Light.ttf"),
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Medium.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
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
                <Image
                  source={require("../../assets/images/cards/image-background.png")}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.videoButton}
                  onPress={() =>
                    navigation.navigate("Subscriptions", {
                      title: data.title,
                      address: data.address,
                    })
                  }
                >
                  <CustomText style={styles.videoButtonText}>
                    Subscribe
                  </CustomText>
                </TouchableOpacity>
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
                        size={16}
                        color="#888"
                        style={{ marginLeft: 5 }}
                      />
                      <CustomText style={styles.infoText}>
                        {cleanedStrig[0]}
                      </CustomText>
                    </View>
                    <View style={styles.iconText}>
                      <MaterialCommunityIcons
                        name="shower"
                        size={16}
                        color="#888"
                        style={{ marginLeft: 5 }}
                      />
                      <CustomText style={styles.infoText}>
                        {cleanedStrig[1]}
                      </CustomText>
                    </View>
                    <View style={styles.iconText}>
                      <MaterialCommunityIcons
                        name="office-building"
                        size={16}
                        color="#888"
                        style={{ marginLeft: 5 }}
                      />
                      <CustomText style={styles.infoText}>
                        {cleanedStrig[2]}
                      </CustomText>
                    </View>
                  </View>

                  {/* Tabs */}
                  <View style={styles.tabRow}>
                    <ToggleScreen active={active} setActive={setActive} />
                  </View>

                  <ScrollView horizontal={true}>
                    {active === 0 && (
                      <View style={{ marginTop: 20, margin: 10 }}>
                        {Object.entries(data.details.kitchen).map(
                          ([key, value], index) => (
                            <View
                              key={index}
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",

                                padding: 10,
                                marginTop: 10,
                                borderRadius: 10,
                              }}
                            >
                              <CustomText
                                style={[styles.value, { width: 150 }]}
                              >
                                {key}:
                              </CustomText>
                              <CustomText style={[styles.value]}>
                                {value.split("|")[0]}
                              </CustomText>
                            </View>
                          )
                        )}
                      </View>
                    )}
                    {active === 1 && (
                      <View style={{ marginTop: 20 }}>
                        {Object.entries(data.details.bathroom).map(
                          ([key, value], index) => (
                            <View
                              key={index}
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                padding: 10,
                                marginTop: 10,
                                borderRadius: 10,
                              }}
                            >
                              <CustomText
                                style={[styles.value, { width: 250 }]}
                              >
                                {key}:
                              </CustomText>
                              <CustomText style={[styles.value]}>
                                {value.split("|")[0]}
                              </CustomText>
                            </View>
                          )
                        )}
                      </View>
                    )}
                    {active === 2 && (
                      <View style={{ marginTop: 20 }}>
                        {Object.entries(data.details.appliances).map(
                          ([key, value], index) => (
                            <View
                              key={index}
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",

                                padding: 10,
                                marginTop: 10,
                                borderRadius: 10,
                              }}
                            >
                              <CustomText
                                style={[styles.value, { width: 150 }]}
                              >
                                {key}:
                              </CustomText>
                              <CustomText style={[styles.value]}>
                                {value.split("|")[0]}
                              </CustomText>
                            </View>
                          )
                        )}
                      </View>
                    )}
                  </ScrollView>

                  <View>
                    <CustomTextBold style={{ fontSize: 25, marginTop: 10 }}>
                      Laundry
                    </CustomTextBold>
                  </View>

                  {Object.entries(data.details.laundry).map(
                    ([key, value], index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",

                          padding: 10,
                          marginTop: 10,
                          borderRadius: 10,
                        }}
                      >
                        <CustomText style={[styles.value, { width: 150 }]}>
                          {key}:
                        </CustomText>
                        <CustomText style={[styles.value]}>
                          {value.split("|")[0]}
                        </CustomText>
                      </View>
                    )
                  )}

                  {data.details.neighborhood_amenities && (
                    <>
                      <View>
                        <CustomTextBold style={{ fontSize: 25, marginTop: 10 }}>
                          Amenities
                        </CustomTextBold>
                      </View>

                      {Object.entries(
                        data.details.neighborhood_amenities || {}
                      ).map(([key, value], index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",

                            padding: 10,
                            marginTop: 10,
                            borderRadius: 10,
                          }}
                        >
                          <CustomText style={[styles.value, { width: 150 }]}>
                            {key}:
                          </CustomText>
                          <CustomText style={[styles.value]}>
                            {value.split("|")[0]}
                          </CustomText>
                        </View>
                      ))}
                    </>
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
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() =>
                    navigation.navigate("Root", {
                      screen: "Tabs",
                      params: {
                        screen: "Subscriptions",
                      },
                    })
                  }
                >
                  <CustomText style={styles.contactText}>Subscribe</CustomText>
                </TouchableOpacity>
              </View>
            </>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <>
        <ActivityIndicator size="small" color="#917AFD" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 300 },
  videoButton: {
    borderWidth: 1,
    borderColor: "#051138",
    margin: 16,
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  videoButtonText: {
    color: "#051138",
    fontWeight: "500",
  },
  content: { paddingHorizontal: 16, marginBottom: 50 },
  title: {
    fontSize: 18,
    color: "#1F1D5B",
    marginBottom: 4,
  },
  subtitle: { color: "#555", marginBottom: 2 },
  location: { color: "#555", marginBottom: 12 },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 16,
  },
  ownerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  ownerName: { fontWeight: "bold", color: "#1F1D5B" },
  ownerRole: { fontSize: 12, color: "#888" },
  section: { marginBottom: 24, marginHorizontal: 20 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    marginBottom: 8,
    marginTop: 10,
    fontFamily: "Hind-Jalandhar-Bold",
  },
  facility: { fontSize: 14, marginVertical: 2, color: "#333" },
  map: { width: "100%", height: 150, borderRadius: 8, marginVertical: 12 },
  paragraph: { color: "#444", fontSize: 14, marginBottom: 8 },
  advanceButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#051138",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  advanceText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  advanceAmount: { color: "#fff", fontWeight: "600", fontSize: 16 },
  testimonial: { marginBottom: 12 },
  testimonialName: { fontWeight: "bold", marginBottom: 4, color: "#1F1D5B" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 32,
  },
  footerPrice: { fontSize: 18, fontWeight: "bold", color: "#1F1D5B" },
  footerEstimation: { fontSize: 12, color: "#888" },
  contactButton: {
    backgroundColor: "#051138",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  contactText: { color: "#fff", fontWeight: "600" },
  footerFixed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  tabRow: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center  ",
  },
  buttonBase: {
    width: 150,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  inactiveButton: {
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    color: "blue",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: 150,
    height: 2,
    backgroundColor: "blue",
  },
  tabContent: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  longcontainer: {
    alignItems: "center",
    marginTop: 50,
  },
  toggleWrapper: {
    width: 320,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
  },
  activeBg: {
    position: "absolute",
    width: 320 / 3,
    height: 44,
    backgroundColor: "#051138", // Replace with gradient if needed
    borderRadius: 999,
    zIndex: 0,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: Platform.OS === "ios" ? 13 : 12,
    color: "#666",
    marginLeft: 4,
  },
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
