import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import PropertyCard from "../../cards/ProppertCard";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
import InternationalMigrations from "../../cards/DestinationCards";
import { useNavigation } from "@react-navigation/native";
import { fetchallcounty } from "../../../utils/apicalls/fetchallcounty";
import { useSelector } from "react-redux";
import CustomText from "../../common/Text";
import CustomTextBold from "../../common/BoldCustomtext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "../../../utils/theme";

const { width } = Dimensions.get("window");

// Default cities to show if location is not detected
const DEFAULT_PRIMARY_CITY = "Dover";
const DEFAULT_SECONDARY_CITY = "Clifton";

const EmptyState = ({ cityName }) => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons
      name="home-search-outline"
      size={48}
      color={COLORS.gray400}
    />
    <CustomTextBold style={styles.emptyTitle}>
      No Properties Found
    </CustomTextBold>
    <CustomText style={styles.emptySubtitle}>
      No affordable housing listings available in {cityName} right now.
      {"\n"}Try changing your location to explore other areas.
    </CustomText>
  </View>
);

const AvailableforRent = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null); // null = loading, [] = empty, [...] = has data
  const [otherCity, setOtherCity] = useState(null);

  // Get user's detected city from Redux
  const userCity = useSelector((state) => state.user.userCity);
  const locationLoading = useSelector((state) => state.user.locationLoading);

  // Determine which cities to fetch
  const primaryCity = userCity || DEFAULT_PRIMARY_CITY;
  const secondaryCity =
    userCity && userCity !== DEFAULT_SECONDARY_CITY
      ? DEFAULT_SECONDARY_CITY
      : userCity === DEFAULT_SECONDARY_CITY
      ? DEFAULT_PRIMARY_CITY
      : DEFAULT_SECONDARY_CITY;

  const fetchData = useCallback(() => {
    if (!locationLoading) {
      setData(null);
      setOtherCity(null);
      fetchallcounty(setData, primaryCity);
      fetchallcounty(setOtherCity, secondaryCity);
    }
  }, [primaryCity, secondaryCity, locationLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderPropertyList = (items, cityName) => {
    // Loading state
    if (items === null) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <CustomText style={styles.loadingText}>
            Loading properties...
          </CustomText>
        </View>
      );
    }

    // Empty state
    if (Array.isArray(items) && items.length === 0) {
      return <EmptyState cityName={cityName} />;
    }

    // Data found
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {items.map((item, index) => {
          const price = item.price === undefined ? "N/A" : item.price;
          return (
            <PropertyCard
              key={item._id || index}
              id={item._id}
              widthlist={true}
              onPress={() =>
                navigation.navigate("PropertyDetail", { id: item._id })
              }
              title={item.title}
              location={item.address}
              price={price}
              description={item.description}
              image={item.image}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Primary City Section */}
      <View style={styles.sectionHeader}>
        <View>
          <CustomTextBold style={styles.sectionTitle}>
            Near your location
          </CustomTextBold>
          <CustomText style={styles.sectionSubtitle}>
            Properties in {primaryCity}
          </CustomText>
        </View>
        <Button
          style={styles.seeAllButton}
          labelStyle={styles.seeAllText}
          mode="text"
          onPress={() =>
            navigation.navigate("Root", {
              screen: "Tabs",
              params: { screen: "Explore" },
            })
          }
        >
          See all
        </Button>
      </View>

      {renderPropertyList(data, primaryCity)}

      {/* Secondary City Section */}
      <View style={[styles.sectionHeader, { marginTop: SPACING.xl }]}>
        <View>
          <CustomTextBold style={styles.sectionTitle}>
            Trending in {secondaryCity}
          </CustomTextBold>
          <CustomText style={styles.sectionSubtitle}>
            Popular affordable options
          </CustomText>
        </View>
        <Button
          style={styles.seeAllButton}
          labelStyle={styles.seeAllText}
          mode="text"
        >
          See all
        </Button>
      </View>

      {renderPropertyList(otherCity, secondaryCity)}

      {/* County Cards */}
      <View style={{ marginTop: SPACING.xl }}>
        <InternationalMigrations />
      </View>
    </View>
  );
};

export default AvailableforRent;

const styles = StyleSheet.create({
  container: { 
    backgroundColor: COLORS.background, 
    marginBottom: 60,
    paddingTop: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
    fontFamily: "Poppins-Bold",
  },
  sectionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  seeAllButton: {
    height: 40,
    justifyContent: 'center',
    marginRight: -SPACING.sm,
  },
  seeAllText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.accent,
    fontWeight: "600",
  },
  listContainer: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    width: width,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.md,
    fontFamily: "Poppins-Regular",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: width - SPACING.xxxl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginTop: 16,
    fontFamily: "Poppins-Bold",
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
});
