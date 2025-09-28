import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import CustomLogo from "../../components/CustomLogo";
import {
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  MaterialIcons,
  Foundation,
} from "react-native-vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const drawerItems = [
  {
    id: "home",
    icon: <AntDesign name="home" size={18} color="#951627" />,
    label: "Home",
    screen: "HomeScreen",
  },
  {
    id: "applications",
    icon: (
      <MaterialCommunityIcons
        name="application-outline"
        size={18}
        color="#951627"
      />
    ),

    label: "My Applications",
    screen: "ApplicationsScreen",
  },
  {
    id: "videos",
    icon: <Entypo name="video" size={18} color="#951627" />,
    label: "Diane’s Videos",
    screen: "VideosScreen",
  },
  {
    id: "vault",
    icon: <Ionicons name="document-lock-sharp" size={18} color="#951627" />,
    label: "Document Vault",
    screen: "VaultScreen",
  },
  {
    id: "notifications",
    icon: <Entypo name="notification" size={18} color="#951627" />,

    label: "Notifications Center",
    screen: "NotificationsScreen",
  },
  {
    id: "help",
    icon: <Entypo name="help-with-circle" size={18} color="#951627" />,
    label: "Help & FAQs",
    screen: "Faq",
  },
  {
    id: "tandc",
    icon: <Foundation name="clipboard-notes" size={18} color="#951627" />,
    label: "Terms and Conditions",
    screen: "Terms",
  },
  // Optional - conditionally render this for free users only
  {
    id: "upgrade",
    label: "Upgrade to Premium",
    icon: <MaterialIcons name="workspace-premium" size={18} color="#951627" />,

    screen: "UpgradeScreen",
    optional: true,
  },
];
const drawerItemsPre = [
  {
    id: "home",
    icon: <AntDesign name="home" size={18} color="#951627" />,
    label: "Home",
    screen: "HomeScreen",
  },
  {
    id: "applications",
    icon: (
      <MaterialCommunityIcons
        name="application-outline"
        size={18}
        color="#951627"
      />
    ),

    label: "My Applications",
    screen: "ApplicationsScreen",
  },
  {
    id: "videos",
    icon: <Entypo name="video" size={18} color="#951627" />,
    label: "Diane’s Videos",
    screen: "VideosScreen",
  },
  {
    id: "vault",
    icon: <Ionicons name="document-lock-sharp" size={18} color="#951627" />,
    label: "Document Vault",
    screen: "VaultScreen",
  },
  {
    id: "notifications",
    icon: <Entypo name="notification" size={18} color="#951627" />,

    label: "Notifications Center",
    screen: "NotificationsScreen",
  },
  {
    id: "help",
    icon: <Entypo name="help-with-circle" size={18} color="#951627" />,
    label: "Help & FAQs",
    screen: "Faq",
  },
  {
    id: "tandc",
    icon: <Foundation name="clipboard-notes" size={18} color="#951627" />,
    label: "Terms and Conditions",
    screen: "Terms",
  },
];

const CustomDrawer = (props) => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const drawer =
    user?.user?.premiumEnabled === true ? drawerItemsPre : drawerItems;
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View>
        <View style={styles.drawerHeader}>
          <CustomLogo
            image={require("../../assets/images/logo_comp/nj_house_map.png")}
          />
        </View>
        <View>
          {drawer.map((item) => (
            <View>
              <DrawerItem
                label={item.label}
                icon={({ color, size }) => item.icon}
                labelStyle={styles.drawerLabel}
                // onPress={() => console.log(item.navigation)}
                onPress={() => navigation.navigate(item.screen)}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>App Version 1.0.0</Text>
        <Text style={styles.footerText}>© 2025 Affordable NJ Housing</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "space-between",
  },

  drawerHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },
  drawerLabel: {
    fontSize: 12,
    color: "#444",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#051138",
    borderRadius: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});

export default CustomDrawer;
