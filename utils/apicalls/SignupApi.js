import axios from "axios";
import Toast from "react-native-toast-message";
import { HOST } from "../static";

export const SignupAPI = async (
  passcode,
  confirmPasscode,
  userData,
  setLoading,
  navigation
) => {
  setLoading(true);
  if (passcode !== confirmPasscode) {
    setLoading(false);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Passwords do not match!",
    });
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(`${HOST}auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    navigation.navigate("VerifyOtp", {
      email: userData.email,
    });
    Toast.show({
      type: "success",
      text1: "Success",
      text2: response.data.message || "Registration successful!",
    });

  } catch (error) {
    setLoading(false);

    if (error.response) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message || "An error occurred",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error. Please try again later.",
      });
    }
  }
};
