import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { updateSubscription } from "../../utils/apicalls/SubscriptionUpdate";
import { HOST } from "../../utils/static";
import CustomText from "../common/Text";

const PaymentGateway = () => {
  const route = useRoute();
  const { user } = useSelector((state) => state.user);

  const { name, amount, method } = route.params;
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePaymentInit = async () => {
    try {
      setLoading(true);
      
      // Determine endpoint based on method
      const endpoint = method === "paypal" 
        ? `${HOST}payment-gateway/create-paypal-order` 
        : `${HOST}payment-gateway/create-checkout-session`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          amount: amount, 
          currency: "USD",
          successUrl: "https://simfys.com/success",
        }),
      });

      const data = await response.json();
      if (data?.url) {
        setCheckoutUrl(data.url);
      } else {
        Alert.alert("Error", `Failed to create ${method} checkout session`);
      }
    } catch (error) {
      console.error("Payment error", error);
      Alert.alert("Error", "Something went wrong with the payment process.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePaymentInit();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#003087" />
        <CustomText style={{ marginTop: 20 }}>Initializing Secure Payment...</CustomText>
      </View>
    );
  }

  if (checkoutUrl) {
    return (
      <WebView
        source={{ uri: checkoutUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={(navState) => {
          // Both Stripe and PayPal can use the same success callback 
          if (navState.url.includes("https://simfys.com/success")) {
            const request = { plan: name };
            updateSubscription(request, user?._id, navigation);
          }
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default PaymentGateway;
