import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { loginApi } from "../../../utils/apicalls/loginApi";
import { Button } from "react-native-paper";
import CustomText from "../../common/Text";
import CustomTextSemi from "../../common/CustomTextSemi";
import { useDispatch, useSelector } from "react-redux";
import CustomLogo from "../../CustomLogo";
export default function LoginScreen() {
  const { width, height } = Dimensions.get("screen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [error, setErros] = useState("");

  const dispatch = useDispatch();
  const handleLogin = () => {
    loginApi(email, password, navigation, setErros, setLoading, dispatch);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomLogo
        image={require("../../../assets/images/logo_comp/nj_house_map.png")}
      />
      <View style={{ padding: 25 }}>
        <CustomTextSemi
          style={[
            styles.title,
            {
              marginBottom: 5,
            },
          ]}
        >
          Sign in
        </CustomTextSemi>
        <CustomText style={[styles.title, { fontSize: 18, color: "#696969" }]}>
          Welcome back! Sign in to continue.
        </CustomText>

        <TextInput
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        {error && (
          <View
            style={{
              padding: 5,
            }}
          >
            <CustomText style={{ color: "#FF5D5D" }}>{error}</CustomText>
          </View>
        )}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {loading ? (
              <ActivityIndicator color="white" size={"small"} />
            ) : (
              "Login"
            )}
          </Text>
        </TouchableOpacity>

        <CustomText style={styles.signupPrompt}>
          Don’t have an account?
        </CustomText>

        <Button
          style={styles.signupButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <CustomText style={styles.signupText}>Create an Account</CustomText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  titleBrand: {
    fontSize: 24,
    color: "#1F1D5B",
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    fontSize: 40,
    color: "#1F1D5B",
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    height: 50,
  },
  passwordContainer: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    height: 50,
  },
  loginButton: {
    backgroundColor: "#1F1D5B",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
    height: 45,
    justifyContent: "center",
    color: "white",
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  signupPrompt: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: "#242933",
    borderRadius: 8,
    alignItems: "center",
  },
  signupText: {
    color: "#242933",
    fontSize: 16,
  },
});
