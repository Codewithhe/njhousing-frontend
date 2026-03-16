import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../common/Text";
import { propertyImages } from "../../utils/propertyImageMapping";
import { HOST } from "../../utils/static";
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from "../../utils/theme";

const idToLocalImage = propertyImages;

const { width } = Dimensions.get("window");

const PropertyCard = ({
  onPress,
  id,
  title,
  location,
  price,
  description,
  image,
  type = "Villa",
  widthlist,
}) => {
  const desc = description
    ?.replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "";
  const cleanedStrig = desc.split("•").map((part) => part.trim());

  const getRandomRating = () => {
    const min = 4.5;
    const max = 5.0;
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  const randomRating = useMemo(() => getRandomRating(), []);
  const localImage = id ? idToLocalImage[id] : undefined;
  const PLACEHOLDER = require("../../assets/images/propertyImage/unit_621870_graynopics.png");

  const getImageSource = () => {
    if (localImage) return localImage;
    if (image && typeof image === "string") {
      const lowerImg = image.toLowerCase();
      if (lowerImg.includes("graynopics") || lowerImg === "n/a" || lowerImg === "") {
        return PLACEHOLDER;
      }
      if (/^https?:/i.test(image)) {
        return { uri: image };
      }
      return { uri: `${HOST}resources/${image}` };
    }
    return PLACEHOLDER;
  };

  const resolvedSource = getImageSource();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.cardWrapper, pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] }]}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={resolvedSource} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.imageOverlay}
          />
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{cleanedStrig[2] || type}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <FontAwesome name="star" size={12} color={COLORS.gold} />
            <Text style={styles.ratingText}>{randomRating}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <CustomText style={styles.title} numberOfLines={1}>
            {title}
          </CustomText>
          
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color={COLORS.textSecondary} />
            <CustomText style={styles.location} numberOfLines={1}>
              {location}
            </CustomText>
          </View>

          <View style={styles.specsContainer}>
            <View style={styles.specPill}>
              <MaterialCommunityIcons name="bed-outline" size={14} color={COLORS.accent} />
              <Text style={styles.specText}>{cleanedStrig[0] || "1 Bed"}</Text>
            </View>
            <View style={styles.specPill}>
              <MaterialCommunityIcons name="shower" size={14} color={COLORS.accent} />
              <Text style={styles.specText}>{cleanedStrig[1] || "1 Bath"}</Text>
            </View>
            <View style={styles.specPill}>
              <MaterialCommunityIcons name="vector-square" size={14} color={COLORS.accent} />
              <Text style={styles.specText}>{cleanedStrig[2] || "Sqft"}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButtonContainer} onPress={onPress}>
            <LinearGradient
              colors={COLORS.GRADIENTS?.primary || ["#051138", "#1A3580"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.contactButton}
            >
              <Text style={styles.contactButtonText}>Contact Details</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
  },
  card: {
    width: width * 0.75,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  typeBadge: {
    position: "absolute",
    bottom: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.pill,
  },
  typeText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
  },
  ratingBadge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.pill,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  location: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  specsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  specPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.md,
  },
  specText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: "600",
  },
  contactButtonContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
  },
  contactButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  contactButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
