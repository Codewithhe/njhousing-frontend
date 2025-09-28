import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { handleVerify } from "../../../utils/apicalls/VerifyOTP";
import { useDispatch } from "react-redux";

const VerifyOTPScreen = () => {
  const route = useRoute();
  const { email } = route.params;
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ marginHorizontal: 10 }}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/background/login.png")}
              resizeMode="cover" // Or "contain", depending on desired fit
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subText}>VERIFY THROUGH EMAIL</Text>

        {/* OTP Input with Get Code */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.otpInput]}
            placeholder="***"
            secureTextEntry
            onChangeText={setOtp}
            value={otp}
          />
        </View>

        {/* Verify Button */}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            handleVerify(email, otp, navigation, setLoading, dispatch)
          }
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitText}>Verify</Text>
          )}
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backText}>back to login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    width: 100,
    height: 100,
  },
  otpImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1D1145",
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    textAlign: "center",
    color: "#888",
    letterSpacing: 1,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  otpInput: {
    flex: 1,
    marginRight: 10,
  },
  codeButton: {
    backgroundColor: "#3E5AEF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#1F1D5B",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  backText: {
    color: "#000",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
