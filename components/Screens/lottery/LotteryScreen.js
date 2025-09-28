// LotteryScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { lotteryData } from "../../../utils/lotteryData";

const screenWidth = Dimensions.get("window").width;

export default function LotteryScreen() {
  const [selectedLottery, setSelectedLottery] = useState(lotteryData[0]);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedLottery(item)}
      style={styles.card}
    >
      <Image source={item.image} style={styles.detailImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSub}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <ScrollView style={styles.detailContainer}>
        <FlatList
          data={lotteryData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.title}>{selectedLottery.title}</Text>
        <Text style={styles.subText}>{selectedLottery.location}</Text>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🏢 Unit Info</Text>
          <Text style={styles.sectionText}>
            {selectedLottery.units} units • {selectedLottery.size} •{" "}
            {selectedLottery.bedroom} bed / {selectedLottery.bathroom} bath •
            Max {selectedLottery.maxHousehold} people
          </Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>💰 Income & Rent</Text>
          {selectedLottery.incomeLimits.map((limit, index) => (
            <View key={index} style={{ marginVertical: 4 }}>
              <Text style={styles.boldText}>{limit.ami} AMI:</Text>
              <Text>Rent: {limit.rent}</Text>
              <Text>
                Income: {limit.minIncome} – {limit.maxIncome}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🗓️ Application Period</Text>
          <Text>{selectedLottery.applicationPeriod}</Text>

          <Text style={styles.sectionTitle}>🎟️ Drawing</Text>
          <Text>{selectedLottery.drawingDate}</Text>

          <Text style={styles.sectionTitle}>🏠 Occupancy</Text>
          <Text>{selectedLottery.occupancy}</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>⭐ Preferences</Text>
          <Text>{selectedLottery.preferences.join(", ")}</Text>

          <Text style={styles.sectionTitle}>🛠️ Amenities</Text>
          <Text>{selectedLottery.amenities.join(", ")}</Text>

          <Text style={styles.sectionTitle}>💡 Utility Credit</Text>
          <Text>{selectedLottery.utilityCredit}</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📝 Apply</Text>
          <Text>{selectedLottery.howToApply}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    height: 300,
  },

  cardTextContainer: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    color: "#111",
  },
  subText: {
    color: "#666",
    marginBottom: 10,
  },
  sectionBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },
  sectionText: {
    color: "#444",
  },
  boldText: {
    fontWeight: "600",
    color: "#444",
  },
  detailImage: {
    width: screenWidth - 40,
    height: 200,
    marginTop: 30,
    borderRadius: 12,
    alignSelf: "center",
  },
});
