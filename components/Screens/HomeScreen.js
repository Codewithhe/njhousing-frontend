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
// import Premium from "../../assets/images/background/premium.png";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const user = useSelector((state) => state.user);

  const [active, setActive] = useState("I need to rent");
  const translateX = useRef(new Animated.Value(0)).current;
  const indicatorX = useRef(new Animated.Value(0)).current;

  // const handleTabPress = (tab, index) => {
  //   setActive(tab);

  //   // Slide content
  //   Animated.spring(translateX, {
  //     toValue: -width * index,
  //     useNativeDriver: true,
  //   }).start();

  //   // Move indicator
  //   Animated.spring(indicatorX, {
  //     toValue: index * 150, // assuming button width of 150
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const renderButton = (label, index) => {
  //   const isActive = active === label;

  //   return (
  //     <Pressable onPress={() => handleTabPress(label, index)}>
  //       <View style={[styles.buttonBase, !isActive && styles.inactiveButton]}>
  //         <Text style={[styles.buttonText, !isActive && { color: "black" }]}>
  //           {label}
  //         </Text>
  //       </View>
  //     </Pressable>
  //   );
  // };

  // const checking = async () => {
  //   const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
  //   console.log(AsyncStorage.getItem("isAuthenticated"));
  //   console.log(typeof isAuthenticated);
  //   return true;
  // };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScrollView style={styles.container}>
          <Image
            source={require("../../assets/images/background/picnic.png")}
            style={{
              width: width / 1,
              height: 250,
              position: "absolute",
              top: 220,
              zIndex: 10,
              elevation: 10, // required for Android stacking
              opacity: 0.8,
            }}
            resizeMode="contain"
          />

          <LinearGradient
            colors={["#051138", "#051138", "#606880"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              paddingBottom: 20, // Add padding if needed
              height: 440,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <LocationHeader image={user?.user?.premiumEnabled} />

            <SearchBar />
            <CustomText
              style={{
                fontSize: 20,
                color: "white",
                marginVertical: 11,
                textAlign: "center",
                paddingHorizontal: 10,
              }}
            >
              Welcome to Affordable NJ Housing
            </CustomText>
          </LinearGradient>

          <View style={{ paddingHorizontal: 10 }}>
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
    backgroundColor: "#FCFCFC",
  },
  welcomeText: {
    fontSize: 17,
    marginHorizontal: 10,
    marginVertical: 20,
    fontWeight: "bold",
  },
  toggleContainer: {
    backgroundColor: "whitesmoke",
    padding: 8,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: -10,
  },
  buttonBase: {
    width: 150,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 100,
    zIndex: 1,
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: "100%",
    borderRadius: 100,
    backgroundColor: "#315EE7",
    zIndex: 0,
  },
  slider: {
    flexDirection: "row",
    marginTop: 20,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});
