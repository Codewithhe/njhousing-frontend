import axios from "axios";
import { HOST } from "../static";

export const fetchpropdetails = async (setData, id, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(`${HOST}property/get-detail-by-id/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setLoading(false);

    setData(response.data);
  } catch (error) {
    setLoading(false);

    console.error("Error fetching county listings:", error);
  }
};
