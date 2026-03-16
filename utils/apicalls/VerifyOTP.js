import axios from "axios";
import Toast from "react-native-toast-message";
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
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please enter the OTP",
    });
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
      
      Toast.show({
        type: "success",
        text1: "Success",
        text2: response.data.message || "OTP Verified Successfully",
      });
      
      setLoading(false);

      // Navigate to authenticated area
      navigation.navigate("Root");
    }
  } catch (error) {
    setLoading(false);
    if (error.response) {
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: error.response.data.message || "Invalid OTP",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again.",
      });
    }
  }
};
