import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CustomText from "../common/Text";
import CustomTextBold from "../common/BoldCustomtext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const InternationalMigrations = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.preAppBanner}
        onPress={() => navigation.navigate("Contact_now")}
      >
        <View style={styles.preAppContent}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={32} color="#fff" />
          <View style={{ marginLeft: 16 }}>
            <CustomTextBold style={styles.preAppTitle}>Start Pre-Application</CustomTextBold>
            <CustomText style={styles.preAppSubtitle}>Check your eligibility today</CustomText>
          </View>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.hostSection}>
        <View>
          <Image
            style={{
              width: 100,
              height: 150,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            source={require("../../assets/images/active_landlord.png")}
          />
        </View>
        <View>
          <CustomTextBold style={styles.hostTitle}>
            Want to host your {"\n"} own place?
          </CustomTextBold>
          <Text></Text>
          <CustomText style={styles.hostSubtitle}>COMING SOON</CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  preAppBanner: {
    backgroundColor: "#951627", // njhousing main red
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  preAppContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  preAppTitle: {
    color: "#fff",
    fontSize: 18,
  },
  preAppSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 2,
  },
  hostSection: {
    backgroundColor: "#051138",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  hostTitle: {
    fontSize: 18,
    color: "white",
    marginLeft: 40,
  },
  hostSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 40,
    color: "white",
  },

  button: {
    padding: 10,
    backgroundColor: "#7e57c2",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default InternationalMigrations;
