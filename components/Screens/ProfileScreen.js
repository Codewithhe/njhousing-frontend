import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { Avatar } from "react-native-paper";
import { AntDesign, Entypo } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getUserEmail, getUserName } from "../../utils/AsyncData/getItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/user";
import { COLORS, GRADIENTS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from "../../utils/theme";

const ProfileScreen = () => {
  const [isLandlord, setIsLandlord] = useState(false);
  const toggleSwitch = () => setIsLandlord((prev) => !prev);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    getUserName(setValue);
    getUserEmail(setEmail);
  }, []);

  const profileOptions = [
    { label: "Eligibility Info", icon: "profile" },
    { label: "Membership: Free", icon: "staro", screen: "Subscription" }, 
    { label: "Auto-apply for me", icon: "checkcircleo", isToggle: true },
    { label: "Address / Phone / Password", icon: "setting" },
    { label: "FAQs", icon: "questioncircleo", screen: "Faq" },
    { label: "Terms and Conditions", icon: "questioncircleo", screen: "Terms" },
  ];

  const handlePress = (item) => {
    if (item.screen) {
      if (item.screen === "Subscription") {
        navigation.navigate("Root", {
          screen: "Tabs",
          params: { screen: "Subscription" },
        });
      } else {
        navigation.navigate(item.screen);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={GRADIENTS.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.avatarContainer}>
                <Avatar.Image size={80} source={require("../../assets/avatars/male.png")} />
              </View>
              <Text style={styles.name}>{value || "Guest User"}</Text>
              <Text style={styles.email}>{email || "No email provided"}</Text>
            </View>
          </LinearGradient>

          <View style={styles.optionsContainer}>
            {profileOptions.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [styles.optionRow, pressed && { opacity: 0.7 }]}
                onPress={() => handlePress(item)}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.iconBox}>
                    <AntDesign name={item.icon} size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </View>

                {item.isToggle ? (
                  <Switch 
                    value={isLandlord} 
                    onValueChange={toggleSwitch}
                    trackColor={{ false: COLORS.gray300, true: COLORS.accentLight }}
                    thumbColor={isLandlord ? COLORS.accent : COLORS.white}
                  />
                ) : (
                  <Entypo name="chevron-right" size={20} color={COLORS.textTertiary} />
                )}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <Pressable
        style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.7 }]}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Splashone" }],
          });
          dispatch(clearUser(null));
        }}
      >
        <View style={styles.logoutContent}>
          <AntDesign name="logout" size={20} color={COLORS.error} style={{ marginRight: SPACING.md }} />
          <Text style={styles.logoutLabel}>Log Out</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.xl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  avatarContainer: {
    padding: 4,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.circle,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontFamily: "Poppins-Bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  email: {
    color: COLORS.gray200,
    fontSize: FONT_SIZE.md,
  },
  optionsContainer: {
    paddingHorizontal: SPACING.md,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    backgroundColor: COLORS.accentSoft,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  optionLabel: {
    fontSize: FONT_SIZE.md,
    fontFamily: "Poppins-Semi",
    color: COLORS.textPrimary,
  },
  logoutButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    borderBottomColor: COLORS.borderLight,
  },
  logoutContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutLabel: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.error,
    fontFamily: "Poppins-Bold",
  },
});
