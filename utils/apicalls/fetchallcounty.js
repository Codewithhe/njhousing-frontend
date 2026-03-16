import axios from "axios";
import { HOST } from "../static";

export const fetchallcounty = async (setData, query) => {
  try {
    const response = await axios.get(
      `${HOST}property/get-properties-by-city/${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout to prevent hang
      }
    );
    const results = response.data;
    // Ensure we always set an array (even if API returns null/undefined)
    setData(Array.isArray(results) ? results : []);
  } catch (error) {
    console.error("Error fetching county listings:", error?.message || error);
    // Set empty array on error so the UI shows "no properties" instead of infinite spinner
    setData([]);
  }
};
