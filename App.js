import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Main";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"; // modern replacement
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

// Keep the splash visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Semi": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });
  useEffect(() => {
    setTimeout(async () => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  // Hide splash when fonts are ready
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [fontsLoaded]);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main onLayout={onLayoutRootView} />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
