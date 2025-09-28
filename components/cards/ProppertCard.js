import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import CustomText from "../common/Text";
import { HOST } from "../../utils/static";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const PropertyCard = ({
  onPress,
  title,
  location,
  price,
  description,
  image,
  type = "Villa",
  widthlist,
}) => {
  const desc = description
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const cleanedStrig = desc.split("•").map((part) => part.trim());

  const getRandomRating = () => {
    const min = 4.0;
    const max = 5.0;
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  const randomRating = useMemo(() => getRandomRating(), []);
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {image === "N/A" ? (
            <Image
              source={{ uri: `${HOST}resources/${image}` }}
              style={styles.image}
            />
          ) : image ===
            "https://www.myhousingsearch.com/graphics/images/grayNoPics.png" ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : null}

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{cleanedStrig[2]}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <CustomText style={styles.title}>{title}</CustomText>
            <View style={styles.rating}>
              <FontAwesome name="star" size={14} color="#FFA500" />
              <Text style={styles.ratingText}>{randomRating}</Text>
            </View>
          </View>

          <CustomText style={styles.location}>{location}</CustomText>

          <TouchableOpacity style={styles.priceButton} onPress={onPress}>
            <Text style={styles.priceButtonText}>Contact</Text>
          </TouchableOpacity>

          <View style={styles.specs}>
            <View style={styles.specItem}>
              <MaterialCommunityIcons
                name="bed-outline"
                size={16}
                color="#9d011f"
              />
              <Text style={styles.specText}>{cleanedStrig[0]}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="shower" size={16} color="#9d011f" />
              <Text style={styles.specText}>{cleanedStrig[1]}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons
                name="ruler-square"
                size={16}
                color="#9d011f"
              />
              <Text style={styles.specText}>{cleanedStrig[2]}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    width: width * 0.8,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    // Android shadow
    elevation: 5,

    // iOS shadow
    shadowColor: "#dimgray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // IMPORTANT: overflow: 'hidden' disables shadow on iOS
    // Remove it or use overflow: 'visible' if you need the shadow to show
    overflow: Platform.OS === "ios" ? "visible" : "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
    elevation: 2,
  },
  typeBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#9d011f",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#888",
  },
  location: {
    fontSize: 13,
    color: "#999",
    marginVertical: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF914D",
  },
  month: {
    fontSize: 12,
    color: "#999",
  },
  specs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  specText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  priceButton: {
    backgroundColor: "#051138",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  priceButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
