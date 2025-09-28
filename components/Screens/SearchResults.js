import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Entypo } from "react-native-vector-icons";
import CustomText from "../common/Text";
import { fetchSearchProperties } from "../../utils/apicalls/searchquery";
import { useNavigation, useRoute } from "@react-navigation/native";

const SeacrResults = () => {
  const route = useRoute();
  const { query } = route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSearchProperties(query, setData);
  }, [query]);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PropertyDetail", {
            id: item._id,
          })
        }
      >
        <View
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Entypo name="location" />
            <Text style={{ marginLeft: 10, flex: 1 }} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          {item.bedrooms && (
            <View style={{ backgroundColor: "#EFEFFD", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 8 }}>
              <Text style={{ color: "#051138", fontSize: 12 }}>{item.bedrooms} bd</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Quick Filters */}
      <View style={{ flexDirection: "row", padding: 10, gap: 8 }}>
        <TouchableOpacity
          style={styles.chip}
          onPress={() => setData((prev) => prev.filter((x) => (x.description || '').includes('Bed')))}
        >
          <Text style={styles.chipText}>Bedrooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chip}
          onPress={() => setData((prev) => prev.filter((x) => (x.details?.kitchen || x.description || '').toString().length > 0))}
        >
          <Text style={styles.chipText}>Kitchen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chip}
          onPress={() => setData((prev) => prev.filter((x) => (x.details?.neighborhood_amenities || '').toString().length > 0))}
        >
          <Text style={styles.chipText}>Amenities</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, idx) => item._id || String(idx)}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

export default SeacrResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 5,
    flex: 1,
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
