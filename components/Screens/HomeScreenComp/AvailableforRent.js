import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PropertyCard from "../../cards/ProppertCard";
import { ScrollView } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import InternationalMigrations from "../../cards/DestinationCards";
import { useNavigation } from "@react-navigation/native";
import { fetchallcounty } from "../../../utils/apicalls/fetchallcounty";
import CustomText from "../../common/Text";
import CustomTextBold from "../../common/BoldCustomtext";

const height = Dimensions.get("window").height;

const AvailableforRent = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [otherCity, setOtherCity] = useState([]);

  useEffect(() => {
    fetchallcounty(setData, "Dover");
    fetchallcounty(setOtherCity, "Clifton");
  }, []);
  
  // Debug: log fetched lists for verification
  useEffect(() => {
    console.log("AvailableforRent data (Dover)", data?.length ?? 0, data);
  }, [data]);

  useEffect(() => {
    console.log("AvailableforRent otherCity (Clifton)", otherCity?.length ?? 0, otherCity);
  }, [otherCity]);


  return (
    <ScrollView>
      <View style={{ backgroundColor: "white", marginBottom: 60 }}>
        <CustomTextBold style={{ fontSize: 20, marginTop: 20 }}>
          Near your location
        </CustomTextBold>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomText style={{ color: "grey" }}>Properties in Dover</CustomText>
          <Button
            style={{ width: 50, height: 40 }}
            labelStyle={{ fontSize: 12, color: "#9d011f" }}
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
        <View style={{ justifyContent: "space-between", alignItems: "center" }}>
          <ScrollView horizontal={true}>
            {data.length > 0 ? (
              data.map((item, index) => {
                item.price = item.price === undefined ? "N/A" : item.price;
                return (
                  <PropertyCard
                    id={item._id}
                    widthlist={true}
                    onPress={() =>
                      navigation.navigate("PropertyDetail", {
                        id: item._id,
                      })
                    }
                    title={item.title}
                    location={item.address}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              })
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#917AFD" />
              </View>
            )}
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomTextBold style={{ fontSize: 20 }}>Top Rated</CustomTextBold>
            <Button
              style={{ width: 50, height: 40 }}
              labelStyle={{ fontSize: 12, color: "#9d011f" }}
              mode="text"
            >
              See all
            </Button>
          </View>
          <View
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {otherCity.length > 0 ? (
                otherCity.map((item, index) => {
                  return (
                    <PropertyCard
                      id={item._id}
                      widthlist={true}
                      onPress={() =>
                        navigation.navigate("PropertyDetail", {
                          id: item._id,
                        })
                      }
                      title={item.title}
                      location={item.address}
                      price={item.price}
                      description={item.description}
                      image={item.image}
                    />
                  );
                })
              ) : (
                <ActivityIndicator size="large" color="#917AFD" />
              )}
            </ScrollView>
          </View>
        </View>
        <InternationalMigrations />
      </View>
    </ScrollView>
  );
};

export default AvailableforRent;
