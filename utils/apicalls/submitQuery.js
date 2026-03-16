import axios from "axios";
import Toast from "react-native-toast-message";
import { HOST } from "../static";

export const submitContactQuery = async (formData, navigation, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.post(`${HOST}contact/query`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: response.data?.message || "Application submitted successfully!",
    });
    navigation.goBack();
  } catch (error) {
    setLoading(false);
    if (error.response) {
      console.log("--- BACKEND ERROR RESPONSE ---");
      console.log(JSON.stringify(error.response.data, null, 2));
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message || "Required fields missing on server.",
      });
    } else {
      console.log("--- NETWORK ERROR ---");
      console.log(error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error. Please try again later.",
      });
    }
    return false;
  }
};
