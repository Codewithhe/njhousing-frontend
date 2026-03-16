import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "react-native-vector-icons";
import { COLORS, SHADOWS, SPACING, FONT_FAMILY, FONT_SIZE } from "../../../utils/theme";

const Botttombar = ({ navigation, title }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={navigation}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.8 : 1 }
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
        <Entypo name="arrow-long-right" size={20} color={COLORS.white} />
      </Pressable>
    </View>
  );
};

export default Botttombar;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    paddingHorizontal: SPACING.xxl,
    paddingBottom: SPACING.xxxl,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.lg,
    borderRadius: 16,
    width: "100%",
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_FAMILY.semiBold,
    marginRight: SPACING.md,
  },
});
