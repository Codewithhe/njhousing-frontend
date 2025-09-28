import axios from "axios";
import { HOST } from "../static";

export const fetchSearchProperties = async (query, setData) => {
  try {
    const encoded = encodeURIComponent((query || '').trim());
    const response = await axios.get(
      `${HOST}property/search-properties/${encoded}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const results = response.data || [];
    if (Array.isArray(results) && results.length > 0) {
      setData(results);
      return;
    }
    // Fallback: fetch all and filter client-side by title/address
    const all = await axios.get(`${HOST}property/get-all-properties-city`, {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    const q = (query || '').trim().toLowerCase();
    const filtered = (all.data || []).filter((item) => {
      const title = (item.title || '').toLowerCase();
      const address = (item.address || '').toLowerCase();
      return title.includes(q) || address.includes(q);
    });
    setData(filtered);
  } catch (error) {
    try {
      const all = await axios.get(`${HOST}property/get-all-properties-city`, {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      const q = (query || '').trim().toLowerCase();
      const filtered = (all.data || []).filter((item) => {
        const title = (item.title || '').toLowerCase();
        const address = (item.address || '').toLowerCase();
        return title.includes(q) || address.includes(q);
      });
      setData(filtered);
    } catch (e) {
      console.error("Error fetching search properties:", error);
    }
  }
};
