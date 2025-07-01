import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  fetchFilters,
  fetchPropertyTypes,
} from "../../utils/apicalls/FetchallFilters";
import CustomText from "../common/Text";

const FilterScreen = ({ onApplyFilters }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchFilters(
      () => {},
      () => {},
      () => {},
      setFilters
    );
  }, []);

  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      location,
      minPrice,
      maxPrice,
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
      propertyType: selectedPropertyTypes,
    });
  };

  const handleResetFilters = () => {
    setLocation("");
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setSelectedPropertyTypes([]);
  };

  const bedrooms = filters.filter((item) => item.includes("Bed"));
  const bathrooms = filters.filter((item) => item.includes("Bath"));
  const types = filters.filter(
    (item) => !item.includes("Bed") && !item.includes("Bath")
  );

  const bedroomNumbers = [
    ...new Set(bedrooms.map((b) => parseInt(b)).filter((n) => !isNaN(n))),
  ].sort((a, b) => a - b);

  const bathNumbers = [
    ...new Set(bathrooms.map((b) => parseInt(b)).filter((n) => !isNaN(n))),
  ].sort((a, b) => a - b);

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 300 }]}
      >
        <View style={styles.inputContainer}>
          <CustomText style={styles.label}>Location</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomText style={styles.label}>Bedrooms</CustomText>
          <View style={styles.tabContainer}>
            {bedroomNumbers.map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.tab,
                  selectedBedrooms.includes(num) && styles.selectedTab,
                ]}
                onPress={() =>
                  toggleSelection(num, selectedBedrooms, setSelectedBedrooms)
                }
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedBedrooms.includes(num) && styles.selectedTabText,
                  ]}
                >
                  {num} Bed
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomText style={styles.label}>Bathrooms</CustomText>
          <View style={styles.tabContainer}>
            {bathNumbers.map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.tab,
                  selectedBathrooms.includes(num) && styles.selectedTab,
                ]}
                onPress={() =>
                  toggleSelection(num, selectedBathrooms, setSelectedBathrooms)
                }
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedBathrooms.includes(num) && styles.selectedTabText,
                  ]}
                >
                  {num} Bath
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomText style={styles.label}>Property Type</CustomText>
          <View style={styles.tabContainer}>
            {types.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tab,
                  selectedPropertyTypes.includes(type) && styles.selectedTab,
                ]}
                onPress={() =>
                  toggleSelection(
                    type,
                    selectedPropertyTypes,
                    setSelectedPropertyTypes
                  )
                }
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedPropertyTypes.includes(type) &&
                      styles.selectedTabText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={handleApplyFilters}
          style={styles.applyButton}
        >
          <CustomText style={styles.applyButtonText}>Apply Filters</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleResetFilters}
          style={styles.resetButton}
        >
          <CustomText style={styles.resetButtonText}>Reset Filters</CustomText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    margin: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tab: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
  },
  selectedTab: {
    backgroundColor: "#051138",
  },
  tabText: {
    color: "#333",
    fontSize: 14,
  },
  selectedTabText: {
    color: "#fff",
  },
  applyButton: {
    borderColor: "#051138",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    marginBottom: 20,
  },
  resetButton: {
    borderColor: "#E53E3E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    marginLeft: 10,
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#E53E3E",
    fontSize: 16,
  },
  applyButtonText: {
    color: "#5A67D8",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});

export default FilterScreen;
