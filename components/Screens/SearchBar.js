import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo } from "react-native-vector-icons";

import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../common/Text";
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const slideAnim = useRef(new Animated.Value(-100)).current; // starts off-screen
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="search1"
            size={20}
            style={{
              marginRight: "10",
              marginLeft: "10",
            }}
          />
          <TextInput
            placeholder="Search New Property"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={() =>
              navigation.navigate("Search_Results", { query: searchQuery })
            }
            returnKeyType="search"
            style={{ width: 250 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            const q = (searchQuery || '').trim();
            if (!q) return;
            navigation.navigate("Search_Results", { query: q });
          }}
        >
          <AntDesign
            name="enter"
            size={20}
            style={{
              marginRight: "10",
              marginLeft: "10",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    marginTop: 50,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputStyle: {
    fontSize: 13,
    padding: -10,
  },
  vector: {
    position: "absolute",
    left: "13%",
    right: "13.04%",
    top: "7.29%",
    bottom: "7.29%",
    borderRadius: 12, // optional for smoothness
  },
});

/* Vector */
