import axios from "axios";
import { HOST } from "../static";

const API_TIMEOUT = 15000; // Increased to 15s for Vercel cold starts

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
    
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      setData(response.data);
      return;
    }
    
    // Fallback if search returns nothing or not found
    await fallbackSearch(q, setData);
  } catch (error) {
    // Check if it's a network error or timeout
    const errorMsg = error.response ? `Server Error: ${error.response.status}` : 
                    error.request ? "Network Error (Server Unreachable)" : error.message;
    
    console.warn(`Search attempt failed (${errorMsg}), using local filter fallback...`);
    
    try {
      await fallbackSearch(q, setData);
    } catch (fallbackError) {
      console.error("Search system completely offline:", fallbackError?.message);
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
