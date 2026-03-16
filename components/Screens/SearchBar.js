import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../common/Text";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SHADOWS, GRADIENTS, SPACING, FONT_SIZE } from "../../utils/theme";
import { fetchSearchProperties } from "../../utils/apicalls/searchquery";
import { propertyImages } from "../../utils/propertyImageMapping";

const { width, height } = Dimensions.get("window");

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Animation values
  const expandAnim = useRef(new Animated.Value(0)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length > 1) {
      setLoading(true);
      fetchSearchProperties(text, (results) => {
        setSuggestions(results);
        setLoading(false);
      });
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
    Animated.parallel([
      Animated.timing(expandAnim, { toValue: 1, duration: 400, useNativeDriver: false }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: false }),
    ]).start();
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(expandAnim, { toValue: 0, duration: 250, useNativeDriver: false }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start(() => {
      setIsExpanded(false);
      setSuggestions([]);
      setSearchQuery("");
    });
  };

  const performSearch = (query) => {
    const q = (query || searchQuery || '').trim();
    if (q) {
      navigation.navigate("Search_Results", { query: q });
      handleClose();
    }
  };

  const navigateToProperty = (id) => {
    if (id) {
      navigation.navigate("PropertyDetail", { id });
      handleClose();
    }
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => item._id ? navigateToProperty(item._id) : performSearch(item.title || item.id)}
    >
      <View style={styles.suggestionIcon}>
        <MaterialIcons name="home" size={20} color={COLORS.primary} />
      </View>
      <View style={styles.suggestionTextContainer}>
        <CustomText style={styles.suggestionTitle} numberOfLines={1}>
          {item.title || "Property ID: " + item.id}
        </CustomText>
        <CustomText style={styles.suggestionSubtitle} numberOfLines={1}>
          {item.address || "New Jersey"}
        </CustomText>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.gray300} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {/* Original Search Bar - Hidden when expanded to avoid double box */}
      {!isExpanded && (
        <TouchableOpacity 
          style={styles.searchBar} 
          activeOpacity={0.9}
          onPress={handleFocus}
        >
          <View style={styles.inputWrapper}>
            <AntDesign name="search1" size={20} color={COLORS.gray500} style={styles.searchIcon} />
            <CustomText style={styles.placeholderText}>Search by ID or Area...</CustomText>
          </View>
          <LinearGradient
            colors={GRADIENTS.accent}
            style={styles.miniGradientButton}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <AntDesign name="arrowright" size={18} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Expanded Search Overlay */}
      {isExpanded && (
        <Animated.View 
          style={[
            styles.fullScreenOverlay,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: expandAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }
              ]
            }
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.expandedHeader}>
              <View style={styles.searchHeaderTop}>
                <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                
                <View style={styles.expandedInputWrapper}>
                  <TextInput
                    autoFocus
                    placeholder="Where would you like to live?"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    style={styles.expandedInput}
                    onSubmitEditing={() => performSearch()}
                    returnKeyType="search"
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => handleSearchChange("")}>
                      <Ionicons name="close-circle" size={20} color={COLORS.gray400} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.suggestionsContent}>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <CustomText style={styles.statusText}>Searching for properties...</CustomText>
                  </View>
                ) : suggestions.length > 0 ? (
                  <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    renderItem={renderSuggestion}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.listContainer}
                  />
                ) : searchQuery.length > 1 ? (
                  <View style={styles.loadingContainer}>
                    <CustomText style={styles.statusText}>No results found for "{searchQuery}"</CustomText>
                  </View>
                ) : (
                  <View style={styles.popularSearches}>
                    <CustomText style={styles.popularTitle}>Try searching for</CustomText>
                    <View style={styles.tagContainer}>
                      {["611739", "Dover", "Clifton", "Trenton", "Jersey City"].map((tag) => (
                        <TouchableOpacity 
                          key={tag} 
                          style={styles.tag}
                          onPress={() => handleSearchChange(tag)}
                        >
                          <CustomText style={styles.tagText}>{tag}</CustomText>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1000,
    width: '100%',
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 4,
    paddingRight: 6,
    ...SHADOWS.large,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchIcon: {
    marginHorizontal: 12,
  },
  placeholderText: {
    fontSize: 15,
    color: COLORS.textTertiary,
    fontFamily: 'Poppins-Regular',
  },
  miniGradientButton: {
    height: 48,
    width: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Overlay Styles
  fullScreenOverlay: {
    position: 'fixed',
    top: -100, // Cover the header area
    left: -20, // Cover padding
    width: width + 40,
    height: height + 100,
    backgroundColor: COLORS.white,
    zIndex: 9999,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  expandedHeader: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  expandedInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  expandedInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 0,
  },
  suggestionsContent: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    paddingBottom: 30,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  suggestionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins-Semi',
  },
  suggestionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  statusText: {
    color: COLORS.textSecondary,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  popularSearches: {
    padding: 24,
  },
  popularTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Poppins-Semi',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: 'Poppins-Semi',
  },
});
