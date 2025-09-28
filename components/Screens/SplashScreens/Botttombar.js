import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "react-native-vector-icons";

const Botttombar = ({ navigation, title }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        paddingBottom: 16,
        paddingTop: 0,
        paddingHorizontal: 20,
      }}
    >
      <Pressable
        onPress={navigation}
        style={{
          backgroundColor: "#efefef",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          width: 300,
        }}
      >
        <Text>{title}</Text>
        <Entypo name="chevron-thin-right" style={{ marginLeft: 10 }} />
      </Pressable>
    </View>
  );
};

export default Botttombar;

const styles = StyleSheet.create({});
