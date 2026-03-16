import axios from "axios";
import { HOST } from "../static";

const API_TIMEOUT = 10000; // 10 seconds

export const fetchSearchProperties = async (query, setData) => {
  const q = (query || "").trim();
  if (!q) {
    setData([]);
    return;
  }

  try {
    const encoded = encodeURIComponent(q);
    const response = await axios.get(
      `${HOST}property/search-properties/${encoded}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: API_TIMEOUT,
      }
    );
    const results = response.data || [];
    if (Array.isArray(results) && results.length > 0) {
      setData(results);
      return;
    }
    // Fallback: fetch all and filter client-side by title/address
    await fallbackSearch(q, setData);
  } catch (error) {
    console.warn("Primary search failed, trying fallback:", error?.message);
    try {
      await fallbackSearch(q, setData);
    } catch (e) {
      console.error("Fallback search also failed:", e?.message);
      setData([]);
    }
  }
};

const fallbackSearch = async (query, setData) => {
  const all = await axios.get(`${HOST}property/get-all-properties-city`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    timeout: API_TIMEOUT,
  });
  const q = query.toLowerCase();
  const filtered = (all.data || []).filter((item) => {
    const title = (item.title || "").toLowerCase();
    const address = (item.address || "").toLowerCase();
    const id = (item.id || "").toString().toLowerCase(); // e.g. "unit_619802"
    
    // Check if query is in title, address
    if (title.includes(q) || address.includes(q)) return true;
    
    // Check if query matches ID exactly or as a numeric part (e.g. 619802 in unit_619802)
    if (id.includes(q)) return true;
    
    return false;
  });
  setData(filtered);
};
