import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, View } from "react-native";

// Import screens
import HomeScreen from "../../components/Screens/HomeScreen";
import ExploreScreen from "../../components/Screens/ExploreScreen";
import SubscriptionScreen from "../../components/Screens/SubscriptionScreen";
import ProfileScreen from "../../components/Screens/ProfileScreen";

// Import icons
import Home from "../../assets/tabbaricon/home.png";
import HomeActive from "../../assets/tabbaricon/home-fill.png";
import Explore from "../../assets/tabbaricon/explore.png";
import ExploreActive from "../../assets/tabbaricon/explore-fill.png";
import Subscription from "../../assets/tabbaricon/subscription.png";
import SubscriptionActive from "../../assets/tabbaricon/subscription-fill.png";
import LotteryActive from "../../assets/tabbaricon/lottery-fill.png";
import Lottery from "../../assets/tabbaricon/lottery.png";

import Profile from "../../assets/tabbaricon/profile.png";
import ProfileActive from "../../assets/tabbaricon/profile-fill.png";
import { useSelector } from "react-redux";
import LotteryScreen from "../../components/Screens/lottery/LotteryScreen";

const Tab = createBottomTabNavigator();

const getTabBarIcon = (focused, activeIcon, inactiveIcon, label) => (
  <View style={{ alignItems: "center", marginTop: 20, width: 100 }}>
    <Image
      source={focused ? activeIcon : inactiveIcon}
      style={{ width: 24, height: 24, resizeMode: "contain" }}
    />
    <Text
      style={{
        fontSize: 12,
        color: focused ? "#000" : "#999",
        marginTop: 2,
      }}
    >
      {label}
    </Text>
  </View>
);

export default function MyTabs() {
  const user = useSelector((state) => state.user.loggedIn);
  const userPremium = useSelector((state) => state.user.premiumEnabled);

  console.log(userPremium);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 70,
          paddingBottom: Platform.OS === "ios" ? 10 : 5,
        },
        tabBarShowLabel: false, // We use custom label inside icon render
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon(focused, HomeActive, Home, "Home"),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon(focused, ExploreActive, Explore, "Explore"),
        }}
      />

      {userPremium === true ? (
        <Tab.Screen
          name="Lottery"
          component={LotteryScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              getTabBarIcon(focused, LotteryActive, Lottery, "Lottery"),
          }}
        />
      ) : (
        <Tab.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              getTabBarIcon(
                focused,
                SubscriptionActive,
                Subscription,
                "Subscription"
              ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon(focused, ProfileActive, Profile, "Profile"),
        }}
      />
    </Tab.Navigator>
  );
}
