import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialCommunityIcons } from "react-native-vector-icons";
import CustomText from "../common/Text";
import CustomTextBold from "../common/BoldCustomtext";
import { fetchSearchProperties } from "../../utils/apicalls/searchquery";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../utils/theme";

const SeacrResults = () => {
  const route = useRoute();
  const { query } = route.params;
  const [data, setData] = useState(null); // null = loading
  const [isSearching, setIsSearching] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setIsSearching(true);
    setData(null);

    const doSearch = async () => {
      try {
        await fetchSearchProperties(query, (results) => {
          setData(Array.isArray(results) ? results : []);
          setIsSearching(false);
        });
      } catch (err) {
        console.error("Search error:", err);
        setData([]);
        setIsSearching(false);
      }
    };

    doSearch();

    // Safety timeout - if search takes > 15s, stop loading
    const timeout = setTimeout(() => {
      setIsSearching(false);
      setData((prev) => (prev === null ? [] : prev));
    }, 15000);

    return () => clearTimeout(timeout);
  }, [query]);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PropertyDetail", {
            id: item._id,
          })
        }
        activeOpacity={0.7}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <View style={styles.locationIcon}>
              <Entypo name="location-pin" size={18} color={COLORS.accent} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemAddress} numberOfLines={1}>
                {item.address}
              </Text>
            </View>
          </View>
          {item.description && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.description.split("•")[0]?.trim()}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Loading state
  if (isSearching || data === null) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <CustomText style={styles.searchingText}>
          Searching for "{query}"...
        </CustomText>
      </View>
    );
  }

  // Empty state
  if (Array.isArray(data) && data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="home-search-outline"
          size={64}
          color={COLORS.gray300}
        />
        <CustomTextBold style={styles.emptyTitle}>
          No Results Found
        </CustomTextBold>
        <CustomText style={styles.emptySubtitle}>
          No properties found for "{query}".{"\n"}Try a different search term or
          location.
        </CustomText>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <CustomText style={styles.goBackText}>Go Back</CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Results header */}
      <View style={styles.resultsHeader}>
        <CustomTextBold style={styles.resultsCount}>
          {data.length} {data.length === 1 ? "result" : "results"} for "{query}"
        </CustomTextBold>
      </View>

      {/* Quick Filters */}
      <View style={styles.chipRow}>
        <TouchableOpacity
          style={styles.chip}
          onPress={() =>
            setData((prev) =>
              prev.filter((x) => (x.description || "").includes("Bed"))
            )
          }
        >
          <MaterialCommunityIcons
            name="bed-outline"
            size={14}
            color={COLORS.primary}
          />
          <Text style={styles.chipText}>Bedrooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chip}
          onPress={() =>
            setData((prev) =>
              prev.filter(
                (x) =>
                  (
                    x.details?.kitchen ||
                    x.description ||
                    ""
                  )
                    .toString()
                    .length > 0
              )
            )
          }
        >
          <MaterialCommunityIcons
            name="stove"
            size={14}
            color={COLORS.primary}
          />
          <Text style={styles.chipText}>Kitchen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chip}
          onPress={() =>
            setData((prev) =>
              prev.filter(
                (x) =>
                  (x.details?.neighborhood_amenities || "").toString().length > 0
              )
            )
          }
        >
          <MaterialCommunityIcons
            name="pool"
            size={14}
            color={COLORS.primary}
          />
          <Text style={styles.chipText}>Amenities</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, idx) => item._id || String(idx)}
        renderItem={({ item }) => <Item item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SeacrResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
  },
  searchingText: {
    marginTop: 16,
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  emptyTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  goBackButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  goBackText: {
    color: COLORS.white,
    fontSize: 15,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  chipRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  chipText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "500",
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  itemAddress: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },
});
