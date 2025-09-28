import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOST } from "../static";
import { setUser } from "../../redux/slices/user";

export const handleVerify = async (
  email,
  otp,
  navigation,
  setLoading,
  dispatch
) => {
  setLoading(true);

  if (!otp.trim()) {
    setLoading(false);
    Alert.alert("Validation Error", "Please enter the OTP");
    return;
  }

  try {
    const response = await axios.post(`${HOST}auth/verify-otp`, {
      email,
      otp,
    });
    console.log(response);
    if (response.status === 200) {
      // Save authenticated flag or token to AsyncStorage
      await AsyncStorage.setItem("isAuthenticated", "true");
      await AsyncStorage.setItem("userEmail", email);
      dispatch(setUser(response.data.user));
      Alert.alert("Success", response.data.message);
      setLoading(false);

      // Navigate to authenticated area
      navigation.navigate("Root");
    }
  } catch (error) {
    setLoading(false);
    if (error.response) {
      Alert.alert("Verification Failed", error.response.data.message);
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }
};
