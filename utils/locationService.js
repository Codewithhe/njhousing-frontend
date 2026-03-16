import * as Location from "expo-location";
import { store } from "../redux/store";
import {
  setLocationLoading,
  setUserLocation,
  setLocationError,
} from "../redux/slices/user";

/**
 * Request location permission, get current location,
 * reverse-geocode to find city & state, and store in Redux.
 *
 * Falls back to "New Jersey" / null city if anything fails.
 */
export const requestAndDetectLocation = async () => {
  const dispatch = store.dispatch;

  try {
    dispatch(setLocationLoading());

    // 1. Ask for foreground location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied – defaulting to New Jersey");
      dispatch(
        setUserLocation({
          city: null,
          state: "New Jersey",
        })
      );
      return;
    }

    // 2. Get current location (fast, low accuracy is fine for state detection)
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;
    console.log(`User location: ${latitude}, ${longitude}`);

    // 3. Reverse geocode to get city & state
    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address) {
      const city = address.city || address.subregion || address.district || null;
      const state = address.region || "New Jersey";

      console.log(`Detected location: ${city}, ${state}`);

      dispatch(
        setUserLocation({
          city,
          state,
        })
      );
    } else {
      // Geocoding returned nothing – use default
      dispatch(
        setUserLocation({
          city: null,
          state: "New Jersey",
        })
      );
    }
  } catch (error) {
    console.error("Location detection error:", error);
    dispatch(setLocationError(error.message || "Failed to detect location"));
    // Still set a default so the app works
    dispatch(
      setUserLocation({
        city: null,
        state: "New Jersey",
      })
    );
  }
};
