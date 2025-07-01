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
} from "react-native";
import { Avatar } from "react-native-paper";
import { AntDesign, Entypo } from "react-native-vector-icons";
import { getUserEmail, getUserName } from "../../utils/AsyncData/getItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/user";

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
    { label: "Membership: Free", icon: "staro", action: "upgrade" }, // You can change the label dynamically
    { label: "Auto-apply for me", icon: "checkcircleo", isToggle: true },
    { label: "Address / Phone / Password", icon: "setting" },
    { label: "FAQs", icon: "questioncircleo", screem:"Faq" },
    { label: "Terms and Conditions", icon: "questioncircleo", screem:"Faq" },

  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Scrollable Profile Content */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Avatar.Image source={require("../../assets/avatars/male.png")} />
            <Text style={styles.name}>{value}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {profileOptions.map((item, index) => (
            <View key={index} style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <View style={styles.iconBox}>
                  <AntDesign name={item.icon} size={20} color={"black"} />
                </View>
                <Text style={styles.optionLabel}>{item.label}</Text>
              </View>

              {item.isToggle ? (
                <Switch value={isLandlord} onValueChange={toggleSwitch} />
              ) : (
                <Entypo name="chevron-right" size={20} color="gray" />
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Switch */}
      <Pressable
        style={styles.optionLeft}
        onPress={() => {
          // navigation.navigate("Root");
          navigation.reset({
            index: 0,
            routes: [{ name: "Splashone" }],
          });
          dispatch(clearUser(null));
        }}
      >
        <View style={styles.bottomSwitch}>
          <View style={styles.iconBox}>
            <AntDesign name="swap" size={20} color={"black"} />
          </View>
          <Text style={styles.optionLabel}>Logout</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginHorizontal: 30,
    marginVertical: 30,
  },
  avatar: {
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "gray",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingVertical: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    margin: 5,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bottomSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
